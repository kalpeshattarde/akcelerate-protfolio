/**
 * Sample size calculator for the A/B Test card.
 * Estimates additional views per variant required to detect the *currently
 * observed* lift at α=0.05 (two-sided) and 80% power.
 *
 * Formula (two-proportion, equal n per arm):
 *   n = (Zα/2 √(2·p̄·(1-p̄)) + Zβ √(p1·(1-p1) + p2·(1-p2)))² / (p2 - p1)²
 */
import type { AbVariantRow } from "./AbTestCard";

const Z_ALPHA = 1.96; // two-sided α=0.05
const Z_BETA = 0.8416; // 80% power

function requiredPerArm(p1: number, p2: number): number | null {
  const delta = Math.abs(p2 - p1);
  if (delta < 1e-6) return null;
  const pBar = (p1 + p2) / 2;
  const a = Z_ALPHA * Math.sqrt(2 * pBar * (1 - pBar));
  const b = Z_BETA * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2));
  return Math.ceil(((a + b) ** 2) / (delta ** 2));
}

interface Props {
  data: AbVariantRow[];
}

export default function SampleSizeCalc({ data }: Props) {
  const ctrl = data.find(r => r.variant === "control");
  const exp = data.find(r => r.variant === "catalog-early");
  if (!ctrl || !exp || ctrl.views === 0 || exp.views === 0) return null;

  const p1 = ctrl.addToCart / ctrl.views;
  const p2 = exp.addToCart / exp.views;
  const required = requiredPerArm(p1, p2);
  const currentMin = Math.min(ctrl.views, exp.views);

  if (required === null) {
    return (
      <div className="mt-3 p-3 rounded-lg border border-border bg-background/50 text-xs text-muted-foreground">
        <div className="font-semibold text-foreground mb-1">Sample size · 80% power</div>
        Both variants converting at the same rate — no detectable lift to size for yet.
      </div>
    );
  }

  const remaining = Math.max(0, required - currentMin);
  const liftPts = +((p2 - p1) * 100).toFixed(1);

  return (
    <div className="mt-3 p-3 rounded-lg border border-border bg-background/50 text-xs">
      <div className="font-semibold text-foreground mb-1">Sample size · 80% power, α=0.05</div>
      <div className="text-muted-foreground">
        To reliably detect the observed{" "}
        <span className="font-semibold text-foreground">{liftPts > 0 ? "+" : ""}{liftPts} pt</span>{" "}
        lift, you need ~<span className="font-semibold text-foreground">{required.toLocaleString()}</span>{" "}
        views per variant.{" "}
        {remaining > 0 ? (
          <>Need <span className="font-semibold text-primary">{remaining.toLocaleString()} more</span> on the smaller arm.</>
        ) : (
          <span className="text-green-600 dark:text-green-400 font-semibold">Already past the threshold ✓</span>
        )}
      </div>
    </div>
  );
}
