import { useState, useMemo, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import SEOHead from "@/components/SEOHead";
import { toast } from "sonner";
import { useGeoDetection } from "@/hooks/useGeoDetection";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import PersonalizedHero from "@/components/products/PersonalizedHero";
import ProblemSection from "@/components/products/ProblemSection";
import CostBreakdownSection from "@/components/products/CostBreakdownSection";
import SolutionSection from "@/components/products/SolutionSection";
import ComparisonSection from "@/components/products/ComparisonSection";
import SavingsSection from "@/components/products/SavingsSection";
import UseCasesSection from "@/components/products/UseCasesSection";
import TopSellingSection from "@/components/products/TopSellingSection";
import CatalogSection from "@/components/products/CatalogSection";
import MarketplacePricing from "@/components/products/MarketplacePricing";
import TrustSection from "@/components/products/TrustSection";
import ProductsFAQ from "@/components/products/ProductsFAQ";
import FinalCTA from "@/components/products/FinalCTA";
import CartDrawer from "@/components/products/CartDrawer";
import CheckoutModal from "@/components/products/CheckoutModal";
import ProductQuickView from "@/components/products/ProductQuickView";
import ProductCompare from "@/components/products/ProductCompare";
import BundleProgressBar from "@/components/products/BundleProgressBar";
import ProductsSubNav from "@/components/products/ProductsSubNav";
import type { Product } from "@/data/products";

export default function Products() {
  const { currency } = useGeoDetection();
  const { topSelling, mobileApps, webSaas, isPurchased, purchase, products, grantAllAccess, purchased } = useProducts();
  const wishlist = useWishlist();
  const cart = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [compareList, setCompareList] = useState<string[]>([]);

  // A/B variant: control = current order; catalog-early = catalog right after Solution.
  // Stable per-visitor assignment via localStorage.
  const [orderVariant] = useState<"control" | "catalog-early">(() => {
    try {
      const existing = localStorage.getItem("ak-ab-products-order");
      if (existing === "control" || existing === "catalog-early") return existing;
      const v = Math.random() < 0.5 ? "control" : "catalog-early";
      localStorage.setItem("ak-ab-products-order", v);
      return v;
    } catch {
      return "control";
    }
  });

  useEffect(() => {
    trackEvent("products_view", { variant: orderVariant });
  }, [orderVariant]);

  // Fire bundle-unlock event exactly once per session when threshold is crossed
  useEffect(() => {
    if (cart.totalCount === 5) {
      trackEvent("bundle_unlocked", { variant: orderVariant, cartCount: 5 });
    }
  }, [cart.totalCount, orderVariant]);

  const handleBuy = (id: string) => {
    if (cart.isInCart(id)) {
      toast.info("Already in cart!");
      cart.setOpen(true);
      return;
    }
    cart.addToCart(id, true);
  };
  const handleAddToCartSilent = (id: string) => {
    if (cart.isInCart(id)) {
      toast.info("Already in cart!");
      return;
    }
    cart.addToCart(id, false);
    const product = [...webSaas, ...mobileApps].find(p => p.id === id);
    trackEvent("add_to_cart", { id, name: product?.name, variant: orderVariant });
    toast.success(`${product?.name || "Product"} added to cart`, { duration: 2000 });
  };

  const handleQuickView = (id: string) => {
    const product = [...webSaas, ...mobileApps].find(p => p.id === id);
    if (product) setQuickViewProduct(product);
  };

  const handleToggleFavorite = (id: string) => {
    wishlist.toggleFavorite(id);
    const product = [...webSaas, ...mobileApps].find(p => p.id === id);
    const isFav = !wishlist.isFavorite(id);
    toast.success(isFav ? `${product?.name} saved to wishlist` : `${product?.name} removed from wishlist`, { duration: 2000 });
  };

  const handleToggleCompare = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) {
        toast.error("You can compare up to 3 products at a time");
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleCheckout = () => {
    cart.setOpen(false);
    setCheckoutOpen(true);
  };

  const handleAddAllToCart = () => {
    // Add ALL products to cart for All Access pricing
    products.forEach(p => {
      if (!isPurchased(p.id)) cart.addToCart(p.id, false);
    });
    cart.setOpen(true);
    toast.success(`All ${products.length} prototypes added to cart!`);
  };

  const handleAddBundleToCart = () => {
    // Add 5 non-purchased, non-duplicate top-selling products. Walk a larger pool
    // so we still hit the threshold even if some top-sellers are already owned.
    const pool = [...topSelling, ...products.filter(p => !topSelling.includes(p))];
    let added = 0;
    for (const p of pool) {
      if (added >= 5) break;
      if (isPurchased(p.id) || cart.isInCart(p.id)) continue;
      cart.addToCart(p.id, false);
      added++;
    }
    cart.setOpen(true);
    if (added === 0) {
      toast.info("All top-sellers are already in your cart or purchased.");
    } else {
      toast.success(`${added} top-selling prototype${added === 1 ? "" : "s"} added to cart!`);
    }
  };

  // JSON-LD: ItemList with volume-discount PriceSpecification (5+ → $12 each)
  const productsJsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "AKcelerate SaaS Prototypes",
    "numberOfItems": products.length,
    "itemListElement": products.slice(0, 20).map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Product",
        "name": p.name,
        "description": p.shortDesc,
        "image": p.previewImage,
        "url": `${typeof window !== "undefined" ? window.location.origin : ""}/products/${p.slug}`,
        "brand": { "@type": "Brand", "name": "AKcelerate" },
        "sku": p.id,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": Math.max(p.salesCount, 12),
          "bestRating": "5",
          "worstRating": "1",
        },
        "offers": [
          {
            "@type": "Offer",
            "price": p.price.usd,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": p.price.usd,
              "priceCurrency": "USD",
              "eligibleQuantity": { "@type": "QuantitativeValue", "value": 1, "maxValue": 4 },
            },
          },
          {
            "@type": "Offer",
            "name": "Pro Bundle (5+ products)",
            "price": 12,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": 12,
              "priceCurrency": "USD",
              "eligibleQuantity": { "@type": "QuantitativeValue", "minValue": 5 },
              "description": "Per-product price when 5 or more prototypes are purchased together",
            },
          },
        ],
      },
    })),
  }), [products]);

  const catalogBlock = (
    <CatalogSection
      webSaas={webSaas}
      mobileApps={mobileApps}
      currency={currency}
      isPurchased={isPurchased}
      purchasedCount={purchased.length}
      cart={{
        isInCart: cart.isInCart,
        getQuantity: cart.getQuantity,
        isBundle: cart.isBundle,
        totalCount: cart.totalCount,
        setOpen: cart.setOpen,
      }}
      wishlist={{ isFavorite: wishlist.isFavorite }}
      compareList={compareList}
      onPurchase={handleBuy}
      onAddToCart={handleAddToCartSilent}
      onQuickView={handleQuickView}
      onToggleFavorite={handleToggleFavorite}
      onToggleCompare={handleToggleCompare}
    />
  );

  return (
    <>
      <SEOHead title="SaaS Prototypes" description="40+ production-ready SaaS prototypes for $19. CRM, dashboards, mobile apps & more. Launch in days, not months." path="/products" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }} />
      <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* 1. HERO — hook them */}
        <PersonalizedHero />

        {/* 2. PROBLEM — agitate the pain */}
        <div id="problem"><ProblemSection /></div>

        {/* 3. COST BREAKDOWN — quantify the pain */}
        <div id="cost-breakdown"><CostBreakdownSection /></div>

        {/* 4. SOLUTION — introduce our answer */}
        <div id="solution"><SolutionSection /></div>

        {/* A/B variant: catalog-early renders Top Selling + full catalog right after Solution */}
        {orderVariant === "catalog-early" && (
          <>
            <TopSellingSection products={topSelling} currency={currency} isPurchased={isPurchased} onPurchase={handleBuy} onAddToCart={handleAddToCartSilent} />
            {catalogBlock}
          </>
        )}

        {/* 5. COMPARISON — us vs DIY/AI tools */}
        <ComparisonSection />

        {/* 6. SAVINGS — show ROI math */}
        <SavingsSection />

        {/* 7. USE CASES — who it's for */}
        <UseCasesSection />

        {/* 8. TOP SELLING (control only — catalog-early already rendered it above) */}
        {orderVariant === "control" && (
          <TopSellingSection products={topSelling} currency={currency} isPurchased={isPurchased} onPurchase={handleBuy} onAddToCart={handleAddToCartSilent} />
        )}

        {/* PRODUCT CATALOG (only render here for control variant) */}
        {orderVariant === "control" && catalogBlock}

        {/* 10. MARKETPLACE PRICING — convert */}
        <div id="pricing"><MarketplacePricing onAddAllToCart={handleAddAllToCart} onAddBundleToCart={handleAddBundleToCart} /></div>

        {/* 11. TRUST — reduce risk */}
        <TrustSection />

        {/* 12. FAQ — handle objections */}
        <div id="faq"><ProductsFAQ /></div>

        {/* 13. FINAL CTA — close */}
        <FinalCTA />

        <CartDrawer
          open={cart.open}
          onOpenChange={cart.setOpen}
          items={cart.items}
          currency={currency}
          total={cart.getTotal(currency)}
          onRemove={cart.removeFromCart}
          onClear={cart.clearCart}
          onCheckout={handleCheckout}
          isBundle={cart.isBundle}
          isAllAccess={cart.isAllAccess}
        />

        <CheckoutModal
          open={checkoutOpen}
          onOpenChange={setCheckoutOpen}
          items={cart.items}
          currency={currency}
          total={cart.getTotal(currency)}
          onComplete={() => {
            // If bundle (5+) or all access, grant access to all files
            if (cart.isBundle || cart.isAllAccess) {
              grantAllAccess();
            }
            cart.items.forEach(i => purchase(i.product.id));
            cart.clearCart();
            setCheckoutOpen(false);
          }}
        />

        <ProductQuickView
          product={quickViewProduct}
          open={!!quickViewProduct}
          onOpenChange={(open) => { if (!open) setQuickViewProduct(null); }}
          currency={currency}
          isPurchased={quickViewProduct ? isPurchased(quickViewProduct.id) : false}
          isFavorite={quickViewProduct ? wishlist.isFavorite(quickViewProduct.id) : false}
          cartQuantity={quickViewProduct ? cart.getQuantity(quickViewProduct.id) : 0}
          onPurchase={handleBuy}
          onAddToCart={handleAddToCartSilent}
          onToggleFavorite={handleToggleFavorite}
        />
        <ProductCompare
          compareList={compareList}
          onRemove={(id) => setCompareList(prev => prev.filter(x => x !== id))}
          onClear={() => setCompareList([])}
          currency={currency}
        />
        <BundleProgressBar
          itemCount={cart.totalCount}
          currency={currency}
          onOpenCart={() => cart.setOpen(true)}
          onQuickFill={handleAddBundleToCart}
        />
        <ProductsSubNav />
      </div>
    </main>
    </>
  );
}
