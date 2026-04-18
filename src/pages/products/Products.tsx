import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, Globe, Search, X, ShoppingCart, ArrowUpDown, LayoutDashboard, BookOpen, Sparkles } from "lucide-react";
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
import ProductCard from "@/components/products/ProductCard";
import MarketplacePricing from "@/components/products/MarketplacePricing";
import TrustSection from "@/components/products/TrustSection";
import ProductsFAQ from "@/components/products/ProductsFAQ";
import FinalCTA from "@/components/products/FinalCTA";
import CartDrawer from "@/components/products/CartDrawer";
import CheckoutModal from "@/components/products/CheckoutModal";
import ProductQuickView from "@/components/products/ProductQuickView";
import ProductCompare from "@/components/products/ProductCompare";
import BundleProgressBar from "@/components/products/BundleProgressBar";
import type { Product } from "@/data/products";
import type { Currency } from "@/config/appConfig";

type SortOption = "popular" | "price-low" | "price-high" | "name-az" | "name-za";

function filterProducts(products: Product[], search: string, tags: string[]) {
  return products.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.shortDesc.toLowerCase().includes(search.toLowerCase());
    const matchTags = tags.length === 0 || tags.some(t => p.tags.includes(t));
    return matchSearch && matchTags;
  });
}

function sortProducts(products: Product[], sort: SortOption, currency: Currency) {
  const sorted = [...products];
  switch (sort) {
    case "popular": return sorted.sort((a, b) => b.salesCount - a.salesCount);
    case "price-low": return sorted.sort((a, b) => (currency === "inr" ? a.price.inr - b.price.inr : a.price.usd - b.price.usd));
    case "price-high": return sorted.sort((a, b) => (currency === "inr" ? b.price.inr - a.price.inr : b.price.usd - a.price.usd));
    case "name-az": return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-za": return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default: return sorted;
  }
}

const TAG_OPTIONS = [
  "analytics", "ai", "crm", "ecommerce", "healthcare", "finance",
  "education", "fitness", "booking", "delivery", "saas", "mobile",
  "dashboard", "productivity", "wellness",
];

export default function Products() {
  const { currency } = useGeoDetection();
  const { topSelling, mobileApps, webSaas, isPurchased, purchase, purchased, products, grantAllAccess } = useProducts();
  const wishlist = useWishlist();
  const cart = useCart();
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("popular");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);

  // Get last purchased product
  const lastPurchased = useMemo(() => {
    try {
      const sales = JSON.parse(localStorage.getItem("ak-sales") || "[]");
      if (sales.length === 0) return null;
      const last = sales[sales.length - 1];
      const product = products.find(p => p.id === last.id);
      if (!product) return null;
      return { product, date: last.date };
    } catch { return null; }
  }, [products, purchased]);

  // SEO handled by SEOHead component

  const toggleTag = (tag: string) =>
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const filteredWebSaas = useMemo(() => sortProducts(filterProducts(webSaas, search, selectedTags), sort, currency), [webSaas, search, selectedTags, sort, currency]);
  const filteredMobileApps = useMemo(() => sortProducts(filterProducts(mobileApps, search, selectedTags), sort, currency), [mobileApps, search, selectedTags, sort, currency]);

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
    // Add top 5 products to cart for Pro Bundle pricing
    const top5 = topSelling.slice(0, 5);
    top5.forEach(p => {
      if (!isPurchased(p.id)) cart.addToCart(p.id, false);
    });
    cart.setOpen(true);
    toast.success("5 top-selling prototypes added to cart!");
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

  return (
    <>
      <SEOHead title="SaaS Prototypes" description="40+ production-ready SaaS prototypes for $19. CRM, dashboards, mobile apps & more. Launch in days, not months." path="/products" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }} />
      <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* HERO */}
        <PersonalizedHero />

        {/* SOLUTION */}
        <SolutionSection />

        {/* TOP SELLING */}
        <TopSellingSection products={topSelling} currency={currency} isPurchased={isPurchased} onPurchase={handleBuy} onAddToCart={handleAddToCartSilent} />

        {/* PRODUCT CATALOG */}
        <div id="products-catalog" className="mt-16">
          <div className="text-center mb-8">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-3">
              Browse All <span className="gradient-text">Prototypes</span>
            </h2>
            <p className="text-muted-foreground">40+ ready-made SaaS and mobile app prototypes</p>
          </div>

          {/* Search, Sort & Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex items-center gap-3 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search prototypes..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
                <SelectTrigger className="w-44 rounded-xl">
                  <ArrowUpDown className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low → High</SelectItem>
                  <SelectItem value="price-high">Price: High → Low</SelectItem>
                  <SelectItem value="name-az">Name: A → Z</SelectItem>
                  <SelectItem value="name-za">Name: Z → A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {TAG_OPTIONS.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {tag}
                </button>
              ))}
              {selectedTags.length > 0 && (
                <button onClick={() => setSelectedTags([])} className="px-3 py-1 rounded-full text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors">
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs defaultValue="web-saas">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-4">
              <TabsTrigger value="web-saas" className="gap-2">
                <Globe className="w-4 h-4" /> Web SaaS
              </TabsTrigger>
              <TabsTrigger value="mobile-app" className="gap-2">
                <Smartphone className="w-4 h-4" /> Mobile App
              </TabsTrigger>
            </TabsList>

            {/* Toolbar below tabs */}
            <div className="flex items-center gap-3 mb-8 p-3 rounded-2xl border border-border bg-card">
              <Link to="/my-purchases" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                <LayoutDashboard className="w-4 h-4" /> My Purchases
                {purchased.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary-foreground/20 text-[10px] font-bold">{purchased.length}</span>
                )}
              </Link>
              <Link to="/guide" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors">
                <BookOpen className="w-4 h-4" /> Guide
              </Link>
              <div className="ml-auto flex items-center gap-3">
                {purchased.length > 0 && (
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    You own {purchased.length} prototype{purchased.length > 1 ? "s" : ""}
                  </span>
                )}
                <button
                  onClick={() => cart.setOpen(true)}
                  className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-background text-foreground text-sm font-medium hover:bg-muted transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">Cart</span>
                  {cart.totalCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                      {cart.totalCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <TabsContent value="web-saas">
              {filteredWebSaas.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">No prototypes match your filters.</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredWebSaas.map(p => (
                    <ProductCard key={p.id} product={p} currency={currency} isPurchased={isPurchased(p.id)} cartQuantity={cart.getQuantity(p.id)} isFavorite={wishlist.isFavorite(p.id)} isComparing={compareList.includes(p.id)} bundleActive={cart.isBundle} onPurchase={handleBuy} onAddToCart={handleAddToCartSilent} onQuickView={handleQuickView} onToggleFavorite={handleToggleFavorite} onToggleCompare={handleToggleCompare} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="mobile-app">
              {filteredMobileApps.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">No prototypes match your filters.</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMobileApps.map(p => (
                    <ProductCard key={p.id} product={p} currency={currency} isPurchased={isPurchased(p.id)} cartQuantity={cart.getQuantity(p.id)} isFavorite={wishlist.isFavorite(p.id)} isComparing={compareList.includes(p.id)} bundleActive={cart.isBundle} onPurchase={handleBuy} onAddToCart={handleAddToCartSilent} onQuickView={handleQuickView} onToggleFavorite={handleToggleFavorite} onToggleCompare={handleToggleCompare} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* COMPARISON */}
        <ComparisonSection />

        {/* SAVINGS */}
        <SavingsSection />

        {/* USE CASES */}
        <UseCasesSection />

        {/* MARKETPLACE PRICING */}
        <MarketplacePricing onAddAllToCart={handleAddAllToCart} onAddBundleToCart={handleAddBundleToCart} />

        {/* TRUST SECTION */}
        <TrustSection />

        {/* FAQ — SEO */}
        <ProductsFAQ />

        {/* FINAL CTA */}
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
        />
      </div>
    </main>
    </>
  );
}
