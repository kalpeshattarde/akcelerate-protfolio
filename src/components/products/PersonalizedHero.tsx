import { Link } from "react-router-dom";
import { ArrowRight, Zap, Clock, DollarSign } from "lucide-react";

export default function PersonalizedHero() {
  return (
    <section className="text-center mb-16 relative">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-semibold mb-6 animate-pulse">
        🔥 Stop Wasting Money on AI-Built Junk
      </div>

      {/* Headline */}
      <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-5 leading-tight">
        Launch Your SaaS in{" "}
        <span className="gradient-text">Minutes, Not Months</span>
      </h1>

      {/* Subheadline */}
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
        Stop burning $1,000+ and weeks wrestling with Claude, Replit, Bolt, and Lovable.
        Grab a <span className="font-semibold text-foreground">production-ready prototype</span> and ship today.
      </p>

      {/* 3 Bullet Benefits */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {[
          { icon: Clock, text: "Launch in 10 minutes, not 10 weeks" },
          { icon: DollarSign, text: "From $29 — not $500–$2,000+" },
          { icon: Zap, text: "Clean code, not AI spaghetti" },
        ].map(({ icon: Icon, text }, i) => (
          <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            {text}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-wrap justify-center gap-4">
        <a href="#products-catalog" className="btn-primary text-base px-8 py-3.5">
          Browse Prototypes <ArrowRight className="w-4 h-4" />
        </a>
        <a href="#comparison" className="btn-secondary text-base px-8 py-3.5">
          See Why We're Better
        </a>
      </div>
    </section>
  );
}
