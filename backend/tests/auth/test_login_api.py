from http import HTTPStatus

import pytest

from tests.factories.users import create_user

api = "/api/v1"


def test_login(client, app):
    create_user(app)
    data = {"username": "tester", "password": "test"}
    response = client.post(f"{api}/login/", json=data)
    assert response.status_code == HTTPStatus.OK
    assert response.json.get("access") is not None
    assert response.json.get("refresh") is not None


@pytest.mark.parametrize("value", ["username", "password"])
def test_login_with_missing_values(client, app, value):
    data = {"username": "tester", "password": "test"}
    expected_err_msg = "You provided invalid data"
    expected_err_code = "invalid_data"
    data.pop(value)
    response = client.post(f"{api}/login/", json=data)
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json.get("message") == expected_err_msg
    assert response.json.get("code") == expected_err_code


@pytest.mark.parametrize("value", ["username", "password"])
def test_login_with_invalid_credentials(client, app, value):
    data = {"username": "tester", "password": "test"}
    expected_err_msg = "You provided invalid credentials"
    expected_err_code = "invalid_credentials"
    data[value] = value  # "username": "username", same for password
    response = client.post(f"{api}/login/", json=data)
    assert response.status_code == HTTPStatus.UNAUTHORIZED
    assert response.json.get("message") == expected_err_msg
    assert response.json.get("code") == expected_err_code


def test_refresh(client, app):
    create_user(app)
    data = {"username": "tester", "password": "test"}
    login_response = client.post(f"{api}/login/", json=data)
    refresh_token = login_response.json.get("refresh")

    refresh_response = client.post(
        f"{api}/refresh/",
        headers={"Authorization": f"Bearer {refresh_token}"},
    )
    assert refresh_response.status_code == HTTPStatus.OK
    assert refresh_response.json.get("access") is not None
