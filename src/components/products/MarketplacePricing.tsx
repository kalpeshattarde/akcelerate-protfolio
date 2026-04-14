import { Link } from "react-router-dom";
import { ArrowRight, Check, Zap, Crown, Building2 } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import CurrencyToggle from "./CurrencyToggle";
import type { GeoDetection } from "@/hooks/useGeoDetection";

interface Props {
  geo: GeoDetection;
}

export default function MarketplacePricing({ geo }: Props) {
  const { currency, setCurrency, isIndia, formatPrice } = geo;

  const plans = [
    {
      name: "Single Prototype",
      priceUsd: 29,
      period: "one-time",
      description: "Perfect for indie hackers validating one idea. Grab it, customize it, ship it.",
      icon: Zap,
      features: [
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
      name: "All-Access Bundle",
      priceUsd: 99,
      period: "/month",
      description: "For founders & agencies building multiple SaaS products. Access everything.",
      icon: Crown,
      features: [
        "All 40+ prototypes included",
        "Every future release included",
        "Priority support & customization help",
        "Commercial license for all products",
        "Custom branding kit",
        "Cancel anytime — keep what you built",
      ],
      cta: "Get Full Access",
      ctaLink: "/contact",
      highlighted: true,
    },
    {
      name: "Agency / White-Label",
      priceUsd: 299,
      period: "+",
      description: "For agencies delivering client work. White-label everything with your brand.",
      icon: Building2,
      features: [
        "Everything in All-Access",
        "White-label rights for client delivery",
        "Remove all AKcelerate branding",
        "Priority feature requests",
        "Dedicated Slack channel",
        "Custom prototype development",
      ],
      cta: "Talk to Us",
      ctaLink: "/contact",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 lg:py-20 section-alt">
      <RevealSection>
        <div className="text-center mb-8">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple Pricing. <span className="gradient-text">Insane Value.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-6">
            One prototype for {formatPrice(29)}. Everything for {formatPrice(99)}/mo. Agency white-label from {formatPrice(299)}.
            <br />
            <span className="font-medium text-foreground">Compare that to {formatPrice(3000)}+ with AI tools.</span>
          </p>
          <CurrencyToggle currency={currency} onToggle={setCurrency} isIndia={isIndia} />
        </div>
      </RevealSection>

      <RevealGrid className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto" stagger={100}>
        {plans.map(({ name, priceUsd, period, description, icon: Icon, features, cta, ctaLink, highlighted }, i) => (
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
            <div className="flex items-baseline gap-1 mb-3">
              <span className="font-poppins text-4xl font-extrabold text-foreground">{formatPrice(priceUsd)}</span>
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
