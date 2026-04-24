import { solutions } from "@/data/solutions";
import type { Crumb } from "@/components/Breadcrumbs";

/** Required-path breadcrumb shape consumed by <SEOHead breadcrumbs={...} />. */
export interface BreadcrumbEntry {
  name: string;
  path: string;
}

/**
 * Single source of truth for breadcrumbs across /solutions/* pages.
 *
 * Always returns: Home → Solutions → [Title]
 * - Never falls back to the string "Services" (legacy navigation removed).
 * - Title resolved from `src/data/solutions.ts` so navigation matches route metadata.
 */
export function buildSolutionBreadcrumbs(slug?: string): BreadcrumbEntry[] {
  const base: BreadcrumbEntry[] = [
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions" },
  ];
  if (!slug) return base;

  const match = solutions.find((s) => s.slug === slug);
  // Surface slug-derived label rather than ever falling back to "Services".
  const title = match?.title ?? slug.replace(/-/g, " ");
  return [...base, { name: title, path: `/solutions/${slug}` }];
}

/** Same data, formatted for the visible <Breadcrumbs /> component (which strips the leading Home). */
export function visibleSolutionBreadcrumbs(slug?: string): Crumb[] {
  const trail = buildSolutionBreadcrumbs(slug);
  return trail.slice(1).map((c, i, arr) =>
    i === arr.length - 1 ? { name: c.name } : c,
  );
}
