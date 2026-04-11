import { HeroPage } from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { industries } from "@/data/industries";

export default function IndustriesPage() {
  return (
    <>
      <HeroPage label="Industries" title={<>Deep Expertise Across <span className="gradient-text">13+ Industries</span></>} description="We bring specialized domain knowledge to every engagement, ensuring solutions that fit your industry's unique needs." />
      <section className="py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {industries.map((ind, i) => (
            <div key={i} className="glass-card p-7">
              <h3 className="font-poppins font-semibold text-xl mb-2">{ind.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{ind.description}</p>
              <div className="flex flex-wrap gap-2">{ind.useCases.map((u, j) => <span key={j} className="text-xs px-3 py-1 rounded-full bg-primary/5 text-primary border border-primary/10">{u}</span>)}</div>
            </div>
          ))}
        </div>
      </div></section>
      <CTASection title="Don't See Your Industry?" description="We work across all sectors. Contact us to discuss your specific needs." primaryCta={{ label: "Contact Us", to: "/contact" }} dark />
    </>
  );
}
