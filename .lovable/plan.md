# Premium Visual Upgrade — AKcelerate

Make the site look like a $100M AI startup (think Linear, Vercel, Stripe, Cal.com, ElevenLabs) **without changing the blue/cyan brand, Poppins/Inter fonts, or any logic**. Focus is purely on visual refinement: typography rhythm, depth, density, micro-interactions, and editorial polish.

## What makes a site feel "premium" vs "average"

Average sites have: flat shadows, uniform card sizes, generic gradients, repetitive section padding, oversized headlines without hierarchy, low contrast between sections.

Premium sites have: layered shadows with colored ambient glow, **bento-style asymmetric grids**, tight letter-spacing on display headings, generous whitespace combined with **occasional dense data-rich modules**, subtle noise/grain, gradient borders on hero elements, cursor-aware interactions, and editorial section transitions.

## Scope (8 focused changes)

### 1. Typography polish (`src/index.css`)
- Bump display headings (h1, hero) to tracking `-0.035em` and add `font-feature-settings: "ss01","cv11"` for Inter ligatures.
- Add a `.text-display` utility (clamp-based fluid sizing 3rem → 5.5rem) for hero h1.
- Add `.eyebrow` class — small-caps, gradient underline accent, replaces flat `.section-label` on premium sections.
- Tighten body line-height from 1.7 → 1.6 on dense modules; keep 1.7 for long-form prose.

### 2. Layered "aurora" shadows + depth tokens (`src/index.css`)
- Add new tokens:
  - `--shadow-elevated`: 3-layer shadow (close, mid, far) for cards
  - `--shadow-aurora`: colored ambient blue→cyan glow for hero/CTA elements
  - `--shadow-inset-top`: subtle top highlight (1px white inset) for premium card feel
- Apply `--shadow-elevated` to `.glass-card`, `.hero-stat-card`, `.ak-dark-card`. Replace flat `box-shadow` calls.

### 3. Hero refinement (`src/pages/Index.tsx` + `src/index.css`)
- Replace flat `.hero-badge` with **glass-pill**: backdrop-blur, gradient ring border, animated dot.
- Wrap headline in `.text-display` with one accent word in `hero-gradient-text` (already exists) — increase contrast.
- Stat cards: convert 2×2 grid to a single horizontal **stat-strip** with vertical dividers (more editorial, less "card soup").
- Add a thin gradient hairline below hero (`border-bottom: 1px solid` with conic gradient mask) instead of plain section break.

### 4. Bento section for "What We Build" (`src/components/home/WhatWeBuild.tsx`)
- Convert the existing equal-grid into a **bento layout**: 1 large feature card (col-span-2 row-span-2) + 4 smaller cards. This single change reads as the biggest "premium" upgrade.
- Add subtle gradient border on the large card via `::before` mask.

### 5. Section rhythm + dividers (`src/index.css` + `Index.tsx`)
- Replace flat `section-alt` background with **subtle radial-mesh** (tiny 0.04-opacity orbs anchored at corners).
- Add `.section-divider-glow` — gradient hairline + tiny center dot for editorial breaks between sections.
- Vary section vertical padding: alternate `py-24` / `py-32` / `py-20` instead of uniform `py-24 lg:py-32` everywhere — creates rhythm.

### 6. Premium CTA buttons (`src/index.css`)
- `.btn-primary`: keep gradient but add **inset top highlight** (`inset 0 1px 0 rgba(255,255,255,0.25)`) and **outer aurora glow** on hover (multi-color shadow). This is the single most-noticed "premium" tell.
- `.btn-secondary`: switch from solid border to **gradient-border via mask** (border-image alternative) so border itself shimmers blue→cyan.
- Add `.btn-ghost` variant for tertiary actions (currently missing — text + arrow only).

### 7. Card micro-interactions (`src/index.css`)
- Glass card hover: add a **3D tilt-on-hover** via CSS `transform: perspective(1000px) rotateX/Y` driven by existing `--mouse-x/--mouse-y` vars (already tracked).
- Add a subtle **gradient border reveal** on hover (currently only the spotlight glow appears).
- Tighten card padding from `p-7` to `p-6` and increase internal type-scale — denser, more designed feel.

### 8. Process section + stats refinement (`src/pages/Index.tsx`)
- Convert numbered process circles to **gradient-ring numbers** (transparent center, conic-gradient ring) — more sophisticated than solid circles.
- Connector line between steps: animate a moving dot along the gradient (CSS `@keyframes` translateX) — implies flow.
- Impact stat cards: remove individual colored backgrounds, unify on dark glass surface with colored accent bar on top — looks like a real analytics dashboard.

## Files to modify

- `src/index.css` — most changes (tokens, classes, animations)
- `src/pages/Index.tsx` — hero stat-strip, section padding rhythm, process refinement
- `src/components/home/WhatWeBuild.tsx` — bento conversion
- `src/components/Hero.tsx` — apply `.text-display` + glass-pill badge

No new dependencies. No brand-color, font, or layout-structure changes. No logic, route, or data changes.

## Out of scope (intentionally)
- Dark-mode-only tweaks (light is the default, that's where premium feel matters most for B2B)
- Replacing icon sets, illustrations, or hero image
- Adding new sections or removing existing ones
- 3D/WebGL effects (overkill, hurts performance)

## Expected before/after feel
- Before: "nice indie SaaS"
- After: "well-funded AI startup that ships"
