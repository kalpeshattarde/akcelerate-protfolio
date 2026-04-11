import { Link } from "react-router-dom";
import { HeroPage } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { caseStudies } from "@/data/industries";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { Download } from "lucide-react";
import { TiltCard } from "@/hooks/useTiltCard";
import StatRing from "@/components/StatRing";

export default function CaseStudiesPage() {
  return (
    <>
      <HeroPage vizMode="casestudies" label="Case Studies" title={<>Real Clients. <span className="gradient-text">Real Outcomes.</span></>} description="From automotive to pharma — discover how manufacturers across India are transforming operations with AKcelerate's AI analytics platform." />

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="Results" title={<>Real Manufacturing <span className="gradient-text">Transformations</span></>} description="See how data science and AI helped our clients optimize production, reduce downtime, and unlock new operational intelligence." />
          </RevealSection>

          {/* KPI Stat Rings */}
          <RevealSection delay={100}>
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <StatRing value={95} size={90} label="Model Accuracy" />
              <StatRing value={87} size={90} label="OEE Achieved" />
              <StatRing value={42} size={90} label="Downtime Reduced" />
              <StatRing value={92} size={90} label="Client Retention" />
            </div>
          </RevealSection>

          <RevealGrid className="grid md:grid-cols-3 gap-6" stagger={120}>
            {caseStudies.map((c, i) => (
              <div key={i} className="reveal-item">
                <TiltCard className="glass-card p-7 h-full">
                  <span className="text-xs font-medium text-accent mb-2 block">{c.industry}</span>
                  <h3 className="font-poppins font-semibold text-lg mb-3">{c.title}</h3>
                  <p className="text-muted-foreground text-sm mb-5">{c.description}</p>
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                    {c.metrics.map((m, j) => (
                      <div key={j} className="text-center">
                        <div className="stat-number text-lg">{m.value}</div>
                        <div className="text-[10px] text-muted-foreground">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </div>
            ))}
          </RevealGrid>
          <div className="text-center mt-8">
            <Link to="/completed-projects" className="btn-secondary">Full portfolio with detailed results, technologies & image galleries</Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="Resources" title={<>Guides & Reports to <span className="gradient-text">Accelerate Your Journey</span></>} description="Free resources for manufacturing leaders planning or executing AI analytics transformations." />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 gap-6" stagger={100}>
            {[
              { title: "The Complete Guide to Manufacturing Analytics", desc: "A comprehensive 80-page guide covering data strategy, platform selection, and ROI measurement for manufacturing AI." },
              { title: "Predictive Maintenance: From Reactive to AI-Driven", desc: "Step-by-step implementation guide for deploying predictive maintenance ML models on real factory equipment." },
              { title: "Manufacturing AI Maturity Model 2025", desc: "Benchmark your AI maturity against 200+ manufacturers and discover the highest-ROI digital transformation investments." },
              { title: "Industry 4.0 Transformation Roadmap", desc: "A practical framework for manufacturing leaders to plan and execute a successful Industry 4.0 digital transformation." },
            ].map((r, i) => (
              <div key={i} className="reveal-item">
                <TiltCard className="glass-card p-7 flex items-start gap-4 h-full">
                  <div className="feature-icon !mb-0"><Download className="w-6 h-6 text-accent" /></div>
                  <div>
                    <h3 className="font-poppins font-semibold mb-1">{r.title}</h3>
                    <p className="text-muted-foreground text-sm">{r.desc}</p>
                  </div>
                </TiltCard>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <CTASection title="Ready to Write Your Own Success Story?" description="Join manufacturers already benefiting from AKcelerate. Book a free demo and see your potential ROI in under 30 minutes." primaryCta={{ label: "Book Free Audit", to: "/free-audit" }} secondaryCta={{ label: "Contact Us", to: "/contact" }} dark />
    </>
  );
}
