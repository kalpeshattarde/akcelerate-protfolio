<!-- Generated from prototype.manifest.json by `npm run prototypes:generate`. Edit the manifest and rerun the generator. -->
# Pregnancy Tracker Prototype

Pregnancy Tracker is the intended product direction for this prototype root. The active code in this directory is currently the shared VelocityCore customer-operations scaffold. It is not yet a true Pregnancy Tracker implementation.

## Intended Use
- Intended product: Pregnancy Tracker
- Target users:
  - Builders evaluating a Pregnancy Tracker product direction
  - Operators or founders who need a code-first starting point before domain-specific implementation
- Current maturity: scaffold
- Value proposition: Provide a runnable starting point for teams exploring a Pregnancy Tracker product direction while making the scaffold status explicit.

## Code Truth
- Canonical code paths:
  - `apps/api`
  - `apps/web`
  - `packages/sdk`
  - `packages/types`
- Archive paths:
  - `kiddie_1767966331653`
  - `velocitycore_monorepo_v4`
- Active behavior still matches the shared VelocityCore customer-operations scaffold used across the top-level prototype roots.

## What Exists Here
### Implemented
- Express API modules for auth, billing, email, messaging, social, automation, analytics, and agent intake.
- Prisma models for organizations, memberships, users, subscriptions, social posts, and automations.
- Stripe and Razorpay billing adapters with webhook verification seams.
- Resend and Twilio adapters with live-or-mock behavior.
- n8n and Zapier dispatch hooks.
- Minimal Next.js pages for login, dashboard, billing, automation, and social.

### Scaffolded
- Real auth security, organization onboarding, role enforcement, and session handling.
- Persisted workflow runs, communication logs, social approvals, and agent execution.
- Data-backed dashboard views and admin workflows.
- Any domain-specific Pregnancy Tracker model or workflow.

### Planned
- Replace the shared VelocityCore assumptions with a true Pregnancy Tracker domain model and workflow set.
- Introduce domain-specific entities, analytics, monetization, and operator tooling.
- Add production readiness work such as tests, CI, logging, and queue-backed execution.

## First Milestone
Replace the generic customer-operations data model and UI with Pregnancy Tracker-specific behavior.

## Companion Docs
- `PRODUCT.md` for positioning, personas, workflows, and pricing direction.
- `ENV.md` for runtime configuration and provider keys.
- `RUNBOOK.md` for setup, demo data, smoke tests, and troubleshooting.
- `CHECKLIST.md` for demo, handoff, and production hardening gates.

## Detected Surfaces
- Web pages: `/`, `/automation`, `/billing`, `/dashboard`, `/login`, `/social`
- API routes: 23

## Local Setup
1. Install dependencies with `npm install`.
2. Start Postgres and Redis from `infra/docker/docker-compose.yml`, or provide equivalent services.
3. Copy `.env.example` to `.env`.
4. Run `npm run db:generate`, `npm run db:push`, and `npm run db:seed`.
5. Run `npm run dev`.

## Working Boundary
Prefer changes inside:
- `apps/api`
- `apps/web`
- `packages/sdk`
- `packages/types`
- `infra/docker`
- `specs/openapi.yaml`

Treat copied docs and archived nested folders as low-trust context.
