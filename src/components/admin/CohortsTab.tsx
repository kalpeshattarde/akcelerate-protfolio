import { useEffect, useMemo, useState } from "react";
import { Users, Plus, Trash2, Edit, X } from "lucide-react";
import {
  getCohorts,
  upsertCohort,
  deleteCohort,
  newCohortId,
  matchesCohort,
  type Cohort,
  type CohortRule,
  type Operator,
} from "@/lib/cohorts";
import { getAnalyticsEvents } from "@/lib/analytics";
import { ChartCard, EmptyState } from "./AdminPolish";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const OPERATORS: { value: Operator; label: string; needsValue: boolean; needsKey: boolean }[] = [
  { value: "exists", label: "exists", needsValue: false, needsKey: false },
  { value: "count_gte", label: "count ≥", needsValue: true, needsKey: false },
  { value: "equals", label: "key equals", needsValue: true, needsKey: true },
  { value: "contains", label: "key contains", needsValue: true, needsKey: true },
];

const KNOWN_EVENTS = ["*", "page_view", "product_view", "products_view", "add_to_cart", "bundle_unlocked", "recommendation_click", "purchase"];

export default function CohortsTab() {
  const [cohorts, setCohorts] = useState<Cohort[]>(() => getCohorts());
  const [editing, setEditing] = useState<Cohort | null>(null);

  useEffect(() => {
    const refresh = () => setCohorts(getCohorts());
    window.addEventListener("ak-cohorts-updated", refresh);
    return () => window.removeEventListener("ak-cohorts-updated", refresh);
  }, []);

  const events = useMemo(() => getAnalyticsEvents(), []);

  const startNew = () => setEditing({
    id: newCohortId(),
    name: "",
    description: "",
    rules: [{ event: "page_view", op: "count_gte", value: 1 }],
    createdAt: new Date().toISOString(),
  });

  const remove = (id: string) => {
    if (!confirm("Delete this cohort?")) return;
    deleteCohort(id);
  };

  return (
    <div className="space-y-6">
      <ChartCard
        title="Saved cohorts"
        index={0}
        action={
          <Button size="sm" onClick={startNew} className="gap-1.5">
            <Plus className="w-3.5 h-3.5" /> New cohort
          </Button>
        }
      >
        <p className="text-xs text-muted-foreground mb-4">
          Define audience segments by event predicates. Selected cohort filters Funnel, Live, and Analytics.
        </p>
        {cohorts.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No cohorts yet"
            description="Create your first segment, e.g. visitors who viewed ≥3 products."
          />
        ) : (
          <div className="space-y-2">
            {cohorts.map(c => {
              const inSegment = matchesCohort(c, events);
              return (
                <div key={c.id} className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border hover:border-primary/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">{c.name}</span>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        inSegment ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"
                      }`}>
                        {inSegment ? "matches you" : "no match"}
                      </span>
                    </div>
                    {c.description && <p className="text-xs text-muted-foreground mb-1">{c.description}</p>}
                    <div className="flex flex-wrap gap-1.5">
                      {c.rules.map((r, i) => (
                        <span key={i} className="text-[10px] font-mono rounded bg-muted px-1.5 py-0.5 text-muted-foreground">
                          {ruleToString(r)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => setEditing(c)} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground" aria-label="Edit">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => remove(c.id)} className="p-1.5 rounded-md hover:bg-destructive/10 text-destructive" aria-label="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ChartCard>

      {editing && (
        <CohortEditor
          cohort={editing}
          onClose={() => setEditing(null)}
          onSave={(c) => { upsertCohort(c); setEditing(null); }}
        />
      )}
    </div>
  );
}

function ruleToString(r: CohortRule): string {
  if (r.op === "exists") return `${r.event} exists`;
  if (r.op === "count_gte") return `${r.event} ≥ ${r.value ?? 1}`;
  return `${r.event}.${r.key} ${r.op === "equals" ? "=" : "~"} ${r.value}`;
}

function CohortEditor({ cohort, onClose, onSave }: {
  cohort: Cohort;
  onClose: () => void;
  onSave: (c: Cohort) => void;
}) {
  const [draft, setDraft] = useState<Cohort>(cohort);

  const setRule = (i: number, patch: Partial<CohortRule>) => {
    const rules = [...draft.rules];
    rules[i] = { ...rules[i], ...patch };
    setDraft({ ...draft, rules });
  };
  const addRule = () => setDraft({ ...draft, rules: [...draft.rules, { event: "page_view", op: "count_gte", value: 1 }] });
  const removeRule = (i: number) => setDraft({ ...draft, rules: draft.rules.filter((_, j) => j !== i) });

  const canSave = draft.name.trim().length > 0 && draft.rules.length > 0;

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{cohort.name ? "Edit cohort" : "New cohort"}</DialogTitle>
          <DialogDescription>
            All rules must match (AND). Use this to segment visitors for funnel, live, and analytics views.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-xs">Name</Label>
            <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="e.g. Engaged shoppers" />
          </div>
          <div>
            <Label className="text-xs">Description (optional)</Label>
            <Input value={draft.description || ""} onChange={(e) => setDraft({ ...draft, description: e.target.value })} placeholder="What does this segment represent?" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs">Rules</Label>
              <Button type="button" size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={addRule}>
                <Plus className="w-3 h-3" /> Add rule
              </Button>
            </div>
            <div className="space-y-2">
              {draft.rules.map((r, i) => {
                const opMeta = OPERATORS.find(o => o.value === r.op)!;
                return (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-md border border-border bg-muted/30">
                    <select
                      value={r.event}
                      onChange={(e) => setRule(i, { event: e.target.value })}
                      className="h-8 rounded-md border border-input bg-background px-2 text-xs"
                    >
                      {KNOWN_EVENTS.map(ev => <option key={ev} value={ev}>{ev}</option>)}
                    </select>
                    <select
                      value={r.op}
                      onChange={(e) => setRule(i, { op: e.target.value as Operator, key: undefined, value: undefined })}
                      className="h-8 rounded-md border border-input bg-background px-2 text-xs"
                    >
                      {OPERATORS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    {opMeta.needsKey && (
                      <Input
                        value={r.key || ""}
                        onChange={(e) => setRule(i, { key: e.target.value })}
                        placeholder="data key (or 'path')"
                        className="h-8 text-xs flex-1"
                      />
                    )}
                    {opMeta.needsValue && (
                      <Input
                        value={String(r.value ?? "")}
                        onChange={(e) => setRule(i, { value: e.target.value })}
                        placeholder="value"
                        className="h-8 text-xs flex-1"
                      />
                    )}
                    <button onClick={() => removeRule(i)} disabled={draft.rules.length <= 1} className="p-1 text-muted-foreground hover:text-destructive disabled:opacity-30">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button disabled={!canSave} onClick={() => onSave(draft)}>Save cohort</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
