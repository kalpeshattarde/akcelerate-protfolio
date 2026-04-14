import { AlertTriangle, Clock, DollarSign, Bug, RefreshCw, CreditCard, Brain } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

const painPoints = [
  {
    icon: DollarSign,
    title: "$200–$400/Month on AI Subscriptions",
    description: "ChatGPT Plus, Claude Pro, Replit Core, Lovable credits — the monthly bleeding never stops. And you still don't have a finished product.",
  },
  {
    icon: Clock,
    title: "Weeks of Prompt Wrestling",
    description: "Copy-pasting prompts, debugging hallucinations, fixing broken code at 2am. You're a founder, not a prompt engineer.",
  },
  {
    icon: Bug,
    title: "AI Spaghetti Code That Breaks",
    description: "AI tools generate bloated, unmaintainable code. Every 'fix' breaks three other things. You're paying to create technical debt.",
  },
  {
    icon: CreditCard,
    title: "Hidden Token & API Costs",
    description: "GPT-4 tokens, Anthropic credits, compute costs — by the time you notice, you've burned $500+ on a prototype that barely works.",
  },
  {
    icon: RefreshCw,
    title: "Rebuilding the Same SaaS Again",
    description: "Need a CRM? Build from scratch. Need an ATS? Build from scratch. You're solving the same problems that hundreds of others already solved.",
  },
  {
    icon: Brain,
    title: "Decision Fatigue & Burnout",
    description: "Which AI tool? Which framework? Which prompt strategy? By the time you decide, your competitor already shipped.",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-16 lg:py-20">
      <RevealSection>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold mb-4">
            <AlertTriangle className="w-3.5 h-3.5" /> THE UNCOMFORTABLE TRUTH
          </div>
          {/* H2 — SEO: "ai saas builder alternative" */}
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            AI Coding Tools Are <span className="text-destructive">Bleeding You Dry</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            You thought AI would save you time and money. Instead, you're stuck in an expensive loop of
            prompting, debugging, and rebuilding. Here's what that really costs:
          </p>
        </div>
      </RevealSection>

      <RevealGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto" stagger={80}>
        {painPoints.map(({ icon: Icon, title, description }, i) => (
          <div key={i} className="reveal-item glass-card p-6 border-l-4 border-destructive/40">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-3">
              <Icon className="w-5 h-5 text-destructive" />
            </div>
            <h3 className="font-poppins font-semibold text-foreground mb-1.5">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        ))}
      </RevealGrid>
    </section>
  );
}
