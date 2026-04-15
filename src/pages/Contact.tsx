import { HeroPage } from "@/components/Hero";
import SEOHead from "@/components/SEOHead";
import CTASection from "@/components/CTASection";
import { ContactForm } from "@/components/Forms";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { RevealSection } from "@/hooks/useScrollReveal";

export default function ContactPage() {
  return (
    <>
      <HeroPage
        label="Contact"
        title={<>Let's Build Something <span className="gradient-text">Great Together</span></>}
        description="Tell us about your project and we'll get back to you within 24 hours."
      />

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <RevealSection>
              <div>
                <h2 className="font-poppins font-bold text-2xl mb-6">Get in Touch</h2>
                <div className="space-y-5 mb-10">
                  {[
                    { icon: Mail, label: "Email", value: "akceleratehq@gmail.com", href: "mailto:akceleratehq@gmail.com" },
                    { icon: Phone, label: "Phone", value: "+91-8208555380", href: "tel:+918208555380" },
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
                  <h3 className="font-poppins font-semibold mb-3">Why Partner With Us?</h3>
                  <ul className="space-y-2">
                    {["50+ projects delivered across 13+ industries", "315% average client ROI", "92% client retention rate", "2-4 week prototype delivery"].map((v, i) => (
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
              <ContactForm />
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
