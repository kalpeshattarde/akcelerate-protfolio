import { HeroPage } from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { Download } from "lucide-react";
import { RevealGrid } from "@/hooks/useScrollReveal";

export default function ResourcesPage() {
  const resources = [
    { title: "AI Readiness Checklist", desc: "A step-by-step guide to assess your organization's AI readiness.", type: "PDF" },
    { title: "Data Strategy Template", desc: "Framework for building a data-driven organization.", type: "PDF" },
    { title: "ROI Calculator", desc: "Estimate the return on investment from AI implementation.", type: "Spreadsheet" },
    { title: "MLOps Best Practices Guide", desc: "Comprehensive guide to operationalizing ML models.", type: "PDF" },
  ];
  return (
    <>
      <HeroPage label="Resources" title={<>Free <span className="gradient-text">Resources & Downloads</span></>} description="Practical guides, templates, and tools to accelerate your AI journey." />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealGrid className="grid md:grid-cols-2 gap-6" stagger={120}>
            {resources.map((r, i) => (
              <div key={i} className="reveal-item glass-card p-7 flex items-start gap-4">
                <div className="feature-icon !mb-0"><Download className="w-6 h-6 text-accent" /></div>
                <div><span className="text-xs text-accent font-medium">{r.type}</span><h3 className="font-poppins font-semibold mb-1">{r.title}</h3><p className="text-muted-foreground text-sm">{r.desc}</p></div>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>
      <CTASection title="Need Custom Resources?" description="Contact us for tailored guides and assessments." primaryCta={{ label: "Contact Us", to: "/contact" }} dark />
    </>
  );
}
