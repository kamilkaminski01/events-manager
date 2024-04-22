from tests.factories.participants import create_bulk_participants, create_participant

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
