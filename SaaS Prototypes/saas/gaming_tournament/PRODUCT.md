<!-- Generated from prototype.manifest.json by `npm run prototypes:generate`. Edit the manifest and rerun the generator. -->
# PRODUCT.md

## Product Direction
- Prototype label: gaming_tournament
- Intended product: gaming_tournament
- Current code reality: shared VelocityCore customer-operations scaffold
- Value proposition: Provide a runnable starting point for teams exploring a gaming_tournament product direction while making the scaffold status explicit.

## Target Users
- Builders evaluating a gaming_tournament product direction
- Operators or founders who need a code-first starting point before domain-specific implementation

## Personas
- Founder or product lead validating a future gaming_tournament product line.
- Operator who wants billing, communication, workflow, and reporting seams before deep domain implementation.
- Engineer responsible for replacing the shared scaffold with the first real gaming_tournament workflow.

## Core Entities
- Automation (shared scaffold model)
- Membership (shared scaffold model)
- OauthAccount (shared scaffold model)
- Organization (shared scaffold model)
- SocialPost (shared scaffold model)
- Subscription (shared scaffold model)
- User (shared scaffold model)
- gaming_tournament domain entities are still missing and must replace or extend the shared models before this becomes a true product.

## Core Workflows
- Register or log in through the scaffold auth routes.
- Start Stripe checkout or Razorpay order creation through billing routes.
- Create draft or scheduled social posts and trigger mock publishing.
- Define and trigger automations through n8n or Zapier adapter seams.
- Replace the generic flows above with the first true gaming_tournament workflow.

## Monetization Direction
- Billing seams already exist for Stripe and Razorpay.
- Feature entitlements, plan enforcement, and hosted operations are still scaffolded.
- Treat the tiers below as the recommended monetization model for future completion, not as already-enforced billing logic.

### Free
- Audience: Builders evaluating the gaming_tournament prototype locally.
- Upgrade trigger: Needs real entitlements or hosted usage.
Features:
- Local demo org and seeded admin record.
- Mock-safe billing, email, messaging, social, and automation seams.
- Access to scaffold dashboards and API endpoints.

### Pro
- Audience: Small teams piloting a hosted gaming_tournament workflow.
- Upgrade trigger: Needs multi-user operations, controls, or audit trails.
Features:
- Live Stripe or Razorpay billing once provider keys are configured.
- Transactional email and messaging providers enabled.
- Org-scoped automation and analytics once persistence is completed.

### Enterprise
- Audience: Operators who need governance and reliability around the shared platform.
- Upgrade trigger: Custom procurement or compliance requirements.
Features:
- SSO, audit logs, advanced admin controls, and entitlement enforcement.
- Queue-backed execution for workflows, social publishing, and agents.
- Usage analytics, SLA reporting, and approval flows.

## Activation Path
1. Get the app running locally and seed the demo org.
2. Validate the first operator flow across web UI and API routes.
3. Replace one generic scaffold workflow with a real gaming_tournament workflow.
4. Turn on live providers only after persistence and auditability are in place.

## Operator Surfaces
- Dashboard page for billing, workflow, agent, and analytics placeholders.
- Billing page backed by Stripe and Razorpay adapter seams.
- Automation builder page and workflow trigger routes.
- Social page and publish routes for draft and scheduled post flows.

## Current Boundary
- Implemented web pages: `/`, `/automation`, `/billing`, `/dashboard`, `/login`, `/social`
- Implemented API routes: 23
- First milestone: Replace the generic customer-operations data model and UI with gaming_tournament-specific behavior.
