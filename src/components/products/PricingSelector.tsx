import { useState } from "react";
import { CONFIG, type Currency, type DiscountCode } from "@/config/appConfig";

interface PricingSelectorProps {
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  basePrice: { usd: number; inr: number };
  onFinalPrice: (price: number) => void;
}

export default function PricingSelector({ currency, onCurrencyChange, basePrice, onFinalPrice }: PricingSelectorProps) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  const rawPrice = currency === "inr" ? basePrice.inr : basePrice.usd;
  const finalPrice = Math.round(rawPrice * (1 - discount / 100));

  const applyCoupon = () => {
    const code = coupon.toUpperCase() as DiscountCode;
    const disc = CONFIG.discounts.codes[code];
    if (!disc) {
      setCouponMsg("Invalid coupon code");
      setDiscount(0);
      onFinalPrice(rawPrice);
      return;
    }
    if (disc.appliesTo !== "all" && disc.appliesTo !== currency) {
      setCouponMsg(`This code only works with ${disc.appliesTo.toUpperCase()}`);
      setDiscount(0);
      onFinalPrice(rawPrice);
      return;
    }
    setDiscount(disc.percent);
    setCouponMsg(`${disc.percent}% off applied!`);
    onFinalPrice(Math.round(rawPrice * (1 - disc.percent / 100)));
  };

  return (
    <div className="space-y-4">
      {/* Currency Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => { onCurrencyChange("usd"); setDiscount(0); setCouponMsg(""); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currency === "usd" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
        >
          $ USD
        </button>
        <button
          onClick={() => { onCurrencyChange("inr"); setDiscount(0); setCouponMsg(""); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currency === "inr" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
        >
          ₹ INR
        </button>
      </div>

      {/* Price Display */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-foreground">
          {currency === "inr" ? "₹" : "$"}{finalPrice.toLocaleString()}
        </span>
        {discount > 0 && (
          <span className="text-lg text-muted-foreground line-through">
            {currency === "inr" ? "₹" : "$"}{rawPrice.toLocaleString()}
          </span>
        )}
        <span className="text-sm text-muted-foreground">one-time</span>
      </div>

      {/* Coupon */}
      <div className="flex gap-2">
        <input
          type="text"
          value={coupon}
          onChange={e => setCoupon(e.target.value)}
          placeholder="Coupon code"
          className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm"
        />
        <button onClick={applyCoupon} className="px-4 py-2 rounded-lg bg-muted text-sm font-medium hover:bg-muted/80 transition-colors">
          Apply
        </button>
      </div>
      {couponMsg && (
        <p className={`text-xs ${discount > 0 ? "text-green-500" : "text-red-500"}`}>{couponMsg}</p>
      )}
    </div>
  );
}
