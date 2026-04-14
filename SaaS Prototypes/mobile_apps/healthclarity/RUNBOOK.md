<!-- Generated from prototype.manifest.json by `npm run prototypes:generate`. Edit the manifest and rerun the generator. -->
# RUNBOOK.md

## Prerequisites
- Node.js and npm
- Docker Desktop or local Postgres and Redis equivalents
- A copied `.env` file based on `.env.example`

## Start Infrastructure
1. Run `docker compose -f infra/docker/docker-compose.yml up -d`.
2. Confirm Postgres is on `localhost:5432` and Redis is on `localhost:6379`.

## Install And Bootstrap
1. Run `npm install`.
2. Copy `.env.example` to `.env`.
3. Run `npm run db:generate`.
4. Run `npm run db:push`.
5. Run `npm run db:seed`.
6. Run `npm run dev`.

## Local Endpoints
- Web app: `http://localhost:3000`
- API: `http://localhost:4000`
- Health: `http://localhost:4000/health`

## Demo Seed
- Demo org: organization: Demo Org; slug: demo-org; notes: Created by `npm run db:seed`.
- Demo admin record: email: admin@demo.com; notes: The scaffold login flow returns a dev token for a known email and does not verify a real password yet.

## Smoke Tests
1. Health check: `GET /health`. Returns `{ ok: true }`.
2. Billing mock session: `POST /api/v1/billing/checkout-session`. Returns a mock checkout URL when Stripe keys are absent.
3. Analytics overview: `GET /api/v1/analytics/overview`. Returns demo metrics for MRR, workflow count, and queued agent runs.
4. Automation builder providers: `GET /api/v1/automation/providers`. Returns the available automation backends.
5. Page render sweep: Manual verification. Open /, /automation, /billing, /dashboard, /login, /social and confirm each page renders without crashing.

## Common Failure Modes
- Database connection errors: verify `DATABASE_URL` and that Postgres is running.
- Prisma drift or missing client: rerun `npm run db:generate` and `npm run db:push`.
- Port collisions: free ports `3000`, `4000`, `5432`, or `6379`.
- Provider actions stay mocked: confirm Stripe, Razorpay, Resend, Twilio, n8n, or Zapier keys are actually set.
- Login expectations mismatch: the scaffold auth flow is not production-safe and does not enforce a real password check yet.
