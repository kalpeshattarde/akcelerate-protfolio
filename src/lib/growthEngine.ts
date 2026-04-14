import { CONFIG } from "@/config/appConfig";

export interface CampaignMetrics {
  name: string;
  spend: number;
  revenue: number;
  clicks: number;
  conversions: number;
}

export interface GrowthDecision {
  action: "scale" | "maintain" | "pause" | "optimize";
  reason: string;
  budgetChange: number;
}

export function evaluateCampaign(metrics: CampaignMetrics): GrowthDecision {
  const roas = metrics.spend > 0 ? metrics.revenue / metrics.spend : 0;
  const convRate = metrics.clicks > 0 ? metrics.conversions / metrics.clicks : 0;

  if (roas >= CONFIG.growth.roasScaleThreshold) {
    return {
      action: "scale",
      reason: `ROAS ${roas.toFixed(1)}x exceeds ${CONFIG.growth.roasScaleThreshold}x threshold. Scaling budget.`,
      budgetChange: CONFIG.growth.budgetIncrementPercent,
    };
  }

  if (roas < CONFIG.growth.roasPauseThreshold) {
    return {
      action: "pause",
      reason: `ROAS ${roas.toFixed(1)}x below ${CONFIG.growth.roasPauseThreshold}x minimum. Pausing campaign.`,
      budgetChange: -100,
    };
  }

  if (convRate < 0.02) {
    return {
      action: "optimize",
      reason: `Conversion rate ${(convRate * 100).toFixed(1)}% is low. Optimising ad creative.`,
      budgetChange: 0,
    };
  }

  return {
    action: "maintain",
    reason: `ROAS ${roas.toFixed(1)}x is acceptable. Maintaining current budget.`,
    budgetChange: 0,
  };
}

export const DEMO_CAMPAIGNS: CampaignMetrics[] = [
  { name: "Google Ads — SaaS", spend: 1200, revenue: 4800, clicks: 3200, conversions: 96 },
  { name: "Meta Ads — Mobile", spend: 800, revenue: 560, clicks: 2100, conversions: 14 },
  { name: "LinkedIn — Enterprise", spend: 2000, revenue: 3400, clicks: 1800, conversions: 36 },
  { name: "Twitter — Retarget", spend: 400, revenue: 1600, clicks: 900, conversions: 32 },
];
