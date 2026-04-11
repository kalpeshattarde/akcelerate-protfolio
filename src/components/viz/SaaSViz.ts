import type { CanvasContext, VizRenderFn } from "./utils";
import { rnd, getTC, roundRectFill, roundRectStroke, drawMetrics } from "./utils";

const render: VizRenderFn = (c) => {
  const stages = [
    { label: 'Spec', icon: '📋', color: '#2563EB' },
    { label: 'Design', icon: '🎨', color: '#8B5CF6' },
    { label: 'Code', icon: '💻', color: '#06B6D4' },
    { label: 'Test', icon: '🧪', color: '#F59E0B' },
    { label: 'Deploy', icon: '🚀', color: '#10B981' }
  ];
  let active = 0, progress = 0, t = 0, raf = 0;
  const lines = ['> Initializing repo...', '> Installing deps...', '> Building assets...', '> Running tests...', '> Deploying to cloud...', '> ✅ Live at prod.saas.io'];
  let lineIdx = 0;

  function frame() {
    const ctx = c.ctx, W = c.w, H = c.h;
    const tc = getTC();
    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    t += 0.016; progress += 0.008;
    if (progress >= 1) { progress = 0; active = (active + 1) % stages.length; lineIdx = (lineIdx + 1) % lines.length; }
    const barY = H * 0.26, bw = (W * 0.82) / stages.length, gap = (W * 0.82 - bw * stages.length) / (stages.length + 1);
    stages.forEach((s, i) => {
      const bx = W * 0.08 + gap + i * (bw + gap);
      const isDone = i < active, isCurr = i === active;
      if (isCurr) { ctx.shadowColor = s.color; ctx.shadowBlur = 20; }
      roundRectFill(ctx, bx, barY - 30, bw, 60, 12, isDone || isCurr ? s.color + (isDone ? 'BB' : '55') : tc.inactiveBg);
      ctx.strokeStyle = isDone || isCurr ? s.color : 'rgba(99,102,241,0.2)'; ctx.lineWidth = isCurr ? 2 : 1;
      roundRectStroke(ctx, bx, barY - 30, bw, 60, 12);
      ctx.shadowBlur = 0;
      ctx.font = '18px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(s.icon, bx + bw / 2, barY - 3);
      ctx.font = `${isCurr ? 'bold ' : ''}10px Inter,sans-serif`;
      ctx.fillStyle = isCurr ? tc.label : tc.gridLabel;
      ctx.fillText(s.label, bx + bw / 2, barY + 18);
      if (isCurr) {
        roundRectFill(ctx, bx, barY + 32, bw, 5, 3, tc.progressTrk);
        roundRectFill(ctx, bx, barY + 32, bw * progress, 5, 3, s.color);
      }
      if (i < stages.length - 1) {
        ctx.strokeStyle = isDone ? stages[i].color + '66' : 'rgba(99,102,241,0.15)';
        ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(bx + bw, barY); ctx.lineTo(bx + bw + gap, barY); ctx.stroke();
        ctx.setLineDash([]);
      }
    });
    const tx = W * 0.08, ty = H * 0.48, tw = W * 0.84, th = H * 0.32;
    roundRectFill(ctx, tx, ty, tw, th, 10, 'rgba(13,17,23,0.8)');
    ctx.strokeStyle = 'rgba(99,102,241,0.2)'; ctx.lineWidth = 1;
    roundRectStroke(ctx, tx, ty, tw, th, 10);
    ctx.font = '9px "Courier New",monospace'; ctx.textAlign = 'left';
    for (let i = Math.max(0, lineIdx - 3); i <= lineIdx; i++) {
      ctx.fillStyle = i === lineIdx ? '#22D3EE' : 'rgba(100,200,220,0.4)';
      ctx.fillText(lines[i % lines.length], tx + 14, ty + 20 + (i - Math.max(0, lineIdx - 3)) * 18);
    }
    if (Math.floor(t * 2) % 2 === 0) {
      ctx.fillStyle = '#22D3EE';
      ctx.fillRect(tx + 14 + ctx.measureText(lines[lineIdx % lines.length]).width, ty + 8 + Math.min(lineIdx, 3) * 18, 6, 12);
    }
    drawMetrics(ctx, W, H, [
      { label: 'Apps Delivered', value: '80+', color: '#10B981' },
      { label: 'Deploy Time', value: '3–4wk', color: '#2563EB' },
      { label: 'Tech Stack', value: '15+', color: '#8B5CF6' }
    ]);
    raf = requestAnimationFrame(frame);
  }
  frame();
  return () => cancelAnimationFrame(raf);
};
export default render;
