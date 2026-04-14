import { Shield, Users, Code2, Star, Repeat, HeartHandshake, Quote } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

const trustPoints = [
  {
    icon: Code2,
    title: "Built by Engineers, Not AI",
    description: "Every prototype is hand-coded by senior engineers. Proper architecture, clean patterns, zero hallucinations.",
  },
  {
    icon: Users,
    title: "200+ Founders Trust Us",
    description: "Indie hackers, agencies, and startups use our prototypes to validate ideas and launch faster.",
  },
  {
    icon: Shield,
    title: "Full Source Code Ownership",
    description: "You own everything. No vendor lock-in, no recurring AI fees. Deploy wherever you want. Resell under your brand.",
  },
  {
    icon: Repeat,
    title: "Resell as Your Own SaaS",
    description: "Commercial license included. Add your branding, deploy it, charge subscriptions. We never appear in your product.",
  },
  {
    icon: Star,
    title: "Production-Ready Quality",
    description: "Responsive, accessible, performant. Every prototype passes our quality checklist before release.",
  },
  {
    icon: HeartHandshake,
    title: "Founder-Friendly Support",
    description: "Real humans, not chatbots. We help you customize, deploy, and launch. Because your success is our success.",
  },
];

const testimonials = [
  {
    quote: "I spent 3 weeks and $800 trying to build a CRM with Claude and Replit. Bought the AKcelerate prototype for $29 and launched in a day. Wish I found this sooner.",
    name: "Arjun Mehta",
    role: "Indie Hacker",
    company: "SalesPipe.io",
  },
  {
    quote: "We white-label AKcelerate prototypes for client work. What used to take us 6 weeks now takes 3 days. Our margins went from 30% to 80%.",
    name: "Sarah Kim",
    role: "Agency Founder",
    company: "NovaBuild Studio",
  },
  {
    quote: "The code quality is genuinely better than what any AI tool generates. Clean components, proper architecture, responsive out of the box. This is how SaaS should be built.",
    name: "Marcus Johnson",
    role: "CTO & Co-founder",
    company: "TrackFlow",
  },
  {
    quote: "I validated 4 SaaS ideas in one month using AKcelerate prototypes. Two of them now have paying customers. Total investment: $116. Try doing that with Lovable.",
    name: "Priya Sharma",
    role: "Solo Founder",
    company: "DataNest",
  },
];

export default function TrustSection() {
  return (
    <section className="py-16 lg:py-20">
      <RevealSection>
        <div className="text-center mb-12">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Founders <span className="gradient-text">Choose Us</span> Over AI Tools
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            We're not another AI code generator. We're the shortcut that actually delivers.
          </p>
        </div>
      </RevealSection>

      <RevealGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-16" stagger={80}>
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

      {/* Testimonials */}
      <RevealSection>
        <div className="text-center mb-10">
          <h3 className="font-poppins text-2xl md:text-3xl font-bold text-foreground mb-3">
            What Founders Are <span className="gradient-text">Saying</span>
          </h3>
        </div>
      </RevealSection>

      <RevealGrid className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto" stagger={100}>
        {testimonials.map(({ quote, name, role, company }, i) => (
          <div key={i} className="reveal-item glass-card p-6 relative">
            <Quote className="w-8 h-8 text-primary/15 absolute top-4 right-4" />
            <p className="text-sm text-foreground leading-relaxed mb-4 italic">"{quote}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-poppins font-bold text-primary text-sm">
                {name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="font-poppins font-semibold text-foreground text-sm">{name}</div>
                <div className="text-xs text-muted-foreground">{role} · {company}</div>
              </div>
            </div>
          </div>
        ))}
      </RevealGrid>
    </section>
  );
}
