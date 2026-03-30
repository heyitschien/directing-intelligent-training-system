# Directing Intelligent Training System

- [Strategist-OS-Thinking-System-Master.md](Strategist-OS-Thinking-System-Master.md) — consolidated thinking system reference
- [Master-Strategis-OS.md](Master-Strategis-OS.md) — foundational principles
- [app-design-architecture.md](app-design-architecture.md) — product spec and visual system
- [web/](web/) — **Strategist OS** Next.js single-page app at `/` (mobile-first, scales to tablet and desktop; see `web/README.md`)

## Build & quality

```bash
(cd web && npm ci && npm run lint && npm run typecheck && npm run build)
```

From the **repository root** (after `web/node_modules` exists):

```bash
npm run validate
```

| Script (root) | What it runs |
|----------------|--------------|
| `npm run lint` | ESLint on `web/` |
| `npm run typecheck` | `tsc --noEmit` in `web/` |
| `npm run build` | Next.js production build in `web/` |
| `npm run validate` | lint + typecheck + web build |
