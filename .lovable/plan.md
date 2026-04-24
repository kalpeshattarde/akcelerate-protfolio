# AKcelerate Hybrid Studio Expansion

The site already has strong foundations (WhatWeBuild, AIAgentsSection, AutomationShowcase, CustomAISection, BuildersClub, 21-day MVP hero, intent-aware Contact links). This plan **extends** those without removing or duplicating.

## 1. Global Positioning Update

- **Tagline shift**: "AI-Powered MVPs in 21 Days" → secondary line "AI Product Studio · Automation Engine · Marketplace"
- Update `<SEOHead>` title/description on `Index.tsx`, `About.tsx`, `Solutions.tsx` to reflect the hybrid positioning.
- Update hero badge in `Index.tsx` to: "AI Product Studio + Automation + Marketplace".
- Keep the 21-day MVP H1 (it converts) but add a secondary subtitle line.

## 2. Three New Landing Routes

Create dedicated pages reusing existing section components:

| Route | Purpose | Reuses |
|---|---|---|
| `/ai-agents` | Agents-as-a-Service deep dive | `AIAgentsSection`, new pricing block, FAQ, CTA |
| `/automations` | n8n + workflow automation | `AutomationShowcase`, use cases, FAQ |
| `/build-mvp` | 21-day MVP service page | Process timeline from Index, deliverables, pricing |

Each page:
- `HeroPage` header + `SEOHead` with `Service`-equivalent `WebPage` + `FAQPage` JSON-LD (no `@type:Service` per existing constraint)
- Problem → Approach → Deliverables → CTA structure
- Add to `App.tsx` lazy routes, `Navbar` mobile menu, `sitemap.xml`, and `scripts/generate-sitemap.mjs`

## 3. Solutions Data Extension

Add **3 new entries** to `src/data/solutions.ts` (the canonical service module after services.ts removal):

- `ai-agents` — AI Agents as a Service (sales, support, internal copilots)
- `automation-systems` — n8n, API workflows, CRM/email automation
- `mvp-21day` — 21-Day MVP Build System

Each follows the existing `Solution` interface (features, benefits, process, industries, relatedSlugs). Add icons + update `solutionLinks` in `Navbar.tsx` mega menu and `solutionBreadcrumbs.ts` mapping.

## 4. Marketplace Upgrade

Extend `src/data/products.ts` schema:
- Add optional `category` field with values: `ai-agent | automation | saas-mvp | template`
- Add optional `tags: string[]` (e.g. `["AI", "automation", "SaaS"]`)
- Add optional `useCases: string[]` shown on `ProductDetail.tsx`

UI changes:
- `CatalogSection.tsx` / `ProductsSubNav.tsx` — add category filter chips
- `ProductCard.tsx` — render colored tag pills
- `ProductDetail.tsx` — new "Use Cases" section before pricing
- `BundleProgressBar.tsx` already exists — verify "5+ for bundle discount" copy matches `appConfig.ts` (already does)

## 5. Intent-Based Personalization

Extend `src/hooks/usePersonalization.ts`:
- Add `intent` detection from URL params (`?intent=founder|business|enterprise`) persisted to localStorage
- Return `recommendedProductCategory`, `heroVariant`, `ctaLabel` per intent:
  - **Founder** → MVP content, "Build My MVP" CTA
  - **Business owner** → Automation content, "Automate My Business" CTA
  - **Enterprise** → Consulting content, "Book Strategy Call" CTA
- Wire into `Index.tsx` hero subtitle + `PersonalizedPicks` filtering

Add a small intent picker on the hero (3 chips: "I'm a Founder / Business Owner / Enterprise") that updates state instantly without reload.

## 6. Admin AI Generators

`AdGeneratorTab.tsx` already exists. Add two siblings under `src/components/admin/`:
- `OfferGeneratorTab.tsx` — generates promo offers (headline + discount + urgency)
- `LandingPageGeneratorTab.tsx` — generates hero copy + 3 feature blocks + CTA for a given product

All three use a shared edge function `supabase/functions/generate-marketing/index.ts` calling Lovable AI (`google/gemini-3-flash-preview`) with tool-calling for structured output. Wire tabs into `Admin.tsx`.

Reuses existing `LOVABLE_API_KEY` (Lovable Cloud already enabled).

## 7. Footer + Navigation Wiring

- Add new routes to mobile menu in `Navbar.tsx`
- Add a "Studio" footer column in `Footer.tsx`: AI Agents · Automations · Build MVP · Custom AI
- Update `Solutions` mega menu to include the 3 new solution slugs
- Update `Navbar.solutions.test.tsx` to validate new links

## 8. SEO / Schema / Sitemap

- Update `Index.tsx` `ItemList` JSON-LD to include the 3 new solution entries
- Add new routes to `public/sitemap.xml` and `scripts/generate-sitemap.mjs`
- Each new landing page gets `WebPage` + `FAQPage` JSON-LD (no `Service`/`serviceType` per `check-no-services.mjs` guard)
- Re-run `npm run prebuild` mentally — all new content uses `WebPage`/`ItemList`/`ListItem`

## What stays untouched

- Auth (Clerk), Stripe/Razorpay, Admin shell, existing manufacturing benefits/tech sections, all `/solutions/*` detail pages, Lovable Cloud edge functions

## Files Touched

**Create**:
- `src/pages/AIAgents.tsx`, `src/pages/Automations.tsx`, `src/pages/BuildMVP.tsx`
- `src/components/admin/OfferGeneratorTab.tsx`, `src/components/admin/LandingPageGeneratorTab.tsx`
- `src/lib/intentDetection.ts`
- `supabase/functions/generate-marketing/index.ts`

**Modify**:
- `src/pages/Index.tsx` (hero subtitle, intent chips, JSON-LD)
- `src/data/solutions.ts` (3 new solutions)
- `src/data/products.ts` + `src/hooks/useProducts.ts` (category/tags/useCases)
- `src/components/Navbar.tsx`, `src/components/Footer.tsx`
- `src/components/products/ProductCard.tsx`, `CatalogSection.tsx`, `pages/products/ProductDetail.tsx`
- `src/hooks/usePersonalization.ts`
- `src/lib/solutionBreadcrumbs.ts`
- `src/pages/admin/Admin.tsx`
- `src/App.tsx`, `public/sitemap.xml`, `scripts/generate-sitemap.mjs`
- `src/components/__tests__/Navbar.solutions.test.tsx`

## Open Questions (optional)

1. Should the intent chips persist across sessions, or reset each visit?
2. For new landing pages — do you want pricing tables embedded or just CTA → Contact?
3. Should the AI generators write results back to the DB (e.g. saved campaigns) or just display copy-to-clipboard?
