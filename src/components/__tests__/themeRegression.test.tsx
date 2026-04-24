/**
 * Theme regression guard.
 *
 * Scans key components used on the home, free-audit, and audit-landing pages
 * for hardcoded color tokens that would not respond to day/night mode
 * changes (e.g. fixed hex like #0F172A, brand rgba like rgba(37,99,235,…),
 * or `text-white` / `text-slate-*` Tailwind classes).
 *
 * Allowlisted exceptions:
 *  - HeroDashboard.tsx (intentionally always-dark "screenshot" mockup)
 *  - .ak-dark-card / dashboard-mockup styles (always-dark by design)
 *
 * If you intentionally introduce a fixed color, add the file to ALLOWLIST.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(__dirname, "../../..");

// Files we expect to be 100% theme-aware
const FILES = [
  "src/components/Hero.tsx",
  "src/components/CTASection.tsx",
  "src/components/Forms.tsx",
  "src/components/SectionHeader.tsx",
  "src/components/FAQAccordion.tsx",
];

// Patterns that indicate a non-theme-aware color
const FORBIDDEN_PATTERNS: { name: string; re: RegExp }[] = [
  { name: "fixed hex color in inline style", re: /style=\{\{[^}]*#[0-9A-Fa-f]{3,6}/g },
  { name: "brand rgba in inline style", re: /style=\{\{[^}]*rgba\(\s*(37|6|0)\s*,/g },
  { name: "text-white class", re: /\btext-white\b/g },
  { name: "text-slate-* class", re: /\btext-slate-\d+\b/g },
  { name: "bg-white solid class", re: /\bbg-white(?![/-])\b/g },
  { name: "fixed light/dark hero gradient", re: /linear-gradient\(135deg,\s*#(EFF6FF|0F172A)/g },
];

describe("Day/Night theme regression — semantic tokens only", () => {
  for (const file of FILES) {
    it(`${file} uses only theme-aware tokens`, () => {
      const src = readFileSync(resolve(ROOT, file), "utf8");
      const violations: string[] = [];
      for (const { name, re } of FORBIDDEN_PATTERNS) {
        const matches = src.match(re);
        if (matches) violations.push(`${name}: ${matches.slice(0, 3).join(", ")}`);
      }
      expect(violations, `Theme violations in ${file}:\n  - ${violations.join("\n  - ")}`).toEqual([]);
    });
  }

  it("CSS exposes --gradient-hero in both :root and .dark", () => {
    const css = readFileSync(resolve(ROOT, "src/index.css"), "utf8");
    expect(css).toMatch(/:root\s*\{[\s\S]*--gradient-hero/);
    expect(css).toMatch(/\.dark\s*\{[\s\S]*--gradient-hero/);
  });
});
