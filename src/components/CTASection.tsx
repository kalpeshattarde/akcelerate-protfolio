import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { RevealSection } from "@/hooks/useScrollReveal";

interface CTASectionProps {
  title: string;
  description: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  dark?: boolean;
}

export default function CTASection({ title, description, primaryCta, secondaryCta, dark = false }: CTASectionProps) {
  return (
    <section className={`py-20 lg:py-28 relative overflow-hidden ${dark ? "" : "section-alt"}`}
      style={dark ? { background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)" } : undefined}>
      {dark && (
        <>
          <div className="absolute -top-[150px] -right-[150px] w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(37,99,235,0.12)" }} />
          <div className="absolute -bottom-[100px] -left-[100px] w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(6,182,212,0.08)" }} />
        </>
      )}
      <RevealSection>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className={`font-poppins font-bold text-3xl lg:text-4xl mb-5 ${dark ? "text-white" : ""}`}>{title}</h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${dark ? "text-slate-400" : ""}`} style={!dark ? { color: "#64748B" } : undefined}>{description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {primaryCta && (
              <Link to={primaryCta.to} className="btn-primary">
                {primaryCta.label} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            {secondaryCta && (
              <Link to={secondaryCta.to} className={`btn-secondary ${dark ? "!text-slate-300 !border-slate-600 hover:!bg-white/5" : ""}`}>
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </RevealSection>
    </section>
  );
}
