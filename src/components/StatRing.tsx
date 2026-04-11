import { useEffect, useRef, useState } from "react";

interface StatRingProps {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  className?: string;
}

export default function StatRing({ value, size = 80, stroke = 6, label, className = "" }: StatRingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`flex flex-col items-center ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-muted"
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={visible ? circ - dash : circ}
          className="stroke-primary transition-all duration-[1400ms] ease-out"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%" y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={Math.round(size * 0.2)}
          fontWeight={700}
          className="fill-primary font-poppins"
        >
          {value}%
        </text>
      </svg>
      {label && <span className="text-xs text-muted-foreground mt-1">{label}</span>}
    </div>
  );
}
