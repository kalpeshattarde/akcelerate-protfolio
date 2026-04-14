import { useState, useCallback } from "react";
import { PRODUCTS, type Product } from "@/data/products";

function getPurchased(): string[] {
  try {
    return JSON.parse(localStorage.getItem("ak-purchased") || "[]");
  } catch { return []; }
}

export function useProducts() {
  const [purchased, setPurchased] = useState<string[]>(getPurchased);

  const isPurchased = useCallback((id: string) => purchased.includes(id), [purchased]);

  const purchase = useCallback((id: string) => {
    const next = [...new Set([...purchased, id])];
    setPurchased(next);
    localStorage.setItem("ak-purchased", JSON.stringify(next));

    // Track sale
    const sales = JSON.parse(localStorage.getItem("ak-sales") || "[]");
    const product = PRODUCTS.find(p => p.id === id);
    sales.push({ id, name: product?.name, date: new Date().toISOString(), amount: product?.price });
    localStorage.setItem("ak-sales", JSON.stringify(sales));
  }, [purchased]);

  const topSelling = PRODUCTS.filter(p => p.topSelling).sort((a, b) => b.salesCount - a.salesCount);
  const mobileApps = PRODUCTS.filter(p => p.category === "mobile-app");
  const webSaas = PRODUCTS.filter(p => p.category === "web-saas");

  return { products: PRODUCTS, topSelling, mobileApps, webSaas, isPurchased, purchase };
}
