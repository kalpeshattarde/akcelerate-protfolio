import { useMemo, useRef, useState } from "react";
import Papa from "papaparse";
import { Upload, FileText, CheckCircle2, AlertTriangle, X, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  applyBulkPatch,
  type ProductOverride,
} from "@/lib/productOverrides";
import { PRODUCTS } from "@/data/products";

type FieldKey = "id" | "price.usd" | "price.inr" | "category" | "topSelling" | "salesCount";

const FIELD_OPTIONS: { value: FieldKey | ""; label: string }[] = [
  { value: "", label: "— Ignore —" },
  { value: "id", label: "Product ID (required)" },
  { value: "price.usd", label: "Price (USD)" },
  { value: "price.inr", label: "Price (INR)" },
  { value: "category", label: "Category (mobile-app | web-saas)" },
  { value: "topSelling", label: "Top Seller (true/false)" },
  { value: "salesCount", label: "Sales count" },
];

interface RowResult {
  id: string;
  patch: ProductOverride;
  ok: boolean;
  reason?: string;
}

function autoMap(headers: string[]): Record<string, FieldKey | ""> {
  const map: Record<string, FieldKey | ""> = {};
  headers.forEach(h => {
    const k = h.trim().toLowerCase();
    if (k === "id" || k === "product_id" || k === "productid") map[h] = "id";
    else if (k === "price_usd" || k === "usd" || k === "price.usd" || k === "price") map[h] = "price.usd";
    else if (k === "price_inr" || k === "inr" || k === "price.inr") map[h] = "price.inr";
    else if (k === "category" || k === "type") map[h] = "category";
    else if (k === "top_seller" || k === "topselling" || k === "top_selling" || k === "featured") map[h] = "topSelling";
    else if (k === "sales" || k === "salescount" || k === "sales_count") map[h] = "salesCount";
    else map[h] = "";
  });
  return map;
}

function parseBool(v: string): boolean {
  const s = v.trim().toLowerCase();
  return s === "true" || s === "1" || s === "yes" || s === "y";
}

export function ProductsCsvImport({ onImported }: { onImported?: (count: number) => void }) {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [mapping, setMapping] = useState<Record<string, FieldKey | "">>({});
  const [drag, setDrag] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const productIds = useMemo(() => new Set(PRODUCTS.map(p => p.id)), []);

  const reset = () => {
    setFileName("");
    setHeaders([]);
    setRows([]);
    setMapping({});
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const hdrs = res.meta.fields || [];
        setHeaders(hdrs);
        setRows(res.data);
        setMapping(autoMap(hdrs));
      },
    });
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const idColumn = useMemo(
    () => Object.entries(mapping).find(([, v]) => v === "id")?.[0],
    [mapping],
  );

  const dryRun: RowResult[] = useMemo(() => {
    if (!idColumn) return [];
    return rows.map((row): RowResult => {
      const id = (row[idColumn] || "").trim();
      if (!id) return { id: "(empty)", patch: {}, ok: false, reason: "missing id" };
      if (!productIds.has(id)) return { id, patch: {}, ok: false, reason: "unknown product id" };
      const patch: ProductOverride = {};
      let priceUsd: number | undefined;
      let priceInr: number | undefined;
      for (const [col, field] of Object.entries(mapping)) {
        if (!field) continue;
        const raw = (row[col] ?? "").trim();
        if (!raw) continue;
        if (field === "price.usd") {
          const n = Number(raw);
          if (!Number.isFinite(n)) return { id, patch: {}, ok: false, reason: `bad usd: ${raw}` };
          priceUsd = n;
        } else if (field === "price.inr") {
          const n = Number(raw);
          if (!Number.isFinite(n)) return { id, patch: {}, ok: false, reason: `bad inr: ${raw}` };
          priceInr = n;
        } else if (field === "category") {
          if (raw !== "mobile-app" && raw !== "web-saas") {
            return { id, patch: {}, ok: false, reason: `bad category: ${raw}` };
          }
          patch.category = raw;
        } else if (field === "topSelling") {
          patch.topSelling = parseBool(raw);
        } else if (field === "salesCount") {
          const n = Number(raw);
          if (!Number.isFinite(n)) return { id, patch: {}, ok: false, reason: `bad sales: ${raw}` };
          patch.salesCount = n;
        }
      }
      if (priceUsd != null || priceInr != null) {
        const base = PRODUCTS.find(p => p.id === id)!;
        patch.price = {
          usd: priceUsd ?? base.price.usd,
          inr: priceInr ?? base.price.inr,
        };
      }
      if (Object.keys(patch).length === 0) {
        return { id, patch: {}, ok: false, reason: "no changes" };
      }
      return { id, patch, ok: true };
    });
  }, [rows, mapping, idColumn, productIds]);

  const okRows = dryRun.filter(r => r.ok);
  const badRows = dryRun.filter(r => !r.ok);

  const commit = () => {
    okRows.forEach(r => applyBulkPatch([r.id], r.patch));
    onImported?.(okRows.length);
    setOpen(false);
    reset();
  };

  return (
    <>
      <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setOpen(true)}>
        <Upload className="w-3.5 h-3.5" /> Import CSV
      </Button>

      <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Import products from CSV</DialogTitle>
            <DialogDescription>
              Map columns to product fields. The <span className="font-mono">id</span> column is required and must match an existing product.
            </DialogDescription>
          </DialogHeader>

          {!fileName ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={onDrop}
              className={`rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
                drag ? "border-primary bg-primary/5" : "border-border bg-muted/30"
              }`}
            >
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm font-medium text-foreground mb-1">Drop a CSV here</p>
              <p className="text-xs text-muted-foreground mb-4">or click to browse</p>
              <input
                ref={fileRef}
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
              <Button size="sm" variant="outline" onClick={() => fileRef.current?.click()}>
                Choose file
              </Button>
              <div className="mt-4 text-[11px] text-muted-foreground">
                Expected headers (any subset): <span className="font-mono">id, price_usd, price_inr, category, top_seller, sales_count</span>
              </div>
              <button
                type="button"
                onClick={downloadSample}
                className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <Download className="w-3 h-3" /> Download sample CSV
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2">
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">{fileName}</span>
                  <span className="text-muted-foreground">· {rows.length} rows</span>
                </div>
                <button onClick={reset} className="text-xs text-muted-foreground hover:text-destructive inline-flex items-center gap-1">
                  <X className="w-3 h-3" /> Remove
                </button>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Column mapping</Label>
                <div className="rounded-lg border border-border divide-y divide-border max-h-56 overflow-y-auto">
                  {headers.map(h => (
                    <div key={h} className="flex items-center gap-3 px-3 py-2 text-sm">
                      <span className="font-mono text-xs text-muted-foreground w-44 truncate">{h}</span>
                      <span className="text-muted-foreground">→</span>
                      <select
                        value={mapping[h] || ""}
                        onChange={(e) => setMapping(m => ({ ...m, [h]: e.target.value as FieldKey | "" }))}
                        className="flex-1 h-8 rounded-md border border-input bg-background px-2 text-xs"
                      >
                        {FIELD_OPTIONS.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {!idColumn && (
                <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-md p-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Map one column to <span className="font-mono">Product ID</span> to enable validation.</span>
                </div>
              )}

              {idColumn && (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="inline-flex items-center gap-1 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {okRows.length} ready
                    </span>
                    <span className="inline-flex items-center gap-1 text-amber-600">
                      <AlertTriangle className="w-3.5 h-3.5" /> {badRows.length} skipped
                    </span>
                  </div>
                  <div className="rounded-lg border border-border max-h-56 overflow-y-auto text-xs">
                    <table className="w-full">
                      <thead className="bg-muted/40 sticky top-0">
                        <tr>
                          <th className="text-left px-3 py-1.5 font-medium text-muted-foreground">Status</th>
                          <th className="text-left px-3 py-1.5 font-medium text-muted-foreground">ID</th>
                          <th className="text-left px-3 py-1.5 font-medium text-muted-foreground">Patch / reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dryRun.slice(0, 50).map((r, i) => (
                          <tr key={i} className="border-t border-border">
                            <td className="px-3 py-1.5">
                              {r.ok ? (
                                <span className="text-emerald-600">✓</span>
                              ) : (
                                <span className="text-amber-600">!</span>
                              )}
                            </td>
                            <td className="px-3 py-1.5 font-mono">{r.id}</td>
                            <td className="px-3 py-1.5 text-muted-foreground">
                              {r.ok ? JSON.stringify(r.patch) : r.reason}
                            </td>
                          </tr>
                        ))}
                        {dryRun.length > 50 && (
                          <tr><td colSpan={3} className="px-3 py-1.5 text-muted-foreground italic">…and {dryRun.length - 50} more</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => { setOpen(false); reset(); }}>Cancel</Button>
            <Button disabled={okRows.length === 0} onClick={commit}>
              Import {okRows.length} row{okRows.length === 1 ? "" : "s"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
