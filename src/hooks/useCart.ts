import { useState, useCallback, useMemo } from "react";
import { PRODUCTS, type Product } from "@/data/products";
import type { Currency } from "@/config/appConfig";

export interface CartItem {
  product: Product;
  quantity: number;
}

// Bundle pricing constants
export const BUNDLE_THRESHOLD = 5;
export const BUNDLE_PRICE = { usd: 59, inr: 4999 };
export const STARTER_PRICE = { usd: 19, inr: 1499 };
export const ALL_ACCESS_PRICE = { usd: 119, inr: 9999 };

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

  // Pricing logic: 5+ items = Pro Bundle flat price, otherwise Starter per item
  const isBundle = useMemo(() => items.length >= BUNDLE_THRESHOLD, [items]);

  const getTotal = useCallback((currency: Currency) => {
    if (items.length >= BUNDLE_THRESHOLD) {
      return currency === "inr" ? BUNDLE_PRICE.inr : BUNDLE_PRICE.usd;
    }
    // Starter price per item
    const perItem = currency === "inr" ? STARTER_PRICE.inr : STARTER_PRICE.usd;
    return perItem * items.length;
  }, [items]);

  const getQuantity = useCallback((productId: string) => cartMap[productId] || 0, [cartMap]);

  return { items, totalCount, getTotal, getQuantity, addToCart, removeFromCart, updateQuantity, clearCart, open, setOpen, isInCart, isBundle };
}
