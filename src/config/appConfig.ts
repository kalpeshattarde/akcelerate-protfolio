export const CONFIG = {
  pricing: {
    single: { usd: 19, inr: 1499 },
    bundle: { usd: 12, inr: 999 }, // per-product rate when buying 5+
    bundleThreshold: 5,
    enterprise: { usd: 249, inr: 21000 },
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
