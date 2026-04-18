// sync-purchase — STUB.
// Persists a completed purchase from the client into public.orders + public.purchases
// and increments public.app_users counters. Requires schema to exist.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PurchaseBody {
  orderId: string;
  email: string;
  name?: string;
  items: { id: string; name: string; quantity: number }[];
  subtotal: number;
  total: number;
  currency: "usd" | "inr";
  paymentMethod: string;
  discount?: { code: string; percent: number } | null;
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
    const body = (await req.json()) as PurchaseBody;
    if (!body?.orderId || !body?.email || !Array.isArray(body?.items) || body.items.length === 0) {
      return new Response(JSON.stringify({ ok: false, error: "Missing required fields: orderId, email, items[]" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // TODO once schema exists:
    //   const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
    //   await supabase.from("orders").upsert({...});
    //   await supabase.from("purchases").upsert(items.map(i => ({...})));
    //   await supabase.from("app_users").upsert({...});

    return new Response(JSON.stringify({ ok: true, stub: true, orderId: body.orderId, persisted: 0 }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
