import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import type { Currency } from "@/config/appConfig";

interface RecommendationEngineProps {
  currentProduct: Product;
  allProducts: Product[];
  currency: Currency;
}

export default function RecommendationEngine({ currentProduct, allProducts, currency }: RecommendationEngineProps) {
  const recommended = allProducts
    .filter(p => p.id !== currentProduct.id)
    .filter(p => p.tags.some(t => currentProduct.tags.includes(t)))
    .slice(0, 3);

  if (recommended.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="font-poppins text-xl font-semibold text-foreground mb-5">You might also like</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {recommended.map(p => {
          const price = currency === "inr" ? `₹${p.price.inr.toLocaleString()}` : `$${p.price.usd}`;
          return (
            <Link
              key={p.id}
              to={`/products/${p.slug}`}
              className="rounded-xl border border-border bg-card p-4 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <h4 className="font-medium text-foreground mb-1">{p.name}</h4>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{p.shortDesc}</p>
              <span className="text-sm font-bold text-primary">{price}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
