import { ArrowRight, Zap, Clock, DollarSign, TrendingUp } from "lucide-react";
import { AnimatedStat } from "@/hooks/useCountUp";
import type { GeoDetection } from "@/hooks/useGeoDetection";

interface Props {
  geo: GeoDetection;
}

export default function PersonalizedHero({ geo }: Props) {
  const { formatPrice, formatRange, isIndia, currency } = geo;

  return (
    <section className="text-center mb-16 relative">
      {/* India banner */}
      {isIndia && currency === "inr" && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-semibold mb-3">
          🇮🇳 Special pricing for India users
        </div>
      )}

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-semibold mb-6 animate-pulse">
        🔥 Stop Paying {currency === "inr" ? "₹16,000+/mo" : "$200/mo"} for AI Spaghetti Code
      </div>

      <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-5 leading-tight">
        Stop Building. <span className="gradient-text">Start Shipping.</span>
      </h1>

      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
        Why spend <span className="font-semibold text-foreground">{formatRange(1000, 3000)}</span> and weeks wrestling with
        ChatGPT, Claude, Replit, or Bolt? Grab a <span className="font-semibold text-foreground">ready-made SaaS prototype</span> for
        <span className="font-semibold text-primary"> {formatPrice(29)}</span> and launch today.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {[
          { icon: Clock, text: "Launch in 1–2 days, not 10 weeks" },
          { icon: DollarSign, text: `Save ${formatRange(600, 2900)} per product` },
          { icon: Zap, text: "Clean code — no debugging required" },
        ].map(({ icon: Icon, text }, i) => (
          <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            {text}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-8 mb-10 py-5 px-6 rounded-xl bg-muted/50 max-w-2xl mx-auto">
        {[
          { value: "40+", label: "Ready Prototypes" },
          { value: "200+", label: "Founders Launched" },
          { value: currency === "inr" ? "₹20Cr+" : "$2.4M+", label: "Saved vs AI Tools" },
        ].map(({ value, label }, i) => (
          <div key={i} className="text-center">
            <AnimatedStat value={value} className="font-poppins text-2xl font-extrabold text-primary block" />
            <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <a href="#products-catalog" className="btn-primary text-base px-8 py-3.5">
          Browse Prototypes — From {formatPrice(29)} <ArrowRight className="w-4 h-4" />
        </a>
        <a href="#cost-breakdown" className="btn-secondary text-base px-8 py-3.5">
          <TrendingUp className="w-4 h-4" /> See the Real Cost of AI Tools
        </a>
      </div>
    </section>
  );
}
