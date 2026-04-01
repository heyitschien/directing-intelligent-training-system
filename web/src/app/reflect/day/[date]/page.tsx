import Link from "next/link";
import { notFound } from "next/navigation";
import { getMonthBundle } from "@/actions/reflection";
import type { CaptureItem } from "@/db/schema";
import { DayEditor } from "@/components/reflect/day-editor";

type Props = { params: Promise<{ date: string }> };

export default async function DayPage({ params }: Props) {
  const { date } = await params;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    notFound();
  }
  const y = Number(date.slice(0, 4));
  const m = Number(date.slice(5, 7));
  const bundle = await getMonthBundle({ year: y, month: m });
  if (!bundle) {
    return (
      <main style={{ padding: "1rem", maxWidth: 560, margin: "0 auto" }}>
        <p>No month for this date yet.</p>
        <Link href="/reflect">Open Months</Link>
      </main>
    );
  }

  const day = bundle.days.find((d) => d.date === date);
  if (!day) {
    notFound();
  }

  const starredLearn = bundle.starSet.includes(`${day.id}:learn`);
  const starredNote = bundle.starSet.includes(`${day.id}:note`);

  return (
    <main style={{ padding: "1rem", maxWidth: 560, margin: "0 auto" }}>
      <DayEditor
        day={{
          id: day.id,
          date: day.date,
          events: day.events,
          win: day.win,
          miss: day.miss,
          learn: day.learn,
          note: day.note,
          aimDelta: day.aimDelta,
          captureItems: (day.captureItems ?? []) as CaptureItem[],
        }}
        monthId={bundle.month.id}
        year={y}
        month={m}
        starredLearn={starredLearn}
        starredNote={starredNote}
      />
    </main>
  );
}
