import { HeroPage } from "@/components/Hero";
import SEOHead from "@/components/SEOHead";
import CTASection from "@/components/CTASection";
import { RevealGrid } from "@/hooks/useScrollReveal";

export default function GalleryPage() {
  const items = ["AI Dashboard", "Analytics Platform", "Data Visualization", "ML Pipeline", "IoT Dashboard", "Quality Control UI", "Supply Chain Map", "Energy Monitor", "Fraud Detection"];
  return (
    <>
      <SEOHead title="Gallery" description="Visual showcase of AI dashboards, analytics platforms, and solutions built by AKcelerate." path="/gallery" />
      <HeroPage label="Gallery" title={<>Project <span className="gradient-text">Gallery</span></>} description="A visual showcase of dashboards, platforms, and solutions we've built." />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealGrid className="grid grid-cols-2 md:grid-cols-3 gap-4" stagger={80}>
            {items.map((item, i) => (
              <div key={i} className="reveal-item">
                <div className="gallery-item aspect-video rounded-2xl flex items-center justify-center text-primary-foreground font-poppins font-bold text-lg cursor-pointer" style={{ background: `linear-gradient(135deg, hsl(${217 + i * 10} 91% ${50 + i * 3}%), hsl(187 92% ${40 + i * 3}%))` }}>{item}</div>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>
      <CTASection title="Want to See More?" description="Contact us for detailed case study presentations." primaryCta={{ label: "Contact Us", to: "/contact" }} dark />
    </>
  );
}
