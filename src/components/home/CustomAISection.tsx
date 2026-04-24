import { Link } from "react-router-dom";
import { Database, Sparkles, GitBranch, PhoneCall, LayoutDashboard, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { trackEvent } from "@/lib/analytics";

const capabilities = [
  { slug: "rag", icon: Database, title: "RAG (Retrieval-Augmented Generation)", desc: "Upload your docs, get a chatbot that answers like your best employee." },
  { slug: "fine-tuning", icon: Sparkles, title: "Model Fine-Tuning", desc: "Custom GPT or open-source model trained on your business data." },
  { slug: "training-pipelines", icon: GitBranch, title: "AI Training Pipelines", desc: "End-to-end dataset prep, training, evaluation, and deployment." },
  { slug: "voice-agents", icon: PhoneCall, title: "Voice Agents", desc: "Conversational AI that handles real phone calls." },
  { slug: "ai-dashboard", icon: LayoutDashboard, title: "Custom AI Dashboard", desc: "All your AI tools in one interface — zero complexity." },
];

export default function CustomAISection() {
  return (
    <section className="py-24 lg:py-32 section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <SectionHeader
            label="Custom AI"
            title={<>AI That Knows <span className="gradient-text">Your Business</span></>}
            description="We build AI systems trained on your data, tuned to your needs — not generic models."
          />
        </RevealSection>
        <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={100}>
          {capabilities.map((c) => (
            <div key={c.slug} className="reveal-item glass-card p-7 flex flex-col">
              <div className="feature-icon"><c.icon className="w-6 h-6 text-accent" /></div>
              <h3 className="font-poppins font-semibold text-lg mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground mb-5">{c.desc}</p>
              <Link
                to={`/contact?intent=custom-ai&capability=${c.slug}`}
                onClick={() => trackEvent("home_custom_ai_cta_click", { capability: c.slug })}
                className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-accent hover:gap-2 transition-all"
              >
                Build This For Me <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </RevealGrid>
      </div>
    </section>
  );
}
