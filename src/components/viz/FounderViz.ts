import type { CanvasContext, VizRenderFn } from "./utils";
import { rnd, getTC, drawVizFrame } from "./utils";

const render: VizRenderFn = (c) => {
  let t = 0, raf = 0;
  const skills = [
    { lbl: 'AI & Machine Learning', pct: 95, col: '#2563EB', r: 0 },
    { lbl: 'Business Strategy', pct: 90, col: '#06B6D4', r: 0 },
    { lbl: 'Data Engineering', pct: 92, col: '#8B5CF6', r: 0 },
    { lbl: 'Product Dev', pct: 85, col: '#22C55E', r: 0 }
  ];
  const orbitDots: { r: number; a: number; speed: number; col: string }[] = [];

  function frame() {
    const ctx = c.ctx, W = c.w, H = c.h;
    const tc = getTC();
    const cx = W * 0.38, cy = H * 0.5;
    // Set radii relative to canvas
    skills[0].r = H * 0.38; skills[1].r = H * 0.3; skills[2].r = H * 0.22; skills[3].r = H * 0.14;
    // Init orbit dots once
    if (orbitDots.length === 0) {
      skills.forEach(s => {
        for (let i = 0; i < 5; i++) orbitDots.push({ r: s.r, a: rnd(0, Math.PI * 2), speed: rnd(0.005, 0.015) * (Math.random() > 0.5 ? 1 : -1), col: s.col });
      });
    }
    ctx.clearRect(0, 0, W, H);
    t += 0.012;
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    skills.forEach(s => {
      ctx.beginPath(); ctx.arc(cx, cy, s.r, -Math.PI / 2 + t * 0.04, -Math.PI / 2 + t * 0.04 + (Math.PI * 2 * (s.pct / 100)));
      ctx.strokeStyle = s.col + '55'; ctx.lineWidth = 3; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, s.r, -Math.PI / 2, Math.PI * 2 - Math.PI / 2);
      ctx.strokeStyle = tc.orbitRing; ctx.lineWidth = 1; ctx.stroke();
      const langle = -Math.PI / 2 + (s.pct / 100) * Math.PI * 2 / 2 + t * 0.04;
      const lx = cx + s.r * Math.cos(langle), ly = cy + s.r * Math.sin(langle);
      ctx.fillStyle = s.col;
      ctx.font = '600 ' + Math.round(H * 0.042) + 'px Poppins,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(s.pct + '%', lx, ly + 5);
      ctx.textAlign = 'left';
    });
    orbitDots.forEach(d => {
      d.a += d.speed;
      const px = cx + d.r * Math.cos(d.a), py = cy + d.r * Math.sin(d.a);
      ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = d.col; ctx.fill();
    });
    ctx.beginPath(); ctx.arc(cx, cy, 32, 0, Math.PI * 2);
    const cGr = ctx.createRadialGradient(cx, cy, 0, cx, cy, 32);
    cGr.addColorStop(0, '#2563EB'); cGr.addColorStop(1, '#0EA5E9');
    ctx.fillStyle = cGr; ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 ' + Math.round(H * 0.06) + 'px Poppins,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('K', cx, cy + Math.round(H * 0.023));
    ctx.textAlign = 'left';
    const rx = W * 0.57, ry = H * 0.15;
    ctx.fillStyle = tc.label;
    ctx.font = '700 ' + Math.round(H * 0.065) + 'px Poppins,sans-serif';
    ctx.fillText('Kalpesh', rx, ry);
    ctx.fillText('Attarde', rx, ry + Math.round(H * 0.08));
    ctx.fillStyle = '#2563EB';
    ctx.font = '600 ' + Math.round(H * 0.042) + 'px Poppins,sans-serif';
    ctx.fillText('Founder & CEO', rx, ry + Math.round(H * 0.165));
    ctx.fillStyle = tc.textFaint;
    ctx.font = '400 ' + Math.round(H * 0.036) + 'px Inter,sans-serif';
    ctx.fillText('AKcelerate', rx, ry + Math.round(H * 0.22));
    skills.forEach((s, i) => {
      const sy = ry + H * 0.31 + i * H * 0.13;
      ctx.beginPath(); ctx.arc(rx + 7, sy - 4, 4, 0, Math.PI * 2);
      ctx.fillStyle = s.col; ctx.fill();
      ctx.fillStyle = tc.text;
      ctx.font = '400 ' + Math.round(H * 0.038) + 'px Inter,sans-serif';
      ctx.fillText(s.lbl, rx + 18, sy);
    });
    drawVizFrame(ctx, W, H, 'Founder Profile');
    raf = requestAnimationFrame(frame);
  }
  frame();
  return () => cancelAnimationFrame(raf);
};
export default render;
