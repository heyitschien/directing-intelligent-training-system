"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/reflect/today", label: "Today" },
  { href: "/reflect", label: "Months" },
  { href: "/reflect/review", label: "Review" },
  { href: "/reflect/settings", label: "Settings" },
] as const;

export function ReflectBottomNav() {
  const pathname = usePathname();
  return (
    <nav className="reflect-bottom-nav" aria-label="Reflection">
      {links.map(({ href, label }) => {
        const active =
          href === "/reflect"
            ? pathname === "/reflect" || pathname.startsWith("/reflect/month")
            : href === "/reflect/today"
              ? pathname === "/reflect/today" || pathname.startsWith("/reflect/day/")
              : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link key={href} href={href} data-active={active ? "true" : "false"}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
