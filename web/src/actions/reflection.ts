"use server";

import { revalidatePath } from "next/cache";
import { and, asc, desc, eq, gte, ilike, lte, or, sql } from "drizzle-orm";
import * as z from "zod";
import { getDb } from "@/db";
import {
  reflectionDays,
  reflectionMonths,
  starredInsights,
  weeklyReviews,
  type CaptureItem,
} from "@/db/schema";
import { buildMonthMarkdown, type DayRow, type WeekRow } from "@/lib/markdown-export";
import { daysInMonth, monthChunks, toISODate } from "@/lib/chunk-month";

const yearMonth = z.object({
  year: z.number().int().min(2000).max(2100),
  month: z.number().int().min(1).max(12),
});

export async function listMonths() {
  const db = getDb();
  return db
    .select({
      year: reflectionMonths.year,
      month: reflectionMonths.month,
      id: reflectionMonths.id,
    })
    .from(reflectionMonths)
    .orderBy(desc(reflectionMonths.year), desc(reflectionMonths.month));
}

export async function startCurrentMonth() {
  const now = new Date();
  return createMonth({ year: now.getFullYear(), month: now.getMonth() + 1 });
}

/** Form action wrapper (return void for form actions). */
export async function startCurrentMonthFormAction() {
  await startCurrentMonth();
}

export async function createMonth(input: z.infer<typeof yearMonth>) {
  const { year, month } = yearMonth.parse(input);
  const db = getDb();
  const existing = await db
    .select({ id: reflectionMonths.id })
    .from(reflectionMonths)
    .where(and(eq(reflectionMonths.year, year), eq(reflectionMonths.month, month)))
    .limit(1);
  if (existing[0]) {
    return { ok: false as const, error: "Month already exists" };
  }

  const last = daysInMonth(year, month);
  const chunks = monthChunks(year, month);

  await db.transaction(async (tx) => {
    const [m] = await tx.insert(reflectionMonths).values({ year, month }).returning();
    for (let d = 1; d <= last; d++) {
      const iso = toISODate(year, month, d);
      await tx.insert(reflectionDays).values({
        monthId: m.id,
        date: iso,
        captureItems: [],
      });
    }
    for (let i = 0; i < chunks.length; i++) {
      await tx.insert(weeklyReviews).values({
        monthId: m.id,
        weekIndex: i + 1,
      });
    }
  });

  revalidatePath("/reflect");
  return { ok: true as const };
}

export async function getMonthBundle(input: z.infer<typeof yearMonth>) {
  const { year, month } = yearMonth.parse(input);
  const db = getDb();
  const [m] = await db
    .select()
    .from(reflectionMonths)
    .where(and(eq(reflectionMonths.year, year), eq(reflectionMonths.month, month)))
    .limit(1);
  if (!m) return null;

  const days = await db
    .select()
    .from(reflectionDays)
    .where(eq(reflectionDays.monthId, m.id))
    .orderBy(asc(reflectionDays.date));

  const wks = await db
    .select()
    .from(weeklyReviews)
    .where(eq(weeklyReviews.monthId, m.id))
    .orderBy(asc(weeklyReviews.weekIndex));

  const stars = await db
    .select({ dayId: starredInsights.dayId, field: starredInsights.field })
    .from(starredInsights)
    .innerJoin(reflectionDays, eq(starredInsights.dayId, reflectionDays.id))
    .where(eq(reflectionDays.monthId, m.id));

  const starSet = new Set(stars.map((s) => `${s.dayId}:${s.field}`));

  return {
    month: m,
    days,
    weeklyReviews: wks,
    starSet: [...starSet],
  };
}

const dayPatch = z.object({
  monthId: z.uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  events: z.string().optional(),
  win: z.string().optional(),
  miss: z.string().optional(),
  learn: z.string().optional(),
  note: z.string().optional(),
  aimDelta: z.string().nullable().optional(),
  captureItems: z.array(z.object({ id: z.string(), text: z.string(), done: z.boolean() })).optional(),
});

export async function updateDay(patch: z.infer<typeof dayPatch>) {
  const p = dayPatch.parse(patch);
  const db = getDb();
  const update: Record<string, unknown> = { updatedAt: new Date() };
  if (p.events !== undefined) update.events = p.events;
  if (p.win !== undefined) update.win = p.win;
  if (p.miss !== undefined) update.miss = p.miss;
  if (p.learn !== undefined) update.learn = p.learn;
  if (p.note !== undefined) update.note = p.note;
  if (p.aimDelta !== undefined) update.aimDelta = p.aimDelta;
  if (p.captureItems !== undefined) update.captureItems = p.captureItems;

  await db
    .update(reflectionDays)
    .set(update as Record<string, unknown>)
    .where(and(eq(reflectionDays.monthId, p.monthId), eq(reflectionDays.date, p.date)));

  revalidatePath("/reflect");
  return { ok: true as const };
}

export async function quickAppendEvent(monthId: string, date: string, line: string) {
  z.uuid().parse(monthId);
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/).parse(date);
  const db = getDb();
  const [row] = await db
    .select({ events: reflectionDays.events })
    .from(reflectionDays)
    .where(and(eq(reflectionDays.monthId, monthId), eq(reflectionDays.date, date)))
    .limit(1);
  if (!row) return { ok: false as const, error: "Day not found" };
  const next =
    row.events.trim().length === 0 ? line.trim() : `${row.events.trim()}\n${line.trim()}`;
  await db
    .update(reflectionDays)
    .set({ events: next, updatedAt: new Date() })
    .where(and(eq(reflectionDays.monthId, monthId), eq(reflectionDays.date, date)));
  revalidatePath("/reflect");
  return { ok: true as const };
}

const weekPatch = z.object({
  monthId: z.uuid(),
  weekIndex: z.number().int().min(1).max(10),
  whatWorked: z.string().optional(),
  whatFailed: z.string().optional(),
  systemChanged: z.string().optional(),
  keepRemoveRefine: z.string().optional(),
  experimentNext: z.string().optional(),
  carryForward: z.string().optional(),
});

export async function updateWeeklyReview(patch: z.infer<typeof weekPatch>) {
  const p = weekPatch.parse(patch);
  const db = getDb();
  const update: Record<string, unknown> = { updatedAt: new Date() };
  if (p.whatWorked !== undefined) update.whatWorked = p.whatWorked;
  if (p.whatFailed !== undefined) update.whatFailed = p.whatFailed;
  if (p.systemChanged !== undefined) update.systemChanged = p.systemChanged;
  if (p.keepRemoveRefine !== undefined) update.keepRemoveRefine = p.keepRemoveRefine;
  if (p.experimentNext !== undefined) update.experimentNext = p.experimentNext;
  if (p.carryForward !== undefined) update.carryForward = p.carryForward;
  await db
    .update(weeklyReviews)
    .set(update as Record<string, unknown>)
    .where(and(eq(weeklyReviews.monthId, p.monthId), eq(weeklyReviews.weekIndex, p.weekIndex)));
  revalidatePath("/reflect");
  return { ok: true as const };
}

const monthIntentions = z.object({
  monthId: z.uuid(),
  priorities: z.string().optional(),
  goodMonth: z.string().optional(),
  antiGoals: z.string().optional(),
});

export async function updateMonthIntentions(patch: z.infer<typeof monthIntentions>) {
  const p = monthIntentions.parse(patch);
  const db = getDb();
  const update: Record<string, unknown> = { updatedAt: new Date() };
  if (p.priorities !== undefined) update.priorities = p.priorities;
  if (p.goodMonth !== undefined) update.goodMonth = p.goodMonth;
  if (p.antiGoals !== undefined) update.antiGoals = p.antiGoals;
  await db.update(reflectionMonths).set(update).where(eq(reflectionMonths.id, p.monthId));
  revalidatePath("/reflect");
  return { ok: true as const };
}

const monthClosing = z.object({
  monthId: z.uuid(),
  closingPatterns: z.string().optional(),
  closingTheme: z.string().optional(),
  closingSurprised: z.string().optional(),
  closingStopping: z.string().optional(),
});

export async function updateMonthClosing(patch: z.infer<typeof monthClosing>) {
  const p = monthClosing.parse(patch);
  const db = getDb();
  const update: Record<string, unknown> = { updatedAt: new Date() };
  if (p.closingPatterns !== undefined) update.closingPatterns = p.closingPatterns;
  if (p.closingTheme !== undefined) update.closingTheme = p.closingTheme;
  if (p.closingSurprised !== undefined) update.closingSurprised = p.closingSurprised;
  if (p.closingStopping !== undefined) update.closingStopping = p.closingStopping;
  await db.update(reflectionMonths).set(update).where(eq(reflectionMonths.id, p.monthId));
  revalidatePath("/reflect");
  return { ok: true as const };
}

const starField = z.enum(["learn", "note"]);

export async function toggleStar(dayId: string, field: z.infer<typeof starField>, excerpt?: string) {
  z.uuid().parse(dayId);
  const f = starField.parse(field);
  const db = getDb();
  const existing = await db
    .select({ id: starredInsights.id })
    .from(starredInsights)
    .where(and(eq(starredInsights.dayId, dayId), eq(starredInsights.field, f)))
    .limit(1);
  if (existing[0]) {
    await db.delete(starredInsights).where(eq(starredInsights.id, existing[0].id));
  } else {
    await db.insert(starredInsights).values({
      dayId,
      field: f,
      excerpt: excerpt ?? "",
    });
  }
  revalidatePath("/reflect");
  return { ok: true as const };
}

export async function searchReflections(rawQuery: string) {
  const q = rawQuery.trim();
  if (q.length < 2) return [];
  const pattern = `%${q.replace(/%/g, "").replace(/_/g, "")}%`;
  const db = getDb();

  const dayHits = await db
    .select({
      date: reflectionDays.date,
      year: reflectionMonths.year,
      month: reflectionMonths.month,
      snippet: sql<string>`LEFT(${reflectionDays.events}, 200)`,
    })
    .from(reflectionDays)
    .innerJoin(reflectionMonths, eq(reflectionDays.monthId, reflectionMonths.id))
    .where(
      or(
        ilike(reflectionDays.events, pattern),
        ilike(reflectionDays.win, pattern),
        ilike(reflectionDays.miss, pattern),
        ilike(reflectionDays.learn, pattern),
        ilike(reflectionDays.note, pattern),
      ),
    )
    .orderBy(desc(reflectionMonths.year), desc(reflectionMonths.month))
    .limit(40);

  return dayHits;
}

export async function suggestWeeklyFromDailies(monthId: string, weekIndex: number) {
  z.uuid().parse(monthId);
  z.number().int().min(1).max(10).parse(weekIndex);
  const db = getDb();
  const [m] = await db
    .select()
    .from(reflectionMonths)
    .where(eq(reflectionMonths.id, monthId))
    .limit(1);
  if (!m) return null;
  const chunks = monthChunks(m.year, m.month);
  const chunk = chunks[weekIndex - 1];
  if (!chunk) return null;
  const days = await db
    .select()
    .from(reflectionDays)
    .where(
      and(
        eq(reflectionDays.monthId, monthId),
        gte(reflectionDays.date, chunk.start),
        lte(reflectionDays.date, chunk.end),
      ),
    )
    .orderBy(asc(reflectionDays.date));

  const learn = days.map((d) => d.learn.trim()).filter(Boolean).join("\n- ");
  const miss = days.map((d) => d.miss.trim()).filter(Boolean).join("\n- ");
  const win = days.map((d) => d.win.trim()).filter(Boolean).join("\n- ");
  return {
    whatWorked: win ? `- ${win.replace(/\n/g, "\n- ")}` : "",
    whatFailed: miss ? `- ${miss.replace(/\n/g, "\n- ")}` : "",
    systemChanged: "",
    keepRemoveRefine: learn ? `- ${learn.replace(/\n/g, "\n- ")}` : "",
  };
}

export async function listStarredWithContext() {
  const db = getDb();
  const rows = await db
    .select({
      id: starredInsights.id,
      field: starredInsights.field,
      excerpt: starredInsights.excerpt,
      date: reflectionDays.date,
      year: reflectionMonths.year,
      monthNum: reflectionMonths.month,
    })
    .from(starredInsights)
    .innerJoin(reflectionDays, eq(starredInsights.dayId, reflectionDays.id))
    .innerJoin(reflectionMonths, eq(reflectionDays.monthId, reflectionMonths.id))
    .orderBy(desc(starredInsights.createdAt))
    .limit(100);

  return rows;
}

export async function exportMonthMarkdown(input: z.infer<typeof yearMonth>) {
  const { year, month } = yearMonth.parse(input);
  const bundle = await getMonthBundle({ year, month });
  if (!bundle) return null;
  const daysMap = new Map<string, DayRow>();
  bundle.days.forEach((d) =>
    daysMap.set(d.date, {
      date: d.date,
      events: d.events,
      win: d.win,
      miss: d.miss,
      learn: d.learn,
      note: d.note,
      captureItems: d.captureItems as CaptureItem[],
    }),
  );
  const weeksMap = new Map<number, WeekRow>();
  bundle.weeklyReviews.forEach((w) =>
    weeksMap.set(w.weekIndex, {
      weekIndex: w.weekIndex,
      whatWorked: w.whatWorked,
      whatFailed: w.whatFailed,
      systemChanged: w.systemChanged,
      keepRemoveRefine: w.keepRemoveRefine,
      experimentNext: w.experimentNext,
      carryForward: w.carryForward,
    }),
  );
  return buildMonthMarkdown(
    {
      year: bundle.month.year,
      month: bundle.month.month,
      priorities: bundle.month.priorities,
      goodMonth: bundle.month.goodMonth,
      antiGoals: bundle.month.antiGoals,
      closingPatterns: bundle.month.closingPatterns,
      closingTheme: bundle.month.closingTheme,
      closingSurprised: bundle.month.closingSurprised,
      closingStopping: bundle.month.closingStopping,
    },
    daysMap,
    weeksMap,
  );
}
