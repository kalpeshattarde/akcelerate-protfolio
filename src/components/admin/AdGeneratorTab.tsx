import { useState } from "react";
import { generateAdCopy, type AdCopy } from "@/lib/adGenerator";
import { Sparkles, Copy, RefreshCw } from "lucide-react";

export default function AdGeneratorTab() {
  const [ads, setAds] = useState<AdCopy[]>(() => generateAdCopy(4));
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const regenerate = () => setAds(generateAdCopy(4));

  const copyAd = (idx: number) => {
    const ad = ads[idx];
    navigator.clipboard.writeText(`${ad.headline}\n\n${ad.body}\n\nCTA: ${ad.cta}`);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">AI Ad Copy Generator</h3>
        <button onClick={regenerate} className="btn-primary text-sm gap-1.5">
          <RefreshCw className="w-4 h-4" /> Regenerate
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {ads.map((ad, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground">{ad.platform}</span>
              <button onClick={() => copyAd(i)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <h4 className="font-semibold text-foreground text-sm">{ad.headline}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{ad.body}</p>
            <div className="inline-block px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">
              {ad.cta}
            </div>
            {copiedIdx === i && <p className="text-xs text-green-500">Copied!</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
