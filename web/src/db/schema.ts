import {
  date,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

export type CaptureItem = { id: string; text: string; done: boolean };

export const reflectionMonths = pgTable(
  "reflection_months",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    year: integer("year").notNull(),
    month: integer("month").notNull(),
    priorities: text("priorities").notNull().default(""),
    goodMonth: text("good_month").notNull().default(""),
    antiGoals: text("anti_goals").notNull().default(""),
    closingPatterns: text("closing_patterns").notNull().default(""),
    closingTheme: text("closing_theme").notNull().default(""),
    closingSurprised: text("closing_surprised").notNull().default(""),
    closingStopping: text("closing_stopping").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [unique("reflection_months_year_month_unique").on(t.year, t.month)],
);

export const reflectionDays = pgTable(
  "reflection_days",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    monthId: uuid("month_id")
      .notNull()
      .references(() => reflectionMonths.id, { onDelete: "cascade" }),
    date: date("date", { mode: "string" }).notNull(),
    events: text("events").notNull().default(""),
    win: text("win").notNull().default(""),
    miss: text("miss").notNull().default(""),
    learn: text("learn").notNull().default(""),
    note: text("note").notNull().default(""),
    aimDelta: text("aim_delta"),
    captureItems: jsonb("capture_items").$type<CaptureItem[]>().notNull().default([]),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [unique("reflection_days_month_date_unique").on(t.monthId, t.date)],
);

export const weeklyReviews = pgTable(
  "weekly_reviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    monthId: uuid("month_id")
      .notNull()
      .references(() => reflectionMonths.id, { onDelete: "cascade" }),
    weekIndex: integer("week_index").notNull(),
    whatWorked: text("what_worked").notNull().default(""),
    whatFailed: text("what_failed").notNull().default(""),
    systemChanged: text("system_changed").notNull().default(""),
    keepRemoveRefine: text("keep_remove_refine").notNull().default(""),
    experimentNext: text("experiment_next").notNull().default(""),
    carryForward: text("carry_forward").notNull().default(""),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [unique("weekly_reviews_month_week_unique").on(t.monthId, t.weekIndex)],
);

export const starredInsights = pgTable(
  "starred_insights",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    dayId: uuid("day_id")
      .notNull()
      .references(() => reflectionDays.id, { onDelete: "cascade" }),
    field: text("field").notNull(),
    excerpt: text("excerpt").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [unique("starred_insights_day_field_unique").on(t.dayId, t.field)],
);
