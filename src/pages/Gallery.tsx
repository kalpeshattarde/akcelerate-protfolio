import { HeroPage } from "@/components/Hero";
import CTASection from "@/components/CTASection";

export default function GalleryPage() {
  const items = ["AI Dashboard", "Analytics Platform", "Data Visualization", "ML Pipeline", "IoT Dashboard", "Quality Control UI", "Supply Chain Map", "Energy Monitor", "Fraud Detection"];
  return (
    <>
      <HeroPage label="Gallery" title={<>Project <span className="gradient-text">Gallery</span></>} description="A visual showcase of dashboards, platforms, and solutions we've built." />
      <section className="py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{items.map((item, i) => (
          <div key={i} className="aspect-video rounded-2xl flex items-center justify-center text-primary-foreground font-poppins font-bold text-lg" style={{ background: `linear-gradient(135deg, hsl(${217 + i * 10} 91% ${50 + i * 3}%), hsl(187 92% ${40 + i * 3}%))` }}>{item}</div>
        ))}</div>
      </div></section>
      <CTASection title="Want to See More?" description="Contact us for detailed case study presentations." primaryCta={{ label: "Contact Us", to: "/contact" }} dark />
    </>
  );
}
