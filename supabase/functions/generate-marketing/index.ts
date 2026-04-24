// Edge function for AI marketing generators (offer, landing page, ad).
// Uses Lovable AI Gateway with structured tool-calling.
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

interface RequestBody {
  type: "offer" | "landing" | "ad";
  prompt: string;
  product?: string;
  audience?: string;
}

const TOOLS: Record<string, any> = {
  offer: {
    type: "function",
    function: {
      name: "generate_offer",
      description: "Return a marketing offer.",
      parameters: {
        type: "object",
        properties: {
          headline: { type: "string" },
          discount: { type: "string", description: "e.g. 30% off, $50 off" },
          urgency: { type: "string", description: "e.g. Ends Sunday" },
          body: { type: "string" },
          cta: { type: "string" },
        },
        required: ["headline", "discount", "urgency", "body", "cta"],
        additionalProperties: false,
      },
    },
  },
  landing: {
    type: "function",
    function: {
      name: "generate_landing",
      description: "Return landing page hero copy plus 3 feature blocks.",
      parameters: {
        type: "object",
        properties: {
          hero_headline: { type: "string" },
          hero_subheadline: { type: "string" },
          features: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                description: { type: "string" },
              },
              required: ["title", "description"],
              additionalProperties: false,
            },
            minItems: 3,
            maxItems: 3,
          },
          cta: { type: "string" },
        },
        required: ["hero_headline", "hero_subheadline", "features", "cta"],
        additionalProperties: false,
      },
    },
  },
  ad: {
    type: "function",
    function: {
      name: "generate_ad",
      description: "Return an ad copy variant.",
      parameters: {
        type: "object",
        properties: {
          headline: { type: "string" },
          body: { type: "string" },
          cta: { type: "string" },
          platform: { type: "string", enum: ["Google Ads", "Meta Ads", "LinkedIn Ads", "Twitter Ads"] },
        },
        required: ["headline", "body", "cta", "platform"],
        additionalProperties: false,
      },
    },
  },
};

const SYSTEM_PROMPTS: Record<string, string> = {
  offer: "You are a senior direct-response copywriter. Generate punchy, conversion-focused offers.",
  landing: "You are a senior conversion copywriter. Generate clear, benefit-led landing page copy.",
  ad: "You are a paid-ads creative specialist. Generate scroll-stopping ad copy.",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = (await req.json()) as RequestBody;
    if (!body?.type || !body?.prompt) {
      return new Response(JSON.stringify({ error: "type and prompt required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const tool = TOOLS[body.type];
    if (!tool) {
      return new Response(JSON.stringify({ error: "invalid type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const userPrompt = [
      body.product ? `Product: ${body.product}` : "",
      body.audience ? `Audience: ${body.audience}` : "",
      `Brief: ${body.prompt}`,
    ].filter(Boolean).join("\n");

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPTS[body.type] },
          { role: "user", content: userPrompt },
        ],
        tools: [tool],
        tool_choice: { type: "function", function: { name: tool.function.name } },
      }),
    });

    if (aiRes.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again shortly." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (aiRes.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted. Add credits in Lovable Cloud." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!aiRes.ok) {
      const t = await aiRes.text();
      console.error("AI gateway error", aiRes.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiRes.json();
    const call = data?.choices?.[0]?.message?.tool_calls?.[0];
    const args = call?.function?.arguments ? JSON.parse(call.function.arguments) : null;
    if (!args) {
      return new Response(JSON.stringify({ error: "No structured output returned" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ result: args }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-marketing error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
