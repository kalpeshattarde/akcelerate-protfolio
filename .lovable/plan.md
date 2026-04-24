# SEO + Marketing Upgrade — Add Missing Sections from Reference Site

Adopt the high-converting elements from the reference (21-day MVP, AI Agents service, n8n automations, Custom AI, Builders Community) into AKcelerate's existing brand system (Poppins/Inter, #2563EB primary, #06B6D4 accent, glass cards, gradient text). No copying of competitor copy verbatim — rewrite with AKcelerate voice and stats.

---

## 1. Homepage Hero — Add "21-Day MVP" Positioning Layer

**File:** `src/pages/Index.tsx` (HERO section)

- Add a small badge above the H1: **"AI-Powered MVPs in 21 Days"** (using existing `.hero-badge` style).
- Keep current H1 ("Increase Revenue & Profit…") but add a secondary line under the subtitle: *"From concept to launch — full-stack apps, n8n automations, and custom AI. Fast, focused, and ROI-driven."*
- Add a third hero stat tile row item: **"21-Day MVP"** alongside existing stats.
- No layout breakage — re-uses `hero-stat-card` and `Magnetic` button wrappers.

---

## 2. New Section — "What We Build" (4-tile capability grid)

**File:** `src/components/home/WhatWeBuild.tsx` (new) + import in `src/pages/Index.tsx` after Process section.

Four glass cards with icons + bullets + "Get a Quote →" link to `/contact?intent=quote&service=<slug>`:

| Tile | Icon | Bullets | CTA target |
|---|---|---|---|
| Websites & Landing Pages | Globe | Responsive · SEO-ready · Fast performance | `/contact?service=websites` |
| MVP App Development | Rocket | 21-day delivery · Full-stack · Launch-ready | `/contact?service=mvp` |
| n8n Automations | Workflow | Workflows · AI integrations · No-code + code | `/contact?service=automation` |
| Custom AI | Brain | RAG · Fine-tuning · Production-ready | `/contact?service=custom-ai` |

Uses `RevealGrid` + `glass-card` + brand gradient hover states (matches existing benefits section pattern).

---

## 3. New Section — "AI Agents as a Service"

**File:** `src/components/home/AIAgentsSection.tsx` (new) + import in `src/pages/Index.tsx` before Industries section.

Two-column layout (matches existing hero grid):
- **Left:** Heading "AI Agents That Think, Act & Execute", description, two grouped feature lists ("What AI agents can do" / "Where they automate"), CTA → `/contact?intent=ai-agents`.
- **Right:** Animated dashboard-style card showing agent flow (re-use `ak-dark-card` styling from process dashboard).
- Integration row: pill chips for "CRMs · Databases · SaaS Tools · Messaging · n8n".

---

## 4. New Section — "Automate Everything That Slows You Down"

**File:** `src/components/home/AutomationShowcase.tsx` (new) + import after AI Agents section.

4-card grid (Instagram Content · AI Video Generation · Voice Agent · Custom n8n Workflows) — each with bullets and **"Set Up My Automation →"** CTA → `/contact?intent=automation&type=<slug>`.

Re-uses `glass-card` + `feature-icon` + `gradient-text` tokens.

---

## 5. New Section — "Custom AI That Knows Your Business"

**File:** `src/components/home/CustomAISection.tsx` (new) + import after Automation Showcase.

5-card grid (RAG · Model Fine-Tuning · AI Training Pipelines · Voice Agents · Custom AI Dashboard) with **"Build This For Me →"** CTA → `/contact?intent=custom-ai&capability=<slug>`.

---

## 6. New Section — "AKcelerate Builders Club" (Community)

**File:** `src/components/home/BuildersClub.tsx` (new) + import before final CTA section.

- Two-column dark gradient block (matches dark CTA style):
  - **Left:** Heading "Join the AKcelerate Builders Community", curriculum chips (n8n · RAG · Fine-tuning · AI Video · Voice Agents · Landing Pages), countdown stub ("Next session: every Sunday 9 PM IST").
  - **Right:** Two CTAs — *Join WhatsApp Channel* (external link placeholder) + *Register for Cohort* (→ `/contact?intent=cohort`).
- "Join 500+ AI Builders" social proof tagline.

---

## 7. SEO Enhancements (Senior SEO Engineer hat)

- **Index.tsx `<SEOHead>`:** Update title to *"AI MVPs in 21 Days · AI Consulting & Data Solutions | AKcelerate"* and description to include keywords: *21-day MVP, AI agents, n8n automation, RAG, custom AI, data analytics*.
- **Add `Service` JSON-LD** schema array (in `reviewsJsonLd` graph) covering 4 service tiles for rich-result eligibility.
- **Add `FAQPage` JSON-LD** in addition to existing FAQ accordion (currently rendered visually only) — improves SERP real-estate.
- **Add `BreadcrumbList` JSON-LD** to Index (single root crumb) and verify `Breadcrumbs.tsx` is used on detail pages.
- **`public/sitemap.xml`:** add `/top-selling` route (currently missing) and bump `lastmod`. Update `scripts/generate-sitemap.mjs` to auto-include it.
- **`public/robots.txt`:** confirm sitemap line points to canonical domain.
- **`index.html`:** add Open Graph + Twitter card meta defaults (`og:type=website`, `og:image=/images/akcelerate-og.svg`, `twitter:card=summary_large_image`) so `SEOHead` overrides page-by-page but root has good defaults.
- **Internal linking:** ensure each new section's CTA links into Contact with tracked params (already aligned with existing `?intent=...&product=...` analytics convention).

---

## 8. Analytics Wiring

In each new CTA, fire `analytics.track` events:
- `home_service_tile_click` `{ service }`
- `home_ai_agents_cta_click`
- `home_automation_cta_click` `{ type }`
- `home_custom_ai_cta_click` `{ capability }`
- `home_builders_club_cta_click` `{ destination }`

Reuses existing `src/lib/analytics.ts` patterns.

---

## Technical Notes

- All new components are presentational, no new dependencies, no backend changes, no migrations.
- All copy is original AKcelerate voice — not copied verbatim from reference.
- All sections wrapped in `RevealSection` / `RevealGrid` for consistent scroll-in animations.
- Mobile-first responsive: grids collapse to 1 col `< md`, 2 col `md`, 4 col `lg`.
- Estimated new files: 5 components. Modified files: `Index.tsx`, `index.html`, `public/sitemap.xml`, `scripts/generate-sitemap.mjs`.

---

## Out of Scope (ask if you want these added)

- Live WhatsApp/cohort countdown logic (currently a static stub).
- Founder/personal-brand block (you already have `/founder`).
- Pricing-table redesign for the 4 new service tiles (can be a follow-up).
