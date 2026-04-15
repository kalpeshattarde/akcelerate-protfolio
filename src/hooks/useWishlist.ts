import { useState, useCallback } from "react";
import { toast } from "sonner";
import { PRODUCTS } from "@/data/products";

function load(): string[] {
  try { return JSON.parse(localStorage.getItem("ak-wishlist") || "[]"); }
  catch { return []; }
}

function save(ids: string[]) {
  localStorage.setItem("ak-wishlist", JSON.stringify(ids));
}

export function useWishlist() {
  const [ids, setIds] = useState<string[]>(load);

  const toggle = useCallback((productId: string) => {
    setIds(prev => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      save(next);
      if (!exists) {
        const name = PRODUCTS.find(p => p.id === productId)?.name || "Product";
        toast.success(`${name} added to wishlist`);
      }
      return next;
    });
  }, []);

  const isWishlisted = useCallback((id: string) => ids.includes(id), [ids]);

  const wishlistItems = PRODUCTS.filter(p => ids.includes(p.id));

  return { ids, toggle, isWishlisted, wishlistItems, count: ids.length };
}
