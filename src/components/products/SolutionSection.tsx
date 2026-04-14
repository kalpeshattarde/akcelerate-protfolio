import { CheckCircle, Package, Code2, Rocket } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

const steps = [
  {
    icon: Package,
    step: "01",
    title: "Pick Your Prototype",
    description: "Browse 40+ ready-made SaaS apps — CRM, ATS, project management, e-commerce, dashboards. All production-ready.",
  },
  {
    icon: Code2,
    step: "02",
    title: "Customize & Brand It",
    description: "Full source code. Swap colors, add your logo, modify features. It's your product now — resell it as your own SaaS.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Launch & Start Earning",
    description: "Deploy in hours, not weeks. Start acquiring customers while your competitors are still debugging ChatGPT output.",
  },
];

export default function SolutionSection() {
  return (
    <section className="py-16 lg:py-20 section-alt">
      <RevealSection>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <CheckCircle className="w-3.5 h-3.5" /> THE SHORTCUT
          </div>
          {/* H2 — SEO: "build saas without coding" */}
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            Build SaaS Without Coding. <span className="gradient-text">Launch in Days.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Skip the AI tool circus. Grab a battle-tested prototype built by real engineers.
            Customize it. Ship it. Own it forever.
          </p>
        </div>
      </RevealSection>

      <RevealGrid className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto" stagger={120}>
        {steps.map(({ icon: Icon, step, title, description }, i) => (
          <div key={i} className="reveal-item glass-card p-7 text-center relative overflow-hidden">
            <div className="absolute top-3 right-4 text-5xl font-poppins font-extrabold text-primary/5">{step}</div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-poppins font-bold text-foreground mb-2 text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        ))}
      </RevealGrid>
    </section>
  );
}
