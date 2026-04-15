import { useState, useCallback, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";
import { PRODUCTS } from "@/data/products";

function getLocalPurchased(): string[] {
  try {
    return JSON.parse(localStorage.getItem("ak-purchased") || "[]");
  } catch { return []; }
}

export function useProducts() {
  const { user, isSignedIn } = useUser();
  const [purchased, setPurchased] = useState<string[]>(getLocalPurchased);

  // Sync from Supabase when user signs in
  useEffect(() => {
    if (!isSignedIn || !user?.id) return;

    const fetchPurchases = async () => {
      const { data } = await (supabase as any)
        .from("purchases")
        .select("product_id")
        .eq("clerk_user_id", user.id);

      if (data && data.length > 0) {
        const ids = (data as any[]).map(r => r.product_id as string);
        const merged = [...new Set([...getLocalPurchased(), ...ids])];
        setPurchased(merged);
        localStorage.setItem("ak-purchased", JSON.stringify(merged));
      }
    };

    fetchPurchases();
  }, [isSignedIn, user?.id]);

  const isPurchased = useCallback((id: string) => purchased.includes(id), [purchased]);

  const purchase = useCallback(async (id: string) => {
    const next = [...new Set([...purchased, id])];
    setPurchased(next);
    localStorage.setItem("ak-purchased", JSON.stringify(next));

    // Track sale locally
    const sales = JSON.parse(localStorage.getItem("ak-sales") || "[]");
    const product = PRODUCTS.find(p => p.id === id);
    sales.push({ id, name: product?.name, date: new Date().toISOString(), amount: product?.price });
    localStorage.setItem("ak-sales", JSON.stringify(sales));

    // Persist to Supabase if signed in
    if (isSignedIn && user?.id) {
      await (supabase as any).from("purchases").upsert(
        { clerk_user_id: user.id, product_id: id },
        { onConflict: "clerk_user_id,product_id" }
      );
    }
  }, [purchased, isSignedIn, user?.id]);

  const topSelling = PRODUCTS.filter(p => p.topSelling).sort((a, b) => b.salesCount - a.salesCount);
  const mobileApps = PRODUCTS.filter(p => p.category === "mobile-app");
  const webSaas = PRODUCTS.filter(p => p.category === "web-saas");

  return { products: PRODUCTS, topSelling, mobileApps, webSaas, isPurchased, purchase };
}
