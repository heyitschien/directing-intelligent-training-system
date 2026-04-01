import Link from "next/link";
import { listStarredWithContext } from "@/actions/reflection";
import { ReviewSearch } from "@/components/reflect/review-search";

export default async function ReviewPage() {
  const starred = await listStarredWithContext();

  return (
    <main style={{ padding: "1rem", maxWidth: 560, margin: "0 auto" }}>
      <h1 className="reflect-hero">Review</h1>
      <p style={{ color: "#a1a1aa", marginBottom: "1rem" }}>
        Search across days or browse starred learnings and notes.
      </p>

      <ReviewSearch />

      <h2 style={{ fontSize: "1rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Starred</h2>
      {starred.length === 0 && (
        <p style={{ color: "#71717a", fontSize: "0.9rem" }}>
          No stars yet — open a day, go to Full view, and star Learn or Note.
        </p>
      )}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {starred.map((s) => (
          <li key={s.id} className="reflect-card" style={{ marginBottom: "0.5rem" }}>
            <Link href={`/reflect/day/${s.date}`} style={{ fontWeight: 600 }}>
              {s.date} · {s.field}
            </Link>
            <p style={{ margin: "0.25rem 0 0", fontSize: "0.9rem", color: "#d4d4d8" }}>
              {s.excerpt || "(empty)"}
            </p>
            <Link
              href={`/reflect/month/${s.year}/${s.monthNum}`}
              style={{ fontSize: "0.8rem", color: "#a1a1aa" }}
            >
              Month
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
