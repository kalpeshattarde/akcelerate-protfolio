import { RevealSection } from "@/hooks/useScrollReveal";
import { BadgeDollarSign, ArrowDown } from "lucide-react";

const scenarios = [
  {
    label: "Building 1 SaaS with AI",
    aiCost: "$700–$3,000",
    ourCost: "$19",
    savings: "$671–$2,971",
  },
  {
    label: "Building 5 SaaS products",
    aiCost: "$3,500–$15,000",
    ourCost: "$60 ($12 × 5)",
    savings: "$3,440–$14,940",
  },
  {
    label: "Agency building 10+ products",
    aiCost: "$7,000–$30,000",
    ourCost: "$119 (all-access)",
    savings: "$6,881–$29,881",
  },
];

export default function SavingsSection() {
  return (
    <section className="py-16 lg:py-20">
      <RevealSection>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-semibold mb-4">
            <BadgeDollarSign className="w-3.5 h-3.5" /> YOUR SAVINGS
          </div>
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            Save <span className="gradient-text">$600–$29,700</span> Per Project
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            The math is simple. Stop building from scratch. Start launching with prototypes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {scenarios.map(({ label, aiCost, ourCost, savings }, i) => (
            <div key={i} className="glass-card p-6 text-center relative overflow-hidden">
              <h3 className="font-poppins font-semibold text-foreground mb-5">{label}</h3>

              <div className="space-y-3">
                <div className="py-2 px-4 rounded-lg bg-destructive/5">
                  <div className="text-xs text-muted-foreground mb-1">With AI tools</div>
                  <div className="font-poppins font-bold text-destructive text-lg line-through">{aiCost}</div>
                </div>
                <ArrowDown className="w-5 h-5 text-primary mx-auto" />
                <div className="py-2 px-4 rounded-lg bg-primary/5">
                  <div className="text-xs text-muted-foreground mb-1">With AKcelerate</div>
                  <div className="font-poppins font-bold text-primary text-lg">{ourCost}</div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground mb-1">You save</div>
                <div className="font-poppins text-2xl font-extrabold text-emerald-500">{savings}</div>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>
    </section>
  );
}
