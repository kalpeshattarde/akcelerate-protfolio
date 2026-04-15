import { useState, useCallback } from "react";

function loadWishlist(): string[] {
  try {
    return JSON.parse(localStorage.getItem("ak-wishlist") || "[]");
  } catch {
    return [];
  }
}

function saveWishlist(ids: string[]) {
  localStorage.setItem("ak-wishlist", JSON.stringify(ids));
}

export function useWishlist() {
  const [favorites, setFavorites] = useState<string[]>(loadWishlist);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites(prev => {
      const next = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      saveWishlist(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback((productId: string) => favorites.includes(productId), [favorites]);

  const clearWishlist = useCallback(() => {
    setFavorites([]);
    saveWishlist([]);
  }, []);

  return { favorites, toggleFavorite, isFavorite, clearWishlist };
}
