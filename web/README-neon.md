# Neon (reflection app)

Personal project created via Neon MCP.

- **Neon project ID:** `raspy-scene-18868820` (name: strategist-reflection-personal)
- **Branch:** `main`

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Paste your Neon **connection string** as `DATABASE_URL` (use the **pooler** URI for serverless).

## Vercel

1. Import the GitHub repo; set **Root Directory** to `web`.
2. Add environment variable `DATABASE_URL` (same pooler string as local).

Do not commit `.env.local` or paste passwords into markdown.
