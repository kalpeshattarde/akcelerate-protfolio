

# Plan: Build the SaaS Prototypes Guide Page

## Overview
Create a new `/guide` route with a comprehensive, premium-designed help page for the SaaS Prototypes library. The page will be a single large component with all 11 sections, sticky side navigation, copy-to-clipboard prompt blocks, FAQ accordion, and mobile-first responsive design.

## Design Direction
- Neutral ink/stone palette (slate/zinc grays) with a single warm accent (amber-500 or emerald-600 — not purple, not crypto)
- Strong typographic hierarchy using existing Poppins/Inter fonts
- Clean whitespace, no glassmorphism, no fake stats
- Reuse existing components: `FAQAccordion`, `SEOHead`, scroll reveal hooks

## Files to Create/Edit

### 1. `src/pages/Guide.tsx` (new — ~800-1000 lines)
The main page component containing all 11 sections with fully written copy:
- **Hero** — headline, subheadline, two CTAs (Browse Prototypes links to `/products`, Copy Lovable Prompt copies the short prompt)
- **What This Library Contains** — two-column layout for SaaS vs Mobile groups with example names
- **How To Choose** — 4-step cards with icons
- **Which Folder To Give To AI** — callout panels with do/don't guidance
- **Folder Structure** — labeled table/grid showing each file/folder with category badges (source of truth, implementation, reference, archive)
- **Prompts Folder** — explanation of LOVABLE_ADVANCED_PROMPT.md and global prompt packs
- **How To Write Better Prompts** — formula breakdown with labeled items
- **Copy-Paste Prompt Blocks** — short and long prompt blocks with copy buttons, exact text from the spec
- **Best Practices** — checklist-style cards
- **FAQ** — using existing `FAQAccordion` component with the 6 specified questions
- **Final CTA** — closing section encouraging action

Includes a sticky desktop side navigation (hidden on mobile) that highlights the active section using IntersectionObserver.

### 2. `src/App.tsx` (edit)
- Add lazy import: `const Guide = lazy(() => import("./pages/Guide"));`
- Add route: `<Route path="/guide" element={<Guide />} />`

### 3. `src/components/Navbar.tsx` (edit — optional)
- Add "Guide" link to the navigation if appropriate

## Technical Details
- Copy-to-clipboard uses `navigator.clipboard.writeText()` with toast feedback via existing sonner
- Sticky side nav uses `position: sticky` with `IntersectionObserver` to track active section
- All copy is fully written — no placeholders
- Mobile: side nav collapses, sections stack vertically
- Prompt blocks styled with monospace font, dark background, and a copy icon button

## Scope
- 3 files touched (1 new page, 1 route addition, 1 optional nav update)
- No new dependencies needed
- All content written inline, no separate data file needed for this one-off page

