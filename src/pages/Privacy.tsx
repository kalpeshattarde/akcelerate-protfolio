import { HeroPage } from "@/components/Hero";
import { RevealGrid } from "@/hooks/useScrollReveal";

export default function PrivacyPage() {
  return (
    <>
      <HeroPage label="Legal" title="Privacy Policy" description="Last updated: March 2026" />
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealGrid className="space-y-8" stagger={100}>
            {[
              { h: "Information We Collect", p: "We collect information you provide directly, such as your name, email, company, and message when you fill out contact forms. We also collect usage data through analytics tools to improve our services." },
              { h: "How We Use Your Information", p: "We use your information to respond to inquiries, provide our services, send relevant communications, and improve our website. We never sell your personal data to third parties." },
              { h: "Data Security", p: "We implement industry-standard security measures to protect your data, including encryption, access controls, and regular security audits." },
              { h: "Cookies", p: "We use cookies and similar technologies for analytics and site functionality. You can control cookie preferences through your browser settings." },
              { h: "Your Rights", p: "You have the right to access, correct, or delete your personal data. Contact us at akceleratehq@gmail.com for any privacy-related requests." },
              { h: "Contact", p: "For privacy questions, contact us at akceleratehq@gmail.com or call +91-8208555380." },
            ].map((s, i) => <div key={i} className="reveal-item glass-card p-7"><h2 className="font-poppins font-semibold text-xl mb-3">{s.h}</h2><p className="text-muted-foreground leading-relaxed">{s.p}</p></div>)}
          </RevealGrid>
        </div>
      </section>
    </>
  );
}
