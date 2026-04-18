export interface Industry {
  slug: string;
  name: string;
  icon: string;
  description: string;
  useCases: string[];
}

function slugify(s: string) {
  return s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const _raw: Omit<Industry, "slug">[] = [
  { name: "Manufacturing", icon: "Factory", description: "Predictive maintenance, quality AI, OEE optimization, and supply chain intelligence for Industry 4.0.", useCases: ["Predictive Maintenance", "Quality Control AI", "Supply Chain Optimization", "Energy Management"] },
  { name: "Banking & Finance", icon: "Building2", description: "Fraud detection, risk analytics, algorithmic trading, and regulatory compliance automation.", useCases: ["Fraud Detection", "Risk Scoring", "Automated Reporting", "Customer Analytics"] },
  { name: "Healthcare", icon: "Heart", description: "Clinical analytics, patient outcome prediction, operational efficiency, and compliance reporting.", useCases: ["Patient Analytics", "Clinical Decision Support", "Operational Optimization", "Compliance Automation"] },
  { name: "Retail & E-commerce", icon: "ShoppingCart", description: "Customer segmentation, demand forecasting, personalization engines, and inventory optimization.", useCases: ["Demand Forecasting", "Personalization", "Inventory Optimization", "Customer Segmentation"] },
  { name: "Logistics & Supply Chain", icon: "Truck", description: "Route optimization, demand planning, warehouse analytics, and fleet management AI.", useCases: ["Route Optimization", "Demand Planning", "Warehouse Analytics", "Fleet Management"] },
  { name: "Energy & Utilities", icon: "Zap", description: "Smart grid analytics, consumption forecasting, renewable optimization, and sustainability tracking.", useCases: ["Smart Grid Analytics", "Consumption Forecasting", "Sustainability Tracking", "Asset Management"] },
  { name: "Education & EdTech", icon: "GraduationCap", description: "Learning analytics, student engagement prediction, curriculum optimization, and platform development.", useCases: ["Learning Analytics", "Student Engagement", "Platform Development", "Content Optimization"] },
  { name: "SaaS & Technology", icon: "Code", description: "Product analytics, churn prediction, feature prioritization, and scalable architecture design.", useCases: ["Product Analytics", "Churn Prediction", "Feature Prioritization", "Architecture Design"] },
];

export const industries: Industry[] = _raw.map(i => ({ ...i, slug: slugify(i.name) }));

export const getIndustry = (slug: string) => industries.find(i => i.slug === slug);

export const caseStudies = [
  {
    title: "Manufacturing AI Transformation",
    industry: "Manufacturing",
    description: "Implemented predictive maintenance and quality AI for a mid-size manufacturer, reducing downtime by 85% and defect rates by 60%.",
    metrics: [
      { value: "85%", label: "Downtime Reduction" },
      { value: "60%", label: "Defect Reduction" },
      { value: "₹2.4Cr", label: "Annual Savings" },
    ],
  },
  {
    title: "E-commerce Growth Engine",
    industry: "Retail & E-commerce",
    description: "Built a personalization engine and demand forecasting system that increased revenue by 35% and reduced inventory waste by 28%.",
    metrics: [
      { value: "35%", label: "Revenue Increase" },
      { value: "28%", label: "Less Inventory Waste" },
      { value: "95%", label: "Forecast Accuracy" },
    ],
  },
  {
    title: "Fintech Risk Analytics",
    industry: "Banking & Finance",
    description: "Developed a real-time fraud detection system and credit risk model, processing 10M+ transactions daily with 99.7% accuracy.",
    metrics: [
      { value: "99.7%", label: "Detection Accuracy" },
      { value: "10M+", label: "Daily Transactions" },
      { value: "₹8Cr", label: "Fraud Prevented" },
    ],
  },
  {
    title: "Healthcare Analytics Platform",
    industry: "Healthcare",
    description: "Created a patient outcome prediction platform for a hospital chain, improving clinical decision-making and reducing readmission rates.",
    metrics: [
      { value: "40%", label: "Fewer Readmissions" },
      { value: "3x", label: "Faster Reporting" },
      { value: "92%", label: "Prediction Accuracy" },
    ],
  },
];

export const completedProjects = [
  { title: "Smart Factory Dashboard", industry: "Manufacturing", type: "Data Visualization", description: "Real-time OEE monitoring dashboard for a 5-plant manufacturing network." },
  { title: "AI-Powered CRM", industry: "SaaS", type: "SaaS Development", description: "Custom CRM with built-in lead scoring and sales prediction." },
  { title: "Supply Chain Control Tower", industry: "Logistics", type: "Analytics Platform", description: "End-to-end supply chain visibility platform with predictive alerts." },
  { title: "Patient Risk Scorer", industry: "Healthcare", type: "ML Model", description: "ML model for early detection of high-risk patients." },
  { title: "Energy Optimization System", industry: "Energy", type: "IoT + AI", description: "IoT-based energy monitoring with AI-driven optimization recommendations." },
  { title: "E-commerce Recommendation Engine", industry: "Retail", type: "AI/ML", description: "Personalized product recommendations driving 25% revenue uplift." },
  { title: "Fraud Detection System", industry: "Fintech", type: "Real-time ML", description: "Real-time transaction monitoring processing 10M+ events daily." },
  { title: "Automated QC System", industry: "Manufacturing", type: "Computer Vision", description: "Computer vision-based quality inspection with 99.5% accuracy." },
];
