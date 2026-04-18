// send-email — STUB.
// Generic transactional email sender. Routes by `template` field:
//   - "welcome"       → welcome-on-signup
//   - "purchase"      → purchase receipt (delegate to send-purchase-email)
//   - "download"      → product download links (delegate to send-download-email)
//   - "password-reset"→ reset link
// Requires RESEND_API_KEY (or SENDER_DOMAIN) once wired up.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TEMPLATES = ["welcome", "purchase", "download", "password-reset"] as const;
type Template = (typeof TEMPLATES)[number];

interface Body {
  template: Template;
  to: string;
  data?: Record<string, unknown>;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = (await req.json()) as Body;
    if (!body?.template || !body?.to || !TEMPLATES.includes(body.template)) {
      return new Response(
        JSON.stringify({ ok: false, error: `Invalid body. template must be one of ${TEMPLATES.join(", ")} and to is required.` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      // Stub mode — just acknowledge.
      return new Response(
        JSON.stringify({ ok: true, stub: true, sent: false, reason: "RESEND_API_KEY not configured", template: body.template, to: body.to }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // TODO: render template HTML based on body.template + body.data, then POST to Resend.
    return new Response(
      JSON.stringify({ ok: true, stub: true, sent: false, message: "Template rendering not yet implemented." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
