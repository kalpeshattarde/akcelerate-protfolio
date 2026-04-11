import type { CanvasContext, VizRenderFn } from "./utils";
import { rnd, lerp, getTC, roundRect, drawMetrics } from "./utils";

const render: VizRenderFn = (c) => {
  const nodes = [
    { id: 'T', label: 'Trigger',  x: 0.08, y: 0.50, w: 100, h: 38, color: '#2563EB' },
    { id: 'F', label: 'Filter',   x: 0.27, y: 0.50, w: 90,  h: 38, color: '#0891B2' },
    { id: 'A', label: 'Action A', x: 0.50, y: 0.20, w: 100, h: 38, color: '#059669' },
    { id: 'B', label: 'Action B', x: 0.50, y: 0.80, w: 100, h: 38, color: '#7C3AED' },
    { id: 'N', label: 'Notify',   x: 0.74, y: 0.20, w: 90,  h: 38, color: '#D97706' },
    { id: 'D', label: 'Done ✓',   x: 0.90, y: 0.50, w: 90,  h: 38, color: '#10B981' }
  ];
  const edges = [
    { from: 'T', to: 'F' }, { from: 'F', to: 'A' }, { from: 'F', to: 'B' },
    { from: 'A', to: 'N' }, { from: 'N', to: 'D' }, { from: 'B', to: 'D' }
  ];
  let pulses: { e: typeof edges[0]; p: number; speed: number }[] = [];
  let t = 0, raf = 0;
  const getNode = (id: string) => nodes.find(n => n.id === id)!;
  const nodePos = (n: typeof nodes[0]) => ({ x: n.x * c.w, y: n.y * c.h });

  function frame() {
    const ctx = c.ctx, W = c.w, H = c.h;
    const tc = getTC();
    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    t += 0.016;
    edges.forEach(e => {
      const a = nodePos(getNode(e.from)), b = nodePos(getNode(e.to));
      ctx.strokeStyle = 'rgba(37,99,235,0.25)'; ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]); ctx.lineDashOffset = -t * 15;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      ctx.setLineDash([]);
    });
    if (Math.random() < 0.025) {
      const e = edges[Math.floor(Math.random() * edges.length)];
      pulses.push({ e, p: 0, speed: rnd(0.008, 0.018) });
    }
    pulses = pulses.filter(pu => {
      pu.p += pu.speed;
      if (pu.p > 1) return false;
      const a = nodePos(getNode(pu.e.from)), b = nodePos(getNode(pu.e.to));
      const x = lerp(a.x, b.x, pu.p), y = lerp(a.y, b.y, pu.p);
      const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
      g.addColorStop(0, 'rgba(96,165,250,1)'); g.addColorStop(1, 'rgba(37,99,235,0)');
      ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      return true;
    });
    nodes.forEach(n => {
      const { x, y } = nodePos(n);
      const glow = 0.15 + 0.06 * Math.sin(t * 2 + n.x * 10);
      ctx.shadowColor = n.color; ctx.shadowBlur = 12 * glow * 6;
      const rx = x - n.w / 2, ry = y - n.h / 2;
      ctx.fillStyle = n.color + '22'; ctx.strokeStyle = n.color; ctx.lineWidth = 1.5;
      roundRect(ctx, rx, ry, n.w, n.h, 8); ctx.fill(); ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.font = 'bold 11px Inter,sans-serif'; ctx.fillStyle = tc.label;
      ctx.textAlign = 'center'; ctx.fillText(n.label, x, y + 4);
    });
    drawMetrics(ctx, W, H, [
      { label: 'ROI Gain', value: '315%', color: '#2563EB' },
      { label: 'Hrs Saved', value: '40h+', color: '#06B6D4' },
      { label: 'Deploy', value: '3–4wks', color: '#10B981' }
    ]);
    raf = requestAnimationFrame(frame);
  }
  frame();
  return () => cancelAnimationFrame(raf);
};
export default render;
