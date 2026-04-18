import { Link } from "react-router-dom";
import { ArrowRight, Check, Crown, Building2, GraduationCap, Wrench, ShoppingCart } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { PRODUCTS } from "@/data/products";

interface MarketplacePricingProps {
  onAddAllToCart?: () => void;
  onAddBundleToCart?: () => void;
}

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
    action: null as string | null,
  },
  {
    name: "Pro Bundle",
    priceUsd: 12,
    priceInr: 999,
    period: "per product (5+ products)",
    description: "For freelancers & specialized SaaS builders shipping multiple products fast. Add 5 or more to unlock this rate automatically.",
    icon: Wrench,
    audience: ["Freelancers", "SaaS Builders", "Agency Owners"],
    features: [
      "Pick any 5 or more prototypes",
      "Just $12 / ₹999 per product",
      "Full source code ownership",
      "Commercial license for every prototype",
      "Priority support & customization help",
      "Custom branding kit",
      "Free updates for 12 months",
    ],
    cta: "Add 5 to Cart",
    ctaLink: "#products-catalog",
    highlighted: true,
    action: "bundle" as string | null,
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
      "Access to ALL " + PRODUCTS.length + " prototypes",
      "Every future release included",
      "Full source code ownership",
      "Commercial license for all",
      "Free updates for 12 months",
      "Priority support",
    ],
    cta: "Get All Access",
    ctaLink: "#",
    highlighted: false,
    action: "all-access" as string | null,
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
    action: null as string | null,
  },
];

export default function MarketplacePricing({ onAddAllToCart, onAddBundleToCart }: MarketplacePricingProps) {
  const handleClick = (action: string | null, ctaLink: string) => {
    if (action === "all-access" && onAddAllToCart) {
      onAddAllToCart();
      return;
    }
    if (action === "bundle" && onAddBundleToCart) {
      onAddBundleToCart();
      return;
    }
    // Default link navigation handled by Link component
  };

  return (
    <section id="pricing" className="py-16 lg:py-20 section-alt">
      <RevealSection>
        <div className="text-center mb-12">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple Pricing. <span className="gradient-text">Insane Value.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            One prototype for $19. $12 each when you grab 5 or more. All access for $119. Custom solutions from $249.
            <br />
            <span className="font-medium text-foreground">Compare that to $3,000+ with AI tools.</span>
          </p>
        </div>
      </RevealSection>

      <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto" stagger={100}>
        {plans.map(({ name, priceUsd, priceInr, period, description, icon: Icon, audience, features, cta, ctaLink, highlighted, action }, i) => (
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

            <div className="mb-1">
              <div className="flex items-baseline gap-1">
                <span className="font-poppins text-4xl font-extrabold text-foreground">
                  ${priceUsd}
                </span>
                <span className="text-sm text-muted-foreground">{period}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                ≈ ₹{priceInr.toLocaleString("en-IN")}
              </div>
            </div>

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
            {action ? (
              <button
                onClick={() => handleClick(action, ctaLink)}
                className={`w-full inline-flex justify-center items-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                  highlighted ? "btn-primary" : "btn-secondary"
                }`}
              >
                <ShoppingCart className="w-4 h-4" /> {cta}
              </button>
            ) : (
              <Link
                to={ctaLink}
                className={`w-full inline-flex justify-center items-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                  highlighted ? "btn-primary" : "btn-secondary"
                }`}
              >
                {cta} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        ))}
      </RevealGrid>
    </section>
  );
}
