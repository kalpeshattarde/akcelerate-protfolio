import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface HeroPrimaryProps {
  badge?: string;
  title: ReactNode;
  description: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  children?: ReactNode;
}

export function HeroPrimary({ badge, title, description, primaryCta, secondaryCta, children }: HeroPrimaryProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 hero-grid-bg" />
      <div className="absolute -top-[200px] -left-[200px] w-[700px] h-[700px] rounded-full blur-[80px] pointer-events-none" style={{ background: "hsl(var(--ak-primary) / 0.07)" }} />
      <div className="absolute -bottom-[150px] -right-[100px] w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none" style={{ background: "hsl(var(--ak-accent) / 0.07)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {badge && <div className="hero-badge">{badge}</div>}
            <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-[3.25rem] leading-tight mb-6">{title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">{description}</p>
            <div className="flex flex-wrap gap-4">
              {primaryCta && (
                <Link to={primaryCta.to} className="btn-primary">
                  {primaryCta.label} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              {secondaryCta && (
                <Link to={secondaryCta.to} className="btn-secondary">
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
          {children && <div>{children}</div>}
        </div>
      </div>
    </section>
  );
}

interface HeroPageProps {
  label?: string;
  title: ReactNode;
  description: string;
}

export function HeroPage({ label, title, description }: HeroPageProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 hero-grid-bg" />
      <div className="absolute -top-[150px] -left-[150px] w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none" style={{ background: "hsl(var(--ak-primary) / 0.06)" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {label && <span className="section-label">{label}</span>}
        <h1 className="font-poppins font-bold text-3xl md:text-5xl leading-tight mb-5">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
      </div>
    </section>
  );
}

interface HeroDarkProps {
  label?: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}

export function HeroDark({ label, title, description, children }: HeroDarkProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-foreground text-background">
      <div className="absolute inset-0 opacity-20 hero-grid-bg" />
      <div className="absolute -top-[150px] -right-[150px] w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none" style={{ background: "hsl(var(--ak-primary) / 0.2)" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            {label && <span className="section-label">{label}</span>}
            <h1 className="font-poppins font-bold text-3xl md:text-5xl leading-tight mb-5 text-white">{title}</h1>
            <p className="text-lg text-background/70 max-w-xl">{description}</p>
          </div>
          {children && <div>{children}</div>}
        </div>
      </div>
    </section>
  );
}
