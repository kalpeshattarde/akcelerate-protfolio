import { Link } from "react-router-dom";
import { HeroPage } from "@/components/Hero";
import { blogPosts } from "@/data/blog";
import { BlogCard } from "@/components/Cards";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

export default function InsightsPage() {
  return (
    <>
      <HeroPage label="Insights" title={<>Latest <span className="gradient-text">Insights & Resources</span></>} description="Expert analysis, guides, and thought leadership on AI, data science, and digital transformation." />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={100}>
            {blogPosts.map(p => (
              <div key={p.slug} className="reveal-item">
                <BlogCard {...p} />
              </div>
            ))}
          </RevealGrid>
          <RevealSection delay={300}>
            <div className="text-center mt-10">
              <Link to="/blog" className="btn-secondary">View All Blog Posts</Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
