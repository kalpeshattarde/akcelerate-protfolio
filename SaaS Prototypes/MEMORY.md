# MEMORY.md

## Stable Context For VelocityCore

### Product Identity
- Product name: `VelocityCore`
- Product category: AI-assisted customer operations platform
- Core user: a subscription business or agency operator managing billing events, communication channels, social publishing, and automation rules for an organization
- Current product promise: one workspace for billing-aware lifecycle operations, not a generic prototype collection

### Active Code Boundary
- Source of truth lives in the root workspaces:
  - `apps/api`
  - `apps/web`
  - `packages/sdk`
  - `packages/types`
- Sibling folders such as `accounting/`, `job_board/`, and `video_conferencing/` are archived or generated variants outside the root workspace graph.
- Root docs and prompts should describe the active monorepo first. Archived folders are secondary context only.

### Current Implemented Surfaces
- Organization, membership, user, subscription, social post, and automation Prisma models
- Auth endpoints for register, login, and OAuth URL start or callback scaffolding
- Stripe checkout, portal, and webhook verification
- Razorpay order creation and webhook verification
- Resend email send adapter
- Twilio SMS and WhatsApp send adapters
- Social draft creation and publish adapter boundary
- n8n and Zapier automation dispatch
- Analytics overview endpoint with placeholder metrics
- Agent run intake endpoint with queued status
- Minimal web pages for login, dashboard, billing, automation, and social

### Known Scaffolds
- Password hashing and session security are placeholder-only.
- OAuth callbacks do not exchange tokens or persist linked accounts.
- Social publishing does not store provider tokens or perform provider-specific API calls.
- Automation builder responses are ephemeral and not stored in Prisma.
- Analytics numbers are hard-coded and not derived from events.
- Agents do not execute. They only accept a typed run request and return a queued response.
- Web pages are static shells and do not fetch real backend data.

### Terminology
- Organization: the tenant boundary
- Membership: a user-to-organization link with a role string
- Subscription: provider billing state for an organization
- Social post: a draft, scheduled, or published outbound social item
- Automation: an organization-defined rule with a trigger key and execution config
- Agent run: a planned future record of work requested from a platform agent role

### Integration Reality
- Stripe is the primary subscription rail in code today.
- Razorpay exists for order flows and India-oriented payment support.
- Resend is the email provider wired in code.
- Twilio handles SMS and WhatsApp sends.
- n8n and Zapier are outbound automation targets.
- Google, GitHub, and LinkedIn are the only auth providers with start URL generation in active code.
- LinkedIn, Facebook, Instagram, and X are named as social publish targets, but provider-specific publishing is not implemented.

### Environment And Infra Constraints
- PostgreSQL is required by Prisma.
- Docker Compose provisions Postgres and Redis locally.
- Redis is not wired into runtime behavior yet.
- `.env.example` contains some legacy keys that are not consumed by the active root code, including Microsoft auth, SendGrid, and OpenAI entries.
- `apps/api/src/config/env.ts` is the runtime source of truth for validated env vars.

### Persistent Product Constraints
- Billing, outbound communication, social publishing, and workflow execution must remain auditable.
- New persistent business data should usually be organization-scoped.
- Provider-specific code belongs in adapters, not route handlers.
- Mock-safe development behavior is valuable and should remain available.
- Do not represent scaffolded behavior as production-ready.
