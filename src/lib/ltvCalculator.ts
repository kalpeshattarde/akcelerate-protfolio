export interface LTVInput {
  avgOrderValue: number;
  purchaseFrequency: number;
  customerLifespan: number;
}

export function calculateLTV(input: LTVInput): number {
  return input.avgOrderValue * input.purchaseFrequency * input.customerLifespan;
}

export function getLTVSegment(ltv: number): { label: string; color: string } {
  if (ltv >= 500) return { label: "High Value", color: "text-green-500" };
  if (ltv >= 200) return { label: "Medium Value", color: "text-yellow-500" };
  return { label: "Low Value", color: "text-red-500" };
}

export const DEMO_LTV: LTVInput = {
  avgOrderValue: 89,
  purchaseFrequency: 2.3,
  customerLifespan: 3,
};
