from motor.motor_asyncio import AsyncIOMotorClient


def test_health_check_runs_with_the_lifespan(client):
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "Neurodivergent Productivity API"}
    assert isinstance(client.app.state.mongo_client, AsyncIOMotorClient)
