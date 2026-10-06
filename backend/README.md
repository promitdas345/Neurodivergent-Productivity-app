# Backend — FastAPI

## Quick start
- Create a virtual environment and install dependencies:
  - macOS / Linux: `python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt`
  - Windows: `python -m venv .venv && .\.venv\Scripts\activate && pip install -r requirements.txt`
- Copy `.env.example` to `.env` and fill in values. `app/core/config.py` loads it at startup; variables already set in your shell take precedence.
- Run the dev server: `uvicorn app.main:app --reload --port 8000`

## Endpoints scaffolded
- `GET /health` — service check
- `POST /api/auth/register` — placeholder registration
- `POST /api/auth/login` — placeholder login
- `POST /api/tasks/create` — create a task (stub)
- `GET /api/tasks/list` — list tasks (stub)

## Notes
- MongoDB + Motor client is wired up in `app/core/lifespan.py` but not yet used for real CRUD.
- CORS uses `CORS_ORIGINS` from environment; defaults to `http://localhost:3000` for the Next.js app.
