<!-- Generated from prototype.manifest.json by `npm run prototypes:generate`. Edit the manifest and rerun the generator. -->
# ENV.md

## Runtime Source Of Truth
- Primary runtime parser: `apps/api/src/config/env.ts`
- Example env file: `.env.example`
- Working rule: keys listed only in `.env.example` are future-facing or scaffold-only until the runtime consumes them.

## Required Now
### Core
- `DATABASE_URL`

## Defaulted By Runtime
### Core
- `APP_URL` default: "http://localhost:3000"
- `API_URL` default: "http://localhost:4000"

### Stripe
- `STRIPE_PORTAL_RETURN_URL` default: "http://localhost:3000/billing"

### Email
- `EMAIL_PROVIDER` default: "resend"
- `EMAIL_FROM` default: "noreply@example.com"

### Automation
- `N8N_WEBHOOK_PATH` default: "/webhook/velocitycore"

## Optional Provider Keys
### Stripe
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID_PRO`

### Razorpay
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`

### OAuth
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `LINKEDIN_CLIENT_ID`
- `LINKEDIN_CLIENT_SECRET`

### Email
- `RESEND_API_KEY`

### Messaging
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_MESSAGING_SERVICE_SID`
- `TWILIO_WHATSAPP_FROM`

### Social
- `SOCIAL_PUBLISHER_ACCESS_TOKEN`

### Automation
- `N8N_BASE_URL`
- `N8N_API_KEY`
- `ZAPIER_WEBHOOK_URL`
- `ZAPIER_SIGNING_SECRET`

## Example-Only Keys
- `ENCRYPTION_KEY`
- `FACEBOOK_REDIRECT_URI`
- `JWT_SECRET`
- `LINKEDIN_REDIRECT_URI`
- `MICROSOFT_CLIENT_ID`
- `MICROSOFT_CLIENT_SECRET`
- `NODE_ENV`
- `OPENAI_API_KEY`
- `REDIS_URL`
- `SENDGRID_API_KEY`
- `SESSION_SECRET`
- `STRIPE_PUBLISHABLE_KEY`
- `X_CLIENT_ID`
- `X_CLIENT_SECRET`

## Undocumented Runtime Keys
- None

## Minimal Local Env
```dotenv
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/velocitycore?schema=public
APP_URL=http://localhost:3000
API_URL=http://localhost:4000
EMAIL_PROVIDER=resend
EMAIL_FROM=noreply@example.com
N8N_WEBHOOK_PATH=/webhook/velocitycore
STRIPE_PORTAL_RETURN_URL=http://localhost:3000/billing
```

## Integration Safety
- Missing Stripe keys keep checkout and portal flows in mock mode.
- Missing Razorpay keys keep order creation in mock mode.
- Missing Resend or Twilio keys prevent live outbound sends.
- Missing automation keys keep n8n and Zapier flows as scaffold-only seams.
