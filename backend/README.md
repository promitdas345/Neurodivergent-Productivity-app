# Backend — FastAPI

## Quick start
- Install dependencies: `python -m venv .venv && .\\.venv\\Scripts\\activate && pip install -r requirements.txt`
- Copy `.env.example` to `.env` and fill in values.
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
