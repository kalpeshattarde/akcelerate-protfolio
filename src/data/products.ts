export type ProductCategory = "mobile-app" | "web-saas";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  topSelling: boolean;
  salesCount: number;
  description: string;
  shortDesc: string;
  previewImage: string;
  tags: string[];
  priceTier: "single" | "bundle" | "enterprise";
  price: { usd: number; inr: number };
  features: string[];
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "AI Fitness Tracker",
    slug: "ai-fitness-tracker",
    category: "mobile-app",
    topSelling: true,
    salesCount: 842,
    description: "A full-featured AI-powered fitness tracking mobile application with workout plans, nutrition tracking, and real-time analytics. Built with React Native and a Node.js backend.",
    shortDesc: "AI-powered fitness tracking with smart workout plans",
    previewImage: "/placeholder.svg",
    tags: ["react-native", "ai", "health", "mobile"],
    priceTier: "single",
    price: { usd: 49, inr: 4099 },
    features: ["AI workout generation", "Nutrition tracker", "Progress analytics", "Social features", "Push notifications"],
    badge: "Top Seller",
  },
  {
    id: "2",
    name: "E-Commerce Dashboard",
    slug: "ecommerce-dashboard",
    category: "web-saas",
    topSelling: true,
    salesCount: 1203,
    description: "Complete e-commerce analytics dashboard with real-time sales tracking, inventory management, and AI-driven demand forecasting. Integrates with Shopify, WooCommerce, and custom APIs.",
    shortDesc: "Real-time e-commerce analytics & AI demand forecasting",
    previewImage: "/placeholder.svg",
    tags: ["react", "analytics", "ecommerce", "dashboard"],
    priceTier: "bundle",
    price: { usd: 129, inr: 10999 },
    features: ["Real-time sales dashboard", "Inventory management", "AI demand forecasting", "Multi-platform integration", "Custom reports"],
    badge: "Most Popular",
  },
  {
    id: "3",
    name: "Food Delivery App",
    slug: "food-delivery-app",
    category: "mobile-app",
    topSelling: true,
    salesCount: 654,
    description: "Production-ready food delivery mobile app with customer, restaurant, and driver interfaces. Real-time order tracking, payment integration, and rating system.",
    shortDesc: "Complete food delivery app with real-time tracking",
    previewImage: "/placeholder.svg",
    tags: ["react-native", "maps", "payments", "mobile"],
    priceTier: "bundle",
    price: { usd: 149, inr: 12499 },
    features: ["3 user interfaces", "Real-time GPS tracking", "Payment gateway", "Rating system", "Push notifications"],
  },
  {
    id: "4",
    name: "CRM Platform",
    slug: "crm-platform",
    category: "web-saas",
    topSelling: true,
    salesCount: 987,
    description: "Enterprise-grade CRM platform with lead management, pipeline tracking, email automation, and AI-powered sales predictions. Customizable workflows and integrations.",
    shortDesc: "Enterprise CRM with AI sales predictions",
    previewImage: "/placeholder.svg",
    tags: ["react", "crm", "automation", "enterprise"],
    priceTier: "enterprise",
    price: { usd: 299, inr: 24999 },
    features: ["Lead management", "Pipeline tracking", "Email automation", "AI predictions", "Custom workflows"],
    badge: "Enterprise",
  },
  {
    id: "5",
    name: "Social Media App",
    slug: "social-media-app",
    category: "mobile-app",
    topSelling: false,
    salesCount: 321,
    description: "Feature-rich social media mobile app with stories, reels, messaging, and AI content moderation. Scalable architecture supporting millions of users.",
    shortDesc: "Full social platform with stories, reels & messaging",
    previewImage: "/placeholder.svg",
    tags: ["react-native", "social", "messaging", "media"],
    priceTier: "enterprise",
    price: { usd: 399, inr: 33499 },
    features: ["Stories & Reels", "Real-time messaging", "AI content moderation", "Notification system", "Scalable architecture"],
  },
  {
    id: "6",
    name: "Project Management Tool",
    slug: "project-management-tool",
    category: "web-saas",
    topSelling: false,
    salesCount: 445,
    description: "Agile project management SaaS with Kanban boards, sprint planning, time tracking, and team collaboration. Built for modern development teams.",
    shortDesc: "Agile project management with Kanban & sprints",
    previewImage: "/placeholder.svg",
    tags: ["react", "kanban", "agile", "collaboration"],
    priceTier: "single",
    price: { usd: 59, inr: 4999 },
    features: ["Kanban boards", "Sprint planning", "Time tracking", "Team chat", "File sharing"],
  },
  {
    id: "7",
    name: "Meditation & Wellness App",
    slug: "meditation-wellness-app",
    category: "mobile-app",
    topSelling: false,
    salesCount: 278,
    description: "Calming meditation and wellness mobile app with guided sessions, sleep stories, breathing exercises, and mood tracking powered by AI.",
    shortDesc: "AI-guided meditation with sleep stories & mood tracking",
    previewImage: "/placeholder.svg",
    tags: ["react-native", "wellness", "ai", "health"],
    priceTier: "single",
    price: { usd: 39, inr: 3299 },
    features: ["Guided meditations", "Sleep stories", "Breathing exercises", "Mood tracking", "AI recommendations"],
  },
  {
    id: "8",
    name: "HR & Payroll System",
    slug: "hr-payroll-system",
    category: "web-saas",
    topSelling: false,
    salesCount: 512,
    description: "Complete HR management and payroll SaaS with employee onboarding, leave management, payroll processing, and compliance reporting.",
    shortDesc: "Complete HR & payroll with automated compliance",
    previewImage: "/placeholder.svg",
    tags: ["react", "hr", "payroll", "enterprise"],
    priceTier: "bundle",
    price: { usd: 199, inr: 16999 },
    features: ["Employee onboarding", "Leave management", "Payroll processing", "Compliance reports", "Performance reviews"],
  },
];
