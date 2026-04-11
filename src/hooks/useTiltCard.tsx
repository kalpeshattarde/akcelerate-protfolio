import { useEffect, useRef } from "react";

export function useTiltCard<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const mx = e.clientX - cx;
      const my = e.clientY - cy;
      const rx = Math.min(Math.max(-my / (rect.height / 2) * 6, -6), 6);
      const ry = Math.min(Math.max(mx / (rect.width / 2) * 6, -6), 6);
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      el.style.boxShadow = "0 20px 60px rgba(37,99,235,0.18)";
    };

    const handleLeave = () => {
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
      el.style.boxShadow = "";
    };

    el.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    el.addEventListener("mousemove", handleMove, { passive: true });
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return ref;
}

export function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useTiltCard<HTMLDivElement>();
  return <div ref={ref} className={className}>{children}</div>;
}
