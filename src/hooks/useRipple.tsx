import { useCallback, useRef, MouseEvent } from "react";

export function useRipple() {
  const ref = useRef<HTMLElement>(null);

  const onRipple = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement("span");
    ripple.style.cssText = [
      "position:absolute",
      `width:${size}px`,
      `height:${size}px`,
      "border-radius:50%",
      "background:rgba(255,255,255,0.25)",
      `left:${e.clientX - rect.left - size / 2}px`,
      `top:${e.clientY - rect.top - size / 2}px`,
      "transform:scale(0)",
      "animation:akRipple 0.6s ease-out forwards",
      "pointer-events:none",
    ].join(";");
    el.style.overflow = "hidden";
    el.style.position = el.style.position || "relative";
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  }, []);

  return { ref, onRipple };
}
