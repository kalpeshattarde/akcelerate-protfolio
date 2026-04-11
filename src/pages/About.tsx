import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { TiltCard } from "@/hooks/useTiltCard";
import { AnimatedStat } from "@/hooks/useCountUp";
import VizCanvas from "@/components/viz/VizCanvas";

const team = [
  { name: "Kalpesh Attarde", role: "Founder & CEO", desc: "Data scientist and AI strategist with deep expertise in machine learning, data engineering, business automation, and enterprise software.", img: "/images/kalpesh-attarde.jpeg" },
  { name: "Rakesh Chaudhari", role: "Cloud & DevOps Lead", desc: "6+ years in cloud & Kubernetes, CI/CD, infrastructure provisioning, release management, and process enhancement.", img: "/images/rakesh-chaudhari.jpeg" },
  { name: "Kaushal Bharambe", role: "AI/ML Engineer", desc: "Specializes in LLM engineering, AI automation pipelines, and real-time ML systems for business applications.", img: "/images/kaushal-bharambe.png" },
];

export default function AboutPage() {
  return (
    <>
      {/* PAGE HERO — 2-column layout matching source */}
      <section className="relative pt-[5.5rem] pb-14 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 z-0 opacity-80">
          <VizCanvas mode="about" />
        </div>
        <div className="absolute inset-0 hero-grid-bg z-[1]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label">Our Story</span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight font-poppins">
                Built by Problem-Solvers,<br /><span className="gradient-text">For Real Businesses</span>
              </h1>
              <p className="text-lg mb-8 max-w-lg" style={{ color: "hsl(var(--ak-body))" }}>
                AKcelerate was founded with a simple mission: make powerful AI and automation accessible to every business in India — turning data and technology into measurable competitive advantage.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link to="/contact" className="btn-primary text-base px-7 py-3.5">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                  Get in Touch
                </Link>
                <Link to="/case-studies" className="btn-secondary text-base px-7 py-3.5">See Our Work</Link>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center"><div className="text-2xl font-bold gradient-text font-poppins"><AnimatedStat value="50+" /></div><div className="text-xs text-muted-foreground mt-1">Clients</div></div>
                <div className="text-center"><div className="text-2xl font-bold gradient-text font-poppins"><AnimatedStat value="13+" /></div><div className="text-xs text-muted-foreground mt-1">Industries</div></div>
                <div className="text-center"><div className="text-2xl font-bold gradient-text font-poppins"><AnimatedStat value="315%" /></div><div className="text-xs text-muted-foreground mt-1">Avg ROI</div></div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="ak-dark-card" style={{ minHeight: 380, position: "relative", overflow: "hidden" }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22C55E" }} />
                  <span className="text-xs text-slate-400">Business Impact Over Time</span>
                  <span className="ml-auto text-[10px] font-bold" style={{ color: "#22C55E" }}>LIVE</span>
                </div>
                <div style={{ position: "absolute", inset: "40px 0 0 0" }}>
                  <VizCanvas mode="about" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealSection>
            <SectionHeader label="Who We Are" title={<>AI & Automation: Technology That <span className="gradient-text">Drives Growth</span></>} description="AKcelerate partners with businesses across 13+ industries to design, build, and deploy AI systems, automation workflows, analytics platforms, and software products that create measurable ROI." />
          </RevealSection>
          <RevealSection delay={200}>
            <div className="max-w-3xl mx-auto glass-card p-8 text-muted-foreground leading-relaxed space-y-4">
              <p>We combine deep technical expertise with real business acumen — so every solution we build is grounded in outcomes, not just algorithms. From startup MVPs to enterprise transformations, we scale with you.</p>
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="Team" title={<>Expert Minds Behind <span className="gradient-text">Every Insight</span></>} description="A multidisciplinary team combining deep AI, data, and software expertise with real business domain knowledge across 13+ industries." />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={120}>
            {team.map((t, i) => (
              <TiltCard key={i} className="reveal-item glass-card p-7 text-center">
                <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover object-top" style={{ boxShadow: "0 4px 16px rgba(37,99,235,0.18)" }} />
                <h3 className="font-poppins font-semibold text-lg">{t.name}</h3>
                <div className="text-accent text-sm font-medium mb-3">{t.role}</div>
                <p className="text-muted-foreground text-sm">{t.desc}</p>
              </TiltCard>
            ))}
          </RevealGrid>
        </div>
      </section>

      <CTASection title="Ready to Work With The AKcelerate Team?" description="Talk to Kalpesh and the AKcelerate team. We're ready to show you exactly what's possible for your business with AI and automation." primaryCta={{ label: "Contact Us", to: "/contact" }} secondaryCta={{ label: "Free Audit", to: "/free-audit" }} dark />
    </>
  );
}
