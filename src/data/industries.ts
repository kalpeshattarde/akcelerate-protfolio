export interface Industry {
  name: string;
  icon: string;
  description: string;
  useCases: string[];
}

export const industries: Industry[] = [
  { name: "Manufacturing", icon: "Factory", description: "From shop floor to boardroom — AI drives efficiency, quality, and uptime across manufacturing operations.", useCases: ["Predictive Maintenance", "Quality Analytics", "OEE Optimization"] },
  { name: "Healthcare", icon: "Heart", description: "Accelerate diagnostics, streamline operations, and improve patient outcomes with intelligent health systems.", useCases: ["Clinical Analytics", "Patient Predictions", "Compliance Automation"] },
  { name: "Startups", icon: "Rocket", description: "From idea to scale — we build MVPs, AI tools, and growth infrastructure that help startups win fast.", useCases: ["MVP Development", "AI Integration", "Growth Analytics"] },
  { name: "MSME Businesses", icon: "Store", description: "Empower small and mid-sized businesses with affordable AI, automation, and digital tools that punch above their weight.", useCases: ["Process Automation", "Analytics Dashboards", "Cost Optimization"] },
  { name: "Retail & Ecommerce", icon: "ShoppingCart", description: "Personalise shopping experiences, optimise inventory, and drive conversions using AI and data analytics.", useCases: ["Personalization", "Demand Forecasting", "Inventory Optimization"] },
  { name: "FinTech", icon: "Building2", description: "Intelligent credit, fraud detection, compliance automation, and real-time financial analytics for modern finance.", useCases: ["Fraud Detection", "Risk Scoring", "Compliance Automation"] },
  { name: "Education", icon: "GraduationCap", description: "Build adaptive learning platforms, automate administration, and deliver personalised education at scale.", useCases: ["Adaptive Learning", "Admin Automation", "Student Analytics"] },
  { name: "Logistics", icon: "Truck", description: "Optimise routes, predict demand, track fleets in real-time, and automate warehouse operations with AI.", useCases: ["Route Optimization", "Fleet Tracking", "Warehouse AI"] },
  { name: "Brands & Marketing", icon: "Megaphone", description: "Create data-driven campaigns, automate content, and measure ROI with precision marketing intelligence.", useCases: ["Campaign Analytics", "Content Automation", "ROI Measurement"] },
  { name: "AdTech", icon: "Target", description: "Power programmatic advertising, audience intelligence, and real-time bidding with ML-driven ad systems.", useCases: ["Programmatic Ads", "Audience Intelligence", "Real-time Bidding"] },
  { name: "Telecom", icon: "Radio", description: "AI-powered network optimisation, churn prediction, and intelligent customer service for modern telecom.", useCases: ["Network Optimization", "Churn Prediction", "Customer AI"] },
  { name: "Automotive", icon: "Car", description: "Connected vehicles, smart manufacturing, dealer analytics, and AI-powered supply chains for the automotive industry.", useCases: ["Connected Vehicles", "Dealer Analytics", "Supply Chain AI"] },
  { name: "Entertainment", icon: "Film", description: "Content recommendation, audience analytics, and automated production workflows for digital entertainment.", useCases: ["Content Recommendations", "Audience Analytics", "Production AI"] },
];

export const caseStudies = [
  {
    title: "Predictive Maintenance for Automotive Manufacturing",
    industry: "Automotive Manufacturing",
    description: "Implemented machine learning models on sensor data to detect early machine failures and schedule maintenance proactively across 120 CNC machines.",
    metrics: [
      { value: "47%", label: "Downtime Reduction" },
      { value: "85%", label: "Prediction Accuracy" },
      { value: "₹2.4Cr", label: "Annual Savings" },
    ],
  },
  {
    title: "AI-Based Quality Inspection System",
    industry: "Consumer Goods Manufacturing",
    description: "Developed a computer vision model that automatically detects product defects on the production line using high-resolution industrial cameras.",
    metrics: [
      { value: "98%", label: "Detection Accuracy" },
      { value: "70%", label: "QC Effort Reduced" },
      { value: "1,200", label: "Units/Hour Inspected" },
    ],
  },
  {
    title: "Supply Chain Demand Forecasting",
    industry: "FMCG Manufacturing",
    description: "Built predictive analytics models that forecast demand using historical production, seasonal trends, and external market signals.",
    metrics: [
      { value: "94%", label: "Forecast Accuracy" },
      { value: "28%", label: "Inventory Reduction" },
      { value: "₹15Cr", label: "Capital Freed" },
    ],
  },
];

export const completedProjects = [
  { title: "Smart Predictive Maintenance System", industry: "Automotive Manufacturing · Tier-1 Supplier", type: "Predictive Maintenance", challenge: "Production downtime from unexpected CNC machine failures causing ₹2Cr+ monthly losses.", solution: "ML models on vibration sensor data with real-time fault detection and maintenance scheduling." },
  { title: "AI-Based Quality Inspection System", industry: "Consumer Goods Manufacturing · FMCG", type: "Quality Analytics", challenge: "Manual quality inspection was slow, inconsistent, and missing 15–20% of surface defects.", solution: "Computer vision model with industrial cameras inspecting 1,200 units/hour in real time." },
  { title: "Supply Chain Demand Forecasting", industry: "FMCG Manufacturing · Multi-Plant", type: "Supply Chain", challenge: "Frequent stockouts and excess inventory worth ₹15Cr tied up due to poor demand visibility.", solution: "Predictive models using historical data, seasonal patterns, and external market signals." },
  { title: "Smart Factory Analytics System", industry: "Pharmaceutical Manufacturing · 40 Lines", type: "Production Analytics", challenge: "No visibility into real-time OEE across 40 packaging lines causing scheduling inefficiencies.", solution: "Real-time OEE dashboards + AI scheduling engine integrated with existing MES systems." },
  { title: "AI Energy Optimization Platform", industry: "Steel Manufacturing · High-Energy Plant", type: "Energy Management", challenge: "Energy bills consuming 35% of operational costs with no AI-driven optimization in place.", solution: "AI model recommending real-time load balancing, peak shaving, and shift scheduling changes." },
  { title: "Unified Production Intelligence Dashboard", industry: "Textile Manufacturing · 8 Plants", type: "Data Visualization", challenge: "8 plants with siloed data — management had no unified view of production performance.", solution: "Unified data pipeline and Power BI dashboard giving real-time cross-plant visibility and KPI tracking." },
];
