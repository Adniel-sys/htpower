---
name: frontend-design
description: Use when adding or modifying UI in this project (htpower) — sections, cards, buttons, forms, colors, spacing, or animations. Ensures new front-end code matches the existing design system instead of introducing one-off styles.
---

# HT-Power Front-End Design System

This project is a single-page React + Tailwind + shadcn/ui marketing site (`src/App.tsx`). It has an established visual language — follow it rather than inventing new patterns.

## Color system

Two ways colors show up here; prefer the first, but match whichever a section already uses:

- **Tailwind design tokens** (`tailwind.config.js` + CSS vars in `src/index.css`): `primary`, `secondary`, `accent`, `border`, `ring`, `background`, `foreground`, etc. Use for shadcn/ui primitives (`src/components/ui/*`) and anything that should respect the token system.
- **Brand utility classes** (`src/index.css`): `.brand-royal` / `.bg-brand-royal` (`#2952cc`), `.brand-ink` / `.bg-brand-ink` (`#16265e`), `.accent-gold` / `.bg-accent-gold` (`#f2b807`). Use these instead of raw hex where a brand color is needed.
- **`.brand-navy` / `.bg-brand-navy` — not a matched pair, see Known gaps below.** `.brand-navy` (text) is `#16265e` (navy ink), but `.bg-brand-navy` (background) is actually `#2952cc` (royal blue), *not* navy. Don't assume these two classes render the same hue.
- **`.text-shadow-soft`**: soft drop-shadow for light text over photo backgrounds (used on the hero heading).
- **Gradients**: `.gradient-hero`, `.gradient-band`, `.gradient-soft`, `.gradient-card` — reuse these for section backgrounds/cards rather than writing new `linear-gradient()` values.
- The codebase currently also has ~50 raw hex literals like `text-[#0d2f5e]` and `border-[#cfe4f5]` scattered through `App.tsx` (pre-existing, not yet cleaned up). Don't add more of these — use the brand classes/tokens above for new code even where nearby old code uses raw hex.

## Typography

- Body font: `'Poppins'` (set globally on `body` in `src/index.css`).
- Headings/display text: `.font-display` class → `'Archivo'`, weight 900, tight tracking (`-0.02em`), tight line-height (`0.95`). Apply to `h2`/`h3` section titles, not body copy.
- Section eyebrow label pattern: `<p className="text-sm font-bold tracking-[0.2em] brand-royal">LABEL TEXT</p>` above the `h2`.
- Both fonts are loaded via a Google Fonts `<link rel="stylesheet">` in `index.html` (with `preconnect` hints), matching the weights referenced in `src/index.css`.

## Layout conventions

- Section wrapper: `<section id="..." className="py-20 md:py-28 [bg-variant]">` — 20/28 vertical rhythm is consistent across sections.
- Content container: `<div className="mx-auto max-w-6xl px-5">` (some narrower sections use `max-w-5xl` or `max-w-2xl` for centered text blocks).
- Section heading block: centered, `max-w-2xl mx-auto`, eyebrow label → `font-display text-4xl md:text-5xl` heading → muted supporting paragraph.
- Grids: `grid sm:grid-cols-2 lg:grid-cols-3 gap-6` for card collections (see Projects section).

## Component patterns

- **Cards**: `rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all`, image with `group-hover:scale-105 transition-transform duration-500` inside a `group` wrapper, gradient overlay (`bg-gradient-to-t from-[#0d2f5e]/85 via-[#0d2f5e]/10 to-transparent`) for text-over-image captions.
- **Clickable cards/images**: use a `<button type="button">` wrapper (not a `<div onClick>`) for anything interactive, for keyboard/screen-reader accessibility — see the Projects gallery (`src/App.tsx`) which opens a lightbox `Dialog` on click.
- **Buttons**: reuse the shared class strings at the top of `App.tsx` (`btnOnDark`, `btnGhostDark`) or the shadcn `Button` component (`src/components/ui/button.tsx`) — don't hand-roll new button styling.
- **Modals/overlays**: use the existing shadcn `Dialog` (`src/components/ui/dialog.tsx`, wraps `@radix-ui/react-dialog`) rather than a custom overlay implementation. Always include a `DialogTitle` (use `className="sr-only"` if it shouldn't be visible) — Radix requires it for accessibility.
- **Forms**: label + input pairs should use matching `htmlFor`/`id` (existing `ContactForm` is missing this — don't repeat that gap in new form fields).

## Animation conventions

- **Scroll-reveal**: add `data-reveal` + `className="opacity-0"` to an element; the global `useReveal()` hook (`src/App.tsx`) observes `[data-reveal]` via `IntersectionObserver` and adds `.animate-fadeup` when it scrolls into view. Stagger grids with inline `style={{ animationDelay: `${i * 60}ms` }}`.
- **Count-up numbers**: use the existing `CountUp` component (`src/App.tsx`) for stat numbers instead of writing a new counter.
- **Floating motif**: `.animate-floaty` for gentle looping vertical float on decorative elements.
- All custom animations respect `prefers-reduced-motion` (see `src/index.css`) — if you add a new CSS animation, add it to that media query too.

## Accessibility baseline

- Interactive elements are real `<button>`/`<a>`, never `<div onClick>`.
- Decorative images: `alt=""`. Content images: descriptive `alt`.
- Focus ring is global via `:focus-visible` in `src/index.css` — don't suppress it with `outline-none` unless you provide an equivalent focus style.

## Known gaps (don't copy these into new code)

- Raw hex colors instead of brand classes/tokens (see Color system above).
- `ContactForm` labels lack `htmlFor`/`id` association.
- `App.tsx` is a single 600+ line file with no `sections/` split — for now new sections still go in this file, but keep each section visually and structurally self-contained so it's easy to extract later.
- `.bg-brand-navy` doesn't actually render navy — it's `#2952cc` (royal), while `.brand-navy` text color is the real navy ink `#16265e`. The footer currently uses `bg-brand-navy` and is therefore royal blue, not navy, despite the name.
- `src/App.css` exists in the repo but is dead, unused Vite-template boilerplate (never imported — `src/main.tsx` only imports `./index.css`). Don't add styles there; it has no effect on the rendered site.
