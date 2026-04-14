<!-- Generated from prototype.manifest.json by `npm run prototypes:generate`. Edit the manifest and rerun the generator. -->
# CHECKLIST.md

## Before Handing Off This Prototype
- [ ] `README.md`, `PRODUCT.md`, `ENV.md`, `RUNBOOK.md`, and `ARCHITECTURE.md` all describe the same current reality.
- [ ] Implemented versus scaffolded behavior is explicit.
- [ ] The first milestone is still accurate: Replace the generic customer-operations data model and UI with Grocery Delivery-specific behavior.

## Before Demoing
- [ ] `npm install`, `npm run db:generate`, `npm run db:push`, `npm run db:seed`, and `npm run dev` all work.
- [ ] `GET /health` succeeds.
- [ ] Core pages render: /, /automation, /billing, /dashboard, /login, /social.
- [ ] Mock billing, analytics, and automation routes behave as expected without live provider keys.
- [ ] Seeded demo records are present and documented in `RUNBOOK.md`.

## Before Claiming Product Readiness
- [ ] A real Grocery Delivery data model exists beyond shared scaffold entities.
- [ ] At least one true Grocery Delivery workflow is implemented end to end.
- [ ] Billing entitlements are enforced rather than implied.
- [ ] Auth, org roles, and outbound actions are auditable and safe.
- [ ] Analytics reflect stored data rather than demo values.

## Before Production Use
- [ ] Add automated tests and CI.
- [ ] Add audit logs, retry handling, and queue-backed background execution.
- [ ] Review webhook verification, secret management, and provider sandbox versus live modes.
- [ ] Add monitoring, error reporting, and rate limiting.
- [ ] Remove any remaining fake or placeholder product claims from docs and UI.
