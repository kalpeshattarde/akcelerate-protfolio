import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
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
import MagneticButton from "@/components/MagneticButton";
import { Magnetic } from "@/components/motion/MotionPrimitives";
import PersonalizedPicks from "@/components/products/PersonalizedPicks";
import WhatWeBuild from "@/components/home/WhatWeBuild";
import AIAgentsSection from "@/components/home/AIAgentsSection";
import AutomationShowcase from "@/components/home/AutomationShowcase";
import CustomAISection from "@/components/home/CustomAISection";
import BuildersClub from "@/components/home/BuildersClub";
import TrustStrip from "@/components/home/TrustStrip";
import FounderCard from "@/components/home/FounderCard";

// Lazy-load heavy below-the-fold-ish hero visuals to protect LCP
const HeroDashboard = lazy(() => import("@/components/HeroDashboard"));
const MeshBackground = lazy(() => import("@/components/motion/MeshBackground"));

const heroStats = [
  { value: "21 Days", label: "MVP Delivery" },
  { value: "25+", label: "Projects Delivered" },
  { value: "13+", label: "Industries Served" },
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

const reviewsJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AKcelerate",
    url: "https://akcelerate.lovable.app",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AKcelerate Solutions",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "MVP App Development in 21 Days", description: "Full-stack web app delivery for non-tech founders in 21 days.", url: "https://akcelerate.lovable.app/solutions/mvp-21day" },
      { "@type": "ListItem", position: 2, name: "AI / ML & MLOps", description: "Custom ML, generative AI and production-grade MLOps pipelines.", url: "https://akcelerate.lovable.app/solutions/ai-ml" },
      { "@type": "ListItem", position: 3, name: "Automation Systems & AI Agents", description: "n8n workflows and autonomous LLM agents wired into your stack.", url: "https://akcelerate.lovable.app/solutions/automation-systems" },
      { "@type": "ListItem", position: 4, name: "App & SaaS Development", description: "Custom web and mobile apps, MVPs and SaaS products.", url: "https://akcelerate.lovable.app/solutions/saas-dev" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How fast can you deliver an MVP?", acceptedAnswer: { "@type": "Answer", text: "We ship production-ready MVPs in 21 days using our proven discovery → build → launch playbook." } },
      { "@type": "Question", name: "Do you build AI agents?", acceptedAnswer: { "@type": "Answer", text: "Yes — we design, build, and deploy custom AI agents that integrate with CRMs, databases, n8n, and your SaaS stack." } },
      { "@type": "Question", name: "What kinds of automations do you build?", acceptedAnswer: { "@type": "Answer", text: "Instagram content bots, AI video pipelines, voice receptionists, and any custom n8n workflow." } },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="AI MVP Development in 21 Days"
        description="AKcelerate ships production-grade AI MVPs in 21 days, builds n8n automations & custom AI agents, and runs a 40+ SaaS template marketplace. Book a free AI audit →"
        path="/"
        jsonLd={reviewsJsonLd}
      />
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <Suspense fallback={null}><MeshBackground /></Suspense>
        <div className="absolute inset-0 hero-grid-bg" />
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
                AI Product Studio + Automation + Marketplace
              </div>
              <h1 className="text-display mb-6">
                Build AI Products, Automations<br />& Systems —{" "}
                <span className="hero-gradient-text">Fast</span>
              </h1>
              <p className="text-lg leading-relaxed mb-3 max-w-xl" style={{ color: "hsl(var(--ak-body))" }}>
                From idea → AI MVP in 21 days. Automate your business, ship custom AI, and launch faster than your competitors.
              </p>
              <p className="text-sm leading-relaxed mb-8 max-w-xl text-muted-foreground">
                Full-stack web apps · n8n automations · AI agents · custom AI trained on your data.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Magnetic strength={20}>
                  <Link to="/free-audit" className="btn-primary"><Play className="w-4 h-4" /> Start Free Audit</Link>
                </Magnetic>
                <Magnetic strength={14}>
                  <Link to="/products" className="btn-secondary">Explore Products <ArrowRight className="w-4 h-4" /></Link>
                </Magnetic>
              </div>
              <div className="hero-stat-strip">
                {heroStats.map((s, i) => (
                  <div key={i}>
                    <div className="stat-number" style={{ fontSize: s.value.length > 4 ? "1.5rem" : "1.75rem" }}><AnimatedStat value={s.value} /></div>
                    <div className="text-[11px] mt-1 text-muted-foreground tracking-wide uppercase">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animated-border">
              <Suspense fallback={<div className="aspect-video rounded-xl bg-muted/30 animate-pulse" />}>
                <HeroDashboard />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROCESS ═══════════════════ */}
      <section className="py-24 lg:py-32">
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

      {/* ═══════════════════ WHAT WE BUILD ═══════════════════ */}
      <WhatWeBuild />

      <section className="py-24 lg:py-32 section-alt">
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
      <section className="py-24 lg:py-32">
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

      {/* ═══════════════════ AI AGENTS ═══════════════════ */}
      <AIAgentsSection />

      {/* ═══════════════════ AUTOMATION SHOWCASE ═══════════════════ */}
      <AutomationShowcase />

      {/* ═══════════════════ CUSTOM AI ═══════════════════ */}
      <CustomAISection />

      {/* ═══════════════════ PERSONALIZED PICKS ═══════════════════ */}
      <PersonalizedPicks />

      {/* ═══════════════════ INDUSTRIES ═══════════════════ */}
      <section className="py-24 lg:py-32 section-alt">
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
      <section className="py-24 lg:py-32">
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
      <section className="py-24 lg:py-32 section-alt">
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

      <FAQAccordion items={generalFAQ} title="Frequently Asked Questions" />

      {/* ═══════════════════ BUILDERS CLUB ═══════════════════ */}
      <BuildersClub />

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
