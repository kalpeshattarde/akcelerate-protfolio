import { HeroPage } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { industries } from "@/data/industries";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { TiltCard } from "@/hooks/useTiltCard";
import FloatingOrbs from "@/components/FloatingOrbs";
import {
  Factory, Heart, Rocket, Store, ShoppingCart, Building2,
  GraduationCap, Truck, Megaphone, Target, Radio, Car, Film,
  LucideIcon, ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const iconMap: Record<string, LucideIcon> = {
  Factory, Heart, Rocket, Store, ShoppingCart, Building2,
  GraduationCap, Truck, Megaphone, Target, Radio, Car, Film,
};

const accentColors = [
  "from-primary/20 to-accent/20",
  "from-accent/20 to-primary/20",
  "from-primary/15 to-purple-500/15",
  "from-cyan-500/15 to-primary/15",
  "from-primary/20 to-accent/20",
  "from-accent/20 to-primary/20",
  "from-primary/15 to-purple-500/15",
  "from-cyan-500/15 to-primary/15",
  "from-primary/20 to-accent/20",
  "from-accent/20 to-primary/20",
  "from-primary/15 to-purple-500/15",
  "from-cyan-500/15 to-primary/15",
  "from-primary/20 to-accent/20",
];

export default function IndustriesPage() {
  return (
    <>
      <HeroPage
        label="Industries"
        title={<>AI Solutions for <span className="gradient-text">Every Industry</span></>}
        description="We bring the same world-class AI, automation, and data expertise to every vertical — tailored to the unique challenges and opportunities of your industry."
      />

      <section className="py-20 lg:py-28 relative overflow-hidden">
        <FloatingOrbs count={3} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealSection>
            <SectionHeader
              label="Verticals"
              title={<>Sector-Specific <span className="gradient-text">AI & Automation</span></>}
              description="Each industry card shows the 3 highest-impact use cases we've delivered — with proven outcomes."
            />
          </RevealSection>

          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={80}>
            {industries.map((ind, i) => {
              const Icon = iconMap[ind.icon] || Factory;
              return (
                <TiltCard key={i} className="reveal-item group">
                  <div className="glass-card p-7 h-full relative overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_8px_40px_hsl(var(--primary)/0.12)]">
                    {/* Animated gradient background on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${accentColors[i % accentColors.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    <div className="relative z-10">
                      {/* Icon with pulse ring */}
                      <div className="relative w-14 h-14 mb-5">
                        <div className="absolute inset-0 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500 group-hover:animate-[pulse_2s_ease-in-out_infinite]" />
                        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <Icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors duration-500" />
                        </div>
                      </div>

                      <h3 className="font-poppins font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                        {ind.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                        {ind.description}
                      </p>

                      {/* Use case pills with stagger animation */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {ind.useCases.map((u, j) => (
                          <span
                            key={j}
                            className="tag-pill transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/5"
                            style={{ transitionDelay: `${j * 80}ms` }}
                          >
                            {u}
                          </span>
                        ))}
                      </div>

                      {/* Animated arrow */}
                      <div className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Explore solutions <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </RevealGrid>
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealGrid className="grid grid-cols-2 md:grid-cols-4 gap-6" stagger={100}>
            {[
              { metric: "13+", label: "Industries Served" },
              { metric: "50+", label: "Projects Delivered" },
              { metric: "95%", label: "Client Retention" },
              { metric: "3x", label: "Average ROI" },
            ].map((s, i) => (
              <div key={i} className="reveal-item glass-card p-6 text-center group hover:border-primary/30 transition-all duration-500 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.10)]">
                <div className="stat-number mb-1 group-hover:scale-110 transition-transform duration-500">{s.metric}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <section className="py-20 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="glass-card p-8 text-center max-w-3xl mx-auto group hover:border-primary/30 transition-all duration-500">
              <h3 className="font-poppins font-bold text-xl mb-3 group-hover:text-primary transition-colors duration-300">Industry-First, Not Tech-First</h3>
              <p className="text-muted-foreground leading-relaxed">We don't sell technology — we solve industry problems. Every engagement starts with understanding your sector, your operations, and your competitive landscape before a single line of code is written.</p>
            </div>
          </RevealSection>
        </div>
      </section>

      <CTASection
        title="Don't See Your Industry?"
        description="We work across sectors. If your industry isn't listed, let's talk — our AI and automation expertise adapts to any business domain."
        primaryCta={{ label: "Contact Us", to: "/contact" }}
        dark
      />
    </>
  );
}
