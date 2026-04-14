<!-- Generated from prototype.manifest.json by `npm run prototypes:generate`. Edit the manifest and rerun the generator. -->
# MEMORY.md

## Stable Context For Procure Order Management

### Directory Identity
- Prototype label: Procure Order Management
- Intended product: Procure Order Management
- Current code reality: shared VelocityCore customer-operations scaffold
- Current gap: there is no domain-specific implementation in this top-level prototype root yet

### Active Code Boundary
- `apps/api`
- `apps/web`
- `packages/sdk`
- `packages/types`

### Implemented Surfaces
- Express API modules for auth, billing, email, messaging, social, automation, analytics, and agent intake.
- Prisma models for organizations, memberships, users, subscriptions, social posts, and automations.
- Stripe and Razorpay billing adapters with webhook verification seams.
- Resend and Twilio adapters with live-or-mock behavior.
- n8n and Zapier dispatch hooks.
- Minimal Next.js pages for login, dashboard, billing, automation, and social.

### Missing Domain Work
- A true Procure Order Management data model
- Domain-specific workflows and UI
- Real admin and analytics behavior
- Production-safe auth and execution model

### Constraint
Do not describe this directory as a finished Procure Order Management until the code actually stops being the shared VelocityCore scaffold.
