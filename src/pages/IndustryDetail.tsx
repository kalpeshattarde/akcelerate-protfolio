import { useParams, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { HeroPage } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import RelatedLinks from "@/components/RelatedLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CheckCircle } from "lucide-react";
import { getIndustry } from "@/data/industries";
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";
import { blogPosts } from "@/data/blog";
import type { RelatedLink } from "@/components/RelatedLinks";

function tagsFor(text: string): string[] {
  return text.toLowerCase().match(/[a-z]+/g) || [];
}
function score(a: string[], b: string[]): number {
  const set = new Set(a);
  return b.reduce((n, w) => (set.has(w) ? n + 1 : n), 0);
}

export default function IndustryDetailPage() {
  const { slug } = useParams();
  const industry = getIndustry(slug || "");

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="font-poppins font-bold text-4xl mb-4">Industry Not Found</h1>
          <Link to="/industries" className="btn-primary">View All Industries</Link>
        </div>
      </div>
    );
  }

  const tags = tagsFor(`${industry.name} ${industry.description} ${industry.useCases.join(" ")}`);
  const relatedServices: RelatedLink[] = [...services]
    .map(s => ({ s, n: score(tags, tagsFor(`${s.title} ${s.description} ${s.features.join(" ")}`)) }))
    .sort((a, b) => b.n - a.n).slice(0, 3)
    .map(x => ({ to: `/services/${x.s.slug}`, title: x.s.title, description: x.s.description, meta: "Service" }));

  const relatedSolutions: RelatedLink[] = [...solutions]
    .map(s => ({ s, n: score(tags, tagsFor(`${s.title} ${s.description} ${s.industries.join(" ")} ${s.features.join(" ")}`)) }))
    .sort((a, b) => b.n - a.n).slice(0, 3)
    .map(x => ({ to: `/solutions/${x.s.slug}`, title: x.s.title, description: x.s.description, meta: "Solution" }));

  const relatedBlog: RelatedLink[] = [...blogPosts]
    .map(p => ({ p, n: score(tags, tagsFor(`${p.title} ${p.description} ${p.category}`)) }))
    .sort((a, b) => b.n - a.n).slice(0, 3)
    .map(x => ({ to: `/blog/${x.p.slug}`, title: x.p.title, description: x.p.description, meta: x.p.category }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `AI & Data Solutions for ${industry.name}`,
    description: industry.description,
    provider: { "@type": "Organization", name: "AKcelerate" },
    areaServed: industry.name,
    serviceType: industry.useCases,
  };

  return (
    <>
      <SEOHead
        title={`${industry.name} — AI & Data Solutions`}
        description={industry.description}
        path={`/industries/${industry.slug}`}
        jsonLd={jsonLd}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${industry.slug}` },
        ]}
      />
      <HeroPage label="Industry" title={<><span className="gradient-text">{industry.name}</span></>} description={industry.description} />

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Use Cases" title={<>Where We <span className="gradient-text">Deliver Value</span></>} />
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {industry.useCases.map((u, i) => (
              <div key={i} className="glass-card p-6 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{u}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedLinks label="Services" title={`Services for ${industry.name}`} items={relatedServices} kind="service" alt />
      <RelatedLinks label="Solutions" title="Recommended Solutions" items={relatedSolutions} kind="solution" />
      <RelatedLinks label="Insights" title="Industry Articles" items={relatedBlog} kind="blog" alt />

      <CTASection
        title={`Ready to Transform ${industry.name}?`}
        description="Book a free consultation tailored to your sector."
        primaryCta={{ label: "Book Free Audit", to: "/free-audit" }}
        secondaryCta={{ label: "Contact Us", to: "/contact" }}
        dark
      />
    </>
  );
}
