import { HeroPage } from "@/components/Hero";
import SEOHead from "@/components/SEOHead";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import StatsRow from "@/components/StatsRow";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { Linkedin } from "lucide-react";

const team = [
  { name: "Kalpesh Attarde", role: "Founder & CEO", desc: "Data scientist and AI strategist with 8+ years of experience across manufacturing, fintech, and enterprise AI.", img: "/images/kalpesh-attarde.jpeg", linkedin: "https://www.linkedin.com/in/kalpeshattarde/" },
  { name: "Kaushal Bharambe", role: "Senior AI/ML Engineer", desc: "Full-stack engineer specializing in scalable cloud architecture, AI/ML solutions, and production ML deployment.", img: "/images/kaushal-bharambe.png", linkedin: "https://www.linkedin.com/in/kaushal-bharambe/" },
  { name: "Rakesh Chaudhari", role: "Senior DevOps/MLOps", desc: "Expert in data pipelines, cloud infrastructure, DevOps automation, and real-time analytics systems.", img: "/images/rakesh-chaudhari.jpeg", linkedin: "https://www.linkedin.com/in/crak/" },
];

export default function AboutPage() {
  return (
    <>
      <SEOHead title="About Us" description="Learn about AKcelerate — a data-driven growth company helping businesses scale with AI, data science, and digital solutions." path="/about" />
      <HeroPage label="About" title={<>About <span className="gradient-text">AKcelerate</span></>} description="We're a data-driven growth company helping businesses scale with AI, data science, and digital solutions." />

      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <StatsRow stats={[{ value: "50+", label: "Projects" }, { value: "13+", label: "Industries" }, { value: "315%", label: "Avg ROI" }, { value: "2024", label: "Founded" }]} />
          </RevealSection>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="Our Story" title={<>Built by <span className="gradient-text">Practitioners</span></>} description="AKcelerate was founded with a mission: make enterprise-grade AI accessible to businesses of every size. We combine deep technical expertise with business acumen to deliver solutions that generate real, measurable ROI." />
          </RevealSection>
          <RevealSection delay={200}>
            <div className="max-w-3xl mx-auto glass-card p-8 text-muted-foreground leading-relaxed space-y-4">
              <p>We started as a small team of data scientists and engineers who saw a gap between AI hype and real-world impact. Too many businesses were investing in AI without seeing returns.</p>
              <p>Our approach is different: we start with business outcomes, not technology. Every project begins with clear success metrics tied to revenue, cost, or efficiency. This results-first mindset has helped us maintain a 92% client retention rate and deliver an average 315% ROI across 50+ projects.</p>
            </div>
          </RevealSection>
        </div>
      </section>

      <section className="py-20 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="Team" title={<>Meet the <span className="gradient-text">Team</span></>} />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-3 gap-6" stagger={150}>
            {team.map((t, i) => (
              <div key={i} className="reveal-item glass-card p-7 text-center">
                <img src={t.img} alt={t.name} loading="lazy" decoding="async" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="font-poppins font-semibold text-lg">{t.name}</h3>
                <div className="text-accent text-sm font-medium mb-3">{t.role}</div>
                <p className="text-muted-foreground text-sm mb-3">{t.desc}</p>
                <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-primary transition-colors font-medium">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <CTASection title="Join Our Journey" description="Partner with us to transform your business with AI and data science." primaryCta={{ label: "Contact Us", to: "/contact" }} secondaryCta={{ label: "Free Audit", to: "/free-audit" }} dark />
    </>
  );
}
