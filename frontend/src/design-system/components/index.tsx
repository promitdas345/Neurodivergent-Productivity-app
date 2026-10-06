"use client";

// Neurodivergent Productivity — components. Import from "@/design-system/components".
// Card and DotList come from the landing page; the rest are built around the task model
// (status, energy_level, tags, due_date). Styles: ../components.css, on the tokens in ../tokens.css.
import * as React from "react";
import { ICONS, type IconName } from "./icons";

export type { IconName };

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(" ");

/* ───────────────────────── Icon ───────────────────────── */

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "name"> {
  /** A Lucide icon from this system's set. */
  name: IconName;
  /** Pixel size; 20 in buttons, 16 in chips. */
  size?: number;
  /** Accessible name. Leave out when a word sits beside the icon — it is then hidden from screen readers. */
  label?: string;
}

/** One Lucide outline icon, drawn inline in currentColor. */
export function Icon({ name, size = 20, label, className, ...rest }: IconProps) {
  const nodes = ICONS[name] as ReadonlyArray<readonly [string, Record<string, string>]>;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("nd-icon", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...rest}
    >
      {nodes.map(([tag, attrs], i) => React.createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}

/* ───────────────────────── Button ───────────────────────── */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary: the one next step on the screen (at most one per view). secondary: everything else. quiet: low-stakes extras. danger: destructive. */
  variant?: "primary" | "secondary" | "quiet" | "danger";
  /** md is 44px tall; lg (52px) is for focus mode and other big moments. */
  size?: "md" | "lg";
  /** Leading icon. With no children the button is icon-only and needs an aria-label. */
  icon?: IconName;
}

/** A button that says what happens, verb first. */
export function Button({ variant = "secondary", size = "md", icon, className, children, type = "button", ...rest }: ButtonProps) {
  const iconOnly = children == null || children === false;
  return (
    <button
      type={type}
      className={cx("nd-btn", `nd-btn--${variant}`, size === "lg" && "nd-btn--lg", iconOnly && "nd-btn--icon", className)}
      {...rest}
    >
      {icon && <Icon name={icon} size={20} />}
      {!iconOnly && <span>{children}</span>}
    </button>
  );
}

/* ───────────────────────── Card ───────────────────────── */

export interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Optional title, set in the `title` style and `ink-title`. */
  title?: React.ReactNode;
  /** Heading level for the title (page.tsx uses h2 for feature cards, h3 for panels). */
  titleLevel?: 2 | 3 | 4;
  /** md = 20px (feature cards), lg = 24px (panels). */
  padding?: "md" | "lg";
  /** Lifts 4px and takes the accent border on hover — only for cards that are links or buttons. */
  interactive?: boolean;
  as?: "div" | "section" | "article" | "li";
}

/** The glass card from the landing page: a raised, bordered, 16px-rounded surface. */
export function Card({ title, titleLevel = 3, padding = "md", interactive = false, as = "div", className, children, ...rest }: CardProps) {
  const Heading = `h${titleLevel}` as "h2" | "h3" | "h4";
  return React.createElement(
    as,
    { className: cx("nd-card", padding === "lg" && "nd-card--lg", interactive && "nd-card--interactive", className), ...rest },
    title != null ? <Heading className="nd-card__title">{title}</Heading> : null,
    children
  );
}

/* ───────────────────────── DotList ───────────────────────── */

export interface DotListProps extends React.HTMLAttributes<HTMLUListElement> {
  items: React.ReactNode[];
}

/** A short list with the landing page's indigo dots. */
export function DotList({ items, className, ...rest }: DotListProps) {
  return (
    <ul className={cx("nd-dots", className)} {...rest}>
      {items.map((item, i) => (
        <li key={i}>
          <span className="nd-dots__dot" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ───────────────────────── Checkbox ───────────────────────── */

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** Round, for completing tasks and steps; square for settings and forms. */
  round?: boolean;
  /** success fills the box with `success` (task and step completion); accent is the default. */
  tone?: "accent" | "success";
}

/** A checkbox with a 44px hit area, a visible label and an optional hint. */
export function Checkbox({ label, hint, round = false, tone = "accent", className, id, ...rest }: CheckboxProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  return (
    <label className={cx("nd-check", round && "nd-check--round", tone === "success" && "nd-check--success", className)} htmlFor={inputId}>
      <input id={inputId} type="checkbox" className="nd-check__input" aria-describedby={hintId} {...rest} />
      <span className="nd-check__box" aria-hidden="true">
        <Icon name="check" size={14} strokeWidth={3} />
      </span>
      {(label != null || hint != null) && (
        <span className="nd-check__text">
          {label != null && <span className="nd-check__label">{label}</span>}
          {hint != null && (
            <span className="nd-check__hint" id={hintId}>
              {hint}
            </span>
          )}
        </span>
      )}
    </label>
  );
}

/* ───────────────────────── TextField ───────────────────────── */

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>, "size"> {
  /** Always visible — never use the placeholder as the label. */
  label: React.ReactNode;
  hint?: React.ReactNode;
  /** What to do, kindly: "Add a title so you can find this later." */
  error?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
  /** Shows "12 / 140" when maxLength is set. */
  showCount?: boolean;
}

/** A labelled text input or textarea with hint, error and character count. */
export function TextField({ label, hint, error, multiline = false, rows = 3, showCount = false, maxLength, value, defaultValue, onChange, id, className, ...rest }: TextFieldProps) {
  const autoId = React.useId();
  const fieldId = id ?? autoId;
  const [length, setLength] = React.useState(String(value ?? defaultValue ?? "").length);
  const count = value != null ? String(value).length : length;
  const describedBy = cx(hint != null && !error && `${fieldId}-hint`, error != null && error !== false && `${fieldId}-error`) || undefined;
  const props = {
    id: fieldId,
    className: "nd-field__control",
    maxLength,
    value,
    defaultValue,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    onChange: (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
      setLength(e.target.value.length);
      onChange?.(e);
    },
    ...rest,
  };
  return (
    <div className={cx("nd-field", error ? "nd-field--error" : false, className)}>
      <div className="nd-field__top">
        <label htmlFor={fieldId} className="nd-field__label">
          {label}
        </label>
        {showCount && maxLength != null && (
          <span className="nd-field__count">
            {count} / {maxLength}
          </span>
        )}
      </div>
      {multiline ? <textarea rows={rows} {...props} /> : <input {...props} />}
      {hint != null && !error && (
        <p className="nd-field__hint" id={`${fieldId}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="nd-field__error" id={`${fieldId}-error`}>
          <Icon name="circle-alert" size={16} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

/* ───────────────────────── SegmentedControl ───────────────────────── */

export interface SegmentOption {
  value: string;
  label: string;
  icon?: IconName;
}

export interface SegmentedControlProps {
  /** Accessible name of the group, e.g. "Energy" or "Focus length". */
  label: string;
  options: SegmentOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

/** Pick one of two to five short options — a radio group with arrow-key support. */
export function SegmentedControl({ label, options, value, defaultValue, onChange, className }: SegmentedControlProps) {
  const [inner, setInner] = React.useState(defaultValue ?? options[0]?.value);
  const current = value ?? inner;
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const anyOn = options.some((o) => o.value === current);
  const select = (next: string, focusIndex?: number) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
    if (focusIndex != null) refs.current[focusIndex]?.focus();
  };
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const n = options.length;
    let j = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") j = (i + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") j = (i - 1 + n) % n;
    else if (e.key === "Home") j = 0;
    else if (e.key === "End") j = n - 1;
    if (j >= 0) {
      e.preventDefault();
      select(options[j].value, j);
    }
  };
  return (
    <div role="radiogroup" aria-label={label} className={cx("nd-seg", className)}>
      {options.map((o, i) => {
        const on = o.value === current;
        return (
          <button
            key={o.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on || (!anyOn && i === 0) ? 0 : -1}
            className={cx("nd-seg__opt", on && "is-on")}
            onClick={() => select(o.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {o.icon && <Icon name={o.icon} size={18} />}
            <span>{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ───────────────────────── Tag ───────────────────────── */

export interface TagProps {
  /** The tag text, without the #. */
  children: React.ReactNode;
  /** Shows a remove button. */
  onRemove?: () => void;
  className?: string;
}

/** A person's own label on a task, shown as an outlined #pill. */
export function Tag({ children, onRemove, className }: TagProps) {
  const text = typeof children === "string" ? children : "";
  return (
    <span className={cx("nd-tag", className)}>
      <span className="nd-tag__text">{children}</span>
      {onRemove && (
        <button type="button" className="nd-tag__remove" aria-label={text ? `Remove tag ${text}` : "Remove tag"} onClick={onRemove}>
          <Icon name="x" size={14} />
        </button>
      )}
    </span>
  );
}

/* ───────────────────────── EnergyChip ───────────────────────── */

export type EnergyLevel = "morning" | "afternoon" | "night";

const ENERGY: Record<EnergyLevel, { icon: IconName; label: string }> = {
  morning: { icon: "sunrise", label: "Morning" },
  afternoon: { icon: "sun", label: "Afternoon" },
  night: { icon: "moon", label: "Night" },
};

export interface EnergyChipProps {
  /** The task's energy_level; "Morning", "Afternoon" and "Night" from the API work too. */
  level: EnergyLevel | Capitalize<EnergyLevel>;
  /** Overrides the word, e.g. "Best in the morning". */
  children?: React.ReactNode;
  className?: string;
}

/** When a task suits your energy — a neutral chip whose glyph carries the level. */
export function EnergyChip({ level, children, className }: EnergyChipProps) {
  const e = ENERGY[String(level).toLowerCase() as EnergyLevel] ?? ENERGY.morning;
  return (
    <span className={cx("nd-chip", "nd-energy", className)}>
      <Icon name={e.icon} size={16} />
      <span>{children ?? e.label}</span>
    </span>
  );
}

/* ───────────────────────── StatusBadge ───────────────────────── */

export type TaskStatus = "pending" | "in_progress" | "done";

const STATUS: Record<TaskStatus, { icon: IconName; label: string }> = {
  pending: { icon: "circle-dashed", label: "To do" },
  in_progress: { icon: "circle-dot", label: "Doing" },
  done: { icon: "circle-check", label: "Done" },
};

export interface StatusBadgeProps {
  /** The task's status from the API. */
  status: TaskStatus;
  className?: string;
}

/** A task's status as a word and an icon: To do, Doing, Done. */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const s = STATUS[status] ?? STATUS.pending;
  return (
    <span className={cx("nd-chip", "nd-status", `nd-status--${status}`, className)}>
      <Icon name={s.icon} size={16} />
      <span>{s.label}</span>
    </span>
  );
}

/* ───────────────────────── TaskItem ───────────────────────── */

export interface TaskItemProps {
  /** Up to 140 characters. */
  title: string;
  /** Up to 500 characters; shown under the title. */
  description?: string;
  status?: TaskStatus;
  energy?: EnergyLevel | Capitalize<EnergyLevel>;
  tags?: string[];
  /** A written-out time, e.g. "Today, 5 pm" or "Was due Tue". */
  due?: string;
  /** Tints the due chip with `warning` — for "due soon", never for "late". */
  dueSoon?: boolean;
  /** Micro-step progress, shown as "2 of 5 steps". */
  steps?: { done: number; total: number };
  /** Called when the round toggle is checked or cleared. */
  onToggle?: (done: boolean) => void;
  /** Makes the title a button that opens the task. */
  onOpen?: () => void;
  /** A trailing control, e.g. a quiet "Start" button. */
  action?: React.ReactNode;
  className?: string;
}

/** One task in a list: a round done toggle, the title, and its status, energy, due time, steps and tags. */
export function TaskItem({ title, description, status = "pending", energy, tags, due, dueSoon = false, steps, onToggle, onOpen, action, className }: TaskItemProps) {
  const [done, setDone] = React.useState(status === "done");
  React.useEffect(() => setDone(status === "done"), [status]);
  const titleId = React.useId();
  const doing = status === "in_progress" && !done;
  const hasMeta = doing || energy || due || steps || (tags && tags.length > 0);
  return (
    <div className={cx("nd-task", done && "is-done", doing && "is-doing", className)}>
      <Checkbox
        round
        tone="success"
        className="nd-task__toggle"
        checked={done}
        aria-label={done ? `Mark “${title}” not done` : `Mark “${title}” done`}
        onChange={(e) => {
          setDone(e.target.checked);
          onToggle?.(e.target.checked);
        }}
      />
      <div className="nd-task__body">
        <div className="nd-task__title" id={titleId}>
          {onOpen ? (
            <button type="button" className="nd-task__open" onClick={onOpen}>
              {title}
            </button>
          ) : (
            title
          )}
        </div>
        {description && <p className="nd-task__desc">{description}</p>}
        {hasMeta && (
          <div className="nd-task__meta">
            {doing && <StatusBadge status="in_progress" />}
            {done && <StatusBadge status="done" />}
            {energy && <EnergyChip level={energy} />}
            {due && (
              <span className={cx("nd-chip", "nd-due", dueSoon && "nd-due--soon")}>
                <Icon name={dueSoon ? "clock" : "calendar"} size={16} />
                <span>{due}</span>
              </span>
            )}
            {steps && (
              <span className="nd-task__steps">
                {steps.done} of {steps.total} steps
              </span>
            )}
            {tags?.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}
      </div>
      {action && <div className="nd-task__action">{action}</div>}
    </div>
  );
}

/* ───────────────────────── FocusTimer ───────────────────────── */

export interface FocusTimerProps {
  /** Length of the focus block in minutes. */
  minutes?: number;
  /** Seconds left when it first renders (defaults to the full block). */
  initialSeconds?: number;
  /** What the person is focusing on. */
  task?: string;
  autoStart?: boolean;
  /** Minutes added by the extend button. */
  extendBy?: number;
  onComplete?: () => void;
  /** Sound cues start off; this reports the toggle. */
  onSoundChange?: (on: boolean) => void;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** A visible countdown for one focus block: a shrinking arc, the time left and when it ends. */
export function FocusTimer({ minutes = 25, initialSeconds, task, autoStart = false, extendBy = 5, onComplete, onSoundChange, className }: FocusTimerProps) {
  const [total, setTotal] = React.useState(minutes * 60);
  const [left, setLeft] = React.useState(initialSeconds ?? minutes * 60);
  const [running, setRunning] = React.useState(autoStart);
  const [sound, setSound] = React.useState(false);
  const [message, setMessage] = React.useState("");
  // The clock is read only in the tick and in click handlers, so rendering stays pure.
  const [now, setNow] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setNow(Date.now());
      setLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [running]);

  React.useEffect(() => {
    if (running && left === 0) {
      setRunning(false);
      setMessage("Focus block done. Take a short break.");
      onComplete?.();
    }
  }, [left, running, onComplete]);

  const r = 120;
  const c = 2 * Math.PI * r;
  const frac = total > 0 ? left / total : 0;
  const endsAt = now != null ? new Date(now + left * 1000).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : null;
  const state =
    left === 0 ? "Done" : running ? (endsAt ? `Ends at ${endsAt}` : "Running") : left < total ? "Paused" : `${Math.round(total / 60)} min block`;

  return (
    <div className={cx("nd-timer", className)}>
      <div className="nd-timer__dial">
        <svg viewBox="0 0 264 264" width="264" height="264" aria-hidden="true">
          <circle className="nd-timer__track" cx="132" cy="132" r={r} />
          <circle
            className="nd-timer__arc"
            cx="132"
            cy="132"
            r={r}
            strokeDasharray={c}
            strokeDashoffset={c * (1 - frac)}
            transform="rotate(-90 132 132)"
            style={{ opacity: left === 0 ? 0 : 1 }}
          />
        </svg>
        <div className="nd-timer__readout">
          <span className="nd-timer__time" role="timer" aria-label={`${Math.floor(left / 60)} minutes ${left % 60} seconds left`}>
            {pad(Math.floor(left / 60))}:{pad(left % 60)}
          </span>
          <span className="nd-timer__state">{state}</span>
        </div>
      </div>
      {task && (
        <div className="nd-timer__task">
          <span className="nd-timer__label">Focusing on</span>
          <span className="nd-timer__title">{task}</span>
        </div>
      )}
      <div className="nd-timer__controls">
        <Button
          variant="primary"
          size="lg"
          icon={running ? "pause" : "play"}
          disabled={left === 0}
          onClick={() => {
            setNow(Date.now());
            setRunning((x) => !x);
          }}
        >
          {running ? "Pause" : left < total ? "Resume" : "Start"}
        </Button>
        <Button
          variant="secondary"
          size="lg"
          icon="plus"
          onClick={() => {
            setTotal((t) => t + extendBy * 60);
            setLeft((l) => l + extendBy * 60);
            setMessage("");
          }}
        >
          {extendBy} min
        </Button>
        <Button
          variant="quiet"
          size="lg"
          icon="rotate-ccw"
          aria-label="Reset timer"
          onClick={() => {
            setRunning(false);
            setTotal(minutes * 60);
            setLeft(minutes * 60);
            setMessage("");
          }}
        />
        <Button
          variant="quiet"
          size="lg"
          icon={sound ? "volume-2" : "volume-x"}
          aria-label="Sound cues"
          aria-pressed={sound}
          onClick={() => {
            setSound((s) => !s);
            onSoundChange?.(!sound);
          }}
        />
      </div>
      <div className="nd-sr" aria-live="polite">
        {message}
      </div>
    </div>
  );
}

/* ───────────────────────── MicroSteps ───────────────────────── */

export interface MicroStep {
  id: string;
  text: string;
  minutes?: number;
  done?: boolean;
}

export interface MicroStepsProps {
  steps: MicroStep[];
  /** The task being broken down. */
  title?: string;
  /** The step to do now; defaults to the first one not done. */
  currentId?: string;
  onToggle?: (id: string, done: boolean) => void;
  /** Attribution line; pass false to hide it. */
  source?: React.ReactNode | false;
  className?: string;
}

/** A task broken into small checkable steps, with the current one highlighted and progress shown. */
export function MicroSteps({ steps, title, currentId, onToggle, source = "Suggested by AI — edit anything.", className }: MicroStepsProps) {
  const [doneMap, setDoneMap] = React.useState<Record<string, boolean>>(() => Object.fromEntries(steps.map((s) => [s.id, !!s.done])));
  const doneCount = steps.filter((s) => doneMap[s.id]).length;
  const current = currentId ?? steps.find((s) => !doneMap[s.id])?.id;
  const pct = steps.length ? (doneCount / steps.length) * 100 : 0;
  return (
    <section className={cx("nd-steps", className)} aria-label={title ?? "Steps"}>
      <header className="nd-steps__head">
        {title && <h3 className="nd-steps__title">{title}</h3>}
        <div className="nd-steps__progress">
          <span className="nd-steps__count">
            {doneCount} of {steps.length} steps
          </span>
          <div className="nd-bar" role="progressbar" aria-label="Steps done" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={doneCount}>
            <span style={{ width: `${pct}%` }} />
          </div>
        </div>
      </header>
      <ol className="nd-steps__list">
        {steps.map((s) => {
          const isDone = !!doneMap[s.id];
          const isNow = s.id === current;
          return (
            <li key={s.id} className={cx("nd-step", isDone && "is-done", isNow && "is-current")} aria-current={isNow ? "step" : undefined}>
              <Checkbox
                round
                tone="success"
                label={s.text}
                checked={isDone}
                onChange={(e) => {
                  setDoneMap((m) => ({ ...m, [s.id]: e.target.checked }));
                  onToggle?.(s.id, e.target.checked);
                }}
              />
              {isNow && <span className="nd-step__now">Now</span>}
              {s.minutes != null && <span className="nd-step__min">{s.minutes} min</span>}
            </li>
          );
        })}
      </ol>
      {source !== false && (
        <p className="nd-steps__source">
          <Icon name="footprints" size={16} />
          <span>{source}</span>
        </p>
      )}
    </section>
  );
}

/* ───────────────────────── NextStepNudge ───────────────────────── */

export interface NextStepNudgeProps {
  /** One concrete action, verb first: "Open the doc and write one sentence." */
  step: string;
  /** Why now, in one sentence: energy, time free, what it unblocks. */
  reason?: string;
  /** Length of the focus block the Start button begins. */
  minutes?: number;
  onStart?: () => void;
  /** Asks for a smaller step. */
  onSmaller?: () => void;
  /** Dismisses without judgement. */
  onSkip?: () => void;
  /** The overline; defaults to "Next best step". */
  label?: string;
  className?: string;
}

/** The single suggested next step, with why, and three ways to answer: start, make it smaller, not now. */
export function NextStepNudge({ step, reason, minutes, onStart, onSmaller, onSkip, label = "Next best step", className }: NextStepNudgeProps) {
  return (
    <section className={cx("nd-nudge", className)} aria-label={label}>
      <p className="nd-nudge__label">
        <Icon name="footprints" size={16} />
        <span>{label}</span>
      </p>
      <p className="nd-nudge__step">{step}</p>
      {reason && <p className="nd-nudge__reason">{reason}</p>}
      <div className="nd-nudge__actions">
        <Button variant="primary" icon="play" onClick={onStart}>
          {minutes ? `Start · ${minutes} min` : "Start"}
        </Button>
        <Button variant="secondary" onClick={onSmaller}>
          Make it smaller
        </Button>
        <Button variant="quiet" onClick={onSkip}>
          Not now
        </Button>
      </div>
    </section>
  );
}
