# HT-Power Pest Control — Website

Single-page marketing site for HT-Power Pest Control Services (Metro Manila). React 19 + TypeScript + Vite 8 + Tailwind CSS 3, with a few shadcn/ui components. Hosted on Vercel.

## Live Site

**[https://htpower-website.vercel.app/](https://htpower-website.vercel.app/)**

## Setup

**Requirements:**
- Node.js `^20.19.0` or `>=22.12.0` (Vite 8's engine requirement).
- pnpm **10 or newer**. This repo uses pnpm (`pnpm-lock.yaml`, `pnpm-workspace.yaml`); don't use npm or yarn, or you'll get a second lockfile. pnpm 9 refuses this `pnpm-workspace.yaml`.

If `pnpm` isn't installed, run `npm install -g pnpm`, or prefix each command below with `npx` (e.g. `npx pnpm install`).

```bash
pnpm install
pnpm dev          # local dev server (frontend only, see note below)
pnpm build        # type-check (tsc -b, includes api/) + production build -> dist/
pnpm preview      # preview the production build locally
pnpm lint         # lint with oxlint
```

## Project structure

```
api/contact.ts            Vercel Edge Function behind the contact form
src/App.tsx               The whole page: sections, ContactForm, Turnstile widget
src/components/ui/        shadcn/ui components in use: accordion, button, dialog, select
src/assets/               Photos and company-profile images (imported by App.tsx)
public/                   og-image.jpg, robots.txt, sitemap.xml (served as-is)
vercel.json               Security headers and Content-Security-Policy
.github/workflows/        Uptime check (pings the live site every 5 hours)
.claude/skills/           Design-system notes for Claude Code
```

## Contact form

Flow: **website form → `/api/contact` → Cloudflare Turnstile check → Make.com webhook → Telegram alert + confirmation email to the customer.**

`ContactForm` in `src/App.tsx` posts `{name, email, phone, message, establishmentType, website, turnstileToken}` as JSON to same-origin `/api/contact`. `website` is a hidden honeypot field. The Edge Function in `api/contact.ts`:

1. Accepts only `POST` with `Content-Type: application/json`, from the site's own origin, up to 10 KB.
2. Drops the request silently (fake 200) if the honeypot is filled. The form also does this before sending.
3. Re-validates every field (name letters only, valid email, optional PH mobile number, message at least 10 characters, establishment type required, per-field length caps), mirroring the client-side `validate()`.
4. Verifies the Turnstile token with Cloudflare's `siteverify` endpoint. Missing or invalid tokens get a 403.
5. Forwards only the five clean fields (`name, email, phone, message, establishmentType`) to `MAKE_WEBHOOK_URL`. The webhook URL never reaches the browser, and the Turnstile token is never forwarded.

The API has no rate limiting of its own. Turnstile and the honeypot are the bot protection, and anything beyond that (dedup, alerts, emails) lives in the Make.com scenario.

### Cloudflare Turnstile

- `VITE_TURNSTILE_SITE_KEY` is the **public** site key. Vite builds it into the client bundle, which is expected.
- `TURNSTILE_SECRET_KEY` is the **secret** key. It is server-only and must never get a `VITE_` prefix.

For local dev and Vercel Preview, use Cloudflare's [test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/), which always pass on any hostname: site `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA`. For Production, use the real keys from Cloudflare dashboard → Turnstile → HT-Power Contact Form. That widget only allows the hostnames listed in it (currently `htpower-website.vercel.app`). When a custom domain is added, add it to the widget's hostnames; the keys stay the same.

The site key and secret must be a matching pair (both test or both real), or every submission fails with a 403.

## Environment variables

Add to `.env` for local work (never commit it; `.env`, `.env.*` and `.vercel/` are git-ignored, see `.env.example`):

```
MAKE_WEBHOOK_URL=
TURNSTILE_SECRET_KEY=
VITE_TURNSTILE_SITE_KEY=
```

| Variable | Vercel Production | Vercel Preview | Exposed to browser? |
|---|---|---|---|
| `MAKE_WEBHOOK_URL` | Secret | Secret | No |
| `TURNSTILE_SECRET_KEY` | Secret, real key | Secret, test key | No |
| `VITE_TURNSTILE_SITE_KEY` | Real site key | Test site key | Yes (by design) |

`VITE_` variables are baked in at build time, so redeploy after changing any variable.

**Local dev note:** `pnpm dev` (plain Vite) doesn't run `api/` functions, so the form can't submit there. To test the form end-to-end locally, run `pnpm dlx vercel dev` (after `vercel link`) instead.

## Security headers

`vercel.json` sets `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` and a strict Content-Security-Policy. The CSP allows scripts and frames from `https://challenges.cloudflare.com` for Turnstile, plus Google Fonts. If you add any new third-party script, font, image host or iframe, add it to the CSP, or the browser will block it.

## Deploy

Vercel only. `api/contact.ts` is a Vercel Edge Function and the headers live in `vercel.json`. Every push builds automatically: `main` deploys to production, and other branches get preview URLs.

When the site moves to a custom domain, also update the hard-coded `htpower-website.vercel.app` URLs in `index.html` (canonical, Open Graph, Twitter), `public/robots.txt` and `public/sitemap.xml`.

## Workflow

Don't push directly to `main`. Create a branch from `main`, push it, check the Vercel preview URL, then merge to `main` to deploy to production. Delete the branch after merging.
