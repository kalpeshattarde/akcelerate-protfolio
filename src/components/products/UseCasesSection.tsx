import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { User, Briefcase, Building2 } from "lucide-react";

const useCases = [
  {
    icon: User,
    title: "Indie Hackers",
    description: "Stop wasting weekends debugging AI code. Grab a prototype, customize it, and launch your micro-SaaS in a weekend. Validate ideas at $29 instead of $2,000.",
    bullets: [
      "Launch MVPs in 1–2 days",
      "Test market demand before investing",
      "Full source code to iterate on",
    ],
  },
  {
    icon: Building2,
    title: "Agencies & Freelancers",
    description: "Deliver client projects 10x faster. White-label our prototypes, add your branding, and invoice premium rates. Your clients see a polished product — you keep the margin.",
    bullets: [
      "White-label for client work",
      "Deliver projects in days, not months",
      "Increase project margins by 5–10x",
    ],
  },
  {
    icon: Briefcase,
    title: "Startup Founders",
    description: "Skip the 'build phase' entirely. Use our prototypes as your foundation, customize for your market, and focus on what matters: getting customers and revenue.",
    bullets: [
      "Go to market 10x faster",
      "Save runway for marketing & sales",
      "Production-ready from day one",
    ],
  },
];

export default function UseCasesSection() {
  return (
    <section className="py-16 lg:py-20 section-alt">
      <RevealSection>
        <div className="text-center mb-12">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            Who Is This <span className="gradient-text">Perfect For?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Whether you're solo or running a team — ready-made SaaS apps save you time, money, and sanity.
          </p>
        </div>
      </RevealSection>

      <RevealGrid className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto" stagger={100}>
        {useCases.map(({ icon: Icon, title, description, bullets }, i) => (
          <div key={i} className="reveal-item glass-card p-7">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-poppins font-bold text-foreground mb-2 text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
            <ul className="space-y-2">
              {bullets.map((b, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-primary mt-0.5">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </RevealGrid>
    </section>
  );
}
