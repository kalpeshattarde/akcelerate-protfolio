import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(120).optional().nullable(),
  industry: z.string().trim().min(1).max(60),
  workflows: z.string().trim().min(10).max(2000),
  timeline: z.string().trim().min(1).max(40),
  budget: z.string().trim().min(1).max(40),
  product_name: z.string().trim().max(200).optional().nullable(),
  product_id: z.string().trim().max(60).optional().nullable(),
  attachment_url: z.string().trim().url().max(1000).optional().nullable(),
  attachment_name: z.string().trim().max(255).optional().nullable(),
  attachment_size: z.number().int().nonnegative().max(20 * 1024 * 1024).optional().nullable(),
  attachment_type: z.string().trim().max(120).optional().nullable(),
  source: z.string().trim().max(60).optional(),
  // Honeypot
  website: z.string().optional(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const raw = await req.json();
    const parsed = BodySchema.safeParse(raw);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Honeypot — silently accept and discard
    if ((parsed.data.website ?? "").trim() !== "") {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const { website: _hp, ...row } = parsed.data;

    const { data, error } = await supabase
      .from("customization_briefs")
      .insert({
        ...row,
        source: row.source ?? "customization_brief",
        user_agent: req.headers.get("user-agent") ?? null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Insert failed", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, id: data?.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("submit-brief error", err);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
