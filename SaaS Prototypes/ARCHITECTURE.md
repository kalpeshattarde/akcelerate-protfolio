# ARCHITECTURE.md

## System Overview

VelocityCore is the active root product in this repository. It is a multi-tenant customer operations platform for subscription businesses and agencies. The current architecture centers on one web app, one API, one Postgres database, and a set of provider adapters for billing, messaging, email, social publishing, and automation dispatch.

Archived sibling folders in the repo are not part of the active workspace graph. The live architecture described here refers to the root monorepo only.

## Active Workspace Boundary
- Implemented
  - `apps/api`
  - `apps/web`
  - `packages/sdk`
  - `packages/types`
  - `infra/docker`
  - `infra/n8n`
- Scaffolded
  - `specs/openapi.yaml` exists but only covers a subset of the API.
- Planned
  - Worker or queue process for long-running automation and agent execution

## Frontend
- Implemented
  - Next.js App Router application under `apps/web`
  - Static pages for `/`, `/login`, `/dashboard`, `/billing`, `/automation`, and `/social`
  - Product shape already oriented toward operators rather than a marketing site
- Scaffolded
  - No data fetching, auth state, loading states, or error states
  - No organization setup flow, role-aware navigation, or settings pages
  - No real billing, social, or automation UI interactions wired to the API
- Planned
  - Operator dashboard with live subscription, workflow, communication, and agent metrics
  - Onboarding wizard for org creation, billing rail selection, and channel connection
  - Admin views for memberships, approvals, workflow failures, and audit history

## Backend
- Implemented
  - Express application in `apps/api/src/app.ts`
  - Route modules for:
    - auth
    - billing
    - razorpay
    - email
    - messaging
    - social
    - workflows
    - automation builder
    - agents
    - analytics
  - Zod validation at route boundaries
  - Health endpoint at `/health`
- Scaffolded
  - No request auth middleware, rate limiting, audit middleware, or structured logging
  - Limited service layer depth outside billing and automation helpers
  - Long-running actions still happen directly inside request handlers or simple helpers
- Planned
  - Auth middleware, permission checks, idempotency handling, request tracing
  - Queue-backed execution for automation runs and agent tasks
  - Event model for onboarding, billing, communication, and publishing workflows

## Database
- Implemented
  - Prisma with PostgreSQL
  - Models:
    - `Organization`
    - `User`
    - `Membership`
    - `OauthAccount`
    - `Subscription`
    - `SocialPost`
    - `Automation`
  - Seed script that creates `demo-org` and `admin@demo.com`
- Scaffolded
  - API flows do not consistently persist or read these models yet
  - `Subscription`, `SocialPost`, and `Automation` are underused by the live routes
- Planned
  - `WorkflowRun`, `AgentRun`, `CommunicationLog`, `ChannelConnection`, `AuditEvent`, and entitlement-related models
  - Stronger uniqueness and status transition rules around provider state

## Authentication And Identity
- Implemented
  - Register endpoint that creates a `User`
  - Login endpoint that looks up a user by email
  - OAuth start URL generation for Google, GitHub, and LinkedIn
  - OAuth callback placeholder path
  - `OauthAccount` model in Prisma
- Scaffolded
  - Password hashing is a placeholder string
  - Login returns a development token without password verification
  - OAuth callbacks do not exchange tokens, validate state rigorously, or persist linked accounts
  - No organization bootstrap or invitation flow
- Planned
  - Real password hashing, session or JWT strategy, invitation flow, role checks, provider account persistence, and secure token storage

## Billing
- Implemented
  - Stripe checkout session creation
  - Stripe customer portal session creation
  - Stripe webhook signature verification with raw request body handling
  - Razorpay order creation
  - Razorpay webhook signature verification
  - `Subscription` model with Stripe and Razorpay identifiers
- Scaffolded
  - `/api/v1/billing/subscription` returns a static response
  - No persisted billing lifecycle updates from webhook events
  - No entitlements, invoicing view, dunning logic, or seat management
- Planned
  - Subscription state machine, feature gating, invoice visibility, usage-based upgrade prompts, and reconciliation dashboards

## Email And Messaging
- Implemented
  - Resend adapter for transactional email send
  - Twilio adapter for SMS
  - Twilio adapter for WhatsApp
  - Mock-mode fallback when credentials are missing
- Scaffolded
  - No template library, delivery logging, provider webhook ingestion, or suppression handling
  - No communication history or approval workflow
- Planned
  - Event-driven templates for onboarding, billing failure, workflow error, and operator notifications
  - Delivery status persistence and rate-limit controls

## Social Publishing
- Implemented
  - Social auth route placeholders for LinkedIn, Facebook, Instagram, and X
  - Draft or scheduled post creation response shape
  - Publish adapter boundary with mock or live-ready placeholder behavior
  - `SocialPost` model in Prisma
- Scaffolded
  - Auth routes return placeholder URLs
  - No provider token storage, no real publish API calls, no approvals, and no scheduling worker
  - Draft creation is not stored in Prisma
- Planned
  - Provider-specific publish flows, approval states, scheduling, retries, and publish logs

## Automation
- Implemented
  - Generic workflow trigger endpoint
  - Automation builder provider listing
  - Builder endpoint that returns an automation definition with generated secret
  - Trigger endpoint that dispatches to n8n and Zapier webhooks
  - `Automation` model in Prisma
  - Suggested starter use cases in `infra/n8n/README.md`
- Scaffolded
  - Builder output is not persisted
  - No versioning, no run history, no retries, no queue, and no status page
  - n8n and Zapier receive payloads, but VelocityCore does not yet own the full execution lifecycle
- Planned
  - Persisted workflow definitions, event subscriptions, run logs, approval checkpoints, and replay support

## AI And Agents
- Implemented
  - Agent intake endpoint that accepts:
    - `planner`
    - `executor`
    - `analyst`
    - `reviewer`
    - `integration`
  - Queued response shape for future asynchronous execution
- Scaffolded
  - No agent runtime, no model integration, no prompt store, and no run persistence
  - No safety policy enforcement beyond typed route input
- Planned
  - Persisted agent runs, explicit tool boundaries, approval-aware execution, and operator-visible outcomes

## Analytics And Admin
- Implemented
  - Analytics overview endpoint with placeholder metrics for MRR, active workflows, and queued agent runs
  - Dashboard page that names the intended operator surfaces
- Scaffolded
  - No metrics pipeline, no event collection, and no admin console
  - No operator audit views for billing, communication, automation, or publishing
- Planned
  - Revenue analytics, activation funnel, workflow performance, communication delivery, and agent effectiveness reporting
  - Admin controls for memberships, billing visibility, limits, and moderation or approval flows

## Shared Packages
- Implemented
  - `packages/sdk` exposes a health fetch helper
  - `packages/types` exposes a health response type
- Scaffolded
  - No broader shared API client, no generated types, and no domain SDK coverage
- Planned
  - Shared client methods for auth, billing, workflows, and analytics with typed request and response contracts

## Infrastructure And Deployment
- Implemented
  - Local Docker Compose for Postgres and Redis
  - Runtime env validation in `apps/api/src/config/env.ts`
  - `npm` workspace scripts for dev, build, Prisma generate, push, and seed
- Scaffolded
  - Redis is not used by the live runtime
  - No worker deployment target, no CI, no secrets management policy, and no production logging stack
- Planned
  - Multi-process deployment model for web, API, and worker
  - CI pipeline, secret management, queue usage, and provider webhook monitoring

## Security And Reliability
- Implemented
  - Input validation with Zod
  - Stripe and Razorpay webhook signature verification
  - Mock-safe provider behavior when credentials are absent
- Scaffolded
  - No rate limiting, no CSRF protection strategy, no secure session handling, no audit trail, and no outbound approval gating
- Planned
  - Role-aware authz, idempotency keys, audit events, retry policies, provider quota handling, and communication or publishing approvals
