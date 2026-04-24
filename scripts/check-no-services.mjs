#!/usr/bin/env node
/**
 * Dev/build guard: fail if any /services links, breadcrumb labels, sitemap
 * entries, or schema.org Service / serviceType usage have crept back in.
 *
 * Wired into `prebuild` so `npm run build` will fail loudly.
 * Also runnable standalone: `node scripts/check-no-services.mjs`.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { resolve, join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(import.meta.url), "../..");

// Roots we scan. `dist` is included when present (post-build verification).
const SCAN_ROOTS = ["src", "public", "scripts", "index.html", "dist"]
  .map((p) => resolve(root, p))
  .filter((p) => existsSync(p));

const SCAN_EXT = new Set([".ts", ".tsx", ".js", ".mjs", ".jsx", ".html", ".xml", ".txt", ".json"]);

// Files exempt from the scan (this script defines the patterns it checks).
const EXEMPT_FILES = new Set([
  resolve(root, "scripts/check-no-services.mjs"),
  resolve(root, "src/components/__tests__/Navbar.solutions.test.tsx"),
]);

// Substrings that legitimately contain "services" but are not a /services route or
// Services nav label. Add new exemptions here with a justification comment.
const ALLOWED_SUBSTRINGS = [
  "/products/domus-home-services",                 // product slug, not a route segment
  "@/components/admin/UserManagementTab",          // unrelated identifier (false positive guard)
];

// Patterns we forbid. Each has a label for clearer error reporting.
const FORBIDDEN = [
  { label: "/services route link", regex: /["'`(\s]\/services(?:\/[a-z0-9-]+)?(?=["'`)\s?#])/g },
  { label: "Services breadcrumb label", regex: /name:\s*["']Services["']/g },
  { label: "Services nav label", regex: /label:\s*["']Services["']/g },
  { label: 'schema.org "@type": "Service"', regex: /"@type"\s*:\s*"Service"/g },
  { label: "schema.org serviceType field", regex: /["']serviceType["']\s*:/g },
];

// Files that are allowed to mention `/services` exclusively for redirect
// purposes (they map old URLs to /solutions). The matched lines must contain
// "Navigate" and "/solutions" to qualify.
function isLegacyRedirectLine(line) {
  return line.includes("Navigate") && line.includes("/solutions");
}

const failures = [];

function walk(p) {
  const st = statSync(p);
  if (st.isDirectory()) {
    for (const child of readdirSync(p)) {
      if (child === "node_modules" || child === ".git") continue;
      walk(join(p, child));
    }
    return;
  }
  if (EXEMPT_FILES.has(p)) return;
  if (!SCAN_EXT.has(extname(p))) return;

  const text = readFileSync(p, "utf8");
  const rel = p.slice(root.length + 1);

  for (const { label, regex } of FORBIDDEN) {
    regex.lastIndex = 0;
    let m;
    while ((m = regex.exec(text)) !== null) {
      const before = text.slice(0, m.index);
      const lineNo = before.split("\n").length;
      const lineStart = before.lastIndexOf("\n") + 1;
      const lineEnd = text.indexOf("\n", m.index);
      const line = text.slice(lineStart, lineEnd === -1 ? undefined : lineEnd).trim();

      if (ALLOWED_SUBSTRINGS.some((s) => line.includes(s))) continue;
      if (label === "/services route link" && isLegacyRedirectLine(line)) continue;

      failures.push({ file: rel, line: lineNo, label, snippet: line });
    }
  }
}

for (const r of SCAN_ROOTS) walk(r);

if (failures.length > 0) {
  console.error("\n✗ services-cleanup guard failed — found forbidden references:\n");
  for (const f of failures) {
    console.error(`  ${f.file}:${f.line}  [${f.label}]`);
    console.error(`    ${f.snippet}`);
  }
  console.error(`\n${failures.length} violation(s). Fix them or update ALLOWED_SUBSTRINGS in scripts/check-no-services.mjs.\n`);
  process.exit(1);
}

console.log(`✓ services-cleanup guard passed (scanned ${SCAN_ROOTS.length} root(s))`);
