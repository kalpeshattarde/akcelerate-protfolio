import { Check, X, Minus } from "lucide-react";
import { RevealSection } from "@/hooks/useScrollReveal";

interface Row {
  feature: string;
  us: "yes" | "no" | "partial";
  claude: "yes" | "no" | "partial";
  replit: "yes" | "no" | "partial";
  bolt: "yes" | "no" | "partial";
  lovable: "yes" | "no" | "partial";
}

const rows: Row[] = [
  { feature: "Ready to ship in minutes", us: "yes", claude: "no", replit: "no", bolt: "no", lovable: "no" },
  { feature: "Clean, maintainable code", us: "yes", claude: "no", replit: "partial", bolt: "partial", lovable: "partial" },
  { feature: "No prompt engineering needed", us: "yes", claude: "no", replit: "no", bolt: "no", lovable: "no" },
  { feature: "Real UI/UX design", us: "yes", claude: "no", replit: "partial", bolt: "partial", lovable: "partial" },
  { feature: "Source code ownership", us: "yes", claude: "yes", replit: "yes", bolt: "yes", lovable: "yes" },
  { feature: "One-time cost (no subscription)", us: "yes", claude: "no", replit: "no", bolt: "no", lovable: "no" },
  { feature: "Production-ready architecture", us: "yes", claude: "no", replit: "no", bolt: "partial", lovable: "partial" },
  { feature: "Starts at $29", us: "yes", claude: "no", replit: "no", bolt: "no", lovable: "no" },
];

function StatusIcon({ status }: { status: "yes" | "no" | "partial" }) {
  if (status === "yes") return <Check className="w-4 h-4 text-emerald-500" />;
  if (status === "no") return <X className="w-4 h-4 text-destructive" />;
  return <Minus className="w-4 h-4 text-amber-500" />;
}

export default function ComparisonSection() {
  return (
    <section id="comparison" className="py-16 lg:py-20">
      <RevealSection>
        <div className="text-center mb-10">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-4">
            Us vs. <span className="gradient-text">AI Coding Tools</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Honest comparison. No spin. You decide.
          </p>
        </div>

        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Feature</th>
                <th className="py-3 px-3 text-center">
                  <span className="font-poppins font-bold text-primary">AKcelerate</span>
                </th>
                <th className="py-3 px-3 text-center font-medium text-muted-foreground">Claude</th>
                <th className="py-3 px-3 text-center font-medium text-muted-foreground">Replit</th>
                <th className="py-3 px-3 text-center font-medium text-muted-foreground">Bolt</th>
                <th className="py-3 px-3 text-center font-medium text-muted-foreground">Lovable</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">{row.feature}</td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex justify-center"><StatusIcon status={row.us} /></div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex justify-center"><StatusIcon status={row.claude} /></div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex justify-center"><StatusIcon status={row.replit} /></div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex justify-center"><StatusIcon status={row.bolt} /></div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex justify-center"><StatusIcon status={row.lovable} /></div>
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
