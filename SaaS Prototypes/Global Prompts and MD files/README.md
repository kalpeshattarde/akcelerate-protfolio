# VelocityCore Monorepo v4

VelocityCore is a runnable starter monorepo for an AI-native SaaS platform with:
- Next.js frontend
- Express + TypeScript backend
- Prisma + PostgreSQL
- OAuth-ready auth flows
- Stripe and Razorpay billing support
- Resend email support
- Twilio SMS/WhatsApp support
- Social publishing adapters
- n8n and Zapier-style automation maker support
- agent and analytics endpoints

## New in v4
- real SDK-style adapter implementations
- Stripe checkout, portal, and webhook verification improvements
- Razorpay order creation and webhook signature verification
- Resend API request flow
- Twilio REST API request flow for SMS and WhatsApp
- n8n and Zapier webhook dispatch stubs with real HTTP shape
- refreshed env and package dependencies

## Notes
The integrations are written to be:
- live-ready when credentials exist
- safe mock mode when credentials are missing
- easy to replace with stricter production implementations
