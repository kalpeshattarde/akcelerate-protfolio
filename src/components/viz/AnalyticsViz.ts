import type { CanvasContext, VizRenderFn } from "./utils";
import { lerp, getTC, roundRectFill, drawMetrics } from "./utils";

const render: VizRenderFn = (c) => {
  const bars = [
    { label: 'Jan', target: 0.45, color: '#06B6D4' },
    { label: 'Feb', target: 0.60, color: '#2563EB' },
    { label: 'Mar', target: 0.55, color: '#06B6D4' },
    { label: 'Apr', target: 0.80, color: '#8B5CF6' },
    { label: 'May', target: 0.72, color: '#2563EB' },
    { label: 'Jun', target: 0.90, color: '#10B981' },
    { label: 'Jul', target: 0.68, color: '#F59E0B' },
    { label: 'Aug', target: 0.95, color: '#06B6D4' }
  ];
  let vals = bars.map(() => 0), phase = 0;
  const line: number[] = [];
  for (let i = 0; i < 60; i++) line.push(0.3 + 0.4 * Math.sin(i * 0.18) + 0.1 * Math.random());
  let raf = 0;

  function frame() {
    const ctx = c.ctx, W = c.w, H = c.h;
    const tc = getTC();
    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    phase += 0.012;
    vals = vals.map((v, i) => lerp(v, bars[i].target, 0.04));
    ctx.strokeStyle = tc.gridLine; ctx.lineWidth = 1;
    for (let g = 1; g <= 4; g++) {
      const y = H * 0.82 - (H * 0.62) * (g / 4);
      ctx.beginPath(); ctx.moveTo(W * 0.05, y); ctx.lineTo(W * 0.95, y); ctx.stroke();
      ctx.font = '9px Inter,sans-serif'; ctx.fillStyle = tc.gridLabel; ctx.textAlign = 'right';
      ctx.fillText(Math.round(g * 25) + '%', W * 0.04, y + 3);
    }
    const bw = (W * 0.85) / (bars.length * 1.6);
    const gap = (W * 0.85 - bw * bars.length) / (bars.length + 1);
    bars.forEach((b, i) => {
      const bh = vals[i] * H * 0.62;
      const bx = W * 0.07 + gap + i * (bw + gap);
      const by = H * 0.82 - bh;
      const grd = ctx.createLinearGradient(bx, by, bx, H * 0.82);
      grd.addColorStop(0, b.color); grd.addColorStop(1, b.color + '44');
      ctx.fillStyle = grd;
      roundRectFill(ctx, bx, by, bw, bh, 4);
      roundRectFill(ctx, bx, by, bw, 3, 2, 'rgba(255,255,255,0.5)');
      ctx.font = '9px Inter,sans-serif'; ctx.fillStyle = tc.gridLabel; ctx.textAlign = 'center';
      ctx.fillText(b.label, bx + bw / 2, H * 0.89);
      if (vals[i] > 0.1) {
        ctx.font = 'bold 9px Inter,sans-serif'; ctx.fillStyle = b.color;
        ctx.fillText(Math.round(vals[i] * 100) + '%', bx + bw / 2, by - 5);
      }
    });
    ctx.beginPath(); ctx.strokeStyle = 'rgba(16,185,129,0.6)'; ctx.lineWidth = 2;
    line.forEach((v, i) => {
      const x = W * 0.07 + (i / 59) * W * 0.86;
      const y = H * 0.82 - v * H * 0.55;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
    drawMetrics(ctx, W, H, [
      { label: 'Reports/Day', value: '240+', color: '#06B6D4' },
      { label: 'Data Sources', value: '180+', color: '#2563EB' },
      { label: 'Latency', value: '<50ms', color: '#10B981' }
    ]);
    raf = requestAnimationFrame(frame);
  }
  frame();
  return () => cancelAnimationFrame(raf);
};
export default render;
