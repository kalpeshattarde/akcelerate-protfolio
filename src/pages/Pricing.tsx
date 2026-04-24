import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { HeroPage } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import { PricingCard } from "@/components/Cards";
import { pricingPlans, ANNUAL_DISCOUNT } from "@/data/pricing";
import { pricingFAQ } from "@/data/faq";
import { CheckCircle, ShieldCheck, RefreshCw, Lock, Award } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pricingFAQ.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <SEOHead
        title="AI Consulting & Automation Pricing — From $249/mo"
        description="Transparent pricing for AI consulting, n8n automation, and AI agent development. Plans from $249/mo. 14-day money-back guarantee. No hidden fees."
        path="/pricing"
        jsonLd={faqJsonLd}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]}
      />
      <HeroPage
        label="Pricing"
        title={<>Transparent <span className="gradient-text">Pricing Plans</span></>}
        description="Choose the engagement that fits — from one-off audits to a dedicated AI pod. 14-day money-back. No hidden fees. Cancel any time."
      />

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-medium ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${isAnnual ? "bg-primary" : "bg-muted"}`}
              aria-label="Toggle annual billing"
            >
              <span className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${isAnnual ? "translate-x-7" : ""}`} />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
              Annual <span className="text-xs text-green-600 font-semibold ml-1">Save {ANNUAL_DISCOUNT}%</span>
            </span>
          </div>

          <RevealGrid className="grid md:grid-cols-3 gap-6 items-start" stagger={150}>
            {pricingPlans.map((plan, i) => (
              <div key={i} className="reveal-item">
                <PricingCard
                  name={plan.name}
                  outcome={plan.outcome}
                  description={plan.description}
                  priceUsd={plan.monthlyUsd}
                  priceInr={plan.monthlyInr}
                  features={plan.features}
                  highlighted={plan.highlighted}
                  cta={plan.cta}
                  isAnnual={isAnnual}
                  discountPercent={ANNUAL_DISCOUNT}
                  socialProof={plan.socialProof}
                  badge={plan.badge}
                />
              </div>
            ))}
          </RevealGrid>

          {/* Trust badges row — money-back, secure, compliance */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { Icon: RefreshCw, title: "14-day money back", desc: "Full refund, no questions asked" },
              { Icon: ShieldCheck, title: "SOC 2 aligned", desc: "Enterprise security controls" },
              { Icon: Lock, title: "Secure payments", desc: "Stripe-powered, PCI-DSS" },
              { Icon: Award, title: "92% retention", desc: "Clients renew & expand" },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card/50">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="All Plans Include" title={<>Everything You Need to <span className="gradient-text">Succeed</span></>} />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto" stagger={80}>
            {[
              "Dedicated project manager",
              "Weekly progress updates",
              "Source code ownership",
              "Post-launch support",
              "Documentation & training",
              "Scalable architecture",
            ].map((f, i) => (
              <div key={i} className="reveal-item flex items-center gap-3 glass-card p-4">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium">{f}</span>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <FAQAccordion items={pricingFAQ} title="Pricing FAQ" />

      <CTASection
        title="Not Sure Which Plan Is Right?"
        description="Book a free consultation and we'll recommend the perfect plan for your needs."
        primaryCta={{ label: "Book Free Audit", to: "/free-audit" }}
        secondaryCta={{ label: "Contact Us", to: "/contact" }}
        dark
      />
    </>
  );
}
