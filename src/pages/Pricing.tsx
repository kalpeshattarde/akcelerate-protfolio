import SEOHead from "@/components/SEOHead";
import { HeroPage } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import { PricingCard } from "@/components/Cards";
import { pricingPlans } from "@/data/pricing";
import { pricingFAQ } from "@/data/faq";
import { CheckCircle } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

export default function PricingPage() {
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
          <RevealGrid className="grid md:grid-cols-3 gap-6 items-start" stagger={150}>
            {pricingPlans.map((plan, i) => (
              <div key={i} className="reveal-item">
                <PricingCard
                  name={plan.name}
                  description={plan.description}
                  priceUsd={plan.priceUsd}
                  priceInr={plan.priceInr}
                  features={plan.features}
                  highlighted={plan.highlighted}
                  cta={plan.cta}
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
