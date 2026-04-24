import { Link } from "react-router-dom";
import { Instagram, Video, Phone, Workflow, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { trackEvent } from "@/lib/analytics";

const automations = [
  {
    slug: "instagram",
    icon: Instagram,
    title: "Instagram Content",
    bullets: ["Carousel automation", "Caption & hashtag generation", "Scheduled publishing"],
  },
  {
    slug: "ai-video",
    icon: Video,
    title: "AI Video Generation",
    bullets: ["Script-to-video pipeline", "Talking-head generation", "Auto-captions & branding"],
  },
  {
    slug: "voice-agent",
    icon: Phone,
    title: "Voice Agent (AI Receptionist)",
    bullets: ["24/7 phone answering", "Lead qualification", "Appointment booking + CRM"],
  },
  {
    slug: "n8n-workflows",
    icon: Workflow,
    title: "Custom n8n Workflows",
    bullets: ["Any repetitive task", "API integrations & data pipelines", "Multi-step approval flows"],
  },
];

export default function AutomationShowcase() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <SectionHeader
            label="Automation"
            title={<>Automate Everything That <span className="gradient-text">Slows You Down</span></>}
            description="Powered by n8n, AI, and custom logic — workflows that run your business while you sleep."
          />
        </RevealSection>
        <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={100}>
          {automations.map((a) => (
            <div key={a.slug} className="reveal-item glass-card p-7 flex flex-col">
              <div className="feature-icon"><a.icon className="w-6 h-6 text-accent" /></div>
              <h3 className="font-poppins font-semibold text-lg mb-3">{a.title}</h3>
              <ul className="space-y-1.5 mb-5">
                {a.bullets.map((b) => (
                  <li key={b} className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                to={`/contact?intent=automation&type=${a.slug}`}
                onClick={() => trackEvent("home_automation_cta_click", { type: a.slug })}
                className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-accent hover:gap-2 transition-all"
              >
                Set Up My Automation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </RevealGrid>
      </div>
    </section>
  );
}
