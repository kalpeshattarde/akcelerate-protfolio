import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftRight } from "lucide-react";
import { Heart, ShoppingCart, Star, TrendingUp, Zap, ZoomIn, Eye } from "lucide-react";
import type { Product } from "@/data/products";
import type { Currency } from "@/config/appConfig";
import ImageLightbox from "./ImageLightbox";
import { Tilt } from "@/components/motion/MotionPrimitives";

interface ProductCardProps {
  product: Product;
  currency: Currency;
  isPurchased: boolean;
  cartQuantity?: number;
  isFavorite?: boolean;
  isComparing?: boolean;
  bundleActive?: boolean;
  onPurchase?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onQuickView?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onToggleCompare?: (id: string) => void;
}

export default function ProductCard({ product, isPurchased, cartQuantity = 0, isFavorite = false, isComparing = false, bundleActive = false, onPurchase, onAddToCart, onQuickView, onToggleFavorite, onToggleCompare }: ProductCardProps) {
  const priceUsd = `$${product.price.usd}`;
  const priceInr = `₹${product.price.inr.toLocaleString("en-IN")}`;
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <Tilt max={6} className="will-change-transform">
      <div className="group relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30">
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
            {product.badge}
          </div>
        )}

        <div className="relative aspect-[4/3] bg-muted overflow-hidden">
          <Link to={`/products/${product.slug}`}>
            <img
              src={product.previewImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
          <div className="absolute bottom-2 right-2 z-10 flex gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView?.(product.id); }}
              className="p-2 rounded-lg bg-black/50 text-white hover:bg-black/70"
              title="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLightboxOpen(true); }}
              className="p-2 rounded-lg bg-black/50 text-white hover:bg-black/70"
              title="Zoom preview"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
          {/* Favorite button */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite?.(product.id); }}
            className={`absolute top-3 right-3 z-10 p-1.5 rounded-full transition-colors ${
              isFavorite ? "bg-red-500/20 text-red-500" : "bg-black/30 text-white hover:bg-black/50"
            }`}
            title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
          {/* Compare button */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleCompare?.(product.id); }}
            className={`absolute top-3 right-12 z-10 p-1.5 rounded-full transition-colors ${
              isComparing ? "bg-primary/20 text-primary" : "bg-black/30 text-white hover:bg-black/50"
            }`}
            title={isComparing ? "Remove from compare" : "Compare"}
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Link to={`/products/${product.slug}`}>
              <h3 className="font-poppins font-semibold text-foreground group-hover:text-primary transition-colors">
                {product.name.includes(" – ") ? (
                  <>
                    <span className="font-bold">{product.name.split(" – ")[0]}</span>
                    {" – "}
                    <span className="font-normal">{product.name.split(" – ")[1]}</span>
                  </>
                ) : product.name}
              </h3>
            </Link>
            <div className="text-right whitespace-nowrap">
              <span className="text-lg font-bold text-primary">{priceUsd}</span>
              <div className="text-[11px] text-muted-foreground">≈ {priceInr}</div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-3">{product.shortDesc}</p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {product.salesCount} sales
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              4.{Math.floor(Math.random() * 3) + 7}
            </div>
          </div>

          {isPurchased ? (
            <div className="w-full py-2 rounded-lg text-center text-sm font-medium bg-green-500/10 text-green-600 border border-green-500/20">
              ✓ Purchased
            </div>
          ) : cartQuantity > 0 ? (
            <div className="flex gap-2">
              <div className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                <ShoppingCart className="w-3.5 h-3.5" /> In Cart
              </div>
              <Link
                to={`/products/${product.slug}`}
                className="flex items-center justify-center px-3 py-2 rounded-lg text-sm border border-border hover:bg-muted transition-colors"
                title="View details"
              >
                <Eye className="w-4 h-4 text-muted-foreground" />
              </Link>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={(e) => { e.preventDefault(); onPurchase?.(product.id); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Zap className="w-3.5 h-3.5" /> Buy Now
              </button>
              <button
                onClick={(e) => { e.preventDefault(); onAddToCart?.(product.id); }}
                className="flex items-center justify-center px-3 py-2 rounded-lg text-sm border border-border hover:bg-muted transition-colors"
                title="Add to cart"
              >
                <ShoppingCart className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          )}
        </div>
      </div>
      </Tilt>

      <ImageLightbox
        src={product.previewImage}
        alt={product.name}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
