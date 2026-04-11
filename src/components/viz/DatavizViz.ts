import type { CanvasContext, VizRenderFn } from "./utils";
import { getTC, drawMetrics } from "./utils";

const render: VizRenderFn = (c) => {
  let angle = 0, raf = 0;
  const lineData: number[] = [];
  for (let i = 0; i < 80; i++) lineData.push(0.25 + 0.5 * Math.sin(i * 0.2) + 0.15 * Math.random());

  function frame() {
    const ctx = c.ctx, W = c.w, H = c.h;
    const tc = getTC();
    ctx.clearRect(0, 0, W, H);
    const bgG = ctx.createLinearGradient(0, 0, W, H);
    bgG.addColorStop(0, tc.bg1); bgG.addColorStop(1, tc.bg2);
    ctx.fillStyle = bgG; ctx.fillRect(0, 0, W, H);
    angle += 0.008;
    const half = W / 2;
    const cx = half * 0.42, cy = H * 0.45, r = Math.min(cx, cy) * 0.55;
    const slices = [
      { pct: 0.28, color: '#F59E0B', label: 'Sales' },
      { pct: 0.22, color: '#2563EB', label: 'Ops' },
      { pct: 0.18, color: '#06B6D4', label: 'HR' },
      { pct: 0.17, color: '#10B981', label: 'Mktg' },
      { pct: 0.15, color: '#8B5CF6', label: 'Finance' }
    ];
    let a = angle;
    slices.forEach(s => {
      const end = a + s.pct * Math.PI * 2;
      const glow = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r);
      glow.addColorStop(0, s.color + '55'); glow.addColorStop(1, s.color);
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, a, end); ctx.closePath();
      ctx.fillStyle = glow; ctx.fill();
      ctx.strokeStyle = tc.bg2; ctx.lineWidth = 2; ctx.stroke();
      const ma = a + (end - a) / 2;
      const lx = cx + Math.cos(ma) * r * 0.72, ly = cy + Math.sin(ma) * r * 0.72;
      ctx.font = 'bold 9px Inter,sans-serif'; ctx.fillStyle = tc.label; ctx.textAlign = 'center';
      ctx.fillText(s.label, lx, ly);
      a = end;
    });
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.48, 0, Math.PI * 2);
    ctx.fillStyle = tc.bg1; ctx.fill();
    ctx.font = 'bold 12px Inter,sans-serif'; ctx.fillStyle = '#F59E0B'; ctx.textAlign = 'center';
    ctx.fillText('Live', cx, cy - 7);
    ctx.font = '9px Inter,sans-serif'; ctx.fillStyle = tc.gridLabel;
    ctx.fillText('Dashboard', cx, cy + 8);
    const lx2 = half * 1.05, ly2 = H * 0.15, lw = half * 0.88, lh = H * 0.58;
    ctx.strokeStyle = tc.gridLine; ctx.lineWidth = 1;
    for (let g = 0; g <= 4; g++) {
      const gy = ly2 + lh - (g / 4) * lh;
      ctx.beginPath(); ctx.moveTo(lx2, gy); ctx.lineTo(lx2 + lw, gy); ctx.stroke();
    }
    ctx.beginPath();
    lineData.forEach((v, i) => {
      const px = lx2 + (i / (lineData.length - 1)) * lw;
      const py = ly2 + lh - v * lh;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.lineTo(lx2 + lw, ly2 + lh); ctx.lineTo(lx2, ly2 + lh); ctx.closePath();
    const ag = ctx.createLinearGradient(lx2, ly2, lx2, ly2 + lh);
    ag.addColorStop(0, 'rgba(6,182,212,0.35)'); ag.addColorStop(1, 'rgba(6,182,212,0.02)');
    ctx.fillStyle = ag; ctx.fill();
    ctx.beginPath();
    lineData.forEach((v, i) => {
      const px = lx2 + (i / (lineData.length - 1)) * lw;
      const py = ly2 + lh - v * lh;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.strokeStyle = '#06B6D4'; ctx.lineWidth = 2; ctx.stroke();
    const di = Math.floor((Date.now() / 40) % lineData.length);
    const dpx = lx2 + (di / (lineData.length - 1)) * lw;
    const dpy = ly2 + lh - lineData[di] * lh;
    ctx.beginPath(); ctx.arc(dpx, dpy, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#06B6D4'; ctx.fill();
    ctx.beginPath(); ctx.arc(dpx, dpy, 9, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(6,182,212,0.4)'; ctx.lineWidth = 2; ctx.stroke();
    drawMetrics(ctx, W, H, [
      { label: 'Dashboards', value: '120+', color: '#F59E0B' },
      { label: 'Charts Built', value: '600+', color: '#06B6D4' },
      { label: 'Refresh Rate', value: 'Live', color: '#10B981' }
    ]);
    raf = requestAnimationFrame(frame);
  }
  frame();
  return () => cancelAnimationFrame(raf);
};
export default render;
