import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, TrendingUp, Zap, Heart, Check, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import type { Currency } from "@/config/appConfig";

interface Props {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  currency: Currency;
  isPurchased: boolean;
  isWishlisted: boolean;
  cartQuantity: number;
  onPurchase: (id: string) => void;
  onAddToCart: (id: string) => void;
  onToggleWishlist: (id: string) => void;
}

export default function ProductQuickView({
  product, open, onClose, currency, isPurchased, isWishlisted, cartQuantity,
  onPurchase, onAddToCart, onToggleWishlist,
}: Props) {
  if (!product) return null;

  const price = currency === "inr"
    ? `₹${product.price.inr.toLocaleString("en-IN")}`
    : `$${product.price.usd}`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">{product.name} — Quick View</DialogTitle>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-[4/3] md:aspect-auto bg-muted">
            <img src={product.previewImage} alt={product.name} className="w-full h-full object-cover" />
            {product.badge && (
              <Badge className="absolute top-3 left-3">{product.badge}</Badge>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-poppins text-xl font-bold text-foreground">{product.name}</h3>
              <button
                onClick={() => onToggleWishlist(product.id)}
                className="p-1.5 rounded-full hover:bg-muted transition-colors"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" />{product.salesCount} sales</span>
              <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />4.8</span>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-4">{product.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground">{tag}</span>
              ))}
            </div>

            {/* Features */}
            <div className="mb-4 space-y-1.5">
              {product.features.slice(0, 4).map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            <div className="mt-auto space-y-3">
              <div className="text-2xl font-bold text-primary">{price}</div>

              {isPurchased ? (
                <div className="w-full py-2.5 rounded-lg text-center text-sm font-medium bg-green-500/10 text-green-600 border border-green-500/20">
                  ✓ Purchased
                </div>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => onPurchase(product.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    <Zap className="w-4 h-4" /> Buy Now
                  </button>
                  <button onClick={() => onAddToCart(product.id)} className="relative flex items-center justify-center px-4 py-2.5 rounded-lg text-sm border border-border hover:bg-muted transition-colors">
                    <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                    {cartQuantity > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">{cartQuantity}</span>
                    )}
                  </button>
                </div>
              )}

              <Link to={`/products/${product.slug}`} onClick={onClose} className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> View full details
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
