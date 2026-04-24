import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Copy, Wand2, Loader2 } from "lucide-react";

interface Offer {
  headline: string;
  discount: string;
  urgency: string;
  body: string;
  cta: string;
}

export default function OfferGeneratorTab() {
  const [prompt, setPrompt] = useState("Black Friday promo for our SaaS template marketplace");
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("indie founders");
  const [loading, setLoading] = useState(false);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    setLoading(true); setError(null); setOffer(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("generate-marketing", {
        body: { type: "offer", prompt, product, audience },
      });
      if (fnErr) throw fnErr;
      if (data?.error) throw new Error(data.error);
      setOffer(data.result as Offer);
    } catch (e: any) {
      setError(e?.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    if (!offer) return;
    navigator.clipboard.writeText(`${offer.headline}\n\n${offer.body}\n\n${offer.discount} — ${offer.urgency}\n\n${offer.cta}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-foreground">AI Offer Generator</h3>

      <div className="grid sm:grid-cols-3 gap-3">
        <input value={product} onChange={e => setProduct(e.target.value)} placeholder="Product (optional)" className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
        <input value={audience} onChange={e => setAudience(e.target.value)} placeholder="Audience" className="px-3 py-2 rounded-lg border border-border bg-background text-sm" />
        <button onClick={generate} disabled={loading} className="btn-primary text-sm gap-1.5 justify-center disabled:opacity-50">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
          {loading ? "Generating…" : "Generate"}
        </button>
      </div>
      <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={3} placeholder="Brief / campaign context" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />

      {error && <p className="text-sm text-red-500">{error}</p>}

      {offer && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary">OFFER</span>
            <button onClick={copy} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><Copy className="w-3.5 h-3.5" /></button>
          </div>
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <h4 className="font-semibold text-foreground">{offer.headline}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{offer.body}</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-600">{offer.discount}</span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-muted text-muted-foreground">{offer.urgency}</span>
          </div>
          <div className="inline-block px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">{offer.cta}</div>
          {copied && <p className="text-xs text-green-500">Copied!</p>}
        </div>
      )}
    </div>
  );
}
