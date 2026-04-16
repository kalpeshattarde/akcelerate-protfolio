import { useState } from "react";
import { X, Check, Minus, ArrowLeftRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PRODUCTS, type Product } from "@/data/products";
import type { Currency } from "@/config/appConfig";

interface ProductCompareProps {
  compareList: string[];
  onRemove: (id: string) => void;
  onClear: () => void;
  currency: Currency;
}

export default function ProductCompare({ compareList, onRemove, onClear, currency }: ProductCompareProps) {
  const [open, setOpen] = useState(false);
  const symbol = currency === "inr" ? "₹" : "$";
  const products = compareList.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean) as Product[];

  if (compareList.length === 0) return null;

  // Collect all unique features across compared products
  const allFeatures = [...new Set(products.flatMap(p => p.features))];
  

  return (
    <>
      {/* Floating compare bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-card border border-primary/30 shadow-2xl backdrop-blur-lg">
        <ArrowLeftRight className="w-4 h-4 text-primary shrink-0" />
        <span className="text-sm font-medium text-foreground whitespace-nowrap">
          {compareList.length} product{compareList.length > 1 ? "s" : ""} selected
        </span>

        {/* Mini avatars */}
        <div className="flex -space-x-2">
          {products.slice(0, 3).map(p => (
            <div key={p.id} className="w-8 h-8 rounded-lg border-2 border-background overflow-hidden bg-muted">
              <img src={p.previewImage} alt={p.name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <Button
          size="sm"
          onClick={() => setOpen(true)}
          disabled={compareList.length < 2}
          className="ml-2"
        >
          Compare{compareList.length < 2 ? " (need 2+)" : ""}
        </Button>
        <button onClick={onClear} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Comparison modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5" /> Compare Products
            </DialogTitle>
          </DialogHeader>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4 text-muted-foreground font-medium w-40">Attribute</th>
                  {products.map(p => (
                    <th key={p.id} className="py-3 px-3 text-center min-w-[180px]">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-muted">
                          <img src={p.previewImage} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-foreground font-semibold text-xs leading-tight">{p.name}</span>
                        <button onClick={() => onRemove(p.id)} className="text-muted-foreground hover:text-destructive">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price */}
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 text-muted-foreground font-medium">Price</td>
                  {products.map(p => (
                    <td key={p.id} className="py-3 px-3 text-center font-semibold text-foreground">
                      {symbol}{(currency === "inr" ? p.price.inr : p.price.usd).toLocaleString()}
                    </td>
                  ))}
                </tr>

                {/* Category */}
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 text-muted-foreground font-medium">Category</td>
                  {products.map(p => (
                    <td key={p.id} className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-md bg-muted text-xs capitalize">
                        {p.category === "mobile-app" ? "Mobile App" : "Web SaaS"}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Popularity */}
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 text-muted-foreground font-medium">Sales</td>
                  {products.map(p => (
                    <td key={p.id} className="py-3 px-3 text-center text-muted-foreground">
                      {p.salesCount.toLocaleString()}
                    </td>
                  ))}
                </tr>

                {/* Tags */}
                <tr className="border-b border-border">
                  <td className="py-3 pr-4 text-muted-foreground font-medium">Tech Stack</td>
                  {products.map(p => (
                    <td key={p.id} className="py-3 px-3 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {p.tags.map(t => (
                          <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-muted text-muted-foreground">{t}</span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Feature rows */}
                <tr>
                  <td colSpan={products.length + 1} className="pt-4 pb-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">Features</span>
                  </td>
                </tr>
                {allFeatures.map(feature => (
                  <tr key={feature} className="border-b border-border/50">
                    <td className="py-2 pr-4 text-muted-foreground text-xs">{feature}</td>
                    {products.map(p => (
                      <td key={p.id} className="py-2 px-3 text-center">
                        {p.features.includes(feature) ? (
                          <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                        ) : (
                          <Minus className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
