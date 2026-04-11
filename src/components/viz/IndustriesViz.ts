import type { CanvasContext, VizRenderFn } from "./utils";
import { lerp, getTC, roundRectFill, roundRectStroke } from "./utils";

const render: VizRenderFn = (c) => {
  const inds = [
    { label: 'Manufacturing', color: '#2563EB' }, { label: 'FinTech', color: '#F59E0B' },
    { label: 'Healthcare', color: '#10B981' }, { label: 'Retail', color: '#EC4899' },
    { label: 'Logistics', color: '#06B6D4' }, { label: 'SaaS', color: '#8B5CF6' },
    { label: 'E-comm', color: '#F97316' }, { label: 'Real Estate', color: '#14B8A6' },
    { label: 'Education', color: '#84CC16' }, { label: 'Startups', color: '#FB7185' },
    { label: 'SMBs', color: '#A78BFA' }, { label: 'Enterprise', color: '#60A5FA' }
  ];
  let t = 0, raf = 0;
  let orbitR: number, cx: number, cy: number;
  function recalc() { cx = c.w * 0.5; cy = c.h * 0.5; orbitR = Math.min(c.w, c.h) * 0.36; }
  recalc();
  const onResize = () => recalc();
  window.addEventListener("resize", onResize);

  function frame() {
    const ctx = c.ctx, W = c.w, H = c.h;
    const tc = getTC();
    ctx.clearRect(0, 0, W, H);
    const bgG = ctx.createLinearGradient(0, 0, W, H);
    bgG.addColorStop(0, tc.bg1); bgG.addColorStop(1, tc.bg2);
    ctx.fillStyle = bgG; ctx.fillRect(0, 0, W, H);
    t += 0.003;
    ctx.beginPath(); ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(99,102,241,0.1)'; ctx.lineWidth = 1; ctx.stroke();
    inds.forEach((ind, i) => {
      const a = t + (i / inds.length) * Math.PI * 2;
      const nx = cx + Math.cos(a) * orbitR, ny = cy + Math.sin(a) * orbitR;
      ctx.strokeStyle = ind.color + '33'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(nx, ny); ctx.stroke();
      const pp = ((t * 0.5 + i * 0.3) % 1);
      const ppx = lerp(cx, nx, pp), ppy = lerp(cy, ny, pp);
      const pg = ctx.createRadialGradient(ppx, ppy, 0, ppx, ppy, 5);
      pg.addColorStop(0, ind.color + 'CC'); pg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath(); ctx.arc(ppx, ppy, 5, 0, Math.PI * 2);
      ctx.fillStyle = pg; ctx.fill();
      const nr = 22;
      const gn = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr * 1.5);
      gn.addColorStop(0, ind.color + '30'); gn.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gn; ctx.beginPath(); ctx.arc(nx, ny, nr * 1.5, 0, Math.PI * 2); ctx.fill();
      roundRectFill(ctx, nx - nr, ny - 13, nr * 2, 26, 8, ind.color + '22');
      ctx.strokeStyle = ind.color + '88'; ctx.lineWidth = 1;
      roundRectStroke(ctx, nx - nr, ny - 13, nr * 2, 26, 8);
      ctx.font = '8.5px Inter,sans-serif'; ctx.fillStyle = tc.textMid; ctx.textAlign = 'center';
      ctx.fillText(ind.label, nx, ny + 4);
    });
    const hr = Math.min(W, H) * 0.1;
    const hg = ctx.createRadialGradient(cx, cy, 0, cx, cy, hr);
    hg.addColorStop(0, 'rgba(37,99,235,0.5)'); hg.addColorStop(1, 'rgba(37,99,235,0.05)');
    ctx.beginPath(); ctx.arc(cx, cy, hr, 0, Math.PI * 2); ctx.fillStyle = hg; ctx.fill();
    ctx.strokeStyle = 'rgba(99,102,241,0.5)'; ctx.lineWidth = 2; ctx.stroke();
    ctx.font = 'bold 12px Inter,sans-serif'; ctx.fillStyle = '#93C5FD'; ctx.textAlign = 'center';
    ctx.fillText('AKcelerate', cx, cy - 6);
    ctx.font = '9px Inter,sans-serif'; ctx.fillStyle = tc.gridLabel;
    ctx.fillText('12 Industries', cx, cy + 10);
    raf = requestAnimationFrame(frame);
  }
  frame();
  return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
};
export default render;
