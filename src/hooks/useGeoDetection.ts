import { useState, useEffect, useCallback, useMemo } from "react";
import type { Currency } from "@/config/appConfig";

const FALLBACK_RATE = 84; // fallback USD→INR
const CACHE_KEY = "ak-exchange-rate";
const GEO_CACHE_KEY = "ak-geo";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

interface CachedRate {
  rate: number;
  timestamp: number;
}

function getCachedRate(): number | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const { rate, timestamp }: CachedRate = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) return null;
    return rate;
  } catch { return null; }
}

function setCachedRate(rate: number) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({ rate, timestamp: Date.now() }));
}

/** Psychological rounding for INR — rounds to nearest ₹99 ending */
function smartRoundINR(value: number): number {
  if (value < 500) return Math.ceil(value / 100) * 100 - 1; // e.g. 413 → 499
  if (value < 5000) return Math.ceil(value / 500) * 500 - 1; // e.g. 2413 → 2499
  if (value < 20000) return Math.ceil(value / 1000) * 1000 - 1; // e.g. 8230 → 8999
  return Math.ceil(value / 5000) * 5000 - 1; // e.g. 24500 → 24999
}

export function useGeoDetection() {
  const [currency, setCurrency] = useState<Currency>("usd");
  const [country, setCountry] = useState("US");
  const [loading, setLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(FALLBACK_RATE);
  const [isIndia, setIsIndia] = useState(false);

  // Fetch exchange rate
  useEffect(() => {
    const cached = getCachedRate();
    if (cached) {
      setExchangeRate(cached);
      return;
    }

    fetch("https://open.er-api.com/v6/latest/USD")
      .then(r => r.json())
      .then(data => {
        const rate = data?.rates?.INR;
        if (rate && typeof rate === "number") {
          setExchangeRate(rate);
          setCachedRate(rate);
        }
      })
      .catch(() => {
        // Use fallback rate silently
      });
  }, []);

  // Geo detection
  useEffect(() => {
    const cached = localStorage.getItem(GEO_CACHE_KEY);
    if (cached) {
      try {
        const { currency: c, country: co } = JSON.parse(cached);
        setCurrency(c);
        setCountry(co);
        setIsIndia(co === "IN");
        setLoading(false);
        return;
      } catch { /* parse error, re-fetch */ }
    }

    // Try browser locale as fast fallback
    const browserLocale = navigator.language || "";
    const probablyIndia = browserLocale.includes("IN") || browserLocale === "hi";

    fetch("https://ipapi.co/json/")
      .then(r => r.json())
      .then(data => {
        const co = data.country_code || "US";
        const c: Currency = co === "IN" ? "inr" : "usd";
        setCountry(co);
        setCurrency(c);
        setIsIndia(co === "IN");
        localStorage.setItem(GEO_CACHE_KEY, JSON.stringify({ currency: c, country: co }));
      })
      .catch(() => {
        // Fallback to browser locale
        if (probablyIndia) {
          setCurrency("inr");
          setCountry("IN");
          setIsIndia(true);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  /** Convert USD amount to current currency with smart rounding */
  const convertPrice = useCallback((usdAmount: number): number => {
    if (currency === "usd") return usdAmount;
    return smartRoundINR(usdAmount * exchangeRate);
  }, [currency, exchangeRate]);

  /** Format price with currency symbol */
  const formatPrice = useCallback((usdAmount: number): string => {
    if (currency === "usd") return `$${usdAmount}`;
    const inr = smartRoundINR(usdAmount * exchangeRate);
    return `₹${inr.toLocaleString("en-IN")}`;
  }, [currency, exchangeRate]);

  /** Format a range like "$700–$3,000" in current currency */
  const formatRange = useCallback((lowUsd: number, highUsd: number): string => {
    if (currency === "usd") return `$${lowUsd.toLocaleString()}–$${highUsd.toLocaleString()}`;
    const low = smartRoundINR(lowUsd * exchangeRate);
    const high = smartRoundINR(highUsd * exchangeRate);
    return `₹${low.toLocaleString("en-IN")}–₹${high.toLocaleString("en-IN")}`;
  }, [currency, exchangeRate]);

  const currencySymbol = currency === "inr" ? "₹" : "$";

  return {
    currency,
    setCurrency,
    country,
    loading,
    isIndia,
    exchangeRate,
    convertPrice,
    formatPrice,
    formatRange,
    currencySymbol,
  };
}

export type GeoDetection = ReturnType<typeof useGeoDetection>;
