<!-- Generated from prototype.manifest.json by `npm run prototypes:generate`. Edit the manifest and rerun the generator. -->
# ARCHITECTURE.md

## Overview

The top-level Pregnancy Tracker prototype root currently uses the same VelocityCore scaffold as the other prototype roots. The architecture is multi-tenant and integration-ready, but it is not yet specialized for the Pregnancy Tracker domain.

## Implemented
- Express API modules for auth, billing, email, messaging, social, automation, analytics, and agent intake.
- Prisma models for organizations, memberships, users, subscriptions, social posts, and automations.
- Stripe and Razorpay billing adapters with webhook verification seams.
- Resend and Twilio adapters with live-or-mock behavior.
- n8n and Zapier dispatch hooks.
- Minimal Next.js pages for login, dashboard, billing, automation, and social.

## Scaffolded
- Real auth security, organization onboarding, role enforcement, and session handling.
- Persisted workflow runs, communication logs, social approvals, and agent execution.
- Data-backed dashboard views and admin workflows.
- Any domain-specific Pregnancy Tracker model or workflow.

## Planned
- Replace the shared VelocityCore assumptions with a true Pregnancy Tracker domain model and workflow set.
- Introduce domain-specific entities, analytics, monetization, and operator tooling.
- Add production readiness work such as tests, CI, logging, and queue-backed execution.

## Working Rule
Assume the folder name is an intended direction, not a finished product description.
