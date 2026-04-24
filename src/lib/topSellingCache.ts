/**
 * Cache the computed Top 3 selling product IDs in localStorage with a short TTL.
 * Hydrates the section instantly on repeat visits while a fresh compute runs.
 */
const KEY = "ak-top-selling-cache";
const TTL_MS = 5 * 60 * 1000; // 5 minutes

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
    return parsed.ids;
  } catch {
    return null;
  }
}

export function writeTopSellingCache(ids: string[]) {
  try {
    const payload: CacheShape = { ids, savedAt: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(payload));
  } catch {
    /* quota — ignore */
  }
}

export function clearTopSellingCache() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
