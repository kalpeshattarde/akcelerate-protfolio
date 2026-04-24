export interface PricingPlan {
  name: string;
  /** Outcome-led one-liner shown above the price (e.g. "Validate one AI workflow"). */
  outcome?: string;
  description: string;
  monthlyUsd: number;
  monthlyInr: number;
  features: string[];
  highlighted: boolean;
  cta: string;
  /** Optional micro-trust line under the CTA (e.g. "47 teams chose this in Q1"). */
  socialProof?: string;
  /** Optional badge label override; default "Most Popular" when highlighted. */
  badge?: string;
}

export const ANNUAL_DISCOUNT = 17; // percent

export const pricingPlans: PricingPlan[] = [
  {
    name: "Validate",
    outcome: "Test one AI workflow. See ROI in 30 days.",
    description: "Perfect for startups and small teams exploring AI and data solutions.",
    monthlyUsd: 249,
    monthlyInr: 20999,
    features: [
      "1 AI/Data project per month",
      "Basic analytics dashboard",
      "Email support",
      "Monthly performance report",
      "Up to 3 team members",
      "Standard SLA (48hr response)",
    ],
    highlighted: false,
    cta: "Start with Validate",
    socialProof: "Best for first-time AI buyers",
  },
  {
    name: "Ship",
    outcome: "Build and launch 3 AI products per quarter.",
    description: "For growing businesses ready to scale with AI-driven automation and analytics.",
    monthlyUsd: 999,
    monthlyInr: 83999,
    features: [
      "3 AI/Data projects per month",
      "Advanced analytics & BI dashboards",
      "Priority support (Slack + Email)",
      "Weekly strategy calls",
      "Up to 10 team members",
      "Custom integrations",
      "Dedicated account manager",
      "Premium SLA (4hr response)",
    ],
    highlighted: true,
    cta: "Start with Ship",
    socialProof: "Most teams choose this — recommended by our team",
    badge: "Most Popular",
  },
  {
    name: "Scale",
    outcome: "Custom roadmap. Dedicated engineering pod.",
    description: "Full-scale AI transformation with dedicated team and unlimited support.",
    monthlyUsd: 0,
    monthlyInr: 0,
    features: [
      "Unlimited AI/Data projects",
      "Enterprise-grade analytics platform",
      "24/7 dedicated support",
      "Daily standups available",
      "Unlimited team members",
      "Custom ML model development",
      "On-premise deployment option",
      "Dedicated engineering team",
      "Enterprise SLA (1hr response)",
      "Executive quarterly reviews",
    ],
    highlighted: false,
    cta: "Talk to founder",
    socialProof: "From $4,999/mo · Custom scope",
  },
];
