# AGENT.md

## Agent Operating Rules For VelocityCore

VelocityCore is the active root monorepo. Treat archived sibling prototype folders as reference material only unless the task explicitly targets them.

## Mission
- Improve VelocityCore as a real customer operations product, not as a generic starter.
- Protect organization data, billing behavior, and outbound communication flows.
- Make implemented versus scaffolded behavior explicit in code, docs, and operator UX.

## Safe Autonomous Changes
- Documentation rewrites that reflect active root code
- UI improvements inside existing product surfaces
- Refactors that preserve route, service, and adapter boundaries
- Mock-safe integration hardening that does not trigger live provider side effects
- Analytics and observability work that only reads or records internal state

## Changes That Need Explicit Human Confirmation
- Any live billing mutation that could charge, cancel, refund, or alter a customer subscription
- Any change that sends real email, SMS, WhatsApp, or social posts outside a controlled sandbox
- Schema changes that delete or rewrite existing production data
- Auth changes that affect identity, session semantics, or organization access rules
- New external providers, secret rotation, or infrastructure changes with runtime impact
- Destructive cleanup of archived prototype folders

## High-Risk Areas
- Billing webhooks, entitlement logic, and subscription state
- Auth registration, login, OAuth callback handling, and organization membership
- Email and messaging flows that could contact real recipients
- Social publishing flows that could post to public accounts
- Automation and agent execution paths that could trigger chained side effects

## Billing Safety Rules
- Keep Stripe and Razorpay behavior idempotent and traceable.
- Verify webhook signatures before processing side effects.
- Persist external IDs, provider status, and transition timestamps.
- Never couple plan gating to a hard-coded frontend flag when billing state exists on the backend.
- Do not claim feature entitlements are enforced until code actually checks them.

## Communication Safety Rules
- Default to mock mode unless the task explicitly requires live provider calls and the credentials are present.
- Keep message templates versioned or at least traceable to the initiating event.
- Add delivery status and failure visibility before increasing automation.
- Respect opt-out, frequency, and approval requirements in any future campaign work.

## Social And Automation Safety Rules
- Separate draft creation, approval, scheduling, and publishing states.
- Do not let a request-response cycle become the long-term execution model for publishing or workflow fan-out.
- Persist workflow definitions and run records before adding retries or agent-driven automation.
- Treat n8n and Zapier as execution targets, not the primary product database.

## Agent Layer Rules
- The current product only queues agent intent with `planner`, `executor`, `analyst`, `reviewer`, and `integration` types.
- Real agent execution must add stored runs, explicit tool boundaries, approval gates, and audit visibility before touching external systems.
- Agents must not autonomously change billing, send outbound communication, or publish social content without product-level approval logic.

## Collaboration Rules
- Prefer the root monorepo over archived exports for implementation work.
- Update docs when you harden a scaffold into a real feature.
- If env requirements change, update both the docs and the example env file in the same change.
- If a feature is still partial, say so plainly instead of smoothing over the gap.
