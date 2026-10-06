import pytest

REGISTRATION = {"name": "Sam", "email": "sam@example.com", "password": "12345678"}
LOGIN = {"email": "sam@example.com", "password": "12345678"}


def test_register(client):
    response = client.post("/api/auth/register", json=REGISTRATION)

    assert response.status_code == 200
    body = response.json()
    assert body["message"]
    assert body["access_token"]


@pytest.mark.parametrize(
    "change",
    [
        {"email": "not-an-email"},
        {"password": "1234567"},
        {"name": ""},
    ],
    ids=["bad-email", "short-password", "empty-name"],
)
def test_register_rejects_invalid_details(client, change):
    response = client.post("/api/auth/register", json={**REGISTRATION, **change})

    assert response.status_code == 422


def test_login(client):
    response = client.post("/api/auth/login", json=LOGIN)

    assert response.status_code == 200
    body = response.json()
    assert body["message"]
    assert body["access_token"]


@pytest.mark.parametrize(
    "change",
    [{"email": "not-an-email"}, {"password": "1234567"}],
    ids=["bad-email", "short-password"],
)
def test_login_rejects_invalid_details(client, change):
    response = client.post("/api/auth/login", json={**LOGIN, **change})

    assert response.status_code == 422
