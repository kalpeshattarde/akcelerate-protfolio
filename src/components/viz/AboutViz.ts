import type { CanvasContext, VizRenderFn } from "./utils";
import { lerp, getTC, roundRectFill, roundRectStroke } from "./utils";

const render: VizRenderFn = (c) => {
  const pts = [12, 18, 22, 28, 35, 45, 60, 75, 90, 108, 130, 150];
  let vals = pts.map(() => 0), t = 0, raf = 0;
  const stats = [
    { label: 'Years', value: 5, color: '#2563EB', icon: '📅' },
    { label: 'Clients', value: 120, color: '#10B981', icon: '🤝' },
    { label: 'Projects', value: 340, color: '#8B5CF6', icon: '💼' },
    { label: 'Countries', value: 8, color: '#F59E0B', icon: '🌍' }
  ];
  let dispVals = stats.map(() => 0);

  function frame() {
    const ctx = c.ctx, W = c.w, H = c.h;
    const tc = getTC();
    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    t += 0.016;
    vals = vals.map((v, i) => lerp(v, pts[i] / 150, 0.04));
    dispVals = dispVals.map((v, i) => lerp(v, stats[i].value, 0.05));
    const lx = W * 0.06, ly = H * 0.05, lw = W * 0.88, lh = H * 0.45;
    ctx.strokeStyle = tc.gridLine; ctx.lineWidth = 1;
    for (let g = 1; g <= 4; g++) {
      const gy = ly + lh - (g / 4) * lh;
      ctx.beginPath(); ctx.moveTo(lx, gy); ctx.lineTo(lx + lw, gy); ctx.stroke();
    }
    ctx.beginPath();
    vals.forEach((v, i) => {
      const px = lx + (i / (vals.length - 1)) * lw;
      const py = ly + lh - v * lh;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.lineTo(lx + lw, ly + lh); ctx.lineTo(lx, ly + lh); ctx.closePath();
    const ag = ctx.createLinearGradient(lx, ly, lx, ly + lh);
    ag.addColorStop(0, 'rgba(37,99,235,0.4)'); ag.addColorStop(1, 'rgba(37,99,235,0.03)');
    ctx.fillStyle = ag; ctx.fill();
    ctx.beginPath();
    vals.forEach((v, i) => {
      const px = lx + (i / (vals.length - 1)) * lw;
      const py = ly + lh - v * lh;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.strokeStyle = '#2563EB'; ctx.lineWidth = 2; ctx.stroke();
    const years = ['2019','2020','2021','2022','2023','2024','2025'];
    vals.forEach((v, i) => {
      if (i % 2 !== 0) return;
      const px = lx + (i / (vals.length - 1)) * lw;
      const py = ly + lh - v * lh;
      ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fillStyle = '#2563EB'; ctx.fill();
      ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(37,99,235,0.4)'; ctx.lineWidth = 2; ctx.stroke();
      ctx.font = '8px Inter,sans-serif'; ctx.fillStyle = tc.gridLabel; ctx.textAlign = 'center';
      ctx.fillText(years[i / 2] || '', px, ly + lh + 14);
    });
    ctx.font = '9px Inter,sans-serif'; ctx.fillStyle = '#60A5FA'; ctx.textAlign = 'left';
    ctx.fillText('Client Growth Trajectory', lx, ly - 4);
    stats.forEach((s, i) => {
      const cw = (W - W * 0.08) / stats.length - 8;
      const sx = W * 0.04 + i * (cw + 8);
      const sy = H * 0.62;
      roundRectFill(ctx, sx, sy, cw, H * 0.28, 10, s.color + '15');
      ctx.strokeStyle = s.color + '40'; ctx.lineWidth = 1;
      roundRectStroke(ctx, sx, sy, cw, H * 0.28, 10);
      ctx.font = '18px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(s.icon, sx + cw / 2, sy + 28);
      ctx.font = 'bold 16px Inter,sans-serif'; ctx.fillStyle = s.color;
      ctx.fillText(Math.round(dispVals[i]) + (s.value > 10 ? '+' : ''), sx + cw / 2, sy + 52);
      ctx.font = '8px Inter,sans-serif'; ctx.fillStyle = tc.gridLabel;
      ctx.fillText(s.label, sx + cw / 2, sy + 67);
    });
    raf = requestAnimationFrame(frame);
  }
  frame();
  return () => cancelAnimationFrame(raf);
};
export default render;
