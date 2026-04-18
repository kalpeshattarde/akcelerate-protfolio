import { forwardRef, useEffect, useRef } from "react";

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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px", ...options }
    );

    const targets = el.querySelectorAll(".reveal");
    if (targets.length > 0) {
      targets.forEach((t) => observer.observe(t));
    } else {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const RevealSection = forwardRef<HTMLDivElement, RevealSectionProps>(
  function RevealSection({ children, className = "", delay = 0 }, forwardedRef) {
    const localRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const el = localRef.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add("revealed"), delay);
            observer.unobserve(el);
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, [delay]);

    const setRefs = (node: HTMLDivElement | null) => {
      (localRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    return (
      <div ref={setRefs} className={`reveal ${className}`}>
        {children}
      </div>
    );
  }
);

interface RevealGridProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}

export const RevealGrid = forwardRef<HTMLDivElement, RevealGridProps>(
  function RevealGrid({ children, className = "", stagger = 100 }, forwardedRef) {
    const localRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const el = localRef.current;
      if (!el) return;
      const items = el.querySelectorAll(".reveal-item");
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            items.forEach((item, i) => {
              setTimeout(() => item.classList.add("revealed"), i * stagger);
            });
            observer.unobserve(el);
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, [stagger]);

    const setRefs = (node: HTMLDivElement | null) => {
      (localRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    return (
      <div ref={setRefs} className={className}>
        {children}
      </div>
    );
  }
);
