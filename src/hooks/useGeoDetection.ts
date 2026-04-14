import { useState, useEffect } from "react";
import type { Currency } from "@/config/appConfig";

export function useGeoDetection() {
  const [currency, setCurrency] = useState<Currency>("usd");
  const [country, setCountry] = useState("US");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem("ak-geo");
    if (cached) {
      const { currency: c, country: co } = JSON.parse(cached);
      setCurrency(c);
      setCountry(co);
      setLoading(false);
      return;
    }

    fetch("https://ipapi.co/json/")
      .then(r => r.json())
      .then(data => {
        const co = data.country_code || "US";
        const c: Currency = co === "IN" ? "inr" : "usd";
        setCountry(co);
        setCurrency(c);
        localStorage.setItem("ak-geo", JSON.stringify({ currency: c, country: co }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { currency, setCurrency, country, loading };
}
