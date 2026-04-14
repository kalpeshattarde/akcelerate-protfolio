# AKcelerate — Agent Memory Log
> This file is a persistent memory log for coding agents working on this project.
> It records all sessions, prompts received, decisions made, and changes applied.
> Always read this file first before starting any new task.

---

## Project Identity

| Field | Value |
|---|---|
| **Project** | AKcelerate — Premium AI, Data, Automation & Business Consulting |
| **Founder** | Kalpesh Attarde |
| **Phone** | +91 8208555380 |
| **Email** | akceleratehq@gmail.com |
| **WhatsApp** | https://wa.me/918208555380 |
| **Location** | Mumbai, India |
| **GitHub** | https://github.com/kalpeshattarde/AKcelerate.git |
| **Push command** | `git push "https://kalpeshattarde:${GITHUB_PERSONAL_ACCESS_TOKEN}@github.com/kalpeshattarde/akcelerate.git" main` |

---

## Brand Positioning (Current — Post Repositioning)

- **Tagline**: "Build Smarter Business with AI & Automation"
- **Old positioning**: Narrow "AI Manufacturing Analytics" for Indian factories
- **New positioning**: Broad premium consulting across AI, Data, Automation & Business

### 8 Solution Areas
1. Business Automation
2. AI/ML Solutions
3. Business Consulting
4. Website & SaaS Development
5. Automated Analytics
6. Data Visualization
7. Cloud & DevOps
8. MLOps

### 13+ Industries Served
Manufacturing, Healthcare, Startups, MSME, Retail & Ecommerce, FinTech, Education, Logistics, Brands & Marketing, AdTech, Telecom, Automotive, Entertainment

### New Pages Added (Session 6)
- `public/industries.html` — 13 industry cards with 3 AI use cases each, stats bar, how-we-approach section, CTA
- `public/insights.html` — Thought leadership hub with featured article, topic filter, 6 article cards, newsletter CTA
- `public/robots.txt` — SEO robots file
- `public/sitemap.xml` — Full XML sitemap with all 28+ URLs
- Server routes added: `/industries`, `/insights`
- Nav updated on ALL 30+ pages to include Industries and Insights links

---

## Design System

| Token | Value |
|---|---|
| Body background | `#FFFFFF` |
| Alt sections | `#F0F7FF` |
| Primary | `#2563EB` (Blue) |
| Accent | `#06B6D4` (Cyan) |
| Headings | `#0F172A` |
| Body text | `#64748B` (slate-500) |
| Card borders | `#E2E8F0` |
| Footer gradient | `#1E3A8A → #0F172A → #164E63` |
| Dark theme toggle | `[data-theme="dark"]` on `<html>`, stored in `localStorage` as `ak-theme` |
| Nav font size | `14px` (0.875rem) — **do not change** |

---

## Tech Stack

- **Runtime**: Node.js 20 + Express 4
- **Security**: Helmet + express-rate-limit
- **Frontend**: HTML5, Tailwind CSS CDN, Vanilla JavaScript
- **Libraries**: Chart.js, AOS (Animate on Scroll), Lucide Icons
- **Fonts**: Google Fonts — Poppins (headings) + Inter (body)
- **Port**: 5000, Host: 0.0.0.0
- **Workflow command**: `npm start`

---

## File Map (Current State)

| File | Status | Notes |
|---|---|---|
| `public/index.html` | ✅ Complete | Homepage — hero, features, team photos (Kalpesh/Rakesh/Kaushal) |
| `public/solutions.html` | ✅ Complete | 8 solution areas with anchor IDs + "Learn more →" links to individual pages |
| `public/about.html` | ✅ Complete | Hero, team with real photos, FAQ |
| `public/services.html` | ✅ Complete | Services overview |
| `public/founder.html` | ✅ Complete | Kalpesh Attarde — hero with real photo, story, competencies |
| `public/contact.html` | ✅ Complete | Contact form, phone, email, WhatsApp |
| `public/pricing.html` | ✅ Complete | 3-tier pricing, monthly/annual toggle |
| `public/css/styles.css` | ✅ Complete | Light + dark themes, nav-dropdown, glass-card, components |
| `public/js/main.js` | ✅ Complete | Theme toggle, counters, AOS, FAQ, mobile menu |
| `server/server.js` | ✅ Complete | Routes for all pages incl. 8 new solution pages |
| `public/solutions/business-automation.html` | ✅ NEW | Full solution page — hero (Unsplash img), stats, 6 services, process, industries |
| `public/solutions/ai-ml.html` | ✅ NEW | Full solution page |
| `public/solutions/business-consulting.html` | ✅ NEW | Full solution page |
| `public/solutions/saas-dev.html` | ✅ NEW | Full solution page |
| `public/solutions/automated-analytics.html` | ✅ NEW | Full solution page |
| `public/solutions/data-visualization.html` | ✅ NEW | Full solution page |
| `public/solutions/cloud-devops.html` | ✅ NEW | Full solution page |
| `public/solutions/mlops.html` | ✅ NEW | Full solution page |
| `public/images/kalpesh-attarde.jpeg` | ✅ Real photo | Used on index, about, founder pages |
| `public/images/rakesh-chaudhari.jpeg` | ✅ Real photo | Used on index, about pages |
| `public/images/kaushal-bharambe.png` | ✅ Real photo | Used on index, about pages |
| `public/services/predictive-maintenance.html` | ⚠️ Legacy | Old manufacturing content, still accessible via direct URL |
| `public/services/supply-chain-analytics.html` | ⚠️ Legacy | Old manufacturing content |
| `public/services/quality-analytics.html` | ⚠️ Legacy | Old manufacturing content |
| `public/services/energy-management.html` | ⚠️ Legacy | Old manufacturing content |
| `public/case-studies.html` | ⚠️ Not updated | May still have manufacturing-specific copy |
| `public/blog.html` | ⚠️ Not updated | May have old references |

---

## Team Members

| Name | Role | LinkedIn | Photo |
|---|---|---|---|
| Kalpesh Attarde | Founder & CEO | — | `public/images/kalpesh-attarde.jpeg` |
| Rakesh Chaudhari | Senior DevOps/MLOps | linkedin.com/in/crak/ | `public/images/rakesh-chaudhari.jpeg` |
| Kaushal Bharambe | Senior AI/ML Engineer | linkedin.com/in/kaushal-bharambe/ | `public/images/kaushal-bharambe.png` |
| Priya Singh | Data Scientist | — | Placeholder (DS initials) |
| Arjun Malhotra | Cloud Architect | — | Placeholder (AM initials) |

---

## Nav Dropdown State (Current)

The Solutions nav dropdown on **all pages** now links to individual solution pages:

```
solutions/business-automation.html     (top-level pages)
../solutions/business-automation.html  (pages inside subdirectories)
```

Full list: business-automation, ai-ml, business-consulting, saas-dev, automated-analytics, data-visualization, cloud-devops, mlops

---

## Session Log

### Session 1 — Brand Repositioning
- **Task**: Reposition from "AI Manufacturing Analytics" to broad consulting platform
- **Changes**: Updated index.html, about.html, services.html, solutions.html, founder.html
- **Result**: All manufacturing references removed; 8 solution areas + 13 industries added everywhere
- **GitHub Push**: Completed — multiple commits to `main`

### Session 2 — Real Team Photos
- **Task**: Add real photos for Kalpesh Attarde, Rakesh Chaudhari, Kaushal Bharambe
- **Changes**:
  - `public/images/kalpesh-attarde.jpeg` added
  - `public/images/rakesh-chaudhari.jpeg` added
  - `public/images/kaushal-bharambe.png` added
  - Photos applied to index.html (team section), about.html (bio cards), founder.html (hero)
  - Team card data updated: Rakesh Chaudhari (Senior DevOps/MLOps), Kaushal Bharambe (Senior AI/ML Engineer)
- **GitHub Push**: Completed — commit `c89b9f2`

### Session 3 — Solutions Nav Dropdown Update
- **Task**: Replace old manufacturing sub-page links in Solutions nav dropdown with 8 solution areas
- **Changes**:
  - Solutions dropdown updated across 16 HTML files
  - Old items: Predictive Maintenance, Supply Chain Intelligence, Quality Analytics, Energy Management
  - New items: All 8 solution areas
  - Anchor IDs (`id="business-automation"` etc.) added to all 8 cards in solutions.html
- **GitHub Push**: Completed — commit `77602c0`

### Session 4 — Individual Solution Pages Created (March 2026)
- **Task**: Create separate dedicated webpages for all 8 solution areas with images and information
- **Changes**:
  - Created `public/solutions/` directory with 8 full HTML pages
  - Each page includes: hero (Unsplash image), stats bar, 6 service cards, 4-step process, industries section, dark CTA, 3 related solutions, full footer
  - Updated nav dropdown on all 16+ pages to link to individual solution pages
  - Added "Learn more →" links to each card in solutions.html
  - Added 8 clean URL routes to `server/server.js`
  - Updated `replit.md` and `AGENT_MEMORY.md`
- **GitHub Push**: Completed — commit `5ba4f20`
- **Unsplash images used**:
  - Business Automation: `photo-1518186285589-2f7649de83e0`
  - AI/ML: `photo-1677442135703-1787eea5ce01`
  - Business Consulting: `photo-1542744173-8e7e53415bb0`
  - SaaS Dev: `photo-1618477388954-7852f32655ec`
  - Automated Analytics: `photo-1551288049-bebda4e38f71`
  - Data Visualization: `photo-1460925895917-afdab827c52f`
  - Cloud & DevOps: `photo-1451187580459-43490279c0fa`
  - MLOps: `photo-1555949963-aa79dcee981c`

### Session 5 — MD Files Updated & GitHub Pushed (March 2026)
- **Task**: Commit all changes to GitHub and update MD files
- **Changes**: Updated `replit.md` and `AGENT_MEMORY.md` with full current state
- **GitHub Push**: Completed (this session)

---

## Rules for Future Agents

1. **Always read this file first** before making any changes.
2. **Never revert brand positioning** back to manufacturing analytics.
3. **Contact info to use everywhere**: Phone `+91 8208555380`, Email `akceleratehq@gmail.com`, WhatsApp `wa.me/918208555380`.
4. **Nav font size is 14px (0.875rem)** — do not change it.
5. **No dead links** — every `href` must point to a real page or anchor.
6. **Manufacturing is ONE of 13 industries** — not the sole focus of any page.
7. **Push to GitHub** after every completed session using the push command above.
8. **Update this file + replit.md** at the end of every session.
9. **Do not create placeholder/mock data** — all content must be real or realistic.
10. **Tailwind CSS is loaded via CDN** — do not attempt to install it as a package.
11. **Solution pages live in `public/solutions/`** — nav links from top-level pages use `solutions/xxx.html`, from subdirectory pages use `../solutions/xxx.html`.
12. **Server routes**: All 8 solution pages have clean URL routes in `server/server.js`.
13. **No HTML entities in `<script>` blocks** — use JS Unicode escapes (e.g. `\u20B9` for ₹) instead of `&#8377;` etc.
14. **404 handler** — use the three-tier strategy in `server/server.js`: file extension → plain 404; extensionless + Accept:html → SPA fallback; other → plain 404.

---

### Session 7 — JavaScript SyntaxError Fix (2026-03-16)
- **Task**: Fix `SyntaxError: Invalid or unexpected token` crashing the browser console
- **Root cause 1**: `server/server.js` 404 handler returned `index.html` (HTML content) for ALL unmatched routes including missing `.js`/`.css` files — browser tried to parse HTML as JS and crashed.
- **Root cause 2**: `public/pricing.html` inline `<script>` block had HTML entities (`&#8377;`) inside JS string literals — invalid per HTML5 raw-text rules.
- **Changes**:
  - `server/server.js`: Replaced blanket `sendFile(index.html)` 404 handler with a three-tier strategy:
    1. Paths with a file extension → `404 text/plain "Not found"` (blocks HTML being served as JS/CSS)
    2. Extensionless `GET`/`HEAD` with `Accept: text/html` → `404 + index.html` (SPA fallback)
    3. All other requests → `404 text/plain "Not found"`
  - `public/pricing.html`: Replaced `&#8377;` with `\u20B9` (JS Unicode escape) in the `prices` object of the inline script
- **Rules added**:
  - Never use HTML entities inside `<script>` blocks — use JS Unicode escapes (`\u20B9`) instead
  - 404 handler must check `Accept` header and file extension to avoid serving HTML as static assets
- **GitHub Push**: Completed (this session)

---

## Known Remaining Work

| Task | Priority | Notes |
|---|---|---|
| Update `case-studies.html` | Medium | May still have manufacturing-only case studies |
| Update `careers.html` | Low | Job descriptions may reference manufacturing |
| Update blog articles | Low | Titles/copy may reference old positioning |
| Update legacy service sub-pages | Low | predictive-maintenance.html etc. — old manufacturing content |
| Update `privacy.html` + `terms.html` | Low | Contact info may be outdated |
| SEO meta tags audit | Low | All pages need updated meta descriptions |
| Add case study content for new solution areas | Future | Current case studies are manufacturing-focused |

---

## Session Log — 2026-03-16 (Spacing Fix Session)

### Changes Made
1. **server.js** — Added `redirect: false` to `express.static` to prevent `/solutions` URL from being hijacked by the `solutions/` directory (was causing CSS 404 and completely broken page layout on /solutions route)
2. **styles.css** — Added `GLOBAL SPACING NORMALIZATION` block at end of file:
   - `.page-hero` class (5.5rem top, 2.5rem bottom padding for inner page heroes)
   - Mobile hero-section override: reduced from 7rem to 5.5rem top
   - Mobile responsive reductions for `.py-12`, `.py-16`, `.gap-*`, `.space-y-*`, `.mb-*`, `.mt-*`
   - Tablet responsive normalization
   - Short-viewport fix for hero sections
3. **All HTML files (batch sed)**:
   - `py-20 lg:py-28` → `py-14 lg:py-20` (then further → `py-12 lg:py-16`)
   - `padding:8rem 0 4rem` → `padding:5.5rem 0 2.5rem` (contact hero)
   - `padding-top:7rem;padding-bottom:4rem` → `padding-top:5.5rem;padding-bottom:2rem` (about, solutions, services, case-studies heroes)
   - `padding:7rem 0 3.5rem` → `padding:5.5rem 0 2rem` (careers, blog heroes)
   - `padding:7rem 0 3rem` → `padding:5.5rem 0 2rem` (pricing hero)
   - `min-height:55vh;padding:7rem 0 4rem` → `min-height:50vh;padding:5.5rem 0 2.5rem` (insights hero)
   - `min-height:60vh;padding:7rem 0 4rem` → `min-height:50vh;padding:5.5rem 0 2.5rem` (industries hero)
   - `padding:5rem 0` → `padding:4rem 0` in industries.html and insights.html

### Key Fixes
- `/solutions` page now renders with full CSS (no more redirect loop to `/solutions/`)
- Contact page: large gap between hero and form eliminated
- About page: hero flows directly into "WHAT WE DO" section
- All inner page heroes: consistent compact padding (5.5rem top, 2-2.5rem bottom)
- Mobile: all oversized gaps and padding reduced by ~30-40%

---

## Session Log — 2026-03-16 (Dark Mode Card Fix)

### Problem
Inline `onmouseover` / `onmouseout` JS handlers on card elements were directly setting `element.style.background` to hard-coded white/light values (e.g. `#FFFFFF`, `#F8FAFF`). Because inline styles have highest CSS specificity, these JS handlers overrode all CSS dark mode rules whenever a user hovered over a card in dark mode, causing a jarring "flash to white" effect.

### CSS Classes Added (`public/css/styles.css`)
| Class | Description |
|---|---|
| `.ak-card` | White card, 20px radius, 2rem padding — solutions.html & services.html |
| `.ak-feature-card` | Tinted (#F8FAFF) card, 16px radius, 1.75rem — feature sections on solution pages |
| `.ak-link-card` | White anchor card, 16px radius, 1.5rem, display:block — navigation links on solution pages |
| `.ak-sm-card` | White card, 16px radius, 1.5rem, with base shadow — homepage solutions grid |

Each class has full dark mode variants under `[data-theme="dark"]`.

Also added dark mode helpers for Tailwind text-slate-500/400, border-slate-100/200 and anchor `a[style*="background:#FFFFFF"]` overrides.

### Files Changed
- `public/css/styles.css` — 4 new CSS classes + helpers
- `public/solutions.html` — 8 `.ak-card` cards
- `public/services.html` — 4 `.ak-card` cards
- `public/solutions/business-automation.html` — 6 `.ak-feature-card` + 3 `.ak-link-card`
- `public/solutions/ai-ml.html` — 6 `.ak-feature-card` + 3 `.ak-link-card`
- `public/solutions/business-consulting.html` — 6 `.ak-feature-card` + 3 `.ak-link-card`
- `public/solutions/saas-dev.html` — 6 `.ak-feature-card` + 3 `.ak-link-card`
- `public/solutions/analytics.html` — 6 `.ak-feature-card` + 3 `.ak-link-card`
- `public/solutions/data-viz.html` — 6 `.ak-feature-card` + 3 `.ak-link-card`
- `public/solutions/cloud-devops.html` — 6 `.ak-feature-card` + 3 `.ak-link-card`
- `public/solutions/mlops.html` — 6 `.ak-feature-card` + 3 `.ak-link-card`
- `public/index.html` — 8 `.ak-sm-card` (homepage solutions overview grid)

## Session Log — 2026-03-17 (Contact Details Normalized)

- Updated the canonical contact details across the workspace.
- Canonical values:
  - Phone: `+91 8208555380`
  - Email: `akceleratehq@gmail.com`
  - WhatsApp: `https://wa.me/918208555380`
- `AGENT_MEMORY.md` should be treated as the source of truth for these contact values in future edits.

### Total Handlers Replaced
**92 inline onmouseover/onmouseout handlers removed** across 11 files.

### GitHub Push
Completed this session.
