<!-- Generated from prototype.manifest.json by `npm run prototypes:generate`. Edit the manifest and rerun the generator. -->
# AGENT.md

## Agent Rules For The guided_breathing Prototype

This prototype root still contains the shared VelocityCore customer-operations scaffold. Treat the directory name as the intended domain label, not as proof that a real guided_breathing exists in code.

## Safe Changes
- Documentation and prompt rewrites grounded in the active code.
- Refactors that preserve route, service, adapter, and Prisma boundaries.
- Mock-safe integration hardening.
- UI improvements that do not imply missing backend behavior already exists.

## High-Risk Areas
- Billing mutations and webhook handling.
- Outbound email, SMS, WhatsApp, and social actions.
- Auth and organization access rules.
- Any attempt to present this scaffold as a finished guided_breathing.

## Required Behavior
- Keep implemented versus scaffolded behavior explicit.
- If asked to make this a real guided_breathing, add the domain model first.
- Do not rely on archived nested copies as the default source of truth.
- Do not silently enable live provider side effects.
