import type { CanvasContext, VizRenderFn } from "./utils";
import { rnd, lerp, getTC, drawMetrics } from "./utils";

const render: VizRenderFn = (c) => {
  const layers = [3, 5, 5, 4, 2];
  let nodes: { x: number; y: number; layer: number; pulse: number }[] = [];
  let edges: { a: number; b: number; speed: number }[] = [];
  let pulses: { edge: typeof edges[0]; p: number; speed: number }[] = [];
  let t = 0;
  let raf = 0;

  function build() {
    nodes = []; edges = [];
    const W = c.w, H = c.h;
    const colX = layers.map((_, i) => W * 0.10 + (W * 0.80) * i / (layers.length - 1));
    const vSpacing = Math.min(Math.round(H * 0.175), 65);
    layers.forEach((n, li) => {
      const startY = H * 0.46 - (n - 1) * vSpacing / 2;
      for (let ni = 0; ni < n; ni++) {
        nodes.push({ x: colX[li], y: startY + ni * vSpacing, layer: li, pulse: Math.random() });
      }
    });
    let base = 0;
    layers.forEach((n, li) => {
      if (li === layers.length - 1) return;
      const next = layers[li + 1];
      for (let a = 0; a < n; a++) for (let b = 0; b < next; b++) {
        edges.push({ a: base + a, b: base + n + b, speed: rnd(0.003, 0.009) });
      }
      base += n;
    });
  }
  build();
  const onResize = () => build();
  window.addEventListener("resize", onResize);

  function frame() {
    const ctx = c.ctx, W = c.w, H = c.h;
    const tc = getTC();
    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    t += 0.016;
    edges.forEach(e => {
      const a = nodes[e.a], b = nodes[e.b];
      const alpha = 0.08 + 0.06 * Math.sin(t * 1.5 + e.speed * 100);
      ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    });
    if (Math.random() < 0.04) {
      const e = edges[Math.floor(Math.random() * edges.length)];
      pulses.push({ edge: e, p: 0, speed: rnd(0.012, 0.025) });
    }
    pulses = pulses.filter(pu => {
      pu.p += pu.speed;
      if (pu.p > 1) return false;
      const a = nodes[pu.edge.a], b = nodes[pu.edge.b];
      const x = lerp(a.x, b.x, pu.p), y = lerp(a.y, b.y, pu.p);
      const grd = ctx.createRadialGradient(x, y, 0, x, y, 7);
      grd.addColorStop(0, 'rgba(167,139,250,0.95)');
      grd.addColorStop(1, 'rgba(139,92,246,0)');
      ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fillStyle = grd; ctx.fill();
      return true;
    });
    nodes.forEach(n => {
      n.pulse += 0.03;
      const glow = 0.15 + 0.08 * Math.sin(n.pulse);
      const r = 7 + 2 * Math.sin(n.pulse * 0.7);
      const g1 = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3);
      g1.addColorStop(0, `rgba(167,139,250,${glow + 0.3})`);
      g1.addColorStop(1, 'rgba(139,92,246,0)');
      ctx.beginPath(); ctx.arc(n.x, n.y, r * 3, 0, Math.PI * 2);
      ctx.fillStyle = g1; ctx.fill();
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = '#7C3AED'; ctx.fill();
      ctx.beginPath(); ctx.arc(n.x, n.y, r - 2, 0, Math.PI * 2);
      ctx.fillStyle = '#A78BFA'; ctx.fill();
    });
    const lbls = ['Input', 'Hidden 1', 'Hidden 2', 'Output', 'Predict'];
    const cols = layers.map((_, i) => c.w * 0.10 + (c.w * 0.80) * i / (layers.length - 1));
    ctx.font = '10px Inter,sans-serif'; ctx.fillStyle = tc.gridLabel; ctx.textAlign = 'center';
    lbls.forEach((l, i) => ctx.fillText(l, cols[i], H - 10));
    drawMetrics(ctx, W, H, [
      { label: 'Model Accuracy', value: '95.4%', color: '#A78BFA' },
      { label: 'Training Time', value: '2.3h', color: '#06B6D4' },
      { label: 'Predictions/sec', value: '12K+', color: '#10B981' }
    ]);
    raf = requestAnimationFrame(frame);
  }
  frame();
  return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
};
export default render;
