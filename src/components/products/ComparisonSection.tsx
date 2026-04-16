import { Check, X, Minus } from "lucide-react";
import { RevealSection } from "@/hooks/useScrollReveal";

type Status = "win" | "lose" | "partial";

interface Row {
  feature: string;
  akcelerate: { value: string; status: Status };
  claude: { value: string; status: Status };
  chatgpt: { value: string; status: Status };
  replit: { value: string; status: Status };
  bolt: { value: string; status: Status };
  lovable: { value: string; status: Status };
}

const rows: Row[] = [
  {
    feature: "Cost per SaaS product",
    akcelerate: { value: "$19 one-time", status: "win" },
    claude: { value: "$20/mo + hours", status: "lose" },
    chatgpt: { value: "$200/mo + API", status: "lose" },
    replit: { value: "$25/mo + build", status: "lose" },
    bolt: { value: "$20/mo + tokens", status: "lose" },
    lovable: { value: "$20/mo + credits", status: "lose" },
  },
  {
    feature: "Time to launch",
    akcelerate: { value: "1–2 days", status: "win" },
    claude: { value: "4–8 weeks", status: "lose" },
    chatgpt: { value: "4–12 weeks", status: "lose" },
    replit: { value: "2–6 weeks", status: "lose" },
    bolt: { value: "2–4 weeks", status: "partial" },
    lovable: { value: "1–3 weeks", status: "partial" },
  },
  {
    feature: "Production-ready",
    akcelerate: { value: "Yes, instantly", status: "win" },
    claude: { value: "No — raw code", status: "lose" },
    chatgpt: { value: "No — snippets", status: "lose" },
    replit: { value: "Partial", status: "partial" },
    bolt: { value: "Partial", status: "partial" },
    lovable: { value: "Partial", status: "partial" },
  },
  {
    feature: "Code quality",
    akcelerate: { value: "Engineer-built", status: "win" },
    claude: { value: "Inconsistent", status: "lose" },
    chatgpt: { value: "Spaghetti code", status: "lose" },
    replit: { value: "AI-generated", status: "lose" },
    bolt: { value: "AI-generated", status: "lose" },
    lovable: { value: "AI-generated", status: "lose" },
  },
  {
    feature: "Debugging needed",
    akcelerate: { value: "Zero", status: "win" },
    claude: { value: "Heavy", status: "lose" },
    chatgpt: { value: "Heavy", status: "lose" },
    replit: { value: "Moderate", status: "partial" },
    bolt: { value: "Moderate", status: "partial" },
    lovable: { value: "Moderate", status: "partial" },
  },
  {
    feature: "Resell as own SaaS",
    akcelerate: { value: "Yes — full license", status: "win" },
    claude: { value: "Build yourself", status: "lose" },
    chatgpt: { value: "Build yourself", status: "lose" },
    replit: { value: "Yes, if built", status: "partial" },
    bolt: { value: "Yes, if built", status: "partial" },
    lovable: { value: "Yes, if built", status: "partial" },
  },
  {
    feature: "Monthly cost",
    akcelerate: { value: "$0 or $99", status: "win" },
    claude: { value: "$20–$100+", status: "lose" },
    chatgpt: { value: "$200–$400+", status: "lose" },
    replit: { value: "$25–$100+", status: "lose" },
    bolt: { value: "$20–$50+", status: "lose" },
    lovable: { value: "$20–$65+", status: "lose" },
  },
  {
    feature: "Token / API costs",
    akcelerate: { value: "$0", status: "win" },
    claude: { value: "$30–$100/mo", status: "lose" },
    chatgpt: { value: "$50–$200/mo", status: "lose" },
    replit: { value: "Included*", status: "partial" },
    bolt: { value: "$10–$50/mo", status: "lose" },
    lovable: { value: "Credits-based", status: "partial" },
  },
  {
    feature: "Scalable architecture",
    akcelerate: { value: "Yes", status: "win" },
    claude: { value: "Up to you", status: "lose" },
    chatgpt: { value: "Up to you", status: "lose" },
    replit: { value: "Limited", status: "lose" },
    bolt: { value: "Basic", status: "lose" },
    lovable: { value: "Basic", status: "lose" },
  },
  {
    feature: "Source code",
    akcelerate: { value: "100% yours", status: "win" },
    claude: { value: "Yes", status: "win" },
    chatgpt: { value: "Yes", status: "win" },
    replit: { value: "Yes", status: "win" },
    bolt: { value: "Yes", status: "win" },
    lovable: { value: "Yes", status: "win" },
  },
];

const tools = [
  { key: "akcelerate" as const, label: "AKcelerate", highlight: true },
  { key: "claude" as const, label: "Claude" },
  { key: "chatgpt" as const, label: "ChatGPT Codex" },
  { key: "replit" as const, label: "Replit" },
  { key: "bolt" as const, label: "Bolt" },
  { key: "lovable" as const, label: "Lovable" },
];

function StatusIcon({ status }: { status: Status }) {
  if (status === "win") return <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />;
  if (status === "lose") return <X className="w-3.5 h-3.5 text-destructive flex-shrink-0" />;
  return <Minus className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />;
}

export default function ComparisonSection() {
  return (
    <section id="comparison" className="py-16 lg:py-20">
      <RevealSection>
        <div className="text-center mb-10">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            AKcelerate vs. <span className="gradient-text">Every AI Tool</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The best SaaS boilerplate alternative — see how we compare against Claude, ChatGPT Codex, Replit, Bolt & Lovable.
          </p>
        </div>

        <div className="max-w-6xl mx-auto overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-xs sm:text-sm min-w-[800px]">
            <thead>
              <tr className="border-b-2 border-border bg-muted/40">
                <th className="text-left py-3 px-3 font-medium text-muted-foreground sticky left-0 bg-muted/40 z-10 min-w-[130px]">
                  Feature
                </th>
                {tools.map((t) => (
                  <th key={t.key} className={`py-3 px-2 text-center min-w-[100px] ${t.highlight ? "bg-primary/5" : ""}`}>
                    <span className={`font-poppins font-bold text-xs sm:text-sm ${t.highlight ? "text-primary" : "text-muted-foreground"}`}>
                      {t.label}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-foreground sticky left-0 bg-background z-10">
                    {row.feature}
                  </td>
                  {tools.map((t) => {
                    const cell = row[t.key];
                    return (
                      <td key={t.key} className={`py-2.5 px-2 text-center ${t.highlight ? "bg-primary/5" : ""}`}>
                        <div className="flex items-center justify-center gap-1">
                          <StatusIcon status={cell.status} />
                          <span className={`${t.highlight ? "text-foreground font-medium" : "text-muted-foreground"} text-[11px] sm:text-xs`}>
                            {cell.value}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-xs text-muted-foreground/60 mt-4">
          * Prices based on publicly available plans as of 2025. Actual costs may vary with usage.
        </p>
      </RevealSection>
    </section>
  );
}
