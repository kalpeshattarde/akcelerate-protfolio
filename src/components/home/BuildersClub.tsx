import { Link } from "react-router-dom";
import { Users, MessageCircle, Calendar, ArrowRight } from "lucide-react";
import { RevealSection } from "@/hooks/useScrollReveal";
import { Magnetic } from "@/components/motion/MotionPrimitives";
import { trackEvent } from "@/lib/analytics";

const curriculum = ["n8n automations", "RAG builds", "Fine-tuning", "AI video", "Voice agents", "Landing pages"];

export default function BuildersClub() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="ak-dark-card" style={{ padding: "3rem" }}>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="hero-badge mb-4" style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}>
                  <Users className="w-3.5 h-3.5" /> AKcelerate Builders Club
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-4" style={{ color: "#fff" }}>
                  Join the <span className="hero-gradient-text">AI Builders Community</span>
                </h2>
                <p className="mb-6 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                  Live cohorts every Sunday. Learn what we build. Build what we ship. Free WhatsApp channel for resources, tools, and weekly drops.
                </p>
                <div className="flex items-center gap-3 mb-5">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>Next session: every Sunday at 9:00 PM IST</span>
                </div>
                <div className="ak-dc-muted text-[10px] mb-2 uppercase tracking-wider">Curriculum</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {curriculum.map((c) => (
                    <span key={c} className="text-[11px] font-medium px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.08)" }}>{c}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="text-center mb-2">
                  <div className="text-4xl font-bold font-poppins hero-gradient-text mb-1">500+</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>AI Builders Already Joined</div>
                </div>
                <Magnetic strength={14}>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("home_builders_club_cta_click", { destination: "whatsapp" })}
                    className="btn-primary w-full justify-center"
                  >
                    <MessageCircle className="w-4 h-4" /> Join WhatsApp Channel
                  </a>
                </Magnetic>
                <Magnetic strength={14}>
                  <Link
                    to="/contact?intent=cohort"
                    onClick={() => trackEvent("home_builders_club_cta_click", { destination: "cohort" })}
                    className="btn-secondary w-full justify-center"
                  >
                    Register for Sunday Cohort <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
