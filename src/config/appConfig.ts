export const CONFIG = {
  pricing: {
    single: { usd: 29, inr: 2499 },
    bundle: { usd: 119, inr: 9999 },
    enterprise: { usd: 499, inr: 41999 },
  },
  discounts: {
    codes: {
      INDIA50: { percent: 50, appliesTo: "inr" as const },
      LAUNCH20: { percent: 20, appliesTo: "all" as const },
      BUNDLE30: { percent: 30, appliesTo: "all" as const },
    },
  },
  affiliate: {
    commissionPercent: 20,
    cookieDays: 30,
  },
  growth: {
    roasScaleThreshold: 2.0,
    roasPauseThreshold: 0.8,
    budgetIncrementPercent: 20,
  },
  features: {
    enableAIRecommendations: true,
    enablePersonalization: true,
    enableGeoDetection: true,
    enableUpsells: true,
  },
};

export type Currency = "usd" | "inr";
export type DiscountCode = keyof typeof CONFIG.discounts.codes;
