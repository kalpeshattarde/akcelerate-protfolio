import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, productName, productSlug } = await req.json();

    if (!email || !productSlug) {
      return new Response(
        JSON.stringify({ error: "Missing email or productSlug" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create a signed download URL from Supabase Storage
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const filePath = `${productSlug}.zip`;
    const { data: signedData } = await supabase.storage
      .from("product-files")
      .createSignedUrl(filePath, 86400); // 24 hour expiry

    const downloadUrl = signedData?.signedUrl || `${supabaseUrl}/products/${productSlug}`;

    // Send email via Resend (if RESEND_API_KEY is set) or log
    const resendKey = Deno.env.get("RESEND_API_KEY");

    if (resendKey) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "AKcelerate <downloads@akcelerate.com>",
          to: [email],
          subject: `Your download: ${productName}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
              <h2 style="color: #0f172a; margin-bottom: 8px;">Your prototype is ready</h2>
              <p style="color: #64748b; font-size: 15px; line-height: 1.6;">
                Thanks for purchasing <strong>${productName}</strong>. Click below to download your source code.
              </p>
              <a href="${downloadUrl}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px; margin: 20px 0;">
                Download Source Code
              </a>
              <p style="color: #94a3b8; font-size: 13px; margin-top: 24px;">
                This link expires in 24 hours. You can always re-download from your dashboard.
              </p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="color: #94a3b8; font-size: 12px;">
                © ${new Date().getFullYear()} AKcelerate. All rights reserved.
              </p>
            </div>
          `,
        }),
      });

      if (!emailResponse.ok) {
        const err = await emailResponse.text();
        console.error("Resend error:", err);
        return new Response(
          JSON.stringify({ error: "Failed to send email", details: err }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } else {
      console.log(`[Email Delivery] Would send download link to ${email} for ${productName}: ${downloadUrl}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Download link sent to your email" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
