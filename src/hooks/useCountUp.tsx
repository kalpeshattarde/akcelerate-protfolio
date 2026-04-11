import { useEffect, useRef, useState } from "react";

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
  duration: number = 2000,
  trigger: boolean = true
): { value: number; done: boolean } {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!trigger) return;
    setDone(false);

    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(eased * target);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDone(true);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, trigger, decimals]);

  const display = decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.round(value);
  return { value: display, done };
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

  const { value: count, done } = useCountUp(number, decimals, 2000, visible);

  return (
    <span ref={ref} className={`${className} ${done ? "counter-complete" : ""}`}>
      {prefix}{decimals > 0 ? count.toFixed(decimals) : count}{suffix}
    </span>
  );
}
