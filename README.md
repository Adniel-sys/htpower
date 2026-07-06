# HT-Power Pest Control — Website

React + Vite + Tailwind + shadcn/ui. Single-page marketing site.

## Setup
```bash
pnpm install
pnpm dev          # local dev server
pnpm build        # production build -> dist/
```

## Backend: Make.com
`src/App.tsx` → `ContactForm` posts `{name, email, phone, message}` to `import.meta.env.VITE_MAKE_WEBHOOK_URL`. A hidden honeypot field short-circuits the request client-side if filled (bot traffic never reaches the webhook).

Add to `.env` (never commit):
```

```

**TODO:** build the Make scenario (Webhook → validate → Gmail/Sheets/CRM) and drop its URL above. Since the webhook URL ships in the client bundle, add rate-limiting/dedupe on the webhook trigger inside the Make scenario itself — it can't be enforced from the browser.

## Deploy
Vercel or Netlify. Set VITE_MAKE_WEBHOOK_URL as an env var in the dashboard.

## Workflow
Push feature/staging branches, not directly to `main` — Vercel auto-deploys every branch/PR to its own preview URL. Verify changes on the preview URL first, then merge to `main` to deploy to production.
