import { useEffect, useState } from "react";
import { Sparkles, Check, Zap } from "lucide-react";
import { BUNDLE_THRESHOLD, BUNDLE_PER_ITEM_PRICE } from "@/hooks/useCart";
import type { Currency } from "@/config/appConfig";

interface BundleProgressBarProps {
  itemCount: number;
  currency: Currency;
  onOpenCart: () => void;
  onQuickFill?: () => void;
}

export default function BundleProgressBar({ itemCount, currency, onOpenCart, onQuickFill }: BundleProgressBarProps) {
  const [celebrate, setCelebrate] = useState(false);

  // Celebrate animation when crossing the threshold
  useEffect(() => {
    if (itemCount === BUNDLE_THRESHOLD) {
      setCelebrate(true);
      const t = setTimeout(() => setCelebrate(false), 2000);
      return () => clearTimeout(t);
    }
  }, [itemCount]);

  const symbol = currency === "inr" ? "₹" : "$";
  const perItem = currency === "inr" ? BUNDLE_PER_ITEM_PRICE.inr : BUNDLE_PER_ITEM_PRICE.usd;
  const unlocked = itemCount >= BUNDLE_THRESHOLD;
  const progress = Math.min((itemCount / BUNDLE_THRESHOLD) * 100, 100);
  const remaining = Math.max(BUNDLE_THRESHOLD - itemCount, 0);

  // Hide entirely once threshold is comfortably exceeded — keeps UI clean
  if (itemCount > BUNDLE_THRESHOLD + 1) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[min(92vw,560px)] rounded-2xl border shadow-2xl transition-all duration-300 ${
        unlocked
          ? "bg-gradient-to-r from-amber-500 to-orange-500 border-amber-400 text-white"
          : "bg-card border-border text-foreground"
      } ${celebrate ? "animate-pulse scale-105" : ""}`}
    >
      <div className="px-4 py-3 flex items-center gap-3">
        <button onClick={onOpenCart} className="flex-1 flex items-center gap-3 text-left min-w-0">
          <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${unlocked ? "bg-white/20" : "bg-primary/10"}`}>
            {unlocked ? <Check className="w-5 h-5" /> : <Sparkles className="w-5 h-5 text-primary" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-sm font-semibold truncate">
                {unlocked
                  ? `🎉 Pro Bundle unlocked — ${symbol}${perItem.toLocaleString()} per product`
                  : itemCount === 0
                    ? `Unlock Pro Bundle — ${symbol}${perItem.toLocaleString()} per product`
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
        {!unlocked && onQuickFill && (
          <button
            onClick={onQuickFill}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
            aria-label="Add 5 top-selling prototypes to cart to unlock Pro Bundle"
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add top 5</span>
            <span className="sm:hidden">+5</span>
          </button>
        )}
      </div>
    </div>
  );
}
