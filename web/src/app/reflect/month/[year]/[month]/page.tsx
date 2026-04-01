import Link from "next/link";
import { notFound } from "next/navigation";
import { getMonthBundle } from "@/actions/reflection";
import { MonthOverview } from "@/components/reflect/month-overview";
import { displayMonthTitle, monthChunks } from "@/lib/chunk-month";

type Props = { params: Promise<{ year: string; month: string }> };

export default async function MonthPage({ params }: Props) {
  const { year: ys, month: ms } = await params;
  const year = Number(ys);
  const month = Number(ms);
  if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) {
    notFound();
  }

  const bundle = await getMonthBundle({ year, month });
  if (!bundle) {
    return (
      <main style={{ padding: "1rem", maxWidth: 560, margin: "0 auto" }}>
        <p>Month not found.</p>
        <Link href="/reflect">Back</Link>
      </main>
    );
  }

  const title = displayMonthTitle(year, month);
  const chunks = monthChunks(year, month);

  return (
    <main style={{ padding: "1rem", maxWidth: 640, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <h1 className="reflect-hero" style={{ marginBottom: 0 }}>
          {title}
        </h1>
        <Link
          href="/reflect/review"
          className="reflect-btn secondary"
          style={{ width: "auto", flexShrink: 0, textDecoration: "none", fontSize: "0.85rem" }}
        >
          Search
        </Link>
      </div>
      <p style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>
        Monthly reflection · tap a day to edit
      </p>

      <MonthOverview
        chunks={chunks}
        bundle={{
          month: bundle.month,
          days: bundle.days,
          weeklyReviews: bundle.weeklyReviews,
          starSet: bundle.starSet,
        }}
      />

      <div style={{ marginTop: "2rem" }}>
        <Link
          href={`/reflect/export/${year}/${month}`}
          className="reflect-btn secondary"
          style={{ textDecoration: "none", display: "block", textAlign: "center" }}
        >
          Download markdown
        </Link>
      </div>
    </main>
  );
}
