import { HeroDark } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import { AuditForm } from "@/components/Forms";
import { auditFAQ } from "@/data/faq";
import { CheckCircle, Clock, Target, TrendingUp, FileText, BarChart3 } from "lucide-react";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";

const auditCovers = [
  { icon: Target, title: "Systems & Process Audit", desc: "We review your existing tech stack, workflows, and processes — pinpointing inefficiencies, bottlenecks, and gaps that cost you time and money." },
  { icon: Clock, title: "Data Infrastructure Review", desc: "We assess how your data is collected, stored, and used — identifying data quality issues, silos, and integration opportunities to unlock its full value." },
  { icon: CheckCircle, title: "AI Readiness Assessment", desc: "We score your organisation on 12 AI readiness dimensions — data maturity, talent, infrastructure, culture — and show you exactly where to start." },
  { icon: BarChart3, title: "Automation Opportunity Map", desc: "We identify every repetitive, manual, or rule-based task that can be automated — ranked by effort and ROI so you can act on the easiest wins first." },
  { icon: TrendingUp, title: "ROI Potential Analysis", desc: "For your top 3 opportunities, we estimate cost savings, revenue impact, and payback period — giving you the business case to act with confidence." },
  { icon: FileText, title: "Custom Roadmap Delivery", desc: "You receive a written audit report within 48 hours — including a phased implementation roadmap with timelines, budgets, and technology recommendations." },
];

const steps = [
  { num: "01", title: "Submit the Form", desc: "Fill in your business details, current challenges, and the best time to connect. Takes less than 3 minutes." },
  { num: "02", title: "60-Min Deep Dive", desc: "Our expert joins you on a structured call to understand your business, processes, data, and goals — asking the right questions to surface real insights." },
  { num: "03", title: "Receive Your Roadmap", desc: "Within 48 hours you receive your written audit report and custom roadmap — packed with prioritised actions, effort estimates, and ROI projections." },
];

export default function FreeAuditPage() {
  return (
    <>
      <HeroDark
        label="Free Business Audit"
        title={<>Book Your Free <span className="gradient-text">Business Audit</span></>}
        description="In 60 minutes, our experts will map your systems, identify automation opportunities, assess your AI readiness, and hand you a personalised roadmap — at zero cost."
      >
        <AuditForm />
      </HeroDark>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="What's Covered" title={<>Everything Covered in <span className="gradient-text">Your Free Audit</span></>} description="Our structured 60-minute deep dive covers 6 critical business areas — delivered as a written report with prioritised action items." />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={100}>
            {auditCovers.map((b, i) => (
              <div key={i} className="reveal-item glass-card p-7">
                <div className="feature-icon"><b.icon className="w-6 h-6 text-accent" /></div>
                <h3 className="font-poppins font-semibold mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm">{b.desc}</p>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <section className="py-20 lg:py-28 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="Process" title={<>How the <span className="gradient-text">Audit Works</span></>} description="Three simple steps from booking to your personalised roadmap — we do the heavy lifting." />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-3 gap-8" stagger={150}>
            {steps.map((s, i) => (
              <div key={i} className="reveal-item text-center">
                <div className="process-number mx-auto mb-5">{s.num}</div>
                <h3 className="font-poppins font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <FAQAccordion items={auditFAQ} title="Questions About the Free Audit" />

      <CTASection
        title="Your Competitors Are Already Automating. Are You?"
        description="Every month you wait is another month of manual work, missed insights, and lost revenue. Book your free audit today and see exactly what's possible."
        primaryCta={{ label: "Book Free Audit", to: "#" }}
        dark
      />
    </>
  );
}
