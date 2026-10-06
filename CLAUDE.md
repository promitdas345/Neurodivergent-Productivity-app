# Neurodivergent Productivity App

Personalised tasking, focus and planning for ADHD, autistic and dyslexic users. Next.js 16 (App Router, TypeScript, Tailwind v4, React 19) in `frontend/`; FastAPI with MongoDB (Motor) in `backend/`; Groq / Llama 3.1 planned for task breakdowns and next-step nudges.

## Commands

- Frontend, in `frontend/`: `npm run dev` (http://localhost:3000), `npm run lint`, `npm run build`
- Backend, in `backend/` with the venv in `backend/.venv` active: `uvicorn app.main:app --reload --port 8000`
- Backend tests, in `backend/`: `pip install -r requirements-dev.txt` once, then `pytest`. A backend change is done when `pytest` passes.
- CI (`.github/workflows/ci.yml`) runs `pytest`, `npm run lint` and `npm run build` on pull requests and pushes to `main`.
- A UI change is done when `npm run lint` and `npm run build` pass and the page has been checked in light and dark.

## Backend shape

- Endpoints are stubs for now: `GET /api/tasks/list`, `POST /api/tasks/create`, `POST /api/auth/register`, `POST /api/auth/login`; health check at `/health`.
- Task fields (`backend/app/schemas/tasks.py`): title (up to 140), description (up to 500), tags, energy_level (Morning / Afternoon / Night), mood, due_date, status (pending / in_progress / done).
- The frontend reads the API base URL from `NEXT_PUBLIC_API_URL` (default http://localhost:8000).
- JSON requests must send `Content-Type: application/json`; FastAPI rejects a JSON body without it.

## Design system — every UI change follows it

@frontend/src/design-system/README.md

- Build screens from `@/design-system/components` and the semantic Tailwind colors (`bg-surface`, `text-ink`, `border-line` …). No raw palette colors (`slate-*`, `indigo-*`) or hex values in app code.
- One primary button per screen. Status is always a word plus an icon. Nothing smaller than 14px. Respect `prefers-reduced-motion`.
- Copy: sentence case, verb-first buttons, and never "overdue", "failed" or "you missed".
- `/design` renders every component; check it after changing tokens or components.
