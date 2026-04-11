import { HeroPage } from "@/components/Hero";

export default function PrivacyPage() {
  return (
    <>
      <HeroPage label="Legal" title="Privacy Policy" description="Last updated: March 2026" />
      <section className="py-20"><div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {[
          { h: "1. Introduction", p: "AKcelerate (\"we\", \"us\", or \"our\") operates the AKcelerate AI Manufacturing Analytics platform and website (the \"Service\"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our platform. Please read this policy carefully." },
          { h: "2. Information We Collect", p: "Information you provide: Name, company name, email address, phone number, and any other information you submit through contact forms, demo requests, or account registration. Usage data: Pages visited, time spent, browser type, IP address, device information, and referral source — collected automatically when you visit our website. Plant and operational data: If you are a platform client, we process production data, sensor readings, and operational metrics you connect to the platform. This data is processed solely to provide the analytics service and is never shared." },
          { h: "3. How We Use Your Information", p: "To respond to enquiries and provide demo access. To deliver and improve the AKcelerate platform. To send relevant product updates and insights (with your consent). To analyse website usage for product improvement. To comply with legal obligations." },
          { h: "4. Data Security", p: "We implement industry-standard security measures including TLS/SSL encryption, access controls, and regular security audits. Client operational data is processed in ISO 27001-aligned environments. We offer Indian data residency options for enterprise clients." },
          { h: "5. Data Sharing", p: "We do not sell, trade, or rent your personal information. We may share information with trusted third-party service providers (hosting, analytics, CRM) who assist in operating our platform, subject to strict data processing agreements. We may disclose information when required by law." },
          { h: "6. Your Rights", p: "You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights, contact us at akceleratehq@gmail.com. We will respond within 30 days." },
          { h: "7. Cookies", p: "We use essential cookies for website functionality and analytics cookies (with consent) to understand how visitors use our site. You can disable cookies in your browser settings, though some features may be affected." },
          { h: "8. Contact Us", p: "For any privacy-related questions or concerns, contact our Data Protection point of contact: AKcelerate, Mumbai, Maharashtra, India. Email: akceleratehq@gmail.com. Phone: +91 8208555380." },
        ].map((s, i) => <div key={i} className="glass-card p-7"><h2 className="font-poppins font-semibold text-xl mb-3">{s.h}</h2><p className="text-muted-foreground leading-relaxed">{s.p}</p></div>)}
      </div></section>
    </>
  );
}
