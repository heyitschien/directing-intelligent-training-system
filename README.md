# Directing Intelligent Training System

- [app-design.md](app-design.md) — product and architecture for the mobile app  
- [thinking-principle-gpt-raw.md](thinking-principle-gpt-raw.md) — source principles  
- [mobile/](mobile/) — **Director of Intelligent Training** Expo app (run instructions inside `mobile/README.md`)
- [web/](web/) — **Strategist OS** Next.js single-page app at `/` from [app-design-architecture.md](app-design-architecture.md) (see `web/README.md`)

## Build & quality

Install dependencies in each app, then run checks:

```bash
(cd web && npm ci && npm run lint && npm run typecheck && npm run build)
(cd mobile && npm ci && npm run typecheck)
```

From the **repository root** (after `web/node_modules` and `mobile/node_modules` exist):

```bash
npm run validate
```

| Script (root) | What it runs |
|----------------|--------------|
| `npm run lint` | ESLint on `web/` |
| `npm run typecheck` | `tsc --noEmit` in `web/` and `mobile/` |
| `npm run build` | Next.js production build in `web/` |
| `npm run validate` | lint + typecheck + web build + mobile typecheck |
