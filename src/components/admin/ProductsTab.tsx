import { PRODUCTS } from "@/data/products";
import { Edit, Trash2, Plus } from "lucide-react";

export default function ProductsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Product Catalog</h3>
        <button className="btn-primary text-sm gap-1.5"><Plus className="w-4 h-4" /> Add Product</button>
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Category</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Price (USD)</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Sales</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Top Seller</th>
              <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map(p => (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="p-3 font-medium text-foreground">{p.name}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
