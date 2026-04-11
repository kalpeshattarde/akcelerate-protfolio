import { HeroPage } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { Brain, Database, Target, Globe } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { TiltCard } from "@/hooks/useTiltCard";
import FloatingOrbs from "@/components/FloatingOrbs";

const competencies = [
  { icon: Brain, title: "Machine Learning", desc: "Predictive models, LLM pipelines, anomaly detection, and forecasting systems for business applications." },
  { icon: Database, title: "Data Engineering", desc: "End-to-end data pipelines connecting CRMs, ERPs, SaaS tools, and cloud sources for real-time analytics." },
  { icon: Target, title: "AI Strategy", desc: "Helping businesses identify the right AI use cases and build a phased automation roadmap to measurable ROI." },
  { icon: Globe, title: "Industry Knowledge", desc: "Domain expertise across 13+ industries — FMCG, Healthcare, Retail, FinTech, Logistics, SaaS, and more." },
];

export default function FounderPage() {
  return (
    <>
      <HeroPage vizMode="founder" label="Founder" title={<><span className="gradient-text">Kalpesh Attarde</span></>} description="AI, Data & Consulting practitioner with 5+ years building intelligence systems and driving digital transformation across 13+ industries." />

      <section className="py-20 lg:py-28 relative overflow-hidden">
        <FloatingOrbs count={2} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealSection>
            <div className="glass-card p-8 mb-10 flex flex-col md:flex-row gap-8 items-center">
              <img src="/images/kalpesh-attarde.jpeg" alt="Kalpesh Attarde" className="w-32 h-32 rounded-2xl flex-shrink-0 object-cover object-top" style={{ boxShadow: "0 8px 30px rgba(37,99,235,0.2)" }} />
              <div>
                <h2 className="font-poppins font-bold text-2xl mb-1">Kalpesh Attarde</h2>
                <div className="text-accent font-medium mb-3">Founder & CEO, AKcelerate</div>
                <p className="text-muted-foreground text-sm leading-relaxed">Kalpesh Attarde founded AKcelerate with a clear mission: to bring enterprise-grade AI, automation, and data intelligence within reach of every Indian business, regardless of size or sector.</p>
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="glass-card p-8 mb-10">
              <h3 className="font-poppins font-semibold text-xl mb-4">The Story Behind AKcelerate</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
                <p>Having worked extensively with data science across multiple industries, he saw firsthand how massive the gap was between what AI and automation could do for businesses and what most companies were actually using.</p>
                <p>Indian businesses — from startups and SMBs to established enterprises across Healthcare, Retail, FMCG, FinTech, Logistics, and more — generate enormous volumes of data every day. But without the right intelligence infrastructure, that data sits unused while revenue opportunities, efficiency gains, and competitive advantages are left on the table.</p>
                <p>AKcelerate was built to close this gap. Not with generic off-the-shelf tools from global vendors, but with bespoke AI solutions, automation systems, and data platforms engineered for the real needs of Indian businesses — their goals, their data, their budgets, and their timelines.</p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="Expertise" title={<>Core <span className="gradient-text">Competencies</span></>} />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={100}>
            {competencies.map((c, i) => (
              <TiltCard key={i} className="reveal-item glass-card p-7 text-center">
                <div className="feature-icon mx-auto"><c.icon className="w-6 h-6 text-accent" /></div>
                <h3 className="font-poppins font-semibold mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm">{c.desc}</p>
              </TiltCard>
            ))}
          </RevealGrid>
        </div>
      </section>

      <CTASection title="Ready to Transform Your Business?" description="Book a 30-minute discovery call with Kalpesh. He personally reviews every new client's situation before recommending a solution." primaryCta={{ label: "Book Free Audit", to: "/free-audit" }} secondaryCta={{ label: "Contact Us", to: "/contact" }} dark />
    </>
  );
}
