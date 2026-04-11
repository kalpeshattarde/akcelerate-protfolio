import { HeroPage } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import StatsRow from "@/components/StatsRow";

const team = [
  { name: "Kalpesh Attarde", role: "Founder & CEO", desc: "Data scientist and AI strategist with 8+ years of experience across manufacturing, fintech, and enterprise AI." },
  { name: "Kaushal Bharambe", role: "Tech Lead", desc: "Full-stack engineer specializing in scalable cloud architecture and ML deployment." },
  { name: "Rakesh Chaudhari", role: "Data Engineer", desc: "Expert in data pipelines, ETL systems, and real-time analytics infrastructure." },
];

export default function AboutPage() {
  return (
    <>
      <HeroPage label="About" title={<>About <span className="gradient-text">AKcelerate</span></>} description="We're a data-driven growth company helping businesses scale with AI, data science, and digital solutions." />
      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsRow stats={[{ value: "50+", label: "Projects" }, { value: "13+", label: "Industries" }, { value: "315%", label: "Avg ROI" }, { value: "2024", label: "Founded" }]} />
        </div>
      </section>
      <section className="py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Our Story" title={<>Built by <span className="gradient-text">Practitioners</span></>} description="AKcelerate was founded with a mission: make enterprise-grade AI accessible to businesses of every size. We combine deep technical expertise with business acumen to deliver solutions that generate real, measurable ROI." />
        <div className="max-w-3xl mx-auto glass-card p-8 text-muted-foreground leading-relaxed space-y-4">
          <p>We started as a small team of data scientists and engineers who saw a gap between AI hype and real-world impact. Too many businesses were investing in AI without seeing returns.</p>
          <p>Our approach is different: we start with business outcomes, not technology. Every project begins with clear success metrics tied to revenue, cost, or efficiency. This results-first mindset has helped us maintain a 92% client retention rate and deliver an average 315% ROI across 50+ projects.</p>
        </div>
      </div></section>
      <section className="py-20 section-alt"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Team" title={<>Meet the <span className="gradient-text">Team</span></>} />
        <div className="grid md:grid-cols-3 gap-6">
          {team.map((t, i) => (
            <div key={i} className="glass-card p-7 text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>{t.name.charAt(0)}</div>
              <h3 className="font-poppins font-semibold text-lg">{t.name}</h3>
              <div className="text-accent text-sm font-medium mb-3">{t.role}</div>
              <p className="text-muted-foreground text-sm">{t.desc}</p>
            </div>
          ))}
        </div>
      </div></section>
      <CTASection title="Join Our Journey" description="Partner with us to transform your business with AI and data science." primaryCta={{ label: "Contact Us", to: "/contact" }} secondaryCta={{ label: "Free Audit", to: "/free-audit" }} dark />
    </>
  );
}
