import { useEffect, useState } from "react";
import { Sparkles, Check } from "lucide-react";
import { BUNDLE_THRESHOLD, BUNDLE_PER_ITEM_PRICE } from "@/hooks/useCart";
import type { Currency } from "@/config/appConfig";

interface BundleProgressBarProps {
  itemCount: number;
  currency: Currency;
  onOpenCart: () => void;
}

export default function BundleProgressBar({ itemCount, currency, onOpenCart }: BundleProgressBarProps) {
  const [visible, setVisible] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    setVisible(itemCount > 0);
  }, [itemCount]);

  // Celebrate animation when crossing the threshold
  useEffect(() => {
    if (itemCount === BUNDLE_THRESHOLD) {
      setCelebrate(true);
      const t = setTimeout(() => setCelebrate(false), 2000);
      return () => clearTimeout(t);
    }
  }, [itemCount]);

  if (!visible) return null;

  const symbol = currency === "inr" ? "₹" : "$";
  const perItem = currency === "inr" ? BUNDLE_PER_ITEM_PRICE.inr : BUNDLE_PER_ITEM_PRICE.usd;
  const unlocked = itemCount >= BUNDLE_THRESHOLD;
  const progress = Math.min((itemCount / BUNDLE_THRESHOLD) * 100, 100);
  const remaining = Math.max(BUNDLE_THRESHOLD - itemCount, 0);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[min(92vw,520px)] rounded-2xl border shadow-2xl transition-all duration-300 ${
        unlocked
          ? "bg-gradient-to-r from-amber-500 to-orange-500 border-amber-400 text-white"
          : "bg-card border-border text-foreground"
      } ${celebrate ? "animate-pulse scale-105" : ""}`}
    >
      <button
        onClick={onOpenCart}
        className="w-full px-4 py-3 text-left flex items-center gap-3"
      >
        <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${unlocked ? "bg-white/20" : "bg-primary/10"}`}>
          {unlocked ? <Check className="w-5 h-5" /> : <Sparkles className="w-5 h-5 text-primary" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-sm font-semibold truncate">
              {unlocked
                ? `🎉 Pro Bundle unlocked — ${symbol}${perItem.toLocaleString()} per product`
                : `${itemCount} of ${BUNDLE_THRESHOLD} added — unlock Pro Bundle`}
            </span>
            <span className={`text-xs font-bold flex-shrink-0 ${unlocked ? "text-white" : "text-primary"}`}>
              {unlocked ? "ACTIVE" : `+${remaining}`}
            </span>
          </div>
          <div className={`h-2 rounded-full overflow-hidden ${unlocked ? "bg-white/25" : "bg-muted"}`}>
            <div
              className={`h-full rounded-full transition-all duration-500 ${unlocked ? "bg-white" : "bg-gradient-to-r from-primary to-primary/70"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </button>
    </div>
  );
}
