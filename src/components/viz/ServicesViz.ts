import type { CanvasContext, VizRenderFn } from "./utils";
import { rnd, getTC, roundRectFill, roundRectStroke, drawVizFrame } from "./utils";

const render: VizRenderFn = (c) => {
  let t = 0, raf = 0;
  const services = [
    { lbl: 'AI & ML', sub: 'Neural Networks', col: '#2563EB' },
    { lbl: 'Automation', sub: 'RPA & Workflows', col: '#06B6D4' },
    { lbl: 'Analytics', sub: 'BI & KPIs', col: '#8B5CF6' },
    { lbl: 'Cloud', sub: 'AWS / GCP', col: '#22C55E' },
    { lbl: 'SaaS Dev', sub: 'Full-stack', col: '#F59E0B' },
    { lbl: 'Consulting', sub: 'Strategy', col: '#EC4899' }
  ];
  let active = 0, switchT = 0;
  const orbitPts = Array.from({ length: 30 }, () => ({
    a: rnd(0, Math.PI * 2), r: 0, speed: rnd(0.002, 0.008)
  }));

  function frame() {
    const ctx = c.ctx, W = c.w, H = c.h;
    const tc = getTC();
    ctx.clearRect(0, 0, W, H);
    t += 0.015; switchT++;
    if (switchT > 100) { active = (active + 1) % services.length; switchT = 0; }
    const cx = W * 0.38, cy = H * 0.5;
    const R = Math.min(W * 0.32, H * 0.44);
    // Update orbit pts with proper radius
    orbitPts.forEach(p => { if (p.r === 0) p.r = rnd(R * 0.1, R * 0.9); });
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    [R * 0.45, R * 0.75, R].forEach(r2 => {
      ctx.beginPath(); ctx.arc(cx, cy, r2, 0, Math.PI * 2);
      ctx.strokeStyle = tc.orbitRing; ctx.lineWidth = 1; ctx.stroke();
    });
    orbitPts.forEach(p => {
      p.a += p.speed;
      const px = cx + p.r * Math.cos(p.a), py = cy + p.r * Math.sin(p.a);
      ctx.beginPath(); ctx.arc(px, py, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(37,99,235,0.35)'; ctx.fill();
    });
    services.forEach((svc, i) => {
      const angle = (i / services.length) * Math.PI * 2 - Math.PI / 2 + t * 0.08;
      const px = cx + R * Math.cos(angle), py = cy + R * Math.sin(angle);
      const isActive = i === active;
      const nodeR = isActive ? 22 : 16;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py);
      const gr = ctx.createLinearGradient(cx, cy, px, py);
      gr.addColorStop(0, svc.col + '55'); gr.addColorStop(1, 'transparent');
      ctx.strokeStyle = isActive ? svc.col + 'aa' : gr;
      ctx.lineWidth = isActive ? 2 : 0.8; ctx.stroke();
      if (isActive) {
        ctx.beginPath(); ctx.arc(px, py, nodeR + 8, 0, Math.PI * 2);
        ctx.fillStyle = svc.col + '22'; ctx.fill();
      }
      ctx.beginPath(); ctx.arc(px, py, nodeR, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? svc.col : tc.nodeBg; ctx.fill();
      ctx.strokeStyle = svc.col; ctx.lineWidth = isActive ? 2 : 1.5; ctx.stroke();
      const textX = px + (px > cx ? 28 : -28);
      ctx.textAlign = px > cx + 10 ? 'left' : px < cx - 10 ? 'right' : 'center';
      ctx.fillStyle = isActive ? tc.label : tc.textMid;
      ctx.font = (isActive ? '600' : '400') + ' ' + Math.round(H * 0.042) + 'px Poppins,sans-serif';
      ctx.fillText(svc.lbl, textX, py - 4);
      ctx.fillStyle = isActive ? svc.col : tc.textFaint;
      ctx.font = '400 ' + Math.round(H * 0.033) + 'px Inter,sans-serif';
      ctx.fillText(svc.sub, textX, py + 12);
      ctx.textAlign = 'left';
    });
    const hubR = R * 0.18;
    ctx.beginPath(); ctx.arc(cx, cy, hubR + 6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(37,99,235,0.1)'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, hubR, 0, Math.PI * 2);
    const hubGr = ctx.createRadialGradient(cx, cy, 0, cx, cy, hubR);
    hubGr.addColorStop(0, '#2563EB'); hubGr.addColorStop(1, '#0EA5E9');
    ctx.fillStyle = hubGr; ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 ' + Math.round(H * 0.05) + 'px Poppins,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AK', cx, cy + Math.round(H * 0.02));
    ctx.textAlign = 'left';
    const c2 = services[active];
    const px2 = W * 0.62, py2 = H * 0.15, pw = W * 0.34, ph = H * 0.6;
    roundRectFill(ctx, px2, py2, pw, ph, 12, tc.panelBg);
    ctx.strokeStyle = c2.col + '44'; ctx.lineWidth = 1;
    roundRectStroke(ctx, px2, py2, pw, ph, 12);
    ctx.fillStyle = c2.col;
    ctx.font = '700 ' + Math.round(H * 0.065) + 'px Poppins,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(c2.lbl, px2 + pw / 2, py2 + ph * 0.3);
    ctx.fillStyle = tc.textMid;
    ctx.font = '400 ' + Math.round(H * 0.042) + 'px Inter,sans-serif';
    ctx.fillText(c2.sub, px2 + pw / 2, py2 + ph * 0.48);
    ctx.textAlign = 'left';
    drawVizFrame(ctx, W, H, 'Service Hub');
    raf = requestAnimationFrame(frame);
  }
  frame();
  return () => cancelAnimationFrame(raf);
};
export default render;
