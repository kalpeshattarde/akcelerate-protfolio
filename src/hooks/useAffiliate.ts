import { useState, useEffect } from "react";
import { CONFIG } from "@/config/appConfig";

interface AffiliateData {
  code: string;
  clicks: number;
  conversions: number;
  earnings: number;
}

export function useAffiliate() {
  const [data, setData] = useState<AffiliateData>(() => {
    try {
      return JSON.parse(localStorage.getItem("ak-affiliate") || "null") || {
        code: "AFF" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        clicks: 147,
        conversions: 23,
        earnings: 1340,
      };
    } catch {
      return { code: "AFF001", clicks: 147, conversions: 23, earnings: 1340 };
    }
  });

  useEffect(() => {
    localStorage.setItem("ak-affiliate", JSON.stringify(data));
  }, [data]);

  const trackClick = () => setData(d => ({ ...d, clicks: d.clicks + 1 }));
  const trackConversion = (amount: number) =>
    setData(d => ({
      ...d,
      conversions: d.conversions + 1,
      earnings: d.earnings + amount * (CONFIG.affiliate.commissionPercent / 100),
    }));

  const referralLink = `${window.location.origin}/products?ref=${data.code}`;

  return { ...data, referralLink, trackClick, trackConversion };
}
