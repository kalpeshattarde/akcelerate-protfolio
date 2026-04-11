import { HeroPage } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import StatsRow from "@/components/StatsRow";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { TiltCard } from "@/hooks/useTiltCard";
import FloatingOrbs from "@/components/FloatingOrbs";

const team = [
  { name: "Kalpesh Attarde", role: "Founder & CEO", desc: "Data scientist and AI strategist with deep expertise in machine learning, data engineering, business automation, and enterprise software.", img: "/images/kalpesh-attarde.jpeg" },
  { name: "Rakesh Chaudhari", role: "Cloud & DevOps Lead", desc: "6+ years in cloud & Kubernetes, CI/CD, infrastructure provisioning, release management, and process enhancement.", img: "/images/rakesh-chaudhari.jpeg" },
  { name: "Kaushal Bharambe", role: "AI/ML Engineer", desc: "Specializes in LLM engineering, AI automation pipelines, and real-time ML systems for business applications.", img: "/images/kaushal-bharambe.png" },
];

export default function AboutPage() {
  return (
    <>
      <HeroPage vizMode="about" label="About" title={<>Built by Problem-Solvers, <span className="gradient-text">For Real Businesses</span></>} description="AKcelerate was founded with a simple mission: make powerful AI and automation accessible to every business in India — turning data and technology into measurable competitive advantage." />

      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <StatsRow stats={[{ value: "50+", label: "Projects" }, { value: "13+", label: "Industries" }, { value: "315%", label: "Avg ROI" }, { value: "2024", label: "Founded" }]} />
          </RevealSection>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <FloatingOrbs count={2} />
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
