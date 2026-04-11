import { HeroPage } from "@/components/Hero";

export default function TermsPage() {
  return (
    <>
      <HeroPage label="Legal" title="Terms of Service" description="Last updated: March 2026" />
      <section className="py-20"><div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {[
          { h: "1. Acceptance of Terms", p: "By accessing or using the AKcelerate website and platform (\"Service\"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service. These terms apply to all visitors, users, and clients." },
          { h: "2. Description of Service", p: "AKcelerate provides an AI-powered manufacturing analytics platform, including predictive maintenance, supply chain analytics, quality analytics, and energy management modules. Access is granted upon execution of a service agreement and payment of applicable subscription fees." },
          { h: "3. Client Obligations", p: "Clients agree to: Provide accurate registration information. Maintain confidentiality of account credentials. Use the Service only for lawful manufacturing analytics purposes. Not reverse-engineer, resell, or sublicense the platform. Comply with all applicable Indian laws and regulations." },
          { h: "4. Intellectual Property", p: "All platform software, AI models, algorithms, dashboards, and documentation are the exclusive intellectual property of AKcelerate. Client data remains the property of the client. AKcelerate receives a limited licence to process client data solely for service delivery." },
          { h: "5. Payment Terms", p: "Subscription fees are due as specified in the client's service agreement. Annual subscriptions are billed upfront. Monthly subscriptions are billed at the start of each calendar month. All fees are in INR and subject to applicable GST. Non-payment may result in service suspension after 15 days' notice." },
          { h: "6. Service Availability & SLA", p: "AKcelerate targets 99.5% platform uptime for Professional plans and 99.9% for Enterprise plans, measured monthly. Scheduled maintenance windows will be communicated 48 hours in advance. Downtime credits will be applied per the agreed SLA for qualifying outages." },
          { h: "7. Limitation of Liability", p: "AKcelerate shall not be liable for indirect, incidental, or consequential damages arising from use of the Service. Our total liability shall not exceed the fees paid by the client in the three months preceding the claim. The Service is provided \"as is\" for manufacturing analytics purposes; operational decisions remain the client's responsibility." },
          { h: "8. Termination", p: "Either party may terminate the Service agreement with 30 days' written notice. AKcelerate may terminate immediately for material breach, non-payment, or misuse. Upon termination, client data will be available for export for 30 days and then securely deleted." },
          { h: "9. Governing Law", p: "These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra. For any questions regarding these Terms, contact akceleratehq@gmail.com." },
        ].map((s, i) => <div key={i} className="glass-card p-7"><h2 className="font-poppins font-semibold text-xl mb-3">{s.h}</h2><p className="text-muted-foreground leading-relaxed">{s.p}</p></div>)}
      </div></section>
    </>
  );
}
