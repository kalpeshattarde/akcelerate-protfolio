import { Link } from "react-router-dom";
import { HeroPage } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { BlogCard } from "@/components/Cards";
import { blogPosts } from "@/data/blog";
import CTASection from "@/components/CTASection";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

export default function InsightsPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <>
      <HeroPage label="Insights" title={<>Ideas That Move <span className="gradient-text">Business Forward</span></>} description="Expert perspectives on AI adoption, automation strategy, data infrastructure, and digital transformation — from practitioners who've built real systems." />

      {/* Featured article */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <Link to={`/blog/${featured.slug}`} className="glass-card p-8 block group mb-12">
              <span className="section-label">{featured.category}</span>
              <h2 className="font-poppins font-bold text-2xl md:text-3xl mb-3 group-hover:text-primary transition-colors">{featured.title}</h2>
              <p className="text-muted-foreground text-lg mb-4 max-w-3xl">{featured.description}</p>
              <span className="text-xs text-muted-foreground">{featured.date} · {featured.readTime}</span>
            </Link>
          </RevealSection>

          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={80}>
            {rest.map(p => (
              <div key={p.slug} className="reveal-item">
                <BlogCard {...p} />
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <CTASection title="Get Expert Insights Delivered" description="Join 2,000+ business leaders who receive our monthly digest on AI, automation, and digital transformation." primaryCta={{ label: "Subscribe", to: "/contact" }} dark />
    </>
  );
}
