import { Activity } from "lucide-react";
import { ChartCard, EmptyState } from "../AdminPolish";

export interface AbVariantRow {
  variant: string;
  views: number;
  addToCart: number;
  bundleUnlocked: number;
  cartRate: number;
  bundleRate: number;
}

// Two-proportion z-test (pooled). Returns z and two-tailed p-value.
// Abramowitz & Stegun 26.2.17 normal CDF approximation.
function normalCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327 * Math.exp((-z * z) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

export function twoProportionZTest(c1: number, n1: number, c2: number, n2: number) {
  const p1 = c1 / Math.max(n1, 1);
  const p2 = c2 / Math.max(n2, 1);
  const pPool = (c1 + c2) / Math.max(n1 + n2, 1);
  const se = Math.sqrt(pPool * (1 - pPool) * (1 / Math.max(n1, 1) + 1 / Math.max(n2, 1)));
  const z = se > 0 ? (p2 - p1) / se : 0;
  const pValue = 2 * (1 - normalCdf(Math.abs(z)));
  return { z, pValue };
}

interface Props {
  data: AbVariantRow[];
  index?: number;
}

export default function AbTestCard({ data, index = 0 }: Props) {
  const hasData = data.some(r => r.views > 0);

  return (
    <ChartCard title="A/B Test: Products Page Order" index={index}>
      {hasData ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Variant</th>
                <th className="py-2 pr-4 font-medium">Views</th>
                <th className="py-2 pr-4 font-medium">Add to Cart</th>
                <th className="py-2 pr-4 font-medium">Bundle Unlocked</th>
                <th className="py-2 pr-4 font-medium">Cart Rate</th>
                <th className="py-2 font-medium">Bundle Rate</th>
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row.variant} className="border-b border-border last:border-0">
                  <td className="py-2 pr-4 font-mono text-xs text-foreground">{row.variant}</td>
                  <td className="py-2 pr-4 text-foreground">{row.views}</td>
                  <td className="py-2 pr-4 text-foreground">{row.addToCart}</td>
                  <td className="py-2 pr-4 text-foreground">{row.bundleUnlocked}</td>
                  <td className="py-2 pr-4 font-semibold text-primary">{row.cartRate}%</td>
                  <td className="py-2 font-semibold text-primary">{row.bundleRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Banner data={data} />
          <p className="mt-3 text-xs text-muted-foreground">
            Cart Rate = Add to Cart / Views · Bundle Rate = Bundle Unlocked / Views
          </p>
        </div>
      ) : (
        <EmptyState icon={Activity} title="No A/B test data yet" description="Visit /products in different sessions to assign both variants." />
      )}
    </ChartCard>
  );
}

function Banner({ data }: { data: AbVariantRow[] }) {
  const MIN_VIEWS = 100;
  const ALPHA = 0.05;
  const ctrl = data.find(r => r.variant === "control");
  const exp = data.find(r => r.variant === "catalog-early");
  if (!ctrl || !exp) return null;

  const enoughData = ctrl.views >= MIN_VIEWS && exp.views >= MIN_VIEWS;
  const lift = +(exp.cartRate - ctrl.cartRate).toFixed(1);
  const winner = lift > 0 ? "catalog-early" : lift < 0 ? "control" : null;
  const { z, pValue } = twoProportionZTest(ctrl.addToCart, ctrl.views, exp.addToCart, exp.views);
  const pStr = pValue < 0.001 ? "<0.001" : pValue.toFixed(3);
  const significant = enoughData && pValue < ALPHA;

  if (!enoughData) {
    const remaining = Math.max(0, MIN_VIEWS - Math.min(ctrl.views, exp.views));
    return (
      <div className="mt-3 flex items-start gap-2 text-xs p-2.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
        <span aria-hidden>⏳</span>
        <span>Need 100+ views per variant for a reliable read — {remaining} more view{remaining === 1 ? "" : "s"} on the smaller arm.</span>
      </div>
    );
  }
  if (significant && winner) {
    return (
      <div className="mt-3 flex items-start gap-2 text-xs p-2.5 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20">
        <span aria-hidden>✓</span>
        <span><strong>{winner}</strong> wins by {Math.abs(lift)} pts on cart rate (p={pStr}, z={z.toFixed(2)}).</span>
      </div>
    );
  }
  return (
    <div className="mt-3 flex items-start gap-2 text-xs p-2.5 rounded-lg bg-muted text-muted-foreground border border-border">
      <span aria-hidden>≈</span>
      <span>No significant winner yet (lift {lift > 0 ? "+" : ""}{lift} pts, p={pStr}, threshold α={ALPHA}).</span>
    </div>
  );
}
