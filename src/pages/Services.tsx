import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { ServiceCard } from "@/components/Cards";
import { services } from "@/data/services";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { Database, BarChart3, Monitor, Settings, ArrowRight, Phone } from "lucide-react";
import FloatingOrbs from "@/components/FloatingOrbs";
import HeroParticles from "@/components/HeroParticles";
import { TiltCard } from "@/hooks/useTiltCard";
import VizCanvas from "@/components/viz/VizCanvas";

const coreCapabilities = [
  { icon: Database, title: "Data Integration", desc: "Connect and harmonize data from every business system into a unified data layer without disrupting operations." },
  { icon: BarChart3, title: "Advanced Analytics & AI", desc: "Deploy enterprise-grade machine learning models trained on your business data for maximum predictive accuracy and actionable insights." },
  { icon: Monitor, title: "Operational Intelligence", desc: "Real-time dashboards and KPI monitoring that give every stakeholder — from frontline teams to C-suite — actionable visibility." },
  { icon: Settings, title: "Custom AI & MLOps", desc: "Build, deploy, and maintain production-grade AI models tuned to your business data — with MLOps pipelines for continuous learning and model governance." },
];

const processSteps = [
  { num: 1, title: "Data Discovery", desc: "We audit your existing business systems, data sources, and processes. Our team identifies gaps and opportunities, mapping the technical landscape needed to deliver real business outcomes." },
  { num: 2, title: "Data Integration", desc: "Our engineers connect your existing tools — CRMs, ERPs, databases, APIs, and third-party platforms — using pre-built connectors and custom ETL pipelines, building a unified data layer." },
  { num: 3, title: "Analytics Modeling", desc: "Our data scientists build and validate machine learning models trained on your historical production data — tailored to your specific equipment, processes, and quality standards." },
  { num: 4, title: "Dashboard Deployment", desc: "We deploy role-specific operational dashboards and executive KPI views. Every stakeholder sees precisely what they need to drive decisions faster." },
  { num: 5, title: "Optimization & Support", desc: "Ongoing model retraining, new use case development, and dedicated support ensure the platform keeps delivering value as your business evolves." },
];

const techCategories = [
  { name: "AI & Machine Learning", items: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "Hugging Face"] },
  { name: "Cloud & Infrastructure", items: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform"] },
  { name: "Data & Analytics", items: ["Power BI", "Tableau", "Apache Kafka", "Snowflake", "dbt", "Airflow"] },
  { name: "Development", items: ["React", "Node.js", "TypeScript", "PostgreSQL", "GraphQL", "REST APIs"] },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center pt-24 pb-16 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <HeroParticles />
        <FloatingOrbs />
        <VizCanvas mode="services" className="opacity-40" />
        <div className="absolute inset-0 hero-grid-bg" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="hero-badge mb-5">
              <span className="w-2 h-2 rounded-full bg-accent inline-block" />
              Our Platform
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 font-poppins">
              Strategy to Delivery —<br />
              <span className="shimmer-text">Everything AI & Automation</span>
            </h1>
            <p className="text-lg mb-8 leading-relaxed max-w-xl" style={{ color: "hsl(var(--ak-body))" }}>
              We don't just consult — we build. From custom AI systems and automation to SaaS platforms and cloud infrastructure, we handle the full delivery lifecycle.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary"><Phone className="w-4 h-4" /> Book a Consultation</Link>
              <Link to="/case-studies" className="btn-secondary">View Case Studies <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="Core Capabilities" title={<>Every Capability Working Together to Drive <span className="gradient-text">End-to-End Digital Transformation</span></>} />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={100}>
            {coreCapabilities.map((c, i) => (
              <TiltCard key={i} className="reveal-item glass-card p-8 h-full">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{
                  background: "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(6,182,212,0.05))",
                  border: "1px solid rgba(37,99,235,0.2)"
                }}>
                  <c.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-poppins font-semibold text-lg mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              </TiltCard>
            ))}
          </RevealGrid>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="Services" title={<>Our <span className="gradient-text">Service Areas</span></>} description="Specialized services designed for industrial and enterprise applications." />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 gap-6" stagger={120}>
            {services.map(s => (
              <div key={s.slug} className="reveal-item">
                <ServiceCard slug={s.slug} title={s.title} description={s.description} />
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      {/* Technology */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="Technology Stack" title={<>Full-Stack <span className="gradient-text">Technology Coverage</span></>} description="Every service is powered by the latest enterprise-grade tools — no vendor lock-in, always the best fit for your goals." />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={100}>
            {techCategories.map((c, i) => (
              <TiltCard key={i} className="reveal-item glass-card p-8 h-full">
                <h3 className="font-poppins font-semibold mb-4">{c.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {c.items.map(t => (
                    <span key={t} className="tag-pill">{t}</span>
                  ))}
                </div>
              </TiltCard>
            ))}
          </RevealGrid>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="How We Work" title={<>From Data Discovery to <span className="gradient-text">Continuous Optimization</span></>} description="Our proven 5-step implementation methodology ensures rapid time-to-value with minimal operational disruption." />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-5 gap-6" stagger={100}>
            {processSteps.map((s) => (
              <div key={s.num} className="reveal-item text-center">
                <div className="process-number mx-auto mb-4">{s.num}</div>
                <h3 className="font-poppins font-semibold text-sm mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <CTASection
        title="Ready to Start Your AI Transformation?"
        description="Book a free discovery call and we'll map out exactly which services fit your business goals, budget, and timeline."
        primaryCta={{ label: "Book Free Audit", to: "/free-audit" }}
        secondaryCta={{ label: "View Pricing", to: "/pricing" }}
        dark
      />
    </>
  );
}
