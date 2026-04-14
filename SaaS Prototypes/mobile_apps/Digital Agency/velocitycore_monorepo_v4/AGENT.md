# AGENT.md

## Agent behavior and rules
- Keep every action traceable.
- Require approval for destructive, financial, or brand-publishing actions.
- Respect communication consent and policy limits.
- Keep OAuth tokens and provider secrets isolated behind backend services.
- Prefer event-driven handoffs between app, workflows, agents, and ML services.
- Use provider adapters for Stripe, Razorpay, Resend, Twilio, and social APIs.
- Treat automation builders as configurable orchestrators with audit trails.

## Agent roles
- Planner Agent
- Executor Agent
- Analyst Agent
- Reviewer Agent
- Integration Agent
- Automation Agent
- ML Agent
