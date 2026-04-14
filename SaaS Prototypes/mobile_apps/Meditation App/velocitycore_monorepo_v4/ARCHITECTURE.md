# ARCHITECTURE.md

## System design
- Frontend: Next.js app for auth, dashboard, billing, social, settings, and automation builder
- Backend: Express + TypeScript API with modular service boundaries
- Data: Prisma + PostgreSQL
- Billing: Stripe checkout, subscriptions, invoices, customer portal, and Razorpay order/payment scaffolding
- Email: Resend-first provider adapter layer
- Messaging: Twilio SMS and WhatsApp adapter layer
- Social: account connection and publishing adapter layer
- Automation: n8n-triggered workflows plus Zapier-style automation builder and integration registry
- AI: agent runtime and workflow assistance
- Analytics/ML: event capture, scoring, and future inference services

## Principles
- Keep integration code modular
- Keep sensitive actions auditable
- Use provider abstractions
- Separate UI, API, workflow, and ML concerns
