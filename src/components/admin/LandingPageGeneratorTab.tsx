import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Copy, Wand2, Loader2 } from "lucide-react";

interface Landing {
  hero_headline: string;
  hero_subheadline: string;
  features: { title: string; description: string }[];
  cta: string;
}

export default function LandingPageGeneratorTab() {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("startup founders");
  const [prompt, setPrompt] = useState("Landing page for a SaaS template marketplace selling production-ready AI apps");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<Landing | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    setLoading(true); setError(null); setPage(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("generate-marketing", {
        body: { type: "landing", prompt, product, audience },
      });
      if (fnErr) throw fnErr;
      if (data?.error) throw new Error(data.error);
      setPage(data.result as Landing);
    } catch (e: any) {
      setError(e?.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    if (!page) return;
    const text = `${page.hero_headline}\n${page.hero_subheadline}\n\n${page.features.map(f => `${f.title}\n${f.description}`).join("\n\n")}\n\nCTA: ${page.cta}`;
    navigator.clipboard.writeText(text);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-foreground">AI Landing Page Generator</h3>

      <div className="grid sm:grid-cols-3 gap-3">
        <input value={product} onChange={e => setProduct(e.target.value)} placeholder="Product (optional)" className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
        <input value={audience} onChange={e => setAudience(e.target.value)} placeholder="Audience" className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
        <button onClick={generate} disabled={loading} className="btn-primary text-sm gap-1.5 justify-center disabled:opacity-50">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
          {loading ? "Generating…" : "Generate"}
        </button>
      </div>
      <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={3} placeholder="Brief / what's the page for" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />

      {error && <p className="text-sm text-red-500">{error}</p>}

      {page && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary">LANDING PAGE</span>
            <button onClick={copy} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><Copy className="w-3.5 h-3.5" /></button>
          </div>
          <div>
            <div className="flex items-start gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
              <h2 className="font-poppins font-bold text-2xl text-foreground">{page.hero_headline}</h2>
            </div>
            <p className="text-muted-foreground">{page.hero_subheadline}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {page.features.map((f, i) => (
              <div key={i} className="rounded-lg border border-border p-4 bg-background">
                <h4 className="font-semibold text-sm text-foreground mb-1">{f.title}</h4>
                <p className="text-xs text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
          <div className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">{page.cta}</div>
          {copied && <p className="text-xs text-green-500">Copied!</p>}
        </div>
      )}
    </div>
  );
}
