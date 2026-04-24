// Intent-based personalization. Detects visitor intent from URL params
// and persists it to localStorage so all components can adapt copy + CTAs.

export type Intent = "founder" | "business" | "enterprise" | "default";

const STORAGE_KEY = "ak-visitor-intent";

export function detectIntent(): Intent {
  if (typeof window === "undefined") return "default";
  try {
    const url = new URL(window.location.href);
    const param = (url.searchParams.get("intent") || "").toLowerCase();
    if (param === "founder" || param === "business" || param === "enterprise") {
      localStorage.setItem(STORAGE_KEY, param);
      return param;
    }
    const stored = localStorage.getItem(STORAGE_KEY) as Intent | null;
    if (stored && ["founder", "business", "enterprise"].includes(stored)) return stored;
  } catch {
    // ignore
  }
  return "default";
}

export function setIntent(intent: Intent) {
  try {
    if (intent === "default") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, intent);
    window.dispatchEvent(new CustomEvent("ak-intent-change", { detail: intent }));
  } catch {
    // ignore
  }
}

export interface IntentCopy {
  badge: string;
  subheadline: string;
  ctaPrimary: { label: string; to: string };
  ctaSecondary: { label: string; to: string };
  recommendedCategory: "ai-agent" | "automation" | "saas-mvp" | "all";
}

export function getIntentCopy(intent: Intent): IntentCopy {
  switch (intent) {
    case "founder":
      return {
        badge: "For Founders",
        subheadline: "Ship your AI MVP in 21 days — full-stack, payments, auth, ready to launch.",
        ctaPrimary: { label: "Build My MVP", to: "/build-mvp" },
        ctaSecondary: { label: "See Past Builds", to: "/completed-projects" },
        recommendedCategory: "saas-mvp",
      };
    case "business":
      return {
        badge: "For Business Owners",
        subheadline: "Automate the work that slows you down — n8n workflows, AI agents, integrations.",
        ctaPrimary: { label: "Automate My Business", to: "/automations" },
        ctaSecondary: { label: "Explore AI Agents", to: "/ai-agents" },
        recommendedCategory: "automation",
      };
    case "enterprise":
      return {
        badge: "For Enterprise Teams",
        subheadline: "Custom AI strategy, MLOps, and end-to-end digital transformation programs.",
        ctaPrimary: { label: "Book Strategy Call", to: "/contact?intent=enterprise" },
        ctaSecondary: { label: "View Solutions", to: "/solutions" },
        recommendedCategory: "all",
      };
    default:
      return {
        badge: "AI Product Studio + Automation + Marketplace",
        subheadline: "From concept to launch — full-stack web apps, n8n automations, AI agents, and custom AI trained on your data.",
        ctaPrimary: { label: "Explore Solutions", to: "/solutions" },
        ctaSecondary: { label: "Book a Consultation", to: "/contact" },
        recommendedCategory: "all",
      };
  }
}
