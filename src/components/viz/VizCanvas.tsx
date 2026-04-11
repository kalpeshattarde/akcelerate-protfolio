import { useEffect, useRef } from "react";
import type { CanvasContext, VizRenderFn } from "./utils";

// Lazy-load render functions to keep bundle small
const vizModules: Record<string, () => Promise<{ default: VizRenderFn }>> = {
  neural: () => import("./NeuralViz"),
  flow: () => import("./FlowViz"),
  analytics: () => import("./AnalyticsViz"),
  dataviz: () => import("./DatavizViz"),
  cloud: () => import("./CloudViz"),
  mlops: () => import("./MLOpsViz"),
  saas: () => import("./SaaSViz"),
  strategy: () => import("./StrategyViz"),
  industries: () => import("./IndustriesViz"),
  about: () => import("./AboutViz"),
  casestudies: () => import("./CaseStudiesViz"),
  contact: () => import("./ContactViz"),
  services: () => import("./ServicesViz"),
  pricing: () => import("./PricingViz"),
  insights: () => import("./InsightsViz"),
  founder: () => import("./FounderViz"),
};

interface VizCanvasProps {
  mode: string;
  className?: string;
}

export default function VizCanvas({ mode, className = "" }: VizCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    function resize() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const w = rect.width || el.parentElement?.offsetWidth || 800;
      const h = rect.height || el.parentElement?.offsetHeight || 380;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    const c: CanvasContext = {
      ctx,
      get w() {
        const r = el!.getBoundingClientRect();
        return r.width > 0 ? r.width : el!.parentElement?.offsetWidth || 800;
      },
      get h() {
        const r = el!.getBoundingClientRect();
        return r.height > 0 ? r.height : el!.parentElement?.offsetHeight || 380;
      },
    };

    const loader = vizModules[mode];
    if (loader) {
      loader().then((mod) => {
        if (cancelled) return;
        cleanup = mod.default(c);
      });
    }

    return () => {
      cancelled = true;
      cleanup?.();
      window.removeEventListener("resize", resize);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full z-0 ${className}`}
      style={{ pointerEvents: "none" }}
    />
  );
}
