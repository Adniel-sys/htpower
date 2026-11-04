# HT-Power Pest Control — Website

React + Vite + Tailwind + shadcn/ui. Single-page marketing site.

## Live Site

**[https://htpower-website.vercel.app/](https://htpower-website.vercel.app/)**

## Setup

**Requirements:** Node.js `^20.19.0` or `>=22.12.0` (per Vite 8's engine requirement), and `pnpm`.

If `pnpm` isn't installed globally, enable it via Node's built-in Corepack (`corepack enable`), install it globally (`npm install -g pnpm`), or just prefix each command below with `npx` (e.g. `npx pnpm install`).

```bash
pnpm install
pnpm dev          # local dev server
pnpm build        # production build -> dist/
pnpm preview      # preview the production build locally
pnpm lint         # lint the codebase
```

## Backend: Make.com
`src/App.tsx` → `ContactForm` posts `{name, email, phone, message}` to same-origin `/api/contact`, a Vercel Edge Function (`api/contact.ts`) that forwards the request server-side to the real Make.com webhook. This keeps the webhook URL out of the client bundle entirely — only `MAKE_WEBHOOK_URL` (server-only, no `VITE_` prefix) knows it. A hidden honeypot field short-circuits the request client-side if filled (bot traffic never reaches the webhook), and dedup/rate-limiting is handled inside the Make.com scenario itself.

`api/contact.ts` also re-validates the payload server-side (required name/email, PH phone pattern, message min length, establishment type, 10KB body cap) before forwarding — this mirrors the client-side `validate()` in `ContactForm` so a direct POST to `/api/contact` (bypassing the site's UI/honeypot entirely) can't relay arbitrary unvalidated data to Make.com.

### Cloudflare Turnstile
The form also shows a Cloudflare Turnstile widget (bot check). Its token is sent with the form, and `api/contact.ts` verifies it with Cloudflare's `siteverify` endpoint before forwarding anything. Missing or invalid tokens get a 403, and the token itself is never forwarded to Make.com.

- `VITE_TURNSTILE_SITE_KEY` is the **public** site key. Vite puts it into the client bundle, which is expected.
- `TURNSTILE_SECRET_KEY` is the **secret** key. It is server-only and must never get a `VITE_` prefix.

For local dev and Vercel Preview, use Cloudflare's test keys, which always pass on any hostname: site `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA`. For Production, use the real keys from Cloudflare dashboard → Turnstile → your widget (hostname `htpower-website.vercel.app`).

Add to `.env` (never commit; `.env.*` and `.vercel/` are git-ignored too):
```
MAKE_WEBHOOK_URL=
TURNSTILE_SECRET_KEY=
VITE_TURNSTILE_SITE_KEY=
```

**Local dev note:** `pnpm dev` (plain Vite) does not run `api/` functions — that's Vercel-only. To test the contact form locally end-to-end, use `vercel dev` (via `pnpm dlx vercel dev`, after `vercel link`) instead.

## Deploy
Vercel or Netlify. Set `MAKE_WEBHOOK_URL` and `TURNSTILE_SECRET_KEY` as server-side env vars in the dashboard (Production + Preview) — no `VITE_` prefix, since they must stay server-only. Set `VITE_TURNSTILE_SITE_KEY` too (real key for Production, test key for Preview). Redeploy after changing any of them.

## Workflow
Push feature/staging branches, not directly to `main` — Vercel auto-deploys every branch/PR to its own preview URL. Verify changes on the preview URL first, then merge to `main` to deploy to production.
