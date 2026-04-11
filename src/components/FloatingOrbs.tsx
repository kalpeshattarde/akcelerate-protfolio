interface FloatingOrbsProps {
  count?: number;
  className?: string;
}

export default function FloatingOrbs({ count = 3, className = "" }: FloatingOrbsProps) {
  const orbs = [
    { color: "rgba(37,99,235,0.18)", darkColor: "rgba(37,99,235,0.25)", size: 400, top: "-10%", right: "5%", delay: 0, dur: 8 },
    { color: "rgba(6,182,212,0.15)", darkColor: "rgba(6,182,212,0.22)", size: 300, bottom: "10%", left: "8%", delay: 2.5, dur: 11 },
    { color: "rgba(139,92,246,0.12)", darkColor: "rgba(139,92,246,0.18)", size: 250, top: "40%", right: "30%", delay: 5, dur: 14 },
  ].slice(0, count);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbs.map((o, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-orb-float"
          style={{
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle, var(--orb-color, ${o.color}) 0%, transparent 70%)`,
            filter: `blur(${Math.round(o.size * 0.18)}px)`,
            top: (o as any).top,
            right: (o as any).right,
            bottom: (o as any).bottom,
            left: (o as any).left,
            animationDuration: `${o.dur}s`,
            animationDelay: `-${o.delay}s`,
            "--orb-color": o.color,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
