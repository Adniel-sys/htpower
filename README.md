# HT-Power Pest Control — Website

React + Vite + Tailwind + shadcn/ui. Single-page marketing site.

## Setup
```bash
pnpm install
pnpm dev          # local dev server
pnpm build        # production build -> dist/
```

## Backend: Make.com
`src/App.tsx` → `ContactForm` posts `{name, email, phone, message}` to same-origin `/api/contact`, a Vercel Edge Function (`api/contact.ts`) that forwards the request server-side to the real Make.com webhook. This keeps the webhook URL out of the client bundle entirely — only `MAKE_WEBHOOK_URL` (server-only, no `VITE_` prefix) knows it. A hidden honeypot field short-circuits the request client-side if filled (bot traffic never reaches the webhook), and dedup/rate-limiting is handled inside the Make.com scenario itself.

`api/contact.ts` also re-validates the payload server-side (required name/email, PH phone pattern, message min length, establishment type, 10KB body cap) before forwarding — this mirrors the client-side `validate()` in `ContactForm` so a direct POST to `/api/contact` (bypassing the site's UI/honeypot entirely) can't relay arbitrary unvalidated data to Make.com.

Add to `.env` (never commit):
```
MAKE_WEBHOOK_URL=
```

**Local dev note:** `pnpm dev` (plain Vite) does not run `api/` functions — that's Vercel-only. To test the contact form locally end-to-end, use `vercel dev` (via `pnpm dlx vercel dev`, after `vercel link`) instead.

## Deploy
Vercel or Netlify. Set `MAKE_WEBHOOK_URL` as a server-side env var in the dashboard (Production + Preview) — no `VITE_` prefix, since it must stay server-only.

## Workflow
Push feature/staging branches, not directly to `main` — Vercel auto-deploys every branch/PR to its own preview URL. Verify changes on the preview URL first, then merge to `main` to deploy to production.
