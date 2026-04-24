import { useState, useCallback, useEffect, useMemo } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";
import { PRODUCTS, type Product } from "@/data/products";
import { BUNDLE_THRESHOLD } from "@/hooks/useCart";
import { applyProductOverrides } from "@/lib/productOverrides";
import {
  readTopSellingCache,
  writeTopSellingCache,
  readTopSellingRank,
} from "@/lib/topSellingCache";

function getLocalPurchased(): string[] {
  try {
    return JSON.parse(localStorage.getItem("ak-purchased") || "[]");
  } catch { return []; }
}

function isAllAccess(): boolean {
  try {
    return localStorage.getItem("ak-all-access") === "true";
  } catch { return false; }
}

export function useProducts() {
  const { user, isSignedIn } = useUser();
  const [purchased, setPurchased] = useState<string[]>(getLocalPurchased);
  const [allAccess, setAllAccess] = useState(isAllAccess);
  const [overridesTick, setOverridesTick] = useState(0);

  // Listen for admin override updates so /products refreshes live
  useEffect(() => {
    const refresh = () => setOverridesTick(t => t + 1);
    window.addEventListener("ak-products-updated", refresh);
    window.addEventListener("ak-top-selling-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("ak-products-updated", refresh);
      window.removeEventListener("ak-top-selling-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

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

        // If they purchased 5+ products, grant all access
        if (merged.length >= BUNDLE_THRESHOLD) {
          setAllAccess(true);
          localStorage.setItem("ak-all-access", "true");
        }
      }
    };

    fetchPurchases();
  }, [isSignedIn, user?.id]);

  // If all access, every product is "purchased"
  const isPurchased = useCallback((id: string) => {
    if (allAccess) return true;
    return purchased.includes(id);
  }, [purchased, allAccess]);

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

  // Grant all access (called when bundle of 5+ is purchased)
  const grantAllAccess = useCallback(() => {
    setAllAccess(true);
    localStorage.setItem("ak-all-access", "true");
    // Mark all products as purchased
    const allIds = PRODUCTS.map(p => p.id);
    const merged = [...new Set([...purchased, ...allIds])];
    setPurchased(merged);
    localStorage.setItem("ak-purchased", JSON.stringify(merged));
  }, [purchased]);

  // Apply admin overrides (price, category, topSelling) to the seed catalog.
  // overridesTick ensures recompute when admin pushes a bulk edit or CSV import.
  const products = applyProductOverrides(PRODUCTS);
  void overridesTick;

  // Compute the top 3 sellers from the catalog. Strategy:
  //   1. If admin has set an explicit rank order, use that (filtered to existing products).
  //   2. Otherwise sort by salesCount desc among `topSelling` products.
  //   3. Cache the resulting IDs (5 min TTL) so navigation between pages hydrates
  //      instantly with no flicker.
  const topSelling = useMemo<Product[]>(() => {
    const manualRank = readTopSellingRank();
    let computed: Product[] = [];

    if (manualRank.length > 0) {
      computed = manualRank
        .map(id => products.find(p => p.id === id))
        .filter((p): p is Product => Boolean(p))
        .slice(0, 3);
    }

    if (computed.length < 3) {
      const fillers = products
        .filter(p => p.topSelling && !computed.find(c => c.id === p.id))
        .sort((a, b) => b.salesCount - a.salesCount);
      while (computed.length < 3 && fillers.length > 0) {
        computed.push(fillers.shift()!);
      }
    }

    if (computed.length > 0) {
      writeTopSellingCache(computed.map(p => p.id));
      return computed;
    }

    // Last-resort fallback: cached IDs from a previous render
    const cachedIds = readTopSellingCache();
    if (cachedIds && cachedIds.length > 0) {
      return cachedIds
        .map(id => products.find(p => p.id === id))
        .filter((p): p is Product => Boolean(p))
        .slice(0, 3);
    }
    return computed;
  }, [products]);

  // Loading flag — true only when we have neither computed products nor a cache hit
  const topSellingLoading = topSelling.length === 0 && readTopSellingCache() === null;

  const mobileApps = products.filter(p => p.category === "mobile-app");
  const webSaas = products.filter(p => p.category === "web-saas");

  return {
    products,
    topSelling,
    topSellingLoading,
    mobileApps,
    webSaas,
    isPurchased,
    purchase,
    purchased,
    allAccess,
    grantAllAccess,
  };
}
