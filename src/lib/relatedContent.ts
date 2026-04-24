/**
 * Lightweight cross-content recommender.
 * Maps blog categories / solution slugs to related items
 * so we can render contextual backlinks.
 */
import { solutions } from "@/data/solutions";
import { blogPosts } from "@/data/blog";
import type { RelatedLink } from "@/components/RelatedLinks";

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
function solutionToLink(s: { slug: string; title: string; description: string }): RelatedLink {
  return { to: `/solutions/${s.slug}`, title: s.title, description: s.description, meta: "Solution" };
}

/** For a blog post: top 6 related solutions matched by description keywords. */
export function relatedToBlog(slug: string): { solutions: RelatedLink[] } {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { solutions: [] };
  const tags = tagsFor(`${post.title} ${post.description} ${post.category}`);
  const sol = [...solutions]
    .map((s) => ({ s, n: score(tags, tagsFor(`${s.title} ${s.description} ${s.features.join(" ")}`)) }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 6)
    .map((x) => solutionToLink(x.s));
  return { solutions: sol };
}

/** For a solution: 6 related blog posts. */
export function relatedToSolution(slug: string): { blog: RelatedLink[] } {
  const sol = solutions.find((s) => s.slug === slug);
  if (!sol) return { blog: [] };
  const tags = tagsFor(`${sol.title} ${sol.description} ${sol.features.join(" ")}`);
  const blog = [...blogPosts]
    .map((p) => ({ p, n: score(tags, tagsFor(`${p.title} ${p.description} ${p.category}`)) }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 6)
    .map((x) => blogToLink(x.p));
  return { blog };
}
