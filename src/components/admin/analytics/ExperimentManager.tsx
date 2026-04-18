import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Pause, Play, CheckCircle2 } from "lucide-react";
import {
  type Experiment,
  type ExperimentStatus,
  getExperiments,
  removeExperiment,
  setExperimentStatus,
  upsertExperiment,
  newExperimentId,
} from "@/lib/experiments";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Props {
  experiments: Experiment[];
  onChange: () => void;
}

const STATUS_STYLE: Record<ExperimentStatus, string> = {
  running: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  paused: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  concluded: "bg-muted text-muted-foreground border-border",
};

export default function ExperimentManager({ experiments, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Experiment | null>(null);

  const startNew = () => {
    setEditing({
      id: "",
      name: "",
      hypothesis: "",
      metric: "Cart Rate",
      variants: [
        { key: "control", label: "Control", weight: 50 },
        { key: "variant-a", label: "Variant A", weight: 50 },
      ],
      status: "running",
      startedAt: new Date().toISOString(),
    });
    setOpen(true);
  };

  const startEdit = (exp: Experiment) => {
    setEditing(JSON.parse(JSON.stringify(exp)));
    setOpen(true);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground text-sm">Experiment registry</h3>
          <p className="text-xs text-muted-foreground">Manage A/B tests. Status controls which cards render below.</p>
        </div>
        <Button size="sm" onClick={startNew} className="gap-1.5">
          <Plus className="w-4 h-4" /> New experiment
        </Button>
      </div>

      <div className="space-y-2">
        {experiments.map(exp => (
          <div
            key={exp.id}
            className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border hover:border-primary/30 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-foreground text-sm">{exp.name}</span>
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border ${STATUS_STYLE[exp.status]}`}>
                  {exp.status}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">{exp.id}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{exp.hypothesis}</p>
              <div className="text-[11px] text-muted-foreground mt-1">
                {exp.variants.map(v => `${v.key} (${v.weight}%)`).join(" · ")}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {exp.status !== "concluded" && (
                <button
                  onClick={() => { setExperimentStatus(exp.id, exp.status === "running" ? "paused" : "running"); onChange(); }}
                  className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"
                  aria-label={exp.status === "running" ? "Pause" : "Resume"}
                  title={exp.status === "running" ? "Pause" : "Resume"}
                >
                  {exp.status === "running" ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              )}
              {exp.status !== "concluded" && (
                <button
                  onClick={() => { setExperimentStatus(exp.id, "concluded"); onChange(); }}
                  className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"
                  aria-label="Conclude"
                  title="Conclude"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => startEdit(exp)}
                className="p-1.5 rounded-md hover:bg-muted text-muted-foreground"
                aria-label="Edit"
                title="Edit"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => { if (confirm(`Delete experiment "${exp.name}"?`)) { removeExperiment(exp.id); onChange(); } }}
                className="p-1.5 rounded-md hover:bg-destructive/10 text-destructive"
                aria-label="Delete"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
        {experiments.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-4">No experiments yet. Click "New experiment" to add one.</p>
        )}
      </div>

      <ExperimentDialog
        open={open}
        editing={editing}
        onClose={() => { setOpen(false); setEditing(null); }}
        onSave={(exp) => { upsertExperiment(exp); setOpen(false); setEditing(null); onChange(); }}
      />
    </div>
  );
}

function ExperimentDialog({
  open, editing, onClose, onSave,
}: {
  open: boolean;
  editing: Experiment | null;
  onClose: () => void;
  onSave: (exp: Experiment) => void;
}) {
  const [draft, setDraft] = useState<Experiment | null>(editing);
  useEffect(() => { setDraft(editing); }, [editing]);

  if (!draft) return null;
  const totalWeight = draft.variants.reduce((s, v) => s + (Number(v.weight) || 0), 0);
  const valid = draft.name.trim() && draft.variants.length >= 2 && totalWeight === 100;

  const updateVariant = (i: number, patch: Partial<typeof draft.variants[number]>) => {
    const next = draft.variants.map((v, idx) => idx === i ? { ...v, ...patch } : v);
    setDraft({ ...draft, variants: next });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{editing?.id ? "Edit experiment" : "New experiment"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Name</Label>
            <Input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value, id: draft.id || newExperimentId(e.target.value) })}
              placeholder="Products page: catalog vs problem first"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Hypothesis</Label>
            <Textarea
              rows={2}
              value={draft.hypothesis}
              onChange={(e) => setDraft({ ...draft, hypothesis: e.target.value })}
              placeholder="Showing X will lift Y by ≥ Z pts."
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Metric</Label>
              <Input value={draft.metric} onChange={(e) => setDraft({ ...draft, metric: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Status</Label>
              <select
                value={draft.status}
                onChange={(e) => setDraft({ ...draft, status: e.target.value as ExperimentStatus })}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="running">running</option>
                <option value="paused">paused</option>
                <option value="concluded">concluded</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Variants (weights must sum to 100)</Label>
            {draft.variants.map((v, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-center">
                <Input
                  className="col-span-4 font-mono text-xs"
                  value={v.key}
                  onChange={(e) => updateVariant(i, { key: e.target.value })}
                  placeholder="key"
                />
                <Input
                  className="col-span-6 text-xs"
                  value={v.label}
                  onChange={(e) => updateVariant(i, { label: e.target.value })}
                  placeholder="Label"
                />
                <Input
                  className="col-span-2 text-xs"
                  type="number"
                  value={v.weight}
                  onChange={(e) => updateVariant(i, { weight: Number(e.target.value) })}
                />
              </div>
            ))}
            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setDraft({ ...draft, variants: [...draft.variants, { key: `variant-${draft.variants.length}`, label: `Variant ${draft.variants.length}`, weight: 0 }] })}
                className="text-primary hover:underline"
              >
                + Add variant
              </button>
              <span className={totalWeight === 100 ? "text-muted-foreground" : "text-amber-600"}>
                Total: {totalWeight}%
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button disabled={!valid} onClick={() => onSave(draft)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
