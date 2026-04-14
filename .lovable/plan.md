

# Move Industries, Insights & Case Studies into About Dropdown

## What Changes
Remove the standalone "Industries", "Case Studies", and "Insights" nav links from the desktop navbar and nest them inside a new "About" dropdown menu — matching the same dropdown pattern already used by Solutions and Services.

## Plan

### 1. Convert "About" link to a dropdown (Navbar.tsx)
- Replace the plain `<Link to="/about">About</Link>` with a dropdown group (same pattern as Solutions/Services)
- The dropdown will contain:
  - **About AKcelerate** — links to `/about` (with a `Users` or `Building2` icon)
  - **Industries** — links to `/industries` (with `Factory` icon)
  - **Case Studies** — links to `/case-studies` (with `FileText` or `Award` icon)
  - **Insights** — links to `/insights` (with `Lightbulb` or `BookOpen` icon)
- Remove the three standalone `<Link>` elements for Industries, Case Studies, and Insights from the desktop nav
- Update the active-state check on the "About" trigger to highlight when on any of these four paths

### 2. Update mobile menu (Navbar.tsx)
- Group Industries, Case Studies, and Insights under an "About" section header in the mobile menu, or keep them as flat links (they're already listed there) — no structural change needed for mobile since it's already a flat list

### File changed
- `src/components/Navbar.tsx` — restructure desktop nav, add About dropdown with 4 sub-links, remove 3 standalone links

