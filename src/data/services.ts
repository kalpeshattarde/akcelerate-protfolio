export interface ServiceDetail {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  icon: string;
  tags: string[];
  timelineTitle: string;
  features: string[];
  serviceDetails: ServiceDetail[];
  benefits: { title: string; description: string; metric: string; metricLabel: string }[];
  process: { step: number; title: string; description: string; duration: string }[];
  techStack: string[];
  results: { metric: string; label: string }[];
}

export const services: Service[] = [
  {
    slug: "predictive-maintenance",
    title: "Predictive Maintenance",
    heroTitle: "Prevent Failures",
    heroSubtitle: "Before They Happen",
    description: "AKcelerate's AI-powered predictive maintenance platform continuously monitors equipment health using IoT sensor data, detecting anomalies up to 72 hours before failure — reducing unplanned downtime by up to 47%.",
    icon: "Wrench",
    tags: ["IoT Sensors", "ML Anomaly Detection", "CMMS Integration", "Real-time Monitoring", "Work Orders"],
    timelineTitle: "Live in 6 Weeks, Not 6 Months",
    serviceDetails: [
      { title: "Real-Time Sensor Monitoring", description: "Ingest data from vibration, temperature, pressure, current, and acoustic sensors at up to 10,000 readings/second with <100ms latency." },
      { title: "ML Anomaly Detection", description: "LSTM neural networks learn each machine's unique normal behaviour and flag deviations with 85% prediction accuracy before failures occur." },
      { title: "Automated Work Orders", description: "When a failure probability threshold is crossed, the system auto-generates CMMS work orders and notifies maintenance teams via SMS, email, or app." },
      { title: "Equipment Health Scoring", description: "Live health scores (0–100) for every machine, displayed on intuitive dashboards with trend history, remaining useful life estimates, and drill-down analytics." },
      { title: "ERP / CMMS Integration", description: "Native connectors for SAP PM, IBM Maximo, Oracle EAM, and Infor. REST APIs available for any custom CMMS or ERP system." },
      { title: "Root Cause Analytics", description: "Explainable AI (XAI) surfaces the top contributing sensor signals and historical patterns behind every alert — giving your engineers full context, not black-box outputs." },
    ],
    features: ["Real-time sensor data analysis", "Failure prediction models", "Maintenance scheduling optimization", "Equipment health scoring", "Alert and notification systems", "Integration with CMMS/ERP"],
    benefits: [
      { title: "Reduce Downtime", description: "Predict equipment failures before they happen.", metric: "85%", metricLabel: "downtime reduction" },
      { title: "Cost Savings", description: "Shift from reactive to predictive maintenance.", metric: "40%", metricLabel: "maintenance cost savings" },
      { title: "Extended Asset Life", description: "Optimize maintenance schedules for longer equipment life.", metric: "25%", metricLabel: "longer asset lifespan" },
    ],
    process: [
      { step: 1, title: "Sensor Audit & Data Assessment", description: "We audit your existing sensors and PLC/SCADA data sources.", duration: "Week 1–2" },
      { step: 2, title: "Edge Gateway Deployment", description: "Install AKcelerate edge hardware to collect and pre-process data locally.", duration: "Week 2–3" },
      { step: 3, title: "AI Model Training", description: "Baseline models trained on 3–6 months of historical data. Custom models built per equipment class.", duration: "Week 3–5" },
      { step: 4, title: "Go Live & Tune", description: "Dashboard go-live, alert tuning with your maintenance team, CMMS integration, and staff training.", duration: "Week 5–6" },
    ],
    techStack: ["Python", "TensorFlow", "Azure IoT", "Apache Kafka", "Grafana", "Docker", "LSTM", "SCADA", "SAP PM"],
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
    heroTitle: "Smarter Supply Chains.",
    heroSubtitle: "Powered by AI.",
    description: "End-to-end supply chain visibility with AI-powered demand forecasting, inventory optimization, supplier risk analytics, and procurement intelligence — reducing costs and eliminating stockouts across your entire value chain.",
    icon: "Truck",
    tags: ["Demand Forecasting", "Inventory Optimization", "Supplier Risk", "Procurement Intelligence", "ERP Integration"],
    timelineTitle: "Connected in 8 Weeks",
    serviceDetails: [
      { title: "AI Demand Forecasting", description: "Multivariate time-series models combining your sales history, seasonality, market signals, and external data for 94% SKU-level forecast accuracy up to 13 weeks ahead." },
      { title: "Inventory Optimization", description: "Dynamic safety stock, reorder points, and EOQ calculations updated daily — reducing excess inventory by 28% while eliminating stockouts that cause production stoppages." },
      { title: "Supplier Risk Analytics", description: "Continuous risk scoring for every supplier using financial health, delivery performance, geo-political signals, and quality data — with automated escalation alerts." },
      { title: "End-to-End Visibility", description: "Real-time tracking of materials from supplier docks to production floor to finished goods warehouse — with ETA predictions and exception management." },
      { title: "Procurement Intelligence", description: "AI-assisted sourcing recommendations, price variance analytics, contract compliance monitoring, and spend classification across all procurement categories." },
      { title: "ERP Integration", description: "Pre-built connectors for SAP, Oracle, Microsoft Dynamics, and Tally. Two-way sync ensures your ERP always reflects AI-optimized inventory positions and supplier data." },
    ],
    features: ["Demand forecasting", "Inventory optimization", "Supplier performance scoring", "Logistics route optimization", "Risk assessment", "Real-time tracking dashboards"],
    benefits: [
      { title: "Demand Accuracy", description: "ML-powered demand forecasting that adapts to market changes.", metric: "95%", metricLabel: "forecast accuracy" },
      { title: "Inventory Optimization", description: "Reduce excess inventory while preventing stockouts.", metric: "30%", metricLabel: "inventory cost reduction" },
      { title: "Supply Visibility", description: "End-to-end visibility across your entire supply chain.", metric: "100%", metricLabel: "supply chain visibility" },
    ],
    process: [
      { step: 1, title: "Data Integration", description: "Connect ERP, WMS, and supply chain systems.", duration: "Week 1–2" },
      { step: 2, title: "Forecasting Models", description: "Build demand prediction and optimization models.", duration: "Week 3–5" },
      { step: 3, title: "Dashboard Development", description: "Create real-time analytics dashboards.", duration: "Week 6–7" },
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
    heroTitle: "Zero-Defect",
    heroSubtitle: "Manufacturing Intelligence",
    description: "Statistical AI and computer vision for real-time quality control across every production stage. Reduce defects by 67%, achieve regulatory compliance, and compress root cause analysis from days to minutes.",
    icon: "CheckSquare",
    tags: ["Computer Vision", "SPC", "Defect Detection", "ISO Compliance", "Root Cause Analysis"],
    timelineTitle: "Full QMS Integration in 6–10 Weeks",
    serviceDetails: [
      { title: "Statistical Process Control", description: "Real-time SPC charts (X-bar, R, CUSUM, EWMA) with automatic control limit calculation, violation detection, and process capability (Cpk) scoring." },
      { title: "Computer Vision Inspection", description: "Deep learning models trained on your defect images — detecting surface defects, dimensional non-conformances, and assembly errors at line speed with >98% accuracy." },
      { title: "Defect Pattern Recognition", description: "AI clusters defect types by root cause categories — machine, material, method, measurement, environment — surfacing systemic issues before they escalate." },
      { title: "Compliance & Traceability", description: "Full product traceability from raw material batch to finished good — with automated compliance reports for ISO, IATF 16949, FDA 21 CFR, and BIS standards." },
      { title: "Supplier Quality Monitoring", description: "Incoming material quality dashboards with supplier scorecards, rejection trend analytics, PPAP tracking, and automated supplier notification workflows." },
      { title: "Quality Prediction Engine", description: "Predicts final product quality from in-process measurements, enabling early intervention — stopping defective batches before completion." },
    ],
    features: ["Automated defect detection", "Statistical process control (SPC)", "Root cause analysis", "Quality prediction models", "Compliance reporting", "Computer vision inspection"],
    benefits: [
      { title: "Defect Detection", description: "Catch defects in real-time with computer vision AI.", metric: "99.5%", metricLabel: "detection accuracy" },
      { title: "Quality Improvement", description: "Reduce defect rates with predictive quality models.", metric: "60%", metricLabel: "defect reduction" },
      { title: "Compliance", description: "Automated reporting for ISO, FDA, and industry standards.", metric: "100%", metricLabel: "compliance coverage" },
    ],
    process: [
      { step: 1, title: "Quality Process Audit", description: "Map current inspection points, measurement systems (MSA), and defect categories.", duration: "Week 1–2" },
      { step: 2, title: "Sensor & Vision System Setup", description: "Install measurement sensors and camera systems at key inspection points.", duration: "Week 2–5" },
      { step: 3, title: "AI Model Training", description: "Train defect detection models on your historical images and data. Calibrate SPC control limits.", duration: "Week 4–8" },
      { step: 4, title: "Go Live & Compliance Setup", description: "Dashboard launch, compliance report templates, team training, and QMS integration.", duration: "Week 8–10" },
    ],
    techStack: ["Python", "OpenCV", "TensorFlow", "Power BI", "Azure ML", "Docker", "YOLO", "SPC"],
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
    heroTitle: "AI-Powered Energy",
    heroSubtitle: "Optimization",
    description: "Intelligent energy management that continuously monitors consumption, predicts peak demand, optimizes load scheduling, and reduces your manufacturing energy bill by 23% while cutting carbon footprint by 31%.",
    icon: "Zap",
    tags: ["Energy Monitoring", "Peak Demand", "Carbon Tracking", "IoT Metering", "Load Optimization"],
    timelineTitle: "Metered and Optimized in 4 Weeks",
    serviceDetails: [
      { title: "Real-Time Energy Monitoring", description: "Sub-meter level electricity, gas, steam, and compressed air monitoring with 15-second resolution — giving you granular visibility into every machine's energy draw." },
      { title: "Peak Demand Management", description: "AI predicts demand spikes up to 30 minutes ahead and automatically reschedules non-critical loads to avoid expensive peak demand charges from utilities." },
      { title: "Carbon Footprint Tracking", description: "Automatic Scope 1, 2, and 3 emissions calculation aligned with GHG Protocol — with BEE/PAT compliance reporting and carbon reduction scenario modelling." },
      { title: "Energy Benchmarking", description: "Normalize energy consumption by production output (kWh per unit) and benchmark against industry standards, shifts, and lines to identify your biggest inefficiencies." },
      { title: "Anomaly & Waste Detection", description: "ML models flag energy waste events — compressed air leaks, idle equipment left on, inefficient motor loads — automatically triggering maintenance or operations alerts." },
      { title: "Energy Cost Forecasting", description: "Forecast next month's energy bill by plant, shift, and product line — enabling accurate production budgeting and tariff optimization strategies." },
    ],
    features: ["Real-time energy monitoring", "Consumption forecasting", "Peak demand management", "Carbon footprint tracking", "Sustainability reporting", "IoT sensor integration"],
    benefits: [
      { title: "Energy Savings", description: "AI-optimized energy consumption across all operations.", metric: "30%", metricLabel: "energy cost reduction" },
      { title: "Peak Management", description: "Predict and manage peak demand to avoid surcharges.", metric: "25%", metricLabel: "peak demand reduction" },
      { title: "Sustainability", description: "Track and reduce carbon footprint with data-driven insights.", metric: "40%", metricLabel: "CO₂ reduction" },
    ],
    process: [
      { step: 1, title: "Energy Audit & Metering Plan", description: "Walk-through audit of your facility. Map all energy feeds and define sub-metering points.", duration: "Week 1" },
      { step: 2, title: "Smart Meter Installation", description: "Install IoT energy meters and connect to your BMS, DCS, or SCADA systems with minimal production disruption.", duration: "Week 1–2" },
      { step: 3, title: "AI Baseline & Model Training", description: "Establish energy baseline per product/shift. Train anomaly detection and forecasting models.", duration: "Week 2–3" },
      { step: 4, title: "Dashboard & Optimization Go-Live", description: "Energy control centre live. Peak demand optimizer active. Team trained. Carbon reports configured.", duration: "Week 3–4" },
    ],
    techStack: ["Python", "TensorFlow", "Azure IoT Hub", "Grafana", "InfluxDB", "Docker", "BMS", "SCADA"],
    results: [
      { metric: "30%", label: "Energy Savings" },
      { metric: "25%", label: "Peak Reduction" },
      { metric: "40%", label: "CO₂ Reduction" },
      { metric: "2yr", label: "Payback Period" },
    ],
  },
];

export const getService = (slug: string) => services.find(s => s.slug === slug);
