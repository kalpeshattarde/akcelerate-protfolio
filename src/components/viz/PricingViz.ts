import type { CanvasContext, VizRenderFn } from "./utils";
import { getTC, roundRectFill, roundRectStroke, drawVizFrame } from "./utils";

const render: VizRenderFn = (c) => {
  let t = 0, raf = 0, animate = 0;
  const dims = ['Scalability','AI Depth','Support','Custom','Speed','Value'];
  const plans = [
    { name: 'Starter', col: '#64748B', vals: [0.4,0.3,0.4,0.2,0.5,0.5], lineWidth: 1.5 },
    { name: 'Professional', col: '#2563EB', vals: [0.75,0.7,0.75,0.65,0.8,0.85], lineWidth: 2.5 },
    { name: 'Enterprise', col: '#06B6D4', vals: [1,0.95,1,1,0.95,1], lineWidth: 2 }
  ];
  const cx0 = c.w * 0.35, cy0 = c.h * 0.52;
  const R0 = Math.min(c.w * 0.28, c.h * 0.38);

  function radarPt(i: number, val: number, cx: number, cy: number, R: number) {
    const angle = (i / dims.length) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + R * val * Math.cos(angle), y: cy + R * val * Math.sin(angle) };
  }

  function frame() {
    const ctx = c.ctx, W = c.w, H = c.h;
    const tc = getTC();
    ctx.clearRect(0, 0, W, H);
    t += 0.015; animate = Math.min(1, animate + 0.015);
    const cx = W * 0.35, cy = H * 0.52, R = Math.min(W * 0.28, H * 0.38);
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    for (let ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      dims.forEach((_, i) => {
        const pt = radarPt(i, ring / 4, cx, cy, R);
        i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();
      ctx.strokeStyle = tc.orbitRing; ctx.lineWidth = 0.8; ctx.stroke();
    }
    dims.forEach((d, i) => {
      const pt = radarPt(i, 1, cx, cy, R);
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(pt.x, pt.y);
      ctx.strokeStyle = tc.orbitRing; ctx.lineWidth = 0.8; ctx.stroke();
      const lx = cx + (R * 1.22) * Math.cos((i / dims.length) * Math.PI * 2 - Math.PI / 2);
      const ly = cy + (R * 1.22) * Math.sin((i / dims.length) * Math.PI * 2 - Math.PI / 2);
      ctx.fillStyle = tc.textMid;
      ctx.font = '500 ' + Math.round(H * 0.04) + 'px Inter,sans-serif';
      ctx.textAlign = lx < cx - 5 ? 'right' : lx > cx + 5 ? 'left' : 'center';
      ctx.fillText(d, lx, ly + 4);
    });
    ctx.textAlign = 'left';
    plans.forEach(plan => {
      ctx.beginPath();
      plan.vals.forEach((v, i) => {
        const pt = radarPt(i, v * animate, cx, cy, R);
        i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();
      ctx.fillStyle = plan.col + '22'; ctx.fill();
      ctx.strokeStyle = plan.col; ctx.lineWidth = plan.lineWidth; ctx.stroke();
    });
    const lx2 = W * 0.62, ly2 = H * 0.18;
    ctx.font = '600 ' + Math.round(H * 0.048) + 'px Poppins,sans-serif';
    ctx.fillStyle = tc.text;
    ctx.fillText('Plan Comparison', lx2, ly2);
    plans.forEach((plan, i) => {
      const by = ly2 + H * 0.1 + i * H * 0.24;
      roundRectFill(ctx, lx2, by, W * 0.32, H * 0.18, 10, tc.panelBg);
      ctx.strokeStyle = plan.col + '55'; ctx.lineWidth = 1;
      roundRectStroke(ctx, lx2, by, W * 0.32, H * 0.18, 10);
      ctx.beginPath(); ctx.arc(lx2 + 16, by + H * 0.06, 5, 0, Math.PI * 2);
      ctx.fillStyle = plan.col; ctx.fill();
      ctx.fillStyle = tc.label;
      ctx.font = '700 ' + Math.round(H * 0.045) + 'px Poppins,sans-serif';
      ctx.fillText(plan.name, lx2 + 28, by + H * 0.072);
      const avgScore = plan.vals.reduce((a, b) => a + b, 0) / plan.vals.length;
      roundRectFill(ctx, lx2 + 10, by + H * 0.11, W * 0.3 - 10, 5, 3, tc.trackFill);
      const fillW = (W * 0.3 - 10) * avgScore * animate;
      const barGr = ctx.createLinearGradient(lx2 + 10, 0, lx2 + 10 + fillW, 0);
      barGr.addColorStop(0, plan.col); barGr.addColorStop(1, '#06B6D4');
      roundRectFill(ctx, lx2 + 10, by + H * 0.11, fillW, 5, 3, barGr);
      ctx.fillStyle = plan.col;
      ctx.font = '600 ' + Math.round(H * 0.038) + 'px Inter,sans-serif';
      ctx.fillText(Math.round(avgScore * 100) + '%', lx2 + W * 0.3, by + H * 0.135);
    });
    drawVizFrame(ctx, W, H, 'Plan Value Radar');
    raf = requestAnimationFrame(frame);
  }
  frame();
  return () => cancelAnimationFrame(raf);
};
export default render;
