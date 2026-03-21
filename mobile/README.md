# Director of Intelligent Training (mobile)

Expo (React Native) app implementing [../app-design.md](../app-design.md). Canonical copy lives in [../thinking-principle-gpt-raw.md](../thinking-principle-gpt-raw.md) and is curated in `content/modules.ts`.

## Run

```bash
cd mobile
npm install
npm start
```

Then open in Expo Go (iOS/Android) or press `i` / `a` for simulators.

## Content export

After editing `content/modules.ts`, refresh the JSON bundle:

```bash
npm run export-content
```

This writes `content/content.json` (used for audits; the app imports TypeScript modules at runtime).

## Persistence

Progress, streaks, reflections, and preferences use **AsyncStorage** via Zustand `persist` (Expo Go–friendly). For production you can swap to MMKV with a dev client build.

## Stack

Expo Router (tabs + stacks), Zustand, FlashList, Reanimated, AsyncStorage, SVG (strategist map).
