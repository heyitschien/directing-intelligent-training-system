"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { searchReflections } from "@/actions/reflection";

export function ReviewSearch() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<
    Awaited<ReturnType<typeof searchReflections>>
  >([]);
  const [pending, startTransition] = useTransition();

  const run = () => {
    startTransition(async () => {
      const r = await searchReflections(q);
      setResults(r);
    });
  };

  return (
    <div className="reflect-card">
      <span className="reflect-label">Search</span>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          className="reflect-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="two or more characters"
          onKeyDown={(e) => e.key === "Enter" && run()}
        />
        <button type="button" className="reflect-btn secondary" style={{ width: "auto" }} disabled={pending} onClick={run}>
          Go
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "0.75rem" }}>
        {results.map((r, i) => (
          <li key={`${r.date}-${i}`} style={{ marginBottom: "0.5rem" }}>
            <Link href={`/reflect/day/${r.date}`} style={{ fontWeight: 600 }}>
              {r.date}
            </Link>
            <span style={{ color: "#71717a", fontSize: "0.8rem", marginLeft: 8 }}>
              {r.year}-{String(r.month).padStart(2, "0")}
            </span>
            <p style={{ margin: "0.2rem 0 0", fontSize: "0.85rem", color: "#a1a1aa" }}>{r.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
