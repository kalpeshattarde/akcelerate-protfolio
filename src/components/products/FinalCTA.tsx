import { Link } from "react-router-dom";
import { ArrowRight, Rocket } from "lucide-react";
import { RevealSection } from "@/hooks/useScrollReveal";

export default function FinalCTA() {
  return (
    <section className="mt-20 mb-8 rounded-2xl relative overflow-hidden py-16 px-6"
      style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.05) 0%, hsl(var(--primary) / 0.15) 100%)" }}>
      <div className="absolute -top-[120px] -right-[120px] w-[350px] h-[350px] rounded-full blur-[80px] pointer-events-none bg-primary/10" />
      <div className="absolute -bottom-[80px] -left-[80px] w-[250px] h-[250px] rounded-full blur-[80px] pointer-events-none bg-accent/10" />

      <RevealSection>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <Rocket className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Competitor Just Shipped. You're Still Debugging.
          </h2>
          <p className="text-muted-foreground text-lg mb-4 max-w-lg mx-auto">
            Every day you spend wrestling with ChatGPT is a day your competitor gains paying customers.
          </p>
          <p className="text-foreground font-semibold text-lg mb-8">
            Stop building. Start shipping. Launch your SaaS today for $29.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#products-catalog" className="btn-primary text-base px-8 py-3.5">
              Browse Prototypes Now <ArrowRight className="w-4 h-4" />
            </a>
            <Link to="/contact" className="btn-secondary text-base px-8 py-3.5">
              Need Custom Development?
            </Link>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}
