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

  const handleCheckout = () => {
    cart.setOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <>
      <SEOHead title="SaaS Prototypes" description="40+ production-ready SaaS prototypes for $19. CRM, dashboards, mobile apps & more. Launch in days, not months." path="/products" />
      <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Purchased user quick-access bar */}
        {purchased.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 mb-8 p-4 rounded-2xl border border-border bg-card">
            <span className="text-sm font-medium text-muted-foreground mr-auto">
              You own {purchased.length} prototype{purchased.length > 1 ? "s" : ""}
            </span>
            <Link to="/my-purchases" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              <LayoutDashboard className="w-4 h-4" /> My Dashboard
            </Link>
            <Link to="/guide" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted text-foreground text-sm font-semibold hover:bg-muted/80 transition-colors">
              <BookOpen className="w-4 h-4" /> Guide
            </Link>
          </div>
        )}

        {/* Recently Purchased Banner */}
        {lastPurchased && !bannerDismissed && (
          <div className="flex flex-wrap items-center gap-3 mb-8 p-4 rounded-2xl border border-primary/20 bg-primary/5">
            <Sparkles className="w-5 h-5 text-primary shrink-0" />
            <span className="text-sm text-foreground mr-auto">
              <strong>Recently purchased:</strong> {lastPurchased.product.name} —{" "}
              <Link to="/my-purchases" className="text-primary underline underline-offset-2 hover:text-primary/80">
                Go to Dashboard →
              </Link>
            </span>
            <button onClick={() => setBannerDismissed(true)} className="p-1 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* HERO */}
        <PersonalizedHero />

        {/* SOLUTION */}
        <SolutionSection />

        {/* TOP SELLING */}
        <TopSellingSection products={topSelling} currency={currency} isPurchased={isPurchased} onPurchase={handleBuy} onAddToCart={handleAddToCartSilent} />

        {/* FLOATING CART BUTTON */}
        {cart.totalCount > 0 && (
          <button
            onClick={() => cart.setOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="font-semibold">{cart.totalCount}</span>
          </button>
        )}

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
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
              <TabsTrigger value="web-saas" className="gap-2">
                <Globe className="w-4 h-4" /> Web SaaS
              </TabsTrigger>
              <TabsTrigger value="mobile-app" className="gap-2">
                <Smartphone className="w-4 h-4" /> Mobile App
              </TabsTrigger>
            </TabsList>

            <TabsContent value="web-saas">
              {filteredWebSaas.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">No prototypes match your filters.</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredWebSaas.map(p => (
                    <ProductCard key={p.id} product={p} currency={currency} isPurchased={isPurchased(p.id)} cartQuantity={cart.getQuantity(p.id)} isFavorite={wishlist.isFavorite(p.id)} onPurchase={handleBuy} onAddToCart={handleAddToCartSilent} onQuickView={handleQuickView} onToggleFavorite={handleToggleFavorite} />
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
                    <ProductCard key={p.id} product={p} currency={currency} isPurchased={isPurchased(p.id)} cartQuantity={cart.getQuantity(p.id)} isFavorite={wishlist.isFavorite(p.id)} onPurchase={handleBuy} onAddToCart={handleAddToCartSilent} onQuickView={handleQuickView} onToggleFavorite={handleToggleFavorite} />
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
        <MarketplacePricing />

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
        />

        <CheckoutModal
          open={checkoutOpen}
          onOpenChange={setCheckoutOpen}
          items={cart.items}
          currency={currency}
          total={cart.getTotal(currency)}
          onComplete={() => {
            // If bundle (5+ items), grant all access to all files
            if (cart.isBundle) {
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
      </div>
    </main>
    </>
  );
}
