// Every design-system component on one page — open /design after changing tokens or components,
// and check it with the OS (or browser devtools) in both light and dark.
import {
  Button, Card, DotList, Checkbox, TextField, SegmentedControl, Tag, EnergyChip,
  StatusBadge, TaskItem, FocusTimer, MicroSteps, NextStepNudge, Icon,
} from "@/design-system/components";

export const metadata = { title: "Design system" };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4">
      <h2 className="type-overline text-ink-accent">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignPage() {
  return (
    <div className="min-h-screen bg-surface text-ink">
      <main className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:px-10">
        <header className="grid gap-2">
          <p className="type-eyebrow text-ink-accent">Neurodivergent Productivity</p>
          <h1 className="type-display-sm text-ink">Design system</h1>
        </header>
  
        <Section title="Actions">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" icon="play">Start · 25 min</Button>
            <Button icon="plus">Add a task</Button>
            <Button variant="quiet">Not now</Button>
            <Button variant="danger" icon="trash-2">Delete task</Button>
          </div>
        </Section>
  
        <Section title="Surfaces">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card title="Task system" titleLevel={3} interactive>
              <p className="type-body-sm">Create, update, and tag tasks with ADHD-friendly labels.</p>
            </Card>
            <Card title="Focus mode" titleLevel={3} interactive>
              <p className="type-body-sm">Built-in timer plus spots for sound cues.</p>
            </Card>
            <Card title="Next steps" titleLevel={3}>
              <DotList items={["Pick one task", "Start a focus block", "Take a break"]} />
            </Card>
          </div>
        </Section>
  
        <Section title="Tasks">
          <div className="grid gap-2">
            <TaskItem
              title="Draft the intro paragraph"
              description="Two or three sentences on who the app is for."
              status="in_progress"
              energy="Afternoon"
              due="Today, 5 pm"
              dueSoon
              steps={{ done: 2, total: 5 }}
              tags={["writing"]}
              action={<Button variant="quiet" icon="play">Focus</Button>}
            />
            <TaskItem title="Book the dentist" energy="Morning" due="Fri" tags={["admin"]} />
            <TaskItem title="Try focus mode" description="Start with a 25-minute focus block." status="done" tags={["focus", "onboarding"]} />
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="pending" />
            <StatusBadge status="in_progress" />
            <StatusBadge status="done" />
            <EnergyChip level="morning" />
            <EnergyChip level="afternoon" />
            <EnergyChip level="night" />
            <Tag>focus</Tag>
          </div>
        </Section>
  
        <Section title="Forms">
          <div className="grid max-w-md gap-6">
            <TextField label="Task title" maxLength={140} showCount defaultValue="Draft the intro paragraph" />
            <TextField label="Notes" multiline maxLength={500} hint="Optional. Up to 500 characters." placeholder="What does done look like?" />
            <Checkbox label="Play a sound when a block ends" hint="Off unless you turn it on." />
            <SegmentedControl
              label="Energy"
              defaultValue="afternoon"
              options={[
                { value: "morning", label: "Morning", icon: "sunrise" },
                { value: "afternoon", label: "Afternoon", icon: "sun" },
                { value: "night", label: "Night", icon: "moon" },
              ]}
            />
          </div>
        </Section>
  
        <Section title="AI assist">
          <NextStepNudge
            step="Add one sentence about who the app is for."
            reason="It’s step 3 of 5, and you have 25 minutes before your next class."
            minutes={10}
          />
          <MicroSteps
            title="Draft the intro paragraph"
            steps={[
              { id: "a", text: "Open the doc and find the intro", minutes: 2, done: true },
              { id: "b", text: "Write one messy sentence about the problem", minutes: 5, done: true },
              { id: "c", text: "Add one sentence about who it’s for", minutes: 5 },
              { id: "d", text: "Read it out loud once", minutes: 3 },
            ]}
          />
        </Section>
  
        <Section title="Focus">
          <FocusTimer minutes={25} initialSeconds={18 * 60 + 42} task="Draft the intro paragraph" />
        </Section>
  
        <Section title="Icons">
          <div className="flex flex-wrap gap-4 text-ink">
            {(["check", "circle-dashed", "circle-dot", "circle-check", "sunrise", "sun", "moon", "play", "pause", "rotate-ccw", "plus", "timer", "footprints", "arrow-right", "x", "clock", "calendar", "circle-alert", "trash-2", "volume-2", "volume-x", "tag"] as const).map((n) => (
              <Icon key={n} name={n} size={24} label={n} />
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}
