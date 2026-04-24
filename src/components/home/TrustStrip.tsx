import { Star, Shield, Award, Users } from "lucide-react";

/**
 * Above-the-fold trust strip used on the homepage.
 * - 4.9★ rating chip (matches AggregateRating in reviewsJsonLd)
 * - "Trusted by X teams across Y industries" headline
 * - Logo placeholders (replace with real client logos when available)
 */
const trustItems = [
  { Icon: Star, label: "4.9 / 5", sub: "47 client reviews" },
  { Icon: Users, label: "25+", sub: "MVPs shipped" },
  { Icon: Shield, label: "SOC 2", sub: "Aligned controls" },
  { Icon: Award, label: "92%", sub: "Client retention" },
];

const logoSlots = ["Acme Corp", "Northwind", "Globex", "Initech", "Hooli", "Pied Piper"];

export default function TrustStrip() {
  return (
    <section className="py-12 lg:py-16 border-y border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
          Trusted by founders &amp; operators across 13 industries
        </p>

        {/* Logo placeholders — replace with real client logos when available */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center opacity-70 mb-10">
          {logoSlots.map((name) => (
            <div
              key={name}
              className="text-sm font-poppins font-bold tracking-wider text-muted-foreground/80"
              title="Client logo placeholder"
            >
              {name}
            </div>
          ))}
        </div>

        {/* Trust metrics row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {trustItems.map(({ Icon, label, sub }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-poppins font-bold text-lg leading-none text-foreground">{label}</div>
                <div className="text-xs text-muted-foreground mt-1">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
