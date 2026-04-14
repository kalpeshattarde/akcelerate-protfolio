import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Globe, Search, X, ShoppingCart } from "lucide-react";
import { useGeoDetection } from "@/hooks/useGeoDetection";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import PersonalizedHero from "@/components/products/PersonalizedHero";
import TopSellingSection from "@/components/products/TopSellingSection";
import ProductCard from "@/components/products/ProductCard";
import UpsellBanner from "@/components/products/UpsellBanner";
import CartDrawer from "@/components/products/CartDrawer";
import type { Product } from "@/data/products";

function filterProducts(products: Product[], search: string, tags: string[]) {
  return products.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.shortDesc.toLowerCase().includes(search.toLowerCase());
    const matchTags = tags.length === 0 || tags.some(t => p.tags.includes(t));
    return matchSearch && matchTags;
  });
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

  const toggleTag = (tag: string) =>
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const filteredWebSaas = useMemo(() => filterProducts(webSaas, search, selectedTags), [webSaas, search, selectedTags]);
  const filteredMobileApps = useMemo(() => filterProducts(mobileApps, search, selectedTags), [mobileApps, search, selectedTags]);

  const handleBuy = (id: string) => {
    purchase(id);
  };

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PersonalizedHero />

        {/* Floating cart button */}
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

        {/* Search & Filters */}
        <div className="mt-12 mb-6 space-y-4">
          <div className="relative max-w-md mx-auto">
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
        />
      </div>
    </main>
  );
}
