import { useState, useCallback, useMemo } from "react";
import { PRODUCTS, type Product } from "@/data/products";
import type { Currency } from "@/config/appConfig";

export interface CartItem {
  product: Product;
  quantity: number;
}

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

  const addToCart = useCallback((productId: string, openDrawer = true) => {
    setCartMap(prev => {
      const next = { ...prev, [productId]: (prev[productId] || 0) + 1 };
      saveCart(next);
      return next;
    });
    if (openDrawer) setOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartMap(prev => {
      const next = { ...prev };
      delete next[productId];
      saveCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartMap(prev => {
      const next = { ...prev, [productId]: quantity };
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

  const totalCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const getTotal = useCallback((currency: Currency) => {
    return items.reduce((sum, i) => {
      const price = currency === "inr" ? i.product.price.inr : i.product.price.usd;
      return sum + price * i.quantity;
    }, 0);
  }, [items]);

  const getQuantity = useCallback((productId: string) => cartMap[productId] || 0, [cartMap]);

  return { items, totalCount, getTotal, getQuantity, addToCart, removeFromCart, updateQuantity, clearCart, open, setOpen };
}
