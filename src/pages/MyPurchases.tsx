import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useGeoDetection } from "@/hooks/useGeoDetection";
import { PRODUCTS } from "@/data/products";
import { Package, Download, ExternalLink, ShoppingBag, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

function generateReadme(productName: string, features: string[]): string {
  return `# ${productName} — Source Code

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Features
${features.map(f => `- ${f}`).join("\n")}

## Tech Stack
- React 18 + TypeScript
- Tailwind CSS
- Vite
- Shadcn/ui components

## Support
Email: akceleratehq@gmail.com

© ${new Date().getFullYear()} AKcelerate. All rights reserved.
`;
}

function downloadProduct(product: { name: string; slug: string; features: string[] }) {
  // Generate a README as a downloadable text file (placeholder for real source code delivery)
  const content = generateReadme(product.name, product.features);
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${product.slug}-source-code-README.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function MyPurchases() {
  const { isSignedIn, isLoaded } = useUser();
  const { isPurchased } = useProducts();
  const { currency } = useGeoDetection();
  const [downloading, setDownloading] = useState<string | null>(null);

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

  const handleDownload = (product: typeof PRODUCTS[0]) => {
    setDownloading(product.id);
    // Simulate brief preparation
    setTimeout(() => {
      downloadProduct(product);
      setDownloading(null);
      toast({
        title: "Download started",
        description: `${product.name} README has been downloaded. Full source code will be delivered to your email.`,
      });
    }, 800);
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
