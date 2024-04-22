from tests.factories.events import create_event
from tests.factories.participants import create_participant

api = "/api/v1"


def test_create_event(client, app):
    create_participant(app)
    data = {"name": "Test Event", "hostId": 1}
    expected_data = {
        "host": {
            "id": 1,
            "firstName": "Adam",
            "lastName": "Test",
            "isHost": True,
            "mealPreference": "Carnivorous",
            "chosenMeals": ["Breakfast", "Dinner", "Supper"],
            "events": [],
        },
        "id": 1,
        "name": "Test Event",
        "participants": [],
    }
    response = client.post(f"{api}/events/", json=data)
    assert response.status_code == 201
    assert response.json == expected_data


def test_get_event(client, app):
    expected_data = {
        "host": {
            "id": 1,
            "firstName": "Tester",
            "lastName": "Test",
            "isHost": True,
            "mealPreference": "Carnivorous",
            "chosenMeals": [],
            "events": [],
        },
        "id": 1,
        "name": "Test Event",
        "participants": [],
    }
    create_event(app)
    response = client.get(f"{api}/events/1/")
    assert response.status_code == 200
    assert response.json == expected_data


def test_update_event(client, app):
    create_event(app)
    create_participant(app)
    data = {
        "name": "Updated name",
        "hostId": 2,
    }
    expected_data = {
        "host": {
            "id": 2,
            "firstName": "Adam",
            "lastName": "Test",
            "isHost": True,
            "mealPreference": "Carnivorous",
            "chosenMeals": ["Breakfast", "Dinner", "Supper"],
            "events": [],
        },
        "id": 1,
        "name": "Updated name",
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
    response = client.patch(f"{api}/events/1/", json=data)
    assert response.status_code == 200
    assert response.json == expected_data


def test_delete_event(client, app):
    create_event(app)
    response = client.delete(f"{api}/events/1/")
    assert response.status_code == 204
