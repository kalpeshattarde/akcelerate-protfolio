import { Activity, Radio, Monitor, BarChart3, Cloud, Workflow, Rocket, Globe } from "lucide-react";

export interface Solution {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  features: string[];
  benefits: { title: string; description: string; metric: string; metricLabel: string }[];
  process: { step: number; title: string; description: string }[];
  industries: string[];
  relatedSlugs: string[];
}

export const solutions: Solution[] = [
  {
    slug: "automation-systems",
    title: "Automation Systems & AI Agents",
    shortTitle: "Automation & Agents",
    description: "n8n workflows, API automations and autonomous LLM-powered agents — sales, support and internal copilots wired into your stack.",
    icon: "Workflow",
    features: ["n8n Workflow Engineering", "Sales & Support AI Agents", "CRM & Email Automation", "API & Webhook Pipelines", "RAG-Powered Internal Copilots", "Multi-Step Reasoning + Tool Calls"],
    benefits: [
      { title: "Always-On Agents", description: "Agents and workflows that run 24/7 without breaks or burnout.", metric: "24/7", metricLabel: "autonomous coverage" },
      { title: "Hours Saved Weekly", description: "Hand off repetitive admin to bulletproof automations.", metric: "20hrs", metricLabel: "saved per week" },
      { title: "Lower Ops Cost", description: "Replace manual workflows with agents that execute end-to-end.", metric: "65%", metricLabel: "ops cost reduction" },
    ],
    process: [
      { step: 1, title: "Workflow Audit", description: "Map every manual step worth automating." },
      { step: 2, title: "Design", description: "Diagram triggers, branches, and agent reasoning loops." },
      { step: 3, title: "Build", description: "Develop in n8n + wire APIs, RAG sources and memory." },
      { step: 4, title: "Pilot & Tune", description: "Run alongside humans, measure quality, refine prompts." },
      { step: 5, title: "Scale", description: "Roll out to production with monitoring and human handoff." },
    ],
    industries: ["Agencies", "E-commerce", "SaaS", "Operations-heavy SMBs", "Startups"],
    relatedSlugs: ["ai-ml", "saas-dev", "mvp-21day"],
  },
  {
    slug: "ai-ml",
    title: "AI / ML & MLOps",
    shortTitle: "AI / ML & MLOps",
    description: "ML models, NLP, generative AI plus production-grade MLOps — deploy, monitor and govern models with MLflow and CI/CD for ML.",
    icon: "Activity",
    features: ["Custom ML Model Development", "NLP & Computer Vision", "Generative AI Integration", "Model Deployment Pipelines", "MLflow + Model Registry", "Drift Monitoring & A/B Testing"],
    benefits: [
      { title: "Predictive Intelligence", description: "Forecast demand, churn and revenue with production ML.", metric: "92%", metricLabel: "prediction accuracy" },
      { title: "Production ML", description: "Ship models reliably with end-to-end MLOps pipelines.", metric: "10x", metricLabel: "faster model updates" },
      { title: "Smart Automation", description: "AI decision engines that learn from your business data.", metric: "300%", metricLabel: "ROI in year one" },
    ],
    process: [
      { step: 1, title: "Data & Use-Case", description: "Evaluate data quality and pick high-leverage use cases." },
      { step: 2, title: "Model Selection", description: "Choose optimal algorithms and architecture." },
      { step: 3, title: "Train & Validate", description: "Cross-validation, hyperparameter tuning, evaluation." },
      { step: 4, title: "Deploy with MLOps", description: "CI/CD for ML, model registry, monitoring." },
      { step: 5, title: "Monitor & Retrain", description: "Track drift and retrain automatically." },
    ],
    industries: ["Manufacturing", "Healthcare", "Fintech", "E-commerce", "Logistics"],
    relatedSlugs: ["automation-systems", "automated-analytics", "cloud-devops"],
  },
  {
    slug: "automated-analytics",
    title: "Analytics & Visualization",
    shortTitle: "Analytics & Viz",
    description: "Real-time reporting, KPI dashboards and BI visualization in Power BI, Tableau and custom D3 — turn raw data into decisions.",
    icon: "BarChart3",
    features: ["Automated Reporting", "Power BI & Tableau Dashboards", "Custom D3.js Visualizations", "Data Pipeline Automation", "Executive & Embedded Dashboards", "Alert Systems & Self-Service BI"],
    benefits: [
      { title: "Real-Time Insights", description: "Live dashboards that update automatically with your data.", metric: "10x", metricLabel: "faster reporting" },
      { title: "Visual Intelligence", description: "Transform complex datasets into clear visual stories.", metric: "80%", metricLabel: "faster comprehension" },
      { title: "Time Savings", description: "Eliminate hours of manual report creation.", metric: "20hrs", metricLabel: "saved per week" },
    ],
    process: [
      { step: 1, title: "Data Audit", description: "Map data sources and assess quality." },
      { step: 2, title: "Modeling", description: "Design ETL/ELT pipelines and data models." },
      { step: 3, title: "Dashboard Build", description: "Create automated dashboards and reports." },
      { step: 4, title: "Automation Setup", description: "Configure alerts, schedules and triggers." },
      { step: 5, title: "Iterate", description: "Refine metrics and add new data sources." },
    ],
    industries: ["Manufacturing", "Retail", "Finance", "Healthcare", "Supply Chain"],
    relatedSlugs: ["ai-ml", "automation-systems", "consulting"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    shortTitle: "Cloud",
    description: "AWS, Azure, GCP and CI/CD pipelines — build resilient, scalable cloud infrastructure with modern DevOps practices.",
    icon: "Cloud",
    features: ["Cloud Migration", "Infrastructure as Code", "CI/CD Pipelines", "Kubernetes & Docker", "Monitoring & Alerting", "Cost Optimization"],
    benefits: [
      { title: "Scalable Infrastructure", description: "Auto-scaling cloud architecture that grows with you.", metric: "99.99%", metricLabel: "uptime" },
      { title: "Faster Deployments", description: "CI/CD pipelines that ship multiple times per day.", metric: "50x", metricLabel: "faster deployments" },
      { title: "Cost Savings", description: "Right-sized infrastructure with pay-as-you-go optimization.", metric: "40%", metricLabel: "cloud cost reduction" },
    ],
    process: [
      { step: 1, title: "Assessment", description: "Audit current infrastructure and identify gaps." },
      { step: 2, title: "Architecture", description: "Design cloud-native, scalable architecture." },
      { step: 3, title: "Migration", description: "Zero-downtime migration to cloud." },
      { step: 4, title: "Automation", description: "Set up CI/CD, IaC, and monitoring." },
      { step: 5, title: "Optimize", description: "Continuous cost and performance optimization." },
    ],
    industries: ["SaaS", "Fintech", "E-commerce", "Enterprise", "Startups"],
    relatedSlugs: ["saas-dev", "ai-ml", "automation-systems"],
  },
  {
    slug: "website-dev",
    title: "Website Development",
    shortTitle: "Websites",
    description: "High-converting marketing sites, landing pages and eCommerce storefronts — fast, SEO-ready and built to convert.",
    icon: "Globe",
    features: ["Marketing Websites", "Landing Pages", "eCommerce Storefronts", "SEO & Core Web Vitals", "CMS Integration", "Conversion Optimization"],
    benefits: [
      { title: "Launch Fast", description: "Production-ready websites shipped in days, not months.", metric: "7", metricLabel: "days average" },
      { title: "SEO-Ready", description: "Technical SEO baked in from day one.", metric: "95+", metricLabel: "Lighthouse score" },
      { title: "Conversion-First", description: "CRO-driven layouts engineered for leads and sales.", metric: "40%", metricLabel: "lift in conversions" },
    ],
    process: [
      { step: 1, title: "Brief & Scope", description: "Goals, audience, content map and references." },
      { step: 2, title: "Design", description: "Wireframes and high-fidelity visual design." },
      { step: 3, title: "Build", description: "Responsive, accessible front-end with CMS hooks." },
      { step: 4, title: "SEO & QA", description: "Performance, SEO and cross-browser testing." },
      { step: 5, title: "Launch", description: "Deploy with analytics and tracking wired in." },
    ],
    industries: ["Startups", "Agencies", "E-commerce", "SMBs", "B2B SaaS"],
    relatedSlugs: ["saas-dev", "automated-analytics", "consulting"],
  },
  {
    slug: "saas-dev",
    title: "App & SaaS Development",
    shortTitle: "SaaS Dev",
    description: "Custom web and mobile apps, MVPs and SaaS products — from concept to launch with scalable, cloud-native architecture.",
    icon: "Monitor",
    features: ["Full-Stack Web Apps", "Mobile App Development", "MVP Development", "SaaS Product Engineering", "Dashboard & Admin Panels", "API Development"],
    benefits: [
      { title: "Rapid MVP Launch", description: "Go from idea to working product in 4–8 weeks.", metric: "4-8", metricLabel: "weeks to launch" },
      { title: "Scalable Architecture", description: "Built for growth with cloud-native architecture.", metric: "99.9%", metricLabel: "uptime guaranteed" },
      { title: "User-Centric Design", description: "Beautiful, conversion-optimized interfaces.", metric: "40%", metricLabel: "higher engagement" },
    ],
    process: [
      { step: 1, title: "Requirements", description: "Define features, user stories, and tech stack." },
      { step: 2, title: "UI/UX Design", description: "Create wireframes and high-fidelity designs." },
      { step: 3, title: "Development", description: "Agile sprints with weekly demos." },
      { step: 4, title: "QA & Launch", description: "Rigorous testing and zero-downtime deployment." },
      { step: 5, title: "Support", description: "Ongoing maintenance and feature iteration." },
    ],
    industries: ["SaaS", "Startups", "E-commerce", "EdTech", "HealthTech"],
    relatedSlugs: ["website-dev", "cloud-devops", "mvp-21day"],
  },
  {
    slug: "consulting",
    title: "Consulting",
    shortTitle: "Consulting",
    description: "AI strategy and digital transformation advisory — align technology investments with business goals for measurable growth.",
    icon: "Radio",
    features: ["AI Readiness Assessment", "Digital Transformation Roadmap", "Data Strategy Design", "Technology Stack Advisory", "Change Management", "ROI Forecasting"],
    benefits: [
      { title: "Strategic Clarity", description: "A clear roadmap for AI adoption tailored to your industry.", metric: "100%", metricLabel: "clarity on AI investment" },
      { title: "Risk Reduction", description: "Avoid costly mistakes with expert-guided decisions.", metric: "70%", metricLabel: "risk reduction" },
      { title: "Faster Time to Value", description: "Accelerate transformation from months to weeks.", metric: "3x", metricLabel: "faster implementation" },
    ],
    process: [
      { step: 1, title: "Discovery Workshop", description: "Understand your business model, challenges and goals." },
      { step: 2, title: "Assessment", description: "Audit current tech, data and processes." },
      { step: 3, title: "Strategy Design", description: "Create a phased transformation roadmap." },
      { step: 4, title: "Implementation Support", description: "Guide execution with hands-on support." },
      { step: 5, title: "Review & Scale", description: "Measure results and plan next phase." },
    ],
    industries: ["All Industries", "Startups", "SMBs", "Enterprise"],
    relatedSlugs: ["ai-ml", "automation-systems", "automated-analytics"],
  },
  {
    slug: "mvp-21day",
    title: "21-Day MVP Build System",
    shortTitle: "21-Day MVP",
    description: "From idea to live product in 21 days — full-stack web app, payments, auth, and a launch-ready landing page.",
    icon: "Rocket",
    features: ["Discovery + Scope in Week 1", "Full-Stack Build in Week 2", "Polish, QA & Launch in Week 3", "Auth, Payments, Admin", "Landing Page Included", "Source Code Handover"],
    benefits: [
      { title: "Launch in 21 Days", description: "A predictable, fixed-timeline MVP delivery system.", metric: "21", metricLabel: "days to launch" },
      { title: "Founder-Ready Output", description: "Production-grade code, not a throwaway prototype.", metric: "100%", metricLabel: "code ownership" },
      { title: "Validated Faster", description: "Test your idea with real users in weeks, not months.", metric: "4x", metricLabel: "faster validation" },
    ],
    process: [
      { step: 1, title: "Day 1–3 — Discovery", description: "Lock scope, user journeys, and core MVP feature set." },
      { step: 2, title: "Day 4–7 — Design", description: "Wireframes, branding, and clickable prototype." },
      { step: 3, title: "Day 8–17 — Build", description: "Full-stack development with weekly demos." },
      { step: 4, title: "Day 18–20 — QA", description: "End-to-end testing, performance tuning, security pass." },
      { step: 5, title: "Day 21 — Launch", description: "Deploy, set up analytics, hand over the keys." },
    ],
    industries: ["Founders", "Startups", "Bootstrapped SaaS", "Indie Hackers", "Innovation Teams"],
    relatedSlugs: ["saas-dev", "automation-systems", "website-dev"],
  },
];

export const getSolution = (slug: string) => solutions.find(s => s.slug === slug);
