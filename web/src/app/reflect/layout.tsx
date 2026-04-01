import type { Metadata, Viewport } from "next";
import { ReflectBottomNav } from "@/components/reflect/bottom-nav";
import "./reflect.css";

export const metadata: Metadata = {
  title: "Reflection · Strategist OS",
  description: "Monthly reflection — daily capture and weekly reviews",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Reflect" },
};

export const viewport: Viewport = {
  themeColor: "#8b5cf6",
};

/** Reflection uses Neon at request time; avoid static prerender at build (no DATABASE_URL there). */
export const dynamic = "force-dynamic";

export default function ReflectLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="reflect-root min-h-screen pb-24">
      {children}
      <ReflectBottomNav />
    </div>
  );
}
