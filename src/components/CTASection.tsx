import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { RevealSection } from "@/hooks/useScrollReveal";

interface CTASectionProps {
  title: string;
  description: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  /**
   * Use a feature/spotlight background variant.
   * Theme-aware: soft brand-tinted in light mode, dark gradient in dark mode.
   */
  dark?: boolean;
}

export default function CTASection({ title, description, primaryCta, secondaryCta, dark = false }: CTASectionProps) {
  return (
    <section
      className={`py-20 lg:py-28 relative overflow-hidden ${dark ? "cta-feature" : "section-alt"}`}
    >
      {dark && (
        <>
          <div
            className="absolute -top-[150px] -right-[150px] w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none"
            style={{ background: "hsl(var(--primary) / 0.18)" }}
          />
          <div
            className="absolute -bottom-[100px] -left-[100px] w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none"
            style={{ background: "hsl(var(--accent) / 0.12)" }}
          />
        </>
      )}
      <RevealSection>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-poppins font-bold text-3xl lg:text-4xl mb-5 text-foreground">{title}</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">{description}</p>
          <div className="flex flex-wrap justify-center gap-4">
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
      </RevealSection>
    </section>
  );
}
