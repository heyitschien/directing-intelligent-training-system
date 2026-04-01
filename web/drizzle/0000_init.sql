CREATE TABLE "reflection_days" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"month_id" uuid NOT NULL,
	"date" date NOT NULL,
	"events" text DEFAULT '' NOT NULL,
	"win" text DEFAULT '' NOT NULL,
	"miss" text DEFAULT '' NOT NULL,
	"learn" text DEFAULT '' NOT NULL,
	"note" text DEFAULT '' NOT NULL,
	"aim_delta" text,
	"capture_items" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "reflection_days_month_date_unique" UNIQUE("month_id","date")
);
--> statement-breakpoint
CREATE TABLE "reflection_months" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"year" integer NOT NULL,
	"month" integer NOT NULL,
	"priorities" text DEFAULT '' NOT NULL,
	"good_month" text DEFAULT '' NOT NULL,
	"anti_goals" text DEFAULT '' NOT NULL,
	"closing_patterns" text DEFAULT '' NOT NULL,
	"closing_theme" text DEFAULT '' NOT NULL,
	"closing_surprised" text DEFAULT '' NOT NULL,
	"closing_stopping" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "reflection_months_year_month_unique" UNIQUE("year","month")
);
--> statement-breakpoint
CREATE TABLE "starred_insights" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"day_id" uuid NOT NULL,
	"field" text NOT NULL,
	"excerpt" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "weekly_reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"month_id" uuid NOT NULL,
	"week_index" integer NOT NULL,
	"what_worked" text DEFAULT '' NOT NULL,
	"what_failed" text DEFAULT '' NOT NULL,
	"system_changed" text DEFAULT '' NOT NULL,
	"keep_remove_refine" text DEFAULT '' NOT NULL,
	"experiment_next" text DEFAULT '' NOT NULL,
	"carry_forward" text DEFAULT '' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "weekly_reviews_month_week_unique" UNIQUE("month_id","week_index")
);
--> statement-breakpoint
ALTER TABLE "reflection_days" ADD CONSTRAINT "reflection_days_month_id_reflection_months_id_fk" FOREIGN KEY ("month_id") REFERENCES "public"."reflection_months"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "starred_insights" ADD CONSTRAINT "starred_insights_day_id_reflection_days_id_fk" FOREIGN KEY ("day_id") REFERENCES "public"."reflection_days"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weekly_reviews" ADD CONSTRAINT "weekly_reviews_month_id_reflection_months_id_fk" FOREIGN KEY ("month_id") REFERENCES "public"."reflection_months"("id") ON DELETE cascade ON UPDATE no action;