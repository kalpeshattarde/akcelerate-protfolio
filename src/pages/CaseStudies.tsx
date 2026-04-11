import { HeroPage } from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { caseStudies } from "@/data/industries";

export default function CaseStudiesPage() {
  return (
    <>
      <HeroPage label="Case Studies" title={<>Real Results, <span className="gradient-text">Real Impact</span></>} description="See how we've delivered measurable growth for businesses across industries." />
      <section className="py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((c, i) => (
            <div key={i} className="glass-card p-7">
              <span className="text-xs font-medium text-accent mb-2 block">{c.industry}</span>
              <h3 className="font-poppins font-semibold text-xl mb-3">{c.title}</h3>
              <p className="text-muted-foreground text-sm mb-5">{c.description}</p>
              <div className="grid grid-cols-3 gap-3">{c.metrics.map((m, j) => <div key={j} className="text-center"><div className="stat-number text-xl">{m.value}</div><div className="text-xs text-muted-foreground">{m.label}</div></div>)}</div>
            </div>
          ))}
        </div>
      </div></section>
      <CTASection title="Want Results Like These?" description="Book a free audit and discover what's possible for your business." primaryCta={{ label: "Book Free Audit", to: "/free-audit" }} dark />
    </>
  );
}
