import { Link } from "react-router-dom";
import { ArrowLeft, Flame, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { useGeoDetection } from "@/hooks/useGeoDetection";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import TopSellingSection from "@/components/products/TopSellingSection";

export default function TopSellingPage() {
  const { currency } = useGeoDetection();
  const { topSelling, isPurchased, purchase } = useProducts();
  const cart = useCart();

  const handleBuy = (id: string) => {
    purchase(id);
    toast.success("Purchased!");
  };
  const handleAddToCart = (id: string) => {
    cart.addToCart(id);
    toast.success("Added to cart");
  };

  return (
    <>
      <SEOHead
        title="Top Selling SaaS Prototypes"
        description="Browse the three best-selling AKcelerate SaaS prototypes — ready-to-customize starter kits backed by real customer adoption."
        path="/top-selling"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "Top Selling", path: "/top-selling" },
        ]}
      />

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all products
          </Link>

          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-7 h-7 text-primary" />
            <h1 className="font-poppins text-3xl lg:text-4xl font-bold text-foreground">
              Top Selling Prototypes
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mb-10">
            The three SaaS prototypes our customers buy and customize the most. Each one ships
            with a production-ready foundation and full source — click any card for the complete
            feature breakdown.
          </p>

          <TopSellingSection
            products={topSelling}
            currency={currency}
            isPurchased={isPurchased}
            onPurchase={handleBuy}
            onAddToCart={handleAddToCart}
            hideViewAll
          />

          <div className="mt-10 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              Explore the full catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
