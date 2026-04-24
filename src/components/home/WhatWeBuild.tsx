import { Link } from "react-router-dom";
import { Globe, Rocket, Workflow, Brain, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { trackEvent } from "@/lib/analytics";

const tiles = [
  {
    slug: "websites",
    icon: Globe,
    title: "Websites & Landing Pages",
    desc: "eCommerce, SaaS, corporate, and high-converting landing pages.",
    bullets: ["Responsive design", "SEO-ready", "Fast performance"],
  },
  {
    slug: "mvp",
    icon: Rocket,
    title: "MVP App Development",
    desc: "Full-stack web apps shipped in 21 days for non-tech founders.",
    bullets: ["21-day delivery", "Full-stack", "Launch-ready"],
  },
  {
    slug: "automation",
    icon: Workflow,
    title: "n8n Automations",
    desc: "Content bots, AI video, voice agents, and workflow automation.",
    bullets: ["n8n workflows", "AI integrations", "No-code + code"],
  },
  {
    slug: "custom-ai",
    icon: Brain,
    title: "Custom AI",
    desc: "RAG pipelines, model fine-tuning, and AI trained on your data.",
    bullets: ["RAG & fine-tuning", "Your data", "Production-ready"],
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
        <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={100}>
          {tiles.map((t) => (
            <div key={t.slug} className="reveal-item glass-card p-7 flex flex-col">
              <div className="feature-icon"><t.icon className="w-6 h-6 text-accent" /></div>
              <h3 className="font-poppins font-semibold text-lg mb-2">{t.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.desc}</p>
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
                className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-accent hover:gap-2 transition-all"
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
