import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

import pytest

from app.core.config import Settings, _parse_csv_env

BACKEND_DIR = Path(__file__).resolve().parents[1]
# All the child Python inherits: enough to start it on Linux, macOS and Windows.
CHILD_BASE_VARS = ("PATH", "HOME", "SYSTEMROOT")

PRINT_SETTINGS = """
import json
from app.core.config import settings
print(json.dumps({**settings.model_dump(), "allowed_origins": settings.allowed_origins}))
"""


@pytest.fixture
def load_settings(tmp_path, tmp_path_factory):
    """Return a function that imports a copy of the app in a fresh Python.

    The copy lives in tmp_path, so each test writes its own tmp_path/.env and
    the real backend/.env is never read. Python runs from another directory,
    so the .env file has to be found next to the app, not in the working one.
    The child does not inherit this process's environment, which holds the
    developer's shell and every key of the real backend/.env, so no setting
    can leak in; it sees only the variables a test passes.
    """
    shutil.copytree(
        BACKEND_DIR / "app", tmp_path / "app", ignore=shutil.ignore_patterns("__pycache__")
    )
    elsewhere = tmp_path_factory.mktemp("elsewhere")

    def load(env_file=None, **env):
        if env_file is not None:
            (tmp_path / ".env").write_text(env_file)
        child_env = {name: os.environ[name] for name in CHILD_BASE_VARS if name in os.environ}
        child_env.update(env, PYTHONPATH=str(tmp_path))
        result = subprocess.run(
            [sys.executable, "-c", PRINT_SETTINGS],
            cwd=elsewhere,
            env=child_env,
            capture_output=True,
            text=True,
        )
        assert result.returncode == 0, result.stderr
        return json.loads(result.stdout)

    return load


def test_env_file_is_read(load_settings):
    settings = load_settings(
        "MONGODB_URI=mongodb://db.example.com:27017\n"
        "MONGODB_DB=from_env_file\n"
        "GROQ_API_KEY=key-from-env-file\n"
        "CORS_ORIGINS=http://localhost:3000, https://app.example.com\n"
    )

    assert settings["mongodb_uri"] == "mongodb://db.example.com:27017"
    assert settings["mongodb_db"] == "from_env_file"
    assert settings["groq_api_key"] == "key-from-env-file"
    assert settings["allowed_origins"] == ["http://localhost:3000", "https://app.example.com"]


def test_environment_beats_env_file(load_settings):
    settings = load_settings(
        "MONGODB_DB=from_env_file\nGROQ_API_KEY=key-from-env-file\n",
        MONGODB_DB="from_environment",
    )

    assert settings["mongodb_db"] == "from_environment"
    assert settings["groq_api_key"] == "key-from-env-file"


def test_defaults_apply_without_env_file(load_settings):
    settings = load_settings()

    assert settings["mongodb_uri"] == "mongodb://localhost:27017"
    assert settings["mongodb_db"] == "neuro_productivity"
    assert settings["groq_api_key"] == ""
    assert settings["allowed_origins"] == ["http://localhost:3000"]


def test_settings_read_the_environment_when_created(monkeypatch):
    monkeypatch.setenv("MONGODB_URI", "mongodb://db.example.com:27017")
    monkeypatch.setenv("MONGODB_DB", "from_environment")
    monkeypatch.setenv("GROQ_API_KEY", "test-key")
    monkeypatch.setenv("CORS_ORIGINS", "http://localhost:3000, https://app.example.com")

    settings = Settings()

    assert settings.mongodb_uri == "mongodb://db.example.com:27017"
    assert settings.mongodb_db == "from_environment"
    assert settings.groq_api_key == "test-key"
    assert settings.allowed_origins == ["http://localhost:3000", "https://app.example.com"]


def test_conftest_pins_every_setting(monkeypatch, pinned_env):
    # An unpinned setting takes the developer's own value from the shell or
    # backend/.env in the in-process tests, and the default in CI.
    names_read = set()
    getenv = os.getenv

    def recording_getenv(name, default=None):
        names_read.add(name)
        return getenv(name, default)

    monkeypatch.setattr(os, "getenv", recording_getenv)
    Settings()

    assert names_read, "Settings no longer reads os.getenv; update this test"
    unpinned = names_read - pinned_env.keys()
    assert not unpinned, f"Pin these in tests/conftest.py: {sorted(unpinned)}"


def test_allowed_origins_skips_blank_entries():
    settings = Settings(cors_origins=["http://localhost:3000", ""])

    assert settings.allowed_origins == ["http://localhost:3000"]


@pytest.mark.parametrize(
    "raw, expected",
    [
        ("http://localhost:3000", ["http://localhost:3000"]),
        (
            " http://localhost:3000 , https://app.example.com ",
            ["http://localhost:3000", "https://app.example.com"],
        ),
        ("http://localhost:3000,, ,", ["http://localhost:3000"]),
        ("", []),
    ],
    ids=["one", "spaces", "empty-items", "blank"],
)
def test_parse_csv_env_trims_and_drops_empty_items(raw, expected):
    assert _parse_csv_env(raw) == expected
