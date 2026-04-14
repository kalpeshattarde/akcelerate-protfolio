import { RevealSection } from "@/hooks/useScrollReveal";
import { Calculator, ArrowRight } from "lucide-react";
import type { GeoDetection } from "@/hooks/useGeoDetection";

interface Props {
  geo: GeoDetection;
}

export default function CostBreakdownSection({ geo }: Props) {
  const { formatRange, formatPrice, currency } = geo;

  const aiCosts = [
    { item: "ChatGPT Plus / Claude Pro subscription", monthly: formatRange(20, 40), annual: formatRange(240, 480) },
    { item: "Replit Core / Lovable Pro credits", monthly: formatRange(25, 50), annual: formatRange(300, 600) },
    { item: "Bolt / V0 / Cursor AI tools", monthly: formatRange(20, 40), annual: formatRange(240, 480) },
    { item: "Hosting & deployment trials", monthly: formatRange(10, 30), annual: formatRange(120, 360) },
    { item: "API tokens (GPT-4, Claude, etc.)", monthly: formatRange(30, 100), annual: formatRange(360, 1200) },
    { item: `Your time (40–100+ hours × ${formatPrice(50)}/hr)`, monthly: "—", annual: formatRange(2000, 5000) },
  ];

  return (
    <section id="cost-breakdown" className="py-16 lg:py-20 section-alt">
      <RevealSection>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-semibold mb-4">
            <Calculator className="w-3.5 h-3.5" /> THE REAL NUMBERS
          </div>
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            The <span className="text-destructive">True Cost</span> of Building SaaS with AI Tools
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Add up what you're actually spending. Most founders don't — until it's too late.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="glass-card overflow-hidden mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left py-3 px-5 font-semibold text-foreground">Hidden Cost</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Monthly</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Annual</th>
                </tr>
              </thead>
              <tbody>
                {aiCosts.map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-3 px-5 text-foreground">{row.item}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row.monthly}</td>
                    <td className="py-3 px-4 text-center font-medium text-destructive">{row.annual}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-destructive/5">
                  <td className="py-4 px-5 font-poppins font-bold text-foreground text-base">Total Cost to Build ONE SaaS</td>
                  <td className="py-4 px-4 text-center font-bold text-muted-foreground">{formatRange(105, 260)}</td>
                  <td className="py-4 px-4 text-center font-poppins font-extrabold text-destructive text-lg">{formatRange(3260, 8120)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="glass-card p-6 border-2 border-primary/30 text-center">
            <p className="text-muted-foreground text-sm mb-2">Our price for the same SaaS prototype:</p>
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="line-through text-2xl text-muted-foreground font-medium">{formatPrice(3260)}</span>
              <ArrowRight className="w-5 h-5 text-primary" />
              <span className="font-poppins text-5xl font-extrabold text-primary">{formatPrice(29)}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              One-time. Full source code. No subscription. No tokens. No debugging.
            </p>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}
