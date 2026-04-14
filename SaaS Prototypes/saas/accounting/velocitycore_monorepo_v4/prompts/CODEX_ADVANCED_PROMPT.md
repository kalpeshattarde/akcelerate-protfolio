# CODEX Advanced Prompt

Use this runnable monorepo as the source of truth.

Updated docs:
- README.md
- CLAUDE.md
- AGENT.md
- MEMORY.md
- LOG.md
- PLAN.md
- ARCHITECTURE.md

Updated prompts target:
- Lovable
- Bolt
- Replit
- Claude
- Codex

Repo anchors:
- apps/api/*
- apps/web/*
- apps/api/prisma/schema.prisma
- specs/API_CONTRACTS.md
- specs/openapi.yaml
- .env.example

New required capabilities:
- Stripe and Razorpay payment implementations
- Resend and Twilio live-ready adapters
- n8n automation maker
- Zapier-style automation builder and webhook dispatch
- workflow provider registry and trigger routing

Requirements:
- preserve modular boundaries
- extend real code, not pseudo-code only
- keep Stripe, Razorpay, OAuth, email, messaging, social, workflows, automation maker, and agents wired through adapters and routes
- align generated code with the current monorepo structure
- prefer production-ready patterns over throwaway demos

Special emphasis:
Focus on repo-aware edits, modular code generation, typed interfaces, payment adapters, and automation builder internals.
