import { HeroPage } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { industries } from "@/data/industries";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { TiltCard } from "@/hooks/useTiltCard";
import FloatingOrbs from "@/components/FloatingOrbs";

export default function IndustriesPage() {
  return (
    <>
      <HeroPage label="Industries" title={<>AI Solutions for <span className="gradient-text">Every Industry</span></>} description="We bring the same world-class AI, automation, and data expertise to every vertical — tailored to the unique challenges and opportunities of your industry." />

      <section className="py-20 lg:py-28 relative overflow-hidden">
        <FloatingOrbs count={2} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealSection>
            <SectionHeader label="Verticals" title={<>Sector-Specific <span className="gradient-text">AI & Automation</span></>} description="Each industry card shows the 3 highest-impact use cases we've delivered — with proven outcomes." />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={80}>
            {industries.map((ind, i) => (
              <TiltCard key={i} className="reveal-item glass-card p-7">
                <h3 className="font-poppins font-semibold text-lg mb-2">{ind.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{ind.description}</p>
                <div className="flex flex-wrap gap-2">{ind.useCases.map((u, j) => <span key={j} className="tag-pill">{u}</span>)}</div>
              </TiltCard>
            ))}
          </RevealGrid>
        </div>
      </section>

      <section className="py-20 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="glass-card p-8 text-center max-w-3xl mx-auto">
              <h3 className="font-poppins font-bold text-xl mb-3">Industry-First, Not Tech-First</h3>
              <p className="text-muted-foreground leading-relaxed">We don't sell technology — we solve industry problems. Every engagement starts with understanding your sector, your operations, and your competitive landscape before a single line of code is written.</p>
            </div>
          </RevealSection>
        </div>
      </section>

      <CTASection title="Don't See Your Industry?" description="We work across sectors. If your industry isn't listed, let's talk — our AI and automation expertise adapts to any business domain." primaryCta={{ label: "Contact Us", to: "/contact" }} dark />
    </>
  );
}
