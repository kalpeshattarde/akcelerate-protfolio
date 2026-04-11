import { useState } from "react";
import { HeroPage } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import { PricingCard } from "@/components/Cards";
import { pricingPlans } from "@/data/pricing";
import { pricingFAQ } from "@/data/faq";
import { Shield, Gift, UserCheck } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { TiltCard } from "@/hooks/useTiltCard";

const builtFor = [
  { icon: Shield, title: "Secure & Compliant", desc: "ISO 27001-grade security, encryption at rest & in transit, Indian data residency options." },
  { icon: Gift, title: "Free Onboarding", desc: "Structured onboarding with our implementation engineers at no extra cost." },
  { icon: UserCheck, title: "Dedicated CSM", desc: "A Customer Success Manager assigned from day one to ensure your ROI." },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <HeroPage
        label="Pricing"
        title={<>Plans That <span className="gradient-text">Scale With You</span></>}
        description="Start with one AI module. Add more as you grow. No hidden fees, no lock-in. All plans include free implementation support and dedicated onboarding."
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

      {/* Built for Indian Manufacturers */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="Why Us"
              title={<>Built for <span className="gradient-text">Indian Manufacturers</span></>}
            />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto" stagger={100}>
            {builtFor.map((b, i) => (
              <TiltCard key={i} className="reveal-item glass-card p-7 text-center">
                <div className="feature-icon mx-auto"><b.icon className="w-6 h-6 text-accent" /></div>
                <h3 className="font-poppins font-semibold mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm">{b.desc}</p>
              </TiltCard>
            ))}
          </RevealGrid>
        </div>
      </section>

      <FAQAccordion items={pricingFAQ} title="Pricing Questions Answered" />

      <CTASection
        title="Not Sure Which Plan Fits?"
        description="Our team will assess your plant's needs and recommend the right starting point — no sales pressure, guaranteed."
        primaryCta={{ label: "Book Free Audit", to: "/free-audit" }}
        secondaryCta={{ label: "Contact Us", to: "/contact" }}
        dark
      />
    </>
  );
}
