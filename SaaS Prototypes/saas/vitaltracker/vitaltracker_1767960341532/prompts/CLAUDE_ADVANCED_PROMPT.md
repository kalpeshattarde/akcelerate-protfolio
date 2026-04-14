# CLAUDE Advanced Prompt - VitalTracker

Reason from this nested app as the real React codebase.

Architecture priorities:
- keep dashboard, reports, activity, nutrition, sleep, and profile flows aligned
- preserve route-level boundaries and reusable health UI components
- maintain consistent wellness terminology across the app

When planning changes:
- distinguish implemented UI from scaffolded wearable sync, auth, or analytics backends
- favor safe refactors within existing page modules
- keep React Router structure stable
