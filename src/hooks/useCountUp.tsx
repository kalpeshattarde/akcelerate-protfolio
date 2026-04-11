import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Parses a stat string like "315%", "50+", "2–4", "₹2.4Cr", "99.7%"
 * Returns { prefix, number, suffix } where number is the animatable part.
 */
function parseStatValue(val: string): { prefix: string; number: number; decimals: number; suffix: string } {
  const match = val.match(/^([^\d]*?)([\d.]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, decimals: 0, suffix: val };
  const numStr = match[2];
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix: match[1], number: parseFloat(numStr), decimals, suffix: match[3] };
}

export function useCountUp(
  target: number,
  decimals: number = 0,
  duration: number = 1600,
  trigger: boolean = true
): number {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!trigger) return;

    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, trigger, decimals]);

  return decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.round(value);
}

export function AnimatedStat({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { prefix, number, decimals, suffix } = parseStatValue(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(number, decimals, 1600, visible);

  return (
    <span ref={ref} className={className}>
      {prefix}{decimals > 0 ? count.toFixed(decimals) : count}{suffix}
    </span>
  );
}
