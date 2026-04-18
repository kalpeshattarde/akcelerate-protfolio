import { describe, it, expect } from "vitest";
import { twoProportionZTest } from "../AbTestCard";

describe("twoProportionZTest", () => {
  it("returns near-zero z and p≈1 for identical proportions", () => {
    const { z, pValue } = twoProportionZTest(50, 500, 50, 500);
    expect(Math.abs(z)).toBeLessThan(1e-9);
    expect(pValue).toBeGreaterThan(0.99);
  });

  it("detects a clear winner: 90/600 vs 120/550 → significant", () => {
    // p1 = 0.15, p2 ≈ 0.2182 → lift +6.8 pts
    const { z, pValue } = twoProportionZTest(90, 600, 120, 550);
    expect(z).toBeGreaterThan(2.5);
    expect(z).toBeLessThan(3.5);
    expect(pValue).toBeLessThan(0.01);
  });

  it("returns negative z when control wins", () => {
    const { z, pValue } = twoProportionZTest(120, 600, 60, 600);
    expect(z).toBeLessThan(0);
    expect(pValue).toBeLessThan(0.001);
  });

  it("flat near-equal proportions yield non-significant p-value", () => {
    // 90/600 (15%) vs 80/600 (~13.3%) → ~-1.7 pts, should NOT be significant
    const { pValue } = twoProportionZTest(90, 600, 80, 600);
    expect(pValue).toBeGreaterThan(0.05);
  });

  it("handles zero denominators without throwing or returning NaN", () => {
    const { z, pValue } = twoProportionZTest(0, 0, 0, 0);
    expect(Number.isFinite(z)).toBe(true);
    expect(Number.isFinite(pValue)).toBe(true);
  });
});
