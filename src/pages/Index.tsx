import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Shield, Zap, BarChart3, Users, Globe, Play } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import { SolutionCard } from "@/components/Cards";
import { solutions } from "@/data/solutions";
import { generalFAQ } from "@/data/faq";
import { industries } from "@/data/industries";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { AnimatedStat } from "@/hooks/useCountUp";

const heroStats = [
  { value: "25+", label: "Projects Delivered" },
  { value: "13+", label: "Industries Served" },
  { value: "8+", label: "Solution Areas" },
  { value: "315%", label: "Average Client ROI" },
];

const processSteps = [
  { num: 1, title: "Discovery", desc: "Deep-dive into your business goals, data landscape, and pain points to pinpoint the highest-impact opportunity." },
  { num: 2, title: "Strategy & Design", desc: "Build a clear roadmap with milestones, technology choices, and upfront success metrics tailored to your goals." },
  { num: 3, title: "Build & Integrate", desc: "Agile development with seamless integration into your existing ERP, CRM, data pipelines, and cloud systems." },
  { num: 4, title: "Deploy & Go Live", desc: "Rigorous QA, team training, and zero-disruption deployment to production with dedicated launch support." },
  { num: 5, title: "Monitor & Scale", desc: "Ongoing performance monitoring, model retraining, and continuous improvements to maximise long-term ROI." },
];

const benefits = [
  { icon: TrendingUp, title: "Transform Raw Data into Insights", desc: "Unify disparate business data streams into a single intelligent analytics layer that surfaces actionable intelligence instantly.", metric: "10x", metricLabel: "faster insights vs. manual reporting" },
  { icon: Shield, title: "Enterprise-Grade Security", desc: "SOC 2 compliant infrastructure with end-to-end encryption, RBAC, and audit trails for complete data governance.", metric: "100%", metricLabel: "data security compliance" },
  { icon: Zap, title: "Accelerate Time to Market", desc: "Go from concept to production in weeks, not months, with our proven rapid delivery methodology.", metric: "3x", metricLabel: "faster time to market" },
  { icon: BarChart3, title: "Measurable Business Impact", desc: "Every engagement starts with clear KPIs tied to revenue growth, cost reduction, or operational efficiency.", metric: "315%", metricLabel: "average 3-year client ROI" },
  { icon: Users, title: "Dedicated Expert Teams", desc: "Cross-functional teams of data scientists, ML engineers, full-stack developers, and business strategists.", metric: "50+", metricLabel: "projects delivered" },
  { icon: Globe, title: "Cross-Industry Expertise", desc: "Deep domain knowledge across manufacturing, fintech, healthcare, retail, logistics, energy, and more.", metric: "13+", metricLabel: "industries served" },
];

const techStack = ["Python", "TensorFlow", "PyTorch", "React", "Node.js", "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Power BI", "Tableau", "Snowflake", "Apache Kafka", "MLflow", "PostgreSQL", "Scikit-learn", "OpenCV", "dbt", "Airflow"];

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 hero-grid-bg" />
        <div className="absolute -top-[200px] -left-[200px] w-[700px] h-[700px] rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(37,99,235,0.07)" }} />
        <div className="absolute -bottom-[150px] -right-[100px] w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(6,182,212,0.07)" }} />
        {[
          { size: 4, color: "rgba(37,99,235,0.7)", left: "12%", top: "75%", dur: "6s", delay: "0s" },
          { size: 3, color: "rgba(6,182,212,0.8)", left: "22%", top: "80%", dur: "8s", delay: "1.2s" },
          { size: 5, color: "rgba(139,92,246,0.6)", left: "35%", top: "85%", dur: "7s", delay: "0.5s" },
          { size: 3, color: "rgba(37,99,235,0.6)", left: "55%", top: "78%", dur: "9s", delay: "2s" },
          { size: 4, color: "rgba(6,182,212,0.7)", left: "68%", top: "82%", dur: "6.5s", delay: "0.8s" },
          { size: 3, color: "rgba(139,92,246,0.7)", left: "78%", top: "76%", dur: "7.5s", delay: "1.8s" },
          { size: 4, color: "rgba(37,99,235,0.5)", left: "88%", top: "88%", dur: "5.5s", delay: "3s" },
        ].map((p, i) => (
          <div key={i} className="hero-particle" style={{ width: p.size, height: p.size, background: p.color, left: p.left, top: p.top, animationDuration: p.dur, animationDelay: p.delay }} />
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="hero-badge">
                <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                AI · Data · Automation · Consulting
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.12] mb-6 font-poppins">
                Increase Revenue & Profit<br />with{" "}
                <span className="hero-gradient-text">AI, Data Science & Digital Solutions</span>
              </h1>
              <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "hsl(var(--ak-body))" }}>
                We help businesses increase revenue and profit using AI, data science, and digital solutions. Our mission is simple: turn data into measurable business results.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/solutions" className="btn-primary"><Play className="w-4 h-4" /> Explore Solutions</Link>
                <Link to="/contact" className="btn-secondary">Book a Consultation <ArrowRight className="w-4 h-4" /></Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {heroStats.map((s, i) => (
                  <div key={i} className="hero-stat-card text-center">
                    <div className="stat-number" style={{ fontSize: s.value.length > 4 ? "1.5rem" : "1.75rem" }}><AnimatedStat value={s.value} /></div>
                    <div className="text-xs mt-1 text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="float-anim">
                <div className="dashboard-mockup">
                  <div className="flex items-center gap-1.5 px-3 py-2.5" style={{ background: "#0F172A", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#EF4444" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#F59E0B" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#10B981" }} />
                    <span className="text-xs ml-3 font-mono" style={{ color: "#9CA3AF" }}>akcelerate.ai · services</span>
                    <span className="ml-auto text-[10px] font-bold tracking-wide" style={{ color: "#10B981" }}>● LIVE</span>
                  </div>
                  <div className="grid grid-cols-4 gap-[3px] px-2.5 pt-2.5 pb-1">
                    {["🤖 Automation", "🧠 AI/ML", "📊 Analytics", "💻 SaaS"].map((t, i) => (
                      <div key={i} className={`text-center py-1.5 rounded-md text-[9px] font-semibold cursor-pointer transition-all ${i === 0 ? "text-white" : "text-slate-400 hover:text-white"}`}
                        style={{ background: i === 0 ? "linear-gradient(135deg, rgba(37,99,235,0.4), rgba(6,182,212,0.3))" : "rgba(255,255,255,0.04)", border: i === 0 ? "1px solid rgba(37,99,235,0.4)" : "1px solid rgba(255,255,255,0.06)" }}>
                        {t}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-4 gap-[3px] px-2.5 pb-2">
                    {["📈 Data Viz", "☁️ Cloud", "🔄 MLOps", "🎯 Strategy"].map((t, i) => (
                      <div key={i} className="text-center py-1.5 rounded-md text-[9px] font-semibold cursor-pointer text-slate-400 hover:text-white transition-all"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        {t}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between px-3 py-1">
                    <span className="text-[11px] font-bold text-white font-poppins">Business Automation</span>
                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ color: "#34D399", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)" }}>● Active</span>
                  </div>
                  <div className="mx-3 mb-2 rounded-lg overflow-hidden" style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.04)", height: "100px" }}>
                    <div className="flex items-end gap-1 h-full p-3 pb-2">
                      {[30, 45, 35, 55, 48, 65, 58, 72, 68, 80, 75, 92, 85, 70, 88, 95].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t-sm transition-all" style={{
                          height: `${h}%`,
                          background: `linear-gradient(180deg, ${i < 10 ? 'rgba(37,99,235,0.8)' : 'rgba(6,182,212,0.8)'}, rgba(37,99,235,0.2))`,
                          opacity: 0.5 + (i / 32),
                        }} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-3 pb-2 overflow-hidden">
                    {["Audit", "Map", "Build", "Test", "Deploy"].map((step, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <span className={`text-[8px] font-semibold px-2 py-1 rounded-md ${i < 2 ? 'text-white' : 'text-slate-500'}`}
                          style={{ background: i < 2 ? 'linear-gradient(135deg, rgba(37,99,235,0.4), rgba(6,182,212,0.3))' : 'rgba(255,255,255,0.04)', border: '1px solid ' + (i < 2 ? 'rgba(37,99,235,0.3)' : 'rgba(255,255,255,0.06)') }}>
                          {step}
                        </span>
                        {i < 4 && <span className="text-slate-600 text-[8px]">›</span>}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-1 px-3 pb-2">
                    {[
                      { label: "ROI", value: "315%", color: "#2563EB", bg: "rgba(37,99,235,0.07)", border: "rgba(37,99,235,0.15)", sub: "↑ avg client" },
                      { label: "Automation", value: "58%", color: "#A78BFA", bg: "rgba(139,92,246,0.07)", border: "rgba(139,92,246,0.15)", sub: "time saved" },
                      { label: "Accuracy", value: "94.7%", color: "#06B6D4", bg: "rgba(6,182,212,0.07)", border: "rgba(6,182,212,0.15)", sub: "AI models" },
                    ].map((m, i) => (
                      <div key={i} className="rounded-lg p-2 text-center" style={{ background: m.bg, border: `1px solid ${m.border}` }}>
                        <div className="text-[9px] mb-0.5" style={{ color: "#64748B" }}>{m.label}</div>
                        <div className="text-sm font-bold font-poppins" style={{ color: m.color }}>{m.value}</div>
                        <div className="text-[8px]" style={{ color: "#34D399" }}>{m.sub}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mx-3 mb-3 rounded-lg px-3 py-2" style={{ background: "rgba(0,0,0,0.22)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="text-[10px] font-mono" style={{ color: "#4ADE80" }}>$ ai_pipeline.run() → optimizing workflows...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ INTEGRATION STRIP ═══════════════════ */}
      <div className="py-8 border-y" style={{ background: "hsl(var(--ak-section-alt))" }}>
        <div className="max-w-7xl mx-auto px-4 mb-5">
          <p className="text-center text-muted-foreground text-sm">Integrates with your existing business systems & tools</p>
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10" style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10" style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }} />
          <div className="integration-track">
            {[...["SAP ERP", "HubSpot CRM", "Google Analytics", "Stripe Payments", "PostgreSQL", "Salesforce CRM", "Microsoft Azure", "AWS Cloud"], ...["SAP ERP", "HubSpot CRM", "Google Analytics", "Stripe Payments", "PostgreSQL", "Salesforce CRM", "Microsoft Azure", "AWS Cloud"]].map((t, i) => (
              <span key={i} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-card border border-border text-muted-foreground" style={{ boxShadow: "var(--shadow-sm)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════ ABOUT / OVERVIEW ═══════════════════ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <span className="section-label">Overview</span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                We Turn Data Into<br />
                <span className="gradient-text">Measurable Business Results</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We are a data-driven growth company specializing in AI, machine learning, and digital solutions that help businesses scale faster and smarter.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our AI solutions continuously learn from your business data, surfacing insights invisible to the human eye — enabling proactive decisions before problems escalate into costly mistakes.
              </p>
              <div className="space-y-3">
                {[
                  "Automate manual workflows saving 40–60% operational time",
                  "Machine learning and AI model development for smarter growth",
                  "Custom web development for modern digital products",
                  "Growth strategy and performance optimization tied to revenue",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #2563EB, #06B6D4)" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <span className="text-sm text-muted-foreground">{text}</span>
                  </div>
                ))}
              </div>
            </RevealSection>
            <RevealSection delay={200}>
              <div className="glass-card p-6" style={{ borderRadius: 20 }}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-poppins font-semibold">Business Performance Over Time</p>
                    <p className="text-xs text-muted-foreground">After AKcelerate AI engagement</p>
                  </div>
                  <span className="tag-pill">+18.3%</span>
                </div>
                <div className="h-[200px] flex items-end gap-1.5 p-4 rounded-xl" style={{ background: "hsl(var(--muted))" }}>
                  {[20, 30, 25, 40, 35, 50, 45, 55, 60, 52, 65, 70, 62, 75, 80, 72, 85, 90, 82, 95].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: `linear-gradient(180deg, ${i < 12 ? '#2563EB' : '#06B6D4'}, rgba(37,99,235,0.2))`, opacity: 0.5 + (i / 40) }} />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="rounded-xl p-4" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.15)" }}>
                    <div className="stat-number text-2xl mb-1">500+</div>
                    <div className="text-xs text-muted-foreground">Data Sources Integrated</div>
                  </div>
                  <div className="rounded-xl p-4" style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.15)" }}>
                    <div className="stat-number text-2xl mb-1">50ms</div>
                    <div className="text-xs text-muted-foreground">Real-time Latency</div>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════ PROCESS ═══════════════════ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="Our Process"
              title={<>How We <span className="gradient-text">Transform Businesses</span></>}
              description="A proven 5-step engagement model — from discovery to measurable impact — delivered in weeks, not months."
            />
          </RevealSection>

          <RevealGrid className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-2 mb-16" stagger={120}>
            {processSteps.map((s, i) => (
              <div key={s.num} className="reveal-item flex items-start md:items-center md:flex-col gap-4 md:gap-0 flex-1 text-center relative">
                <div className="process-number mx-auto mb-3">{s.num}</div>
                <div className="md:text-center">
                  <h3 className="font-poppins font-semibold text-sm mb-1">{s.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed max-w-[180px]">{s.desc}</p>
                </div>
                {i < 4 && <div className="hidden md:block absolute top-6 left-[calc(50%+30px)] w-[calc(100%-60px)] h-[2px]" style={{ background: "linear-gradient(90deg, rgba(37,99,235,0.3), rgba(6,182,212,0.3))" }} />}
              </div>
            ))}
          </RevealGrid>

          <RevealGrid className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16" stagger={100}>
            {[
              { val: "2–4", label: "Weeks to first working prototype", bg: "rgba(37,99,235,0.06)", border: "rgba(37,99,235,0.15)" },
              { val: "40–60%", label: "Reduction in manual operational time", bg: "rgba(6,182,212,0.06)", border: "rgba(6,182,212,0.15)" },
              { val: "315%", label: "Average 3-year client ROI delivered", bg: "rgba(16,185,129,0.06)", border: "rgba(16,185,129,0.15)" },
              { val: "92%", label: "Client retention & repeat engagement", bg: "rgba(124,58,237,0.06)", border: "rgba(124,58,237,0.15)" },
            ].map((s, i) => (
              <div key={i} className="reveal-item impact-stat" style={{ background: s.bg, borderColor: s.border }}>
                <div className="impact-stat-num"><AnimatedStat value={s.val} /></div>
                <div className="impact-stat-label">{s.label}</div>
              </div>
            ))}
          </RevealGrid>

          <RevealSection delay={200}>
            <div className="ak-dark-card">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="ak-dc-title">Project Delivery Dashboard</div>
                  <div className="ak-dc-sub">Typical AKcelerate engagement timeline</div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(34,197,94,0.15)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.25)" }}>● LIVE TRACKING</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "1. Discovery & Audit", status: "✓ Complete", statusColor: "#22C55E", width: "100%", gradient: "linear-gradient(90deg,#2563EB,#06B6D4)" },
                  { label: "2. Strategy & Roadmap", status: "✓ Complete", statusColor: "#22C55E", width: "100%", gradient: "linear-gradient(90deg,#06B6D4,#10B981)" },
                  { label: "3. Build & Integrate", status: "In Progress — Week 4", statusColor: "#06B6D4", width: "68%", gradient: "linear-gradient(90deg,#7C3AED,#2563EB)" },
                  { label: "4. Deploy & Go Live", status: "Scheduled — Week 6", statusColor: "#475569", width: "15%", gradient: "rgba(255,255,255,0.15)" },
                  { label: "5. Monitor & Scale", status: "Ongoing post-launch", statusColor: "#475569", width: "5%", gradient: "rgba(255,255,255,0.1)" },
                ].map((bar, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1 ak-dc-text">
                      <span>{bar.label}</span>
                      <span style={{ color: bar.statusColor }}>{bar.status}</span>
                    </div>
                    <div className="ak-dc-bar-track" style={{ height: 8 }}>
                      <div className={i === 2 ? "process-anim-bar" : ""} style={{ height: 8, borderRadius: 99, width: bar.width, background: bar.gradient, boxShadow: i < 3 ? `0 0 10px ${bar.statusColor}40` : "none", transition: "width 2s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {[
                  { value: "68%", label: "Project Progress", gradient: "linear-gradient(135deg,#2563EB,#06B6D4)" },
                  { value: "4 wks", label: "Time Invested", gradient: "linear-gradient(135deg,#10B981,#06B6D4)" },
                  { value: "On Track", label: "Delivery Status", gradient: "linear-gradient(135deg,#7C3AED,#2563EB)" },
                ].map((m, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl font-extrabold font-poppins bg-clip-text" style={{ background: m.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{m.value}</div>
                    <div className="ak-dc-muted text-[10px]">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════ BENEFITS ═══════════════════ */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="Core Benefits"
              title={<>Why Businesses Choose <span className="gradient-text">AKcelerate</span></>}
              description="Measurable results delivered across 13+ industries — from startups and SMBs to large enterprises worldwide."
            />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={100}>
            {benefits.map((b, i) => (
              <div key={i} className="reveal-item glass-card p-7">
                <div className="feature-icon"><b.icon className="w-6 h-6 text-accent" /></div>
                <h3 className="font-poppins font-semibold text-lg mb-2">{b.title}</h3>
                <p className="text-sm leading-relaxed mb-3 text-muted-foreground">{b.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold font-poppins gradient-text"><AnimatedStat value={b.metric} /></span>
                  <span className="text-xs text-muted-foreground">{b.metricLabel}</span>
                </div>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════ SOLUTIONS ═══════════════════ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="Solution Areas"
              title={<>8 Ways We Drive <span className="gradient-text">Business Growth</span></>}
              description="Comprehensive solutions across AI, automation, analytics, cloud, and digital transformation."
            />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={80}>
            {solutions.map(s => (
              <div key={s.slug} className="reveal-item">
                <SolutionCard slug={s.slug} title={s.shortTitle} description={s.description} icon={s.icon} />
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      {/* ═══════════════════ INDUSTRIES ═══════════════════ */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="Industries"
              title={<>Trusted Across <span className="gradient-text">13+ Industries</span></>}
              description="Deep domain expertise across manufacturing, finance, healthcare, retail, and more."
            />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-5" stagger={80}>
            {industries.slice(0, 8).map((ind, i) => (
              <div key={i} className="reveal-item glass-card p-6">
                <h3 className="font-poppins font-semibold mb-2">{ind.name}</h3>
                <p className="text-xs leading-relaxed mb-3 text-muted-foreground">{ind.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {ind.useCases.slice(0, 3).map((u, j) => (
                    <span key={j} className="tag-pill">{u}</span>
                  ))}
                </div>
              </div>
            ))}
          </RevealGrid>
          <div className="text-center mt-10">
            <Link to="/industries" className="btn-secondary">View All Industries <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TECH STACK ═══════════════════ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="Technology"
              title={<>Enterprise-Grade <span className="gradient-text">Tech Stack</span></>}
              description="We use the best tools for each project — chosen for performance, not vendor loyalty."
            />
          </RevealSection>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10" style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10" style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }} />
            <div className="flex gap-3 overflow-hidden">
              <div className="integration-track">
                {[...techStack, ...techStack].map((t, i) => (
                  <span key={i} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-card border border-border text-muted-foreground" style={{ boxShadow: "var(--shadow-sm)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CASE STUDIES ═══════════════════ */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="Results"
              title={<>Real Impact, <span className="gradient-text">Real Numbers</span></>}
              description="See how we've delivered measurable growth for businesses across industries."
            />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-3 gap-6" stagger={120}>
            {[
              { title: "Manufacturing AI Transformation", metric: "85%", label: "Downtime Reduction", desc: "Predictive maintenance and quality AI for a mid-size manufacturer, reducing downtime by 85% and defect rates by 60%.", stats: [{ v: "85%", l: "Downtime ↓" }, { v: "60%", l: "Defects ↓" }, { v: "₹2.4Cr", l: "Savings" }] },
              { title: "E-commerce Growth Engine", metric: "35%", label: "Revenue Increase", desc: "Personalization engine and demand forecasting system that increased revenue by 35% and reduced inventory waste by 28%.", stats: [{ v: "35%", l: "Revenue ↑" }, { v: "28%", l: "Waste ↓" }, { v: "95%", l: "Accuracy" }] },
              { title: "Fintech Risk Analytics", metric: "99.7%", label: "Detection Accuracy", desc: "Real-time fraud detection system processing 10M+ transactions daily with 99.7% accuracy.", stats: [{ v: "99.7%", l: "Accuracy" }, { v: "10M+", l: "Daily Txns" }, { v: "₹8Cr", l: "Fraud Stopped" }] },
            ].map((c, i) => (
              <div key={i} className="reveal-item glass-card p-7">
                <span className="tag-pill mb-4 block w-fit">{c.label}</span>
                <h3 className="font-poppins font-semibold text-lg mb-2">{c.title}</h3>
                <p className="text-sm mb-5 text-muted-foreground">{c.desc}</p>
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
                  {c.stats.map((s, j) => (
                    <div key={j} className="text-center">
                      <div className="font-poppins font-bold text-lg gradient-text"><AnimatedStat value={s.v} /></div>
                      <div className="text-[10px] text-muted-foreground">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </RevealGrid>
          <div className="text-center mt-10">
            <Link to="/case-studies" className="btn-secondary">View All Case Studies <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="Client Stories"
              title={<>What Our <span className="gradient-text">Clients Say</span></>}
              description="Real business owners and leaders sharing how AKcelerate changed their operations and growth trajectory."
            />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-3 gap-6" stagger={100}>
            {[
              { quote: "AKcelerate deployed a predictive maintenance system that cut our unplanned downtime by 42% in just three months. The ROI was clear within the first quarter. Exceptional team and delivery.", name: "Rohit Kapoor", role: "VP Operations, AutoTech Industries", initials: "RK", gradient: "linear-gradient(135deg, #2563EB, #06B6D4)" },
              { quote: "Our sales grew 60% after AKcelerate built us a personalised recommendation engine and marketing automation system. They understood our business before writing a single line of code.", name: "Ananya Shah", role: "CEO, StyleBazaar Ecommerce", initials: "AS", gradient: "linear-gradient(135deg, #7C3AED, #06B6D4)" },
              { quote: "The BI dashboard AKcelerate built replaced three different reporting tools. Now every department has real-time data. Claims processing dropped from 8 days to under 4. Phenomenal work.", name: "Prateek Mehta", role: "COO, BrightShield Insurance", initials: "PM", gradient: "linear-gradient(135deg, #059669, #06B6D4)" },
            ].map((t, i) => (
              <div key={i} className="reveal-item glass-card p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center font-poppins font-bold text-white text-sm flex-shrink-0" style={{ background: t.gradient }}>{t.initials}</div>
                  <div>
                    <div className="font-poppins font-semibold text-sm">{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════ FREE AUDIT CTA ═══════════════════ */}
      <section className="py-20 lg:py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #F0FDFF 50%, #ECFEFF 100%)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <RevealSection>
              <div className="hero-badge mb-5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                FREE — No Obligation — 60 Minutes
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
                Book Your Free<br /><span className="gradient-text">Business Audit</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                In 60 minutes, our experts map your systems, identify automation opportunities, assess your AI readiness, and deliver a written roadmap — at zero cost.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {["Systems & process audit", "Data infrastructure review", "AI readiness assessment", "Automation opportunity map", "ROI potential analysis", "Custom roadmap (48-hr delivery)"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/free-audit" className="btn-primary text-base px-8 py-4">Book My Free Audit</Link>
                <Link to="/contact" className="btn-secondary text-base px-7 py-4">Talk to Us First</Link>
              </div>
            </RevealSection>
            <RevealSection delay={200}>
              <div className="chart-card" style={{ borderRadius: 24, overflow: "hidden", padding: 0 }}>
                <div style={{ background: "linear-gradient(135deg, #2563EB, #06B6D4)", padding: "28px 28px 24px" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                    </div>
                    <div>
                      <p className="font-poppins font-semibold text-white">Free Business Audit</p>
                      <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>60-min session + written report</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[{ val: "60", label: "Min Session" }, { val: "48h", label: "Report ETA" }, { val: "₹0", label: "Cost" }].map((s, i) => (
                      <div key={i} className="rounded-xl p-3.5 text-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                        <p className="text-[22px] font-bold text-white leading-none">{s.val}</p>
                        <p className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.75)" }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-7">
                  <p className="font-poppins font-semibold text-sm mb-4">What past clients discovered</p>
                  <div className="space-y-3">
                    {[
                      { label: "Avg automation opportunities found", value: "7+ per business", width: 72, color: "#2563EB" },
                      { label: "Avg annual savings identified", value: "₹28L+", width: 84, color: "#06B6D4" },
                      { label: "Clients found it \"very valuable\"", value: "94%", width: 94, color: "#10B981" },
                    ].map((bar, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>{bar.label}</span>
                          <span className="font-semibold" style={{ color: bar.color }}>{bar.value}</span>
                        </div>
                        <div className="skill-bar-track">
                          <div className="skill-bar-fill" style={{ width: `${bar.width}%`, background: `linear-gradient(90deg, ${bar.color}, ${bar.color}88)` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/free-audit" className="btn-primary w-full justify-center mt-6">Claim My Free Slot</Link>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <FAQAccordion items={generalFAQ} title="Frequently Asked Questions" />

      <CTASection
        title="Ready to Accelerate Your Growth?"
        description="Book a free audit and discover how AI, data science, and digital solutions can transform your business — in weeks, not months."
        primaryCta={{ label: "Book Free Audit", to: "/free-audit" }}
        secondaryCta={{ label: "Explore Solutions", to: "/solutions" }}
        dark
      />
    </>
  );
}
