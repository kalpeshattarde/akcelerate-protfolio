import { Link } from "react-router-dom";
import { ArrowRight, Check, Crown, Building2, GraduationCap, Wrench } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

const plans = [
  {
    name: "Starter",
    priceUsd: 19,
    priceInr: 1499,
    period: "one-time",
    description: "Perfect for students, solo entrepreneurs & vibe coders exploring SaaS ideas.",
    icon: GraduationCap,
    audience: ["Students", "Solo Entrepreneurs", "Vibe Coders"],
    features: [
      "Pick any 1 prototype",
      "Full source code ownership",
      "Commercial & resale license",
      "Free updates for 6 months",
      "Documentation included",
      "Deploy anywhere — Vercel, Netlify, AWS",
    ],
    cta: "Browse Prototypes",
    ctaLink: "#products-catalog",
    highlighted: false,
  },
  {
    name: "Pro Bundle",
    priceUsd: 59,
    priceInr: 4999,
    period: "one-time",
    description: "For freelancers & specialized SaaS builders shipping multiple products fast.",
    icon: Wrench,
    audience: ["Freelancers", "SaaS Builders", "Agency Owners"],
    features: [
      "Pick any 5 prototypes",
      "Full source code ownership",
      "Commercial license for all 5",
      "Priority support & customization help",
      "Custom branding kit",
      "Free updates for 12 months",
    ],
    cta: "Get 5 Prototypes",
    ctaLink: "/contact",
    highlighted: true,
  },
  {
    name: "All Access",
    priceUsd: 119,
    priceInr: 9999,
    period: "one-time",
    description: "Get access to every prototype in the catalog — current and future releases.",
    icon: Crown,
    audience: ["Builders", "Resellers", "Teams"],
    features: [
      "Access to ALL prototypes",
      "Every future release included",
      "Full source code ownership",
      "Commercial license for all",
      "Free updates for 12 months",
      "Priority support",
    ],
    cta: "Get All Access",
    ctaLink: "/contact",
    highlighted: false,
  },
  {
    name: "AKcelerate All-Access",
    priceUsd: 249,
    priceInr: 21000,
    period: "starts from",
    description: "Custom SaaS or mobile app solution with all features — white-label ready.",
    icon: Building2,
    audience: ["Agency Owners", "White-Label Resellers", "Enterprises"],
    features: [
      "Access to ALL prototypes",
      "Custom SaaS or mobile app solution",
      "All features included",
      "White-label rights for client delivery",
      "Remove all AKcelerate branding",
      "Priority feature requests",
      "Dedicated Slack channel",
      "Custom prototype development",
    ],
    cta: "Start with AKcelerate",
    ctaLink: "/contact",
    highlighted: false,
  },
];

function formatPrice(usd: number, currency: "usd" | "inr") {
  if (currency === "inr") {
    const inr = Math.round(usd * USD_TO_INR);
    return `₹${inr.toLocaleString("en-IN")}`;
  }
  return `$${usd}`;
}

export default function MarketplacePricing() {
  return (
    <section id="pricing" className="py-16 lg:py-20 section-alt">
      <RevealSection>
        <div className="text-center mb-12">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple Pricing. <span className="gradient-text">Insane Value.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            One prototype for $29. Five for $99. Full access from $249.
            <br />
            <span className="font-medium text-foreground">Compare that to $3,000+ with AI tools.</span>
          </p>
        </div>
      </RevealSection>

      <RevealGrid className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto" stagger={100}>
        {plans.map(({ name, priceUsd, period, description, icon: Icon, audience, features, cta, ctaLink, highlighted }, i) => (
          <div
            key={i}
            className={`reveal-item glass-card p-7 relative overflow-hidden ${
              highlighted ? "border-2 border-primary ring-4 ring-primary/10" : ""
            }`}
          >
            {highlighted && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                MOST POPULAR
              </div>
            )}
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-poppins font-bold text-xl text-foreground mb-1">{name}</h3>

            {/* Dual currency display */}
            <div className="mb-1">
              <div className="flex items-baseline gap-1">
                <span className="font-poppins text-4xl font-extrabold text-foreground">
                  {formatPrice(priceUsd, "usd")}
                </span>
                <span className="text-sm text-muted-foreground">{period}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                ≈ {formatPrice(priceUsd, "inr")}
              </div>
            </div>

            {/* Target audience badges */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {audience.map((a, j) => (
                <span key={j} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary">
                  {a}
                </span>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mb-6">{description}</p>
            <ul className="space-y-2.5 mb-8">
              {features.map((f, j) => (
                <li key={j} className="flex items-center gap-2.5 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to={ctaLink}
              className={`w-full inline-flex justify-center items-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                highlighted ? "btn-primary" : "btn-secondary"
              }`}
            >
              {cta} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </RevealGrid>
    </section>
  );
}
