import { HeroPage } from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { Download, FileText, Video, Image, Wrench } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

export default function ResourcesPage() {
  const resources = [
    { title: "Company Brochure", desc: "Learn about our services, approach, and success stories.", type: "PDF", icon: FileText },
    { title: "Case Study Collection", desc: "Real transformations and documented results from our clients.", type: "PDF", icon: FileText },
    { title: "Strategy Framework", desc: "Our proven framework for scaling businesses from $1M to $10M+.", type: "PDF", icon: FileText },
    { title: "Video Introduction", desc: "Watch our founder explain the AKcelerate approach.", type: "Video", icon: Video },
    { title: "Team Photos", desc: "Meet the experts behind your transformation.", type: "Images", icon: Image },
    { title: "Templates & Tools", desc: "Downloadable templates and tools for business growth.", type: "Downloads", icon: Wrench },
  ];

  return (
    <>
      <HeroPage label="Resources" title={<>Free Resources & <span className="gradient-text">Downloads</span></>} description="Guides, templates, and insights to help you scale" />

      <section className="py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={80}>
          {resources.map((r, i) => (
            <div key={i} className="reveal-item glass-card p-7">
              <div className="feature-icon"><r.icon className="w-6 h-6 text-accent" /></div>
              <span className="text-xs text-accent font-medium">{r.type}</span>
              <h3 className="font-poppins font-semibold mb-1">{r.title}</h3>
              <p className="text-muted-foreground text-sm">{r.desc}</p>
            </div>
          ))}
        </RevealGrid>
      </div></section>

      <CTASection title="Need Custom Resources?" description="Contact us for tailored guides and assessments." primaryCta={{ label: "Contact Us", to: "/contact" }} dark />
    </>
  );
}
