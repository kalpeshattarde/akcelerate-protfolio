<!-- Generated from prototype.manifest.json by `npm run prototypes:generate`. Edit the manifest and rerun the generator. -->
# PLAN.md

## Habit Tracker Prototype Roadmap

## Phase 1: Admit The Current State
- Keep docs aligned with the fact that this directory is still the shared VelocityCore customer-operations scaffold.
- Stop adding product claims that are not backed by code.
- Decide whether this directory should remain a scaffold or become a real Habit Tracker.

## Phase 2: Replace The Shared Scaffold
- Define the true Habit Tracker domain model.
- Replace generic customer-operations entities where needed.
- Build the first real domain workflow instead of generic dashboard placeholders.

## Phase 3: Complete Shared Platform Basics
- Harden auth and organization lifecycle.
- Persist workflow, communication, and billing state.
- Add admin visibility and analytics based on real records.

## Phase 4: Production Readiness
- Add tests, CI, logging, audit trails, and queue-backed execution.
- Add entitlement enforcement and operator-safe outbound actions.

## Immediate Priority
Replace the generic customer-operations data model and UI with Habit Tracker-specific behavior.
