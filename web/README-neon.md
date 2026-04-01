# Neon (reflection app)

Personal project created via Neon MCP.

- **Neon project ID:** `raspy-scene-18868820` (name: strategist-reflection-personal)
- **Branch:** `main`

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Paste your Neon **connection string** as `DATABASE_URL` (use the **pooler** URI for serverless).

## Vercel

1. New Project → import `directing-intelligent-training-system` (or your fork).
2. **Root Directory:** `web` (monorepo).
3. **Environment variables:** `DATABASE_URL` = Neon pooled connection string (Production).
4. Deploy. Open `/reflect` on the deployment URL.

Do not commit `.env.local` or paste passwords into markdown.

If this Neon password was ever exposed in chat or logs, rotate it in the Neon console.
