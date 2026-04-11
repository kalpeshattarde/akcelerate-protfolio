import type { CanvasContext, VizRenderFn } from "./utils";
import { rnd, lerp, getTC, roundRectFill, roundRectStroke, drawMetrics } from "./utils";

const render: VizRenderFn = (c) => {
  const servers = [
    { label: 'Dev', x: 0.12, y: 0.28, color: '#2563EB' },
    { label: 'Staging', x: 0.40, y: 0.14, color: '#06B6D4' },
    { label: 'DB', x: 0.40, y: 0.72, color: '#8B5CF6' },
    { label: 'Prod', x: 0.70, y: 0.28, color: '#10B981' },
    { label: 'CDN', x: 0.70, y: 0.72, color: '#F59E0B' },
    { label: 'Monitor', x: 0.88, y: 0.48, color: '#EC4899' }
  ];
  const links = [[0,1],[0,2],[1,3],[2,3],[1,2],[3,4],[3,5],[4,5]];
  let packets: { ai: number; bi: number; p: number; speed: number }[] = [];
  let t = 0, raf = 0;

  function frame() {
    const ctx = c.ctx, W = c.w, H = c.h;
    const tc = getTC();
    ctx.clearRect(0, 0, W, H);
    const bgG = ctx.createLinearGradient(0, 0, W, H);
    bgG.addColorStop(0, tc.bg1); bgG.addColorStop(1, tc.bg2);
    ctx.fillStyle = bgG; ctx.fillRect(0, 0, W, H);
    t += 0.016;
    links.forEach(([ai, bi]) => {
      const a = servers[ai], b = servers[bi];
      ctx.strokeStyle = 'rgba(99,102,241,0.18)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(a.x * W, a.y * H); ctx.lineTo(b.x * W, b.y * H); ctx.stroke();
    });
    if (Math.random() < 0.04) {
      const li = links[Math.floor(Math.random() * links.length)];
      packets.push({ ai: li[0], bi: li[1], p: 0, speed: rnd(0.006, 0.015) });
    }
    packets = packets.filter(pk => {
      pk.p += pk.speed;
      if (pk.p > 1) return false;
      const a = servers[pk.ai], b = servers[pk.bi];
      const x = lerp(a.x * W, b.x * W, pk.p), y = lerp(a.y * H, b.y * H, pk.p);
      const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
      g.addColorStop(0, 'rgba(99,102,241,0.95)'); g.addColorStop(1, 'rgba(99,102,241,0)');
      ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      return true;
    });
    servers.forEach(s => {
      const sx = s.x * W, sy = s.y * H;
      const pulse = 0.8 + 0.2 * Math.sin(t * 2 + s.x * 10);
      const g2 = ctx.createRadialGradient(sx, sy, 0, sx, sy, 34);
      g2.addColorStop(0, s.color + '33'); g2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(sx, sy, 34, 0, Math.PI * 2); ctx.fill();
      ctx.shadowColor = s.color; ctx.shadowBlur = 15 * pulse;
      roundRectFill(ctx, sx - 34, sy - 20, 68, 40, 10, s.color + '22');
      ctx.strokeStyle = s.color; ctx.lineWidth = 1.5;
      roundRectStroke(ctx, sx - 34, sy - 20, 68, 40, 10);
      ctx.shadowBlur = 0;
      ctx.font = 'bold 10px Inter,sans-serif'; ctx.fillStyle = tc.label; ctx.textAlign = 'center';
      ctx.fillText(s.label, sx, sy + 4);
      ctx.beginPath(); ctx.arc(sx + 24, sy - 12, 4, 0, Math.PI * 2);
      ctx.fillStyle = s.color; ctx.fill();
    });
    drawMetrics(ctx, W, H, [
      { label: 'Uptime', value: '99.9%', color: '#10B981' },
      { label: 'Deploy Freq', value: '8×/day', color: '#2563EB' },
      { label: 'MTTR', value: '4min', color: '#06B6D4' }
    ]);
    raf = requestAnimationFrame(frame);
  }
  frame();
  return () => cancelAnimationFrame(raf);
};
export default render;
