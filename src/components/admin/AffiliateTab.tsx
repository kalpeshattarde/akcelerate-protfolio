import { useAffiliate } from "@/hooks/useAffiliate";
import { Copy, Link as LinkIcon, MousePointer, ShoppingCart, DollarSign } from "lucide-react";
import { useState } from "react";

export default function AffiliateTab() {
  const { code, clicks, conversions, earnings, referralLink } = useAffiliate();
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2"><MousePointer className="w-4 h-4" /> Clicks</div>
          <div className="text-2xl font-bold text-foreground">{clicks}</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2"><ShoppingCart className="w-4 h-4" /> Conversions</div>
          <div className="text-2xl font-bold text-foreground">{conversions}</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2"><DollarSign className="w-4 h-4" /> Earnings</div>
          <div className="text-2xl font-bold text-foreground">${earnings.toLocaleString()}</div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3">Your Referral Link</h3>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-sm text-muted-foreground overflow-hidden">
            <LinkIcon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{referralLink}</span>
          </div>
          <button onClick={copyLink} className="btn-primary text-sm gap-1.5">
            <Copy className="w-4 h-4" /> {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Affiliate code: <span className="font-mono text-foreground">{code}</span> — 20% commission per sale</p>
      </div>
    </div>
  );
}
