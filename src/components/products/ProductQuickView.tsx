import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star, TrendingUp, Zap, ExternalLink } from "lucide-react";
import type { Product } from "@/data/products";
import type { Currency } from "@/config/appConfig";

interface ProductQuickViewProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currency: Currency;
  isPurchased: boolean;
  isFavorite: boolean;
  cartQuantity: number;
  onPurchase: (id: string) => void;
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const ProductQuickView = forwardRef<HTMLDivElement, ProductQuickViewProps>(function ProductQuickView({
  product, open, onOpenChange, currency, isPurchased, isFavorite, cartQuantity,
  onPurchase, onAddToCart, onToggleFavorite,
}, _ref) {
  if (!product) return null;


  const price = currency === "inr" ? `₹${product.price.inr.toLocaleString("en-IN")}` : `$${product.price.usd}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-poppins text-xl">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-2">
          {/* Image */}
          <div className="relative rounded-xl overflow-hidden bg-muted aspect-[4/3]">
            <img src={product.previewImage} alt={product.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            {product.badge && (
              <Badge className="absolute top-3 left-3">{product.badge}</Badge>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-primary">{price}</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3" />
                {product.salesCount} sales
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                4.{Math.floor(Math.random() * 3) + 7}
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="flex flex-wrap gap-1.5">
              {product.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-1.5 mt-1">
              <h4 className="text-sm font-semibold text-foreground">Key Features</h4>
              <ul className="grid grid-cols-1 gap-1">
                {product.features.map(f => (
                  <li key={f} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-border">
              {isPurchased ? (
                <div className="w-full py-2.5 rounded-lg text-center text-sm font-medium bg-green-500/10 text-green-600 border border-green-500/20">
                  ✓ Purchased
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => onPurchase(product.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Zap className="w-4 h-4" /> Buy Now
                  </button>
                  <button
                    onClick={() => onAddToCart(product.id)}
                    className="relative flex items-center justify-center px-4 py-2.5 rounded-lg text-sm border border-border hover:bg-muted transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                    {cartQuantity > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                        {cartQuantity}
                      </span>
                    )}
                  </button>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => onToggleFavorite(product.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm border transition-colors ${
                    isFavorite
                      ? "border-red-300 bg-red-50 text-red-600 dark:bg-red-500/10 dark:border-red-500/30"
                      : "border-border hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
                  {isFavorite ? "Saved" : "Save"}
                </button>
                <Link
                  to={`/products/${product.slug}`}
                  onClick={() => onOpenChange(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm border border-border hover:bg-muted text-muted-foreground transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Full Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
