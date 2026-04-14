import { AlertTriangle, Clock, DollarSign, Bug, RefreshCw } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

const painPoints = [
  {
    icon: DollarSign,
    title: "$500–$2,000+ Burned",
    description: "You've spent more on AI credits, hosting, and wasted hours than the product is worth.",
  },
  {
    icon: Clock,
    title: "Weeks of Prompt Wrestling",
    description: "Copy-pasting prompts into ChatGPT, debugging AI hallucinations, fixing broken code. Repeat.",
  },
  {
    icon: Bug,
    title: "Spaghetti Code Output",
    description: "AI tools generate bloated, unmaintainable code. You end up rewriting half of it anyway.",
  },
  {
    icon: RefreshCw,
    title: "Endless Rebuild Cycles",
    description: "Every \"quick fix\" breaks something else. You're stuck in an infinite loop of patching.",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-16 lg:py-20">
      <RevealSection>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold mb-4">
            <AlertTriangle className="w-3.5 h-3.5" /> THE PROBLEM
          </div>
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            AI Coding Tools Are <span className="text-destructive">Costing You More</span> Than You Think
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            You thought AI would save you time and money. Instead, you're stuck debugging AI-generated code,
            burning cash on credits, and shipping nothing.
          </p>
        </div>
      </RevealSection>

      <RevealGrid className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto" stagger={100}>
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
