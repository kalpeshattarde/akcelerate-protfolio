import { Link } from "react-router-dom";
import { Sparkles, Check, ArrowRight, Wand2 } from "lucide-react";
import type { Product } from "@/data/products";

interface CustomizeSummaryProps {
  product: Product;
}

// Map product category/tags → a few relevant case-study slugs.
// Falls back to /case-studies index when no match.
function getRelatedCaseStudies(product: Product): { label: string; to: string }[] {
  const tagMap: Record<string, { label: string; to: string }> = {
    fitness: { label: "Health & Wellness wins", to: "/case-studies#wellness" },
    delivery: { label: "Logistics & delivery", to: "/case-studies#logistics" },
    ecommerce: { label: "E-commerce growth", to: "/case-studies#ecommerce" },
    crm: { label: "CRM & sales ops", to: "/case-studies#crm" },
    analytics: { label: "Analytics platforms", to: "/case-studies#analytics" },
    booking: { label: "Booking & marketplace", to: "/case-studies#booking" },
    fintech: { label: "Fintech builds", to: "/case-studies#fintech" },
    saas: { label: "B2B SaaS launches", to: "/case-studies#saas" },
  };
  const matches = product.tags
    .map((t) => tagMap[t.toLowerCase()])
    .filter(Boolean) as { label: string; to: string }[];
  const base = product.category === "mobile-app"
    ? [{ label: "Mobile app launches", to: "/case-studies#mobile" }]
    : [{ label: "Web SaaS launches", to: "/case-studies#saas" }];
  const all = [...base, ...matches];
  // Dedupe by `to`
  const seen = new Set<string>();
  return all.filter((c) => (seen.has(c.to) ? false : (seen.add(c.to), true))).slice(0, 3);
}

export default function CustomizeSummary({ product }: CustomizeSummaryProps) {
  const related = getRelatedCaseStudies(product);
  const topFeatures = product.features.slice(0, 4);

  return (
    <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6 mb-8">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/15 text-primary">
          <Wand2 className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
            Customizing
          </p>
          <h3 className="font-poppins font-bold text-xl text-foreground">{product.name}</h3>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> What you'll get
          </p>
          <ul className="space-y-1.5">
            {topFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>{f}</span>
              </li>
            ))}
            <li className="flex items-start gap-2 text-sm text-foreground">
              <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <span>Branded UI, your domain & data</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-foreground">
              <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <span>2–4 week delivery, source code included</span>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Similar work we've shipped
          </p>
          <div className="space-y-1.5">
            {related.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="flex items-center justify-between gap-2 text-sm text-foreground hover:text-primary px-3 py-2 rounded-lg border border-border hover:border-primary/40 transition-colors group"
              >
                <span>{r.label}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
