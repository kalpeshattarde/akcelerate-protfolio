import { HeroDark } from "@/components/Hero";
import SEOHead from "@/components/SEOHead";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import { AuditForm } from "@/components/Forms";
import { auditFAQ } from "@/data/faq";
import { CheckCircle, Clock, Target, TrendingUp } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

export default function FreeAuditPage() {
  return (
    <>
      <SEOHead title="Free AI Audit" description="Get a free AI readiness audit — discover how AI and automation can transform your business." path="/free-audit" />
      <HeroDark
        label="Free AI Audit"
        title={<>Get a Free <span className="gradient-text">AI Readiness Audit</span></>}
        description="Discover how AI, data science, and automation can transform your business. Our expert team will analyze your opportunities and deliver a prioritized action plan — completely free."
      >
        <AuditForm />
      </HeroDark>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="What You Get" title={<>Your Audit <span className="gradient-text">Includes</span></>} />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={100}>
            {[
              { icon: Clock, title: "60-Min Discovery Call", desc: "In-depth discussion of your business goals and challenges." },
              { icon: Target, title: "Data Infrastructure Review", desc: "Assessment of your current data systems and readiness." },
              { icon: CheckCircle, title: "5 AI Opportunities", desc: "Identification of 3-5 high-impact AI use cases for your business." },
              { icon: TrendingUp, title: "ROI Estimate & Roadmap", desc: "Preliminary ROI projections and a recommended action plan." },
            ].map((b, i) => (
              <div key={i} className="reveal-item glass-card p-7 text-center">
                <div className="feature-icon mx-auto"><b.icon className="w-6 h-6 text-accent" /></div>
                <h3 className="font-poppins font-semibold mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm">{b.desc}</p>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <FAQAccordion items={auditFAQ} title="Audit FAQ" />

      <CTASection
        title="Still Have Questions?"
        description="Our team is here to help. Reach out and we'll guide you through the process."
        primaryCta={{ label: "Contact Us", to: "/contact" }}
        dark
      />
    </>
  );
}
