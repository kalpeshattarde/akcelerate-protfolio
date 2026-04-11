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
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle. We'll help you choose the right plan based on your evolving needs.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, we offer a free AI readiness audit and a 14-day trial of our Growth plan. This gives you full access to our platform and a dedicated consultation to identify quick wins for your business.",
  },
  {
    question: "What's included in the free audit?",
    answer: "Our free audit includes: a 60-minute discovery call, assessment of your current data infrastructure, identification of 3-5 high-impact AI opportunities, a preliminary ROI estimate, and a recommended action plan.",
  },
  {
    question: "Do you offer custom pricing for large teams?",
    answer: "Absolutely. Our Enterprise plan is fully customizable based on your team size, project scope, and specific requirements. Contact us for a tailored proposal that fits your budget and goals.",
  },
];

export const auditFAQ: FAQItem[] = [
  {
    question: "What happens during the free audit?",
    answer: "We conduct a comprehensive 60-minute assessment covering your data infrastructure, current analytics capabilities, AI readiness, and business goals. You'll receive a detailed report with prioritized recommendations within 48 hours.",
  },
  {
    question: "Is there any obligation after the audit?",
    answer: "None at all. The audit is completely free with no strings attached. We believe in demonstrating value upfront. If our recommendations resonate, we'll discuss next steps together.",
  },
  {
    question: "How do I prepare for the audit?",
    answer: "Have a general understanding of your current data sources, key business challenges, and goals for the next 6-12 months. We'll guide the conversation — no technical preparation needed.",
  },
];
