from http import HTTPStatus

import pytest

from app.extensions import db
from app.models.event import Event
from app.models.participant import Participant
from tests.factories.events import create_event
from tests.factories.participants import create_bulk_participants, create_participant

api = "/api/v1"


def test_create_event(client, auth):
    create_participant()
    data = {"name": "Test Event", "hostId": 1}
    expected_data = {
        "id": 1,
        "name": "Test Event",
        "host": {
            "id": 1,
            "firstName": "Adam",
            "lastName": "Test",
            "isHost": True,
            "mealPreference": "Carnivorous",
            "chosenMeals": ["Breakfast", "Dinner", "Supper"],
            "events": [],
        },
        "participants": [],
    }
    response = client.post(f"{api}/events/", json=data, headers=auth)
    assert response.status_code == HTTPStatus.CREATED
    assert response.json == expected_data


def test_create_event_without_authentication(client):
    response = client.post(f"{api}/events/", json={"test": "test"})
    assert response.status_code == HTTPStatus.UNAUTHORIZED


def test_creat_event_with_participant(client, auth):
    create_bulk_participants()
    data = {"name": "Test Event", "hostId": 1, "participants": [2, 3]}
    expected_data = {
        "id": 1,
        "name": "Test Event",
        "host": {
            "id": 1,
            "firstName": "Kamil",
            "lastName": "Test",
            "isHost": True,
            "mealPreference": "Carnivorous",
            "chosenMeals": ["Breakfast", "Dinner", "Supper"],
            "events": [],
        },
        "participants": [
            {
                "id": 2,
                "firstName": "John",
                "lastName": "Test",
                "isHost": False,
                "mealPreference": "Vegetarian",
                "chosenMeals": ["Breakfast", "Dinner"],
                "events": [{"id": 1, "name": "Test Event"}],
            },
            {
                "id": 3,
                "firstName": "Anna",
                "lastName": "Test",
                "isHost": False,
                "mealPreference": None,
                "chosenMeals": ["Breakfast"],
                "events": [{"id": 1, "name": "Test Event"}],
            },
        ],
    }
    response = client.post(f"{api}/events/", json=data, headers=auth)
    assert response.status_code == HTTPStatus.CREATED
    assert response.json == expected_data


@pytest.mark.parametrize(
    "data",
    [
        {},
        {"name": None, "hostId": 1},
        {"name": "Test", "hostId": None},
    ],
)
def test_create_event_with_incorrect_data(client, auth, data):
    response = client.post(f"{api}/events/", json=data, headers=auth)
    assert response.status_code == HTTPStatus.BAD_REQUEST


def test_get_event(client):
    expected_data = {
        "id": 1,
        "name": "Test Event",
        "host": {
            "id": 1,
            "firstName": "Tester",
            "lastName": "Test",
            "isHost": True,
            "mealPreference": "Carnivorous",
            "chosenMeals": [],
            "events": [],
        },
        "participants": [],
    }
    create_event()
    response = client.get(f"{api}/events/1/")
    assert response.status_code == HTTPStatus.OK
    assert response.json == expected_data


def test_get_non_existent_event_returns_404(client):
    response = client.get(f"{api}/events/1/")
    assert response.status_code == HTTPStatus.NOT_FOUND


def test_update_event(client, auth):
    create_event()
    create_participant()
    data = {
        "name": "Updated name",
        "hostId": 2,
    }
    expected_data = {
        "id": 1,
        "name": "Updated name",
        "host": {
            "id": 2,
            "firstName": "Adam",
            "lastName": "Test",
            "isHost": True,
            "mealPreference": "Carnivorous",
            "chosenMeals": ["Breakfast", "Dinner", "Supper"],
            "events": [],
        },
        "participants": [
            {
                "id": 1,
                "firstName": "Tester",
                "lastName": "Test",
                "isHost": False,
                "mealPreference": "Carnivorous",
                "chosenMeals": [],
                "events": [{"id": 1, "name": "Updated name"}],
            }
        ],
    }
    response = client.patch(f"{api}/events/1/", json=data, headers=auth)
    assert response.status_code == HTTPStatus.OK
    assert response.json == expected_data


def test_update_event_without_authentication(client):
    create_event()
    response = client.patch(f"{api}/events/1/", json={"test": "test"})
    assert response.status_code == HTTPStatus.UNAUTHORIZED


def test_update_non_existent_event_returns_404(client, auth):
    response = client.patch(f"{api}/events/1/", headers=auth)
    assert response.status_code == HTTPStatus.NOT_FOUND


def test_update_events_participants_from_0_to_2(client, auth):
    create_event()
    create_bulk_participants()
    data = {"participants": [2, 3]}
    event = db.session.get(Event, 1)

    assert len(event.participants) == 0

    response = client.patch(f"{api}/events/1/", json=data, headers=auth)

    assert response.status_code == HTTPStatus.OK
    assert len(event.participants) == 2


def test_update_events_participants_from_2_to_0(client, auth):
    create_event()
    create_bulk_participants()
    data = {"participants": []}
    event = db.session.get(Event, 1)
    participants = (
        db.session.query(Participant).order_by(Participant.id.desc()).limit(2).all()
    )

    assert len(participants) == 2
    assert len(event.participants) == 0

    event.participants.extend(participants)
    assert len(event.participants) == 2

    response = client.patch(f"{api}/events/1/", json=data, headers=auth)

    assert response.status_code == HTTPStatus.OK
    assert len(event.participants) == 0


def test_updating_event_host_add_him_to_its_participants(client, auth):
    create_event()
    create_participant()
    data = {"hostId": 2}
    event = db.session.get(Event, 1)
    pre_update_host = event.host

    assert pre_update_host not in event.participants
    assert pre_update_host.id != 2

    response = client.patch(f"{api}/events/1/", json=data, headers=auth)
    post_update_host = event.host

    assert response.status_code == HTTPStatus.OK
    assert post_update_host.id == 2
    assert pre_update_host in event.participants


def test_delete_event(client, auth):
    create_event()
    response = client.delete(f"{api}/events/1/", headers=auth)
    assert response.status_code == HTTPStatus.NO_CONTENT


def test_delete_event_without_authentication(client):
    create_event()
    response = client.delete(f"{api}/events/1/")
    assert response.status_code == HTTPStatus.UNAUTHORIZED


def test_delete_non_existent_event_returns_404(client, auth):
    response = client.delete(f"{api}/events/1/", headers=auth)
    assert response.status_code == HTTPStatus.NOT_FOUND


def test_deleting_event_sets_host_is_host_field_false(client, auth):
    create_event()
    pre_delete_event = db.session.get(Event, 1)
    host = db.session.get(Participant, 1)

    assert pre_delete_event is not None
    assert pre_delete_event.host == host

    response = client.delete(f"{api}/events/1/", headers=auth)
    post_delete_event = db.session.get(Event, 1)

    assert response.status_code == HTTPStatus.NO_CONTENT
    assert post_delete_event is None
    assert host.is_host is False
