import { Flame } from "lucide-react";
import type { Product } from "@/data/products";
import type { Currency } from "@/config/appConfig";
import ProductCard from "./ProductCard";

interface TopSellingSectionProps {
  products: Product[];
  currency: Currency;
  isPurchased: (id: string) => boolean;
  onPurchase?: (id: string) => void;
  onAddToCart?: (id: string) => void;
}

export default function TopSellingSection({ products, currency, isPurchased, onPurchase, onAddToCart }: TopSellingSectionProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Flame className="w-6 h-6 text-orange-500" />
        <h2 className="font-poppins text-2xl font-bold text-foreground">Top Selling Products</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map(p => (
          <ProductCard key={p.id} product={p} currency={currency} isPurchased={isPurchased(p.id)} onPurchase={onPurchase} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}
