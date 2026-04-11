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
    description: "Perfect for startups and small teams exploring AI and data solutions.",
    monthlyPrice: "₹49,999",
    annualPrice: "₹39,999",
    features: [
      "1 AI/Data project per month",
      "Basic analytics dashboard",
      "Email support",
      "Monthly performance report",
      "Up to 3 team members",
      "Standard SLA (48hr response)",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Growth",
    description: "For growing businesses ready to scale with AI-driven automation and analytics.",
    monthlyPrice: "₹1,49,999",
    annualPrice: "₹1,24,999",
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
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    description: "Full-scale AI transformation with dedicated team and unlimited support.",
    monthlyPrice: "Custom",
    annualPrice: "Custom",
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
    cta: "Contact Sales",
  },
];
