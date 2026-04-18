import { useParams, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { HeroPage } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import StatsRow from "@/components/StatsRow";
import { SolutionCard } from "@/components/Cards";
import { getSolution, solutions } from "@/data/solutions";
import { ArrowRight, CheckCircle } from "lucide-react";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedToSolution } from "@/lib/relatedContent";

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

  const related = solution.relatedSlugs.map(s => solutions.find(x => x.slug === s)).filter(Boolean);
  const cross = relatedToSolution(solution.slug);

  const solutionJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.title,
    description: solution.description,
    provider: { "@type": "Organization", name: "AKcelerate" },
    serviceType: solution.features?.slice(0, 5),
    areaServed: solution.industries,
  };

  return (
    <>
      <SEOHead
        title={solution.title}
        description={solution.description}
        path={`/solutions/${slug}`}
        jsonLd={solutionJsonLd}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: solution.title, path: `/solutions/${slug}` },
        ]}
      />
      <HeroPage
        label="Solutions"
        title={<><span className="gradient-text">{solution.title}</span></>}
        description={solution.description}
      />

      {/* Benefits */}
      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsRow stats={solution.benefits.map(b => ({ value: b.metric, label: b.metricLabel }))} />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Capabilities" title={<>What's <span className="gradient-text">Included</span></>} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {solution.features.map((f, i) => (
              <div key={i} className="glass-card p-6 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Detail */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Benefits" title={<>Why Choose This <span className="gradient-text">Solution</span></>} />
          <div className="grid md:grid-cols-3 gap-6">
            {solution.benefits.map((b, i) => (
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

      {/* Process */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Process" title={<>How We <span className="gradient-text">Deliver</span></>} />
          <div className="grid md:grid-cols-5 gap-6">
            {solution.process.map((p) => (
              <div key={p.step} className="text-center">
                <div className="process-number mx-auto mb-4">{p.step}</div>
                <h3 className="font-poppins font-semibold mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Industries" title={<>Industries We <span className="gradient-text">Serve</span></>} />
          <div className="flex flex-wrap justify-center gap-3">
            {solution.industries.map((ind) => (
              <span key={ind} className="px-5 py-2.5 rounded-full text-sm font-medium glass-card">{ind}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Related" title={<>Explore Related <span className="gradient-text">Solutions</span></>} />
            <div className="grid md:grid-cols-3 gap-6">
              {related.map(s => s && <SolutionCard key={s.slug} slug={s.slug} title={s.title} description={s.description} icon={s.icon} />)}
            </div>
          </div>
        </section>
      )}

      <RelatedLinks label="Services" title="Specialized Services for This Solution" items={cross.services} kind="service" alt />
      <RelatedLinks label="Insights" title="Further Reading" items={cross.blog} kind="blog" />
      <CTASection
        title={`Ready to Get Started with ${solution.title}?`}
        description="Book a free consultation and let's discuss how this solution can transform your business."
        primaryCta={{ label: "Book Free Audit", to: "/free-audit" }}
        secondaryCta={{ label: "Contact Us", to: "/contact" }}
        dark
      />
    </>
  );
}
