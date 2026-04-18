/**
 * Multi-experiment registry — stored in localStorage.
 * Each experiment defines its variants, traffic split, and status.
 * The actual cart/conversion tracking still lives in `analytics.ts`;
 * experiments here are metadata + status, used to render multiple AbTestCards.
 */

export type ExperimentStatus = "running" | "paused" | "concluded";

export interface ExperimentVariant {
  key: string;       // e.g. "control", "catalog-early"
  label: string;     // human-readable
  weight: number;    // 0–100, all weights should sum to 100
}

export interface Experiment {
  id: string;
  name: string;
  hypothesis: string;
  metric: string;          // e.g. "cart rate", "bundle rate"
  variants: ExperimentVariant[];
  status: ExperimentStatus;
  startedAt: string;       // ISO
  notes?: string;
}

const KEY = "ak-experiments";

const SEED: Experiment[] = [
  {
    id: "products-page-order",
    name: "Products page: catalog vs problem first",
    hypothesis: "Showing the catalog above the problem section will lift add-to-cart rate by ≥ 2 pts.",
    metric: "Cart Rate (Add to Cart / Views)",
    variants: [
      { key: "control", label: "Problem → Catalog (control)", weight: 50 },
      { key: "catalog-early", label: "Catalog → Problem (variant)", weight: 50 },
    ],
    status: "running",
    startedAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    notes: "Existing experiment surfaced as the first registry entry.",
  },
];

export function getExperiments(): Experiment[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(SEED));
      return SEED;
    }
    const list = JSON.parse(raw);
    if (Array.isArray(list)) return list;
  } catch { /* ignore */ }
  return SEED;
}

export function saveExperiments(list: Experiment[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent("ak-experiments-updated"));
}

export function upsertExperiment(exp: Experiment) {
  const list = getExperiments();
  const idx = list.findIndex(e => e.id === exp.id);
  if (idx >= 0) list[idx] = exp; else list.push(exp);
  saveExperiments(list);
}

export function removeExperiment(id: string) {
  saveExperiments(getExperiments().filter(e => e.id !== id));
}

export function setExperimentStatus(id: string, status: ExperimentStatus) {
  const list = getExperiments().map(e => e.id === id ? { ...e, status } : e);
  saveExperiments(list);
}

export function newExperimentId(name: string): string {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return slug || `exp-${Date.now()}`;
}
