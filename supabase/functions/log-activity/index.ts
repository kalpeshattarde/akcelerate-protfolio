// log-activity — STUB.
// Appends an event to public.activity_events for the admin Activity Feed.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const VALID_TYPES = ["purchase", "signup", "content", "email", "product", "order_status"] as const;
type ActivityType = (typeof VALID_TYPES)[number];

interface Body {
  type: ActivityType;
  message: string;
  icon?: string;
  metadata?: Record<string, unknown>;
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
    if (!body?.type || !body?.message || !VALID_TYPES.includes(body.type)) {
      return new Response(
        JSON.stringify({ ok: false, error: `Invalid body. type must be one of ${VALID_TYPES.join(", ")} and message is required.` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // TODO once schema exists:
    //   await supabase.from("activity_events").insert({ type, message, icon, metadata });

    return new Response(
      JSON.stringify({ ok: true, stub: true, event: { ...body, id: crypto.randomUUID(), createdAt: new Date().toISOString() } }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
