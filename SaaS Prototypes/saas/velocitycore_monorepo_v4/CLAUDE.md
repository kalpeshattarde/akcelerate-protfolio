# CLAUDE.md

Build VelocityCore as a production-oriented AI-native SaaS platform.

## Priorities
1. Stabilize frontend and backend foundations
2. Wire auth, OAuth, sessions, RBAC, and tenant boundaries
3. Add Stripe and Razorpay billing flows
4. Add Resend/Twilio/social provider adapters
5. Add workflow automation through n8n and Zapier-style builders
6. Add agent runtime and analytics/ML hooks
7. Harden reliability, security, and observability

## Working rules
- Keep provider-specific code in adapters.
- Prefer server-side token handling and encrypted storage.
- Keep all financial and brand-sensitive actions auditable.
- Use the included Prisma schema and API contracts as implementation anchors.
- Treat automation builders as orchestration layers, not replacements for core business logic.
- Favor SDK-backed or API-realistic implementations over placeholder mocks.
