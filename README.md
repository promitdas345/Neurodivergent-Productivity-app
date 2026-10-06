# Neurodivergent Productivity App

AI-powered productivity starter that pairs a Next.js frontend with a FastAPI backend. MongoDB (Motor) is wired for future CRUD, and Groq/Llama 3.1 is reserved for adaptive task breakdowns, next-best-step nudges, and personalized schedules.

## Stack
- Frontend: Next.js (App Router, TypeScript, Tailwind), axios, Zustand-ready
- Backend: FastAPI, Motor (MongoDB), HTTPX for AI calls
- Infra targets: Vercel (frontend) + Render (backend)

## Project layout
```
frontend/        # Next.js app scaffold with Tailwind
backend/         # FastAPI app with stub auth/tasks routes and MongoDB client
```

## Getting started
1) Frontend
- `cd frontend && npm install`
- `npm run dev` then open http://localhost:3000

2) Backend
- `cd backend`, then create and activate a virtual environment:
  - macOS / Linux: `python3 -m venv .venv && source .venv/bin/activate`
  - Windows: `python -m venv .venv && .\.venv\Scripts\activate`
- `pip install -r requirements.txt`
- Copy `.env.example` to `.env` (`cp` on macOS / Linux, `copy` on Windows) and set `MONGODB_URI`, `MONGODB_DB`, `GROQ_API_KEY`, `CORS_ORIGINS`
- `uvicorn app.main:app --reload --port 8000`

Health check: http://localhost:8000/health  
Stub endpoints: `/api/auth/register`, `/api/auth/login`, `/api/tasks/create`, `/api/tasks/list`

## Next steps
- Connect MongoDB collections and replace stubbed responses with real CRUD + auth.
- Add shared types/API client in the frontend and wire Zustand stores.
- Introduce Groq calls for task breakdown + scheduling once keys are set.
