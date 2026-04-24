import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Workflow } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { HeroPage } from "@/components/Hero";
import AutomationShowcase from "@/components/home/AutomationShowcase";
import CTASection from "@/components/CTASection";
import { SectionHeader } from "@/components/SectionHeader";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

const problems = [
  "Manual copy-paste between CRM, email, and spreadsheets",
  "Lead handoffs slip through the cracks",
  "Reports take hours every week to assemble",
  "Approval workflows live in scattered DMs",
];

const approach = [
  "Audit every manual step worth automating",
  "Design triggers, branches, and failure paths",
  "Build in n8n with versioning + observability",
  "Deploy self-hosted or cloud, monitor, iterate",
];

const deliverables = [
  "Live n8n workflows tailored to your ops",
  "CRM + email + database integrations",
  "Error alerts and retry logic",
  "Documentation + handover training",
];

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
      { "@type": "Question", name: "Do you use n8n or Zapier?", acceptedAnswer: { "@type": "Answer", text: "We build production workflows in n8n (self-hosted or cloud) for full control, versioning, and AI integrations." } },
      { "@type": "Question", name: "What can you automate?", acceptedAnswer: { "@type": "Answer", text: "CRM updates, lead routing, email sequences, content generation, data sync, approval flows, and custom AI pipelines." } },
    ],
  },
];

export default function Automations() {
  return (
    <>
      <SEOHead
        title="Automation Systems · n8n Workflows, CRM & AI Integrations"
        description="Custom n8n automations that connect your CRM, email, databases, and AI models. Eliminate manual work and ship deterministic workflows."
        path="/automations"
        jsonLd={jsonLd}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Automations", path: "/automations" }]}
      />
      <HeroPage
        label="Automation Systems"
        title={<>Automate Everything That <span className="gradient-text">Slows You Down</span></>}
        description="Custom n8n workflows powered by AI — connect every tool, eliminate manual work, ship deterministic systems."
      />

      <AutomationShowcase />

      <section className="py-24 lg:py-32 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="The Problem" title={<>Manual Work <span className="gradient-text">Costs You Hours</span></>} description="The repetitive tasks where automation pays back fastest." />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto" stagger={80}>
            {problems.map((p) => (
              <div key={p} className="reveal-item glass-card p-5 flex items-start gap-3">
                <Workflow className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
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
            <Link to="/contact?intent=automation" className="btn-primary mt-8 inline-flex">
              Set Up My Automation <ArrowRight className="w-4 h-4" />
            </Link>
          </RevealSection>
        </div>
      </section>

      <CTASection title="Ready to automate your busywork?" description="Tell us your repetitive workflow — we'll scope an n8n automation that pays for itself." primaryCta={{ label: "Plan My Automation", to: "/contact?intent=automation" }} secondaryCta={{ label: "View Solutions", to: "/solutions" }} dark />
    </>
  );
}
