import { HeroPage } from "@/components/Hero";
import CTASection from "@/components/CTASection";
import { ContactForm } from "@/components/Forms";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import FloatingOrbs from "@/components/FloatingOrbs";
import { TiltCard } from "@/hooks/useTiltCard";

const firstCallHelp = [
  "Understand your current tech stack and processes",
  "Identify 2-3 highest-ROI automation opportunities",
  "Recommend the right solution area and engagement model",
  "Provide a rough timeline and investment estimate",
];

export default function ContactPage() {
  return (
    <>
      <HeroPage
        label="Contact"
        title={<>Let's Transform Your <span className="gradient-text">Business Together</span></>}
        description="Discuss how our AI and automation solutions can eliminate inefficiencies, unlock insights, and create measurable ROI for your business."
      />

      <section className="py-20 lg:py-28 relative overflow-hidden">
        <FloatingOrbs count={2} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            <RevealSection>
              <div>
                <h2 className="font-poppins font-bold text-2xl mb-6">Contact Information</h2>
                <div className="space-y-5 mb-10">
                  {[
                    { icon: Mail, label: "Email", value: "akceleratehq@gmail.com", href: "mailto:akceleratehq@gmail.com" },
                    { icon: Phone, label: "Phone", value: "+91 8208555380", href: "tel:+918208555380" },
                    { icon: MapPin, label: "Location", value: "Mumbai, Maharashtra, India" },
                    { icon: Clock, label: "Response Time", value: "Within 24 hours" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="feature-icon !w-10 !h-10 !mb-0"><c.icon className="w-5 h-5 text-accent" /></div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">{c.label}</div>
                        {c.href ? (
                          <a href={c.href} className="text-foreground hover:text-primary transition-colors">{c.value}</a>
                        ) : (
                          <div className="text-foreground">{c.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-poppins font-semibold mb-3">What to Expect</h3>
                  <ul className="space-y-2">
                    {["Response within 24 hours", "Free initial consultation", "No-obligation discussion", "Expert-led, not sales-led"].map((v, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg className="w-4 h-4 text-accent flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealSection>
            <RevealSection delay={200}>
              <div>
                <h2 className="font-poppins font-bold text-2xl mb-6">Send Us a Message</h2>
                <p className="text-muted-foreground text-sm mb-6">Tell us about your manufacturing challenges and we'll show you how AKcelerate can help.</p>
                <ContactForm />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Why Reach Out Today */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader
              label="First Call"
              title={<>Why Reach Out <span className="gradient-text">Today</span></>}
              description="Fast responses, expert guidance, and zero obligations — here's what our clients experience."
            />
          </RevealSection>
          <div className="grid lg:grid-cols-2 gap-8">
            <RevealSection delay={100}>
              <div className="glass-card p-8">
                <h3 className="font-poppins font-semibold mb-1 text-center">Client Satisfaction by Touchpoint</h3>
                <p className="text-xs text-muted-foreground mb-6 text-center">Rated by past clients</p>
                <div className="space-y-4">
                  {[
                    { label: "Initial Response Speed", pct: 96 },
                    { label: "Technical Expertise", pct: 98 },
                    { label: "Solution Relevance", pct: 94 },
                    { label: "Follow-up Quality", pct: 95 },
                    { label: "Overall Satisfaction", pct: 97 },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{s.label}</span>
                        <span className="text-muted-foreground">{s.pct}%</span>
                      </div>
                      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
                        <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: "var(--gradient-primary)" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
            <RevealSection delay={200}>
              <div className="glass-card p-8">
                <h3 className="font-poppins font-semibold mb-6">How we typically help in the first call</h3>
                <div className="space-y-4">
                  {firstCallHelp.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, #2563EB, #06B6D4)" }}>
                        <span className="text-white text-xs font-bold">{i + 1}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      <CTASection
        title="Prefer a Free Audit First?"
        description="Get a comprehensive assessment of your AI readiness and data opportunities — completely free."
        primaryCta={{ label: "Book Free Audit", to: "/free-audit" }}
        dark
      />
    </>
  );
}
