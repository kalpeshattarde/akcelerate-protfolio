export interface FAQItem {
  question: string;
  answer: string;
}

export const generalFAQ: FAQItem[] = [
  {
    question: "What industries does AKcelerate serve?",
    answer: "We work across 13+ industries including manufacturing, fintech, healthcare, retail, e-commerce, logistics, energy, education, SaaS, and more. Our solutions are tailored to each industry's unique challenges and regulatory requirements.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Most projects follow a 6-8 week delivery cycle. We deliver a working prototype within 2-4 weeks, followed by iterative refinement and production deployment. Complex enterprise projects may take 12-16 weeks.",
  },
  {
    question: "Do you work with startups and SMBs?",
    answer: "Absolutely. We've designed our engagement models to be accessible for startups and SMBs while delivering enterprise-grade solutions. Our Starter plan is specifically designed for early-stage companies looking to leverage AI without heavy upfront investment.",
  },
  {
    question: "What technologies do you use?",
    answer: "We use a modern tech stack including Python, TensorFlow, PyTorch, React, Node.js, AWS, Azure, GCP, Power BI, Tableau, Docker, Kubernetes, and more. We choose the best tools for each project based on requirements, not vendor preferences.",
  },
  {
    question: "How do you measure project success?",
    answer: "Every project starts with clearly defined success metrics tied to business outcomes — revenue increase, cost reduction, time savings, or accuracy improvements. We track these metrics throughout the project and provide regular performance reports.",
  },
  {
    question: "Can you integrate with our existing systems?",
    answer: "Yes. We specialize in integrating AI and analytics solutions with existing ERP, CRM, SCADA, MES, and custom systems. Our solutions are designed to enhance your current tech stack, not replace it.",
  },
];

export const pricingFAQ: FAQItem[] = [
  {
    question: "Can I start with one module and add more later?",
    answer: "Yes. Our platform is completely modular. Start with one AI use case, then add more without migration complexity or data re-integration.",
  },
  {
    question: "Is there a free trial or pilot?",
    answer: "We offer a 30-day pilot on the Professional plan — we connect to your real data and demonstrate measurable results. If you don't see value, you pay nothing.",
  },
  {
    question: "What counts as a 'monitored asset'?",
    answer: "Each monitored machine, production line, or equipment tag counts as one asset. A compressor, CNC machine, conveyor, or transformer each counts as one asset.",
  },
  {
    question: "Are prices in INR or USD?",
    answer: "Standard pricing is in INR for Indian customers. USD-denominated Enterprise contracts are available for international deployments or MNCs.",
  },
  {
    question: "What are the contract terms?",
    answer: "Monthly plans can be cancelled with 30 days' notice. Annual plans (20% discount) are 12-month commitments. Enterprise contracts are typically 24–36 months with SLAs.",
  },
];

export const auditFAQ: FAQItem[] = [
  {
    question: "Is the audit really free?",
    answer: "Yes — completely free. There is no hidden cost, no trial, and no obligation to hire us afterwards. We offer this because a detailed, honest audit is the best way to demonstrate our expertise. If we're a good fit, you'll know by the end of the session. If not, you still leave with a valuable roadmap.",
  },
  {
    question: "How long is the session and what do I receive?",
    answer: "The session runs for exactly 60 minutes over a Google Meet or Zoom call. Afterwards, you'll receive your full written audit report and roadmap within 48 hours as a PDF.",
  },
  {
    question: "Who conducts the audit?",
    answer: "Every audit is conducted by Kalpesh Attarde (Founder) or a senior consultant with at least 5 years of AI/automation experience. You will not be speaking with a sales representative or a junior team member.",
  },
  {
    question: "What size companies do you work with?",
    answer: "We work with businesses of all sizes — from early-stage startups to mid-market enterprises. The audit is particularly valuable for companies with ₹1 Crore+ revenue that are experiencing growth friction, operational bottlenecks, or data chaos.",
  },
  {
    question: "Do I need to prepare anything?",
    answer: "Nothing formal is required. Just come with a clear idea of your top 2-3 business challenges and a basic understanding of your current systems. If you have data on costs, headcount, or volumes — bring that too.",
  },
  {
    question: "Will I be pressured to buy after the audit?",
    answer: "No. The audit session is 100% focused on your business. After you've received your report, if you'd like to explore working together, we'll schedule a separate proposal call. We never pressure clients — our work speaks for itself.",
  },
];
