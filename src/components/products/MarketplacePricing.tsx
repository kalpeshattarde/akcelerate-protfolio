import { Link } from "react-router-dom";
import { ArrowRight, Check, Zap, Crown } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

const plans = [
  {
    name: "Single Prototype",
    price: "$29",
    period: "one-time",
    description: "Grab one prototype, customize it, ship it. No subscription. No strings.",
    icon: Zap,
    features: [
      "Full source code",
      "Commercial license",
      "Free updates for 6 months",
      "Documentation included",
      "Deploy anywhere",
    ],
    cta: "Browse Prototypes",
    ctaLink: "#products-catalog",
    highlighted: false,
  },
  {
    name: "All-Access Bundle",
    price: "$99",
    period: "/month",
    description: "Access every prototype. Every update. Every new release. Cancel anytime.",
    icon: Crown,
    features: [
      "40+ prototypes included",
      "All future releases included",
      "Priority support",
      "Commercial license for all",
      "Custom branding kit",
      "Early access to new products",
    ],
    cta: "Get Full Access",
    ctaLink: "/contact",
    highlighted: true,
  },
];

export default function MarketplacePricing() {
  return (
    <section className="py-16 lg:py-20 section-alt">
      <RevealSection>
        <div className="text-center mb-12">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple Pricing. <span className="gradient-text">No Surprises.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            One prototype for $29. Or everything for $99/month. That's it.
          </p>
        </div>
      </RevealSection>

      <RevealGrid className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto" stagger={120}>
        {plans.map(({ name, price, period, description, icon: Icon, features, cta, ctaLink, highlighted }, i) => (
          <div
            key={i}
            className={`reveal-item glass-card p-8 relative overflow-hidden ${
              highlighted ? "border-2 border-primary ring-4 ring-primary/10" : ""
            }`}
          >
            {highlighted && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                BEST VALUE
              </div>
            )}
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-poppins font-bold text-xl text-foreground mb-1">{name}</h3>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="font-poppins text-4xl font-extrabold text-foreground">{price}</span>
              <span className="text-sm text-muted-foreground">{period}</span>
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
                highlighted
                  ? "btn-primary"
                  : "btn-secondary"
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
