import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, type LucideIcon } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { HeroPage } from "@/components/Hero";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import { SectionHeader } from "@/components/SectionHeader";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { detectIntent, getIntentCopy } from "@/lib/intentDetection";
import type { FAQItem } from "@/data/faq";

interface LandingTemplateProps {
  /** SEO + hero */
  seo: {
    title: string;
    description: string;
    path: string;
    jsonLd: object[];
    breadcrumbs: { name: string; path: string }[];
  };
  hero: {
    label: string;
    title: ReactNode;
    description: string;
  };
  /** Hero image (lazy import) */
  heroImage: { src: string; alt: string };
  /** Optional showcase section rendered between hero and problem grid */
  showcase?: ReactNode;
  /** Problem grid */
  problem: {
    label?: string;
    title: ReactNode;
    description: string;
    items: string[];
    icon: LucideIcon;
  };
  /** Approach + deliverables 2-col block */
  approach: { title: string; items: string[] };
  deliverables: { title: string; items: string[]; ctaLabel: string; ctaTo: string };
  /** FAQ */
  faq?: { title: string; items: FAQItem[] };
  /** Final CTA */
  finalCta: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryTo: string;
    secondaryLabel?: string;
    secondaryTo?: string;
  };
}

export default function LandingTemplate({
  seo,
  hero,
  heroImage,
  showcase,
  problem,
  approach,
  deliverables,
  faq,
  finalCta,
}: LandingTemplateProps) {
  const intent = detectIntent();
  const copy = getIntentCopy(intent);
  const ProblemIcon = problem.icon;

  return (
    <>
      <SEOHead
        title={seo.title}
        description={seo.description}
        path={seo.path}
        jsonLd={seo.jsonLd}
        breadcrumbs={seo.breadcrumbs}
      />

      {/* Intent-aware hero */}
      <HeroPage
        label={intent !== "default" ? copy.badge : hero.label}
        title={hero.title}
        description={intent !== "default" ? copy.subheadline : hero.description}
      />

      {/* Hero image band */}
      <section className="pb-16 -mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl">
              <img
                src={heroImage.src}
                alt={heroImage.alt}
                width={1280}
                height={896}
                className="w-full h-auto block"
              />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(15,23,42,0) 60%, rgba(15,23,42,0.35) 100%)" }} />
            </div>
            {/* Intent-aware CTA row directly under hero image */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to={copy.ctaPrimary.to} className="btn-primary">
                {copy.ctaPrimary.label} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to={copy.ctaSecondary.to} className="btn-secondary">
                {copy.ctaSecondary.label}
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {showcase}

      {/* Problem grid */}
      <section className="py-24 lg:py-32 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label={problem.label ?? "The Problem"} title={problem.title} description={problem.description} />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto" stagger={80}>
            {problem.items.map((p) => (
              <div key={p} className="reveal-item glass-card p-5 flex items-start gap-3">
                <ProblemIcon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{p}</span>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      {/* Approach + Deliverables */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <RevealSection>
            <h2 className="font-poppins font-bold text-3xl mb-5">{approach.title}</h2>
            <ul className="space-y-3">
              {approach.items.map((a) => (
                <li key={a} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  {a}
                </li>
              ))}
            </ul>
          </RevealSection>
          <RevealSection delay={150}>
            <h2 className="font-poppins font-bold text-3xl mb-5">{deliverables.title}</h2>
            <ul className="space-y-3">
              {deliverables.items.map((d) => (
                <li key={d} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  {d}
                </li>
              ))}
            </ul>
            <Link to={deliverables.ctaTo} className="btn-primary mt-8 inline-flex">
              {deliverables.ctaLabel} <ArrowRight className="w-4 h-4" />
            </Link>
          </RevealSection>
        </div>
      </section>

      {faq && <FAQAccordion title={faq.title} items={faq.items} />}

      <CTASection
        title={finalCta.title}
        description={finalCta.description}
        primaryCta={{ label: finalCta.primaryLabel, to: finalCta.primaryTo }}
        secondaryCta={finalCta.secondaryLabel && finalCta.secondaryTo ? { label: finalCta.secondaryLabel, to: finalCta.secondaryTo } : undefined}
        dark
      />
    </>
  );
}
