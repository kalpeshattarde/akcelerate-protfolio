import { useEffect, useMemo, useState } from "react";
import { PRODUCTS, type Product } from "@/data/products";
import { Edit, Trash2, Plus, X, RotateCcw } from "lucide-react";
import {
  applyProductOverrides,
  applyBulkPatch,
  getProductOverrides,
  setProductOverrides,
  type ProductOverride,
} from "@/lib/productOverrides";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductsCsvImport } from "./ProductsCsvImport";

type EditField = "price.usd" | "price.inr" | "category" | "topSelling";

export default function ProductsTab() {
  const [overridesTick, setOverridesTick] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const refresh = () => setOverridesTick(t => t + 1);
    window.addEventListener("ak-products-updated", refresh);
    return () => window.removeEventListener("ak-products-updated", refresh);
  }, []);

  const products = useMemo(
    () => applyProductOverrides(PRODUCTS),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [overridesTick],
  );

  const overrides = getProductOverrides();
  const allSelected = selected.size === products.length;
  const someSelected = selected.size > 0;

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(products.map(p => p.id)));
  };
  const toggleOne = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const resetAll = () => {
    if (!confirm("Clear ALL product overrides and revert to seed values?")) return;
    setProductOverrides({});
    setSelected(new Set());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Product Catalog</h3>
        <div className="flex items-center gap-2">
          {Object.keys(overrides).length > 0 && (
            <button
              onClick={resetAll}
              className="text-xs inline-flex items-center gap-1 text-muted-foreground hover:text-destructive transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset all overrides ({Object.keys(overrides).length})
            </button>
          )}
          <ProductsCsvImport />
          <button className="btn-primary text-sm gap-1.5"><Plus className="w-4 h-4" /> Add Product</button>
        </div>
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="p-3 w-10">
                <Checkbox checked={allSelected} onCheckedChange={toggleAll} aria-label="Select all" />
              </th>
              <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Category</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Price (USD)</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Sales</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Top Seller</th>
              <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => {
              const isSelected = selected.has(p.id);
              const isOverridden = !!overrides[p.id];
              return (
                <tr
                  key={p.id}
                  className={`border-b border-border last:border-0 hover:bg-muted/30 ${isSelected ? "bg-primary/5" : ""}`}
                >
                  <td className="p-3">
                    <Checkbox checked={isSelected} onCheckedChange={() => toggleOne(p.id)} aria-label={`Select ${p.name}`} />
                  </td>
                  <td className="p-3 font-medium text-foreground">
                    {p.name}
                    {isOverridden && <span className="ml-2 text-[10px] text-amber-600 font-semibold uppercase">edited</span>}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                      {p.category === "mobile-app" ? "Mobile App" : "Web SaaS"}
                    </span>
                  </td>
                  <td className="p-3 text-foreground">${p.price.usd}</td>
                  <td className="p-3 text-foreground">{p.salesCount}</td>
                  <td className="p-3">{p.topSelling ? "⭐" : "—"}</td>
                  <td className="p-3 text-right">
                    <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><Edit className="w-4 h-4" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive ml-1"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {someSelected && (
        <div className="sticky bottom-4 z-10 mx-auto max-w-2xl">
          <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-primary/30 bg-card shadow-lg backdrop-blur">
            <div className="text-sm">
              <span className="font-semibold text-foreground">{selected.size} selected</span>
              <span className="text-muted-foreground ml-2">of {products.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelected(new Set())}
                className="text-xs inline-flex items-center gap-1 text-muted-foreground hover:text-foreground px-2 py-1 rounded-md hover:bg-muted"
              >
                <X className="w-3 h-3" /> Clear
              </button>
              <Button size="sm" onClick={() => setEditing(true)} className="gap-1.5">
                <Edit className="w-3.5 h-3.5" /> Bulk edit
              </Button>
            </div>
          </div>
        </div>
      )}

      <BulkEditDialog
        open={editing}
        selectedIds={Array.from(selected)}
        products={products}
        onClose={() => setEditing(false)}
        onApply={(patch) => {
          applyBulkPatch(Array.from(selected), patch);
          setEditing(false);
          setSelected(new Set());
        }}
      />
    </div>
  );
}

function BulkEditDialog({
  open, selectedIds, products, onClose, onApply,
}: {
  open: boolean;
  selectedIds: string[];
  products: Product[];
  onClose: () => void;
  onApply: (patch: ProductOverride) => void;
}) {
  const [fields, setFields] = useState<Record<EditField, boolean>>({
    "price.usd": false,
    "price.inr": false,
    "category": false,
    "topSelling": false,
  });
  const [priceUsd, setPriceUsd] = useState<number>(0);
  const [priceInr, setPriceInr] = useState<number>(0);
  const [category, setCategory] = useState<"mobile-app" | "web-saas">("mobile-app");
  const [topSelling, setTopSelling] = useState(false);

  const selectedProducts = products.filter(p => selectedIds.includes(p.id));
  const patch: ProductOverride = useMemo(() => {
    const p: ProductOverride = {};
    if (fields["price.usd"] || fields["price.inr"]) {
      p.price = { usd: 0, inr: 0 };
      if (fields["price.usd"]) p.price.usd = priceUsd;
      if (fields["price.inr"]) p.price.inr = priceInr;
    }
    if (fields.category) p.category = category;
    if (fields.topSelling) p.topSelling = topSelling;
    return p;
  }, [fields, priceUsd, priceInr, category, topSelling]);

  const hasChanges = Object.keys(patch).length > 0;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Bulk edit · {selectedIds.length} products</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <FieldRow
            label="Price (USD)"
            checked={fields["price.usd"]}
            onToggle={(c) => setFields(f => ({ ...f, "price.usd": c }))}
          >
            <Input type="number" value={priceUsd} onChange={(e) => setPriceUsd(Number(e.target.value))} disabled={!fields["price.usd"]} />
          </FieldRow>
          <FieldRow
            label="Price (INR)"
            checked={fields["price.inr"]}
            onToggle={(c) => setFields(f => ({ ...f, "price.inr": c }))}
          >
            <Input type="number" value={priceInr} onChange={(e) => setPriceInr(Number(e.target.value))} disabled={!fields["price.inr"]} />
          </FieldRow>
          <FieldRow
            label="Category"
            checked={fields.category}
            onToggle={(c) => setFields(f => ({ ...f, category: c }))}
          >
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as "mobile-app" | "web-saas")}
              disabled={!fields.category}
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm disabled:opacity-50"
            >
              <option value="mobile-app">Mobile App</option>
              <option value="web-saas">Web SaaS</option>
            </select>
          </FieldRow>
          <FieldRow
            label="Top Seller"
            checked={fields.topSelling}
            onToggle={(c) => setFields(f => ({ ...f, topSelling: c }))}
          >
            <select
              value={topSelling ? "yes" : "no"}
              onChange={(e) => setTopSelling(e.target.value === "yes")}
              disabled={!fields.topSelling}
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm disabled:opacity-50"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </FieldRow>

          {hasChanges && (
            <div className="rounded-lg border border-border bg-muted/40 p-3 max-h-48 overflow-y-auto">
              <div className="text-xs font-semibold text-foreground mb-2">Diff preview</div>
              <div className="space-y-1 text-xs font-mono">
                {selectedProducts.slice(0, 8).map(p => (
                  <div key={p.id} className="text-muted-foreground">
                    <span className="text-foreground">{p.name}</span>:{" "}
                    {patch.price?.usd != null && fields["price.usd"] && <span>usd ${p.price.usd} → <span className="text-primary">${patch.price.usd}</span> · </span>}
                    {patch.price?.inr != null && fields["price.inr"] && <span>inr ₹{p.price.inr} → <span className="text-primary">₹{patch.price.inr}</span> · </span>}
                    {patch.category && <span>cat {p.category} → <span className="text-primary">{patch.category}</span> · </span>}
                    {patch.topSelling != null && <span>top {String(p.topSelling)} → <span className="text-primary">{String(patch.topSelling)}</span></span>}
                  </div>
                ))}
                {selectedProducts.length > 8 && (
                  <div className="text-muted-foreground italic">…and {selectedProducts.length - 8} more</div>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button disabled={!hasChanges} onClick={() => onApply(patch)}>
            Apply to {selectedIds.length} products
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function FieldRow({
  label, checked, onToggle, children,
}: {
  label: string;
  checked: boolean;
  onToggle: (c: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 w-36 shrink-0">
        <Checkbox checked={checked} onCheckedChange={(c) => onToggle(!!c)} />
        <Label className="text-xs cursor-pointer" onClick={() => onToggle(!checked)}>{label}</Label>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
