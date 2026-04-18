import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HeroPage } from "@/components/Hero";
import SEOHead from "@/components/SEOHead";
import CTASection from "@/components/CTASection";
import { industries } from "@/data/industries";
import { RevealGrid } from "@/hooks/useScrollReveal";

export default function IndustriesPage() {
  return (
    <>
      <SEOHead
        title="Industries"
        description="Deep AI and data expertise across 13+ industries including manufacturing, fintech, and healthcare."
        path="/industries"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]}
      />
      <HeroPage label="Industries" title={<>Deep Expertise Across <span className="gradient-text">13+ Industries</span></>} description="We bring specialized domain knowledge to every engagement, ensuring solutions that fit your industry's unique needs." />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealGrid className="grid md:grid-cols-2 gap-6" stagger={120}>
            {industries.map((ind) => (
              <Link
                key={ind.slug}
                to={`/industries/${ind.slug}`}
                className="reveal-item glass-card p-7 group block transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-poppins font-semibold text-xl">{ind.name}</h3>
                  <ArrowRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-muted-foreground text-sm mb-4">{ind.description}</p>
                <div className="flex flex-wrap gap-2">{ind.useCases.map((u, j) => <span key={j} className="tag-pill">{u}</span>)}</div>
              </Link>
            ))}
          </RevealGrid>
        </div>
      </section>
      <CTASection title="Don't See Your Industry?" description="We work across all sectors. Contact us to discuss your specific needs." primaryCta={{ label: "Contact Us", to: "/contact" }} dark />
    </>
  );
}
