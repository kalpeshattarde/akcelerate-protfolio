// admin-stats — STUB.
// Aggregates users, orders, revenue from public.orders / public.app_users.
// Requires tables to be created first (see plan). Returns mock zeros until then.
//
// TODO when tables exist:
//   const { data: orders } = await supabase.from("orders").select("*");
//   const { data: users }  = await supabase.from("app_users").select("*");
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // Stub response — replace with Supabase queries once schema lands.
    const stats = {
      ok: true,
      stub: true,
      generatedAt: new Date().toISOString(),
      totals: { users: 0, orders: 0, revenueUsd: 0, revenueInr: 0, avgOrderUsd: 0 },
      byStatus: { completed: 0, pending: 0, refunded: 0 },
      topProducts: [] as { id: string; name: string; sales: number }[],
      message: "admin-stats is a stub. Create orders + app_users tables, then wire the queries below.",
    };
    return new Response(JSON.stringify(stats), {
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
