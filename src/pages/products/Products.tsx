import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Globe } from "lucide-react";
import { useGeoDetection } from "@/hooks/useGeoDetection";
import { useProducts } from "@/hooks/useProducts";
import PersonalizedHero from "@/components/products/PersonalizedHero";
import TopSellingSection from "@/components/products/TopSellingSection";
import ProductCard from "@/components/products/ProductCard";
import UpsellBanner from "@/components/products/UpsellBanner";

export default function Products() {
  const { currency, setCurrency } = useGeoDetection();
  const { topSelling, mobileApps, webSaas, isPurchased, purchase } = useProducts();

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PersonalizedHero />

        <TopSellingSection products={topSelling} currency={currency} isPurchased={isPurchased} onPurchase={purchase} />

        {/* Category Tabs */}
        <Tabs defaultValue="mobile-app" className="mt-12">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
            <TabsTrigger value="mobile-app" className="gap-2">
              <Smartphone className="w-4 h-4" /> Mobile App
            </TabsTrigger>
            <TabsTrigger value="web-saas" className="gap-2">
              <Globe className="w-4 h-4" /> Web SaaS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mobile-app">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mobileApps.map(p => (
                <ProductCard key={p.id} product={p} currency={currency} isPurchased={isPurchased(p.id)} onPurchase={purchase} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="web-saas">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {webSaas.map(p => (
                <ProductCard key={p.id} product={p} currency={currency} isPurchased={isPurchased(p.id)} onPurchase={purchase} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <UpsellBanner />
      </div>
    </main>
  );
}