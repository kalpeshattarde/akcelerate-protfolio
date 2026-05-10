import { Link } from "react-router-dom";
import { Globe, Rocket, Workflow, Brain, ArrowRight, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { trackEvent } from "@/lib/analytics";

const featured = {
  slug: "mvp",
  icon: Rocket,
  title: "MVP App Development",
  desc: "Full-stack web apps shipped in 21 days for non-tech founders. Production-ready code, modern stack, deployed and live.",
  bullets: ["21-day delivery", "Full-stack React + Node", "Auth, payments & DB included", "Launch-ready on day 21"],
};

const tiles = [
  {
    slug: "websites",
    icon: Globe,
    title: "Websites & Landing Pages",
    desc: "eCommerce, SaaS, corporate, and high-converting landing pages.",
    bullets: ["Responsive", "SEO-ready", "Fast"],
  },
  {
    slug: "automation",
    icon: Workflow,
    title: "n8n Automations",
    desc: "Content bots, AI video, voice agents, and workflow automation.",
    bullets: ["n8n workflows", "AI integrations"],
  },
  {
    slug: "custom-ai",
    icon: Brain,
    title: "Custom AI",
    desc: "RAG pipelines, model fine-tuning, and AI trained on your data.",
    bullets: ["RAG & fine-tuning", "Production-ready"],
  },
  {
    slug: "ai-agents",
    icon: Bot,
    title: "AI Agents",
    desc: "Autonomous agents that handle support, sales, and ops 24/7.",
    bullets: ["24/7 autonomous", "CRM & API integration"],
  },
  {
    slug: "automations",
    icon: Zap,
    title: "Business Automation",
    desc: "End-to-end workflow design, CRM automations, and smart notifications.",
    bullets: ["Workflow design", "CRM automation"],
  },
];

export default function WhatWeBuild() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <SectionHeader
            label="What We Build"
            title={<>From Websites to <span className="gradient-text">Custom AI</span></>}
            description="Four core capabilities — shipped fast, designed to convert, built to scale."
          />
        </RevealSection>
        <RevealGrid className="bento-grid" stagger={100}>
          {/* Featured large card */}
          <div className="reveal-item glass-card bento-feature p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider" style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}>
                  <Sparkles className="w-3 h-3" /> Most Popular
                </span>
              </div>
              <div className="feature-icon" style={{ width: 60, height: 60 }}>
                <featured.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-poppins font-bold text-2xl lg:text-3xl mb-3 mt-2" style={{ letterSpacing: "-0.02em" }}>
                {featured.title}
              </h3>
              <p className="text-base text-muted-foreground mb-6 max-w-md leading-relaxed">{featured.desc}</p>
              <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                {featured.bullets.map((b) => (
                  <li key={b} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to={`/contact?intent=quote&service=${featured.slug}`}
              onClick={() => trackEvent("home_service_tile_click", { service: featured.slug })}
              className="btn-primary self-start"
            >
              Start a 21-Day MVP <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Smaller tiles */}
          {tiles.map((t) => (
            <div key={t.slug} className="reveal-item glass-card p-6 flex flex-col">
              <div className="feature-icon"><t.icon className="w-6 h-6 text-accent" /></div>
              <h3 className="font-poppins font-semibold text-lg mb-2" style={{ letterSpacing: "-0.015em" }}>{t.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{t.desc}</p>
              <ul className="space-y-1.5 mb-5">
                {t.bullets.map((b) => (
                  <li key={b} className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                to={`/contact?intent=quote&service=${t.slug}`}
                onClick={() => trackEvent("home_service_tile_click", { service: t.slug })}
                className="btn-ghost mt-auto"
              >
                Get a Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </RevealGrid>
      </div>
    </section>
  );
}
