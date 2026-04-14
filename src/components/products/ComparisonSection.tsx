import { Check, X, Minus } from "lucide-react";
import { RevealSection } from "@/hooks/useScrollReveal";

interface Row {
  feature: string;
  us: string;
  aiTools: string;
  usStatus: "win" | "neutral";
  aiStatus: "lose" | "neutral";
}

const rows: Row[] = [
  { feature: "Cost per SaaS product", us: "$29 one-time", aiTools: "$700–$3,000+", usStatus: "win", aiStatus: "lose" },
  { feature: "Time to launch", us: "1–2 days", aiTools: "4–12 weeks", usStatus: "win", aiStatus: "lose" },
  { feature: "Monthly subscription", us: "None (or $99 for all)", aiTools: "$200–$400/mo", usStatus: "win", aiStatus: "lose" },
  { feature: "Code quality", us: "Engineer-built, clean", aiTools: "AI-generated spaghetti", usStatus: "win", aiStatus: "lose" },
  { feature: "Debugging required", us: "Zero", aiTools: "Hours per feature", usStatus: "win", aiStatus: "lose" },
  { feature: "Production-ready", us: "Yes, immediately", aiTools: "Rarely", usStatus: "win", aiStatus: "lose" },
  { feature: "Resell as your own SaaS", us: "Yes — full license", aiTools: "Build everything yourself", usStatus: "win", aiStatus: "lose" },
  { feature: "Source code ownership", us: "100% yours", aiTools: "Yes, but buggy", usStatus: "win", aiStatus: "neutral" },
  { feature: "Scalable architecture", us: "Yes", aiTools: "Usually not", usStatus: "win", aiStatus: "lose" },
  { feature: "Token / API costs", us: "$0", aiTools: "$30–$100+/mo", usStatus: "win", aiStatus: "lose" },
];

export default function ComparisonSection() {
  return (
    <section id="comparison" className="py-16 lg:py-20">
      <RevealSection>
        <div className="text-center mb-10">
          {/* H2 — SEO: "saas boilerplate alternative" */}
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            AKcelerate vs. <span className="gradient-text">AI Coding Tools</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The best SaaS boilerplate alternative — honest comparison against ChatGPT, Claude, Replit, Lovable & Bolt.
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-3.5 px-4 font-medium text-muted-foreground">Feature</th>
                <th className="py-3.5 px-4 text-center">
                  <span className="font-poppins font-bold text-primary text-base">AKcelerate</span>
                </th>
                <th className="py-3.5 px-4 text-center">
                  <span className="font-medium text-muted-foreground">AI Tools</span>
                  <div className="text-[10px] text-muted-foreground/60">ChatGPT · Claude · Replit · Bolt · Lovable</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">{row.feature}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-foreground font-medium">{row.us}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {row.aiStatus === "lose" ? (
                        <X className="w-4 h-4 text-destructive flex-shrink-0" />
                      ) : (
                        <Minus className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      )}
                      <span className="text-muted-foreground">{row.aiTools}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </RevealSection>
    </section>
  );
}
