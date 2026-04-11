import { useParams, Link } from "react-router-dom";

import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import StatsRow from "@/components/StatsRow";
import { SolutionCard } from "@/components/Cards";
import { getSolution, solutions } from "@/data/solutions";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

export default function SolutionDetailPage() {
  const { slug } = useParams();
  const solution = getSolution(slug || "");

  if (!solution) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="font-poppins font-bold text-4xl mb-4">Solution Not Found</h1>
          <Link to="/solutions" className="btn-primary">View All Solutions</Link>
        </div>
      </div>
    );
  }

  const related = solutions.filter(s => s.slug !== solution.slug).slice(0, 7);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center pt-24 pb-16 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 hero-grid-bg" />
        <div className="absolute -top-[200px] -left-[200px] w-[700px] h-[700px] rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(37,99,235,0.07)" }} />
        <div className="absolute -bottom-[150px] -right-[100px] w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(6,182,212,0.07)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="hero-badge mb-5">
              <span className="w-2 h-2 rounded-full bg-accent inline-block" />
              {solution.title}
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 font-poppins">
              {solution.heroTitle}<br />
              <span className="hero-gradient-text">{solution.heroSubtitle}</span>
            </h1>
            <p className="text-lg mb-8 leading-relaxed max-w-xl" style={{ color: "hsl(var(--ak-body))" }}>
              {solution.description}
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/contact" className="btn-primary">
                <Phone className="w-4 h-4" /> Get a Free Consultation
              </Link>
              <Link to="/case-studies" className="btn-secondary">View Case Studies <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {solution.tags.map(tag => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 border-t border-b border-border" style={{ background: "var(--section-alt, hsl(var(--muted)/0.3))" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsRow stats={solution.stats} />
        </div>
      </section>

      {/* Services / What We Offer */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="What We Offer"
              title={<>Our <span className="gradient-text">{solution.title}</span> Services</>}
              description="Comprehensive, end-to-end solutions tailored to your business needs — from strategy to deployment."
            />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={80}>
            {solution.services.map((s, i) => (
              <div key={i} className="reveal-item glass-card p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{
                  background: `linear-gradient(135deg, rgba(37,99,235,0.12), rgba(6,182,212,0.05))`,
                  border: "1px solid rgba(37,99,235,0.2)"
                }}>
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-poppins font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="How We Work"
              title={<>A Structured, Proven Approach That <span className="gradient-text">Delivers Results</span> — Fast</>}
            />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={100}>
            {solution.process.map((p) => (
              <div key={p.step} className="reveal-item glass-card p-6 text-center">
                <div className="process-number mx-auto mb-4">{p.step}</div>
                <h3 className="font-poppins font-semibold mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.description}</p>
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
              title={<>Built for <span className="gradient-text">Every Industry</span></>}
              description={`Our ${solution.title} expertise spans 13+ industry verticals — from startups to enterprises.`}
            />
          </RevealSection>
          <div className="flex flex-wrap justify-center gap-3">
            {solution.industries.map((ind) => (
              <span key={ind} className="px-5 py-2.5 rounded-full text-sm font-medium glass-card">{ind}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <RevealSection>
        <div className="py-20 lg:py-28 section-alt">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Let's discuss how our {solution.title} solutions can transform your business. Free consultation, no commitment.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary">Book Free Consultation</Link>
              <Link to="/free-audit" className="btn-secondary">Free Business Audit</Link>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Other Solutions */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="Explore" title={<>Other <span className="gradient-text">Solutions</span></>} />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={80}>
            {related.map(s => (
              <div key={s.slug} className="reveal-item">
                <SolutionCard slug={s.slug} title={s.shortTitle} description={s.description} icon={s.icon} />
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <CTASection
        title="Book Your Free Business Audit"
        description="In 60 minutes, our experts map your systems, identify automation opportunities, assess your AI readiness, and deliver a written roadmap — at zero cost."
        primaryCta={{ label: "Free Business Audit", to: "/free-audit" }}
        secondaryCta={{ label: "Contact Us", to: "/contact" }}
        dark
      />
    </>
  );
}
