import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, ...options }
    );
    const targets = el.querySelectorAll(".reveal");
    if (targets.length > 0) targets.forEach((t) => observer.observe(t));
    else observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed.current) {
          revealed.current = true;
          setTimeout(() => {
            el.style.animation = `revealUp 0.7s cubic-bezier(0.33,1,0.68,1) forwards`;
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function RevealGrid({
  children,
  className = "",
  stagger = 100,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed.current) return;

    const items = el.querySelectorAll<HTMLElement>(".reveal-item");
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed.current) {
          revealed.current = true;
          items.forEach((item, i) => {
            setTimeout(() => {
              item.style.animation = `revealUp 0.7s cubic-bezier(0.33,1,0.68,1) forwards`;
            }, i * stagger);
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
