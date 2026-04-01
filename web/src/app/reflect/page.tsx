import Link from "next/link";
import { listMonths } from "@/actions/reflection";
import { StartCurrentMonthButton } from "./start-month-button";

function pad(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

export default async function ReflectHomePage() {
  const months = await listMonths();
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const hasCurrent = months.some((r) => r.year === y && r.month === m);

  return (
    <main style={{ padding: "1rem", maxWidth: 560, margin: "0 auto" }}>
      <h1 className="reflect-hero">Reflection</h1>
      <p style={{ color: "#a1a1aa", marginBottom: "1.5rem" }}>
        Pick a month or start the current one. Data syncs via Neon.
      </p>

      {!hasCurrent && (
        <div style={{ marginBottom: "1.5rem" }}>
          <StartCurrentMonthButton label={`Start ${y}-${pad(m)}`} />
        </div>
      )}

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {months.map((row) => (
          <li key={row.id} style={{ marginBottom: "0.5rem" }}>
            <Link
              href={`/reflect/month/${row.year}/${row.month}`}
              className="reflect-card"
              style={{ display: "block", textDecoration: "none", color: "inherit" }}
            >
              {row.year} · {pad(row.month)}
            </Link>
          </li>
        ))}
      </ul>

      {months.length === 0 && (
        <p style={{ color: "#71717a" }}>No months yet — create the current month above.</p>
      )}
    </main>
  );
}
