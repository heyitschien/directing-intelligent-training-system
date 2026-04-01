import { exportMonthMarkdown } from "@/actions/reflection";

type Params = { year: string; month: string };

export async function GET(
  _request: Request,
  context: { params: Promise<Params> },
) {
  const { year: ys, month: ms } = await context.params;
  const year = Number(ys);
  const month = Number(ms);
  if (!Number.isFinite(year) || !Number.isFinite(month)) {
    return new Response("Bad request", { status: 400 });
  }
  const md = await exportMonthMarkdown({ year, month });
  if (!md) {
    return new Response("Month not found", { status: 404 });
  }
  const name = `${year}-${String(month).padStart(2, "0")}-reflection.md`;
  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${name}"`,
    },
  });
}
