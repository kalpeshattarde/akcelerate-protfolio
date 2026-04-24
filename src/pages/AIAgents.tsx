import { Bot } from "lucide-react";
import LandingTemplate from "@/components/LandingTemplate";
import AIAgentsSection from "@/components/home/AIAgentsSection";
import heroImage from "@/assets/hero-ai-agents.jpg";

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
      {
        "@type": "Question",
        name: "What are AI agents?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Autonomous LLM-powered systems that understand goals, plan steps, call tools, and execute workflows end-to-end.",
        },
      },
      {
        "@type": "Question",
        name: "How long to deploy an agent?",
        acceptedAnswer: { "@type": "Answer", text: "Typical pilots ship in 2–4 weeks; scaled rollouts in 6–8 weeks." },
      },
      {
        "@type": "Question",
        name: "Which tools can agents integrate with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CRMs (HubSpot, Salesforce), Slack, n8n, internal databases, REST APIs, knowledge bases, and any tool with a documented API.",
        },
      },
    ],
  },
];

export default function AIAgents() {
  return (
    <LandingTemplate
      seo={{
        title: "AI Agents as a Service · Sales, Support & Internal Copilots",
        description:
          "Autonomous LLM-powered AI agents built on your data. Sales SDRs, support bots, internal copilots — wired into your CRM, n8n, and SaaS stack.",
        path: "/ai-agents",
        jsonLd,
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "AI Agents", path: "/ai-agents" },
        ],
      }}
      hero={{
        label: "AI Agents as a Service",
        title: (
          <>
            AI Agents That <span className="gradient-text">Think, Act & Execute</span>
          </>
        ),
        description:
          "Deploy autonomous agents for sales, support, and internal operations — fully integrated with your stack and trained on your data.",
      }}
      heroImage={{ src: heroImage, alt: "Glowing neural network with an AI agent at the center" }}
      showcase={<AIAgentsSection />}
      problem={{
        title: (
          <>
            Where Teams Get <span className="gradient-text">Stuck</span>
          </>
        ),
        description: "Common workflows that an AI agent can take off your plate.",
        icon: Bot,
        items: [
          "Repetitive support tickets eat up team hours",
          "Sales reps lose deals to slow follow-up",
          "Internal teams can't find answers across docs",
          "Manual data entry between SaaS tools never ends",
        ],
      }}
      approach={{
        title: "Our Approach",
        items: [
          "Discover the highest-leverage agent workflow",
          "Wire memory, RAG, tools, and CRM/DB actions",
          "Build agent reasoning loops with guardrails",
          "Pilot with humans-in-the-loop, then scale",
        ],
      }}
      deliverables={{
        title: "What You Get",
        items: [
          "Production agent deployed to your stack",
          "Tool & API integrations (CRM, DB, n8n, Slack)",
          "Monitoring dashboard + human handoff",
          "Source code, prompts, and runbooks",
        ],
        ctaLabel: "Discuss Your Agent",
        ctaTo: "/contact?intent=ai-agents",
      }}
      faq={{
        title: "AI Agents — FAQ",
        items: [
          {
            question: "Do agents replace my team?",
            answer:
              "No. Agents handle repetitive, high-volume work and hand off edge cases to humans. Your team focuses on judgment, relationships, and growth.",
          },
          {
            question: "How do you handle hallucinations and safety?",
            answer:
              "We ground agents with RAG over your data, add tool-use guardrails, validate inputs/outputs, and keep humans in the loop for critical actions.",
          },
          {
            question: "Which models do you use?",
            answer:
              "We pick the best model per use case — GPT-5 family, Gemini 2.5/3, or open models — and abstract it so you can swap without rewriting code.",
          },
        ],
      }}
      finalCta={{
        title: "Ready to deploy your first AI agent?",
        description: "From use-case discovery to production rollout — we'll have your agent live in weeks.",
        primaryLabel: "Book a Call",
        primaryTo: "/contact?intent=ai-agents",
        secondaryLabel: "View Solutions",
        secondaryTo: "/solutions",
      }}
    />
  );
}
