import { describe, it, expect } from "vitest";
import { requiredPerArm } from "../SampleSizeCalc";

describe("requiredPerArm (80% power, α=0.05 two-sided)", () => {
  it("textbook: 10% baseline, 12% target → ~3,840 per arm", () => {
    const n = requiredPerArm(0.1, 0.12);
    expect(n).not.toBeNull();
    expect(n!).toBeGreaterThan(3700);
    expect(n!).toBeLessThan(4000);
  });

  it("textbook: 5% baseline, 6% target (small lift) → ~8,000 per arm", () => {
    const n = requiredPerArm(0.05, 0.06);
    expect(n).not.toBeNull();
    expect(n!).toBeGreaterThan(7500);
    expect(n!).toBeLessThan(9000);
  });

  it("large lift: 20% → 30% → ~300 per arm", () => {
    const n = requiredPerArm(0.2, 0.3);
    expect(n).not.toBeNull();
    expect(n!).toBeGreaterThan(280);
    expect(n!).toBeLessThan(360);
  });

  it("returns null when proportions are identical (no lift to size for)", () => {
    expect(requiredPerArm(0.15, 0.15)).toBeNull();
  });

  it("symmetric: required size is the same regardless of which arm is higher", () => {
    expect(requiredPerArm(0.1, 0.12)).toBe(requiredPerArm(0.12, 0.1));
  });
});
