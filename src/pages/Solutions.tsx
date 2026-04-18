import { HeroPage } from "@/components/Hero";
import SEOHead from "@/components/SEOHead";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { SolutionCard } from "@/components/Cards";
import StatsRow from "@/components/StatsRow";
import { solutions } from "@/data/solutions";
import { industries } from "@/data/industries";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

export default function SolutionsPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "AKcelerate Solutions",
      description: "8 specialized AI and digital solution areas.",
      url: "https://akcelerate.lovable.app/solutions",
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: solutions.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://akcelerate.lovable.app/solutions/${s.slug}`,
        name: s.title,
      })),
    },
  ];
  return (
    <>
      <SEOHead
        title="Solutions"
        description="8 specialized AI and digital solution areas designed to drive measurable business growth."
        path="/solutions"
        jsonLd={jsonLd}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions" }]}
      />
      <HeroPage
        label="Solutions"
        title={<>Comprehensive <span className="gradient-text">AI & Digital Solutions</span></>}
        description="8 specialized solution areas designed to drive measurable business growth across every function."
      />

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="Why Choose Us"
              title={<>End-to-End <span className="gradient-text">Digital Transformation</span></>}
              description="From strategy to execution, we deliver solutions that generate measurable ROI."
            />
          </RevealSection>
          <RevealSection delay={200}>
            <StatsRow stats={[
              { value: "50+", label: "Projects Delivered" },
              { value: "315%", label: "Average ROI" },
              { value: "92%", label: "Client Retention" },
              { value: "13+", label: "Industries" },
            ]} />
          </RevealSection>
        </div>
      </section>

      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="Solution Areas"
              title={<>8 Ways We Drive <span className="gradient-text">Growth</span></>}
              description="Each solution area is backed by deep domain expertise and proven methodologies."
            />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={80}>
            {solutions.map(s => (
              <div key={s.slug} className="reveal-item">
                <SolutionCard slug={s.slug} title={s.title} description={s.description} icon={s.icon} />
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="Industries"
              title={<>Cross-Industry <span className="gradient-text">Expertise</span></>}
            />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-5" stagger={80}>
            {industries.map((ind, i) => (
              <div key={i} className="reveal-item glass-card p-6">
                <h3 className="font-poppins font-semibold mb-2">{ind.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{ind.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {ind.useCases.map((u, j) => (
                    <span key={j} className="tag-pill">{u}</span>
                  ))}
                </div>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <CTASection
        title="Ready to Transform Your Business?"
        description="Let's discuss which solutions can drive the most impact for your organization."
        primaryCta={{ label: "Book Free Audit", to: "/free-audit" }}
        secondaryCta={{ label: "View Pricing", to: "/pricing" }}
        dark
      />
    </>
  );
}
