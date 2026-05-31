# WatchWorldCup2026

Secure Next.js 14 directory for finding where to watch the FIFA World Cup 2026 by country.

## Stack

- Next.js 14 App Router, TypeScript, Tailwind CSS
- Supabase-ready schema with RLS and public read-only policies
- Zod validation on public API inputs
- Framer Motion, lucide-react, shadcn-compatible primitives

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

The app runs from local seed data when Supabase env vars are absent. Apply `supabase/schema.sql` in Supabase before importing seed data.

```bash
npm run export:data
npm run seed:supabase
```

## Verification

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run audit:prod
```

Broadcaster entries carry verification status and source metadata. India, Bangladesh, and Pakistan are intentionally marked unconfirmed until a verified live-rights source is added.
