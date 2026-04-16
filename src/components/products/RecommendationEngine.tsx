import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import type { Currency } from "@/config/appConfig";
import { trackEvent } from "@/lib/analytics";

interface RecommendationEngineProps {
  currentProduct: Product;
  allProducts: Product[];
  currency: Currency;
}

export default function RecommendationEngine({ currentProduct, allProducts, currency }: RecommendationEngineProps) {
  // Score by shared tag count, then sort
  const recommended = allProducts
    .filter(p => p.id !== currentProduct.id)
    .map(p => ({
      product: p,
      score: p.tags.filter(t => currentProduct.tags.includes(t)).length,
    }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(r => r.product);

  if (recommended.length === 0) return null;

  const handleClick = (product: Product) => {
    trackEvent("recommendation_click", {
      from: currentProduct.slug,
      to: product.slug,
      sharedTags: product.tags.filter(t => currentProduct.tags.includes(t)),
    });
  };

  return (
    <div className="mt-14">
      <h3 className="font-poppins text-xl font-semibold text-foreground mb-6">You Might Also Like</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommended.map(p => {
          const price = currency === "inr" ? `₹${p.price.inr.toLocaleString()}` : `$${p.price.usd}`;
          return (
            <Link
              key={p.id}
              to={`/products/${p.slug}`}
              onClick={() => handleClick(p)}
              className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="aspect-video bg-muted overflow-hidden">
                <img
                  src={p.previewImage}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-sm text-foreground mb-1 truncate">{p.name}</h4>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{p.shortDesc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">{price}</span>
                  <span className="text-xs text-muted-foreground group-hover:text-primary flex items-center gap-1 transition-colors">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
