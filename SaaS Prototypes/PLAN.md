# PLAN.md

## VelocityCore Product Roadmap

The goal is to turn the current operator prototype into a production-oriented customer operations SaaS without pretending unfinished systems already exist.

## Phase 1: Stabilize The Core
- Replace placeholder auth with real password hashing, session or JWT handling, and organization-aware access control.
- Add real organization onboarding: create org, join org, invite teammate, choose default billing rail.
- Wire the web app to backend APIs so dashboard, billing, automation, and social pages show real data.
- Persist subscription, social post, and automation lifecycle state rather than returning demo-only payloads.
- Remove or clearly quarantine legacy env keys that are not used by the active root app.

Exit criteria:
- A new organization can sign up, log in, seed initial data, and navigate a data-backed dashboard.
- Core CRUD and status transitions are persisted in Postgres.

## Phase 2: Complete The Product Surfaces
- Billing
  - Persist Stripe customer, subscription, and portal state.
  - Persist Razorpay customer or order state where relevant.
  - Add entitlement checks for plan-gated product access.
- Communications
  - Add email and messaging templates tied to real product events.
  - Record send attempts, provider responses, and delivery status.
- Social
  - Persist drafts, approval state, scheduled time, and publish outcomes.
  - Implement provider token storage and at least one real provider-specific publish path.
- Automation
  - Store automation definitions, versions, and run history.
  - Add manual trigger, event trigger, and failure visibility.

Exit criteria:
- Billing, communications, social, and automation all have persisted lifecycle state and operator-visible status.

## Phase 3: Monetization And Admin Layer
- Introduce Free, Pro, and Enterprise entitlements in backend policy checks.
- Support Stripe subscription checkout as the primary recurring path and Razorpay as the regional billing alternative.
- Build operator and admin views for:
  - organization settings
  - team membership
  - plan and payment status
  - workflow failure review
  - outbound communication history
- Add upgrade triggers in-product when limits are reached.

Exit criteria:
- Plans are enforced by backend rules, visible in UI, and connected to provider state.
- Operators can self-serve core billing and team management actions.

## Phase 4: Automation And AI Hardening
- Add an event model for business triggers such as signup, payment failure, content approval, and workflow error.
- Introduce a queue-backed execution path for automations instead of request-response dispatch only.
- Persist agent runs with input, status, output summary, and approval gates.
- Define practical agent roles:
  - planner for workflow proposals
  - analyst for ops summaries
  - reviewer for social or message approval assistance
  - integration for provider configuration checks
- Keep execution boundaries strict so agents cannot silently charge, message, or publish.

Exit criteria:
- Automation and agent work are observable, auditable, retryable, and approval-aware.

## Phase 5: Analytics And Retention Loops
- Replace hard-coded metrics with real usage and revenue events.
- Track funnel stages:
  - signup started
  - organization created
  - billing connected
  - first automation created
  - first live communication or social publish
- Add retention reporting:
  - weekly active organizations
  - live automations
  - publish volume
  - communication success rate
  - MRR and churn signals
- Add automated lifecycle touchpoints for onboarding, billing issues, and workflow failures.

Exit criteria:
- Product decisions and upgrade prompts can be driven by real behavior instead of placeholders.

## Phase 6: Production Readiness
- Add tests for auth, billing webhooks, workflow dispatch, and provider adapters.
- Add structured logging, request tracing, and failure alerting.
- Add job retries, idempotency keys, and provider rate-limit handling.
- Add environment validation across app start-up and deployment pipelines.
- Add CI for typecheck, build, tests, and schema drift checks.
- Document deployment for web, API, database, and worker processes.

Exit criteria:
- The app can be deployed with clear operational playbooks and monitored safely in production.

## Immediate Priorities
- Finish replacing template narratives in docs and prompts.
- Implement real auth and org onboarding.
- Persist automation and social post state.
- Turn billing from adapter-only to entitlement-backed product behavior.
- Add audit visibility before enabling more autonomous outbound actions.
