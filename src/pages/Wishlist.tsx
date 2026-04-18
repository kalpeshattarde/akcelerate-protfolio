import { useMemo } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Heart, ShoppingCart, Trash2, ArrowLeft, Zap } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useGeoDetection } from "@/hooks/useGeoDetection";
import { PRODUCTS } from "@/data/products";

export default function Wishlist() {
  const { favorites, toggleFavorite, clearWishlist } = useWishlist();
  const cart = useCart();
  const { currency } = useGeoDetection();

  const wishlistProducts = useMemo(
    () => PRODUCTS.filter(p => favorites.includes(p.id)),
    [favorites]
  );

  const handleAddToCart = (id: string) => {
    cart.addToCart(id, false);
    const product = wishlistProducts.find(p => p.id === id);
    toast.success(`${product?.name || "Product"} added to cart`, { duration: 2000 });
  };

  const handleRemove = (id: string) => {
    const product = wishlistProducts.find(p => p.id === id);
    toggleFavorite(id);
    toast.success(`${product?.name} removed from wishlist`, { duration: 2000 });
  };

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-2">
          <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-poppins text-3xl md:text-4xl font-bold text-foreground">
            My <span className="gradient-text">Wishlist</span>
          </h1>
        </div>
        <p className="text-muted-foreground mb-8 ml-8">
          {wishlistProducts.length} saved {wishlistProducts.length === 1 ? "item" : "items"}
        </p>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground/30" />
            <h2 className="text-xl font-semibold text-foreground">Your wishlist is empty</h2>
            <p className="text-muted-foreground">Browse products and tap the heart icon to save items here.</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
      <SEOHead title="Wishlist" description="Your saved SaaS prototypes — review and purchase your favorite products." path="/wishlist" />
            {wishlistProducts.length > 1 && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => { clearWishlist(); toast.success("Wishlist cleared"); }}
                  className="text-xs text-destructive hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}

            <div className="space-y-4">
              {wishlistProducts.map(product => {
                const price = currency === "inr"
                  ? `₹${product.price.inr.toLocaleString("en-IN")}`
                  : `$${product.price.usd}`;

                return (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/20 transition-colors"
                  >
                    <Link to={`/products/${product.slug}`} className="shrink-0">
                      <img
                        src={product.previewImage}
                        alt={product.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link to={`/products/${product.slug}`}>
                        <h3 className="font-poppins font-semibold text-foreground hover:text-primary transition-colors truncate">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{product.shortDesc}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {product.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-lg font-bold text-primary">{price}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                        title="Add to cart"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="hidden sm:inline">Add to Cart</span>
                      </button>
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
