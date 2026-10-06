import os

import pytest
from fastapi.testclient import TestClient

# Import the app with known settings, whatever the shell or backend/.env says.
# Variables already in the environment beat backend/.env, so these win. A plain
# mongodb:// URI also keeps Motor from looking up DNS records at startup.
# Every variable Settings reads must be pinned here, or a developer's own value
# leaks into the tests; test_config.py fails when one is missing.
# CORS_ORIGINS lists a second origin that is not the default, so the CORS tests
# fail if main.py stops reading settings.
PINNED_ENV = {
    "MONGODB_URI": "mongodb://localhost:27017",
    "MONGODB_DB": "neuro_productivity_test",
    "GROQ_API_KEY": "",
    "CORS_ORIGINS": "http://localhost:3000,https://app.example.com",
}
os.environ.update(PINNED_ENV)

from app.main import app  # noqa: E402


@pytest.fixture
def pinned_env():
    return dict(PINNED_ENV)


@pytest.fixture
def client():
    # The with block runs the lifespan, which creates the Motor client.
    # Motor connects lazily, so no MongoDB server is needed.
    with TestClient(app) as client:
        yield client
