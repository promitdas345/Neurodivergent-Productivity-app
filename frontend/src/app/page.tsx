import { Fragment } from "react";
import { Card, DotList } from "@/design-system/components";

const featureCards = [
  {
    title: "Task system",
    body: "Create, update, and tag tasks with ADHD-friendly labels while we wire in MongoDB.",
  },
  {
    title: "Focus mode",
    body: "A built-in timer with sound cues that stay off until you turn them on.",
  },
  {
    title: "AI assist",
    body: "Groq and Llama 3.1 will break big tasks into micro-steps and suggest one next-best step.",
  },
];

// DotList is a client component, so React serializes this array as a list and warns about any
// element in it without a key. Strings need no key.
const nextSteps = [
  <Fragment key="frontend">
    Run <code className="type-mono">npm run dev</code> here and visit http://localhost:3000
  </Fragment>,
  <Fragment key="api">
    Start the API with <code className="type-mono">uvicorn app.main:app --reload --port 8000</code> from /backend
  </Fragment>,
  "Add MongoDB and Groq keys to the .env files before real data or AI calls",
];

// The landing hero is night in both themes, so the whole page pins the dark tokens.
export default function Home() {
  return (
    <div data-theme="dark" className="min-h-screen bg-linear-to-b from-night via-night-mid to-night text-ink">
      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16 sm:px-10">
        <header className="grid gap-4">
          <p className="type-eyebrow text-ink-accent">Neurodivergent Productivity</p>
          <h1 className="type-display-sm type-hero text-ink">
            Personalised tasking, focus, and planning built for ADHD/<wbr />Autistic/<wbr />Dyslexic brains.
          </h1>
          <p className="type-lead max-w-(--prose-max) text-ink-soft">
            The Next.js frontend and FastAPI backend are scaffolded. We&apos;ll attach MongoDB and Groq&apos;s
            Llama 3.1 next. They&apos;ll turn big tasks into micro-steps, suggest a next-best step and learn your
            rhythm.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Features">
          {featureCards.map((card) => (
            <Card key={card.title} title={card.title} titleLevel={2}>
              <p className="type-body-sm">{card.body}</p>
            </Card>
          ))}
        </section>

        <Card as="section" padding="lg" className="grid gap-4 lg:grid-cols-3">
          <div className="grid content-start gap-2 lg:col-span-2">
            <h2 className="type-heading text-ink-title">Phase 1 — Core architecture</h2>
            <p className="type-body-sm max-w-(--measure)">
              Auth and task routes are stubs on FastAPI. The frontend is ready for Zustand stores, API hooks and the
              focus-mode UI. MongoDB is connected but idle until we add real CRUD.
            </p>
          </div>
          <div className="grid content-start gap-2">
            <h3 className="type-overline text-ink-accent">Next steps</h3>
            <DotList items={nextSteps} />
          </div>
        </Card>
      </main>
    </div>
  );
}
