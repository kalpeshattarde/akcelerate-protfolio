import type { CanvasContext, VizRenderFn } from "./utils";
import { lerp, getTC, roundRect, roundRectFill, roundRectStroke, drawVizFrame } from "./utils";

const render: VizRenderFn = (c) => {
  let t = 0, raf = 0;
  const cx0 = c.w * 0.55, cy0 = c.h * 0.5;
  const R0 = Math.min(c.w, c.h) * 0.32;
  const nodes = [
    { lbl: 'Mumbai', angle: 0, dist: 0, col: '#2563EB', size: 10 },
    { lbl: 'London', angle: 0.6, dist: R0 * 0.85, col: '#06B6D4', size: 6 },
    { lbl: 'Dubai', angle: 1.8, dist: R0 * 0.78, col: '#8B5CF6', size: 6 },
    { lbl: 'Singapore', angle: 3.2, dist: R0 * 0.82, col: '#22C55E', size: 6 },
    { lbl: 'NYC', angle: 4.8, dist: R0 * 0.88, col: '#F59E0B', size: 6 },
    { lbl: 'Sydney', angle: 5.6, dist: R0 * 0.75, col: '#EC4899', size: 6 }
  ];
  let pulses: { x: number; y: number; r: number; col: string; max: number }[] = [];
  const pulseInterval = setInterval(() => {
    const n = nodes[1 + Math.floor(Math.random() * (nodes.length - 1))];
    const cx = c.w * 0.55, cy = c.h * 0.5;
    pulses.push({ x: cx + n.dist * Math.cos(n.angle + t * 0.2), y: cy + n.dist * Math.sin(n.angle + t * 0.2), r: 0, col: n.col, max: 40 });
  }, 900);

  function nodePos(n: typeof nodes[0]) {
    const cx = c.w * 0.55, cy = c.h * 0.5;
    return { x: cx + n.dist * Math.cos(n.angle + t * 0.2), y: cy + n.dist * Math.sin(n.angle + t * 0.2) };
  }

  function frame() {
    const ctx = c.ctx, W = c.w, H = c.h;
    const tc = getTC();
    ctx.clearRect(0, 0, W, H);
    t += 0.012;
    const cx = W * 0.55, cy = H * 0.5;
    const R = Math.min(W, H) * 0.32;
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(37,99,235,0.15)'; ctx.lineWidth = 1; ctx.stroke();
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath(); ctx.arc(cx, cy, R * i / 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(37,99,235,0.08)'; ctx.lineWidth = 0.5; ctx.stroke();
    }
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
      ctx.strokeStyle = 'rgba(37,99,235,0.05)'; ctx.lineWidth = 0.5; ctx.stroke();
    }
    const hub = nodePos(nodes[0]);
    nodes.slice(1).forEach(n => {
      const p = nodePos(n);
      ctx.beginPath(); ctx.moveTo(hub.x, hub.y); ctx.lineTo(p.x, p.y);
      const gr = ctx.createLinearGradient(hub.x, hub.y, p.x, p.y);
      gr.addColorStop(0, n.col + 'aa'); gr.addColorStop(1, 'rgba(37,99,235,0.1)');
      ctx.strokeStyle = gr; ctx.lineWidth = 1; ctx.stroke();
    });
    pulses = pulses.filter(p => p.r < p.max);
    pulses.forEach(p => {
      p.r += 1.5;
      const alpha = (1 - p.r / p.max) * 0.6;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.strokeStyle = p.col + Math.round(alpha * 255).toString(16).padStart(2, '0');
      ctx.lineWidth = 1.5; ctx.stroke();
    });
    nodes.forEach((n, i) => {
      const p = nodePos(n);
      ctx.beginPath(); ctx.arc(p.x, p.y, n.size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = n.col + '22'; ctx.fill();
      ctx.beginPath(); ctx.arc(p.x, p.y, n.size, 0, Math.PI * 2);
      ctx.fillStyle = n.col; ctx.fill();
      if (i > 0) {
        ctx.fillStyle = tc.text;
        ctx.font = '500 ' + Math.round(H * 0.04) + 'px Inter,sans-serif';
        ctx.fillText(n.lbl, p.x + n.size + 5, p.y + 4);
      }
    });
    ctx.fillStyle = '#2563EB';
    ctx.font = '700 ' + Math.round(H * 0.045) + 'px Poppins,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Mumbai HQ', hub.x, hub.y - 18);
    ctx.textAlign = 'left';
    const ix = W * 0.03, iy = H * 0.15;
    roundRectFill(ctx, ix, iy, W * 0.36, H * 0.6, 10, tc.panelBg);
    const infos = [
      { label: 'Response Time', val: '<2h', col: '#2563EB' },
      { label: 'Projects Live', val: '37+', col: '#06B6D4' },
      { label: 'Industries', val: '13+', col: '#8B5CF6' },
      { label: 'Satisfaction', val: '98%', col: '#22C55E' }
    ];
    infos.forEach((info, i2) => {
      const ry = iy + H * 0.1 + i2 * H * 0.12;
      ctx.fillStyle = tc.textMid;
      ctx.font = '400 ' + Math.round(H * 0.038) + 'px Inter,sans-serif';
      ctx.fillText(info.label, ix + 14, ry);
      ctx.fillStyle = info.col;
      ctx.font = '700 ' + Math.round(H * 0.055) + 'px Poppins,sans-serif';
      ctx.fillText(info.val, ix + 14, ry + H * 0.07);
    });
    drawVizFrame(ctx, W, H, 'Global Connections');
    raf = requestAnimationFrame(frame);
  }
  frame();
  return () => { cancelAnimationFrame(raf); clearInterval(pulseInterval); };
};
export default render;
