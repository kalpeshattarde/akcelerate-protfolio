/**
 * Local overrides for product fields, keyed by product id.
 * Used by the bulk editor so the demo can demonstrate updates without
 * mutating the seed PRODUCTS array. Components that want to honor overrides
 * can call applyProductOverrides() with the base list.
 */
import type { Product } from "@/data/products";

export type ProductOverride = Partial<Pick<Product, "price" | "category" | "topSelling" | "salesCount">>;

const KEY = "ak-product-overrides";

export function getProductOverrides(): Record<string, ProductOverride> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function setProductOverrides(map: Record<string, ProductOverride>) {
  localStorage.setItem(KEY, JSON.stringify(map));
  window.dispatchEvent(new CustomEvent("ak-products-updated"));
}

export function applyBulkPatch(ids: string[], patch: ProductOverride) {
  const map = getProductOverrides();
  ids.forEach(id => {
    map[id] = { ...map[id], ...patch };
  });
  setProductOverrides(map);
}

export function clearOverride(id: string) {
  const map = getProductOverrides();
  delete map[id];
  setProductOverrides(map);
}

export function applyProductOverrides(products: Product[]): Product[] {
  const map = getProductOverrides();
  return products.map(p => {
    const o = map[p.id];
    if (!o) return p;
    return {
      ...p,
      ...o,
      price: o.price ? { ...p.price, ...o.price } : p.price,
    };
  });
}
