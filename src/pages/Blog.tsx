import { HeroPage } from "@/components/Hero";
import SEOHead from "@/components/SEOHead";
import CTASection from "@/components/CTASection";
import { BlogCard } from "@/components/Cards";
import { blogPosts } from "@/data/blog";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

export default function BlogPage() {
  return (
    <>
      <HeroPage label="Blog" title={<>Insights & <span className="gradient-text">Thought Leadership</span></>} description="Expert perspectives on AI, data science, digital transformation, and business growth." />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={100}>
            {blogPosts.map(p => (
              <div key={p.slug} className="reveal-item">
                <BlogCard {...p} />
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>
      <CTASection title="Want Personalized Insights?" description="Book a free consultation to discuss AI strategies for your business." primaryCta={{ label: "Book Free Audit", to: "/free-audit" }} dark />
    </>
  );
}
