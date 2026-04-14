import { Link } from "react-router-dom";
import { Lock, Star, TrendingUp } from "lucide-react";
import type { Product } from "@/data/products";
import type { Currency } from "@/config/appConfig";

interface ProductCardProps {
  product: Product;
  currency: Currency;
  isPurchased: boolean;
}

export default function ProductCard({ product, currency, isPurchased }: ProductCardProps) {
  const price = currency === "inr" ? `₹${product.price.inr.toLocaleString()}` : `$${product.price.usd}`;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
          {product.badge}
        </div>
      )}

      {/* Preview */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        <img
          src={product.previewImage}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${!isPurchased ? "blur-[2px]" : ""}`}
        />
        {!isPurchased && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="w-5 h-5" />
              <span className="text-sm font-medium">Purchase to unlock</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-poppins font-semibold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <span className="text-lg font-bold text-primary whitespace-nowrap">{price}</span>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.shortDesc}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {product.salesCount} sales
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            4.{Math.floor(Math.random() * 3) + 7}
          </div>
        </div>
      </div>
    </Link>
  );
}
