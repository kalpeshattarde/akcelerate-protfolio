import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, Globe, Search, X, ShoppingCart, ArrowUpDown } from "lucide-react";
import { useGeoDetection } from "@/hooks/useGeoDetection";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import PersonalizedHero from "@/components/products/PersonalizedHero";
import TopSellingSection from "@/components/products/TopSellingSection";
import ProductCard from "@/components/products/ProductCard";
import UpsellBanner from "@/components/products/UpsellBanner";
import CartDrawer from "@/components/products/CartDrawer";
import CheckoutModal from "@/components/products/CheckoutModal";
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
  const { topSelling, mobileApps, webSaas, isPurchased, purchase } = useProducts();
  const cart = useCart();
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("popular");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const toggleTag = (tag: string) =>
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const filteredWebSaas = useMemo(() => sortProducts(filterProducts(webSaas, search, selectedTags), sort, currency), [webSaas, search, selectedTags, sort, currency]);
  const filteredMobileApps = useMemo(() => sortProducts(filterProducts(mobileApps, search, selectedTags), sort, currency), [mobileApps, search, selectedTags, sort, currency]);

  const handleBuy = (id: string) => { purchase(id); };

  const handleCheckout = () => {
    cart.setOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PersonalizedHero />

        {cart.totalCount > 0 && (
          <button
            onClick={() => cart.setOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="font-semibold">{cart.totalCount}</span>
          </button>
        )}

        <TopSellingSection products={topSelling} currency={currency} isPurchased={isPurchased} onPurchase={handleBuy} onAddToCart={cart.addToCart} />

        {/* Search, Sort & Filters */}
        <div className="mt-12 mb-6 space-y-4">
          <div className="flex items-center gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
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
              <p className="text-center text-muted-foreground py-12">No products match your filters.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWebSaas.map(p => (
                  <ProductCard key={p.id} product={p} currency={currency} isPurchased={isPurchased(p.id)} onPurchase={handleBuy} onAddToCart={cart.addToCart} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="mobile-app">
            {filteredMobileApps.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">No products match your filters.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMobileApps.map(p => (
                  <ProductCard key={p.id} product={p} currency={currency} isPurchased={isPurchased(p.id)} onPurchase={handleBuy} onAddToCart={cart.addToCart} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <UpsellBanner />

        <CartDrawer
          open={cart.open}
          onOpenChange={cart.setOpen}
          items={cart.items}
          currency={currency}
          total={cart.getTotal(currency)}
          onUpdateQuantity={cart.updateQuantity}
          onRemove={cart.removeFromCart}
          onClear={cart.clearCart}
          onCheckout={handleCheckout}
        />

        <CheckoutModal
          open={checkoutOpen}
          onOpenChange={setCheckoutOpen}
          items={cart.items}
          currency={currency}
          total={cart.getTotal(currency)}
          onComplete={() => {
            cart.items.forEach(i => purchase(i.product.id));
            cart.clearCart();
            setCheckoutOpen(false);
          }}
        />
      </div>
    </main>
  );
}
