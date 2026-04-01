import type { CaptureItem } from "@/db/schema";
import {
  displayMonthTitle,
  formatWeekRangeLabel,
  monthChunks,
  weekdayShort,
} from "@/lib/chunk-month";

export type MonthRow = {
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

export type DayRow = {
  date: string;
  events: string;
  win: string;
  miss: string;
  learn: string;
  note: string;
  captureItems: CaptureItem[];
};

export type WeekRow = {
  weekIndex: number;
  whatWorked: string;
  whatFailed: string;
  systemChanged: string;
  keepRemoveRefine: string;
  experimentNext: string;
  carryForward: string;
};

function captureBlock(items: CaptureItem[]): string {
  const lines = items.map((i) => `- [${i.done ? "x" : " "}] ${i.text}`);
  if (lines.length === 0) return "**Capture (intraday)**\n\n- [ ] \n";
  return "**Capture (intraday)**\n\n" + lines.join("\n") + "\n";
}

function dayTable(events: string, win: string, miss: string, learn: string, note: string): string {
  return `
| Track  | Content                              |
| ------ | ------------------------------------ |
| Events | ${events.replace(/\|/g, "\\|").replace(/\n/g, " ")} |
| Win    | ${win.replace(/\|/g, "\\|").replace(/\n/g, " ")} |
| Miss   | ${miss.replace(/\|/g, "\\|").replace(/\n/g, " ")} |
| Learn  | ${learn.replace(/\|/g, "\\|").replace(/\n/g, " ")} |
| Note   | ${note.replace(/\|/g, "\\|").replace(/\n/g, " ")} |
`.trim();
}

function weeklySection(w: WeekRow): string {
  return `### Weekly review

Aligned with Strategist OS Step 5 (Reflect): what moved you closer to the aim, and what becomes wisdom?

- **What worked?**
${w.whatWorked || "\n"}
- **What failed?**
${w.whatFailed || "\n"}
- **What changed in the system?** (environment, constraints, habits)
${w.systemChanged || "\n"}
- **What to keep, remove, or refine?**
${w.keepRemoveRefine || "\n"}
- **One experiment for next week** (next chunk in this month)
${w.experimentNext || "\n"}
- **Carry forward** (2–4 bullets for the next week)
${w.carryForward || "\n"}
`;
}

export function buildMonthMarkdown(
  m: MonthRow,
  daysByISO: Map<string, DayRow>,
  weeksByIndex: Map<number, WeekRow>,
): string {
  const y = m.year;
  const mo = m.month;
  const isoMonth = `${y}-${String(mo).padStart(2, "0")}`;
  const title = displayMonthTitle(y, mo);

  const lines: string[] = [];
  lines.push(`---`);
  lines.push(`month: "${isoMonth}"`);
  lines.push(`month_display: "${title}"`);
  lines.push(`---`);
  lines.push("");
  lines.push(`# ${title}`);
  lines.push("");
  lines.push(`> Monthly reflection · daily capture + weekly reviews`);
  lines.push("");
  lines.push(
    `> **${title} starts ${weekdayShort(`${isoMonth}-01`)} · ${isoMonth}-01** — first day is under **Week 1** below. Search the page for a date (e.g. ${isoMonth}-15) to jump.`,
  );
  lines.push("");
  lines.push(`## Month intention`);
  lines.push("");
  lines.push(`- **Priorities:**`);
  lines.push(m.priorities || "");
  lines.push("");
  lines.push(`- **Definition of a good month:**`);
  lines.push(m.goodMonth || "");
  lines.push("");
  lines.push(`- **Anti-goals / avoid:**`);
  lines.push(m.antiGoals || "");
  lines.push("");

  const chunks = monthChunks(y, mo);
  chunks.forEach((chunk, i) => {
    const weekNum = i + 1;
    const range = formatWeekRangeLabel(y, mo, chunk.start, chunk.end);
    lines.push(`## ${title} — Week ${weekNum} (${range})`);
    lines.push("");

    let d = chunk.start;
    while (true) {
      const day = daysByISO.get(d);
      if (day) {
        const w = weekdayShort(day.date);
        lines.push(`### ${w} · ${day.date}`);
        lines.push("");
        lines.push(captureBlock(day.captureItems));
        lines.push("");
        lines.push(dayTable(day.events, day.win, day.miss, day.learn, day.note));
        lines.push("");
      }
      if (d === chunk.end) break;
      const [yy, mm, dd] = d.split("-").map(Number);
      const next = new Date(yy, mm - 1, dd + 1);
      d = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}-${String(next.getDate()).padStart(2, "0")}`;
    }

    const wr = weeksByIndex.get(weekNum);
    if (wr) {
      lines.push(weeklySection(wr));
      lines.push("");
    }
  });

  lines.push(`## Month closing`);
  lines.push("");
  lines.push(`- **Patterns across the weeks:**`);
  lines.push(m.closingPatterns || "");
  lines.push("");
  lines.push(`- **One theme to carry into next month:**`);
  lines.push(m.closingTheme || "");
  lines.push("");
  lines.push(`- **What surprised me?**`);
  lines.push(m.closingSurprised || "");
  lines.push("");
  lines.push(`- **What am I explicitly stopping?**`);
  lines.push(m.closingStopping || "");
  lines.push("");

  return lines.join("\n");
}
