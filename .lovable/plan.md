

# UI & Animation Upgrade Plan

## Summary
Port all 10 premium visual effects from the source repo's `visual.js` and `main.js` into React hooks/components, add proper dark/light mode support across all pages, and enhance every page with interactive elements.

---

## Phase 1: Animation Infrastructure

### 1A. New CSS Keyframes & Utilities (`src/index.css`)
Add missing keyframes from source:
- `akOrbFloat` — floating orb drift animation
- `akRipple` — button click ripple expand
- `akShimmer` — gradient text shimmer (background-position shift)
- `akPulseGlow` — pulsing blue glow for CTAs
- `akFadeSlideUp/Down/Left/Right` — directional scroll reveal
- `akRingFill` — SVG circular progress stroke animation

### 1B. New Tailwind Config Additions (`tailwind.config.ts`)
Add keyframes and animation utilities for `float-slow`, `float-delayed`, `shimmer`, `pulse-glow`, `spin-slow`.

---

## Phase 2: React Hooks & Components (New Files)

### 2A. `src/hooks/useTiltCard.tsx`
Mouse-follow 3D perspective tilt (6deg max, perspective 800px, scale 1.02). Attach to any card ref.

### 2B. `src/hooks/useScrollReveal.tsx` (upgrade existing)
Replace current basic version with IntersectionObserver-based directional reveals (up/down/left/right, staggered delays).

### 2C. `src/components/HeroParticles.tsx`
Canvas constellation effect — 55 floating dots connected by lines. Theme-aware colors (blue dots in light, cyan in dark).

### 2D. `src/components/TypingCycle.tsx`
Typewriter effect cycling through phrases: "AI Solutions", "Data Science", "Digital Growth", "Smart Analytics". Character-by-character with cursor blink.

### 2E. `src/components/FloatingOrbs.tsx`
3 gradient orbs (blue, cyan, purple) with blur and float animation. Theme-aware opacity.

### 2F. `src/components/StatRing.tsx`
SVG circular progress ring with animated stroke-dashoffset on scroll into view. Theme-aware colors.

### 2G. `src/components/ButtonRipple.tsx`
Wrapper that adds material-design ripple on click to any button.

### 2H. `src/components/GradientShimmer.tsx`
Animated gradient shimmer on `.gradient-text` elements — background-size 200%, position shift animation.

---

## Phase 3: Page-by-Page Enhancements

### Homepage (`Index.tsx`)
- Add `<HeroParticles />` canvas behind hero
- Add `<TypingCycle />` in hero subtitle
- Add `<FloatingOrbs />` in hero and CTA sections
- Apply `useTiltCard` to solution cards, benefit cards
- Add staggered scroll reveal to all sections
- Apply gradient shimmer to hero heading

### Solutions (`Solutions.tsx`, `SolutionDetail.tsx`)
- Tilt cards on all solution cards
- Scroll reveal with stagger on grid items
- Floating orbs in hero area
- StatRings for metrics in detail pages

### Services (`Services.tsx`, `ServiceDetail.tsx`)
- Tilt cards, scroll reveal
- Progress bars with animated fill on scroll
- Floating orbs in hero

### Case Studies (`CaseStudies.tsx`)
- StatRings for KPI metrics (95% accuracy, 87% OEE, etc.)
- Tilt cards on case study cards
- Scroll reveal

### About (`About.tsx`)
- Team card tilt effect
- Timeline scroll reveal (staggered left/right)
- StatRings for company metrics

### Industries (`Industries.tsx`)
- Card tilt, scroll reveal
- Floating orbs

### Contact (`Contact.tsx`)
- Button ripple on submit
- Form input focus glow animation

### Blog/Insights (`Blog.tsx`, `Insights.tsx`, `BlogArticle.tsx`)
- Card tilt, scroll reveal
- Gradient shimmer on article headings

### Pricing (`Pricing.tsx`)
- Card tilt with enhanced glow on "recommended" card
- Scroll reveal

### All Other Pages (Careers, Gallery, Founder, FreeAudit, Privacy, Terms)
- Scroll reveal on all sections
- Floating orbs in hero areas where appropriate

---

## Phase 4: Dark/Light Mode Parity

### 4A. Theme Context Enhancement
- Ensure `document.documentElement.classList` toggle works with all new components
- All canvas components read theme class and adjust colors per frame
- HeroParticles: light → `rgba(37,99,235,0.45)`, dark → `rgba(6,182,212,0.45)`
- FloatingOrbs: light → lower opacity, dark → slightly higher
- StatRings: light → blue stroke on white, dark → cyan stroke on dark surface
- Glass cards: dark mode border glow uses `hsl(var(--primary) / 0.2)`

### 4B. CSS Variable Additions for Dark Mode
- `--shadow-glow-dark` for dark mode card hover
- Ensure all gradient backgrounds adapt (hero, CTA sections)
- Navbar blur effect adjusts opacity for dark mode

---

## Phase 5: Micro-Interactions

- Button hover: scale(1.02) + shadow increase
- Nav links: underline slide-in animation (already partially done)
- Card hover: border-color transition to primary
- Page transitions: keep existing fade+slide but add slight scale
- Scroll progress indicator bar at top of page (thin gradient line)
- Back-to-top button: rotate arrow icon on hover

---

## Technical Notes
- All canvas animations use `requestAnimationFrame` with cleanup in `useEffect` return
- `useTiltCard` uses passive event listeners for performance
- Scroll reveal uses `IntersectionObserver` with `threshold: 0.15` and `once: true`
- No external animation libraries — all vanilla Canvas API + CSS
- Bundle impact: minimal (hooks + small components, no heavy deps)

