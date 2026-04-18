import { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Heart, ShoppingCart, Eye, Package } from "lucide-react";
import { motion } from "framer-motion";
import { PRODUCTS, type Product } from "@/data/products";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useGeoDetection } from "@/hooks/useGeoDetection";
import { trackEvent } from "@/lib/analytics";

const RECENT_KEY = "ak-recently-viewed";
const MAX_RECENTLY_VIEWED = 12;

function getRecentlyViewed(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
  } catch {
    return [];
  }
}

function getPurchasedIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem("ak-purchased") || "[]");
  } catch {
    return [];
  }
}

function getCartIds(): string[] {
  try {
    const map = JSON.parse(localStorage.getItem("ak-cart") || "{}");
    return Object.keys(map);
  } catch {
    return [];
  }
}

interface SignalSummary {
  wishlistCount: number;
  cartCount: number;
  viewedCount: number;
  purchasedCount: number;
  hasAnySignal: boolean;
}

function scoreProducts(seedTags: string[], excludeIds: Set<string>): Product[] {
  if (seedTags.length === 0) return [];
  // Count tag frequency in seed for weighting
  const tagWeight = new Map<string, number>();
  seedTags.forEach(t => tagWeight.set(t, (tagWeight.get(t) || 0) + 1));

  return PRODUCTS
    .filter(p => !excludeIds.has(p.id))
    .map(p => {
      const score = p.tags.reduce((sum, tag) => sum + (tagWeight.get(tag) || 0), 0);
      return { product: p, score };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score || b.product.salesCount - a.product.salesCount)
    .slice(0, 4)
    .map(r => r.product);
}

export default function PersonalizedPicks() {
  const { favorites } = useWishlist();
  const { items: cartItems } = useCart();
  const { currency } = useGeoDetection();
  const [recent, setRecent] = useState<string[]>(getRecentlyViewed);
  const [purchased, setPurchased] = useState<string[]>(getPurchasedIds);

  // Re-read on mount in case localStorage changed
  useEffect(() => {
    setRecent(getRecentlyViewed());
    setPurchased(getPurchasedIds());
  }, []);

  const cartIds = useMemo(() => cartItems.map(i => i.product.id), [cartItems]);

  const { recommended, signals, fallback } = useMemo(() => {
    // Build seed tag list from all signals (with implicit weighting by repetition)
    const seedTags: string[] = [];
    const exclude = new Set<string>();

    const addFromIds = (ids: string[], repeat = 1) => {
      ids.forEach(id => {
        const p = PRODUCTS.find(x => x.id === id);
        if (!p) return;
        exclude.add(id);
        for (let i = 0; i < repeat; i++) seedTags.push(...p.tags);
      });
    };

    // Strongest signal: wishlist (intentional save)
    addFromIds(favorites, 3);
    // Strong: cart (purchase intent)
    addFromIds(cartIds, 3);
    // Medium: purchased (already owns — recommend complements)
    addFromIds(purchased, 2);
    // Light: recently viewed
    addFromIds(recent, 1);

    const sig: SignalSummary = {
      wishlistCount: favorites.length,
      cartCount: cartIds.length,
      viewedCount: recent.length,
      purchasedCount: purchased.length,
      hasAnySignal: favorites.length + cartIds.length + recent.length + purchased.length > 0,
    };

    let recs = scoreProducts(seedTags, exclude);
    let isFallback = false;

    // Fallback: surface top-selling for new visitors
    if (recs.length === 0) {
      isFallback = true;
      recs = [...PRODUCTS]
        .filter(p => p.topSelling)
        .sort((a, b) => b.salesCount - a.salesCount)
        .slice(0, 4);
    }

    return { recommended: recs, signals: sig, fallback: isFallback };
  }, [favorites, cartIds, recent, purchased]);

  // Track impression once when recs render
  useEffect(() => {
    if (recommended.length === 0) return;
    trackEvent("personalized_picks_impression", {
      placement: "homepage",
      fallback,
      productIds: recommended.map(p => p.id),
      signals,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fallback]);

  if (recommended.length === 0) return null;

  const handleClick = (product: Product) => {
    trackEvent("personalized_picks_click", {
      placement: "homepage",
      productSlug: product.slug,
      fallback,
    });
  };

  const headline = fallback
    ? "Trending Prototypes"
    : signals.wishlistCount > 0 || signals.cartCount > 0
      ? "Picked Just For You"
      : "Based on What You've Browsed";

  const subline = fallback
    ? "The most-loved SaaS prototypes from our catalog — start shipping today."
    : "Curated from your wishlist, cart, and recent activity. Updated in real-time.";

  return (
    <section className="py-20 lg:py-28 section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {fallback ? "Editor's picks" : "Personalized for you"}
            </div>
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-2">
              {headline.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="gradient-text">{headline.split(" ").slice(-1)}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">{subline}</p>
          </div>

          {!fallback && signals.hasAnySignal && (
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {signals.wishlistCount > 0 && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card border border-border">
                  <Heart className="w-3 h-3 text-destructive" /> {signals.wishlistCount} saved
                </span>
              )}
              {signals.cartCount > 0 && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card border border-border">
                  <ShoppingCart className="w-3 h-3 text-primary" /> {signals.cartCount} in cart
                </span>
              )}
              {signals.viewedCount > 0 && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card border border-border">
                  <Eye className="w-3 h-3 text-accent" /> {signals.viewedCount} viewed
                </span>
              )}
              {signals.purchasedCount > 0 && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card border border-border">
                  <Package className="w-3 h-3 text-primary" /> {signals.purchasedCount} owned
                </span>
              )}
            </div>
          )}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recommended.map((p, i) => {
            const price = currency === "inr" ? `₹${p.price.inr.toLocaleString()}` : `$${p.price.usd}`;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/products/${p.slug}`}
                  onClick={() => handleClick(p)}
                  className="group block rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <div className="aspect-video bg-muted overflow-hidden relative">
                    <img
                      src={p.previewImage}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    {p.topSelling && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold">
                        🔥 Top
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-poppins font-semibold text-sm text-foreground mb-1 truncate">{p.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2 min-h-[32px]">{p.shortDesc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-primary">{price}</span>
                      <span className="text-xs text-muted-foreground group-hover:text-primary flex items-center gap-1 transition-colors">
                        View <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link to="/products" className="btn-secondary">
            Browse all prototypes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Helper exported for product detail pages to record browsing history.
 * Call this on ProductDetail mount to feed the recommendation engine.
 */
export function recordProductView(productId: string) {
  try {
    const current = getRecentlyViewed().filter(id => id !== productId);
    const next = [productId, ...current].slice(0, MAX_RECENTLY_VIEWED);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}
