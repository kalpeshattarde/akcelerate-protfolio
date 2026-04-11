import { useParams, Link } from "react-router-dom";
import { HeroPage } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import StatsRow from "@/components/StatsRow";
import { getService } from "@/data/services";
import { CheckCircle } from "lucide-react";

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

  return (
    <>
      <HeroPage label="Services" title={<><span className="gradient-text">{service.title}</span></>} description={service.description} />

      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsRow stats={service.results} />
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Capabilities" title={<>What's <span className="gradient-text">Included</span></>} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.features.map((f, i) => (
              <div key={i} className="glass-card p-6 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Benefits" title={<>Key <span className="gradient-text">Benefits</span></>} />
          <div className="grid md:grid-cols-3 gap-6">
            {service.benefits.map((b, i) => (
              <div key={i} className="glass-card p-7">
                <div className="stat-number text-3xl mb-2">{b.metric}</div>
                <div className="text-accent text-sm font-medium mb-3">{b.metricLabel}</div>
                <h3 className="font-poppins font-semibold mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Timeline" title={<>Implementation <span className="gradient-text">Timeline</span></>} />
          <div className="max-w-3xl mx-auto space-y-4">
            {service.process.map((p) => (
              <div key={p.step} className="glass-card p-6 flex items-start gap-4">
                <div className="process-number flex-shrink-0">{p.step}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-poppins font-semibold">{p.title}</h3>
                    <span className="text-xs text-accent font-medium">{p.duration}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Technology" title={<>Tech <span className="gradient-text">Stack</span></>} />
          <div className="flex flex-wrap justify-center gap-3">
            {service.techStack.map(t => (
              <span key={t} className="px-5 py-2.5 rounded-full text-sm font-medium glass-card">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={`Ready for ${service.title}?`}
        description="Book a free consultation and let's discuss how to implement this for your business."
        primaryCta={{ label: "Book Free Audit", to: "/free-audit" }}
        secondaryCta={{ label: "Contact Us", to: "/contact" }}
        dark
      />
    </>
  );
}
