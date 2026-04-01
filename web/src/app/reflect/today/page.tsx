"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function TodayRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/reflect/day/${todayISO()}`);
  }, [router]);
  return (
    <main style={{ padding: "2rem", textAlign: "center", color: "#a1a1aa" }}>
      Opening today…
    </main>
  );
}
