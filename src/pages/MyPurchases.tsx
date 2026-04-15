import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useGeoDetection } from "@/hooks/useGeoDetection";
import { PRODUCTS } from "@/data/products";
import { Package, Download, ExternalLink, ShoppingBag, Loader2, Clock, Receipt, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { downloadProductFile } from "@/lib/downloadProduct";

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

export default function MyPurchases() {
  const { isSignedIn, isLoaded } = useUser();
  const { isPurchased } = useProducts();
  const { currency } = useGeoDetection();
  const [downloading, setDownloading] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  if (!isLoaded) {
    return (
      <main className="pt-28 pb-20 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </main>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  const purchasedProducts = PRODUCTS.filter(p => isPurchased(p.id));
  const symbol = currency === "inr" ? "₹" : "$";
  const orders = getOrders();

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

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-2">
            My <span className="gradient-text">Purchases</span>
          </h1>
          <p className="text-muted-foreground">
            All your purchased prototypes in one place. Full source code access included.
          </p>
        </div>

        {/* Order History */}
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
                            order.status === "completed" ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"
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
                            <span className="text-xs text-green-600 mr-2">
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
            <p className="text-muted-foreground mb-6">Browse our collection of ready-made SaaS prototypes.</p>
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              <Package className="w-4 h-4" /> Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{purchasedProducts.length} product{purchasedProducts.length !== 1 ? "s" : ""} purchased</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchasedProducts.map(product => {
                const price = currency === "inr" ? product.price.inr : product.price.usd;
                const isDownloading = downloading === product.id;
                return (
                  <div key={product.id} className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img src={product.previewImage} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {product.tags.slice(0, 3).map(t => (
                          <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground">{t}</span>
                        ))}
                      </div>
                      <h3 className="font-poppins text-lg font-semibold text-foreground mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.shortDesc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-green-600 font-medium bg-green-500/10 px-2 py-1 rounded-full">
                          ✓ Purchased — {symbol}{price.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-2">
                          <Link to={`/products/${product.slug}`} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" title="View details">
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDownload(product)}
                            disabled={isDownloading}
                            className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50"
                            title="Download source code"
                          >
                            {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
