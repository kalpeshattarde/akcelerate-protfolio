import { Shield, Users, Code2, Star } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

const trustPoints = [
  {
    icon: Code2,
    title: "Built by Engineers, Not AI",
    description: "Every prototype is hand-coded by senior engineers. Proper architecture, clean patterns, zero hallucinations.",
  },
  {
    icon: Users,
    title: "Used by 200+ Founders",
    description: "Indie hackers, agencies, and startups trust our prototypes to launch faster and validate ideas.",
  },
  {
    icon: Shield,
    title: "Full Source Code Ownership",
    description: "You own everything. No vendor lock-in, no recurring AI fees. Deploy wherever you want.",
  },
  {
    icon: Star,
    title: "Battle-Tested Quality",
    description: "Responsive, accessible, performant. Every prototype passes our quality checklist before release.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-16 lg:py-20">
      <RevealSection>
        <div className="text-center mb-12">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Founders <span className="gradient-text">Trust Us</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            We're not another AI tool. We're the shortcut that actually works.
          </p>
        </div>
      </RevealSection>

      <RevealGrid className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto" stagger={80}>
        {trustPoints.map(({ icon: Icon, title, description }, i) => (
          <div key={i} className="reveal-item glass-card p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-poppins font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        ))}
      </RevealGrid>
    </section>
  );
}
