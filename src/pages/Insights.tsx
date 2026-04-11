import { Link } from "react-router-dom";
import { RevealGrid } from "@/hooks/useScrollReveal";
import { TiltCard } from "@/hooks/useTiltCard";
import HeroParticles from "@/components/HeroParticles";
import FloatingOrbs from "@/components/FloatingOrbs";
import VizCanvas from "@/components/viz/VizCanvas";

const insightCards = [
  { slug: "generative-ai-operations", label: "Featured", title: "Generative AI in Business Operations: Beyond the Hype", desc: "Most companies are still in the experimentation phase with generative AI. We break down exactly how to move from pilots to production — with real-world examples from manufacturing, retail, and FinTech." },
  { slug: "data-to-intelligence", label: "Analytics", title: "From Raw Data to Business Intelligence", desc: "How to build a data pipeline that turns raw operational data into actionable business intelligence — without a dedicated data science team." },
  { slug: "msme-growth-strategies", label: "Growth", title: "MSME Growth Strategies Using AI in 2025", desc: "Small and mid-sized businesses are using AI to compete with enterprises. Here are the top 5 strategies driving real revenue growth." },
  { slug: "ml-deployment-guide", label: "Engineering", title: "The Complete ML Deployment Guide for Non-Engineers", desc: "Moving a model from Jupyter notebook to production is where most ML projects fail. This guide explains every step in plain language." },
  { slug: "ai-manufacturing-adoption", label: "Case Study", title: "AI Adoption in Manufacturing: A Case Study", desc: "A Tier-1 automotive supplier reduced unplanned downtime by 40% using predictive maintenance AI. Here's the full story." },
  { slug: "data-driven-brand", label: "Strategy", title: "How Data-Driven Brands Are Winning Market Share", desc: "Learn how leading brands use analytics, AI, and customer data to outperform competitors and build lasting loyalty." },
];

export default function InsightsPage() {
  return (
    <>
      <section className="relative min-h-[80vh] flex items-center pt-24 pb-16 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <HeroParticles />
        <FloatingOrbs count={2} />
        <VizCanvas mode="insights" className="opacity-40" />
        <div className="absolute inset-0 hero-grid-bg" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="hero-badge mb-5">
              <span className="w-2 h-2 rounded-full bg-accent inline-block" />
              Insights
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 font-poppins">
              Ideas That Move<br />
              <span className="shimmer-text">Business Forward</span>
            </h1>
            <p className="text-lg mb-8 leading-relaxed max-w-xl" style={{ color: "hsl(var(--ak-body))" }}>
              Expert perspectives on AI adoption, automation strategy, data infrastructure, and digital transformation — from practitioners who've built real systems.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={80}>
            {insightCards.map((card) => (
              <TiltCard key={card.slug} className="reveal-item">
                <Link to={`/blog/${card.slug}`} className="glass-card p-6 block hover:border-primary/30 transition-all">
                  <span className="tag-pill mb-3 block w-fit">{card.label}</span>
                  <h3 className="font-poppins font-semibold text-lg mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                </Link>
              </TiltCard>
            ))}
          </RevealGrid>
          <div className="text-center mt-10">
            <Link to="/blog" className="btn-secondary">View All Blog Posts</Link>
          </div>
        </div>
      </section>
    </>
  );
}
