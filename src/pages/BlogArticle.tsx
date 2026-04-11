import { useParams, Link } from "react-router-dom";
import { HeroPage } from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { getBlogPost, blogPosts } from "@/data/blog";
import { BlogCard } from "@/components/Cards";
import { ArrowLeft } from "lucide-react";

export default function BlogArticlePage() {
  const { slug } = useParams();
  const post = getBlogPost(slug || "");
  if (!post) return <div className="min-h-screen flex items-center justify-center pt-32"><div className="text-center"><h1 className="font-poppins font-bold text-4xl mb-4">Article Not Found</h1><Link to="/blog" className="btn-primary">View All Articles</Link></div></div>;
  const related = blogPosts.filter(p => p.slug !== post.slug).slice(0, 3);
  return (
    <>
      <HeroPage label={post.category} title={<>{post.title}</>} description={`${post.date} · ${post.readTime} · By ${post.author}`} />
      <section className="py-20"><div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"><ArrowLeft className="w-4 h-4" /> Back to Blog</Link>
        <article className="prose prose-slate max-w-none">
          {post.sections.map((s, i) => (
            <div key={i} className="mb-10">
              <h2 className="font-poppins font-bold text-2xl mb-4">{s.heading}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          ))}
        </article>
        <div className="glass-card p-8 mt-12 text-center">
          <h3 className="font-poppins font-bold text-xl mb-3">Want to implement these strategies?</h3>
          <p className="text-muted-foreground mb-5">Let's discuss how to apply these insights to your business.</p>
          <Link to="/free-audit" className="btn-primary">Book Free Audit</Link>
        </div>
      </div></section>
      {related.length > 0 && (
        <section className="py-20 section-alt"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins font-bold text-2xl mb-8 text-center">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">{related.map(p => <BlogCard key={p.slug} {...p} />)}</div>
        </div></section>
      )}
      <CTASection title="Ready to Turn Insights Into Action?" description="Book a free consultation to discuss strategies for your business." primaryCta={{ label: "Contact Us", to: "/contact" }} dark />
    </>
  );
}
