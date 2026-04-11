import { Link } from "react-router-dom";
import { ArrowRight, Layers, Activity, Radio, Monitor, BarChart3, LayoutDashboard, Cloud, Settings, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Layers, Activity, Radio, Monitor, BarChart3, LayoutDashboard, Cloud, Settings,
};

interface SolutionCardProps {
  slug: string;
  title: string;
  description: string;
  icon: string;
}

export function SolutionCard({ slug, title, description, icon }: SolutionCardProps) {
  const Icon = iconMap[icon] || Layers;
  return (
    <Link to={`/solutions/${slug}`} className="glass-card p-8 group block h-full">
      <div className="feature-icon">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      <h3 className="font-poppins font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>
      <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
        Learn more <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  );
}

interface ServiceCardProps {
  slug: string;
  title: string;
  description: string;
}

export function ServiceCard({ slug, title, description }: ServiceCardProps) {
  return (
    <Link to={`/services/${slug}`} className="glass-card p-8 group block h-full">
      <h3 className="font-poppins font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>
      <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
        Explore <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
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
    <Link to={`/blog/${slug}`} className="glass-card overflow-hidden group block h-full">
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
  );
}

interface StatCardProps {
  metric: string;
  label: string;
}

export function StatCard({ metric, label }: StatCardProps) {
  return (
    <div className="glass-card p-6 text-center">
      <div className="stat-number mb-1">{metric}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

export function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <div className="glass-card p-8 h-full flex flex-col">
      <p className="text-muted-foreground text-sm leading-relaxed mb-5 italic flex-1">"{quote}"</p>
      <div>
        <div className="font-poppins font-semibold text-sm">{name}</div>
        <div className="text-xs text-muted-foreground">{role}</div>
      </div>
    </div>
  );
}

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export function PricingCard({ name, description, price, features, highlighted, cta }: PricingCardProps) {
  return (
    <div className={`pricing-card h-full flex flex-col ${highlighted ? "featured" : ""}`}>
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 pricing-badge">
          Most Popular
        </div>
      )}
      <h3 className="font-poppins font-bold text-xl mb-2">{name}</h3>
      <p className="text-muted-foreground text-sm mb-6">{description}</p>
      <div className="mb-6">
        <span className="font-poppins font-bold text-3xl">{price}</span>
        {price !== "Custom" && <span className="text-muted-foreground text-sm">/month</span>}
      </div>
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((f, i) => (
          <li key={i} className="pricing-feature">
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
            {f}
          </li>
        ))}
      </ul>
      <Link to="/contact" className={highlighted ? "btn-primary w-full justify-center" : "btn-secondary w-full justify-center"}>
        {cta}
      </Link>
    </div>
  );
}
