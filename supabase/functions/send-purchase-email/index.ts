// send-purchase-email edge function
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const STORAGE_MAP: Record<string, { bucket: string; file: string }> = {
  "flexa-fitness-booking": { bucket: "Mobile apps proto", file: "Fitness.zip" },
  "freshly-grocery-delivery": { bucket: "Mobile apps proto", file: "Grocery Delivery.zip" },
  "ritual-time-habit-tracker": { bucket: "Mobile apps proto", file: "Habit Tracker.zip" },
  "tavola-restaurant-app": { bucket: "Mobile apps proto", file: "Modern Restaurant.zip" },
  "bloom-pregnancy-tracker": { bucket: "Mobile apps proto", file: "Pregnancy Tracker.zip" },
  "echofy-music-player": { bucket: "Mobile apps proto", file: "Music Player.zip" },
  "fashionista-brand-app": { bucket: "Mobile apps proto", file: "Fashion Brand.zip" },
  "meditrack-health-clarity": { bucket: "Mobile apps proto", file: "healthclarity.zip" },
  "castbox-podcast-player": { bucket: "Mobile apps proto", file: "Podcast Player.zip" },
  "clipcraft-video-editing": { bucket: "Mobile apps proto", file: "Video Editing.zip" },
  "zenflow-meditation-app": { bucket: "Mobile apps proto", file: "Meditation App.zip" },
  "nurtune-baby-growth": { bucket: "Mobile apps proto", file: "baby_growth.zip" },
  "nourish-meal-planner": { bucket: "Mobile apps proto", file: "meal planner.zip" },
  "rinse-laundry-service": { bucket: "Mobile apps proto", file: "laundry_service.zip" },
  "fluxchain-supply-chain": { bucket: "Mobile apps proto", file: "supplychain_vision.zip" },
  "circle-digital-agency": { bucket: "Mobile apps proto", file: "Digital Agency.zip" },
  "breathe-guided-breathing": { bucket: "Mobile apps proto", file: "guided_breathing.zip" },
  "pawcare-pet-tracker": { bucket: "Mobile apps proto", file: "pet_care.zip" },
  "lingua-language-learning": { bucket: "Mobile apps proto", file: "language_learning.zip" },
  "pharma-inventory-manager": { bucket: "Mobile apps proto", file: "pharmacy_inventory.zip" },
  "eventpro-registration": { bucket: "Mobile apps proto", file: "event_registration.zip" },
  "homefix-services-booking": { bucket: "Mobile apps proto", file: "home_services_booking.zip" },
  "taskflow-todo-list": { bucket: "Mobile apps proto", file: "to_do_list.zip" },
  "techlaunch-startup-app": { bucket: "Mobile apps proto", file: "tech startup.zip" },
  "ledgerly-accounting": { bucket: "Web SaaS proto", file: "accounting.zip" },
  "salesdeck-crm-pro": { bucket: "Web SaaS proto", file: "crmpro.zip" },
  "bracket-gaming-tournament": { bucket: "Web SaaS proto", file: "gaming_tournament.zip" },
  "procura-order-management": { bucket: "Web SaaS proto", file: "Procure Order Management.zip" },
  "vitaltracker-health-dashboard": { bucket: "Web SaaS proto", file: "vitaltracker.zip" },
  "blogforge-creation-platform": { bucket: "Web SaaS proto", file: "Blog Creation.zip" },
  "eduflow-learning-platform": { bucket: "Web SaaS proto", file: "E Learning Platform.zip" },
  "commissionly-sales-calculator": { bucket: "Web SaaS proto", file: "Sales Commision Calculator.zip" },
  "performx-sales-dashboard": { bucket: "Web SaaS proto", file: "Sales Performance.zip" },
  "wanderlust-travel-booking": { bucket: "Web SaaS proto", file: "Travel Booking.zip" },
  "fitpro-workout-trainer": { bucket: "Web SaaS proto", file: "Workout Trainer.zip" },
  "bizcraft-business-suite": { bucket: "Web SaaS proto", file: "business.zip" },
  "contractly-management": { bucket: "Web SaaS proto", file: "contract_management.zip" },
  "greenmetrics-esg-reporting": { bucket: "Web SaaS proto", file: "esg_reporting.zip" },
  "hirehub-job-board": { bucket: "Web SaaS proto", file: "job_board.zip" },
  "stockpulse-live-market": { bucket: "Web SaaS proto", file: "live_stock_market.zip" },
  "admetrics-marketing-analytics": { bucket: "Web SaaS proto", file: "marketing_analytics.zip" },
  "install-kick-app-download": { bucket: "Web SaaS proto", file: "mobileapp_download.zip" },
  "align-okr-tracking": { bucket: "Web SaaS proto", file: "okr_tracking.zip" },
  "launchpad-product-launch": { bucket: "Web SaaS proto", file: "product_launch.zip" },
  "taskboard-project-management": { bucket: "Web SaaS proto", file: "project_management.zip" },
  "nestfinder-real-estate": { bucket: "Web SaaS proto", file: "real_estate_listing.zip" },
  "launchpad-startup-pre-launch": { bucket: "Web SaaS proto", file: "startup_pre_launch.zip" },
  "meetflow-video-conferencing": { bucket: "Web SaaS proto", file: "video_conferencing.zip" },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { customerEmail, customerName, orderId, items, total, currency, tierName } = await req.json();

    if (!customerEmail || !items || !orderId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const symbol = currency === "inr" ? "₹" : "$";
    
    // Build download links
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const downloadLinks = items.map((item: { slug: string; name: string }) => {
      const mapping = STORAGE_MAP[item.slug];
      if (mapping) {
        const url = `${supabaseUrl}/storage/v1/object/public/${encodeURIComponent(mapping.bucket)}/${encodeURIComponent(mapping.file)}`;
        return { name: item.name, url };
      }
      return { name: item.name, url: null };
    }).filter((l: { url: string | null }) => l.url);

    // Build email HTML
    const itemsList = downloadLinks.map((l: { name: string; url: string }) => 
      `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;color:#333;">${l.name}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">
          <a href="${l.url}" style="display:inline-block;padding:6px 16px;background:#2563EB;color:#fff;text-decoration:none;border-radius:6px;font-size:13px;font-weight:600;">Download</a>
        </td>
      </tr>`
    ).join("");

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#f5f7fb;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
      <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <div style="background:linear-gradient(135deg,#2563EB,#06B6D4);padding:32px;text-align:center;">
          <h1 style="margin:0;color:#fff;font-size:24px;">🎉 Order Confirmed!</h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Order ${orderId}</p>
        </div>
        <div style="padding:32px;">
          <p style="font-size:16px;color:#333;margin:0 0 8px;">Hi ${customerName || "there"},</p>
          <p style="font-size:14px;color:#666;margin:0 0 24px;">
            Thank you for your purchase! ${tierName ? `Your <strong>${tierName}</strong> includes access to ${items.length} prototype${items.length > 1 ? "s" : ""}.` : ""}
            Here are your download links:
          </p>
          
          <table style="width:100%;border-collapse:collapse;margin:0 0 24px;">
            ${itemsList}
          </table>
          
          <div style="background:#f0f9ff;border:1px solid #dbeafe;border-radius:12px;padding:16px;margin:0 0 24px;">
            <p style="margin:0;font-size:14px;color:#1e40af;font-weight:600;">Order Summary</p>
            <p style="margin:4px 0 0;font-size:13px;color:#3b82f6;">
              ${items.length} prototype${items.length > 1 ? "s" : ""} • ${symbol}${total.toLocaleString()} ${tierName ? `(${tierName})` : ""} • One-time payment
            </p>
          </div>
          
          <div style="text-align:center;">
            <a href="https://akcelerate.dev/my-purchases" style="display:inline-block;padding:12px 32px;background:#2563EB;color:#fff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;">
              View My Purchases →
            </a>
          </div>
          
          <p style="margin:24px 0 0;font-size:12px;color:#999;text-align:center;">
            Need help? Reply to this email or contact us at akceleratehq@gmail.com
          </p>
        </div>
      </div>
    </body>
    </html>`;

    // Try sending via Resend if key exists
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const senderDomain = Deno.env.get("SENDER_DOMAIN") || "akcelerate.dev";
    
    if (resendKey) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `AKcelerate <noreply@${senderDomain}>`,
          to: [customerEmail],
          subject: `Order Confirmed: ${orderId} — Your download links are ready!`,
          html: emailHtml,
        }),
      });

      const emailResult = await emailResponse.json();
      
      return new Response(
        JSON.stringify({ success: true, emailSent: true, emailId: emailResult.id, downloadLinks }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // If no email service, return download links only
    return new Response(
      JSON.stringify({ success: true, emailSent: false, downloadLinks, message: "Email service not configured. Download links returned." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
