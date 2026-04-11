import { Link } from "react-router-dom";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { TiltCard } from "@/hooks/useTiltCard";
import HeroParticles from "@/components/HeroParticles";
import FloatingOrbs from "@/components/FloatingOrbs";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";

const insightCards = [
  { slug: "generative-ai-operations", label: "Featured", title: "Generative AI in Business Operations: Beyond the Hype", desc: "Most companies are still in the experimentation phase with generative AI. We break down exactly how to move from pilots to production — with real-world examples from manufacturing, retail, and FinTech." },
  { slug: "data-to-intelligence", label: "Analytics", title: "From Raw Data to Business Intelligence", desc: "How to build a data pipeline that turns raw operational data into actionable business intelligence — without a dedicated data science team." },
  { slug: "msme-growth-strategies", label: "Growth", title: "MSME Growth Strategies Using AI in 2025", desc: "Small and mid-sized businesses are using AI to compete with enterprises. Here are the top 5 strategies driving real revenue growth." },
  { slug: "ml-deployment-guide", label: "Engineering", title: "The Complete ML Deployment Guide for Non-Engineers", desc: "Moving a model from Jupyter notebook to production is where most ML projects fail. This guide explains every step in plain language." },
  { slug: "ai-manufacturing-adoption", label: "Case Study", title: "AI Adoption in Manufacturing: A Case Study", desc: "A Tier-1 automotive supplier reduced unplanned downtime by 40% using predictive maintenance AI. Here's the full story." },
  { slug: "data-driven-brand", label: "Strategy", title: "How Data-Driven Brands Are Winning Market Share", desc: "Brands that make decisions from data — not intuition — are systematically outperforming their competitors. Here's the playbook." },
  { slug: "generative-ai-operations", label: "Operations", title: "Why Most AI Projects Fail (And How to Fix It)", desc: "85% of AI initiatives never make it to production. We've identified the 6 root causes — and how to avoid each one before it kills your project." },
];

const topicDistribution = [
  { topic: "AI & Machine Learning", pct: 30 },
  { topic: "Data Strategy", pct: 22 },
  { topic: "Manufacturing", pct: 18 },
  { topic: "Business Growth", pct: 15 },
  { topic: "Technical Guides", pct: 10 },
  { topic: "Case Studies", pct: 5 },
];

export default function InsightsPage() {
  const [email, setEmail] = useState("");

  return (
    <>
      <section className="relative min-h-[80vh] flex items-center pt-24 pb-16 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <HeroParticles />
        <FloatingOrbs count={2} />
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
            {insightCards.map((card, idx) => (
              <TiltCard key={idx} className="reveal-item">
                <Link to={`/blog/${card.slug}`} className="glass-card p-6 block hover:border-primary/30 transition-all">
                  <span className="tag-pill mb-3 block w-fit">{card.label}</span>
                  <h3 className="font-poppins font-semibold text-lg mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                </Link>
              </TiltCard>
            ))}
          </RevealGrid>
          <div className="text-center mt-10">
            <Link to="/blog" className="btn-secondary">View All Blog Posts <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* Insights by Topic Area */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="Coverage"
              title={<>Insights by <span className="gradient-text">Topic Area</span></>}
              description="Deep-dive articles, case analyses, and thought leadership across the AI, data, and automation spectrum."
            />
          </RevealSection>
          <RevealSection delay={100}>
            <div className="max-w-2xl mx-auto glass-card p-8">
              <h3 className="font-poppins font-semibold mb-1 text-center">Article Distribution by Topic</h3>
              <p className="text-xs text-muted-foreground mb-6 text-center">Across all published insights</p>
              <div className="space-y-4">
                {topicDistribution.map((t, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{t.topic}</span>
                      <span className="text-muted-foreground">{t.pct}%</span>
                    </div>
                    <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${t.pct}%`,
                          background: "var(--gradient-primary)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="max-w-2xl mx-auto text-center">
              <SectionHeader
                label="Newsletter"
                title={<>Get Expert Insights <span className="gradient-text">Delivered</span></>}
                description="Join 2,000+ business leaders who receive our monthly digest on AI, automation, and digital transformation."
              />
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-card border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <button className="btn-primary whitespace-nowrap">Subscribe</button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">No spam. Unsubscribe anytime.</p>
            </div>
          </RevealSection>
        </div>
      </section>

      <CTASection
        title="Book Your Free Business Audit"
        description="In 60 minutes, our experts map your systems, identify automation opportunities, assess your AI readiness, and deliver a written roadmap — at zero cost."
        primaryCta={{ label: "Free Business Audit", to: "/free-audit" }}
        secondaryCta={{ label: "Contact Us", to: "/contact" }}
        dark
      />
    </>
  );
}
