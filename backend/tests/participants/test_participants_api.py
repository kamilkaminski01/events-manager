import pytest

from app.extensions import db
from app.models.event import Event
from app.models.participant import Participant, sort_chosen_meals
from tests.factories.events import create_event
from tests.factories.participants import (
    create_bulk_participants,
    create_participant,
    query_meals,
)

api = "/api/v1"


def test_create_participant(client, app):
    data = {
        "firstName": "Kamil",
        "lastName": "Kaminski",
        "isHost": False,
        "mealPreference": "CARNIVOROUS",
        "chosenMeals": ["BREAKFAST", "DINNER", "SUPPER"],
    }
    expected_data = {
        "id": 1,
        "firstName": "Kamil",
        "lastName": "Kaminski",
        "isHost": False,
        "mealPreference": "Carnivorous",
        "chosenMeals": ["Breakfast", "Dinner", "Supper"],
        "events": [],
    }
    response = client.post(f"{api}/participants/", json=data)
    assert response.status_code == 201
    assert response.get_json() == expected_data


@pytest.mark.parametrize(
    "data",
    [
        {
            "firstName": "First",
            "lastName": "Last",
            "mealPreference": "Carnivorous",
            "chosenMeals": [],
        },
        {
            "firstName": "First",
            "lastName": "Last",
            "mealPreference": "Vegetarian",
            "chosenMeals": [],
        },
        {
            "firstName": "First",
            "lastName": "Last",
            "mealPreference": "OMNIVOROUS",
            "chosenMeals": [],
        },
        {
            "firstName": "First",
            "lastName": "Last",
            "mealPreference": "VEGETARIAN",
            "chosenMeals": ["Lunch"],
        },
    ],
)
def test_create_participant_with_incorrect_data(client, app, data):
    response = client.post(f"{api}/participants/", json=data)
    assert response.status_code == 400


def test_list_participants_with_data(client, app):
    create_bulk_participants(app)
    response = client.get(f"{api}/participants/")
    assert response.status_code == 200
    assert len(response.json) == 3


def test_get_participant(client, app):
    expected_data = {
        "id": 1,
        "firstName": "Adam",
        "lastName": "Test",
        "isHost": False,
        "mealPreference": "Carnivorous",
        "chosenMeals": ["Breakfast", "Dinner", "Supper"],
        "events": [],
    }
    create_participant(app)
    response = client.get(f"{api}/participants/1/")
    assert response.status_code == 200
    assert response.json == expected_data


def test_get_participant_returns_participated_event(client, app):
    create_event(app)
    create_participant(app)
    with app.app_context():
        event = db.session.query(Event).get(1)
        participant = db.session.query(Participant).get(2)

        assert len(event.participants) == 0

        event.participants.append(participant)

        response = client.get(f"{api}/participants/2/")

        assert response.status_code == 200
        assert event.participants == [participant]
        assert len(response.json["events"]) == 1
        assert response.json["events"][0]["id"] == event.id


def test_update_participant(client, app):
    data = {
        "firstName": "Updated First Name",
        "lastName": "Updated Last Name",
        "isHost": True,
        "mealPreference": "VEGETARIAN",
        "chosenMeals": [],
    }
    expected_data = {
        "id": 1,
        "firstName": "Updated First Name",
        "lastName": "Updated Last Name",
        "isHost": True,
        "mealPreference": "Vegetarian",
        "chosenMeals": [],
        "events": [],
    }
    create_participant(app)
    response = client.patch(f"{api}/participants/1/", json=data)
    assert response.status_code == 200
    assert response.json == expected_data


def test_delete_participant(client, app):
    create_participant(app)
    response = client.delete(f"{api}/participants/1/")
    assert response.status_code == 204


def test_deleting_participant_unsets_event_host(client, app):
    create_event(app)
    with app.app_context():
        event = db.session.query(Event).get(1)
        pre_delete_host = event.host

        assert pre_delete_host is not None
        assert event.host == pre_delete_host

        response = client.delete(f"{api}/participants/1/")
        post_delete_host = event.host

        assert response.status_code == 204
        assert post_delete_host is None


def test_sort_chosen_meals(app):
    with app.app_context():
        breakfast, dinner, supper = query_meals()

        meals = [dinner, supper, breakfast]
        sorted_meals = sort_chosen_meals(meals)
        sorted_meals = [meal.type.value for meal in sorted_meals]
        assert sorted_meals == ["Breakfast", "Dinner", "Supper"]

        meals = []
        sorted_meals = sort_chosen_meals(meals)
        assert sorted_meals == []
