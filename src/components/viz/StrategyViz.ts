import type { CanvasContext, VizRenderFn } from "./utils";
import { lerp, getTC, roundRectFill, roundRectStroke, drawMetrics } from "./utils";

const render: VizRenderFn = (c) => {
  const kpis = [
    { label: 'Assess', target: 0.82, color: '#F97316' },
    { label: 'Roadmap', target: 0.70, color: '#2563EB' },
    { label: 'Execute', target: 0.91, color: '#10B981' },
    { label: 'Scale', target: 0.65, color: '#8B5CF6' }
  ];
  let vals = kpis.map(() => 0), t = 0, raf = 0;
  const milestones = ['Discovery', 'Analysis', 'Strategy', 'Pilot', 'Launch', 'Growth'];
  let milestoneT = 0, activeMilestone = 0;

  function frame() {
    const ctx = c.ctx, W = c.w, H = c.h;
    const tc = getTC();
    ctx.clearRect(0, 0, W, H);
    const bgG = ctx.createLinearGradient(0, 0, W, H);
    bgG.addColorStop(0, tc.bg1); bgG.addColorStop(1, tc.bg2);
    ctx.fillStyle = bgG; ctx.fillRect(0, 0, W, H);
    t += 0.016; milestoneT += 0.016;
    if (milestoneT > 2.2) { activeMilestone = (activeMilestone + 1) % milestones.length; milestoneT = 0; }
    vals = vals.map((v, i) => lerp(v, kpis[i].target, 0.03));
    const gaugeR = Math.min(H * 0.20, W * 0.10);
    kpis.forEach((k, i) => {
      const cx = W * (0.15 + i * 0.235), cy = H * 0.34, r = gaugeR;
      ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI * 0.8, Math.PI * 2.2);
      ctx.strokeStyle = tc.progressTrk; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.stroke();
      const sweep = (Math.PI * 1.4) * vals[i];
      ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI * 0.8, Math.PI * 0.8 + sweep);
      const g = ctx.createLinearGradient(cx - r, cy, cx + r, cy);
      g.addColorStop(0, k.color + '88'); g.addColorStop(1, k.color);
      ctx.strokeStyle = g; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.stroke();
      ctx.font = 'bold 15px Inter,sans-serif'; ctx.fillStyle = k.color; ctx.textAlign = 'center';
      ctx.fillText(Math.round(vals[i] * 100) + '%', cx, cy + 5);
      ctx.font = '9px Inter,sans-serif'; ctx.fillStyle = tc.gridLabel;
      ctx.fillText(k.label, cx, cy + r + 16);
    });
    const tx = W * 0.06, ty = H * 0.76, tw = W * 0.88;
    const step = tw / (milestones.length - 1);
    milestones.forEach((m, i) => {
      const mx = tx + i * step;
      const isDone = i < activeMilestone, isAct = i === activeMilestone;
      if (i < milestones.length - 1) {
        ctx.beginPath(); ctx.moveTo(mx, ty); ctx.lineTo(mx + step, ty);
        ctx.strokeStyle = isDone ? '#2563EB' : 'rgba(99,102,241,0.2)'; ctx.lineWidth = 2; ctx.stroke();
      }
      const cr = isAct ? 9 : 7;
      if (isAct) { ctx.shadowColor = '#2563EB'; ctx.shadowBlur = 15; }
      ctx.beginPath(); ctx.arc(mx, ty, cr, 0, Math.PI * 2);
      ctx.fillStyle = isDone || isAct ? '#2563EB' : tc.inactiveBg; ctx.fill();
      ctx.strokeStyle = isDone || isAct ? '#60A5FA' : 'rgba(99,102,241,0.3)'; ctx.lineWidth = 2; ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.font = `${isAct ? 'bold ' : ''}9px Inter,sans-serif`;
      ctx.fillStyle = isAct ? '#93C5FD' : tc.gridLabel; ctx.textAlign = 'center';
      ctx.fillText(m, mx, ty + 20);
    });
    drawMetrics(ctx, W, H, [
      { label: 'Revenue ↑', value: '3.2×', color: '#F97316' },
      { label: 'Cost ↓', value: '28%', color: '#10B981' },
      { label: 'ROI', value: '380%', color: '#2563EB' }
    ]);
    raf = requestAnimationFrame(frame);
  }
  frame();
  return () => cancelAnimationFrame(raf);
};
export default render;
