# LOG.md

## 2026-04-12 Repo Audit

### What The Live Product Actually Is
- The active application is the root `VelocityCore` monorepo.
- Root workspaces only include `apps/*` and `packages/*`.
- The many domain folders in the repo are archived or generated exports, not the live product surface.
- The current product is best described as an organization-scoped customer operations workspace with billing, communications, social publishing, automation dispatch, and agent intake seams.

### What Exists In Active Code
- `apps/api` exposes routes for auth, billing, Razorpay, email, messaging, social, workflows, automation builder, agents, and analytics.
- `apps/web` contains static pages for login, dashboard, billing, automation, and social publishing.
- Prisma models exist for organizations, users, memberships, OAuth accounts, subscriptions, social posts, and automations.
- Stripe, Razorpay, Resend, Twilio, n8n, and Zapier are all present behind adapter or service boundaries.
- Docker Compose provisions Postgres and Redis for local development.

### What Is Still Scaffolded
- Auth security is placeholder-only: password hashes are fake and login ignores password verification.
- OAuth start URLs exist, but token exchange and account persistence are incomplete.
- The UI is static and not wired to the backend.
- Social posts and automation definitions are not persisted through the live API.
- Analytics returns hard-coded summary values.
- Agent runs are accepted but never executed or stored.
- There is no audit log, no role enforcement, no job queue, and no entitlement system.

### Product Upgrade Introduced In This Rewrite
- Repositioned the repo around `VelocityCore` instead of a copied "prototype collection" narrative.
- Defined the real target user as an operations-focused subscription business or agency team.
- Added a concrete commercial model with Free, Pro, and Enterprise direction tied to actual billing seams.
- Added onboarding, activation, retention, admin, automation, analytics, and AI operating guidance grounded in existing modules.
- Documented production hardening needs instead of implying they already exist.

### Template Assumptions Removed
- Removed the claim that the root repo is a curated live portfolio of 40+ active prototypes.
- Removed references to Flutter, Vite, Redux, and other stacks that are not part of the active root monorepo.
- Removed generic statements that all integrations and auth flows are implemented across many products.
- Removed vague "production-ready" language that was not backed by active code.
- Removed the assumption that every sibling folder is part of the same runnable workspace.

### Operational Risks Still Open
- Provider adapters can switch to live mode if credentials are present, but there is no operator approval layer.
- Webhook verification exists, but webhook event persistence and reconciliation do not.
- Redis is provisioned but unused, so there is no queue-backed execution or rate limiting layer.
- The SDK and shared types packages are still minimal.
- There is no automated test suite, lint pipeline, or deployment pipeline in the active root app.
