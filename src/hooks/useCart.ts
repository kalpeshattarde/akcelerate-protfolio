import { useState, useCallback, useMemo } from "react";
import { PRODUCTS, type Product } from "@/data/products";
import type { Currency } from "@/config/appConfig";

export interface CartItem {
  product: Product;
  quantity: number;
}

// Bundle pricing constants
// Pro Bundle: 5+ products → flat per-product rate
export const BUNDLE_THRESHOLD = 5;
export const BUNDLE_PER_ITEM_PRICE = { usd: 12, inr: 999 };
export const STARTER_PRICE = { usd: 19, inr: 1499 };
export const ALL_ACCESS_PRICE = { usd: 119, inr: 9999 };

// Back-compat alias — now represents the per-item rate, not a flat total.
export const BUNDLE_PRICE = BUNDLE_PER_ITEM_PRICE;

function loadCart(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem("ak-cart") || "{}");
  } catch {
    return {};
  }
}

function saveCart(cart: Record<string, number>) {
  localStorage.setItem("ak-cart", JSON.stringify(cart));
}

export function useCart() {
  const [cartMap, setCartMap] = useState<Record<string, number>>(loadCart);
  const [open, setOpen] = useState(false);

  // Add to cart — max 1 per product, no duplicates
  const addToCart = useCallback((productId: string, openDrawer = true) => {
    setCartMap(prev => {
      if (prev[productId]) return prev; // already in cart, don't add again
      const next = { ...prev, [productId]: 1 };
      saveCart(next);
      return next;
    });
    if (openDrawer) setOpen(true);
  }, []);

  const isInCart = useCallback((productId: string) => !!cartMap[productId], [cartMap]);

  const removeFromCart = useCallback((productId: string) => {
    setCartMap(prev => {
      const next = { ...prev };
      delete next[productId];
      saveCart(next);
      return next;
    });
  }, []);

  // Quantity is always 1 per product — this just removes if <= 0
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    // Cap at 1
    setCartMap(prev => {
      const next = { ...prev, [productId]: 1 };
      saveCart(next);
      return next;
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartMap({});
    saveCart({});
  }, []);

  const items: CartItem[] = useMemo(() => {
    return Object.entries(cartMap)
      .map(([id, qty]) => {
        const product = PRODUCTS.find(p => p.id === id);
        return product ? { product, quantity: qty } : null;
      })
      .filter(Boolean) as CartItem[];
  }, [cartMap]);

  const totalCount = useMemo(() => items.length, [items]);

  // Pricing: all products = All Access, 5+ = Pro Bundle, otherwise Starter per item
  const isAllAccess = useMemo(() => {
    const totalProducts = PRODUCTS.length;
    return items.length >= totalProducts * 0.8; // 80%+ of catalog = all access
  }, [items]);

  const isBundle = useMemo(() => items.length >= BUNDLE_THRESHOLD && !isAllAccess, [items, isAllAccess]);

  const getTotal = useCallback((currency: Currency) => {
    if (isAllAccess) {
      return currency === "inr" ? ALL_ACCESS_PRICE.inr : ALL_ACCESS_PRICE.usd;
    }
    if (items.length >= BUNDLE_THRESHOLD) {
      return currency === "inr" ? BUNDLE_PRICE.inr : BUNDLE_PRICE.usd;
    }
    const perItem = currency === "inr" ? STARTER_PRICE.inr : STARTER_PRICE.usd;
    return perItem * items.length;
  }, [items, isAllAccess]);

  const getQuantity = useCallback((productId: string) => cartMap[productId] || 0, [cartMap]);

  return { items, totalCount, getTotal, getQuantity, addToCart, removeFromCart, updateQuantity, clearCart, open, setOpen, isInCart, isBundle, isAllAccess };
}
