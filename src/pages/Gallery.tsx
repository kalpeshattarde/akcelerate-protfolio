import { HeroPage } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import { RevealSection, RevealGrid } from "@/hooks/useScrollReveal";
import { AnimatedStat } from "@/hooks/useCountUp";

const dashboards = [
  {
    title: "OEE & Production Dashboard",
    desc: "Real-time overall equipment effectiveness with 7-day trend.",
    stats: [
      { label: "OEE Score", value: "87.4%", change: "▲ 4.2%" },
      { label: "Uptime", value: "96.8%", change: "▲ 2.1%" },
    ],
  },
  {
    title: "Quality Analytics Dashboard",
    desc: "Defect categorization, first-pass yield, and trend monitoring.",
    stats: [
      { label: "Defect Rate", value: "0.8%", change: "▼ 0.4%" },
      { label: "First Pass Yield", value: "99.2%", change: "" },
    ],
  },
  {
    title: "Energy Management Dashboard",
    desc: "Energy per unit, shift-wise consumption, and savings vs. baseline.",
    stats: [
      { label: "Energy / Unit", value: "2.4 kWh", change: "▼ 18%" },
      { label: "Monthly Saving", value: "₹1.8L", change: "" },
    ],
  },
];

export default function GalleryPage() {
  return (
    <>
      <HeroPage label="Gallery" title={<>See AKcelerate <span className="gradient-text">In Action</span></>} description="Dashboard previews, platform UI, and highlights from live manufacturing deployments across India." />

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="Dashboards" title={<>Analytics <span className="gradient-text">Dashboards</span></>} />
          </RevealSection>
          <RevealGrid className="grid md:grid-cols-3 gap-6" stagger={120}>
            {dashboards.map((d, i) => (
              <div key={i} className="reveal-item glass-card overflow-hidden">
                <div className="p-4 space-y-2">
                  {d.stats.map((s, j) => (
                    <div key={j} className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{s.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-poppins font-bold text-lg gradient-text">{s.value}</span>
                        {s.change && <span className={`text-[10px] font-medium ${s.change.startsWith("▲") ? "text-green-500" : "text-green-500"}`}>{s.change}</span>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-24 flex items-end gap-1 px-4 pb-3">
                  {Array.from({ length: 14 }, (_, j) => (
                    <div key={j} className="flex-1 rounded-t-sm" style={{
                      height: `${30 + Math.random() * 60}%`,
                      background: `linear-gradient(180deg, rgba(37,99,235,0.8), rgba(6,182,212,0.3))`,
                      opacity: 0.5 + j / 28,
                    }} />
                  ))}
                </div>
                <div className="p-4 pt-2 border-t border-border">
                  <h3 className="font-poppins font-semibold text-sm mb-1">{d.title}</h3>
                  <p className="text-muted-foreground text-xs">{d.desc}</p>
                </div>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <section className="py-16 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <SectionHeader label="Scale" title={<>Platform <span className="gradient-text">Reach</span></>} />
          </RevealSection>
          <RevealGrid className="grid grid-cols-2 md:grid-cols-4 gap-6" stagger={80}>
            {[
              { value: "4", label: "Industries — Automotive, FMCG, pharma & process" },
              { value: "10K+", label: "IoT sensors streaming 24/7" },
              { value: "₹5Cr+", label: "Combined savings across all clients" },
              { value: "4 wks", label: "Sensor setup to first insight" },
            ].map((s, i) => (
              <div key={i} className="reveal-item text-center glass-card p-6">
                <div className="stat-number mb-2"><AnimatedStat value={s.value} /></div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      <CTASection title="See Your Data on These Dashboards" description="Book a 30-minute live demo — we'll show the platform running on real manufacturing data similar to yours." primaryCta={{ label: "Book Demo", to: "/contact" }} dark />
    </>
  );
}
