export interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: string;
  annualPrice: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "For single-site manufacturers getting started with AI analytics.",
    monthlyPrice: "₹49,999",
    annualPrice: "₹39,999",
    features: [
      "1 AI module (choose one)",
      "Up to 10 monitored assets",
      "Standard dashboards",
      "Email support",
      "Monthly performance report",
      "Free onboarding",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Professional",
    description: "For multi-line manufacturers scaling AI across operations.",
    monthlyPrice: "₹1,49,999",
    annualPrice: "₹1,24,999",
    features: [
      "Up to 3 AI modules",
      "Up to 50 monitored assets",
      "Custom dashboards & reports",
      "Priority support (Slack + Email)",
      "Weekly strategy calls",
      "Dedicated account manager",
      "API access",
      "30-day free pilot",
    ],
    highlighted: true,
    cta: "Start Free Pilot",
  },
  {
    name: "Enterprise",
    description: "For large manufacturers, multi-plant groups, and OEMs requiring bespoke AI solutions.",
    monthlyPrice: "Custom",
    annualPrice: "Custom",
    features: [
      "All AI modules included",
      "Unlimited monitored assets",
      "Fully custom analytics",
      "24/7 dedicated support",
      "On-premise deployment option",
      "Dedicated engineering team",
      "99.9% uptime SLA",
      "Executive quarterly reviews",
      "Custom integrations",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];
