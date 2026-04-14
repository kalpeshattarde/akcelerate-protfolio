import type { Currency } from "@/config/appConfig";

interface CurrencyToggleProps {
  currency: Currency;
  onToggle: (c: Currency) => void;
  isIndia?: boolean;
}

export default function CurrencyToggle({ currency, onToggle, isIndia }: CurrencyToggleProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="inline-flex items-center rounded-full border border-border bg-card p-1">
        <button
          onClick={() => onToggle("usd")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            currency === "usd"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          $ USD
        </button>
        <button
          onClick={() => onToggle("inr")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            currency === "inr"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          ₹ INR
        </button>
      </div>
      {isIndia && currency === "inr" && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>🇮🇳</span>
          <span>Localized pricing for your region</span>
        </div>
      )}
      {currency === "inr" && (
        <span className="text-[10px] text-muted-foreground/70">Based on current exchange rate</span>
      )}
    </div>
  );
}
