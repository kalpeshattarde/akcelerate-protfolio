import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Flame, ArrowRight, PackageSearch } from "lucide-react";
import type { Product } from "@/data/products";
import type { Currency } from "@/config/appConfig";
import ProductCard from "./ProductCard";
import { trackEvent } from "@/lib/analytics";

interface TopSellingSectionProps {
  products: Product[];
  currency: Currency;
  isPurchased: (id: string) => boolean;
  onPurchase?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  /** Render skeleton placeholders. */
  loading?: boolean;
  /** Hide the "View all" link (used on the dedicated page). */
  hideViewAll?: boolean;
}

// Module-level set so impressions are deduped across renders, route transitions,
// and even unmount/remount of the section within the same page session.
const SESSION_KEY = "ak-top-selling-pageview";
const firedImpressions = new Set<string>();

function getPageviewId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = `pv_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "pv_default";
  }
}

if (typeof window !== "undefined") {
  // Reset the dedupe set when the user fully reloads (new pageview id).
  // SPA navigation reuses the same session id so cards aren't re-counted.
  window.addEventListener("pageshow", (e) => {
    if ((e as PageTransitionEvent).persisted) {
      firedImpressions.clear();
    }
  });
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-muted" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-3/4 bg-muted rounded" />
        <div className="h-3 w-full bg-muted rounded" />
        <div className="h-3 w-5/6 bg-muted rounded" />
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="h-9 bg-muted rounded-lg" />
          <div className="h-9 bg-muted rounded-lg" />
          <div className="h-9 bg-muted rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function TopSellingSection({
  products,
  currency,
  isPurchased,
  onPurchase,
  onAddToCart,
  loading = false,
  hideViewAll = false,
}: TopSellingSectionProps) {
  // Always exactly 3
  const top = products.slice(0, 3);

  // Fire impression events once per (pageview × productId × rank)
  useEffect(() => {
    if (loading || top.length === 0) return;
    const pv = getPageviewId();
    top.forEach((p, idx) => {
      const rank = idx + 1;
      const key = `${pv}:${p.id}:${rank}`;
      if (firedImpressions.has(key)) return;
      firedImpressions.add(key);
      trackEvent("top_selling_impression", {
        productId: p.id,
        product: p.name,
        rank,
        pageviewId: pv,
      });
    });
  }, [top, loading]);

  return (
    <section className="mb-12" aria-labelledby="top-selling-heading">
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <div className="flex items-center gap-2">
          <Flame className="w-6 h-6 text-primary" aria-hidden="true" />
          <h2 id="top-selling-heading" className="font-poppins text-2xl font-bold text-foreground">
            Top Selling Products
          </h2>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-primary/10 text-primary">
            Top 3
          </span>
        </div>
        {!hideViewAll && !loading && top.length > 0 && (
          <Link
            to="/top-selling"
            onClick={() =>
              trackEvent("top_selling_view_all_click", { count: top.length })
            }
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : top.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center">
          <PackageSearch className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-poppins font-semibold text-foreground mb-1">
            No top sellers yet
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Once products start ranking, the three best-selling SaaS prototypes will appear here.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {top.map((p, idx) => {
            const rank = idx + 1;
            return (
              <div
                key={p.id}
                onClickCapture={() =>
                  trackEvent("top_selling_card_click", {
                    productId: p.id,
                    product: p.name,
                    rank,
                  })
                }
              >
                <ProductCard
                  product={p}
                  currency={currency}
                  isPurchased={isPurchased(p.id)}
                  onPurchase={onPurchase}
                  onAddToCart={onAddToCart}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
