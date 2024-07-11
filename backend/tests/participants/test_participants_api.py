from http import HTTPStatus

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


def test_create_participant(client, auth, app):
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
    response = client.post(f"{api}/participants/", json=data, headers=auth)
    assert response.status_code == HTTPStatus.CREATED
    assert response.get_json() == expected_data


def test_create_participant_without_authentication(client):
    response = client.post(f"{api}/participants/", json={"test": "test"})
    assert response.status_code == HTTPStatus.UNAUTHORIZED


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
def test_create_participant_with_incorrect_data(client, auth, app, data):
    response = client.post(f"{api}/participants/", json=data, headers=auth)
    assert response.status_code == HTTPStatus.BAD_REQUEST


def test_list_participants_with_data(client, app):
    create_bulk_participants(app)
    response = client.get(f"{api}/participants/")
    assert response.status_code == HTTPStatus.OK
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
    assert response.status_code == HTTPStatus.OK
    assert response.json == expected_data


def test_get_non_existent_participant_returns_404(client, app):
    response = client.get(f"{api}/participants/1/")
    assert response.status_code == HTTPStatus.NOT_FOUND


def test_get_participant_returns_participated_event(client, app):
    create_event(app)
    create_participant(app)
    with app.app_context():
        event = db.session.get(Event, 1)
        participant = db.session.get(Participant, 2)

        assert len(event.participants) == 0

        event.participants.append(participant)

        response = client.get(f"{api}/participants/2/")

        assert response.status_code == HTTPStatus.OK
        assert event.participants == [participant]
        assert len(response.json["events"]) == 1
        assert response.json["events"][0]["id"] == event.id


def test_update_participant(client, auth, app):
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
    response = client.patch(f"{api}/participants/1/", json=data, headers=auth)
    assert response.status_code == HTTPStatus.OK
    assert response.json == expected_data


def test_update_participant_without_authentication(client, app):
    create_participant(app)
    response = client.patch(f"{api}/participants/1/")
    assert response.status_code == HTTPStatus.UNAUTHORIZED


def test_update_non_existent_participant_returns_404(client, auth, app):
    response = client.patch(f"{api}/participants/1/", headers=auth)
    assert response.status_code == HTTPStatus.NOT_FOUND


def test_delete_participant(client, auth, app):
    create_participant(app)
    response = client.delete(f"{api}/participants/1/", headers=auth)
    assert response.status_code == HTTPStatus.NO_CONTENT


def test_delete_participant_without_authentication(client, app):
    create_participant(app)
    response = client.delete(f"{api}/participants/1/")
    assert response.status_code == HTTPStatus.UNAUTHORIZED


def test_delete_non_existent_participant_returns_404(client, auth, app):
    response = client.delete(f"{api}/participants/1/", headers=auth)
    assert response.status_code == HTTPStatus.NOT_FOUND


def test_deleting_participant_unsets_event_host(client, auth, app):
    create_event(app)
    with app.app_context():
        event = db.session.get(Event, 1)
        pre_delete_host = event.host

        assert pre_delete_host is not None
        assert event.host == pre_delete_host

        response = client.delete(f"{api}/participants/1/", headers=auth)
        post_delete_host = event.host

        assert response.status_code == HTTPStatus.NO_CONTENT
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
