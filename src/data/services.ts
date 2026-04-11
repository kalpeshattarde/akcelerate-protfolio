export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  benefits: { title: string; description: string; metric: string; metricLabel: string }[];
  process: { step: number; title: string; description: string; duration: string }[];
  techStack: string[];
  results: { metric: string; label: string }[];
}

export const services: Service[] = [
  {
    slug: "predictive-maintenance",
    title: "Predictive Maintenance",
    description: "AI-driven equipment health monitoring and failure prediction to eliminate unplanned downtime and reduce maintenance costs by up to 40%.",
    icon: "Wrench",
    features: ["Real-time sensor data analysis", "Failure prediction models", "Maintenance scheduling optimization", "Equipment health scoring", "Alert and notification systems", "Integration with CMMS/ERP"],
    benefits: [
      { title: "Reduce Downtime", description: "Predict equipment failures before they happen.", metric: "85%", metricLabel: "downtime reduction" },
      { title: "Cost Savings", description: "Shift from reactive to predictive maintenance.", metric: "40%", metricLabel: "maintenance cost savings" },
      { title: "Extended Asset Life", description: "Optimize maintenance schedules for longer equipment life.", metric: "25%", metricLabel: "longer asset lifespan" },
    ],
    process: [
      { step: 1, title: "Sensor Assessment", description: "Evaluate existing sensor infrastructure and data quality.", duration: "Week 1-2" },
      { step: 2, title: "Model Development", description: "Build ML models for failure prediction and anomaly detection.", duration: "Week 3-5" },
      { step: 3, title: "Integration", description: "Connect to SCADA, IoT platforms, and existing systems.", duration: "Week 6-7" },
      { step: 4, title: "Deployment", description: "Deploy real-time monitoring dashboards and alert systems.", duration: "Week 8" },
    ],
    techStack: ["Python", "TensorFlow", "Azure IoT", "Apache Kafka", "Grafana", "Docker"],
    results: [
      { metric: "85%", label: "Downtime Reduction" },
      { metric: "40%", label: "Cost Savings" },
      { metric: "3x", label: "ROI in Year 1" },
      { metric: "99.2%", label: "Prediction Accuracy" },
    ],
  },
  {
    slug: "supply-chain-analytics",
    title: "Supply Chain Analytics",
    description: "End-to-end supply chain intelligence with demand forecasting, inventory optimization, and logistics analytics.",
    icon: "Truck",
    features: ["Demand forecasting", "Inventory optimization", "Supplier performance scoring", "Logistics route optimization", "Risk assessment", "Real-time tracking dashboards"],
    benefits: [
      { title: "Demand Accuracy", description: "ML-powered demand forecasting that adapts to market changes.", metric: "95%", metricLabel: "forecast accuracy" },
      { title: "Inventory Optimization", description: "Reduce excess inventory while preventing stockouts.", metric: "30%", metricLabel: "inventory cost reduction" },
      { title: "Supply Visibility", description: "End-to-end visibility across your entire supply chain.", metric: "100%", metricLabel: "supply chain visibility" },
    ],
    process: [
      { step: 1, title: "Data Integration", description: "Connect ERP, WMS, and supply chain systems.", duration: "Week 1-2" },
      { step: 2, title: "Forecasting Models", description: "Build demand prediction and optimization models.", duration: "Week 3-5" },
      { step: 3, title: "Dashboard Development", description: "Create real-time analytics dashboards.", duration: "Week 6-7" },
      { step: 4, title: "Go Live", description: "Deploy and train supply chain teams.", duration: "Week 8" },
    ],
    techStack: ["Python", "Scikit-learn", "Power BI", "Azure Data Factory", "SQL Server", "Apache Airflow"],
    results: [
      { metric: "95%", label: "Forecast Accuracy" },
      { metric: "30%", label: "Inventory Savings" },
      { metric: "20%", label: "Logistics Cost Reduction" },
      { metric: "2x", label: "Faster Order Fulfillment" },
    ],
  },
  {
    slug: "quality-analytics",
    title: "Quality Analytics",
    description: "AI-powered defect detection, quality control automation, and statistical process control for zero-defect manufacturing.",
    icon: "CheckSquare",
    features: ["Automated defect detection", "Statistical process control (SPC)", "Root cause analysis", "Quality prediction models", "Compliance reporting", "Computer vision inspection"],
    benefits: [
      { title: "Defect Detection", description: "Catch defects in real-time with computer vision AI.", metric: "99.5%", metricLabel: "detection accuracy" },
      { title: "Quality Improvement", description: "Reduce defect rates with predictive quality models.", metric: "60%", metricLabel: "defect reduction" },
      { title: "Compliance", description: "Automated reporting for ISO, FDA, and industry standards.", metric: "100%", metricLabel: "compliance coverage" },
    ],
    process: [
      { step: 1, title: "Quality Audit", description: "Assess current QC processes and defect patterns.", duration: "Week 1-2" },
      { step: 2, title: "AI Model Training", description: "Train computer vision and SPC models on your data.", duration: "Week 3-5" },
      { step: 3, title: "System Integration", description: "Integrate with production lines and MES systems.", duration: "Week 6-7" },
      { step: 4, title: "Deployment", description: "Deploy real-time quality monitoring.", duration: "Week 8" },
    ],
    techStack: ["Python", "OpenCV", "TensorFlow", "Power BI", "Azure ML", "Docker"],
    results: [
      { metric: "99.5%", label: "Detection Rate" },
      { metric: "60%", label: "Defect Reduction" },
      { metric: "4x", label: "Inspection Speed" },
      { metric: "45%", label: "QC Cost Savings" },
    ],
  },
  {
    slug: "energy-management",
    title: "Energy Management",
    description: "AI-optimized energy consumption monitoring, forecasting, and sustainability analytics for industrial operations.",
    icon: "Zap",
    features: ["Real-time energy monitoring", "Consumption forecasting", "Peak demand management", "Carbon footprint tracking", "Sustainability reporting", "IoT sensor integration"],
    benefits: [
      { title: "Energy Savings", description: "AI-optimized energy consumption across all operations.", metric: "30%", metricLabel: "energy cost reduction" },
      { title: "Peak Management", description: "Predict and manage peak demand to avoid surcharges.", metric: "25%", metricLabel: "peak demand reduction" },
      { title: "Sustainability", description: "Track and reduce carbon footprint with data-driven insights.", metric: "40%", metricLabel: "CO₂ reduction" },
    ],
    process: [
      { step: 1, title: "Energy Audit", description: "Map energy consumption patterns and identify waste.", duration: "Week 1-2" },
      { step: 2, title: "IoT Setup", description: "Deploy smart meters and IoT sensors.", duration: "Week 3-4" },
      { step: 3, title: "AI Modeling", description: "Build forecasting and optimization models.", duration: "Week 5-7" },
      { step: 4, title: "Dashboard & Alerts", description: "Deploy monitoring dashboards and alert systems.", duration: "Week 8" },
    ],
    techStack: ["Python", "TensorFlow", "Azure IoT Hub", "Grafana", "InfluxDB", "Docker"],
    results: [
      { metric: "30%", label: "Energy Savings" },
      { metric: "25%", label: "Peak Reduction" },
      { metric: "40%", label: "CO₂ Reduction" },
      { metric: "2yr", label: "Payback Period" },
    ],
  },
];

export const getService = (slug: string) => services.find(s => s.slug === slug);
