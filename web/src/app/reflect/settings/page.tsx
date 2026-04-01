import Link from "next/link";

export default function ReflectSettingsPage() {
  return (
    <main style={{ padding: "1rem", maxWidth: 560, margin: "0 auto" }}>
      <h1 className="reflect-hero">Settings</h1>
      <div className="reflect-card" style={{ marginTop: "1rem" }}>
        <p style={{ margin: "0 0 0.75rem", color: "#d4d4d8" }}>
          Personal app — no login. Anyone with your Vercel URL sees the same data; keep the URL private if
          needed.
        </p>
        <p style={{ margin: "0 0 0.75rem", color: "#a1a1aa", fontSize: "0.9rem" }}>
          Data: Neon Postgres via <code style={{ color: "#e4e4e7" }}>DATABASE_URL</code> on the server only.
          Quick capture lines append to <strong>Events</strong> in markdown export.
        </p>
        <p style={{ margin: 0, color: "#a1a1aa", fontSize: "0.9rem" }}>
          See <code style={{ color: "#e4e4e7" }}>web/README-neon.md</code> for Neon project id and Vercel
          setup (no secrets in git).
        </p>
      </div>
      <Link href="/" className="reflect-btn secondary" style={{ marginTop: "1rem", textDecoration: "none", display: "block", textAlign: "center" }}>
        Strategist OS workshop home
      </Link>
    </main>
  );
}
