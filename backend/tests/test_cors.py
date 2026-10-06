import pytest


def preflight(client, origin):
    return client.options(
        "/api/tasks/list",
        headers={"Origin": origin, "Access-Control-Request-Method": "GET"},
    )


# conftest configures both origins. The second is not the default, so this
# fails if main.py hard-codes the frontend's origin instead of reading settings.
@pytest.mark.parametrize(
    "origin",
    ["http://localhost:3000", "https://app.example.com"],
    ids=["frontend", "second-configured-origin"],
)
def test_preflight_from_a_configured_origin_is_allowed(client, origin):
    response = preflight(client, origin)

    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == origin


def test_preflight_from_another_origin_is_refused(client):
    response = preflight(client, "https://elsewhere.example.com")

    assert response.status_code == 400
    assert "access-control-allow-origin" not in response.headers
