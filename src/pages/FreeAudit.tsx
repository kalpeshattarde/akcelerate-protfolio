import { HeroDark } from "@/components/Hero";
import SEOHead from "@/components/SEOHead";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import { AuditForm } from "@/components/Forms";
import { auditFAQ } from "@/data/faq";
import { CheckCircle, Clock, Target, TrendingUp, ShieldCheck, Lock, Award } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

export default function FreeAuditPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: auditFAQ.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <SEOHead
        title="Free AI Readiness Audit — 60-min, No Sales Pitch"
        description="Get a free 60-minute AI audit: 5 prioritized AI opportunities, ROI estimate, and a 90-day roadmap — yours to keep. No obligation, no pitch."
        path="/free-audit"
        jsonLd={faqJsonLd}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Free Audit", path: "/free-audit" }]}
      />
      <HeroDark
        label="Free AI Audit"
        title={<>Get the AI roadmap your competitors are paying <span className="gradient-text">$5,000 for</span>.</>}
        description="60-minute audit. 5 prioritized AI opportunities. ROI estimate. A 90-day implementation roadmap — yours to keep. No sales pitch, no obligation."
      >
        <AuditForm />
      </HeroDark>

      {/* Risk-reversal trust strip directly under the form */}
      <section className="-mt-8 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { Icon: ShieldCheck, label: "No sales pitch" },
              { Icon: Award, label: "You keep everything" },
              { Icon: Lock, label: "100% confidential" },
              { Icon: CheckCircle, label: "Reply in 24 hrs" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border bg-card/60">
                <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-xs font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

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
