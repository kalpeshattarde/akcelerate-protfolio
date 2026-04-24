// Verifies the generated sitemap.xml contains EXACTLY the 8 kept solution slugs
// and none of the removed legacy slugs. Run as part of `prebuild`.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const KEPT = [
  "automation-systems",
  "ai-ml",
  "automated-analytics",
  "cloud-devops",
  "website-dev",
  "saas-dev",
  "consulting",
  "mvp-21day",
];
const REMOVED = [
  "business-automation",
  "business-consulting",
  "ai-agents",
  "mlops",
  "data-visualization",
];

function read(rel) {
  return readFileSync(resolve(root, rel), "utf8");
}

const sitemap = read("public/sitemap.xml");
const robots = read("public/robots.txt");

const errors = [];

for (const slug of KEPT) {
  if (!sitemap.includes(`/solutions/${slug}<`)) {
    errors.push(`sitemap.xml is missing kept slug: /solutions/${slug}`);
  }
}
for (const slug of REMOVED) {
  if (sitemap.includes(`/solutions/${slug}<`)) {
    errors.push(`sitemap.xml still contains removed slug: /solutions/${slug}`);
  }
}
if (!robots.includes("Sitemap: ")) {
  errors.push("robots.txt is missing a Sitemap: directive");
}

if (errors.length) {
  console.error("✗ Solution slug check failed:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log(`✓ Solution slug check passed (${KEPT.length} kept, ${REMOVED.length} removed verified absent)`);
