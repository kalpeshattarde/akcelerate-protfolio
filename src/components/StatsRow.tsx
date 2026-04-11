import { useEffect, useRef, useState } from "react";
import { AnimatedStat } from "@/hooks/useCountUp";

interface StatItem {
  value: string;
  label: string;
}

export default function StatsRow({ stats }: { stats: StatItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {stats.map((s, i) => (
        <div key={i} className={`text-center p-6 hero-stat-card transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: `${i * 100}ms` }}>
          <div className="stat-number mb-1">
            <AnimatedStat value={s.value} />
          </div>
          <div className="text-sm text-muted-foreground">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
