import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, Globe, Search, X, ShoppingCart, ArrowUpDown, LayoutDashboard, BookOpen } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Product } from "@/data/products";
import type { Currency } from "@/config/appConfig";

type SortOption = "popular" | "price-low" | "price-high" | "name-az" | "name-za";

const TAG_OPTIONS = [
  "analytics", "ai", "crm", "ecommerce", "healthcare", "finance",
  "education", "fitness", "booking", "delivery", "saas", "mobile",
  "dashboard", "productivity", "wellness",
];

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

interface Props {
  webSaas: Product[];
  mobileApps: Product[];
  currency: Currency;
  isPurchased: (id: string) => boolean;
  purchasedCount: number;
  cart: {
    isInCart: (id: string) => boolean;
    getQuantity: (id: string) => number;
    isBundle: boolean;
    totalCount: number;
    setOpen: (open: boolean) => void;
  };
  wishlist: { isFavorite: (id: string) => boolean };
  compareList: string[];
  onPurchase: (id: string) => void;
  onAddToCart: (id: string) => void;
  onQuickView: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (id: string) => void;
}

export default function CatalogSection({
  webSaas, mobileApps, currency, isPurchased, purchasedCount,
  cart, wishlist, compareList,
  onPurchase, onAddToCart, onQuickView, onToggleFavorite, onToggleCompare,
}: Props) {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("popular");

  const toggleTag = (tag: string) =>
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const filteredWebSaas = useMemo(() => sortProducts(filterProducts(webSaas, search, selectedTags), sort, currency), [webSaas, search, selectedTags, sort, currency]);
  const filteredMobileApps = useMemo(() => sortProducts(filterProducts(mobileApps, search, selectedTags), sort, currency), [mobileApps, search, selectedTags, sort, currency]);

  return (
    <div id="products-catalog" className="mt-16">
      <div className="text-center mb-8">
        <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-3">
          Browse All <span className="gradient-text">Prototypes</span>
        </h2>
        <p className="text-muted-foreground">40+ ready-made SaaS and mobile app prototypes</p>
      </div>

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

      <Tabs defaultValue="web-saas">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-4">
          <TabsTrigger value="web-saas" className="gap-2">
            <Globe className="w-4 h-4" /> Web SaaS
          </TabsTrigger>
          <TabsTrigger value="mobile-app" className="gap-2">
            <Smartphone className="w-4 h-4" /> Mobile App
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-3 mb-8 p-3 rounded-2xl border border-border bg-card">
          <Link to="/my-purchases" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
            <LayoutDashboard className="w-4 h-4" /> My Purchases
            {purchasedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary-foreground/20 text-[10px] font-bold">{purchasedCount}</span>
            )}
          </Link>
          <Link to="/guide" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors">
            <BookOpen className="w-4 h-4" /> Guide
          </Link>
          <div className="ml-auto flex items-center gap-3">
            {purchasedCount > 0 && (
              <span className="text-xs text-muted-foreground hidden sm:block">
                You own {purchasedCount} prototype{purchasedCount > 1 ? "s" : ""}
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
                <ProductCard key={p.id} product={p} currency={currency} isPurchased={isPurchased(p.id)} cartQuantity={cart.getQuantity(p.id)} isFavorite={wishlist.isFavorite(p.id)} isComparing={compareList.includes(p.id)} bundleActive={cart.isBundle} onPurchase={onPurchase} onAddToCart={onAddToCart} onQuickView={onQuickView} onToggleFavorite={onToggleFavorite} onToggleCompare={onToggleCompare} />
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
                <ProductCard key={p.id} product={p} currency={currency} isPurchased={isPurchased(p.id)} cartQuantity={cart.getQuantity(p.id)} isFavorite={wishlist.isFavorite(p.id)} isComparing={compareList.includes(p.id)} bundleActive={cart.isBundle} onPurchase={onPurchase} onAddToCart={onAddToCart} onQuickView={onQuickView} onToggleFavorite={onToggleFavorite} onToggleCompare={onToggleCompare} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
