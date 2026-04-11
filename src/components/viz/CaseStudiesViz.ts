import type { CanvasContext, VizRenderFn } from "./utils";
import { rnd, getTC, roundRect, roundRectFill, roundRectStroke, drawVizFrame } from "./utils";

const render: VizRenderFn = (c) => {
  let t = 0, raf = 0;
  const cases = [
    { label: 'Automotive', metric: '42%', sub: 'Downtime Cut', col: '#2563EB', pct: 0.42 },
    { label: 'Pharma', metric: '31%', sub: 'OEE Gain', col: '#06B6D4', pct: 0.31 },
    { label: 'FMCG', metric: '5.2×', sub: 'ROI', col: '#8B5CF6', pct: 0.72 },
    { label: 'Logistics', metric: '28%', sub: 'Cost Save', col: '#22C55E', pct: 0.28 },
    { label: 'Energy', metric: '19%', sub: 'Efficiency', col: '#F59E0B', pct: 0.19 }
  ];
  let active = 0, switchTimer = 0;
  const particles = Array.from({ length: 25 }, () => ({
    x: rnd(0, c.w), y: rnd(0, c.h), r: rnd(1, 2.2), vy: rnd(-0.3, -0.1), opacity: rnd(0.2, 0.5)
  }));

  function frame() {
    const ctx = c.ctx, W = c.w, H = c.h;
    const tc = getTC();
    ctx.clearRect(0, 0, W, H);
    t += 0.018; switchTimer++;
    if (switchTimer > 130) { active = (active + 1) % cases.length; switchTimer = 0; }
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    particles.forEach(p => {
      p.y += p.vy; if (p.y < -5) p.y = H + 5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(37,99,235,' + p.opacity + ')'; ctx.fill();
    });
    const bx = W * 0.05, bw = W * 0.45, barH = (H * 0.65) / cases.length, by0 = H * 0.12;
    cases.forEach((cs, i) => {
      const y = by0 + i * (barH + H * 0.022);
      const progress = Math.min(1, Math.max(0, (t - i * 0.3) * 0.8));
      const isActive = i === active;
      roundRectFill(ctx, bx, y + barH * 0.35, bw, barH * 0.3, 3, tc.trackFill);
      const fillW = bw * cs.pct * progress;
      const gr = ctx.createLinearGradient(bx, 0, bx + fillW, 0);
      gr.addColorStop(0, cs.col + 'aa'); gr.addColorStop(1, cs.col);
      roundRectFill(ctx, bx, y + barH * 0.35, fillW, barH * 0.3, 3, gr);
      if (isActive) {
        ctx.shadowColor = cs.col; ctx.shadowBlur = 12;
        roundRectFill(ctx, bx, y + barH * 0.35, fillW, barH * 0.3, 3, gr);
        ctx.shadowBlur = 0;
      }
      ctx.fillStyle = isActive ? tc.label : tc.textMid;
      ctx.font = (isActive ? '600' : '400') + ' ' + Math.round(H * 0.042) + 'px Poppins,sans-serif';
      ctx.fillText(cs.label, bx, y + barH * 0.28);
      ctx.fillStyle = cs.col;
      ctx.font = '700 ' + Math.round(H * 0.048) + 'px Poppins,sans-serif';
      ctx.fillText(cs.metric, bx + bw + W * 0.025, y + barH * 0.6);
      ctx.fillStyle = tc.textFaint;
      ctx.font = '400 ' + Math.round(H * 0.036) + 'px Inter,sans-serif';
      ctx.fillText(cs.sub, bx + bw + W * 0.025, y + barH * 0.88);
    });
    const c2 = cases[active];
    const px = W * 0.54, py = H * 0.12, pw = W * 0.42, ph = H * 0.58;
    roundRectFill(ctx, px, py, pw, ph, 12, tc.panelBg);
    ctx.strokeStyle = c2.col + '44'; ctx.lineWidth = 1;
    roundRectStroke(ctx, px, py, pw, ph, 12);
    ctx.font = '800 ' + Math.round(H * 0.18) + 'px Poppins,sans-serif';
    const gr2 = ctx.createLinearGradient(px, py, px + pw, py + ph);
    gr2.addColorStop(0, c2.col); gr2.addColorStop(1, '#06B6D4');
    ctx.fillStyle = gr2; ctx.textAlign = 'center';
    ctx.fillText(c2.metric, px + pw / 2, py + ph * 0.48);
    ctx.fillStyle = tc.textMid;
    ctx.font = '600 ' + Math.round(H * 0.058) + 'px Poppins,sans-serif';
    ctx.fillText(c2.sub, px + pw / 2, py + ph * 0.65);
    ctx.fillStyle = tc.textFaint;
    ctx.font = '400 ' + Math.round(H * 0.04) + 'px Inter,sans-serif';
    ctx.fillText(c2.label + ' Industry', px + pw / 2, py + ph * 0.78);
    ctx.textAlign = 'left';
    drawVizFrame(ctx, W, H, 'Case Study Results');
    raf = requestAnimationFrame(frame);
  }
  frame();
  return () => cancelAnimationFrame(raf);
};
export default render;
