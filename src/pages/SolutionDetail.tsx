import { useParams, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { HeroPage } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import StatsRow from "@/components/StatsRow";
import { SolutionCard } from "@/components/Cards";
import { getSolution, solutions } from "@/data/solutions";
import { CheckCircle } from "lucide-react";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedToSolution } from "@/lib/relatedContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildSolutionBreadcrumbs, visibleSolutionBreadcrumbs } from "@/lib/solutionBreadcrumbs";

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

  // Canonical solution order (matches navbar + sitemap ordering).
  const CANONICAL_ORDER = [
    "automation-systems",
    "ai-ml",
    "automated-analytics",
    "cloud-devops",
    "website-dev",
    "saas-dev",
    "consulting",
    "mvp-21day",
  ];

  // Build related list: keep only currently-registered slugs, dedupe,
  // and back-fill from the canonical order so every page shows exactly 3.
  const validSlugs = new Set(solutions.map((s) => s.slug));
  const seen = new Set<string>([solution.slug]);
  const orderedRelated: string[] = [];
  for (const s of solution.relatedSlugs) {
    if (validSlugs.has(s) && !seen.has(s)) {
      seen.add(s);
      orderedRelated.push(s);
    }
  }
  for (const s of CANONICAL_ORDER) {
    if (orderedRelated.length >= 3) break;
    if (validSlugs.has(s) && !seen.has(s)) {
      seen.add(s);
      orderedRelated.push(s);
    }
  }
  const related = orderedRelated
    .slice(0, 3)
    .map((s) => solutions.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const cross = relatedToSolution(solution.slug);

  // Per-solution FAQ derived from the data so every page ships a FAQPage
  // schema. Generic enough to be safe; specific enough to be useful.
  const solutionFaq = [
    {
      question: `What does AKcelerate's ${solution.title} include?`,
      answer: `Our ${solution.title} engagement covers ${solution.features.slice(0, 4).join(", ")} and more, delivered end-to-end by a senior team.`,
    },
    {
      question: `How long does a ${solution.shortTitle} project take?`,
      answer: `Most ${solution.shortTitle} projects move from discovery to production in 3–8 weeks depending on scope. We share a fixed-timeline proposal after the free audit call.`,
    },
    {
      question: `Which industries do you deliver ${solution.shortTitle} for?`,
      answer: `We've shipped ${solution.shortTitle} work for ${solution.industries.join(", ")}.`,
    },
    {
      question: `What outcomes can I expect from ${solution.title}?`,
      answer: solution.benefits
        .map((b) => `${b.title}: ${b.metric} ${b.metricLabel}.`)
        .join(" "),
    },
  ];

  const solutionJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "AKcelerate",
      url: "https://akcelerate.lovable.app",
      logo: "https://akcelerate.lovable.app/images/logo-800x800.svg",
      sameAs: ["https://www.linkedin.com/company/akcelerate"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${solution.title} — AKcelerate Solutions`,
      description: solution.description,
      url: `https://akcelerate.lovable.app/solutions/${slug}`,
      isPartOf: {
        "@type": "CollectionPage",
        name: "AKcelerate Solutions",
        url: "https://akcelerate.lovable.app/solutions",
      },
      about: {
        "@type": "Thing",
        name: solution.title,
        description: solution.description,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${solution.title} Capabilities`,
      itemListElement: solution.features.map((f, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: f,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: solutionFaq.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: { "@type": "Answer", text: q.answer },
      })),
    },
  ];

  return (
    <>
      <SEOHead
        title={solution.title}
        description={solution.description}
        path={`/solutions/${slug}`}
        jsonLd={solutionJsonLd}
        breadcrumbs={buildSolutionBreadcrumbs(slug)}
      />
      <Breadcrumbs items={visibleSolutionBreadcrumbs(slug)} />
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
