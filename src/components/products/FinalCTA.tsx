import { Link } from "react-router-dom";
import { ArrowRight, Rocket } from "lucide-react";
import { RevealSection } from "@/hooks/useScrollReveal";

export default function FinalCTA() {
  return (
    <section className="mt-20 mb-8 rounded-2xl relative overflow-hidden py-16 px-6"
      style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)" }}>
      <div className="absolute -top-[120px] -right-[120px] w-[350px] h-[350px] rounded-full blur-[80px] pointer-events-none"
        style={{ background: "rgba(37,99,235,0.15)" }} />
      <div className="absolute -bottom-[80px] -left-[80px] w-[250px] h-[250px] rounded-full blur-[80px] pointer-events-none"
        style={{ background: "rgba(6,182,212,0.1)" }} />

      <RevealSection>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <Rocket className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-white mb-4">
            Every Day You Don't Ship Is Revenue Lost
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
            Your competitors are launching while you're still debugging AI output.
            Grab a prototype, customize it, and ship before they do.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#products-catalog" className="btn-primary text-base px-8 py-3.5">
              Browse Prototypes Now <ArrowRight className="w-4 h-4" />
            </a>
            <Link to="/contact" className="btn-secondary !text-slate-300 !border-slate-600 hover:!bg-white/5 text-base px-8 py-3.5">
              Talk to Us
            </Link>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}
