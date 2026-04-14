<!-- Generated from prototype.manifest.json by `npm run prototypes:generate`. Edit the manifest and rerun the generator. -->
# CLAUDE.md

Use this directory as the Sales Commision Calculator prototype root.

## Repo Truth
- The active code in this directory is still the shared VelocityCore customer-operations scaffold.
- Do not describe this as a finished Sales Commision Calculator unless the code actually implements that domain.
- Nested archive folders are not the primary source of truth for this prototype root.

## Architecture Rules
- Keep validation in routes, orchestration in services, and provider-specific code in adapters.
- Keep Prisma as the persistence source of truth.
- Keep organization as the tenancy boundary unless a new domain model requires a deliberate change.
- Preserve mock-safe provider behavior for local development.
- Do not hide scaffolded behavior behind strong product claims.

## Extension Strategy
1. State whether a capability is implemented, scaffolded, or planned.
2. If converting this into a true Sales Commision Calculator, replace the generic customer-operations assumptions before adding surface-level polish.
3. Persist lifecycle state before adding external side effects.
4. Keep billing, communication, social, workflow, and agent behaviors auditable.
5. Update docs and prompts when env requirements or product assumptions change.

## Quality Bar
- No fake domain claims.
- Clear separation of current scaffold versus intended Sales Commision Calculator direction.
- Honest treatment of auth, analytics, automation, and agent gaps.
