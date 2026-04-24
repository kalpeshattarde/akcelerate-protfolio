import { describe, it, expect } from "vitest";

// Import JSON-LD by re-importing the page modules and reading their schema constants.
// We re-extract them by parsing the source files since they aren't exported.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const PAGES = ["src/pages/AIAgents.tsx", "src/pages/Automations.tsx", "src/pages/BuildMVP.tsx"];

function extractJsonLdBlocks(source: string): string[] {
  // crude but reliable: find each `"@type": "..."` occurrence
  const matches = source.match(/"@type"\s*:\s*"[^"]+"/g) ?? [];
  return matches.map((m) => m.replace(/.*"([^"]+)"\s*$/, "$1"));
}

describe("Landing page JSON-LD schema", () => {
  for (const file of PAGES) {
    describe(file, () => {
      const src = readFileSync(resolve(process.cwd(), file), "utf8");
      const types = extractJsonLdBlocks(src);

      it("includes a WebPage type", () => {
        expect(types).toContain("WebPage");
      });

      it("includes a FAQPage type", () => {
        expect(types).toContain("FAQPage");
      });

      it("does not declare Service or serviceType", () => {
        expect(types).not.toContain("Service");
        expect(src).not.toMatch(/"serviceType"\s*:/);
      });
    });
  }
});
