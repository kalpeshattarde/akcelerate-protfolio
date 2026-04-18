/**
 * Lightweight cross-content recommender.
 * Maps blog categories / service slugs / solution slugs to related items
 * across the three content types so we can render contextual backlinks.
 */
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";
import { blogPosts } from "@/data/blog";
import type { RelatedLink } from "@/components/RelatedLinks";

// Topic tags: simple keyword set used for matching.
function tagsFor(text: string): string[] {
  return text.toLowerCase().match(/[a-z]+/g) || [];
}

function score(a: string[], b: string[]): number {
  const set = new Set(a);
  return b.reduce((n, w) => (set.has(w) ? n + 1 : n), 0);
}

function blogToLink(p: { slug: string; title: string; description: string; category: string }): RelatedLink {
  return { to: `/blog/${p.slug}`, title: p.title, description: p.description, meta: p.category };
}
function serviceToLink(s: { slug: string; title: string; description: string }): RelatedLink {
  return { to: `/services/${s.slug}`, title: s.title, description: s.description, meta: "Service" };
}
function solutionToLink(s: { slug: string; title: string; description: string }): RelatedLink {
  return { to: `/solutions/${s.slug}`, title: s.title, description: s.description, meta: "Solution" };
}

/** For a blog post: top 3 services + 3 solutions matched by description keywords. */
export function relatedToBlog(slug: string): { services: RelatedLink[]; solutions: RelatedLink[] } {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { services: [], solutions: [] };
  const tags = tagsFor(`${post.title} ${post.description} ${post.category}`);
  const svc = [...services]
    .map((s) => ({ s, n: score(tags, tagsFor(`${s.title} ${s.description} ${s.features.join(" ")}`)) }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 3)
    .map((x) => serviceToLink(x.s));
  const sol = [...solutions]
    .map((s) => ({ s, n: score(tags, tagsFor(`${s.title} ${s.description} ${s.features.join(" ")}`)) }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 3)
    .map((x) => solutionToLink(x.s));
  return { services: svc, solutions: sol };
}

/** For a service: 3 related solutions + 3 blog posts. */
export function relatedToService(slug: string): { solutions: RelatedLink[]; blog: RelatedLink[] } {
  const svc = services.find((s) => s.slug === slug);
  if (!svc) return { solutions: [], blog: [] };
  const tags = tagsFor(`${svc.title} ${svc.description} ${svc.features.join(" ")}`);
  const sol = [...solutions]
    .map((s) => ({ s, n: score(tags, tagsFor(`${s.title} ${s.description} ${s.features.join(" ")}`)) }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 3)
    .map((x) => solutionToLink(x.s));
  const blog = [...blogPosts]
    .map((p) => ({ p, n: score(tags, tagsFor(`${p.title} ${p.description} ${p.category}`)) }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 3)
    .map((x) => blogToLink(x.p));
  return { solutions: sol, blog };
}

/** For a solution: 3 related services + 3 blog posts. */
export function relatedToSolution(slug: string): { services: RelatedLink[]; blog: RelatedLink[] } {
  const sol = solutions.find((s) => s.slug === slug);
  if (!sol) return { services: [], blog: [] };
  const tags = tagsFor(`${sol.title} ${sol.description} ${sol.features.join(" ")}`);
  const svc = [...services]
    .map((s) => ({ s, n: score(tags, tagsFor(`${s.title} ${s.description} ${s.features.join(" ")}`)) }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 3)
    .map((x) => serviceToLink(x.s));
  const blog = [...blogPosts]
    .map((p) => ({ p, n: score(tags, tagsFor(`${p.title} ${p.description} ${p.category}`)) }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 3)
    .map((x) => blogToLink(x.p));
  return { services: svc, blog };
}
