import { solutions } from "@/data/solutions";
import type { Crumb } from "@/components/Breadcrumbs";

/**
 * Single source of truth for breadcrumbs across /solutions/* pages.
 *
 * Always returns: Home → Solutions → [Title]
 * - Never falls back to the string "Services" (legacy navigation has been removed).
 * - Title is resolved from `src/data/solutions.ts` so navigation stays in sync with route metadata.
 */
export function buildSolutionBreadcrumbs(slug?: string): Crumb[] {
  const base: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions" },
  ];

  if (!slug) return base;

  const match = solutions.find((s) => s.slug === slug);
  // If the slug isn't recognised, still surface the slug rather than silently
  // falling back to a generic label — but never use "Services".
  const title = match?.title ?? slug.replace(/-/g, " ");

  return [...base, { name: title, path: `/solutions/${slug}` }];
}

/** Same data, formatted for the visible <Breadcrumbs /> component (which strips the leading Home). */
export function visibleSolutionBreadcrumbs(slug?: string): Crumb[] {
  const trail = buildSolutionBreadcrumbs(slug);
  // Visible component handles Home internally; pass everything after it.
  return trail.slice(1).map((c, i, arr) =>
    i === arr.length - 1 ? { name: c.name } : c,
  );
}
