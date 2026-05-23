import { Link } from "react-router-dom";
import { ArrowRight, Layers, Activity, Radio, Monitor, BarChart3, LayoutDashboard, Cloud, Settings, Workflow, Rocket, Globe, Bot, Zap, LucideIcon } from "lucide-react";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import { ReactNode } from "react";

const iconMap: Record<string, LucideIcon> = {
  Layers, Activity, Radio, Monitor, BarChart3, LayoutDashboard, Cloud, Settings, Workflow, Rocket, Globe, Bot, Zap,
};

function GlowCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, onMouseMove, onMouseLeave } = useMouseGlow();
  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className={className}>
      {children}
    </div>
  );
}

interface SolutionCardProps {
  slug: string;
  title: string;
  description: string;
  icon: string;
}

export function SolutionCard({ slug, title, description, icon }: SolutionCardProps) {
  const Icon = iconMap[icon] || Layers;
  return (
    <GlowCard className="glass-card p-7 group block">
      <Link to={`/solutions/${slug}`} className="block">
        <div className="feature-icon">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <h3 className="font-poppins font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>
        <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
          Learn more <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    </GlowCard>
  );
}


interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
}

export function BlogCard({ slug, title, description, category, date, readTime }: BlogCardProps) {
  return (
    <GlowCard className="glass-card overflow-hidden group block">
      <Link to={`/blog/${slug}`} className="block">
        <div className="h-48 flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
          <span className="text-primary-foreground font-poppins font-bold text-xl px-6 text-center">{title}</span>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium text-accent">{category}</span>
            <span className="text-xs text-muted-foreground">{date} · {readTime}</span>
          </div>
          <h3 className="font-poppins font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
      </Link>
    </GlowCard>
  );
}

interface StatCardProps {
  metric: string;
  label: string;
}

export function StatCard({ metric, label }: StatCardProps) {
  return (
    <GlowCard className="glass-card p-6 text-center">
      <div className="stat-number mb-1">{metric}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </GlowCard>
  );
}

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

export function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <GlowCard className="glass-card p-7">
      <p className="text-muted-foreground text-sm leading-relaxed mb-5 italic">"{quote}"</p>
      <div>
        <div className="font-poppins font-semibold text-sm">{name}</div>
        <div className="text-xs text-muted-foreground">{role}</div>
      </div>
    </GlowCard>
  );
}

interface PricingCardProps {
  name: string;
  description: string;
  outcome?: string;
  priceUsd: number;
  priceInr: number;
  features: string[];
  highlighted: boolean;
  cta: string;
  isAnnual: boolean;
  discountPercent: number;
  socialProof?: string;
  badge?: string;
}

export function PricingCard({ name, description, outcome, priceUsd, priceInr, features, highlighted, cta, isAnnual, discountPercent, socialProof, badge }: PricingCardProps) {
  const isCustom = priceUsd === 0;
  const displayUsd = isAnnual ? Math.round(priceUsd * (1 - discountPercent / 100)) : priceUsd;
  const displayInr = isAnnual ? Math.round(priceInr * (1 - discountPercent / 100)) : priceInr;

  const formatInr = (n: number) => {
    const s = n.toString();
    if (s.length <= 3) return s;
    const last3 = s.slice(-3);
    const rest = s.slice(0, -3);
    return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3;
  };

  return (
    <div className={highlighted ? "pt-5" : ""}>
      <GlowCard className={`glass-card p-8 relative overflow-visible ${highlighted ? "border-primary shadow-2xl shadow-primary/20 z-10 scale-[1.02]" : ""}`}>
        {highlighted && (
          <div
            className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold text-primary-foreground whitespace-nowrap shadow-lg uppercase tracking-wider"
            style={{ background: "var(--gradient-primary)", letterSpacing: "0.08em" }}
          >
            ★ {badge || "Most Popular"}
          </div>
        )}

        <h3 className="font-poppins font-bold text-2xl mb-1">{name}</h3>
        {outcome && (
          <p className="text-sm font-medium text-foreground/80 mb-3">{outcome}</p>
        )}
        <p className="text-muted-foreground text-xs mb-6 leading-relaxed">{description}</p>

        <div className="mb-6 pb-6 border-b border-border">
          <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mb-1">{isCustom ? "Pricing" : "Starts from"}</p>
          {isCustom ? (
            <span className="font-poppins font-bold text-3xl">Custom</span>
          ) : (
            <>
              <div className="flex items-baseline gap-2">
                <span className="font-poppins font-bold text-4xl">${displayUsd.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
              {isAnnual && (
                <div className="text-xs text-green-600 font-semibold mt-1">
                  Save {discountPercent}% — <span className="line-through text-muted-foreground font-normal">${priceUsd.toLocaleString()}/mo</span>
                </div>
              )}
              <div className="text-xs text-muted-foreground mt-1">≈ ₹{formatInr(displayInr)}/mo</div>
            </>
          )}
        </div>

        <ul className="space-y-3 mb-7">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/85">
              <svg className="w-4 h-4 text-accent flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              {f}
            </li>
          ))}
        </ul>

        <Link to={isCustom ? "/contact" : "/free-audit"} className={highlighted ? "btn-primary w-full justify-center" : "btn-secondary w-full justify-center"}>
          {cta}
        </Link>

        {socialProof && (
          <p className="text-[11px] text-center text-muted-foreground mt-3 font-medium">
            {socialProof}
          </p>
        )}
      </GlowCard>
    </div>
  );
}
