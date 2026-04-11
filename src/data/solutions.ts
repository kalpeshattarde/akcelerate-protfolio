export interface SolutionService {
  title: string;
  description: string;
}

export interface Solution {
  slug: string;
  title: string;
  shortTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  icon: string;
  tags: string[];
  stats: { value: string; label: string }[];
  services: SolutionService[];
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
    heroTitle: "Automate the Work.",
    heroSubtitle: "Accelerate the Growth.",
    description: "Eliminate repetitive tasks, reduce human error, and unlock business growth by automating your most time-consuming processes — from lead handling to invoice processing and everything in between.",
    icon: "Layers",
    tags: ["RPA", "Workflow Automation", "CRM/ERP Automation", "Document AI", "Sales Automation", "Lead Nurturing"],
    stats: [
      { value: "60%+", label: "Time Saved on Manual Tasks" },
      { value: "85%", label: "Error Rate Reduction" },
      { value: "3×", label: "Faster Business Processes" },
      { value: "200%", label: "Average ROI in Year 1" },
    ],
    services: [
      { title: "Robotic Process Automation", description: "Deploy bots that handle repetitive digital tasks 24/7 — data entry, form filling, report generation — without human intervention." },
      { title: "Workflow Automation", description: "Design and implement end-to-end business workflows that trigger automatically — approvals, notifications, assignments — across your tech stack." },
      { title: "CRM & ERP Automation", description: "Automate your CRM pipelines, ERP data sync, and sales processes. Reduce manual entry and keep your data accurate and up to date." },
      { title: "Document AI & Processing", description: "Extract data from invoices, contracts, and forms automatically using AI — reducing processing time by 90% and eliminating manual errors." },
      { title: "Sales Pipeline Automation", description: "Automate lead scoring, follow-up sequences, quote generation, and deal tracking — so your sales team focuses only on closing." },
      { title: "HR & Operations Automation", description: "Streamline onboarding, payroll processing, leave management, compliance reporting, and employee communication automatically." },
    ],
    features: ["Robotic Process Automation (RPA)", "Workflow Orchestration", "Sales Pipeline Automation", "Document Processing AI", "CRM Integration", "Custom Bot Development"],
    benefits: [
      { title: "Reduce Manual Work", description: "Eliminate repetitive tasks with intelligent automation that learns and adapts.", metric: "60%", metricLabel: "reduction in manual tasks" },
      { title: "Faster Processing", description: "Automate document workflows, approvals, and data entry end-to-end.", metric: "10x", metricLabel: "faster processing speed" },
      { title: "Cost Savings", description: "Lower operational costs by replacing manual effort with smart automation.", metric: "45%", metricLabel: "cost reduction achieved" },
    ],
    process: [
      { step: 1, title: "Discovery & Audit", description: "We audit your existing processes and identify automation opportunities." },
      { step: 2, title: "Strategy & Design", description: "We craft a tailored roadmap and solution architecture for your goals." },
      { step: 3, title: "Build & Integrate", description: "Our engineers build, test, and integrate — with zero disruption to ops." },
      { step: 4, title: "Launch & Optimize", description: "We go live, monitor performance, and continuously iterate for improvement." },
    ],
    industries: ["Manufacturing", "Banking & Finance", "Retail & E-commerce", "Healthcare", "Logistics"],
    relatedSlugs: ["ai-ml", "automated-analytics", "saas-dev"],
  },
  {
    slug: "ai-ml",
    title: "AI / ML Solutions",
    shortTitle: "AI / ML",
    heroTitle: "Intelligent Systems.",
    heroSubtitle: "Real Business Results.",
    description: "Build custom AI and machine learning solutions that solve real problems — from intelligent chatbots and computer vision to predictive analytics and generative AI tailored to your business.",
    icon: "Activity",
    tags: ["Machine Learning", "NLP", "Computer Vision", "Generative AI", "LLM", "Predictive Analytics"],
    stats: [
      { value: "92%", label: "Prediction Accuracy" },
      { value: "5×", label: "Productivity Boost" },
      { value: "300%", label: "ROI in Year One" },
      { value: "13+", label: "Industries Served" },
    ],
    services: [
      { title: "Custom ML Model Development", description: "We design, train, and deploy bespoke machine learning models tailored to your data and business objectives — classification, regression, forecasting, and more." },
      { title: "NLP & Text AI", description: "Extract meaning from text — sentiment analysis, entity recognition, document summarization, and intelligent Q&A systems built on your proprietary data." },
      { title: "Computer Vision", description: "Detect objects, classify images, analyse video streams, and automate visual inspection — for quality control, security, retail, and beyond." },
      { title: "Generative AI & LLM Integration", description: "Embed ChatGPT, Claude, Gemini, or fine-tuned open-source LLMs into your products — from internal assistants to customer-facing copilots." },
      { title: "AI Chatbots & Conversational Agents", description: "Build intelligent bots that understand intent, retrieve knowledge, and take action — for customer support, HR, sales, or internal operations." },
      { title: "Recommendation & Personalisation", description: "Deliver personalised product recommendations, content curation, and dynamic pricing using collaborative filtering and deep learning." },
    ],
    features: ["Custom ML Model Development", "Natural Language Processing", "Computer Vision", "Generative AI Integration", "Recommendation Systems", "Anomaly Detection"],
    benefits: [
      { title: "Predictive Intelligence", description: "Forecast demand, churn, and revenue with production-grade ML models.", metric: "92%", metricLabel: "prediction accuracy" },
      { title: "Generative AI", description: "Integrate GPT, LLMs and custom AI into your business workflows.", metric: "5x", metricLabel: "productivity boost" },
      { title: "Smart Automation", description: "AI-powered decision engines that learn from your business data.", metric: "300%", metricLabel: "ROI in year one" },
    ],
    process: [
      { step: 1, title: "Discovery & Audit", description: "We audit your existing processes and identify automation opportunities." },
      { step: 2, title: "Strategy & Design", description: "We craft a tailored roadmap and solution architecture for your goals." },
      { step: 3, title: "Build & Integrate", description: "Our engineers build, test, and integrate — with zero disruption to ops." },
      { step: 4, title: "Launch & Optimize", description: "We go live, monitor performance, and continuously iterate for improvement." },
    ],
    industries: ["Manufacturing", "Healthcare", "Fintech", "E-commerce", "Logistics"],
    relatedSlugs: ["mlops", "automated-analytics", "business-automation"],
  },
  {
    slug: "business-consulting",
    title: "Business Consulting",
    shortTitle: "Consulting",
    heroTitle: "Strategy That Drives",
    heroSubtitle: "Real Transformation.",
    description: "Bridge the gap between technology and business outcomes with expert advisory — from AI adoption roadmaps and digital transformation strategies to revenue optimisation and process re-engineering.",
    icon: "Radio",
    tags: ["AI Strategy", "Digital Transformation", "Revenue Optimisation", "Process Re-engineering", "Fractional CTO"],
    stats: [
      { value: "100%", label: "Clarity on AI Investment" },
      { value: "70%", label: "Risk Reduction" },
      { value: "3×", label: "Faster Implementation" },
      { value: "50+", label: "Projects Delivered" },
    ],
    services: [
      { title: "AI Adoption Strategy", description: "We craft a clear, phased AI roadmap — identifying the highest ROI opportunities in your business and sequencing implementations for maximum impact." },
      { title: "Digital Transformation", description: "End-to-end guidance on modernising operations — replacing legacy systems, migrating to cloud, and embedding digital capabilities across the organisation." },
      { title: "Revenue Optimisation", description: "Identify revenue leakage, optimise pricing, improve conversion rates, and build new monetisation models backed by data and AI." },
      { title: "Process Re-engineering", description: "Map, analyse, and redesign your core business processes to eliminate bottlenecks, reduce costs, and improve customer experience." },
      { title: "Technology Stack Audit", description: "A thorough review of your existing tools, platforms, and integrations — with a clear recommendation on what to keep, replace, or build." },
      { title: "Growth Advisory & Fractional CTO", description: "On-demand senior technology leadership — strategic guidance, investor presentations, M&A due diligence, and product vision." },
    ],
    features: ["AI Readiness Assessment", "Digital Transformation Roadmap", "Data Strategy Design", "Technology Stack Advisory", "Change Management", "ROI Forecasting"],
    benefits: [
      { title: "Strategic Clarity", description: "Get a clear roadmap for AI adoption tailored to your industry.", metric: "100%", metricLabel: "clarity on AI investment" },
      { title: "Risk Reduction", description: "Avoid costly mistakes with expert-guided technology decisions.", metric: "70%", metricLabel: "risk reduction" },
      { title: "Faster Time to Value", description: "Accelerate digital transformation from months to weeks.", metric: "3x", metricLabel: "faster implementation" },
    ],
    process: [
      { step: 1, title: "Discovery & Audit", description: "We audit your existing processes and identify automation opportunities." },
      { step: 2, title: "Strategy & Design", description: "We craft a tailored roadmap and solution architecture for your goals." },
      { step: 3, title: "Build & Integrate", description: "Our engineers build, test, and integrate — with zero disruption to ops." },
      { step: 4, title: "Launch & Optimize", description: "We go live, monitor performance, and continuously iterate for improvement." },
    ],
    industries: ["All Industries", "Startups", "SMBs", "Enterprise"],
    relatedSlugs: ["ai-ml", "business-automation", "data-visualization"],
  },
  {
    slug: "saas-dev",
    title: "Website & SaaS Development",
    shortTitle: "SaaS Dev",
    heroTitle: "Beautiful Products.",
    heroSubtitle: "Built to Scale.",
    description: "From lightning-fast business websites and startup MVPs to enterprise SaaS platforms and internal dashboards — we design, develop, and deploy digital products that users love.",
    icon: "Monitor",
    tags: ["React", "Node.js", "SaaS", "MVP", "Dashboard", "API"],
    stats: [
      { value: "4-8", label: "Weeks to Launch" },
      { value: "99.9%", label: "Uptime Guaranteed" },
      { value: "40%", label: "Higher Engagement" },
      { value: "50+", label: "Products Shipped" },
    ],
    services: [
      { title: "Business Websites", description: "High-converting, SEO-optimised websites built on modern stacks — fast, accessible, and built to rank. From landing pages to full corporate sites." },
      { title: "SaaS Product Development", description: "Full-stack SaaS platforms with multi-tenancy, subscription billing, role management, and enterprise-grade security — architected to scale." },
      { title: "Startup MVPs", description: "From wireframe to working product in weeks. We build lean, testable MVPs that prove your concept and attract investors — without wasted months." },
      { title: "API Development & Integration", description: "RESTful and GraphQL APIs, microservices architecture, and third-party integrations (Stripe, Salesforce, Zapier, WhatsApp) — reliable and well-documented." },
      { title: "Admin Dashboards & Portals", description: "Custom management portals with real-time data, role-based access, audit logs, and reporting — built for operations teams and executives." },
      { title: "Mobile App Development", description: "Cross-platform iOS and Android apps using React Native or Flutter — with native performance, offline capability, and seamless backend integration." },
    ],
    features: ["Full-Stack Web Apps", "MVP Development", "SaaS Product Engineering", "Dashboard Development", "API Development", "Progressive Web Apps"],
    benefits: [
      { title: "Rapid MVP Launch", description: "Go from idea to working product in 4-8 weeks.", metric: "4-8", metricLabel: "weeks to launch" },
      { title: "Scalable Architecture", description: "Built for growth with cloud-native architecture.", metric: "99.9%", metricLabel: "uptime guaranteed" },
      { title: "User-Centric Design", description: "Beautiful, conversion-optimized interfaces.", metric: "40%", metricLabel: "higher engagement" },
    ],
    process: [
      { step: 1, title: "Discovery & Audit", description: "We audit your existing processes and identify automation opportunities." },
      { step: 2, title: "Strategy & Design", description: "We craft a tailored roadmap and solution architecture for your goals." },
      { step: 3, title: "Build & Integrate", description: "Our engineers build, test, and integrate — with zero disruption to ops." },
      { step: 4, title: "Launch & Optimize", description: "We go live, monitor performance, and continuously iterate for improvement." },
    ],
    industries: ["SaaS", "Startups", "E-commerce", "EdTech", "HealthTech"],
    relatedSlugs: ["cloud-devops", "data-visualization", "business-automation"],
  },
  {
    slug: "automated-analytics",
    title: "Automated Analytics",
    shortTitle: "Analytics",
    heroTitle: "Insights on Autopilot.",
    heroSubtitle: "Zero Manual Effort.",
    description: "Automate your entire analytics pipeline — from raw data collection to polished reports delivered straight to your inbox. Monitor KPIs in real-time and let forecasting algorithms flag issues before they become problems.",
    icon: "BarChart3",
    tags: ["ETL", "KPI Dashboards", "Forecasting", "Data Warehouse", "Alerting", "Reporting"],
    stats: [
      { value: "10×", label: "Faster Reporting" },
      { value: "35%", label: "Better Decision Accuracy" },
      { value: "20hrs", label: "Saved Per Week" },
      { value: "99%", label: "Pipeline Uptime" },
    ],
    services: [
      { title: "Automated Reporting", description: "Schedule and auto-deliver PDF, Excel, or email reports for executives, clients, and teams — populated with live data, every day, week, or month." },
      { title: "Real-time KPI Dashboards", description: "Live dashboards with streaming data — monitor revenue, operations, customer metrics, and team performance as events happen." },
      { title: "ETL Pipeline Engineering", description: "Build robust data pipelines that extract from any source (databases, APIs, files), transform for consistency, and load into your warehouse reliably." },
      { title: "Forecasting & Predictive Analytics", description: "Apply time-series models and machine learning to forecast demand, revenue, churn, or inventory — weeks or months in advance." },
      { title: "Data Warehousing & Lakehouse", description: "Architect and implement a centralised data warehouse or lakehouse on Snowflake, BigQuery, Databricks, or Redshift — clean, structured, and query-ready." },
      { title: "Alerting & Anomaly Detection", description: "Set intelligent thresholds that fire alerts to Slack, email, or SMS when metrics deviate — catching problems before customers do." },
    ],
    features: ["Automated Reporting", "KPI Dashboards", "Data Pipeline Automation", "Alert Systems", "Self-Service BI", "Scheduled Reports"],
    benefits: [
      { title: "Real-Time Insights", description: "Live dashboards that update automatically with your business data.", metric: "10x", metricLabel: "faster reporting" },
      { title: "Data-Driven Decisions", description: "Replace gut feeling with data-backed decisions.", metric: "35%", metricLabel: "better decision accuracy" },
      { title: "Time Savings", description: "Eliminate hours of manual report creation.", metric: "20hrs", metricLabel: "saved per week" },
    ],
    process: [
      { step: 1, title: "Discovery & Audit", description: "We audit your existing processes and identify automation opportunities." },
      { step: 2, title: "Strategy & Design", description: "We craft a tailored roadmap and solution architecture for your goals." },
      { step: 3, title: "Build & Integrate", description: "Our engineers build, test, and integrate — with zero disruption to ops." },
      { step: 4, title: "Launch & Optimize", description: "We go live, monitor performance, and continuously iterate for improvement." },
    ],
    industries: ["Manufacturing", "Retail", "Finance", "Healthcare", "Supply Chain"],
    relatedSlugs: ["data-visualization", "ai-ml", "business-automation"],
  },
  {
    slug: "data-visualization",
    title: "Data Visualization",
    shortTitle: "Visualization",
    heroTitle: "Data That Speaks.",
    heroSubtitle: "Decisions That Win.",
    description: "Turn raw numbers into clear, compelling, interactive visuals. We design executive dashboards, BI platforms, and custom charts that make your data impossible to ignore — and your decisions impossible to get wrong.",
    icon: "LayoutDashboard",
    tags: ["Power BI", "Tableau", "Looker Studio", "D3.js", "Executive Dashboards", "BI"],
    stats: [
      { value: "80%", label: "Faster Data Comprehension" },
      { value: "100%", label: "Data Accessibility" },
      { value: "50%", label: "Faster Alignment" },
      { value: "30+", label: "Dashboards Deployed" },
    ],
    services: [
      { title: "Executive Dashboards", description: "Board-level dashboards with the right KPIs — revenue, growth, operations, and risk — presented clearly, updated automatically, and accessible anywhere." },
      { title: "Power BI Development", description: "End-to-end Power BI implementations — from data modelling and DAX measures to published workspaces, RLS security, and embedded reports." },
      { title: "Tableau Solutions", description: "Stunning Tableau workbooks and server deployments — connecting to any data source and designed for clarity, speed, and self-service analytics." },
      { title: "Looker Studio & Google Analytics", description: "Google Looker Studio reports integrated with GA4, Google Ads, and BigQuery — giving marketing teams real-time campaign and traffic insights." },
      { title: "Custom Chart & D3.js Visuals", description: "Bespoke interactive charts, maps, and infographics built with D3.js, Chart.js, or Recharts — embedded directly into your web app or portal." },
      { title: "Infographics & Data Storytelling", description: "Transform complex analyses into shareable infographics and narrative reports that communicate insight to non-technical stakeholders." },
    ],
    features: ["Power BI Dashboards", "Tableau Development", "Custom D3.js Visualizations", "Executive Dashboards", "Embedded Analytics", "Interactive Reports"],
    benefits: [
      { title: "Visual Intelligence", description: "Transform complex datasets into clear, actionable visual stories.", metric: "80%", metricLabel: "faster data comprehension" },
      { title: "Executive Dashboards", description: "C-suite ready dashboards with drill-down capabilities.", metric: "100%", metricLabel: "data accessibility" },
      { title: "Better Communication", description: "Share insights across teams with interactive visuals.", metric: "50%", metricLabel: "faster alignment" },
    ],
    process: [
      { step: 1, title: "Discovery & Audit", description: "We audit your existing processes and identify automation opportunities." },
      { step: 2, title: "Strategy & Design", description: "We craft a tailored roadmap and solution architecture for your goals." },
      { step: 3, title: "Build & Integrate", description: "Our engineers build, test, and integrate — with zero disruption to ops." },
      { step: 4, title: "Launch & Optimize", description: "We go live, monitor performance, and continuously iterate for improvement." },
    ],
    industries: ["Manufacturing", "Retail", "Finance", "Healthcare", "Government"],
    relatedSlugs: ["automated-analytics", "ai-ml", "business-consulting"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    shortTitle: "Cloud",
    heroTitle: "Scale Without Limits.",
    heroSubtitle: "Deploy Without Fear.",
    description: "Build resilient, auto-scaling cloud infrastructure with modern DevOps practices. From cloud migration and Kubernetes to CI/CD pipelines and cost optimization — we handle the complexity so you can focus on growth.",
    icon: "Cloud",
    tags: ["AWS", "Azure", "GCP", "Kubernetes", "Docker", "CI/CD", "Terraform"],
    stats: [
      { value: "99.99%", label: "Uptime" },
      { value: "50×", label: "Faster Deployments" },
      { value: "40%", label: "Cloud Cost Reduction" },
      { value: "24/7", label: "Monitoring" },
    ],
    services: [
      { title: "Cloud Migration", description: "Migrate from on-premises or legacy hosting to AWS, Azure, or GCP — with zero-downtime cutover, data validation, and rollback plans." },
      { title: "Infrastructure as Code", description: "Define your entire infrastructure in Terraform, Pulumi, or CloudFormation — version-controlled, reproducible, and auditable." },
      { title: "CI/CD Pipelines", description: "Automated build, test, and deployment pipelines using GitHub Actions, GitLab CI, Jenkins, or AWS CodePipeline — ship code multiple times per day." },
      { title: "Kubernetes & Containerisation", description: "Containerise your applications with Docker and orchestrate with Kubernetes — auto-scaling, self-healing, and production-ready." },
      { title: "Monitoring & Observability", description: "Full-stack observability with Datadog, Grafana, Prometheus, or CloudWatch — logs, metrics, traces, and alerts in one place." },
      { title: "Cloud Cost Optimization", description: "Right-size instances, implement spot strategies, and optimise reserved capacity — cutting your cloud bill by 30-50% without sacrificing performance." },
    ],
    features: ["Cloud Migration", "Infrastructure as Code", "CI/CD Pipelines", "Kubernetes & Docker", "Monitoring & Alerting", "Cost Optimization"],
    benefits: [
      { title: "Scalable Infrastructure", description: "Auto-scaling cloud architecture that grows with your business.", metric: "99.99%", metricLabel: "uptime" },
      { title: "Faster Deployments", description: "CI/CD pipelines that ship code multiple times per day.", metric: "50x", metricLabel: "faster deployments" },
      { title: "Cost Savings", description: "Right-sized infrastructure with pay-as-you-go optimization.", metric: "40%", metricLabel: "cloud cost reduction" },
    ],
    process: [
      { step: 1, title: "Discovery & Audit", description: "We audit your existing processes and identify automation opportunities." },
      { step: 2, title: "Strategy & Design", description: "We craft a tailored roadmap and solution architecture for your goals." },
      { step: 3, title: "Build & Integrate", description: "Our engineers build, test, and integrate — with zero disruption to ops." },
      { step: 4, title: "Launch & Optimize", description: "We go live, monitor performance, and continuously iterate for improvement." },
    ],
    industries: ["SaaS", "Fintech", "E-commerce", "Enterprise", "Startups"],
    relatedSlugs: ["mlops", "saas-dev", "automated-analytics"],
  },
  {
    slug: "mlops",
    title: "MLOps",
    shortTitle: "MLOps",
    heroTitle: "From Lab Models",
    heroSubtitle: "to Production AI.",
    description: "Move beyond one-off experiments. Build production-grade ML systems with automated pipelines, continuous monitoring, and self-healing retraining — so your AI always performs at its best.",
    icon: "Settings",
    tags: ["MLflow", "Kubeflow", "Model Monitoring", "Feature Store", "A/B Testing", "Model Registry"],
    stats: [
      { value: "90%", label: "Deployment Success Rate" },
      { value: "100%", label: "Model Traceability" },
      { value: "10×", label: "Faster Model Updates" },
      { value: "0", label: "Manual Retraining" },
    ],
    services: [
      { title: "ML Pipeline Orchestration", description: "Design and automate end-to-end ML pipelines — data ingestion, feature engineering, training, evaluation, and promotion — using Airflow, Prefect, or Kubeflow." },
      { title: "Model Deployment & Serving", description: "Deploy models as scalable REST APIs, batch jobs, or streaming endpoints — on Kubernetes, SageMaker, Azure ML, or Vertex AI — with blue/green rollouts." },
      { title: "Experiment Tracking with MLflow", description: "Instrument training runs with MLflow — log parameters, metrics, artefacts, and model versions — making every experiment reproducible and comparable." },
      { title: "Model Monitoring & Drift Detection", description: "Continuously monitor production models for data drift, concept drift, and performance degradation — with alerts before accuracy degrades." },
      { title: "Automated Retraining Pipelines", description: "Schedule automatic retraining triggered by drift thresholds, schedule, or new data — keeping your models fresh without manual intervention." },
      { title: "Feature Store & Data Versioning", description: "Build a centralised feature store (Feast, Tecton) and version datasets with DVC — ensuring consistency between training and serving, and across teams." },
    ],
    features: ["Model Deployment Pipelines", "MLflow Integration", "Model Monitoring", "A/B Testing", "Feature Stores", "Model Registry"],
    benefits: [
      { title: "Production ML", description: "Deploy models to production with confidence and reliability.", metric: "90%", metricLabel: "deployment success rate" },
      { title: "Model Governance", description: "Track experiments, versions, and lineage across all models.", metric: "100%", metricLabel: "model traceability" },
      { title: "Faster Iteration", description: "Reduce model deployment time from weeks to hours.", metric: "10x", metricLabel: "faster model updates" },
    ],
    process: [
      { step: 1, title: "Discovery & Audit", description: "We audit your existing processes and identify automation opportunities." },
      { step: 2, title: "Strategy & Design", description: "We craft a tailored roadmap and solution architecture for your goals." },
      { step: 3, title: "Build & Integrate", description: "Our engineers build, test, and integrate — with zero disruption to ops." },
      { step: 4, title: "Launch & Optimize", description: "We go live, monitor performance, and continuously iterate for improvement." },
    ],
    industries: ["AI/ML Companies", "Enterprise", "Fintech", "Healthcare", "Manufacturing"],
    relatedSlugs: ["ai-ml", "cloud-devops", "automated-analytics"],
  },
];

export const getSolution = (slug: string) => solutions.find(s => s.slug === slug);
