/** Calendar month chunks: up to 7 days from the 1st until month end (README rule). */
export type DateChunk = { start: string; end: string };

function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

export function toISODate(year: number, month: number, day: number): string {
  return `${year}-${pad(month)}-${pad(day)}`;
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function monthChunks(year: number, month: number): DateChunk[] {
  const lastDay = daysInMonth(year, month);
  const chunks: DateChunk[] = [];
  let d = 1;
  while (d <= lastDay) {
    const end = Math.min(d + 6, lastDay);
    chunks.push({
      start: toISODate(year, month, d),
      end: toISODate(year, month, end),
    });
    d = end + 1;
  }
  return chunks;
}

export function weekIndexForDate(
  year: number,
  month: number,
  isoDate: string,
): number {
  const chunks = monthChunks(year, month);
  const idx = chunks.findIndex((c) => isoDate >= c.start && isoDate <= c.end);
  return idx >= 0 ? idx + 1 : 1;
}

export function formatWeekRangeLabel(
  year: number,
  month: number,
  startISO: string,
  endISO: string,
): string {
  const sm = Number(startISO.slice(5, 7));
  const sd = Number(startISO.slice(8, 10));
  const em = Number(endISO.slice(5, 7));
  const ed = Number(endISO.slice(8, 10));
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[sm - 1]} ${sd} – ${months[em - 1]} ${ed}`;
}

export function displayMonthTitle(year: number, month: number): string {
  return new Date(year, month - 1, 1).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function weekdayShort(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleString("en-US", { weekday: "short" });
}
