// Generates public/sitemap.xml from data/* sources.
// Run via: `node scripts/generate-sitemap.mjs` (also wired into build via package.json prebuild script).
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const SITE_URL = "https://akcelerate.lovable.app";

// Lightweight slug extraction via regex over data files (avoids TS compilation).
function slugsFromFile(relPath, pattern) {
  const text = readFileSync(resolve(root, relPath), "utf8");
  const out = [];
  let m;
  while ((m = pattern.exec(text)) !== null) out.push(m[1]);
  return Array.from(new Set(out));
}

const slugRe = /slug:\s*["']([a-z0-9-]+)["']/g;
const services = slugsFromFile("src/data/services.ts", new RegExp(slugRe.source, "g"));
const solutions = slugsFromFile("src/data/solutions.ts", new RegExp(slugRe.source, "g"));
const blog = slugsFromFile("src/data/blog.ts", new RegExp(slugRe.source, "g"));
const products = slugsFromFile("src/data/products.ts", new RegExp(slugRe.source, "g"));

// Industries derived from industry names (mirrors src/data/industries.ts slugify)
const industriesText = readFileSync(resolve(root, "src/data/industries.ts"), "utf8");
const nameRe = /name:\s*["']([^"']+)["']/g;
const industries = [];
let nm;
while ((nm = nameRe.exec(industriesText)) !== null && industries.length < 20) {
  const name = nm[1];
  // Stop after the _raw block — names in caseStudies/projects share the same key
  if (name.includes(" Transformation") || name.includes(" Engine") || name.includes(" Analytics") || name.includes(" Platform") || name.includes(" Dashboard")) break;
  industries.push(name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
}

const staticRoutes = [
  "/", "/about", "/services", "/solutions", "/case-studies", "/completed-projects",
  "/industries", "/insights", "/blog", "/pricing", "/contact", "/founder",
  "/free-audit", "/resources", "/gallery", "/careers", "/privacy", "/terms",
  "/products", "/guide",
];

const urls = [
  ...staticRoutes.map(r => ({ loc: r, priority: r === "/" ? 1.0 : 0.7 })),
  ...services.map(s => ({ loc: `/services/${s}`, priority: 0.8 })),
  ...solutions.map(s => ({ loc: `/solutions/${s}`, priority: 0.8 })),
  ...industries.map(s => ({ loc: `/industries/${s}`, priority: 0.7 })),
  ...blog.map(s => ({ loc: `/blog/${s}`, priority: 0.6 })),
  ...products.map(s => ({ loc: `/products/${s}`, priority: 0.6 })),
];

const today = new Date().toISOString().split("T")[0];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`).join("\n")}
</urlset>
`;

writeFileSync(resolve(root, "public/sitemap.xml"), xml);
console.log(`✓ Generated sitemap with ${urls.length} URLs`);
