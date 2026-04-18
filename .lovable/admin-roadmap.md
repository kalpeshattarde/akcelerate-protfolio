# Admin Features Roadmap (20 features)

20 features grouped into 5 phases. Each phase builds on the previous one. Pick any phase or any individual feature to ship next.

---

## Phase 1 — Quick wins, no external deps (1 session each)

These extend existing patterns (localStorage analytics, modular tabs, audit log) with no new infrastructure.

| # | Feature | Effort | Files touched |
|---|---|---|---|
| 2 | **Funnel builder** — pick 3–5 events, show drop-off bars | M | new `FunnelTab.tsx`, dropdown event picker, recharts FunnelChart |
| 4 | **Real-time live feed** — last 50 events, filter + pause | S | new `ActivityLiveTab.tsx`, polls `getAnalyticsEvents` every 2s |
| 15 | **Admin usage heatmap** — track tab views per admin | S | extend `analytics.ts` with `admin_tab_view`, new heatmap card |
| 20 | **Onboarding checklist expansion** — 7-day guided checklist | M | extend existing `OnboardingTour.tsx`, checklist state in localStorage |

**Recommended first build:** #2 (funnel) — directly extends what we just shipped on the A/B card.

---

## Phase 2 — Light refactors of existing tabs (1–2 sessions each)

Touch existing components but no new backend.

| # | Feature | Effort | Notes |
|---|---|---|---|
| 1 | **Multi-experiment registry** | L | refactor `AbTestCard` to take an `experiment` prop; store experiment list in localStorage; one card per running experiment |
| 5 | **Saved segments** | M | filter builder UI, store named filters, reuse in funnel/cohort views |
| 6 | **Bulk product editor** | M | multi-select in `ProductsTab`, sticky action bar, diff modal |
| 10 | **CSV importer with column mapping** | M | drag-drop zone, papaparse, mapping UI, dry-run validation |
| 14 | **Content calendar** | L | month grid, drag-drop, schedule field on blog/product entities |

---

## Phase 3 — Needs Cloud schema (migrations required)

Each requires 1–2 new tables with RLS. **Blocked until migration tool is available** (or user applies SQL manually).

| # | Feature | New tables | Why Cloud |
|---|---|---|---|
| 3 | **Cohort retention chart** | `user_sessions` | needs first-seen + return-visit timestamps across devices |
| 9 | **Discount code generator** | `discount_codes`, `code_redemptions` | shared across users, needs unique constraints + atomic decrement |
| 13 | **Affiliate leaderboard + payouts** | `affiliate_payouts` | extends existing `useAffiliate` hook; payouts must persist |
| 17 | **API token manager** | `api_tokens` (hashed) | tokens must be server-validated, never client-stored plaintext |
| 18 | **Database health card** | (read-only system catalog) | queries pg_stat_user_tables, pg_policies via edge function |

---

## Phase 4 — Needs external service integration

| # | Feature | Service | Effort |
|---|---|---|---|
| 7 | **Inventory & low-stock alerts** | uses existing `send-email` fn + new `inventory` table | M |
| 8 | **Refund & dispute panel** | Stripe (live keys + webhook for `charge.dispute.created`) | L |
| 12 | **Email campaign composer** | Resend or similar ESP + open/click tracking pixels | XL |
| 19 | **Scheduled reports** | cron edge function + `send-email`; new `report_schedules` table | M |

---

## Phase 5 — Trust & SEO

| # | Feature | Effort | Notes |
|---|---|---|---|
| 11 | **SEO health dashboard** | L | crawl routes from `App.tsx`, render checks per page, score 0–100 |
| 16 | **Two-person approval for destructive actions** | M | wraps delete/refund handlers in a confirmation modal that requires a second admin login + writes to audit log |

---

## Recommended sequencing

1. **Now:** Phase 1 (#2 funnel + #4 live feed + #15 usage heatmap) — 1 session, ships 3 features cleanly.
2. **Next:** Phase 2 #1 multi-experiment registry — completes the analytics story.
3. **Then:** Phase 2 #6 bulk product editor — high operational value.
4. **After Cloud unblocked:** Phase 3 #9 discount codes — directly drives revenue.
5. **Defer:** Phase 4 (Stripe disputes, email campaigns) until those services are explicitly needed — they're substantial integrations and can ship as standalone projects.
