import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { HeroPage } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import { PricingCard } from "@/components/Cards";
import { pricingPlans, ANNUAL_DISCOUNT } from "@/data/pricing";
import { pricingFAQ } from "@/data/faq";
import { CheckCircle } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <>
      <SEOHead title="Pricing" description="Transparent pricing plans for AI consulting, data analytics, and digital transformation services." path="/pricing" />
      <HeroPage
        label="Pricing"
        title={<>Transparent <span className="gradient-text">Pricing Plans</span></>}
        description="Choose the engagement model that fits your business. No hidden fees, no surprises."
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
                  description={plan.description}
                  priceUsd={plan.monthlyUsd}
                  priceInr={plan.monthlyInr}
                  features={plan.features}
                  highlighted={plan.highlighted}
                  cta={plan.cta}
                  isAnnual={isAnnual}
                  discountPercent={ANNUAL_DISCOUNT}
                />
              </div>
            ))}
          </RevealGrid>
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
