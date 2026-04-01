import { startCurrentMonthFormAction } from "@/actions/reflection";

export function StartCurrentMonthButton({ label }: { label: string }) {
  return (
    <form action={startCurrentMonthFormAction}>
      <button type="submit" className="reflect-btn">
        {label}
      </button>
    </form>
  );
}
