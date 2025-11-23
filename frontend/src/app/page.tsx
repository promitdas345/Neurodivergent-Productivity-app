const featureCards = [
  {
    title: "Task system MVP",
    body: "Create, update, and tag tasks with ADHD-friendly labels while we wire in MongoDB.",
  },
  {
    title: "Focus mode",
    body: "Built-in timer scaffolding plus spots for sound cues and dopamine boosts.",
  },
  {
    title: "AI assist",
    body: "Groq + Llama 3.1 hooks reserved for breakdowns, next-best-step nudges, and adaptive plans.",
  },
];

const nextSteps = [
  "Run `npm run dev` here and visit http://localhost:3000",
  "Start the API with `uvicorn app.main:app --reload --port 8000` from /backend",
  "Update .env files with MongoDB + Groq keys before real data or AI calls",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16 sm:px-10">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-200">
            Neurodivergent Productivity App
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Personalised tasking, focus, and planning built for ADHD/Autistic/Dyslexic brains.
          </h1>
          <p className="max-w-3xl text-lg text-slate-300">
            Next.js frontend + FastAPI backend are scaffolded. We&apos;ll attach MongoDB and Groq&apos;s
            Llama 3.1 to turn complex tasks into micro-steps, suggest next-best actions, and learn your rhythm.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:-translate-y-1 hover:border-indigo-300/60"
            >
              <h2 className="text-xl font-semibold text-indigo-100">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">{card.body}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:grid-cols-3">
          <div className="space-y-2 lg:col-span-2">
            <h3 className="text-lg font-semibold text-indigo-100">Phase 1 — Core architecture</h3>
            <p className="text-sm text-slate-200">
              Auth + tasks routes are stubbed on FastAPI. Frontend is ready for Zustand stores, API hooks,
              and focus-mode UI. MongoDB connection is set up but idle until we add real CRUD.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200">Next steps</h4>
            <ul className="space-y-2 text-sm text-slate-100">
              {nextSteps.map((step) => (
                <li key={step} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-indigo-300" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
