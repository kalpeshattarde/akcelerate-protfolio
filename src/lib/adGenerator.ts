export interface AdCopy {
  headline: string;
  body: string;
  cta: string;
  platform: string;
}

const HEADLINES = [
  "Stop Building From Scratch — Ship 10x Faster",
  "Production-Ready SaaS Templates — Launch in Days",
  "AI-Powered Products Your Customers Will Love",
  "From Idea to MVP in 48 Hours — Not 6 Months",
  "Save 500+ Dev Hours With Pre-Built Solutions",
];

const BODIES = [
  "Get production-ready mobile apps and web SaaS products with AI integrations, analytics dashboards, and scalable architecture. One-time purchase, lifetime updates.",
  "Why waste months building from scratch? Our battle-tested templates come with authentication, payments, and AI features built in. Start shipping today.",
  "Join 1000+ developers who launched faster with AKcelerate products. Full source code, modern stack, and enterprise-grade quality.",
];

const CTAS = ["Browse Products →", "Get Started Free", "See Live Demos", "Claim 50% Off"];

const PLATFORMS = ["Google Ads", "Meta Ads", "LinkedIn Ads", "Twitter Ads"];

export function generateAdCopy(count: number = 3): AdCopy[] {
  const results: AdCopy[] = [];
  for (let i = 0; i < count; i++) {
    results.push({
      headline: HEADLINES[Math.floor(Math.random() * HEADLINES.length)],
      body: BODIES[Math.floor(Math.random() * BODIES.length)],
      cta: CTAS[Math.floor(Math.random() * CTAS.length)],
      platform: PLATFORMS[i % PLATFORMS.length],
    });
  }
  return results;
}
