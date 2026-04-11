import { useState } from "react";
import { HeroPage } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import { PricingCard } from "@/components/Cards";
import { pricingPlans } from "@/data/pricing";
import { pricingFAQ } from "@/data/faq";
import { CheckCircle } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { TiltCard } from "@/hooks/useTiltCard";

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <HeroPage
        vizMode="pricing"
        label="Pricing"
        title={<>Transparent <span className="gradient-text">Pricing Plans</span></>}
        description="Choose the engagement model that fits your business. No hidden fees, no surprises."
      />

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
              <button
                onClick={() => setAnnual(!annual)}
                className="relative w-14 h-7 rounded-full transition-colors"
                style={{ background: annual ? "var(--gradient-primary)" : "hsl(var(--border))" }}
              >
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${annual ? "left-8" : "left-1"}`} />
              </button>
              <span className={`text-sm font-medium ${annual ? "text-foreground" : "text-muted-foreground"}`}>
                Annual <span className="text-accent text-xs font-semibold ml-1">Save 20%</span>
              </span>
            </div>
          </RevealSection>

          <RevealGrid className="grid md:grid-cols-3 gap-6 items-start" stagger={150}>
            {pricingPlans.map((plan, i) => (
              <TiltCard key={i} className="reveal-item">
                <PricingCard
                  name={plan.name}
                  description={plan.description}
                  price={annual ? plan.annualPrice : plan.monthlyPrice}
                  features={plan.features}
                  highlighted={plan.highlighted}
                  cta={plan.cta}
                />
              </TiltCard>
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
