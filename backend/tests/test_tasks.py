import time
from datetime import datetime, timedelta, timezone

import pytest

# The fields the frontend reads from a task.
TASK_FIELDS = {
    "id",
    "title",
    "description",
    "tags",
    "energy_level",
    "mood",
    "due_date",
    "status",
    "created_at",
}
NOT_UTC = timedelta(hours=-3, minutes=-30)


@pytest.fixture
def local_time_is_not_utc():
    """Run with local time 3.5 hours behind UTC.

    GitHub's runners use UTC, where local time would pass for UTC. The POSIX
    TZ string needs no tz database. Windows has no time.tzset, so there the
    test runs in the machine's own zone.
    """
    if not hasattr(time, "tzset"):
        yield
        return
    try:
        with pytest.MonkeyPatch.context() as patch:
            patch.setenv("TZ", "NST+03:30")
            time.tzset()
            assert datetime.now().astimezone().utcoffset() == NOT_UTC
            yield
    finally:
        # TZ is back to what it was; make the process use it again.
        time.tzset()


def create_task(client, **fields):
    return client.post("/api/tasks/create", json={"title": "Plan the week", **fields})


def created_at_from_list(client):
    return client.get("/api/tasks/list").json()[0]["created_at"]


def created_at_from_create(client):
    return create_task(client).json()["created_at"]


def test_list_returns_tasks(client):
    response = client.get("/api/tasks/list")

    assert response.status_code == 200
    [task] = response.json()
    assert task.keys() == TASK_FIELDS


def test_create_returns_a_pending_task(client):
    response = create_task(client, description="Pick three things", tags=["planning"])

    assert response.status_code == 200
    task = response.json()
    assert task["id"]
    assert task["title"] == "Plan the week"
    assert task["description"] == "Pick three things"
    assert task["tags"] == ["planning"]
    assert task["status"] == "pending"


@pytest.mark.parametrize(
    "get_created_at", [created_at_from_list, created_at_from_create], ids=["list", "create"]
)
def test_created_at_is_utc_and_current(client, get_created_at, local_time_is_not_utc):
    before = datetime.now(timezone.utc)
    created_at = datetime.fromisoformat(get_created_at(client))
    after = datetime.now(timezone.utc)

    assert created_at.utcoffset() == timedelta(0)
    assert before <= created_at <= after


def test_title_is_required(client):
    response = client.post("/api/tasks/create", json={})

    assert response.status_code == 422


@pytest.mark.parametrize(
    "title, status_code",
    [("", 422), ("x" * 140, 200), ("x" * 141, 422)],
    ids=["empty", "140-chars", "141-chars"],
)
def test_title_length(client, title, status_code):
    assert create_task(client, title=title).status_code == status_code


@pytest.mark.parametrize(
    "description, status_code",
    [("x" * 500, 200), ("x" * 501, 422)],
    ids=["500-chars", "501-chars"],
)
def test_description_length(client, description, status_code):
    assert create_task(client, description=description).status_code == status_code


@pytest.mark.parametrize("energy_level", ["Morning", "Afternoon", "Night"])
def test_energy_level_accepts_the_three_levels(client, energy_level):
    response = create_task(client, energy_level=energy_level)

    assert response.status_code == 200
    assert response.json()["energy_level"] == energy_level


def test_energy_level_is_optional(client):
    response = create_task(client)

    assert response.status_code == 200
    assert response.json()["energy_level"] is None


@pytest.mark.parametrize("energy_level", ["Banana", "morning"])
def test_energy_level_rejects_other_values(client, energy_level):
    assert create_task(client, energy_level=energy_level).status_code == 422
