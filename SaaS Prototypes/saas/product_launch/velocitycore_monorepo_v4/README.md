<!-- Generated from prototype.manifest.json by `npm run prototypes:generate`. Edit the manifest and rerun the generator. -->
# product_launch Archive - velocitycore_monorepo_v4

This directory is an archived generated copy inside the product_launch prototype. It is not the canonical working tree for this prototype. Use the top-level `product_launch/` directory as the primary source of truth unless you are intentionally reviving this archive.

## Archive Type
- Type: VelocityCore monorepo archive
- Intended product direction: product_launch
- Current reality: still the shared VelocityCore customer-operations scaffold

## What This Archive Contains
- `apps/api`
- `apps/web`
- `packages/sdk`
- `packages/types`
- copied docs and prompts from an earlier generation pass

## How To Use It
1. Prefer the top-level `product_launch/README.md` for current guidance.
2. Only work in this archive if you explicitly want to recover or compare an older generated copy.
3. If you make this archive active again, regenerate its docs and prompts intentionally instead of trusting stale markdown.

## Setup
1. Run `npm install`.
2. Start Postgres and Redis or provide equivalents.
3. Copy `.env.example` to `.env`.
4. Run `npm run db:generate`, `npm run db:push`, and `npm run db:seed`.
5. Run `npm run dev`.
