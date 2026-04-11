// Shared canvas utilities ported from viz.js

export function rnd(a: number, b: number) { return a + Math.random() * (b - a); }
export function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
export function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }

export function getTC() {
  const dark = document.documentElement.classList.contains('dark');
  return {
    bg1:          dark ? '#0F172A' : '#FFFFFF',
    bg2:          dark ? '#1E293B' : '#F0F7FF',
    text:         dark ? 'rgba(255,255,255,0.80)' : 'rgba(15,23,42,0.95)',
    textMid:      dark ? 'rgba(255,255,255,0.55)' : 'rgba(15,23,42,0.78)',
    textFaint:    dark ? 'rgba(255,255,255,0.35)' : 'rgba(30,41,59,0.72)',
    label:        dark ? '#E2E8F0' : '#0F172A',
    gridLabel:    dark ? 'rgba(148,163,184,0.60)' : 'rgba(30,41,59,0.78)',
    gridLine:     dark ? 'rgba(148,163,184,0.08)' : 'rgba(15,23,42,0.14)',
    gridBright:   dark ? 'rgba(148,163,184,0.10)' : 'rgba(15,23,42,0.20)',
    panelBg:      dark ? 'rgba(255,255,255,0.04)' : 'rgba(37,99,235,0.05)',
    panelBgMid:   dark ? 'rgba(255,255,255,0.06)' : 'rgba(37,99,235,0.07)',
    panelBgFaint: dark ? 'rgba(255,255,255,0.03)' : 'rgba(37,99,235,0.03)',
    cardBg:       dark ? 'rgba(13,17,23,0.75)'    : 'rgba(255,255,255,0.92)',
    cardBgMid:    dark ? 'rgba(13,17,23,0.65)'    : 'rgba(255,255,255,0.85)',
    terminalBg:   dark ? 'rgba(13,17,23,0.85)'    : 'rgba(15,23,42,0.90)',
    inactiveBg:   dark ? 'rgba(30,40,60,0.60)'    : 'rgba(203,213,225,0.80)',
    progressTrk:  dark ? 'rgba(30,40,60,0.40)'    : 'rgba(203,213,225,0.65)',
    nodeBg:       dark ? 'rgba(30,41,59,0.90)'    : 'rgba(248,250,252,0.92)',
    inactiveFg:   dark ? 'rgba(148,163,184,0.30)' : 'rgba(71,85,105,0.70)',
    trackFill:    dark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.10)',
    orbitRing:    dark ? 'rgba(255,255,255,0.04)' : 'rgba(37,99,235,0.10)',
  };
}

export function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h); ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r); ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

export function roundRectFill(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, color?: string | CanvasGradient) {
  if (color) ctx.fillStyle = color;
  roundRect(ctx, x, y, w, h, r);
  ctx.fill();
}

export function roundRectStroke(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  roundRect(ctx, x, y, w, h, r);
  ctx.stroke();
}

export interface Metric {
  label: string;
  value: string;
  color: string;
}

export function drawMetrics(ctx: CanvasRenderingContext2D, W: number, H: number, metrics: Metric[]) {
  const tc = getTC();
  metrics.forEach((m, i) => {
    const mw = 90, mh = 36, gap = 8;
    const mx = W - (metrics.length - i) * (mw + gap) + gap / 2;
    const my = H - mh - 10;
    roundRectFill(ctx, mx, my, mw, mh, 8, tc.cardBg);
    ctx.strokeStyle = m.color + '55';
    ctx.lineWidth = 1;
    roundRectStroke(ctx, mx, my, mw, mh, 8);
    ctx.font = 'bold 13px Inter,sans-serif';
    ctx.fillStyle = m.color;
    ctx.textAlign = 'center';
    ctx.fillText(m.value, mx + mw / 2, my + 16);
    ctx.font = '7px Inter,sans-serif';
    ctx.fillStyle = tc.gridLabel;
    ctx.fillText(m.label, mx + mw / 2, my + 29);
  });
}

export function drawVizFrame(ctx: CanvasRenderingContext2D, W: number, H: number, title?: string) {
  const cl = 18, ct = 18, cs2 = 28;
  ctx.strokeStyle = 'rgba(37,99,235,0.55)'; ctx.lineWidth = 2; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(cl, ct + cs2); ctx.lineTo(cl, ct); ctx.lineTo(cl + cs2, ct); ctx.stroke();
  ctx.strokeStyle = 'rgba(6,182,212,0.45)';
  ctx.beginPath(); ctx.moveTo(W - cl - cs2, ct); ctx.lineTo(W - cl, ct); ctx.lineTo(W - cl, ct + cs2); ctx.stroke();
  ctx.strokeStyle = 'rgba(6,182,212,0.35)';
  ctx.beginPath(); ctx.moveTo(cl, H - ct - cs2); ctx.lineTo(cl, H - ct); ctx.lineTo(cl + cs2, H - ct); ctx.stroke();
  ctx.strokeStyle = 'rgba(37,99,235,0.35)';
  ctx.beginPath(); ctx.moveTo(W - cl - cs2, H - ct); ctx.lineTo(W - cl, H - ct); ctx.lineTo(W - cl, H - ct - cs2); ctx.stroke();
  if (title) {
    const tc = getTC();
    ctx.font = '600 ' + Math.round(H * 0.038) + 'px Inter,sans-serif';
    const tw = ctx.measureText(title).width;
    const bx = W / 2 - tw / 2 - 10, by = H - Math.round(H * 0.1), bw2 = tw + 20, bh = Math.round(H * 0.072);
    roundRectFill(ctx, bx, by, bw2, bh, 8, tc.cardBgMid);
    ctx.strokeStyle = 'rgba(37,99,235,0.3)'; ctx.lineWidth = 1;
    roundRectStroke(ctx, bx, by, bw2, bh, 8);
    ctx.fillStyle = tc.textMid; ctx.textAlign = 'center';
    ctx.fillText(title, W / 2, by + bh * 0.66);
    ctx.textAlign = 'left';
  }
}

export interface CanvasContext {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
}

export type VizRenderFn = (c: CanvasContext) => () => void;
