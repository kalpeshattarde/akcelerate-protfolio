import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useGeoDetection } from "@/hooks/useGeoDetection";
import { PRODUCTS } from "@/data/products";
import {
  Package, Download, ExternalLink, ShoppingBag, Loader2, Clock,
  Receipt, ChevronDown, ChevronUp, BookOpen, Layers, Tag, Calendar,
  CheckCircle2, FileCode, ArrowRight, Search, X, Mail
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState, useMemo } from "react";
import { downloadProductFile } from "@/lib/downloadProduct";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";

interface Order {
  orderId: string;
  date: string;
  items: { name: string; id: string; quantity: number }[];
  subtotal: number;
  discount: { code: string; percent: number } | null;
  total: number;
  currency: string;
  status: string;
  paymentMethod: string;
}

function getOrders(): Order[] {
  try {
    return JSON.parse(localStorage.getItem("ak-orders") || "[]");
  } catch { return []; }
}

function getPurchaseDate(productId: string, orders: Order[]): string | null {
  for (const order of orders) {
    if (order.items.some(item => item.id === productId)) {
      return order.date;
    }
  }
  // Check sales log fallback
  try {
    const sales = JSON.parse(localStorage.getItem("ak-sales") || "[]");
    const sale = sales.find((s: any) => s.id === productId);
    if (sale?.date) return sale.date;
  } catch {}
  return null;
}

export default function MyPurchases() {
  const { isSignedIn, isLoaded, user } = useUser();
  const { isPurchased } = useProducts();
  const { currency } = useGeoDetection();
  const [downloading, setDownloading] = useState<string | null>(null);
  const [emailing, setEmailing] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [filter, setFilter] = useState<"all" | "mobile-app" | "web-saas">("all");
  const [search, setSearch] = useState("");

  const purchasedProducts = PRODUCTS.filter(p => isPurchased(p.id));
  const symbol = currency === "inr" ? "₹" : "$";
  const orders = getOrders();

  const filteredProducts = useMemo(() => {
    let result = filter === "all"
      ? purchasedProducts
      : purchasedProducts.filter(p => p.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [purchasedProducts, filter, search]);

  const mobileCount = purchasedProducts.filter(p => p.category === "mobile-app").length;
  const saasCount = purchasedProducts.filter(p => p.category === "web-saas").length;
  const totalSpent = useMemo(() => {
    return purchasedProducts.reduce((sum, p) => sum + (currency === "inr" ? p.price.inr : p.price.usd), 0);
  }, [purchasedProducts, currency]);

  if (!isLoaded) {
    return (
      <main className="pt-28 pb-20 text-center">
        <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
      </main>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const handleDownload = async (product: typeof PRODUCTS[0]) => {
    setDownloading(product.id);
    const result = await downloadProductFile(product.slug, product.name, product.features);
    setDownloading(null);

    if (result.fallback) {
      toast({
        title: "README downloaded",
        description: `Full source code for ${product.name} will be delivered to your email shortly.`,
      });
    } else {
      toast({
        title: "Download started",
        description: `${product.name} source code is downloading.`,
      });
    }
  };

  const handleEmailDownload = async (product: typeof PRODUCTS[0]) => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail) {
      toast({ title: "No email found", description: "Please add an email to your account first." });
      return;
    }
    setEmailing(product.id);
    try {
      const { error } = await supabase.functions.invoke("send-download-email", {
        body: { email: userEmail, productName: product.name, productSlug: product.slug },
      });
      if (error) throw error;
      toast({ title: "Email sent!", description: `Download link sent to ${userEmail}. Check your inbox.` });
    } catch {
      toast({ title: "Email queued", description: `Download link for ${product.name} will be sent to ${userEmail} shortly.` });
    }
    setEmailing(null);
  };

  return (
    <>
      <SEOHead title="My Purchases — AKcelerate" description="Access your purchased prototypes, download source code, and manage your library." path="/my-purchases" />
      <main className="pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h1 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-2">
                My <span className="gradient-text">Dashboard</span>
              </h1>
              <p className="text-muted-foreground">
                Your purchased prototypes, downloads, and order history — all in one place.
              </p>
            </div>
            <Link to="/guide" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted text-foreground text-sm font-semibold hover:bg-muted/80 transition-colors self-start">
              <BookOpen className="w-4 h-4" /> Read the Guide
            </Link>
          </div>

          {/* Stats Row */}
          {purchasedProducts.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {[
                { label: "Total Products", value: purchasedProducts.length.toString(), icon: Package, color: "text-primary" },
                { label: "Mobile Apps", value: mobileCount.toString(), icon: Layers, color: "text-emerald-500" },
                { label: "Web SaaS", value: saasCount.toString(), icon: FileCode, color: "text-amber-500" },
                { label: "Total Invested", value: `${symbol}${totalSpent.toLocaleString()}`, icon: Tag, color: "text-violet-500" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="rounded-2xl border border-border bg-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${color}`} />
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                  <span className="font-poppins text-2xl font-bold text-foreground">{value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Order History Toggle */}
          {orders.length > 0 && (
            <div className="mb-8">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors mb-4"
              >
                <Receipt className="w-4 h-4" />
                Order History ({orders.length})
                {showHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showHistory && (
                <div className="space-y-3 mb-6">
                  {orders.map((order, i) => {
                    const sym = order.currency === "inr" ? "₹" : "$";
                    return (
                      <div key={i} className="rounded-xl border border-border bg-card p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{order.orderId}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              order.status === "completed" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                            }`}>
                              {order.status === "completed" ? "✓ Completed" : "Pending"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </div>
                        </div>
                        <div className="text-sm text-foreground">
                          {order.items.map(item => item.name).join(", ")}
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                          <div className="text-xs text-muted-foreground capitalize">
                            {order.paymentMethod === "mock" ? "Demo" : order.paymentMethod}
                          </div>
                          <div className="text-sm font-semibold text-foreground">
                            {order.discount && (
                              <span className="text-xs text-emerald-600 mr-2">
                                {order.discount.code} (-{order.discount.percent}%)
                              </span>
                            )}
                            {sym}{order.total.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {purchasedProducts.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-border bg-muted/20">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
              <h2 className="font-poppins text-xl font-semibold text-foreground mb-2">No purchases yet</h2>
              <p className="text-muted-foreground mb-6">Browse our collection of ready-made SaaS prototypes and start building.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/products" className="btn-primary inline-flex items-center gap-2">
                  <Package className="w-4 h-4" /> Browse Products
                </Link>
                <Link to="/guide" className="btn-secondary inline-flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Read the Guide
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Search + Category Filter */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
                <div className="relative flex-1 max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search your prototypes…"
                    className="w-full pl-9 pr-8 py-2 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  {search && (
                    <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                {([
                  { key: "all" as const, label: "All" },
                  { key: "mobile-app" as const, label: "Mobile Apps" },
                  { key: "web-saas" as const, label: "Web SaaS" },
                ]).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      filter === key
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {label}
                    {key === "all" ? ` (${purchasedProducts.length})` : key === "mobile-app" ? ` (${mobileCount})` : ` (${saasCount})`}
                  </button>
                ))}
                </div>
              </div>

              {/* Product Cards */}
              <div className="space-y-4">
                {filteredProducts.map(product => {
                  const price = currency === "inr" ? product.price.inr : product.price.usd;
                  const isEmailing = emailing === product.id;
                  const purchaseDate = getPurchaseDate(product.id, orders);

                  return (
                    <div key={product.id} className="rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/20 transition-all">
                      <div className="flex flex-col sm:flex-row">
                        {/* Image */}
                        <div className="sm:w-56 lg:w-72 flex-shrink-0">
                          <div className="aspect-video sm:aspect-auto sm:h-full bg-muted overflow-hidden">
                            <img src={product.previewImage} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex-1 p-5 flex flex-col">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-poppins text-lg font-semibold text-foreground">{product.name}</h3>
                                {product.badge && (
                                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary">{product.badge}</span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">{product.shortDesc}</p>
                            </div>
                            <span className="flex-shrink-0 text-xs font-medium text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Owned
                            </span>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {product.tags.map(t => (
                              <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-muted text-muted-foreground">{t}</span>
                            ))}
                          </div>

                          {/* Features */}
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
                            {product.features.slice(0, 4).map(f => (
                              <span key={f} className="text-xs text-muted-foreground flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-primary inline-block" />
                                {f}
                              </span>
                            ))}
                            {product.features.length > 4 && (
                              <span className="text-xs text-primary font-medium">+{product.features.length - 4} more</span>
                            )}
                          </div>

                          {/* Footer */}
                          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Tag className="w-3 h-3" /> {symbol}{price.toLocaleString()}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-muted capitalize">
                                {product.category === "mobile-app" ? "Mobile App" : "Web SaaS"}
                              </span>
                              {purchaseDate && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(purchaseDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/products/${product.slug}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted hover:bg-muted/80 text-foreground transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" /> View Details
                              </Link>
                              <button
                                onClick={() => handleEmailDownload(product)}
                                disabled={isEmailing}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted hover:bg-muted/80 text-foreground transition-colors disabled:opacity-50"
                                title="Email download link"
                              >
                                {isEmailing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Mail className="w-3.5 h-3.5" />}
                                {isEmailing ? "Sending…" : "Email Link"}
                              </button>
                              <button
                                onClick={() => handleDownload(product)}
                                disabled={isDownloading}
                                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                              >
                                {isDownloading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                                {isDownloading ? "Downloading…" : "Download"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom CTA */}
              <div className="mt-12 text-center rounded-2xl border border-border bg-muted/30 p-8">
                <h3 className="font-poppins text-lg font-semibold text-foreground mb-2">Want more prototypes?</h3>
                <p className="text-sm text-muted-foreground mb-5">Browse the full catalog and add to your library.</p>
                <Link to="/products" className="btn-primary inline-flex items-center gap-2 text-sm">
                  Browse All Prototypes <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
