import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { ArrowLeft, CheckCircle, Shield, Zap, Download, Loader2 } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useGeoDetection } from "@/hooks/useGeoDetection";
import { useProducts } from "@/hooks/useProducts";
import PricingSelector from "@/components/products/PricingSelector";
import CheckoutModal from "@/components/products/CheckoutModal";
import RecommendationEngine from "@/components/products/RecommendationEngine";
import { recordProductView } from "@/components/products/PersonalizedPicks";
import { downloadProductFile } from "@/lib/downloadProduct";
import { toast } from "sonner";
import { trackProductView, trackPurchase } from "@/lib/analytics";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = PRODUCTS.find(p => p.slug === slug);
  const { currency, setCurrency } = useGeoDetection();
  const { isPurchased, purchase, products } = useProducts();
  const [finalPrice, setFinalPrice] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Track product view + record for personalization
  useEffect(() => {
    if (product) {
      trackProductView(product.slug, product.name);
      recordProductView(product.id);
    }
  }, [product?.slug, product?.name, product?.id]);

  if (!product) {
    return (
      <main className="pt-28 pb-20 text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Link to="/products" className="text-primary mt-4 inline-block">← Back to Products</Link>
      </main>
    );
  }

  const purchased = isPurchased(product.id);

  return (
    <>
      <SEOHead title={product.name} description={product.description.slice(0, 155)} path={`/products/${slug}`} />
    <main className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — Image */}
          <div className="lg:col-span-3">
            <div className="aspect-video rounded-2xl bg-muted border border-border overflow-hidden">
              <img src={product.previewImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="mt-8">
              <h2 className="font-poppins text-lg font-semibold text-foreground mb-4">What's Included</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {product.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Info & Purchase */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.tags.map(t => (
                <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground">{t}</span>
              ))}
            </div>
            <h1 className="font-poppins text-3xl font-bold text-foreground mb-3">{product.name}</h1>
            <p className="text-muted-foreground mb-6">{product.description}</p>

            {purchased ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="font-semibold text-foreground">You own this product</p>
                  <p className="text-sm text-muted-foreground">Full source code access granted</p>
                </div>
                <button
                  onClick={async () => {
                    setDownloading(true);
                    try {
                      const result = await downloadProductFile(product.slug, product.name, product.features);
                      if (result.fallback) {
                        toast.info("Demo README downloaded. Full source code will be available once uploaded.");
                      } else {
                        toast.success("Download started!");
                      }
                    } catch {
                      toast.error("Download failed. Please try again.");
                    } finally {
                      setDownloading(false);
                    }
                  }}
                  disabled={downloading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {downloading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Preparing Download…</>
                  ) : (
                    <><Download className="w-4 h-4" /> Download Source Code</>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <PricingSelector
                  currency={currency}
                  onCurrencyChange={setCurrency}
                  basePrice={product.price}
                  onFinalPrice={setFinalPrice}
                />
                <button onClick={() => setShowCheckout(true)} className="w-full btn-primary justify-center gap-2">
                  <Zap className="w-4 h-4" /> Purchase Now
                </button>
              </div>
            )}

            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3.5 h-3.5" /> One-time payment — lifetime access
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3.5 h-3.5" /> Full source code included
              </div>
            </div>
          </div>
        </div>

        <RecommendationEngine currentProduct={product} allProducts={products} currency={currency} />

        <CheckoutModal
          open={showCheckout}
          onOpenChange={setShowCheckout}
          items={[{ product, quantity: 1 }]}
          currency={currency}
          total={finalPrice || (currency === "inr" ? product.price.inr : product.price.usd)}
          onComplete={() => { purchase(product.id); trackPurchase(product.id, product.name, finalPrice || (currency === "inr" ? product.price.inr : product.price.usd), currency); setShowCheckout(false); }}
        />
      </div>
    </main>
    </>
  );
}
