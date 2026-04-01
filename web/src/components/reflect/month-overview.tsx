"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import {
  suggestWeeklyFromDailies,
  updateMonthClosing,
  updateMonthIntentions,
  updateWeeklyReview,
} from "@/actions/reflection";
import type { DateChunk } from "@/lib/chunk-month";

type DayRow = {
  id: string;
  date: string;
  events: string;
  win: string;
  miss: string;
  learn: string;
  note: string;
};

type WeekRow = {
  weekIndex: number;
  whatWorked: string;
  whatFailed: string;
  systemChanged: string;
  keepRemoveRefine: string;
  experimentNext: string;
  carryForward: string;
};

type MonthRow = {
  id: string;
  year: number;
  month: number;
  priorities: string;
  goodMonth: string;
  antiGoals: string;
  closingPatterns: string;
  closingTheme: string;
  closingSurprised: string;
  closingStopping: string;
};

export function MonthOverview({
  chunks,
  bundle,
}: {
  chunks: DateChunk[];
  bundle: {
    month: MonthRow;
    days: DayRow[];
    weeklyReviews: WeekRow[];
    starSet: string[];
  };
}) {
  const [pending, startTransition] = useTransition();
  const daysByISO = useMemo(() => {
    const m = new Map<string, DayRow>();
    bundle.days.forEach((d) => m.set(d.date, d));
    return m;
  }, [bundle.days]);
  const weekByIndex = useMemo(() => {
    const m = new Map<number, WeekRow>();
    bundle.weeklyReviews.forEach((w) => m.set(w.weekIndex, w));
    return m;
  }, [bundle.weeklyReviews]);

  const now = new Date();
  const isCurrentMonth =
    now.getFullYear() === bundle.month.year && now.getMonth() + 1 === bundle.month.month;
  const todayISO = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const defaultOpenWeek = useMemo(() => {
    if (!isCurrentMonth) return 0;
    const idx = chunks.findIndex((c) => todayISO >= c.start && todayISO <= c.end);
    return idx >= 0 ? idx : 0;
  }, [chunks, isCurrentMonth, todayISO]);

  const [openWeek, setOpenWeek] = useState<number | null>(defaultOpenWeek);

  return (
    <div>
      <details className="reflect-card" style={{ marginBottom: "1rem" }}>
        <summary style={{ cursor: "pointer", fontWeight: 600 }}>Month intention</summary>
        <IntentionForm monthId={bundle.month.id} initial={bundle.month} pending={pending} startTransition={startTransition} />
      </details>

      {chunks.map((chunk, i) => {
        const weekNum = i + 1;
        const wr = weekByIndex.get(weekNum);
        const prev = weekByIndex.get(weekNum - 1);
        const isOpen = openWeek === i;
        let d = chunk.start;
        const dayLinks: { iso: string; label: string }[] = [];
        while (true) {
          const row = daysByISO.get(d);
          const wd = row ? new Date(d + "T12:00:00").toLocaleString("en-US", { weekday: "short" }) : "";
          dayLinks.push({ iso: d, label: `${wd} ${d.slice(8)}` });
          if (d === chunk.end) break;
          const [yy, mm, dd] = d.split("-").map(Number);
          const next = new Date(yy, mm - 1, dd + 1);
          d = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}-${String(next.getDate()).padStart(2, "0")}`;
        }

        const reviewFilled = wr
          ? [
              wr.whatWorked,
              wr.whatFailed,
              wr.systemChanged,
              wr.keepRemoveRefine,
              wr.experimentNext,
              wr.carryForward,
            ].some((x) => x.trim().length > 0)
          : false;

        return (
          <div key={weekNum} className="reflect-card" style={{ marginBottom: "0.75rem" }}>
            <button
              type="button"
              onClick={() => setOpenWeek(isOpen ? null : i)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "none",
                border: "none",
                color: "inherit",
                cursor: "pointer",
                padding: 0,
                textAlign: "left",
                minHeight: 44,
              }}
            >
              <span style={{ fontWeight: 700 }}>
                Week {weekNum} · {chunk.start.slice(5)} – {chunk.end.slice(5)}
              </span>
              <span style={{ fontSize: "0.8rem", color: "#a1a1aa" }}>
                Weekly review {reviewFilled ? "· saved" : "· open"}
              </span>
            </button>

            {weekNum > 1 && prev && (prev.carryForward.trim() || prev.experimentNext.trim()) && (
              <div
                style={{
                  marginTop: "0.75rem",
                  padding: "0.75rem",
                  background: "var(--reflect-accent-muted)",
                  borderRadius: 8,
                  fontSize: "0.9rem",
                }}
              >
                <strong>From last week</strong>
                {prev.experimentNext.trim() && (
                  <p style={{ margin: "0.35rem 0" }}>
                    <em>Experiment:</em> {prev.experimentNext}
                  </p>
                )}
                {prev.carryForward.trim() && (
                  <p style={{ margin: "0.35rem 0" }}>
                    <em>Carry forward:</em> {prev.carryForward}
                  </p>
                )}
              </div>
            )}

            {isOpen && (
              <>
                <ul style={{ listStyle: "none", padding: 0, margin: "1rem 0" }}>
                  {dayLinks.map(({ iso, label }) => (
                    <li key={iso} style={{ marginBottom: "0.35rem" }}>
                      <Link href={`/reflect/day/${iso}`} style={{ fontWeight: 600 }}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {wr && (
                  <WeeklyReviewForm
                    monthId={bundle.month.id}
                    weekIndex={weekNum}
                    initial={wr}
                    pending={pending}
                    startTransition={startTransition}
                  />
                )}
              </>
            )}
          </div>
        );
      })}

      <details className="reflect-card" style={{ marginTop: "1rem" }}>
        <summary style={{ cursor: "pointer", fontWeight: 600 }}>Month closing</summary>
        <MonthClosingForm monthId={bundle.month.id} initial={bundle.month} pending={pending} startTransition={startTransition} />
      </details>
    </div>
  );
}

function MonthClosingForm({
  monthId,
  initial,
  pending,
  startTransition,
}: {
  monthId: string;
  initial: MonthRow;
  pending: boolean;
  startTransition: (fn: () => void) => void;
}) {
  const [closingPatterns, setClosingPatterns] = useState(initial.closingPatterns);
  const [closingTheme, setClosingTheme] = useState(initial.closingTheme);
  const [closingSurprised, setClosingSurprised] = useState(initial.closingSurprised);
  const [closingStopping, setClosingStopping] = useState(initial.closingStopping);

  return (
    <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <p style={{ fontSize: "0.85rem", color: "#a1a1aa" }}>
        Compare with your month intention. What actually happened?
      </p>
      <Field label="Patterns across the weeks" value={closingPatterns} onChange={setClosingPatterns} />
      <Field label="One theme for next month" value={closingTheme} onChange={setClosingTheme} />
      <Field label="What surprised me?" value={closingSurprised} onChange={setClosingSurprised} />
      <Field label="What I am explicitly stopping" value={closingStopping} onChange={setClosingStopping} />
      <button
        type="button"
        className="reflect-btn secondary"
        disabled={pending}
        onClick={() =>
          startTransition(() => {
            void updateMonthClosing({
              monthId,
              closingPatterns,
              closingTheme,
              closingSurprised,
              closingStopping,
            });
          })
        }
      >
        Save closing
      </button>
    </div>
  );
}

function IntentionForm({
  monthId,
  initial,
  pending,
  startTransition,
}: {
  monthId: string;
  initial: MonthRow;
  pending: boolean;
  startTransition: (fn: () => void) => void;
}) {
  const [priorities, setPriorities] = useState(initial.priorities);
  const [goodMonth, setGoodMonth] = useState(initial.goodMonth);
  const [antiGoals, setAntiGoals] = useState(initial.antiGoals);

  return (
    <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Field label="Priorities" value={priorities} onChange={setPriorities} />
      <Field label="Definition of a good month" value={goodMonth} onChange={setGoodMonth} />
      <Field label="Anti-goals / avoid" value={antiGoals} onChange={setAntiGoals} />
      <button
        type="button"
        className="reflect-btn secondary"
        disabled={pending}
        onClick={() =>
          startTransition(() => {
            void updateMonthIntentions({ monthId, priorities, goodMonth, antiGoals });
          })
        }
      >
        Save intention
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label>
      <span className="reflect-label">{label}</span>
      <textarea className="reflect-textarea" value={value} onChange={(e) => onChange(e.target.value)} rows={3} />
    </label>
  );
}

function WeeklyReviewForm({
  monthId,
  weekIndex,
  initial,
  pending,
  startTransition,
}: {
  monthId: string;
  weekIndex: number;
  initial: WeekRow;
  pending: boolean;
  startTransition: (fn: () => void) => void;
}) {
  const [whatWorked, setWhatWorked] = useState(initial.whatWorked);
  const [whatFailed, setWhatFailed] = useState(initial.whatFailed);
  const [systemChanged, setSystemChanged] = useState(initial.systemChanged);
  const [keepRemoveRefine, setKeepRemoveRefine] = useState(initial.keepRemoveRefine);
  const [experimentNext, setExperimentNext] = useState(initial.experimentNext);
  const [carryForward, setCarryForward] = useState(initial.carryForward);

  const save = () => {
    startTransition(() => {
      void updateWeeklyReview({
        monthId,
        weekIndex,
        whatWorked,
        whatFailed,
        systemChanged,
        keepRemoveRefine,
        experimentNext,
        carryForward,
      });
    });
  };

  const runSuggest = () => {
    startTransition(async () => {
      const s = await suggestWeeklyFromDailies(monthId, weekIndex);
      if (!s) return;
      const nextWorked = s.whatWorked || whatWorked;
      const nextFailed = s.whatFailed || whatFailed;
      const nextSystem = s.systemChanged || systemChanged;
      const nextKeep = s.keepRemoveRefine || keepRemoveRefine;
      setWhatWorked(nextWorked);
      setWhatFailed(nextFailed);
      setSystemChanged(nextSystem);
      setKeepRemoveRefine(nextKeep);
      await updateWeeklyReview({
        monthId,
        weekIndex,
        whatWorked: nextWorked,
        whatFailed: nextFailed,
        systemChanged: nextSystem,
        keepRemoveRefine: nextKeep,
        experimentNext,
        carryForward,
      });
    });
  };

  return (
    <div style={{ marginTop: "0.5rem", borderTop: "1px solid var(--reflect-border)", paddingTop: "1rem" }}>
      <h2 style={{ fontSize: "1rem", margin: "0 0 0.5rem" }}>Weekly review</h2>
      <p style={{ fontSize: "0.8rem", color: "#a1a1aa", marginBottom: "0.75rem" }}>
        Strategist Step 5 — what moved you closer to the aim?
      </p>
      <button
        type="button"
        className="reflect-btn secondary"
        style={{ marginBottom: "0.75rem" }}
        onClick={runSuggest}
      >
        Suggest from this week&apos;s dailies (merges into worked / failed / refine)
      </button>
      <RevField label="What worked?" value={whatWorked} onChange={setWhatWorked} onBlur={save} />
      <RevField label="What failed?" value={whatFailed} onChange={setWhatFailed} onBlur={save} neutralMiss />
      <RevField label="What changed in the system?" value={systemChanged} onChange={setSystemChanged} onBlur={save} />
      <RevField
        label="What to keep, remove, or refine?"
        value={keepRemoveRefine}
        onChange={setKeepRemoveRefine}
        onBlur={save}
      />
      <RevField label="One experiment for next week" value={experimentNext} onChange={setExperimentNext} onBlur={save} />
      <RevField label="Carry forward" value={carryForward} onChange={setCarryForward} onBlur={save} />
      <button type="button" className="reflect-btn" disabled={pending} onClick={save}>
        Save weekly review
      </button>
    </div>
  );
}

function RevField({
  label,
  value,
  onChange,
  onBlur,
  neutralMiss,
}: {
  label: string;
  value: string;
  onChange: (s: string) => void;
  onBlur?: () => void;
  neutralMiss?: boolean;
}) {
  return (
    <label style={{ display: "block", marginBottom: "0.75rem" }}>
      <span className="reflect-label">{label}</span>
      <textarea
        className={`reflect-textarea ${neutralMiss ? "reflect-miss-block" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        rows={3}
      />
    </label>
  );
}
