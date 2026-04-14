import { useMemo } from "react";
import { useGeoDetection } from "./useGeoDetection";

export function usePersonalization() {
  const { country, currency } = useGeoDetection();

  const headline = useMemo(() => {
    if (country === "IN") return "Premium AI Products — Built for India 🇮🇳";
    return "Premium AI-Powered Products & Templates";
  }, [country]);

  const subline = useMemo(() => {
    if (country === "IN") return "Production-ready SaaS products to accelerate your business";
    return "Production-ready SaaS products to accelerate your business";
  }, [country]);

  const ctaText = useMemo(() => {
    if (country === "IN") return "Explore in ₹ INR";
    return "Browse Products";
  }, [country]);

  return { headline, subline, ctaText, country, currency };
}
