import { useEffect, useRef } from "react";

interface HeroParticlesProps {
  className?: string;
}

export default function HeroParticles({ className = "" }: HeroParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT = 55;
    const SPEED = 0.4;
    const CONNECT_DIST = 130;
    const RADIUS = 2.2;

    let W = 0, H = 0;
    let pts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    function isDark() {
      return document.documentElement.classList.contains("dark");
    }

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const pr = window.devicePixelRatio || 1;
      W = parent.offsetWidth;
      H = parent.offsetHeight;
      canvas!.width = Math.round(W * pr);
      canvas!.height = Math.round(H * pr);
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(pr, 0, 0, pr, 0, 0);
    }

    function spawn() {
      pts = [];
      for (let i = 0; i < COUNT; i++) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * SPEED * 2,
          vy: (Math.random() - 0.5) * SPEED * 2,
          r: 1.4 + Math.random() * (RADIUS - 1.4),
        });
      }
    }

    function frame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      const dark = isDark();
      const dotColor = dark ? "rgba(6,182,212,0.45)" : "rgba(37,99,235,0.45)";
      const lineBase = dark ? [6, 182, 212] : [37, 99, 235];

      pts.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.6;
            ctx.strokeStyle = `rgba(${lineBase[0]},${lineBase[1]},${lineBase[2]},${alpha.toFixed(2)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      pts.forEach(p => {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = dotColor;
        ctx!.fill();
      });

      rafRef.current = requestAnimationFrame(frame);
    }

    resize();
    spawn();
    frame();

    const onResize = () => { resize(); spawn(); };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}
