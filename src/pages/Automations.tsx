import { Workflow } from "lucide-react";
import LandingTemplate from "@/components/LandingTemplate";
import AutomationShowcase from "@/components/home/AutomationShowcase";
import heroImage from "@/assets/hero-automations.jpg";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Automation Systems",
    description: "Custom n8n workflows, AI-augmented automations, and CRM/email integrations.",
    url: "https://akcelerate.lovable.app/automations",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you use n8n or Zapier?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We build production workflows in n8n (self-hosted or cloud) for full control, versioning, and AI integrations.",
        },
      },
      {
        "@type": "Question",
        name: "What can you automate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CRM updates, lead routing, email sequences, content generation, data sync, approval flows, and custom AI pipelines.",
        },
      },
      {
        "@type": "Question",
        name: "Will my team be able to maintain it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — we hand over visual n8n workflows with documentation and training so your team can extend them.",
        },
      },
    ],
  },
];

export default function Automations() {
  return (
    <LandingTemplate
      seo={{
        title: "Automation Systems · n8n Workflows, CRM & AI Integrations",
        description:
          "Custom n8n automations that connect your CRM, email, databases, and AI models. Eliminate manual work and ship deterministic workflows.",
        path: "/automations",
        jsonLd,
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Automations", path: "/automations" },
        ],
      }}
      hero={{
        label: "Automation Systems",
        title: (
          <>
            Automate Everything That <span className="gradient-text">Slows You Down</span>
          </>
        ),
        description:
          "Custom n8n workflows powered by AI — connect every tool, eliminate manual work, ship deterministic systems.",
      }}
      heroImage={{ src: heroImage, alt: "Workflow automation graph connecting apps, email and databases" }}
      showcase={<AutomationShowcase />}
      problem={{
        title: (
          <>
            Manual Work <span className="gradient-text">Costs You Hours</span>
          </>
        ),
        description: "The repetitive tasks where automation pays back fastest.",
        icon: Workflow,
        items: [
          "Manual copy-paste between CRM, email, and spreadsheets",
          "Lead handoffs slip through the cracks",
          "Reports take hours every week to assemble",
          "Approval workflows live in scattered DMs",
        ],
      }}
      approach={{
        title: "Our Approach",
        items: [
          "Audit every manual step worth automating",
          "Design triggers, branches, and failure paths",
          "Build in n8n with versioning + observability",
          "Deploy self-hosted or cloud, monitor, iterate",
        ],
      }}
      deliverables={{
        title: "What You Get",
        items: [
          "Live n8n workflows tailored to your ops",
          "CRM + email + database integrations",
          "Error alerts and retry logic",
          "Documentation + handover training",
        ],
        ctaLabel: "Set Up My Automation",
        ctaTo: "/contact?intent=automation",
      }}
      faq={{
        title: "Automations — FAQ",
        items: [
          {
            question: "How long does an automation take to ship?",
            answer:
              "Most single workflows ship in 1–2 weeks. Multi-system orchestrations with AI steps typically run 3–6 weeks.",
          },
          {
            question: "Do you self-host n8n or use cloud?",
            answer:
              "Both. We recommend self-hosted on your VPS for cost and control; cloud is great for fast pilots.",
          },
          {
            question: "Can automations call AI models?",
            answer:
              "Yes — we wire OpenAI, Gemini, and open models directly into n8n nodes for content, classification, and decision steps.",
          },
        ],
      }}
      finalCta={{
        title: "Ready to automate your busywork?",
        description: "Tell us your repetitive workflow — we'll scope an n8n automation that pays for itself.",
        primaryLabel: "Plan My Automation",
        primaryTo: "/contact?intent=automation",
        secondaryLabel: "View Solutions",
        secondaryTo: "/solutions",
      }}
    />
  );
}
