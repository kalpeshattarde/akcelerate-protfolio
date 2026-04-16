import { supabase } from "@/integrations/supabase/client";

/**
 * Maps product slugs to their storage bucket and file name in Supabase Storage.
 */
const STORAGE_MAP: Record<string, { bucket: string; file: string }> = {
  // Mobile Apps → "Mobile apps proto" bucket
  "flexa-fitness-booking": { bucket: "Mobile apps proto", file: "Fitness.zip" },
  "freshly-grocery-delivery": { bucket: "Mobile apps proto", file: "Grocery Delivery.zip" },
  "ritual-time-habit-tracker": { bucket: "Mobile apps proto", file: "Habit Tracker.zip" },
  "tavola-restaurant-app": { bucket: "Mobile apps proto", file: "Modern Restaurant.zip" },
  "bloom-pregnancy-tracker": { bucket: "Mobile apps proto", file: "Pregnancy Tracker.zip" },
  "circle-digital-agency": { bucket: "Mobile apps proto", file: "Digital Agency.zip" },
  "silhouette-fashion-brand": { bucket: "Mobile apps proto", file: "Fashion Brand.zip" },
  "still-meditation-app": { bucket: "Mobile apps proto", file: "Meditation App.zip" },
  "echofy-music-player": { bucket: "Mobile apps proto", file: "Music Player.zip" },
  "resonance-podcast-player": { bucket: "Mobile apps proto", file: "Podcast Player.zip" },
  "framecut-video-editing": { bucket: "Mobile apps proto", file: "Video Editing.zip" },
  "nurture-baby-growth": { bucket: "Mobile apps proto", file: "baby_growth.zip" },
  "attend-event-registration": { bucket: "Mobile apps proto", file: "event_registration.zip" },
  "intake-health-calorie-tracker": { bucket: "Mobile apps proto", file: "healthclarity.zip" },
  "domus-home-services": { bucket: "Mobile apps proto", file: "home_services_booking.zip" },
  "lingua-language-learning": { bucket: "Mobile apps proto", file: "language_learning.zip" },
  "rinse-laundry-service": { bucket: "Mobile apps proto", file: "laundry_service.zip" },
  "nourish-meal-planner": { bucket: "Mobile apps proto", file: "meal planner.zip" },
  "companion-pet-care": { bucket: "Mobile apps proto", file: "pet_care.zip" },
  "formulary-pharmacy-inventory": { bucket: "Mobile apps proto", file: "pharmacy_inventory.zip" },
  "fluxchain-supply-chain": { bucket: "Mobile apps proto", file: "supplychain_vision.zip" },
  "ignite-tech-startup": { bucket: "Mobile apps proto", file: "tech startup.zip" },
  "focus-to-do-list": { bucket: "Mobile apps proto", file: "to_do_list.zip" },
  "breathly-guided-breathing": { bucket: "Mobile apps proto", file: "guided_breathing.zip" },

  // Web SaaS → "Web SaaS proto" bucket
  "publishhub-blog-creation": { bucket: "Web SaaS proto", file: "Blog Creation.zip" },
  "payoutly-sales-commission": { bucket: "Web SaaS proto", file: "Sales Commision Calculator.zip" },
  "quotalytics-sales-performance": { bucket: "Web SaaS proto", file: "Sales Performance.zip" },
  "pillar-one-business": { bucket: "Web SaaS proto", file: "business.zip" },
  "accord-contract-management": { bucket: "Web SaaS proto", file: "contract_management.zip" },
  "hireboard-job-board": { bucket: "Web SaaS proto", file: "job_board.zip" },
  "release-product-launch": { bucket: "Web SaaS proto", file: "product_launch.zip" },
  "taskline-project-management": { bucket: "Web SaaS proto", file: "project_management.zip" },
  "launchpad-startup-prelaunch": { bucket: "Web SaaS proto", file: "startup_pre_launch.zip" },
  "conv-teams-video-conferencing": { bucket: "Web SaaS proto", file: "video_conferencing.zip" },
  "ledgerly-accounting": { bucket: "Web SaaS proto", file: "accounting.zip" },
  "salesdesk-crm-pro": { bucket: "Web SaaS proto", file: "crmpro.zip" },
  "electern-elearning": { bucket: "Web SaaS proto", file: "E Learning Platform.zip" },
  "procura-order-management": { bucket: "Web SaaS proto", file: "Procure Order Management.zip" },
  "tripio-travel-booking": { bucket: "Web SaaS proto", file: "Travel Booking.zip" },
  "forme-workout-trainer": { bucket: "Web SaaS proto", file: "Workout Trainer.zip" },
  "atlas-esg-reporting": { bucket: "Web SaaS proto", file: "esg_reporting.zip" },
  "bracket-gaming-tournament": { bucket: "Web SaaS proto", file: "gaming_tournament.zip" },
  "tickerview-stock-market": { bucket: "Web SaaS proto", file: "live_stock_market.zip" },
  "signal-mint-marketing-analytics": { bucket: "Web SaaS proto", file: "marketing_analytics.zip" },
  "install-kick-app-download": { bucket: "Web SaaS proto", file: "mobileapp_download.zip" },
  "alignbase-okr-tracking": { bucket: "Web SaaS proto", file: "okr_tracking.zip" },
  "estatea-real-estate": { bucket: "Web SaaS proto", file: "real_estate_listing.zip" },
  "vitaltracker-health-dashboard": { bucket: "Web SaaS proto", file: "vitaltracker.zip" },
};

/**
 * Downloads a product file from Supabase Storage public buckets.
 * Falls back to generating a README if the file mapping doesn't exist.
 */
export async function downloadProductFile(slug: string, productName: string, features: string[]): Promise<{ success: boolean; fallback: boolean }> {
  const mapping = STORAGE_MAP[slug];

  if (mapping) {
    try {
      // Public bucket — use public URL directly
      const { data } = supabase.storage
        .from(mapping.bucket)
        .getPublicUrl(mapping.file);

      if (data?.publicUrl) {
        const a = document.createElement("a");
        a.href = data.publicUrl;
        a.download = `${slug}-source-code.zip`;
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return { success: true, fallback: false };
      }
    } catch {
      // Fall through to fallback
    }
  }

  // Fallback: generate a README file
  const content = generateReadme(productName, features);
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${slug}-source-code-README.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return { success: true, fallback: true };
}

function generateReadme(productName: string, features: string[]): string {
  return `# ${productName} — Source Code

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Features
${features.map(f => `- ${f}`).join("\n")}

## Tech Stack
- React 18 + TypeScript
- Tailwind CSS
- Vite
- Shadcn/ui components

## Support
Email: akceleratehq@gmail.com

© ${new Date().getFullYear()} AKcelerate. All rights reserved.
`;
}
