import { useParams, Link } from "react-router-dom";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import StatsRow from "@/components/StatsRow";
import { getService, services } from "@/data/services";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getService(slug || "");

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="font-poppins font-bold text-4xl mb-4">Service Not Found</h1>
          <Link to="/services" className="btn-primary">View All Services</Link>
        </div>
      </div>
    );
  }

  const otherServices = services.filter(s => s.slug !== service.slug);

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
              {service.title}
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 font-poppins">
              {service.heroTitle}<br />
              <span className="hero-gradient-text">{service.heroSubtitle}</span>
            </h1>
            <p className="text-lg mb-8 leading-relaxed max-w-xl" style={{ color: "hsl(var(--ak-body))" }}>
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/contact" className="btn-primary">
                <Phone className="w-4 h-4" /> Get a Free Consultation
              </Link>
              <Link to="/case-studies" className="btn-secondary">View Case Studies <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {service.tags.map(tag => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 border-t border-b border-border" style={{ background: "var(--section-alt, hsl(var(--muted)/0.3))" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsRow stats={service.results.map(r => ({ value: r.metric, label: r.label }))} />
        </div>
      </section>

      {/* Services / Features */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="Capabilities"
              title={<>How Our AI Monitors <span className="gradient-text">Your Operations</span></>}
              description={`A complete ${service.title.toLowerCase()} stack — from raw data to actionable insights.`}
            />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={80}>
            {service.serviceDetails.map((s, i) => (
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

      {/* Implementation Timeline */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="Implementation"
              title={<><span className="gradient-text">{service.timelineTitle}</span></>}
            />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={100}>
            {service.process.map((p) => (
              <div key={p.step} className="reveal-item glass-card p-6">
                <div className="process-number mb-4">{p.step}</div>
                <h3 className="font-poppins font-semibold mb-1">{p.title}</h3>
                <p className="text-muted-foreground text-sm mb-2">{p.description}</p>
                <span className="text-xs text-accent font-medium">{p.duration}</span>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="Technology" title={<>Stack That Powers <span className="gradient-text">{service.title}</span></>} description="Best-in-class tools paired with proven methodology — delivering measurable outcomes across every engagement." />
          </RevealSection>
          <div className="flex flex-wrap justify-center gap-3">
            {service.techStack.map(t => (
              <span key={t} className="px-5 py-2.5 rounded-full text-sm font-medium glass-card">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="Explore" title={<>Other AI <span className="gradient-text">Solutions</span></>} />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-3 gap-6" stagger={100}>
            {otherServices.map(s => (
              <div key={s.slug} className="reveal-item">
                <Link to={`/services/${s.slug}`} className="glass-card p-6 block hover:border-primary/30">
                  <h3 className="font-poppins font-semibold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.description.slice(0, 120)}...</p>
                </Link>
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
