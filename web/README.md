# Strategist OS (web)

Next.js app implementing **[../app-design-architecture.md](../app-design-architecture.md)** as a **single-page** Strategist OS experience at `/`.

## Run

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What’s inside

- **Home (`/`):** full workshop UI (ported from `examples/prototype.html`) — hero, five-step OS cards with native `<details>`, nested **MODEL (Li)** GCICL panels, three worked-example accordions, daily review, fixed bottom tab bar with in-page anchors.
- **Styles:** `src/app/globals.css` (Tailwind v4) + `src/app/workshop.css` (design tokens and `workshop-*` classes). Workshop CSS is split out so Turbopack dev does not drop those rules when processing Tailwind in the same file.

## Build

```bash
npm run build
npm start
```
