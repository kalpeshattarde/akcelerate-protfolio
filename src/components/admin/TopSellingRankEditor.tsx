import { useEffect, useMemo, useState } from "react";
import { applyProductOverrides } from "@/lib/productOverrides";
import { PRODUCTS } from "@/data/products";
import {
  readTopSellingRank,
  writeTopSellingRank,
  clearTopSellingRank,
} from "@/lib/topSellingCache";
import { ArrowDown, ArrowUp, Flame, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const MAX = 3;

export default function TopSellingRankEditor() {
  const [tick, setTick] = useState(0);
  const [rank, setRank] = useState<string[]>(() => readTopSellingRank());

  useEffect(() => {
    const refresh = () => setTick(t => t + 1);
    window.addEventListener("ak-products-updated", refresh);
    window.addEventListener("ak-top-selling-updated", refresh);
    return () => {
      window.removeEventListener("ak-products-updated", refresh);
      window.removeEventListener("ak-top-selling-updated", refresh);
    };
  }, []);

  const products = useMemo(
    () => applyProductOverrides(PRODUCTS),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tick],
  );

  const ranked = rank
    .map(id => products.find(p => p.id === id))
    .filter((p): p is typeof products[number] => Boolean(p));

  const available = products
    .filter(p => !rank.includes(p.id))
    .sort((a, b) => b.salesCount - a.salesCount);

  const persist = (next: string[]) => {
    const trimmed = next.slice(0, MAX);
    setRank(trimmed);
    writeTopSellingRank(trimmed);
  };

  const addToRank = (id: string) => {
    if (rank.length >= MAX) {
      toast.error(`You can only pin ${MAX} products. Remove one first.`);
      return;
    }
    persist([...rank, id]);
    toast.success("Added to Top 3");
  };

  const remove = (id: string) => persist(rank.filter(x => x !== id));

  const move = (id: string, dir: -1 | 1) => {
    const idx = rank.indexOf(id);
    const swap = idx + dir;
    if (idx < 0 || swap < 0 || swap >= rank.length) return;
    const next = [...rank];
    [next[idx], next[swap]] = [next[swap], next[idx]];
    persist(next);
  };

  const reset = () => {
    if (!confirm("Clear the manual Top 3 order and revert to salesCount ranking?")) return;
    setRank([]);
    clearTopSellingRank();
    toast.success("Top 3 reset to automatic ranking");
  };

  return (
    <div className="space-y-6 p-6 rounded-xl border border-border bg-card">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Flame className="w-4 h-4 text-primary" /> Top 3 manual rank
          </h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-xl">
            Pin up to three products in the order you want them displayed on /products and
            /top-selling. When set, this overrides the automatic salesCount ranking. Leave empty
            to fall back to salesCount.
          </p>
        </div>
        {rank.length > 0 && (
          <Button variant="outline" size="sm" onClick={reset} className="gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </Button>
        )}
      </div>

      {/* Pinned slots */}
      <div className="space-y-2">
        {Array.from({ length: MAX }).map((_, i) => {
          const p = ranked[i];
          return (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                p ? "border-primary/30 bg-primary/5" : "border-dashed border-border bg-muted/20"
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                {i + 1}
              </div>
              {p ? (
                <>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{p.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {p.category} · {p.salesCount} sales
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => move(p.id, -1)}
                      disabled={i === 0}
                      className="p-1.5 rounded-md hover:bg-muted disabled:opacity-30 text-muted-foreground"
                      title="Move up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => move(p.id, 1)}
                      disabled={i === ranked.length - 1}
                      className="p-1.5 rounded-md hover:bg-muted disabled:opacity-30 text-muted-foreground"
                      title="Move down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => remove(p.id)}
                      className="p-1.5 rounded-md hover:bg-destructive/10 text-destructive"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-sm text-muted-foreground italic">Empty slot</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Picker */}
      {rank.length < MAX && (
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-2">
            Add a product (sorted by sales)
          </div>
          <div className="max-h-64 overflow-auto rounded-lg border border-border divide-y divide-border">
            {available.slice(0, 50).map(p => (
              <button
                key={p.id}
                onClick={() => addToRank(p.id)}
                className="w-full flex items-center justify-between gap-3 p-2.5 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="min-w-0">
                  <div className="text-sm text-foreground truncate">{p.name}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {p.category} · {p.salesCount} sales{p.topSelling ? " · ⭐" : ""}
                  </div>
                </div>
                <span className="text-xs text-primary font-medium">Pin</span>
              </button>
            ))}
            {available.length === 0 && (
              <div className="p-4 text-sm text-muted-foreground text-center">
                All products are already pinned.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
