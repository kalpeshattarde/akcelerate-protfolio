import { Layers, Activity, Radio, Monitor, BarChart3, LayoutDashboard, Cloud, Settings, Bot, Workflow, Rocket } from "lucide-react";

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
    slug: "business-automation",
    title: "Business Automation",
    shortTitle: "Automation",
    description: "RPA, workflows & sales pipelines — automate repetitive tasks and streamline operations to boost productivity by 40-60%.",
    icon: "Layers",
    features: ["Robotic Process Automation (RPA)", "Workflow Orchestration", "Sales Pipeline Automation", "Document Processing AI", "CRM Integration", "Custom Bot Development"],
    benefits: [
      { title: "Reduce Manual Work", description: "Eliminate repetitive tasks with intelligent automation that learns and adapts.", metric: "60%", metricLabel: "reduction in manual tasks" },
      { title: "Faster Processing", description: "Automate document workflows, approvals, and data entry end-to-end.", metric: "10x", metricLabel: "faster processing speed" },
      { title: "Cost Savings", description: "Lower operational costs by replacing manual effort with smart automation.", metric: "45%", metricLabel: "cost reduction achieved" },
    ],
    process: [
      { step: 1, title: "Process Audit", description: "Map all current workflows and identify automation opportunities." },
      { step: 2, title: "Automation Design", description: "Design RPA bots and workflow logic for maximum impact." },
      { step: 3, title: "Build & Test", description: "Develop and rigorously test all automation scripts." },
      { step: 4, title: "Deploy & Train", description: "Roll out to production and train your team." },
      { step: 5, title: "Monitor & Optimize", description: "Continuous monitoring and performance tuning." },
    ],
    industries: ["Manufacturing", "Banking & Finance", "Retail & E-commerce", "Healthcare", "Logistics"],
    relatedSlugs: ["ai-ml", "automated-analytics", "saas-dev"],
  },
  {
    slug: "ai-ml",
    title: "AI / ML Solutions",
    shortTitle: "AI / ML",
    description: "ML models, NLP & generative AI — build intelligent systems that predict, classify, and generate insights from your data.",
    icon: "Activity",
    features: ["Custom ML Model Development", "Natural Language Processing", "Computer Vision", "Generative AI Integration", "Recommendation Systems", "Anomaly Detection"],
    benefits: [
      { title: "Predictive Intelligence", description: "Forecast demand, churn, and revenue with production-grade ML models.", metric: "92%", metricLabel: "prediction accuracy" },
      { title: "Generative AI", description: "Integrate GPT, LLMs and custom AI into your business workflows.", metric: "5x", metricLabel: "productivity boost" },
      { title: "Smart Automation", description: "AI-powered decision engines that learn from your business data.", metric: "300%", metricLabel: "ROI in year one" },
    ],
    process: [
      { step: 1, title: "Data Assessment", description: "Evaluate data quality, volume, and readiness for ML." },
      { step: 2, title: "Model Selection", description: "Choose optimal algorithms and architecture." },
      { step: 3, title: "Training & Validation", description: "Train models with cross-validation and hyperparameter tuning." },
      { step: 4, title: "Integration", description: "Deploy models via API into your existing systems." },
      { step: 5, title: "Monitoring", description: "Track model drift and retrain automatically." },
    ],
    industries: ["Manufacturing", "Healthcare", "Fintech", "E-commerce", "Logistics"],
    relatedSlugs: ["mlops", "automated-analytics", "business-automation"],
  },
  {
    slug: "business-consulting",
    title: "Business Consulting",
    shortTitle: "Consulting",
    description: "AI strategy & digital transformation — align technology investments with business goals for measurable growth.",
    icon: "Radio",
    features: ["AI Readiness Assessment", "Digital Transformation Roadmap", "Data Strategy Design", "Technology Stack Advisory", "Change Management", "ROI Forecasting"],
    benefits: [
      { title: "Strategic Clarity", description: "Get a clear roadmap for AI adoption tailored to your industry.", metric: "100%", metricLabel: "clarity on AI investment" },
      { title: "Risk Reduction", description: "Avoid costly mistakes with expert-guided technology decisions.", metric: "70%", metricLabel: "risk reduction" },
      { title: "Faster Time to Value", description: "Accelerate digital transformation from months to weeks.", metric: "3x", metricLabel: "faster implementation" },
    ],
    process: [
      { step: 1, title: "Discovery Workshop", description: "Understand your business model, challenges, and goals." },
      { step: 2, title: "Assessment", description: "Audit current tech, data, and processes." },
      { step: 3, title: "Strategy Design", description: "Create a phased transformation roadmap." },
      { step: 4, title: "Implementation Support", description: "Guide execution with hands-on support." },
      { step: 5, title: "Review & Scale", description: "Measure results and plan next phase." },
    ],
    industries: ["All Industries", "Startups", "SMBs", "Enterprise"],
    relatedSlugs: ["ai-ml", "business-automation", "data-visualization"],
  },
  {
    slug: "saas-dev",
    title: "Website & SaaS Development",
    shortTitle: "SaaS Dev",
    description: "Custom apps, MVPs & dashboards — build scalable web applications and SaaS products from concept to launch.",
    icon: "Monitor",
    features: ["Full-Stack Web Apps", "MVP Development", "SaaS Product Engineering", "Dashboard Development", "API Development", "Progressive Web Apps"],
    benefits: [
      { title: "Rapid MVP Launch", description: "Go from idea to working product in 4-8 weeks.", metric: "4-8", metricLabel: "weeks to launch" },
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
    relatedSlugs: ["cloud-devops", "data-visualization", "business-automation"],
  },
  {
    slug: "automated-analytics",
    title: "Automated Analytics",
    shortTitle: "Analytics",
    description: "Real-time reporting & KPI tracking — transform raw data into automated, actionable business intelligence.",
    icon: "BarChart3",
    features: ["Automated Reporting", "KPI Dashboards", "Data Pipeline Automation", "Alert Systems", "Self-Service BI", "Scheduled Reports"],
    benefits: [
      { title: "Real-Time Insights", description: "Live dashboards that update automatically with your business data.", metric: "10x", metricLabel: "faster reporting" },
      { title: "Data-Driven Decisions", description: "Replace gut feeling with data-backed decisions.", metric: "35%", metricLabel: "better decision accuracy" },
      { title: "Time Savings", description: "Eliminate hours of manual report creation.", metric: "20hrs", metricLabel: "saved per week" },
    ],
    process: [
      { step: 1, title: "Data Audit", description: "Map data sources and quality assessment." },
      { step: 2, title: "Pipeline Design", description: "Design ETL/ELT pipelines and data models." },
      { step: 3, title: "Dashboard Build", description: "Create automated dashboards and reports." },
      { step: 4, title: "Automation Setup", description: "Configure alerts, schedules, and triggers." },
      { step: 5, title: "Iterate", description: "Refine metrics and add new data sources." },
    ],
    industries: ["Manufacturing", "Retail", "Finance", "Healthcare", "Supply Chain"],
    relatedSlugs: ["data-visualization", "ai-ml", "business-automation"],
  },
  {
    slug: "data-visualization",
    title: "Data Visualization",
    shortTitle: "Visualization",
    description: "Power BI, Tableau & BI dashboards — create stunning visual analytics that make complex data understandable.",
    icon: "LayoutDashboard",
    features: ["Power BI Dashboards", "Tableau Development", "Custom D3.js Visualizations", "Executive Dashboards", "Embedded Analytics", "Interactive Reports"],
    benefits: [
      { title: "Visual Intelligence", description: "Transform complex datasets into clear, actionable visual stories.", metric: "80%", metricLabel: "faster data comprehension" },
      { title: "Executive Dashboards", description: "C-suite ready dashboards with drill-down capabilities.", metric: "100%", metricLabel: "data accessibility" },
      { title: "Better Communication", description: "Share insights across teams with interactive visuals.", metric: "50%", metricLabel: "faster alignment" },
    ],
    process: [
      { step: 1, title: "Requirements", description: "Define KPIs, audience, and data sources." },
      { step: 2, title: "Data Modeling", description: "Structure data for optimal visualization." },
      { step: 3, title: "Design", description: "Create visual designs and interaction patterns." },
      { step: 4, title: "Build", description: "Develop dashboards with live data connections." },
      { step: 5, title: "Deploy & Train", description: "Launch and train users on self-service analytics." },
    ],
    industries: ["Manufacturing", "Retail", "Finance", "Healthcare", "Government"],
    relatedSlugs: ["automated-analytics", "ai-ml", "business-consulting"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    shortTitle: "Cloud",
    description: "AWS, Azure, GCP & CI/CD pipelines — build resilient, scalable cloud infrastructure with modern DevOps practices.",
    icon: "Cloud",
    features: ["Cloud Migration", "Infrastructure as Code", "CI/CD Pipelines", "Kubernetes & Docker", "Monitoring & Alerting", "Cost Optimization"],
    benefits: [
      { title: "Scalable Infrastructure", description: "Auto-scaling cloud architecture that grows with your business.", metric: "99.99%", metricLabel: "uptime" },
      { title: "Faster Deployments", description: "CI/CD pipelines that ship code multiple times per day.", metric: "50x", metricLabel: "faster deployments" },
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
    relatedSlugs: ["mlops", "saas-dev", "automated-analytics"],
  },
  {
    slug: "mlops",
    title: "MLOps",
    shortTitle: "MLOps",
    description: "Model deployment, monitoring & MLflow — operationalize ML models with production-grade pipelines and governance.",
    icon: "Settings",
    features: ["Model Deployment Pipelines", "MLflow Integration", "Model Monitoring", "A/B Testing", "Feature Stores", "Model Registry"],
    benefits: [
      { title: "Production ML", description: "Deploy models to production with confidence and reliability.", metric: "90%", metricLabel: "deployment success rate" },
      { title: "Model Governance", description: "Track experiments, versions, and lineage across all models.", metric: "100%", metricLabel: "model traceability" },
      { title: "Faster Iteration", description: "Reduce model deployment time from weeks to hours.", metric: "10x", metricLabel: "faster model updates" },
    ],
    process: [
      { step: 1, title: "Assessment", description: "Evaluate current ML workflow and tooling." },
      { step: 2, title: "Pipeline Design", description: "Design end-to-end ML pipeline architecture." },
      { step: 3, title: "Implementation", description: "Build CI/CD for ML with MLflow integration." },
      { step: 4, title: "Monitoring", description: "Set up model drift detection and alerts." },
      { step: 5, title: "Scale", description: "Expand to support multiple models and teams." },
    ],
    industries: ["AI/ML Companies", "Enterprise", "Fintech", "Healthcare", "Manufacturing"],
    relatedSlugs: ["ai-ml", "cloud-devops", "automated-analytics"],
  },
  {
    slug: "ai-agents",
    title: "AI Agents as a Service",
    shortTitle: "AI Agents",
    description: "Autonomous LLM-powered agents — sales, support, and internal copilots that think, act, and execute across your stack.",
    icon: "Bot",
    features: ["Sales & SDR Agents", "Support Bots with RAG", "Internal Copilots", "CRM & Database Actions", "Multi-Step Reasoning", "n8n + API Integrations"],
    benefits: [
      { title: "Always-On Agents", description: "Agents that handle tasks 24/7 without breaks, holidays, or burnout.", metric: "24/7", metricLabel: "autonomous coverage" },
      { title: "Lower Ops Cost", description: "Replace repetitive manual workflows with agents that execute end-to-end.", metric: "65%", metricLabel: "ops cost reduction" },
      { title: "Faster Response", description: "Sub-second responses across support, sales, and internal Q&A.", metric: "10x", metricLabel: "faster response time" },
    ],
    process: [
      { step: 1, title: "Use-Case Discovery", description: "Identify the highest-leverage agent workflow." },
      { step: 2, title: "Tools & Memory", description: "Wire APIs, databases, RAG sources and memory." },
      { step: 3, title: "Build Agent", description: "Develop reasoning loops, guardrails, and tool calls." },
      { step: 4, title: "Pilot & Tune", description: "Run alongside humans, measure quality, refine prompts." },
      { step: 5, title: "Scale", description: "Roll out to production with monitoring and human handoff." },
    ],
    industries: ["SaaS", "E-commerce", "Fintech", "Support-heavy businesses", "Agencies"],
    relatedSlugs: ["automation-systems", "ai-ml", "mvp-21day"],
  },
  {
    slug: "automation-systems",
    title: "Automation Systems",
    shortTitle: "Automation Systems",
    description: "n8n, API workflows, CRM and email automation — eliminate repetitive work and connect every tool in your stack.",
    icon: "Workflow",
    features: ["n8n Workflow Engineering", "CRM & Email Automation", "API & Webhook Pipelines", "Data Sync & ETL", "Approval Workflows", "AI-Augmented Steps"],
    benefits: [
      { title: "Hours Saved Weekly", description: "Hand off repetitive admin to bulletproof automations.", metric: "20hrs", metricLabel: "saved per week" },
      { title: "Zero Manual Errors", description: "Deterministic workflows eliminate copy-paste mistakes.", metric: "99%", metricLabel: "process accuracy" },
      { title: "Connect Everything", description: "Bridge SaaS tools, internal DBs, and AI models in one flow.", metric: "200+", metricLabel: "integrations supported" },
    ],
    process: [
      { step: 1, title: "Workflow Audit", description: "Map every manual step worth automating." },
      { step: 2, title: "Design", description: "Diagram triggers, branches, and failure paths." },
      { step: 3, title: "Build in n8n", description: "Develop, version, and test each node." },
      { step: 4, title: "Deploy", description: "Self-hosted or cloud n8n with monitoring." },
      { step: 5, title: "Iterate", description: "Add new branches as your business evolves." },
    ],
    industries: ["Agencies", "E-commerce", "SaaS", "Operations-heavy SMBs", "Startups"],
    relatedSlugs: ["ai-agents", "business-automation", "mvp-21day"],
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
      { step: 1, title: "Day 1–3 — Discovery", description: "Lock scope, user journeys, and the core MVP feature set." },
      { step: 2, title: "Day 4–7 — Design", description: "Wireframes, branding, and clickable prototype." },
      { step: 3, title: "Day 8–17 — Build", description: "Full-stack development with weekly demos." },
      { step: 4, title: "Day 18–20 — QA", description: "End-to-end testing, performance tuning, security pass." },
      { step: 5, title: "Day 21 — Launch", description: "Deploy, set up analytics, hand over the keys." },
    ],
    industries: ["Founders", "Startups", "Bootstrapped SaaS", "Indie Hackers", "Innovation Teams"],
    relatedSlugs: ["saas-dev", "ai-agents", "automation-systems"],
  },
];

export const getSolution = (slug: string) => solutions.find(s => s.slug === slug);
