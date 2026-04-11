import { Link } from "react-router-dom";
import CTASection from "@/components/CTASection";
import { BlogCard } from "@/components/Cards";
import { blogPosts } from "@/data/blog";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

export default function BlogPage() {
  return (
    <>
      <section className="relative min-h-[80vh] flex items-center pt-24 pb-16 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 hero-grid-bg" />
        <div className="absolute -top-[200px] -left-[200px] w-[700px] h-[700px] rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(37,99,235,0.07)" }} />
        <div className="absolute -bottom-[150px] -right-[100px] w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(6,182,212,0.07)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="hero-badge mb-5">
              <span className="w-2 h-2 rounded-full bg-accent inline-block" />
              Blog
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 font-poppins">
              Ideas That Move<br />
              <span className="hero-gradient-text">Industry Forward</span>
            </h1>
            <p className="text-lg mb-8 leading-relaxed max-w-xl" style={{ color: "hsl(var(--ak-body))" }}>
              Deep-dive articles on AI analytics, predictive maintenance, supply chain intelligence, and digital transformation for Indian manufacturers.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={80}>
            {blogPosts.map(p => (
              <div key={p.slug} className="reveal-item">
                <BlogCard {...p} />
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <CTASection title="Stay Ahead of Industry 4.0" description="Get our latest insights on AI, data science, and digital growth delivered monthly." primaryCta={{ label: "Book Free Audit", to: "/free-audit" }} dark />
    </>
  );
}
