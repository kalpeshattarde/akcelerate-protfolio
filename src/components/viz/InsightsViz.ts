import type { CanvasContext, VizRenderFn } from "./utils";
import { rnd, getTC, roundRectFill, drawVizFrame } from "./utils";

const render: VizRenderFn = (c) => {
  let t = 0, raf = 0;
  const categories = ['AI Strategy','Automation','Data Ops','Cloud','MLOps'];
  const colors = ['#2563EB','#06B6D4','#8B5CF6','#22C55E','#F59E0B'];
  const sparks = categories.map(() => {
    const pts: number[] = [];
    for (let i = 0; i < 24; i++) pts.push(rnd(0.2, 0.9));
    return pts;
  });
  const particles = Array.from({ length: 30 }, (_, i) => ({
    x: rnd(0, c.w), y: rnd(0, c.h), vx: rnd(-0.25, 0.25), vy: rnd(-0.4, -0.1), r: rnd(1, 2), col: colors[i % colors.length]
  }));

  function frame() {
    const ctx = c.ctx, W = c.w, H = c.h;
    const tc = getTC();
    ctx.clearRect(0, 0, W, H);
    t += 0.016;
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -4) p.y = H + 4;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col + '55'; ctx.fill();
    });
    const bx = W * 0.04, bw = W * 0.44;
    categories.forEach((cat, i) => {
      const by = H * 0.12 + i * H * 0.15;
      const heat = 0.3 + 0.5 * Math.abs(Math.sin(t * 0.3 + i));
      roundRectFill(ctx, bx, by + H * 0.06, bw, H * 0.06, 3, tc.trackFill);
      const fillW = bw * heat;
      const gr = ctx.createLinearGradient(bx, 0, bx + fillW, 0);
      gr.addColorStop(0, colors[i] + 'dd'); gr.addColorStop(1, colors[i]);
      roundRectFill(ctx, bx, by + H * 0.06, fillW, H * 0.06, 3, gr);
      ctx.fillStyle = tc.text;
      ctx.font = '500 ' + Math.round(H * 0.042) + 'px Inter,sans-serif';
      ctx.fillText(cat, bx, by + H * 0.045);
      ctx.fillStyle = colors[i];
      ctx.font = '700 ' + Math.round(H * 0.04) + 'px Poppins,sans-serif';
      ctx.fillText(Math.round(heat * 100) + '%', bx + fillW + 6, by + H * 0.095);
    });
    const sx = W * 0.54, sw = W * 0.42, sheight = H * 0.58;
    const sy = H * 0.16;
    roundRectFill(ctx, sx, sy - 10, sw, sheight + 20, 12, tc.panelBgFaint);
    ctx.fillStyle = tc.textMid;
    ctx.font = '600 ' + Math.round(H * 0.043) + 'px Poppins,sans-serif';
    ctx.fillText('Topic Trends', sx + 12, sy + 6);
    categories.forEach((cat, i) => {
      const lineY = sy + H * 0.11 + i * H * 0.096;
      const pts = sparks[i];
      pts.push(rnd(0.2, 0.9)); if (pts.length > 24) pts.shift();
      ctx.beginPath();
      pts.forEach((v, pi) => {
        const px2 = sx + 10 + pi * (sw - 20) / (pts.length - 1);
        const py2 = lineY + H * 0.07 - v * H * 0.065;
        pi === 0 ? ctx.moveTo(px2, py2) : ctx.lineTo(px2, py2);
      });
      ctx.strokeStyle = colors[i]; ctx.lineWidth = 1.5; ctx.stroke();
      const last = pts[pts.length - 1];
      const lx = sx + 10 + (pts.length - 1) * (sw - 20) / (pts.length - 1);
      const ly = lineY + H * 0.07 - last * H * 0.065;
      ctx.beginPath(); ctx.arc(lx, ly, 3, 0, Math.PI * 2);
      ctx.fillStyle = colors[i]; ctx.fill();
      ctx.fillStyle = tc.textFaint;
      ctx.font = '400 ' + Math.round(H * 0.033) + 'px Inter,sans-serif';
      ctx.fillText(cat, sx + 12, lineY + 6);
    });
    drawVizFrame(ctx, W, H, 'Content Intelligence');
    raf = requestAnimationFrame(frame);
  }
  frame();
  return () => cancelAnimationFrame(raf);
};
export default render;
