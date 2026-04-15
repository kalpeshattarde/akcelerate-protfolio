import { useState, useCallback } from "react";
import { CONFIG, type Currency } from "@/config/appConfig";

export interface DiscountResult {
  valid: boolean;
  percent: number;
  code: string;
  message: string;
}

export function useDiscountCode(currency: Currency) {
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountResult | null>(null);

  const applyCode = useCallback((code: string): DiscountResult => {
    const upper = code.trim().toUpperCase();
    const discountEntry = CONFIG.discounts.codes[upper as keyof typeof CONFIG.discounts.codes];

    if (!discountEntry) {
      const result: DiscountResult = { valid: false, percent: 0, code: upper, message: "Invalid discount code" };
      setAppliedDiscount(null);
      return result;
    }

    if (discountEntry.appliesTo !== "all" && discountEntry.appliesTo !== currency) {
      const result: DiscountResult = {
        valid: false,
        percent: 0,
        code: upper,
        message: `This code only applies to ${discountEntry.appliesTo === "inr" ? "INR" : "USD"} purchases`,
      };
      setAppliedDiscount(null);
      return result;
    }

    const result: DiscountResult = {
      valid: true,
      percent: discountEntry.percent,
      code: upper,
      message: `${discountEntry.percent}% discount applied!`,
    };
    setAppliedDiscount(result);
    return result;
  }, [currency]);

  const removeDiscount = useCallback(() => {
    setAppliedDiscount(null);
  }, []);

  const calculateDiscountedTotal = useCallback((total: number): number => {
    if (!appliedDiscount?.valid) return total;
    return Math.round(total * (1 - appliedDiscount.percent / 100));
  }, [appliedDiscount]);

  return { appliedDiscount, applyCode, removeDiscount, calculateDiscountedTotal };
}
