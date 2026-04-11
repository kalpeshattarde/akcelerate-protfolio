import type { CanvasContext, VizRenderFn } from "./utils";
import { getTC, roundRectFill, roundRectStroke, drawMetrics } from "./utils";

const render: VizRenderFn = (c) => {
  const stages = [
    { label: 'Data Prep', color: '#2563EB' },
    { label: 'Training', color: '#8B5CF6' },
    { label: 'Evaluation', color: '#06B6D4' },
    { label: 'Deploy', color: '#10B981' },
    { label: 'Monitor', color: '#F59E0B' },
    { label: 'Retrain', color: '#EC4899' }
  ];
  let spinAngle = 0, active = 0, switchT = 0, raf = 0;

  function frame() {
    const ctx = c.ctx, W = c.w, H = c.h;
    const tc = getTC();
    ctx.clearRect(0, 0, W, H);
    const bgG = ctx.createLinearGradient(0, 0, W, H);
    bgG.addColorStop(0, tc.bg1); bgG.addColorStop(1, tc.bg2);
    ctx.fillStyle = bgG; ctx.fillRect(0, 0, W, H);
    spinAngle += 0.004; switchT += 0.016;
    if (switchT > 2.5) { active = (active + 1) % stages.length; switchT = 0; }
    const cx = W * 0.42, cy = H * 0.5;
    const R = Math.min(cx, cy) * 0.72;
    const slice = (Math.PI * 2) / stages.length;
    stages.forEach((s, i) => {
      const a1 = spinAngle + i * slice - slice / 2;
      const a2 = a1 + slice - 0.05;
      const isActive = i === active;
      const r = isActive ? R : R * 0.88;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, a1, a2); ctx.closePath();
      ctx.fillStyle = isActive ? s.color + 'BB' : s.color + '33'; ctx.fill();
      ctx.strokeStyle = isActive ? s.color : s.color + '55'; ctx.lineWidth = isActive ? 2 : 1; ctx.stroke();
      const ma = a1 + slice / 2;
      const lr = isActive ? R * 0.65 : R * 0.57;
      const lx = cx + Math.cos(ma) * lr, ly = cy + Math.sin(ma) * lr;
      ctx.font = `${isActive ? 'bold ' : ''}10px Inter,sans-serif`;
      ctx.fillStyle = isActive ? tc.label : tc.gridLabel;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(s.label, lx, ly);
    });
    ctx.beginPath(); ctx.arc(cx, cy, R * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = tc.bg1; ctx.fill();
    ctx.strokeStyle = stages[active].color; ctx.lineWidth = 2; ctx.stroke();
    ctx.font = 'bold 11px Inter,sans-serif';
    ctx.fillStyle = stages[active].color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('MLOps', cx, cy - 8);
    ctx.font = '9px Inter,sans-serif'; ctx.fillStyle = tc.gridLabel;
    ctx.fillText(stages[active].label, cx, cy + 8);
    ctx.textBaseline = 'alphabetic';
    const px = W * 0.72, pstages = ['Collect', 'Preprocess', 'Train', 'Serve', 'Track'];
    pstages.forEach((ps, i) => {
      const py = H * 0.18 + i * H * 0.15;
      const isAct = i === active % pstages.length;
      roundRectFill(ctx, px - 55, py - 14, 110, 28, 8, isAct ? '#2563EB22' : tc.inactiveBg);
      ctx.strokeStyle = isAct ? '#2563EB' : tc.inactiveFg; ctx.lineWidth = 1;
      roundRectStroke(ctx, px - 55, py - 14, 110, 28, 8);
      ctx.font = `${isAct ? 'bold ' : ''}10px Inter,sans-serif`;
      ctx.fillStyle = isAct ? '#93C5FD' : tc.gridLabel; ctx.textAlign = 'center';
      ctx.fillText(ps, px, py + 4);
      if (i < pstages.length - 1) {
        ctx.strokeStyle = isAct ? '#2563EB88' : 'rgba(99,102,241,0.2)';
        ctx.lineWidth = 1; ctx.beginPath();
        ctx.moveTo(px, py + 14); ctx.lineTo(px, py + 14 + H * 0.15 - 14); ctx.stroke();
      }
    });
    drawMetrics(ctx, W, H, [
      { label: 'Models Live', value: '50+', color: '#8B5CF6' },
      { label: 'Drift Detected', value: '99%', color: '#06B6D4' },
      { label: 'Re-train Cycle', value: '24h', color: '#10B981' }
    ]);
    raf = requestAnimationFrame(frame);
  }
  frame();
  return () => cancelAnimationFrame(raf);
};
export default render;
