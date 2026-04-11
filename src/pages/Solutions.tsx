import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { SolutionCard } from "@/components/Cards";
import { solutions } from "@/data/solutions";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { Zap, Target, Clock, Brain, Unlock, Building2 } from "lucide-react";
import { AnimatedStat } from "@/hooks/useCountUp";
import { TiltCard } from "@/hooks/useTiltCard";

const whyCards = [
  { icon: Zap, title: "End-to-End AI Delivery", desc: "From AI strategy and prototype to production deployment — we own the full lifecycle, not just advisory slides." },
  { icon: Target, title: "Measurable ROI — Guaranteed", desc: "Every engagement comes with clear success metrics. We define KPIs upfront and track them through delivery." },
  { icon: Clock, title: "Fast Time to Value", desc: "Our agile delivery model means most clients see working prototypes in 2–4 weeks, not months." },
  { icon: Brain, title: "Deep Domain Expertise", desc: "Our team brings expertise in AI, data engineering, cloud, and business operations — across 13+ industries." },
  { icon: Unlock, title: "No Lock-In Philosophy", desc: "We build on open standards and hand over full ownership of IP, code, models, and documentation. You own everything." },
  { icon: Building2, title: "Startup to Enterprise Scale", desc: "Whether you're a 3-person startup or a 5000-person enterprise, our solutions are sized and priced for you." },
];

const solutionDescriptions: Record<string, string> = {
  "business-automation": "Eliminate repetitive work and unlock growth by automating your most time-consuming business processes.",
  "ai-ml": "Build custom AI systems, intelligent agents, and machine learning models that solve real business problems.",
  "business-consulting": "Strategic advisory that bridges the gap between technology capability and real business outcomes.",
  "saas-dev": "Premium websites, SaaS platforms, startup MVPs, and enterprise applications built for performance and scale.",
  "automated-analytics": "Automate your reporting and analytics pipelines so insights arrive automatically — without manual effort.",
  "data-visualization": "Turn raw numbers into clear, compelling, interactive visuals that make decisions faster and more confident.",
  "cloud-devops": "Design, migrate, and optimize cloud infrastructure that's secure, scalable, and cost-effective.",
  "mlops": "Move from one-off models to production AI — with robust pipelines, monitoring, and continuous improvement.",
};

export default function SolutionsPage() {
  return (
    <>
      {/* Hero — centered text, matching source exactly */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)", paddingTop: "6rem", paddingBottom: "4rem" }}>
        <div className="absolute inset-0 hero-grid-bg" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="section-label">Our Solutions</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-poppins">
            8 Solution Areas. <span className="hero-anim-gradient">Infinite Possibilities.</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "hsl(var(--ak-body))" }}>
            From building AI systems and automating business operations to developing SaaS products and delivering data-driven insights — we cover the full stack of digital transformation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary text-base px-8 py-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              Book a Consultation
            </Link>
            <Link to="/case-studies" className="btn-secondary text-base px-8 py-4">View Case Studies</Link>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Stats Bar — matching source */}
      <section className="section-alt py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "25+", label: "Projects Delivered" },
              { value: "13+", label: "Industries Served" },
              { value: "8", label: "Solution Areas" },
              { value: "315%", label: "Average Client ROI" },
            ].map((s, i) => (
              <div key={i}>
                <div className="stat-number text-4xl mb-1"><AnimatedStat value={s.value} /></div>
                <div className="text-sm text-muted-foreground font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Why Choose AKcelerate */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="Why AKcelerate"
              title={<>Why Businesses Choose <span className="gradient-text">AKcelerate</span></>}
              description="We deliver measurable impact across AI, automation, analytics, and software — tailored to your industry and goals."
            />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={80}>
            {whyCards.map((c, i) => (
              <div key={i} className="reveal-item">
                <TiltCard className="glass-card p-8 h-full">
                  <div className="feature-icon mb-4"><c.icon className="w-5 h-5 text-accent" /></div>
                  <h3 className="font-poppins font-semibold mb-2">{c.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
                </TiltCard>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      {/* Complete Business Transformation - 8 Solutions */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="Solution Areas"
              title={<>Complete Business <span className="gradient-text">Transformation</span></>}
              description="Each solution area is a complete service offering — strategy, design, build, and ongoing support."
            />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={80}>
            {solutions.map(s => (
              <div key={s.slug} className="reveal-item">
                <SolutionCard slug={s.slug} title={s.shortTitle} description={solutionDescriptions[s.slug] || s.description} icon={s.icon} />
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="Industries"
              title={<>Industries We <span className="gradient-text">Transform</span></>}
              description="Delivering AI, automation and data solutions across 12 verticals"
            />
          </RevealSection>
          <div className="flex flex-wrap justify-center gap-3">
            {["Manufacturing", "Healthcare", "Startups", "MSME", "Retail & E-commerce", "FinTech", "Education", "Logistics", "Brands & Marketing", "AdTech", "Telecom", "Automotive"].map(ind => (
              <span key={ind} className="px-5 py-2.5 rounded-full text-sm font-medium glass-card hover:border-primary/30 transition-all cursor-default">{ind}</span>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Transform Your Business?"
        description="Book a free strategy consultation and discover exactly which solution areas will deliver the most impact for your business."
        primaryCta={{ label: "Book Free Audit", to: "/free-audit" }}
        secondaryCta={{ label: "Contact Us", to: "/contact" }}
        dark
      />
    </>
  );
}
