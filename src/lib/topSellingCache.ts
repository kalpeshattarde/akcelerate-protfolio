/**
 * Cache the computed Top 3 selling product IDs in localStorage with a short TTL.
 * Hydrates the section instantly on repeat visits (and across navigation between
 * /products, /top-selling, /products/:slug) while a fresh compute runs.
 *
 * Also stores an admin-defined manual rank order that overrides salesCount
 * sorting when present.
 */
const KEY = "ak-top-selling-cache";
const RANK_KEY = "ak-top-selling-rank";
const TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX = 3;

interface CacheShape {
  ids: string[];
  savedAt: number;
}

export function readTopSellingCache(): string[] | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheShape;
    if (!parsed?.ids?.length) return null;
    if (Date.now() - parsed.savedAt > TTL_MS) return null;
    return parsed.ids.slice(0, MAX);
  } catch {
    return null;
  }
}

export function writeTopSellingCache(ids: string[]) {
  try {
    const payload: CacheShape = { ids: ids.slice(0, MAX), savedAt: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(payload));
  } catch {
    /* quota — ignore */
  }
}

export function clearTopSellingCache() {
  try {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new CustomEvent("ak-top-selling-updated"));
  } catch {
    /* ignore */
  }
}

/* ─────────── Manual rank order (admin override) ─────────── */

export function readTopSellingRank(): string[] {
  try {
    const raw = localStorage.getItem(RANK_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === "string").slice(0, MAX);
  } catch {
    return [];
  }
}

export function writeTopSellingRank(ids: string[]) {
  try {
    localStorage.setItem(RANK_KEY, JSON.stringify(ids.slice(0, MAX)));
    // Bust the cache so the section re-resolves immediately
    localStorage.removeItem(KEY);
    window.dispatchEvent(new CustomEvent("ak-top-selling-updated"));
  } catch {
    /* ignore */
  }
}

export function clearTopSellingRank() {
  try {
    localStorage.removeItem(RANK_KEY);
    localStorage.removeItem(KEY);
    window.dispatchEvent(new CustomEvent("ak-top-selling-updated"));
  } catch {
    /* ignore */
  }
}
