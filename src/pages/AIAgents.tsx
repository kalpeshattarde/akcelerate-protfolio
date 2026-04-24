import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Bot } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { HeroPage } from "@/components/Hero";
import AIAgentsSection from "@/components/home/AIAgentsSection";
import CTASection from "@/components/CTASection";
import { SectionHeader } from "@/components/SectionHeader";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

const problems = [
  "Repetitive support tickets eat up team hours",
  "Sales reps lose deals to slow follow-up",
  "Internal teams can't find answers across docs",
  "Manual data entry between SaaS tools never ends",
];

const approach = [
  "Discover the highest-leverage agent workflow",
  "Wire memory, RAG, tools, and CRM/DB actions",
  "Build agent reasoning loops with guardrails",
  "Pilot with humans-in-the-loop, then scale",
];

const deliverables = [
  "Production agent deployed to your stack",
  "Tool & API integrations (CRM, DB, n8n, Slack)",
  "Monitoring dashboard + human handoff",
  "Source code, prompts, and runbooks",
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "AI Agents as a Service",
    description: "Autonomous LLM-powered agents that think, act, and execute across your stack.",
    url: "https://akcelerate.lovable.app/ai-agents",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What are AI agents?", acceptedAnswer: { "@type": "Answer", text: "Autonomous LLM-powered systems that understand goals, plan steps, call tools, and execute workflows end-to-end." } },
      { "@type": "Question", name: "How long to deploy an agent?", acceptedAnswer: { "@type": "Answer", text: "Typical pilots ship in 2–4 weeks; scaled rollouts in 6–8 weeks." } },
    ],
  },
];

export default function AIAgents() {
  return (
    <>
      <SEOHead
        title="AI Agents as a Service · Sales, Support & Internal Copilots"
        description="Autonomous LLM-powered AI agents built on your data. Sales SDRs, support bots, internal copilots — wired into your CRM, n8n, and SaaS stack."
        path="/ai-agents"
        jsonLd={jsonLd}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "AI Agents", path: "/ai-agents" }]}
      />
      <HeroPage
        label="AI Agents as a Service"
        title={<>AI Agents That <span className="gradient-text">Think, Act & Execute</span></>}
        description="Deploy autonomous agents for sales, support, and internal operations — fully integrated with your stack and trained on your data."
      />

      <AIAgentsSection />

      <section className="py-24 lg:py-32 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="The Problem" title={<>Where Teams Get <span className="gradient-text">Stuck</span></>} description="Common workflows that an AI agent can take off your plate." />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto" stagger={80}>
            {problems.map((p) => (
              <div key={p} className="reveal-item glass-card p-5 flex items-start gap-3">
                <Bot className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{p}</span>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <RevealSection>
            <h2 className="font-poppins font-bold text-3xl mb-5">Our Approach</h2>
            <ul className="space-y-3">
              {approach.map((a) => (
                <li key={a} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />{a}
                </li>
              ))}
            </ul>
          </RevealSection>
          <RevealSection delay={150}>
            <h2 className="font-poppins font-bold text-3xl mb-5">What You Get</h2>
            <ul className="space-y-3">
              {deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />{d}
                </li>
              ))}
            </ul>
            <Link to="/contact?intent=ai-agents" className="btn-primary mt-8 inline-flex">
              Discuss Your Agent <ArrowRight className="w-4 h-4" />
            </Link>
          </RevealSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
