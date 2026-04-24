import { Link } from "react-router-dom";
import { Bot, ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { RevealSection } from "@/hooks/useScrollReveal";
import { Magnetic } from "@/components/motion/MotionPrimitives";
import { trackEvent } from "@/lib/analytics";

const capabilities = [
  "Understand instructions in natural language",
  "Break complex tasks into smaller steps",
  "Access external tools, APIs, and databases",
  "Retrieve knowledge from your docs (RAG)",
  "Execute business workflows automatically",
  "Continuously improve from real data",
];

const useCases = [
  "Customer support automation",
  "Data analysis & reporting",
  "Document processing",
  "Lead qualification & CRM updates",
  "Workflow orchestration",
  "Knowledge retrieval from internal data",
];

const integrations = ["CRMs", "Internal Databases", "SaaS Tools", "Messaging Platforms", "n8n Automations"];

export default function AIAgentsSection() {
  return (
    <section className="py-24 lg:py-32 section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <SectionHeader
            label="AI Agents as a Service"
            title={<>AI Agents That <span className="gradient-text">Think, Act & Execute</span></>}
            description="Autonomous LLM-powered systems that understand tasks, make decisions, and run workflows — so your team focuses on strategy, not repetitive work."
          />
        </RevealSection>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <RevealSection>
            <div className="glass-card p-7">
              <h3 className="font-poppins font-semibold mb-4 text-lg">What AI agents can do</h3>
              <ul className="space-y-2.5 mb-8">
                {capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
              <h3 className="font-poppins font-semibold mb-4 text-lg">Where they automate</h3>
              <ul className="space-y-2.5 mb-6">
                {useCases.map((u) => (
                  <li key={u} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    {u}
                  </li>
                ))}
              </ul>
              <Magnetic strength={14}>
                <Link
                  to="/contact?intent=ai-agents"
                  onClick={() => trackEvent("home_ai_agents_cta_click", {})}
                  className="btn-primary"
                >
                  Discuss your use case <ArrowRight className="w-4 h-4" />
                </Link>
              </Magnetic>
            </div>
          </RevealSection>

          <RevealSection delay={150}>
            <div className="ak-dark-card">
              <div className="flex items-center gap-3 mb-5">
                <div className="feature-icon" style={{ margin: 0 }}><Bot className="w-6 h-6 text-accent" /></div>
                <div>
                  <div className="ak-dc-title">Agent Activity</div>
                  <div className="ak-dc-sub">Live autonomous workflow</div>
                </div>
                <span className="ml-auto text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(34,197,94,0.15)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.25)" }}>● ACTIVE</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "→ Parse user intent", status: "Done", color: "#22C55E", w: "100%" },
                  { label: "→ Query CRM database", status: "Done", color: "#22C55E", w: "100%" },
                  { label: "→ RAG: retrieve docs", status: "Running", color: "#06B6D4", w: "72%" },
                  { label: "→ Generate response", status: "Queued", color: "#475569", w: "20%" },
                  { label: "→ Trigger n8n workflow", status: "Queued", color: "#475569", w: "5%" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1 ak-dc-text">
                      <span>{s.label}</span>
                      <span style={{ color: s.color }}>{s.status}</span>
                    </div>
                    <div className="ak-dc-bar-track" style={{ height: 6 }}>
                      <div className={i === 2 ? "process-anim-bar" : ""} style={{ height: 6, borderRadius: 99, width: s.w, background: "linear-gradient(90deg,#2563EB,#06B6D4)" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="ak-dc-muted text-[10px] mb-2 uppercase tracking-wider">Integrates with</div>
                <div className="flex flex-wrap gap-2">
                  {integrations.map((i) => (
                    <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.08)" }}>{i}</span>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
