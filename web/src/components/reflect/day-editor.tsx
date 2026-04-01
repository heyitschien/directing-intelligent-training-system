"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { quickAppendEvent, toggleStar, updateDay } from "@/actions/reflection";
import type { CaptureItem } from "@/db/schema";
import { displayMonthTitle } from "@/lib/chunk-month";

type DayRow = {
  id: string;
  date: string;
  events: string;
  win: string;
  miss: string;
  learn: string;
  note: string;
  aimDelta: string | null;
  captureItems: CaptureItem[];
};

export function DayEditor({
  day,
  monthId,
  year,
  month,
  starredLearn,
  starredNote,
}: {
  day: DayRow;
  monthId: string;
  year: number;
  month: number;
  starredLearn: boolean;
  starredNote: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [quickLine, setQuickLine] = useState("");
  const [mode, setMode] = useState<"quick" | "full">("quick");
  const [events, setEvents] = useState(day.events);
  const [win, setWin] = useState(day.win);
  const [miss, setMiss] = useState(day.miss);
  const [learn, setLearn] = useState(day.learn);
  const [note, setNote] = useState(day.note);
  const [aimDelta, setAimDelta] = useState<string>(day.aimDelta ?? "");
  const [captureItems, setCaptureItems] = useState<CaptureItem[]>(day.captureItems ?? []);

  const title = displayMonthTitle(year, month);

  const saveFull = () => {
    startTransition(() => {
      void updateDay({
        monthId,
        date: day.date,
        events,
        win,
        miss,
        learn,
        note,
        aimDelta: aimDelta || null,
        captureItems,
      });
    });
  };

  const addQuick = () => {
    const line = quickLine.trim();
    if (!line) return;
    startTransition(async () => {
      await quickAppendEvent(monthId, day.date, line);
      setQuickLine("");
      setEvents((e) => (e.trim() ? `${e.trim()}\n${line}` : line));
    });
  };

  const toggleCap = (id: string) => {
    const next = captureItems.map((c) =>
      c.id === id ? { ...c, done: !c.done } : c,
    );
    setCaptureItems(next);
    startTransition(() => {
      void updateDay({ monthId, date: day.date, captureItems: next });
    });
  };

  const addCapture = () => {
    const id = crypto.randomUUID();
    const next = [...captureItems, { id, text: "", done: false }];
    setCaptureItems(next);
  };

  return (
    <div>
      <p style={{ fontSize: "0.85rem", color: "#a1a1aa", marginBottom: "0.5rem" }}>
        <Link href={`/reflect/month/${year}/${month}`} style={{ color: "var(--reflect-accent)" }}>
          {title}
        </Link>
      </p>
      <h1 className="reflect-hero" style={{ fontSize: "1.5rem" }}>
        {new Date(day.date + "T12:00:00").toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </h1>
      <p style={{ color: "#71717a", fontSize: "0.9rem" }}>{day.date}</p>

      <div style={{ display: "flex", gap: 8, margin: "1rem 0" }}>
        <button
          type="button"
          className={mode === "quick" ? "reflect-btn" : "reflect-btn secondary"}
          style={{ flex: 1 }}
          onClick={() => setMode("quick")}
        >
          Quick
        </button>
        <button
          type="button"
          className={mode === "full" ? "reflect-btn" : "reflect-btn secondary"}
          style={{ flex: 1 }}
          onClick={() => setMode("full")}
        >
          Full
        </button>
      </div>

      {mode === "quick" && (
        <div className="reflect-card" style={{ marginBottom: "1rem" }}>
          <span className="reflect-label">Log a line (appends to Events)</span>
          <textarea
            className="reflect-textarea"
            rows={2}
            value={quickLine}
            onChange={(e) => setQuickLine(e.target.value)}
            placeholder="What happened?"
          />
          <button type="button" className="reflect-btn" style={{ marginTop: 8 }} disabled={pending} onClick={addQuick}>
            Add to today
          </button>
          <p style={{ fontSize: "0.75rem", color: "#71717a", marginTop: "0.75rem" }}>
            Quick lines live under Events in export.
          </p>
        </div>
      )}

      <div className="reflect-card" style={{ marginBottom: "1rem" }}>
        <span className="reflect-label">Capture (checklist)</span>
        {captureItems.map((c) => (
          <label
            key={c.id}
            style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}
          >
            <input
              type="checkbox"
              checked={c.done}
              onChange={() => toggleCap(c.id)}
              style={{ marginTop: 6, width: 20, height: 20 }}
            />
            <textarea
              className="reflect-textarea"
              style={{ minHeight: 44 }}
              rows={1}
              value={c.text}
              onChange={(e) => {
                const next = captureItems.map((x) =>
                  x.id === c.id ? { ...x, text: e.target.value } : x,
                );
                setCaptureItems(next);
              }}
              onBlur={() => saveFull()}
            />
          </label>
        ))}
        <button type="button" className="reflect-btn secondary" onClick={addCapture}>
          Add capture line
        </button>
      </div>

      {mode === "full" && (
        <>
          <label className="reflect-card" style={{ display: "block", marginBottom: "0.75rem" }}>
            <span className="reflect-label">Events</span>
            <textarea className="reflect-textarea" rows={5} value={events} onChange={(e) => setEvents(e.target.value)} onBlur={saveFull} />
          </label>
          <label className="reflect-card" style={{ display: "block", marginBottom: "0.75rem" }}>
            <span className="reflect-label">Win</span>
            <textarea className="reflect-textarea" value={win} onChange={(e) => setWin(e.target.value)} onBlur={saveFull} rows={3} />
          </label>
          <label
            className="reflect-card reflect-miss-block"
            style={{ display: "block", marginBottom: "0.75rem" }}
          >
            <span className="reflect-label">Miss — neutral note, not a mistake alarm</span>
            <textarea className="reflect-textarea" value={miss} onChange={(e) => setMiss(e.target.value)} onBlur={saveFull} rows={3} />
          </label>
          <label className="reflect-card" style={{ display: "block", marginBottom: "0.75rem" }}>
            <span className="reflect-label">Learn — star for Review hub</span>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <textarea className="reflect-textarea" style={{ flex: 1 }} value={learn} onChange={(e) => setLearn(e.target.value)} onBlur={saveFull} rows={3} />
              <button
                type="button"
                className="reflect-btn secondary"
                style={{ width: "auto", flexShrink: 0 }}
                onClick={() => startTransition(() => void toggleStar(day.id, "learn", learn.slice(0, 200)))}
              >
                {starredLearn ? "Unstar" : "Star"}
              </button>
            </div>
          </label>
          <label className="reflect-card" style={{ display: "block", marginBottom: "0.75rem" }}>
            <span className="reflect-label">Note — star for Review hub</span>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <textarea className="reflect-textarea" style={{ flex: 1 }} value={note} onChange={(e) => setNote(e.target.value)} onBlur={saveFull} rows={3} />
              <button
                type="button"
                className="reflect-btn secondary"
                style={{ width: "auto", flexShrink: 0 }}
                onClick={() => startTransition(() => void toggleStar(day.id, "note", note.slice(0, 200)))}
              >
                {starredNote ? "Unstar" : "Star"}
              </button>
            </div>
          </label>
          <label className="reflect-card" style={{ display: "block", marginBottom: "1rem" }}>
            <span className="reflect-label">Vs this month&apos;s aim (optional)</span>
            <select
              className="reflect-input"
              value={aimDelta}
              onChange={(e) => {
                setAimDelta(e.target.value);
                startTransition(() => {
                  void updateDay({
                    monthId,
                    date: day.date,
                    aimDelta: e.target.value || null,
                  });
                });
              }}
            >
              <option value="">—</option>
              <option value="closer">Closer</option>
              <option value="flat">Flat</option>
              <option value="further">Further</option>
            </select>
          </label>
        </>
      )}

      <button type="button" className="reflect-btn secondary" disabled={pending} onClick={saveFull}>
        Save now
      </button>
    </div>
  );
}
