import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title: string;
  description: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  dark?: boolean;
}

export default function CTASection({ title, description, primaryCta, secondaryCta, dark = false }: CTASectionProps) {
  return (
    <section className={`py-20 lg:py-28 ${dark ? "bg-foreground text-background" : "section-alt"}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={`font-poppins font-bold text-3xl lg:text-4xl mb-5 ${dark ? "text-white" : ""}`}>{title}</h2>
        <p className={`text-lg mb-8 max-w-2xl mx-auto ${dark ? "text-background/70" : "text-muted-foreground"}`}>{description}</p>
        <div className="flex flex-wrap justify-center gap-4">
          {primaryCta && (
            <Link to={primaryCta.to} className="btn-primary">
              {primaryCta.label} <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          {secondaryCta && (
            <Link to={secondaryCta.to} className={`btn-secondary ${dark ? "!text-white !border-white/30 hover:!bg-white/10" : ""}`}>
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
