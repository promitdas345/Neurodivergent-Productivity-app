# Backend — FastAPI

## Quick start
- Needs Python 3.10 or later (CI uses 3.13).
- Create a virtual environment and install dependencies:
  - macOS / Linux: `python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt`
  - Windows: `python -m venv .venv && .\.venv\Scripts\activate && pip install -r requirements.txt`
- Copy `.env.example` to `.env` and fill in values. `app/core/config.py` loads it at startup; variables already set in your shell take precedence.
- Run the dev server: `uvicorn app.main:app --reload --port 8000`

## Tests
- Install the test dependencies once: `pip install -r requirements-dev.txt`
- Run them: `pytest`. They need no database or network; CI runs them on every pull request.

## Endpoints scaffolded
- `GET /health` — service check
- `POST /api/auth/register` — placeholder registration
- `POST /api/auth/login` — placeholder login
- `POST /api/tasks/create` — create a task (stub)
- `GET /api/tasks/list` — list tasks (stub)

## Notes
- MongoDB + Motor client is wired up in `app/core/lifespan.py` but not yet used for real CRUD.
- CORS uses `CORS_ORIGINS` from environment; defaults to `http://localhost:3000` for the Next.js app.
- Send JSON bodies with `Content-Type: application/json`; FastAPI rejects a JSON body without it (422).
