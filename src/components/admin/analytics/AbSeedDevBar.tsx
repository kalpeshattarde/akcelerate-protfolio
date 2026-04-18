type Evt = { event: string; data: Record<string, unknown>; timestamp: string; path: string };

const STORAGE_KEY = "ak-analytics";

const makeEvents = (event: string, variant: string, count: number, offsetMs = 0): Evt[] => {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => ({
    event,
    data: { variant },
    timestamp: new Date(now - offsetMs - i * 1000).toISOString(),
    path: "/products",
  }));
};

const writeSeed = (seeded: Evt[]) => {
  const existing: Evt[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const combined = [...existing, ...seeded].slice(-5000);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
  window.location.reload();
};

const seedAbTestData = () => {
  // 600 control views, 90 add_to_cart (15%); 550 catalog-early, 120 (~21.8%, +6.8 pts → green winner)
  writeSeed([
    ...makeEvents("products_view", "control", 600),
    ...makeEvents("add_to_cart", "control", 90, 1000),
    ...makeEvents("bundle_unlocked", "control", 30, 2000),
    ...makeEvents("products_view", "catalog-early", 550),
    ...makeEvents("add_to_cart", "catalog-early", 120, 1000),
    ...makeEvents("bundle_unlocked", "catalog-early", 40, 2000),
  ]);
};

const seedSparseAbData = () => {
  // 40 views per variant → triggers amber "Need 100+ views" banner
  writeSeed([
    ...makeEvents("products_view", "control", 40),
    ...makeEvents("add_to_cart", "control", 4, 1000),
    ...makeEvents("products_view", "catalog-early", 40),
    ...makeEvents("add_to_cart", "catalog-early", 6, 1000),
  ]);
};

const seedNeutralAbData = () => {
  // 600/90 (15%) vs 600/80 (~13.3%) → ~-1.7 pts lift, p≈0.39 → neutral
  writeSeed([
    ...makeEvents("products_view", "control", 600),
    ...makeEvents("add_to_cart", "control", 90, 1000),
    ...makeEvents("bundle_unlocked", "control", 30, 2000),
    ...makeEvents("products_view", "catalog-early", 600),
    ...makeEvents("add_to_cart", "catalog-early", 80, 1000),
    ...makeEvents("bundle_unlocked", "catalog-early", 35, 2000),
  ]);
};

const clearAbTestData = () => {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as Array<{ data?: { variant?: string } }>;
  const filtered = existing.filter(e => !e.data || (e.data.variant !== "control" && e.data.variant !== "catalog-early"));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  window.location.reload();
};

export default function AbSeedDevBar() {
  if (!import.meta.env.DEV) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl border border-dashed border-border bg-muted/30">
      <span className="text-xs font-mono text-muted-foreground mr-auto">DEV ONLY · Preview A/B card states</span>
      <button
        onClick={seedSparseAbData}
        className="px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-semibold hover:bg-amber-500/90 transition-colors"
      >
        Seed sparse data
      </button>
      <button
        onClick={seedNeutralAbData}
        className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-xs font-semibold hover:bg-muted/80 border border-border transition-colors"
      >
        Seed neutral data
      </button>
      <button
        onClick={seedAbTestData}
        className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
      >
        Seed A/B test data
      </button>
      <button
        onClick={clearAbTestData}
        className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs font-medium hover:bg-muted transition-colors"
      >
        Clear A/B data
      </button>
    </div>
  );
}
