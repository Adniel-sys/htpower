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
pnpm build        # type-check (tsc -b, includes api/) + production build + pre-render -> dist/
pnpm preview      # preview the production build locally
pnpm lint         # lint with oxlint
pnpm test         # API tests (Vitest)
```

## Project structure

```
api/contact.ts            Vercel Edge Function behind the contact form
src/main.tsx              Browser entry: hydrates the pre-rendered page
src/entry-server.tsx      Build-time entry: renders App to an HTML string
scripts/prerender.mjs     Puts that HTML into dist/index.html after the build
src/App.tsx               The whole page: sections, ContactForm, Turnstile widget
src/index.css             Tailwind layers, brand colors, gradients, fonts
src/lib/utils.ts          cn() class-name helper used by the UI components
src/components/ui/        shadcn/ui components in use: accordion, button, dialog, select
src/assets/               Photos and company-profile images (imported by App.tsx)
public/                   og-image.jpg, robots.txt, sitemap.xml (served as-is)
tests/contact.test.ts     API tests (kept outside api/ so Vercel doesn't deploy them as a function)
vercel.json               Security headers and Content-Security-Policy
.github/workflows/        CI (ci.yml) and uptime check (uptime-check.yml)
.github/dependabot.yml    Weekly dependency update PRs
.claude/skills/           Design-system notes for Claude Code
```

## Pre-rendering

`pnpm build` runs two Vite builds: the normal client build, then a server build of `src/entry-server.tsx` into `dist-ssr/`. `scripts/prerender.mjs` renders `App` to HTML, puts it inside `<div id="root">` in `dist/index.html`, and deletes `dist-ssr/`. Search engines and link previews (Messenger, Viber) get the full page text without running JavaScript, and `main.tsx` hydrates it in the browser.

Because `App` is rendered in Node at build time, browser APIs (`window`, `document`, `localStorage`) may only be used inside `useEffect` or event handlers, never during render. The FAQ uses `forceMount` so closed answers are still in the HTML (hidden with CSS until opened).

## Contact form

Flow: **website form → `/api/contact` → Cloudflare Turnstile check → Make.com webhook → Telegram alert + confirmation email to the customer.**

`ContactForm` in `src/App.tsx` posts `{name, email, phone, message, establishmentType, website, consent, turnstileToken}` as JSON to same-origin `/api/contact`. `website` is a hidden honeypot field. `consent` is the required Data Privacy Act (RA 10173) checkbox; its "Privacy Notice" link opens the `PrivacyNotice` dialog in `App.tsx` (wording drafted for the owners; get their approval before changing it). The Edge Function in `api/contact.ts`:

1. Accepts only `POST` with `Content-Type: application/json`, from the site's own origin, up to 10 KB.
2. Drops the request silently (fake 200) if the honeypot is filled. The form also does this before sending.
3. Re-validates every field, mirroring the client-side `validate()`: name uses only letters (accented letters allowed), spaces, `.`, `'` and `-`; email must be valid; phone is optional, but if given must start with `0` and have 10–11 digits (spaces and dashes are ignored); message must be at least 10 characters; establishment type is required; `consent` must be exactly `true`; every field has a length cap.
4. Verifies the Turnstile token with Cloudflare's `siteverify` endpoint. Missing or invalid tokens get a 403.
5. Forwards only the five clean fields (`name, email, phone, message, establishmentType`) to `MAKE_WEBHOOK_URL`. The webhook URL never reaches the browser, and the Turnstile token is never forwarded.

Responses: `200` sent (or honeypot caught), `400` invalid JSON or field, `403` wrong origin or failed Turnstile, `405` not POST, `413` body over 10 KB, `415` not JSON, `500` `MAKE_WEBHOOK_URL` or `TURNSTILE_SECRET_KEY` missing on the server, `502` Cloudflare or Make.com unreachable or returned an error. The form shows an error with the business email for anything other than `200`.

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

## CI and branch protection

- **CI** (`.github/workflows/ci.yml`, job name `check`) runs on every pull request and every push to `main`: frozen `pnpm install` (pnpm 10, Node 22), `pnpm lint`, `pnpm test`, then `pnpm build` (type-check + build).
- **Ruleset "Protect main"** (GitHub → Settings → Rules) requires `check` to pass before anything lands on `main`, and blocks deleting or force-pushing `main`. Repository admins can bypass it for emergencies.
- **Dependabot** opens update PRs weekly: npm minor and patch updates grouped into one PR, GitHub Actions separately. Major upgrades of `typescript` and `tailwindcss` are ignored because they need a planned migration, not an automatic bump. Merge an update PR only when `check` and its Vercel preview are green.
- **Uptime check** (`.github/workflows/uptime-check.yml`) pings the live site 5 times a day; a failed run triggers GitHub's failure email.

## Workflow

Don't push directly to `main`. Create a branch from `main`, push it, and open a pull request. Merge only when `check` and the Vercel preview are green; merging to `main` deploys to production. Delete the branch after merging.
