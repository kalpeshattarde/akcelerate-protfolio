<!-- Generated from prototype.manifest.json by `npm run prototypes:generate`. Edit the manifest and rerun the generator. -->
# BOLT Advanced Prompt - baby_growth

Work in this prototype root only.

## Code Truth
- The top-level baby_growth directory still contains the shared VelocityCore customer-operations scaffold.
- The first job is to respect the real code, not the folder label.

## Implementation Priority
1. Decide whether to keep the generic scaffold or convert it into a real baby_growth.
2. If converting, add the missing baby_growth data model and workflows first.
3. Then harden auth, billing, communications, automation, analytics, and admin behavior.

## Guardrails
- No fake domain claims without code.
- No live side effects without clear operator intent.
- Keep provider logic in adapters and persisted state in Prisma.
