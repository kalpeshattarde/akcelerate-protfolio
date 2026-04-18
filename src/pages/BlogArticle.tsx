import { useParams, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { useEffect, useState } from "react";
import { HeroPage } from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { getBlogPost, blogPosts } from "@/data/blog";
import { BlogCard } from "@/components/Cards";
import { ArrowLeft, List } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import RelatedLinks from "@/components/RelatedLinks";
import { relatedToBlog } from "@/lib/relatedContent";

function TableOfContents({ sections }: { sections: { heading: string }[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-section-index"));
            if (!isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-section-index]");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (index: number) => {
    const el = document.querySelector(`[data-section-index="${index}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="sticky top-28">
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <List className="w-4 h-4 text-primary" />
          <span className="font-poppins font-semibold text-sm">Contents</span>
        </div>
        <ul className="space-y-1">
          {sections.map((s, i) => (
            <li key={i}>
              <button
                onClick={() => scrollTo(i)}
                className={`text-left w-full text-sm px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeIndex === i
                    ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {s.heading}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default function BlogArticlePage() {
  const { slug } = useParams();
  const post = getBlogPost(slug || "");
  if (!post) return <div className="min-h-screen flex items-center justify-center pt-32"><div className="text-center"><h1 className="font-poppins font-bold text-4xl mb-4">Article Not Found</h1><Link to="/blog" className="btn-primary">View All Articles</Link></div></div>;
  const related = blogPosts.filter(p => p.slug !== post.slug).slice(0, 3);
  const cross = relatedToBlog(post.slug);
  return (
    <>
      <SEOHead title={post.title} description={post.description} path={`/blog/${slug}`} />
      <HeroPage label={post.category} title={<>{post.title}</>} description={`${post.date} · ${post.readTime} · By ${post.author}`} />
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
            <div>
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"><ArrowLeft className="w-4 h-4" /> Back to Blog</Link>
              <article className="prose prose-slate max-w-none">
                {post.sections.map((s, i) => (
                  <RevealSection key={i} delay={i * 80}>
                    <div className="mb-10 scroll-mt-24" data-section-index={i}>
                      <h2 className="font-poppins font-bold text-2xl mb-4">{s.heading}</h2>
                      <p className="text-muted-foreground leading-relaxed">{s.content}</p>
                    </div>
                  </RevealSection>
                ))}
              </article>
              <RevealSection delay={200}>
                <div className="glass-card p-8 mt-12 text-center">
                  <h3 className="font-poppins font-bold text-xl mb-3">Want to implement these strategies?</h3>
                  <p className="text-muted-foreground mb-5">Let's discuss how to apply these insights to your business.</p>
                  <Link to="/free-audit" className="btn-primary">Book Free Audit</Link>
                </div>
              </RevealSection>
            </div>
            <aside className="hidden lg:block">
              <TableOfContents sections={post.sections} />
            </aside>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="py-20 section-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealSection>
              <h2 className="font-poppins font-bold text-2xl mb-8 text-center">Related Articles</h2>
            </RevealSection>
            <RevealGrid className="grid md:grid-cols-3 gap-6" stagger={100}>
              {related.map(p => (
                <div key={p.slug} className="reveal-item">
                  <BlogCard {...p} />
                </div>
              ))}
            </RevealGrid>
          </div>
        </section>
      )}
      <RelatedLinks label="Services" title="Services Powering These Insights" items={cross.services} kind="service" />
      <RelatedLinks label="Solutions" title="Explore Matching Solutions" items={cross.solutions} kind="solution" alt />
      <CTASection title="Ready to Turn Insights Into Action?" description="Book a free consultation to discuss strategies for your business." primaryCta={{ label: "Contact Us", to: "/contact" }} dark />
    </>
  );
}
