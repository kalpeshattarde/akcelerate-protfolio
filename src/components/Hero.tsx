import { ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function useParallax(speed = 0.3) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = -rect.top * speed;
      setOffset(scrolled);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offset };
}

// Floating particles with parallax
function ParallaxParticles() {
  const particles = [
    { top: "15%", left: "10%", size: 6, delay: 0, speed: 0.4 },
    { top: "25%", right: "15%", size: 4, delay: 1.2, speed: 0.6 },
    { top: "60%", left: "20%", size: 5, delay: 0.8, speed: 0.3 },
    { top: "70%", right: "25%", size: 7, delay: 2, speed: 0.5 },
    { top: "40%", left: "75%", size: 3, delay: 1.5, speed: 0.7 },
    { top: "80%", left: "50%", size: 4, delay: 0.5, speed: 0.4 },
  ];

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="hero-particle"
          style={{
            top: p.top,
            left: p.left,
            right: (p as any).right,
            width: p.size,
            height: p.size,
            background: i % 2 === 0
              ? "rgba(37,99,235,0.3)"
              : "rgba(6,182,212,0.3)",
            animationDuration: `${3 + p.speed * 4}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}

interface HeroPrimaryProps {
  badge?: string;
  title: ReactNode;
  description: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  children?: ReactNode;
}

export function HeroPrimary({ badge, title, description, primaryCta, secondaryCta, children }: HeroPrimaryProps) {
  const { ref, offset } = useParallax(0.3);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Parallax background layers */}
      <div
        className="absolute inset-0 hero-grid-bg"
        style={{ transform: `translateY(${offset * 0.5}px)` }}
      />
      <div
        className="absolute -top-[200px] -left-[200px] w-[700px] h-[700px] rounded-full blur-[80px] pointer-events-none transition-transform duration-100"
        style={{ background: "hsl(var(--primary) / 0.07)", transform: `translateY(${offset * 0.8}px)` }}
      />
      <div
        className="absolute -bottom-[150px] -right-[100px] w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none transition-transform duration-100"
        style={{ background: "hsl(var(--accent) / 0.07)", transform: `translateY(${offset * 0.6}px)` }}
      />
      <ParallaxParticles />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {badge && <div className="hero-badge">{badge}</div>}
            <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-[3.25rem] leading-tight mb-6 text-foreground">{title}</h1>
            <p className="text-lg leading-relaxed mb-8 max-w-xl text-muted-foreground">{description}</p>
            <div className="flex flex-wrap gap-4">
              {primaryCta && <Link to={primaryCta.to} className="btn-primary">{primaryCta.label} <ArrowRight className="w-4 h-4" /></Link>}
              {secondaryCta && <Link to={secondaryCta.to} className="btn-secondary">{secondaryCta.label}</Link>}
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
  const { ref, offset } = useParallax(0.25);

  return (
    <section
      ref={ref}
      className="relative pt-32 pb-20 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div
        className="absolute inset-0 hero-grid-bg"
        style={{ transform: `translateY(${offset * 0.4}px)` }}
      />
      <div
        className="absolute -top-[150px] -left-[150px] w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none"
        style={{ background: "hsl(var(--primary) / 0.06)", transform: `translateY(${offset * 0.7}px)` }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {label && <span className="section-label">{label}</span>}
        <h1 className="font-poppins font-bold text-3xl md:text-5xl leading-tight mb-5 text-foreground">{title}</h1>
        <p className="text-lg max-w-2xl mx-auto text-muted-foreground">{description}</p>
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
  const { ref, offset } = useParallax(0.25);

  return (
    <section
      ref={ref}
      className="relative pt-32 pb-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-30 hero-grid-bg"
        style={{ transform: `translateY(${offset * 0.4}px)` }}
      />
      <div
        className="absolute -top-[150px] -right-[150px] w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none"
        style={{ background: "rgba(37,99,235,0.15)", transform: `translateY(${offset * 0.7}px)` }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            {label && <span className="section-label">{label}</span>}
            <h1 className="font-poppins font-bold text-3xl md:text-5xl leading-tight mb-5 text-white">{title}</h1>
            <p className="text-lg text-slate-400 max-w-xl">{description}</p>
          </div>
          {children && <div>{children}</div>}
        </div>
      </div>
    </section>
  );
}
