Neurodivergent Productivity makes calm tools for ADHD, autistic and dyslexic brains: personalised tasking, focus and planning that turns big tasks into micro-steps and always offers one next step. It looks like a night sky — deep slate, one glow of indigo, glass cards — so the screen stays quiet and the thing to do next is the brightest thing on it.

## Principles

1. **Calm by default.** One accent hue (`accent`). Status colors appear only where status lives. No flashing, looping animation, confetti or sound that starts on its own; sound cues start off.
2. **One next step.** Each screen has at most one `primary` button — the step to take now. Everything else is `secondary` or `quiet`.
3. **Time you can see.** Durations are numbers ("25 min"); countdowns are a shrinking arc that says when they end ("Ends at 4:47 pm").
4. **Words and shapes, never color alone.** Every status carries a word and an icon; every icon-only button has an `aria-label`.
5. **Readable first.** Nothing in the app is smaller than 14px. Reading text is 16px on 26px lines, left-aligned, no wider than `measure`.

## Voice and content

The landing page sets the voice: plain, direct and specific about who it's for — "Personalised tasking, focus, and planning built for ADHD/Autistic/Dyslexic brains." Feature names are short nouns in sentence case: "Task system", "Focus mode", "AI assist". The vocabulary is micro-steps, next-best step, focus block, energy, rhythm.

- Speak to the person as "you". "We" is the team, and only in announcements ("We'll attach MongoDB…").
- One idea per sentence, about 20 words at most. Literal words — no idioms, sarcasm or puns: "Start a 25-minute focus block", not "Let's crush it".
- Sentence case for headings, buttons and labels. Uppercase only in `eyebrow` and `overline`, four words at most.
- Buttons start with a verb and say what happens: "Start · 10 min", "Make it smaller", "Not now".
- Numbers as digits with units: "25 min", "2 of 5 steps", "Today, 5 pm".
- No shame and no alarm. Never "overdue", "failed", "you missed" or "streak lost". A late task says when it was due and offers a new time: "Was due Tue · Pick a new time".
- Say what happens next and that it can be undone: "Moved to tomorrow. Undo".
- Label AI suggestions as suggestions and keep them editable: "Suggested by AI — edit anything."
- No emoji in the interface; no exclamation marks.

| Task status (API) | Say | Icon |
| --- | --- | --- |
| `pending` | To do | circle-dashed |
| `in_progress` | Doing | circle-dot |
| `done` | Done | circle-check |

Energy (`energy_level`) is said as Morning, Afternoon or Night, with the sunrise, sun and moon glyphs.

## Color

- Two themes. **Dark is the brand**: its values are the brand constants `night`, `night-mid`, `starlight`, `glow`, `glow-soft` and `mist`, taken from the landing page. **Light** is the daytime counterpart, built from the same slate and indigo.
- Paint pages on `surface` and group content on `surface-raised` with a `line` border. In dark, cards are glass: `surface-raised` (white at 5%) plus `line` (white at 10%) plus `backdrop-filter: blur(var(--blur-glass))`, over the hero gradient `linear-gradient(to bottom, var(--night), var(--night-mid), var(--night))`.
- The landing hero is night in both themes: `night` ground, `starlight` headline, `glow-soft` eyebrow, `mist` card titles.
- Text: `ink` for headings and task titles, `ink-soft` for body copy in cards, `ink-muted` for metadata and hints, `ink-title` for card titles, `ink-accent` for eyebrows, overlines and links. Each holds 4.5:1 or better on every surface in both themes.
- `accent` is the only action color: primary buttons, checked boxes, progress, the timer arc, list dots and the focus ring. Text on any solid fill is `on-fill`.
- Status: `success` for Done, `warning` for gentle time cues, `danger` for destructive actions and errors — each with its `-soft` tint and always beside a word and an icon. `success` is cyan rather than green, so Done and `danger` differ without red–green vision. Late work is never `danger`.
- Energy is not color-coded: energy chips are neutral and the glyph carries the level.
- The page ground is never pure white and text is never pure black; `background` and `foreground` stay on the root body only.

## Type

- Geist for everything. Geist Mono only for numbers that count — the timer, durations, step counts, character counters — because its fixed-width digits don't jitter.
- In the app: `body` for reading text, `ui` for task titles, buttons and labels, `chip` inside pills, `caption` for metadata in `ink-muted`, `timer` for the countdown, `mono` for durations and counts.
- On the landing page: `eyebrow`, then `display` (`display-sm` below 640px), then `lead`; feature cards use `title` and `body-sm`; panels use `heading` and `overline`.
- Left-align everything and never justify. Emphasise with weight 600 — never italics, and never underline, which means a link. Keep reading lines within `measure` and lead paragraphs within `prose-max`.

## Space, shape and layout

- 4px base; token numbers are Tailwind steps (`space-5` is `p-5`).
- Page: `content-max` wide, `space-6` gutters (`space-10` from 640px), `space-16` above and below, `space-10` between sections, `space-4` between cards.
- Cards and task rows: `radius-2xl`, padded `space-5` (`space-6` for panels, `space-4` for task rows). Buttons and inputs: `radius-xl`. Chips, tags, badges, dots and bars: `radius-full`. Checkboxes: `radius-md`. Nothing is square.
- Everything clickable is at least `target-min` (44px) tall; focus mode's main buttons are 52px.
- Elevation: in light, `shadow-sm` at rest and `shadow-lg` for anything floating; in dark, borders and glass only.

## States

- Keyboard focus shows `focus-ring` on every control: a 2px `surface` gap, then 2px of solid `accent`.
- Hover moves a border to `line-accent`; interactive landing cards also lift by `space-1`.
- Selected: `accent-soft` with a 2px `accent` ring. In progress: `line-accent` border plus the Doing badge. Done: muted text plus a `success` check — no strikethrough.
- Disabled: 50% opacity, with a reason nearby.
- Errors say what to do, in `danger` with the circle-alert icon: "Add a title so you can find this later."

## Motion

- 150ms with `cubic-bezier(0.4, 0, 0.2, 1)` (Tailwind's default) for color, border and the 4px lift. The timer arc moves linearly once a second.
- Nothing moves on its own: no loops, no confetti. Finishing something is a check filling in.
- Under `prefers-reduced-motion: reduce`, drop the lift and every transition.

## Iconography

- Lucide outline icons (ISC licence): 24px grid, 2px stroke, round caps and joins, drawn in `currentColor` — 20px in buttons, 16px in chips. The set lives in `components/icons.ts`; `<Icon name=… />` draws them inline. Add a new one by copying its nodes from lucide.dev.
- An icon sits beside a word. Icon-only buttons (reset, sound, remove tag) carry an `aria-label`.
- Footprints marks micro-steps and AI suggestions. No sparkles, no emoji.
- There is no logo yet: set the product name in Geist 600, in `ink` (`starlight` on night).

## Using it in this app

- Files: `tokens.css` holds the token values as CSS variables for both themes; `tokens.json` is the same set as data (the format of the design system on claude.ai), so change the two together. `tailwind.css` maps every color token into Tailwind, so `bg-surface`, `text-ink`, `border-line`, `bg-accent` and `text-on-fill` work and follow the theme. `components.css` and `components/` are the React components.
- `app/globals.css` imports `tokens.css`, `tailwind.css` and `components.css` after `tailwindcss`.
- Use the semantic color utilities, never raw palette colors (`slate-*`, `indigo-*`) or hex values. Spacing and radii are Tailwind's defaults (`p-5` is `space-5`, `rounded-2xl` is `radius-2xl`).
- Text outside the components uses the `type-*` classes from `tokens.css` (`type-body`, `type-ui`, `type-title`, `type-eyebrow` …).
- Components: `import { Button, TaskItem, FocusTimer } from "@/design-system/components"` — Button, Card, DotList, Checkbox, TextField, SegmentedControl, Tag, EnergyChip, StatusBadge, TaskItem, FocusTimer, MicroSteps, NextStepNudge and Icon. Reach for them before writing new UI. A new shared component goes in `components/index.tsx`, styled in `components.css` with `nd-` classes on the tokens, and gets a line here.
- Themes: light by default, dark when the OS is dark; set `data-theme="light"` or `"dark"` on `<html>` to pin one (for a theme toggle).
- The live reference with previews is the Neurodivergent Productivity design system on claude.ai.
