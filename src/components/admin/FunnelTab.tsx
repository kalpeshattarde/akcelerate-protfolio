import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Filter, X, Plus, TrendingDown, Save, Trash2 } from "lucide-react";
import { getAnalyticsEvents } from "@/lib/analytics";
import { ChartCard, EmptyState, ChartSkeleton } from "./AdminPolish";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const KNOWN_EVENTS = [
  "page_view",
  "product_view",
  "products_view",
  "add_to_cart",
  "bundle_unlocked",
  "recommendation_click",
  "purchase",
] as const;

const STORAGE_KEY = "ak-funnel-steps";
const SAVED_KEY = "ak-funnel-saved";
const DEFAULT_STEPS = ["page_view", "product_view", "add_to_cart", "purchase"];

interface SavedFunnel {
  name: string;
  steps: string[];
}

function loadSteps(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Array.isArray(v) && v.length >= 2) return v;
  } catch { /* ignore */ }
  return DEFAULT_STEPS;
}

function loadSaved(): SavedFunnel[] {
  try {
    const v = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
    if (Array.isArray(v)) return v;
  } catch { /* ignore */ }
  return [];
}

function persistSaved(list: SavedFunnel[]) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(list));
}

export default function FunnelTab() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState(() => getAnalyticsEvents());
  const [steps, setSteps] = useState<string[]>(loadSteps);
  const [saved, setSaved] = useState<SavedFunnel[]>(loadSaved);
  const [saveOpen, setSaveOpen] = useState(false);
  const [saveName, setSaveName] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 250);
    const refresh = () => setEvents(getAnalyticsEvents());
    window.addEventListener("ak-analytics-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      clearTimeout(t);
      window.removeEventListener("ak-analytics-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(steps));
  }, [steps]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    events.forEach(e => { c[e.event] = (c[e.event] || 0) + 1; });
    return c;
  }, [events]);

  const rows = useMemo(() => {
    const first = counts[steps[0]] || 0;
    return steps.map((step, i) => {
      const value = counts[step] || 0;
      const prev = i === 0 ? value : (counts[steps[i - 1]] || 0);
      const fromFirst = first > 0 ? (value / first) * 100 : 0;
      const fromPrev = prev > 0 ? (value / prev) * 100 : 0;
      const dropPrev = i === 0 ? 0 : 100 - fromPrev;
      return { step, value, fromFirst, fromPrev, dropPrev };
    });
  }, [counts, steps]);

  const addStep = (ev: string) => {
    if (!ev || steps.includes(ev) || steps.length >= 6) return;
    setSteps([...steps, ev]);
  };
  const removeStep = (idx: number) => {
    if (steps.length <= 2) return;
    setSteps(steps.filter((_, i) => i !== idx));
  };
  const moveStep = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= steps.length) return;
    const next = [...steps];
    [next[idx], next[j]] = [next[j], next[idx]];
    setSteps(next);
  };

  const openSave = () => { setSaveName(""); setSaveOpen(true); };
  const confirmSave = () => {
    const name = saveName.trim();
    if (!name) return;
    const next = [...saved.filter(s => s.name !== name), { name, steps: [...steps] }];
    setSaved(next);
    persistSaved(next);
    setSaveOpen(false);
  };
  const loadFunnel = (name: string) => {
    const f = saved.find(s => s.name === name);
    if (f) setSteps([...f.steps]);
  };
  const deleteFunnel = (name: string) => {
    if (!confirm(`Delete saved funnel "${name}"?`)) return;
    const next = saved.filter(s => s.name !== name);
    setSaved(next);
    persistSaved(next);
  };

  const available = KNOWN_EVENTS.filter(e => !steps.includes(e));
  const hasData = rows.some(r => r.value > 0);

  if (loading) {
    return <ChartSkeleton height={320} />;
  }

  return (
    <div className="space-y-6">
      <ChartCard title="Funnel steps" index={0}>
        <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
          <p className="text-xs text-muted-foreground">
            Choose 2–6 events. Order matters — each step is measured against the first.
          </p>
          <div className="flex items-center gap-2">
            {saved.length > 0 && (
              <select
                onChange={(e) => { if (e.target.value) { loadFunnel(e.target.value); e.target.value = ""; } }}
                defaultValue=""
                className="text-xs h-7 rounded-md border border-input bg-background px-2"
                aria-label="Load saved funnel"
              >
                <option value="" disabled>Load saved…</option>
                {saved.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
            )}
            <button
              type="button"
              onClick={openSave}
              className="text-xs inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 hover:bg-muted"
            >
              <Save className="w-3 h-3" /> Save
            </button>
          </div>
        </div>
        {saved.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {saved.map(s => (
              <span key={s.name} className="inline-flex items-center gap-1 text-[11px] rounded-full bg-muted px-2 py-0.5">
                <button onClick={() => loadFunnel(s.name)} className="hover:text-primary">{s.name}</button>
                <button onClick={() => deleteFunnel(s.name)} aria-label={`Delete ${s.name}`} className="hover:text-destructive">
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-2 mb-3">
          {steps.map((s, i) => (
            <div
              key={s}
              className="flex items-center gap-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 border border-primary/20"
            >
              <span className="text-[10px] font-bold opacity-70">#{i + 1}</span>
              <span>{s}</span>
              <button
                type="button"
                aria-label={`Move ${s} up`}
                onClick={() => moveStep(i, -1)}
                disabled={i === 0}
                className="ml-1 disabled:opacity-30 hover:text-foreground"
              >↑</button>
              <button
                type="button"
                aria-label={`Move ${s} down`}
                onClick={() => moveStep(i, 1)}
                disabled={i === steps.length - 1}
                className="disabled:opacity-30 hover:text-foreground"
              >↓</button>
              <button
                type="button"
                aria-label={`Remove ${s}`}
                onClick={() => removeStep(i)}
                disabled={steps.length <= 2}
                className="disabled:opacity-30 hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        {available.length > 0 && steps.length < 6 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
              <Plus className="w-3 h-3" /> Add step:
            </span>
            {available.map(ev => (
              <button
                key={ev}
                type="button"
                onClick={() => addStep(ev)}
                className="text-xs rounded-full border border-border px-2.5 py-1 hover:bg-muted hover:border-primary/40 transition-colors"
              >
                {ev}
              </button>
            ))}
          </div>
        )}
      </ChartCard>

      <ChartCard title="Conversion funnel" index={1}>
        {hasData ? (
          <div className="space-y-3">
            {rows.map((r, i) => (
              <motion.div
                key={r.step}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="space-y-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground font-mono">#{i + 1}</span>
                    <span className="font-medium text-foreground">{r.step}</span>
                    {i > 0 && r.dropPrev > 0 && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-amber-600">
                        <TrendingDown className="w-3 h-3" />
                        {r.dropPrev.toFixed(1)}% drop
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-foreground tabular-nums">{r.value.toLocaleString()}</span>
                    <span className="text-muted-foreground tabular-nums w-14 text-right">{r.fromFirst.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="h-7 rounded-md bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(2, r.fromFirst)}%` }}
                    transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-md"
                  />
                </div>
              </motion.div>
            ))}
            <div className="pt-3 mt-3 border-t border-border text-xs text-muted-foreground flex items-center justify-between">
              <span>Overall conversion (step #1 → step #{rows.length})</span>
              <span className="font-semibold text-foreground tabular-nums">
                {rows[rows.length - 1].fromFirst.toFixed(2)}%
              </span>
            </div>
          </div>
        ) : (
          <EmptyState
            icon={Filter}
            title="No matching events yet"
            description="Pick events that have been tracked in Analytics, or browse the site to generate data."
          />
        )}
      </ChartCard>
    </div>
  );
}
