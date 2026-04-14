# API Contracts

## Auth
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- GET /api/v1/auth/oauth/:provider/start
- GET /api/v1/auth/oauth/:provider/callback

## Billing
- POST /api/v1/billing/checkout-session
- POST /api/v1/billing/portal-session
- GET /api/v1/billing/subscription
- POST /api/v1/billing/webhook

## Razorpay
- POST /api/v1/razorpay/order
- POST /api/v1/razorpay/webhook

## Email
- POST /api/v1/email/send

## Messaging
- POST /api/v1/messages/send

## Social
- GET /api/v1/social/oauth/:provider/start
- GET /api/v1/social/oauth/:provider/callback
- POST /api/v1/social/posts
- POST /api/v1/social/posts/:id/publish

## Workflows
- POST /api/v1/workflows/trigger

## Automation Builder
- GET /api/v1/automation/providers
- POST /api/v1/automation/builder
- POST /api/v1/automation/builder/trigger

## Agents
- POST /api/v1/agents/run

## Analytics
- GET /api/v1/analytics/overview
