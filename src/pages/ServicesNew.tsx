import { Link } from "react-router-dom";
import { HeroPage } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { TiltCard } from "@/hooks/useTiltCard";
import { Briefcase, Brain, Database, BarChart3, Eye, Shield, Rocket, Lock } from "lucide-react";

const services = [
  {
    icon: Briefcase, title: "Business Consulting",
    desc: "Strategic consulting to transform your business with data-driven insights and AI-powered decision making.",
    items: ["Digital Transformation Strategy", "AI Readiness Assessment", "Process Optimization", "Change Management", "ROI-focused Implementation"],
  },
  {
    icon: Brain, title: "Generative AI",
    desc: "Harness the power of generative AI to automate processes, enhance productivity, and drive innovation.",
    items: ["AI Agent Development", "LLM Integration", "Custom AI Solutions", "Intelligent Automation", "Natural Language Processing"],
  },
  {
    icon: Database, title: "AI-Led Data Engineering",
    desc: "Build robust, scalable data infrastructure that powers your AI and analytics initiatives.",
    items: ["Cloud Data Platforms", "Data Pipeline Development", "Real-time Data Processing", "Data Lake Architecture", "ETL/ELT Automation"],
  },
  {
    icon: BarChart3, title: "Analytics & Cognitive BI",
    desc: "Advanced analytics and intelligent business intelligence to unlock insights and drive growth.",
    items: ["Predictive Analytics", "AI-Powered Dashboards", "Customer Analytics", "Real-time Insights", "Self-Service BI"],
  },
];

const whyCards = [
  { icon: Eye, title: "Domain Knowledge", desc: "Deep expertise across industries including CPG, MedTech, Healthcare, Retail, and Technology. We understand your unique challenges." },
  { icon: Shield, title: "Whitebox Solutions", desc: "Transparent, explainable AI solutions. No black boxes — you understand exactly how decisions are made." },
  { icon: Rocket, title: "Purpose-built Accelerators", desc: "Pre-built frameworks and tools that fast-track your implementation and reduce time-to-value." },
  { icon: Lock, title: "End-to-end AI Ownership", desc: "Complete lifecycle management from strategy and development to deployment and optimization." },
];

const industrySolutions = [
  { emoji: "🛒", title: "Consumer Packaged Goods (CPG)", desc: "AI-powered demand forecasting, supply chain optimization, and customer insights to drive growth in competitive markets." },
  { emoji: "🏥", title: "MedTech & Healthcare", desc: "AI agents for R&D efficiency, clinical data analytics, and predictive healthcare solutions that improve patient outcomes." },
  { emoji: "🏬", title: "Retail & E-commerce", desc: "Personalization engines, inventory optimization, and customer behavior analytics to maximize revenue." },
  { emoji: "💻", title: "Technology & SaaS", desc: "Product analytics, user behavior modeling, and AI-powered feature development to accelerate innovation." },
  { emoji: "🏦", title: "Financial Services", desc: "Risk modeling, fraud detection, and algorithmic trading solutions powered by advanced analytics." },
  { emoji: "🏭", title: "Manufacturing", desc: "Predictive maintenance, quality control automation, and supply chain intelligence for operational excellence." },
];

export default function ServicesNewPage() {
  return (
    <>
      <HeroPage
        label="Services"
        title={<>Turn Data Into <span className="gradient-text">Measurable Business Value</span></>}
        description="AI-powered solutions to accelerate your digital transformation"
      />

      {/* What We Do */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="What We Do"
              title={<>End-to-end Solutions Powered by <span className="gradient-text">AI, Data & Expertise</span></>}
            />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 gap-6" stagger={100}>
            {services.map((s, i) => (
              <TiltCard key={i} className="reveal-item glass-card p-7">
                <div className="feature-icon"><s.icon className="w-6 h-6 text-accent" /></div>
                <h3 className="font-poppins font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            ))}
          </RevealGrid>
        </div>
      </section>

      {/* Why Choose AKcelerate */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="Differentiators"
              title={<>Why Choose <span className="gradient-text">AKcelerate?</span></>}
              description="What sets us apart in AI and data transformation"
            />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={80}>
            {whyCards.map((c, i) => (
              <TiltCard key={i} className="reveal-item glass-card p-6 text-center">
                <div className="feature-icon mx-auto"><c.icon className="w-6 h-6 text-accent" /></div>
                <h3 className="font-poppins font-semibold mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm">{c.desc}</p>
              </TiltCard>
            ))}
          </RevealGrid>
        </div>
      </section>

      {/* Industry-Focused Solutions */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="Industries"
              title={<>Industry-Focused <span className="gradient-text">Solutions</span></>}
              description="Tailored AI and data solutions for your industry"
            />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={80}>
            {industrySolutions.map((ind, i) => (
              <TiltCard key={i} className="reveal-item glass-card p-7">
                <span className="text-2xl mb-3 block">{ind.emoji}</span>
                <h3 className="font-poppins font-semibold mb-2">{ind.title}</h3>
                <p className="text-muted-foreground text-sm">{ind.desc}</p>
              </TiltCard>
            ))}
          </RevealGrid>
        </div>
      </section>

      <CTASection
        title="Ready to Transform Your Business with AI?"
        description="Book a consultation to discover how we can turn your data into measurable business value."
        primaryCta={{ label: "Book Free Audit", to: "/free-audit" }}
        secondaryCta={{ label: "Contact Us", to: "/contact" }}
        dark
      />
    </>
  );
}
