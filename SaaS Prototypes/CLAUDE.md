# CLAUDE.md

Use this repository as the VelocityCore product monorepo, not as a generic prototype warehouse.

## Repo Truth
- Active code lives in `apps/api`, `apps/web`, `packages/sdk`, and `packages/types`.
- Root `package.json` only declares `apps/*` and `packages/*` as workspaces.
- Sibling folders such as `accounting/`, `crmpro/`, and `marketing_analytics/` are archived exports and not part of the live app unless a task explicitly targets them.
- Product claims must be backed by active root code, not copied docs, prompt templates, or archive folders.

## Product Boundary
- VelocityCore is an organization-scoped customer operations platform.
- The current live surfaces are billing, communications, social publishing, workflow dispatch, analytics summary, and agent run intake.
- The current data model supports organizations, memberships, users, OAuth accounts, subscriptions, social posts, and automations.
- Anything beyond those surfaces should be treated as planned work unless new code implements it.

## Architecture Constraints
- Keep HTTP validation in routes, orchestration in services, and provider calls in adapters.
- Keep Prisma as the source of truth for persisted state.
- Treat organization as the tenancy boundary. New persistent domain objects should be org-scoped unless there is a strong reason not to.
- Preserve live or mock behavior behind env checks so local development can run safely without provider credentials.
- Stripe webhook routes must continue to receive raw request bodies before JSON parsing.
- Do not add provider-specific logic directly to generic route handlers when an adapter boundary already exists.

## Safe Extension Patterns
1. Start by clarifying whether a capability is implemented, scaffolded, or planned.
2. If a feature changes state, persist that state before adding external side effects.
3. If a feature calls an external provider, store external identifiers, statuses, timestamps, and failure context.
4. If a feature can retry or re-run, make it idempotent and auditable.
5. If a feature affects billing, communications, or publishing, add operator-visible status before automating execution.

## Repo-Specific Implementation Rules
- Replace placeholder security when touching auth. A development token or password-length hash is not acceptable in completed auth work.
- When adding billing behavior, connect external subscription or order IDs back to the `Subscription` model and define entitlement behavior.
- When adding social publishing, store channel credentials and approval state instead of sending directly from request handlers.
- When adding automation or agent execution, create persisted run records and approval states before enabling autonomous side effects.
- When adding analytics, base metrics on stored events and records rather than hard-coded response values.
- When adding UI, prefer operator workflows over marketing pages. The app should help an organization connect systems, review status, and act on events.
- If a change adds or removes env requirements, update `.env.example`, `README.md`, `MEMORY.md`, and `ARCHITECTURE.md` in the same change.

## Integration Guardrails
- Stripe and Razorpay work must be safe in both sandbox and live modes.
- Resend and Twilio work must not send real outbound traffic during development unless explicitly intended and clearly documented.
- OAuth work must validate state, exchange tokens securely, and persist provider metadata.
- n8n and Zapier dispatch must carry traceable event payloads and should not become the only source of truth for workflow state.
- Social publishing should remain provider-isolated so LinkedIn, Facebook, Instagram, and X can diverge safely.

## Quality Bar
- Use Zod validation at the API boundary.
- Keep types explicit and close to the integration or domain boundary.
- Return status-rich responses for long-running or external work.
- Add loading, empty, and error states for every new operator-facing page.
- Document implemented versus scaffolded behavior honestly.
- Prefer incremental hardening of the current product over adding broad new surfaces.
