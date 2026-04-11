import { HeroPage } from "@/components/Hero";

export default function TermsPage() {
  return (
    <>
      <HeroPage label="Legal" title="Terms of Service" description="Last updated: March 2026" />
      <section className="py-20"><div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {[
          { h: "Acceptance of Terms", p: "By accessing and using AKcelerate's website and services, you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of our services." },
          { h: "Services", p: "AKcelerate provides AI consulting, data science, analytics, and digital solutions. The specific scope, deliverables, and terms for each engagement are defined in individual project agreements." },
          { h: "Intellectual Property", p: "All deliverables created during an engagement are owned by the client upon full payment, unless otherwise specified. AKcelerate retains the right to use general methodologies and techniques." },
          { h: "Confidentiality", p: "We maintain strict confidentiality of all client data and business information. We will not disclose client information to third parties without explicit consent." },
          { h: "Limitation of Liability", p: "AKcelerate's liability is limited to the fees paid for the specific service that gave rise to the claim. We are not liable for indirect, incidental, or consequential damages." },
          { h: "Governing Law", p: "These terms are governed by the laws of India. Any disputes shall be resolved in the courts of Mumbai, Maharashtra." },
        ].map((s, i) => <div key={i} className="glass-card p-7"><h2 className="font-poppins font-semibold text-xl mb-3">{s.h}</h2><p className="text-muted-foreground leading-relaxed">{s.p}</p></div>)}
      </div></section>
    </>
  );
}
