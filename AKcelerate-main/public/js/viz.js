/* ─────────────────────────────────────────────────────────────
   AKcelerate Visualization Library  –  viz.js
   Animated canvas replacements for all solution pages.
   Usage: AKviz.init('canvasId', 'mode');
   Modes: neural | flow | analytics | dataviz | cloud | mlops | saas | strategy | industries
───────────────────────────────────────────────────────────── */
(function (G) {
  'use strict';

  const AKviz = {};

  /* ── utilities ── */
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  /* ── theme-aware color palette (reads data-theme on every frame) ── */
  function getTC() {
    var dark = document.documentElement.getAttribute('data-theme') !== 'light';
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


  function setupCanvas(id) {
    var el = document.getElementById(id);
    if (!el) return null;
    var dpr = window.devicePixelRatio || 1;
    var ctx = el.getContext('2d');
    // Read fallback dimensions from HTML attributes (not CSS %, which parses wrong)
    var cssH = parseInt(el.getAttribute('height')) || 380;
    var cssW = parseInt(el.getAttribute('width')) || 800;
    function resize() {
      var rect = el.getBoundingClientRect();
      var w = (rect.width > 0 ? rect.width : null) ||
              (el.parentElement ? el.parentElement.offsetWidth : 0) ||
              el.offsetWidth || parseInt(cssW) || 800;
      var h = (rect.height > 0 ? rect.height : null) ||
              (el.parentElement ? el.parentElement.offsetHeight : 0) ||
              el.offsetHeight || parseInt(cssH) || 380;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      el.style.width = w + 'px';
      el.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', function() { resize(); });
    return {
      el: el, ctx: ctx,
      get w() {
        var r = el.getBoundingClientRect();
        return (r.width > 0 ? r.width : null) || el.offsetWidth || parseInt(cssW) || 800;
      },
      get h() {
        var r = el.getBoundingClientRect();
        return (r.height > 0 ? r.height : null) || el.offsetHeight || parseInt(cssH) || 380;
      }
    };
  }

  /* ════════════════════════════════════════════════════════════
     MODE: neural  –  Neural Network (AI/ML page)
  ════════════════════════════════════════════════════════════ */
  function modeNeural(c) {
    const layers = [3, 5, 5, 4, 2];
    let nodes = [], edges = [], pulses = [], t = 0;
    function build() {
      nodes = []; edges = [];
      const W = c.w, H = c.h;
      const colX = layers.map((_, i) => W * 0.10 + (W * 0.80) * i / (layers.length - 1));
      const vSpacing = Math.min(Math.round(H * 0.175), 65);
      layers.forEach((n, li) => {
        const startY = H * 0.46 - (n - 1) * vSpacing / 2;
        for (let ni = 0; ni < n; ni++) {
          nodes.push({ x: colX[li], y: startY + ni * vSpacing, layer: li, pulse: Math.random() });
        }
      });
      let base = 0;
      layers.forEach((n, li) => {
        if (li === layers.length - 1) return;
        const next = layers[li + 1];
        for (let a = 0; a < n; a++) for (let b = 0; b < next; b++) {
          edges.push({ a: base + a, b: base + n + b, speed: rnd(0.003, 0.009) });
        }
        base += n;
      });
    }
    build();
    window.addEventListener('resize', build);
    function frame() {
      const ctx = c.ctx, W = c.w, H = c.h;
      var tc = getTC();
      ctx.clearRect(0, 0, W, H);
      var bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      t += 0.016;
      // edges
      edges.forEach(e => {
        const a = nodes[e.a], b = nodes[e.b];
        const alpha = 0.08 + 0.06 * Math.sin(t * 1.5 + e.speed * 100);
        ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      });
      // pulses along edges
      if (Math.random() < 0.04) {
        const e = edges[Math.floor(Math.random() * edges.length)];
        pulses.push({ edge: e, p: 0, speed: rnd(0.012, 0.025) });
      }
      pulses = pulses.filter(pu => {
        pu.p += pu.speed;
        if (pu.p > 1) return false;
        const a = nodes[pu.edge.a], b = nodes[pu.edge.b];
        const x = lerp(a.x, b.x, pu.p), y = lerp(a.y, b.y, pu.p);
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 7);
        grd.addColorStop(0, 'rgba(167,139,250,0.95)');
        grd.addColorStop(1, 'rgba(139,92,246,0)');
        ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();
        return true;
      });
      // nodes
      nodes.forEach(n => {
        n.pulse += 0.03;
        const glow = 0.15 + 0.08 * Math.sin(n.pulse);
        const r = 7 + 2 * Math.sin(n.pulse * 0.7);
        const g1 = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3);
        g1.addColorStop(0, `rgba(167,139,250,${glow + 0.3})`);
        g1.addColorStop(1, 'rgba(139,92,246,0)');
        ctx.beginPath(); ctx.arc(n.x, n.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = g1; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = '#7C3AED'; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, r - 2, 0, Math.PI * 2);
        ctx.fillStyle = '#A78BFA'; ctx.fill();
      });
      // layer labels
      const lbls = ['Input', 'Hidden 1', 'Hidden 2', 'Output', 'Predict'];
      const cols = layers.map((_, i) => c.w * 0.10 + (c.w * 0.80) * i / (layers.length - 1));
      ctx.font = '10px Inter,sans-serif'; ctx.fillStyle = tc.gridLabel; ctx.textAlign = 'center';
      lbls.forEach((l, i) => ctx.fillText(l, cols[i], H - 10));
      // floating metrics
      drawMetrics(ctx, W, H, [
        { label: 'Model Accuracy', value: '95.4%', color: '#A78BFA' },
        { label: 'Training Time', value: '2.3h', color: '#06B6D4' },
        { label: 'Predictions/sec', value: '12K+', color: '#10B981' }
      ]);
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ════════════════════════════════════════════════════════════
     MODE: flow  –  Automation Flowchart (Business Automation)
  ════════════════════════════════════════════════════════════ */
  function modeFlow(c) {
    const nodes = [
      { id: 'T', label: 'Trigger',  x: 0.08, y: 0.50, w: 100, h: 38, color: '#2563EB' },
      { id: 'F', label: 'Filter',   x: 0.27, y: 0.50, w: 90,  h: 38, color: '#0891B2' },
      { id: 'A', label: 'Action A', x: 0.50, y: 0.20, w: 100, h: 38, color: '#059669' },
      { id: 'B', label: 'Action B', x: 0.50, y: 0.80, w: 100, h: 38, color: '#7C3AED' },
      { id: 'N', label: 'Notify',   x: 0.74, y: 0.20, w: 90,  h: 38, color: '#D97706' },
      { id: 'D', label: 'Done ✓',   x: 0.90, y: 0.50, w: 90,  h: 38, color: '#10B981' }
    ];
    const edges = [
      { from: 'T', to: 'F' }, { from: 'F', to: 'A' }, { from: 'F', to: 'B' },
      { from: 'A', to: 'N' }, { from: 'N', to: 'D' }, { from: 'B', to: 'D' }
    ];
    let pulses = [], t = 0;
    function getNode(id) { return nodes.find(n => n.id === id); }
    function nodePos(n) {
      return { x: n.x * c.w, y: n.y * c.h };
    }
    function frame() {
      const ctx = c.ctx, W = c.w, H = c.h;
      var tc = getTC();
      ctx.clearRect(0, 0, W, H);
      var bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      t += 0.016;
      // edges
      edges.forEach(e => {
        const a = nodePos(getNode(e.from)), b = nodePos(getNode(e.to));
        ctx.strokeStyle = 'rgba(37,99,235,0.25)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.lineDashOffset = -t * 15;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        ctx.setLineDash([]);
      });
      // inject pulses
      if (Math.random() < 0.025) {
        const e = edges[Math.floor(Math.random() * edges.length)];
        pulses.push({ e, p: 0, speed: rnd(0.008, 0.018) });
      }
      pulses = pulses.filter(pu => {
        pu.p += pu.speed;
        if (pu.p > 1) return false;
        const a = nodePos(getNode(pu.e.from)), b = nodePos(getNode(pu.e.to));
        const x = lerp(a.x, b.x, pu.p), y = lerp(a.y, b.y, pu.p);
        const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
        g.addColorStop(0, 'rgba(96,165,250,1)');
        g.addColorStop(1, 'rgba(37,99,235,0)');
        ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        return true;
      });
      // nodes
      nodes.forEach(n => {
        const { x, y } = nodePos(n);
        const glow = 0.15 + 0.06 * Math.sin(t * 2 + n.x * 10);
        const g2 = ctx.createRoundRect ? null : null;
        // glow
        ctx.shadowColor = n.color; ctx.shadowBlur = 12 * glow * 6;
        // box
        const rx = x - n.w / 2, ry = y - n.h / 2;
        ctx.fillStyle = n.color + '22';
        ctx.strokeStyle = n.color;
        ctx.lineWidth = 1.5;
        roundRect(ctx, rx, ry, n.w, n.h, 8);
        ctx.fill(); ctx.stroke();
        ctx.shadowBlur = 0;
        // label
        ctx.font = 'bold 11px Inter,sans-serif';
        ctx.fillStyle = tc.label;
        ctx.textAlign = 'center';
        ctx.fillText(n.label, x, y + 4);
      });
      drawMetrics(ctx, W, H, [
        { label: 'ROI Gain', value: '315%', color: '#2563EB' },
        { label: 'Hrs Saved', value: '40h+', color: '#06B6D4' },
        { label: 'Deploy', value: '3–4wks', color: '#10B981' }
      ]);
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ════════════════════════════════════════════════════════════
     MODE: analytics  –  Animated Bar Chart (Automated Analytics)
  ════════════════════════════════════════════════════════════ */
  function modeAnalytics(c) {
    const bars = [
      { label: 'Jan', target: 0.45, color: '#06B6D4' },
      { label: 'Feb', target: 0.60, color: '#2563EB' },
      { label: 'Mar', target: 0.55, color: '#06B6D4' },
      { label: 'Apr', target: 0.80, color: '#8B5CF6' },
      { label: 'May', target: 0.72, color: '#2563EB' },
      { label: 'Jun', target: 0.90, color: '#10B981' },
      { label: 'Jul', target: 0.68, color: '#F59E0B' },
      { label: 'Aug', target: 0.95, color: '#06B6D4' }
    ];
    let vals = bars.map(() => 0), phase = 0, line = [];
    for (let i = 0; i < 60; i++) line.push(0.3 + 0.4 * Math.sin(i * 0.18) + 0.1 * Math.random());
    let lineOff = 0;
    function frame() {
      const ctx = c.ctx, W = c.w, H = c.h;
      var tc = getTC();
      ctx.clearRect(0, 0, W, H);
      var bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      phase += 0.012;
      vals = vals.map((v, i) => lerp(v, bars[i].target, 0.04));
      // grid lines
      ctx.strokeStyle = tc.gridLine;
      ctx.lineWidth = 1;
      for (let g = 1; g <= 4; g++) {
        const y = H * 0.82 - (H * 0.62) * (g / 4);
        ctx.beginPath(); ctx.moveTo(W * 0.05, y); ctx.lineTo(W * 0.95, y); ctx.stroke();
        ctx.font = '9px Inter,sans-serif'; ctx.fillStyle = tc.gridLabel; ctx.textAlign = 'right';
        ctx.fillText(Math.round(g * 25) + '%', W * 0.04, y + 3);
      }
      // bars
      const bw = (W * 0.85) / (bars.length * 1.6);
      const gap = (W * 0.85 - bw * bars.length) / (bars.length + 1);
      bars.forEach((b, i) => {
        const bh = vals[i] * H * 0.62;
        const bx = W * 0.07 + gap + i * (bw + gap);
        const by = H * 0.82 - bh;
        // glow
        const grd = ctx.createLinearGradient(bx, by, bx, H * 0.82);
        grd.addColorStop(0, b.color);
        grd.addColorStop(1, b.color + '44');
        ctx.fillStyle = grd;
        roundRectFill(ctx, bx, by, bw, bh, 4);
        // pulse cap
        const pulse = 0.7 + 0.3 * Math.sin(phase * 3 + i * 0.8);
        // pulse cap (reduced alpha in light mode)
        roundRectFill(ctx, bx, by, bw, 3, 2, 'rgba(255,255,255,0.5)');
        // label
        ctx.font = '9px Inter,sans-serif'; ctx.fillStyle = tc.gridLabel; ctx.textAlign = 'center';
        ctx.fillText(b.label, bx + bw / 2, H * 0.89);
        // value above
        if (vals[i] > 0.1) {
          ctx.font = 'bold 9px Inter,sans-serif'; ctx.fillStyle = b.color;
          ctx.fillText(Math.round(vals[i] * 100) + '%', bx + bw / 2, by - 5);
        }
      });
      // trend line overlay
      lineOff = (lineOff + 0.3) % (W * 0.9 / 59);
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(16,185,129,0.6)'; ctx.lineWidth = 2;
      line.forEach((v, i) => {
        const x = W * 0.07 + (i / 59) * W * 0.86;
        const y = H * 0.82 - v * H * 0.55;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();
      drawMetrics(ctx, W, H, [
        { label: 'Reports/Day', value: '240+', color: '#06B6D4' },
        { label: 'Data Sources', value: '180+', color: '#2563EB' },
        { label: 'Latency', value: '<50ms', color: '#10B981' }
      ]);
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ════════════════════════════════════════════════════════════
     MODE: dataviz  –  Interactive Dashboard (Data Visualization)
  ════════════════════════════════════════════════════════════ */
  function modeDataviz(c) {
    let angle = 0, lineData = [];
    for (let i = 0; i < 80; i++) lineData.push(0.25 + 0.5 * Math.sin(i * 0.2) + 0.15 * Math.random());
    function frame() {
      const ctx = c.ctx, W = c.w, H = c.h;
      var tc = getTC();
      ctx.clearRect(0, 0, W, H);
      var bgG = ctx.createLinearGradient(0, 0, W, H);
      bgG.addColorStop(0, tc.bg1); bgG.addColorStop(1, tc.bg2);
      ctx.fillStyle = bgG; ctx.fillRect(0, 0, W, H);
      angle += 0.008;
      const half = W / 2;
      // ── left: animated donut ──
      const cx = half * 0.42, cy = H * 0.45, r = Math.min(cx, cy) * 0.55;
      const slices = [
        { pct: 0.28, color: '#F59E0B', label: 'Sales' },
        { pct: 0.22, color: '#2563EB', label: 'Ops' },
        { pct: 0.18, color: '#06B6D4', label: 'HR' },
        { pct: 0.17, color: '#10B981', label: 'Mktg' },
        { pct: 0.15, color: '#8B5CF6', label: 'Finance' }
      ];
      let a = angle;
      slices.forEach(s => {
        const end = a + s.pct * Math.PI * 2;
        const glow = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r);
        glow.addColorStop(0, s.color + '55');
        glow.addColorStop(1, s.color);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, a, end);
        ctx.closePath();
        ctx.fillStyle = glow; ctx.fill();
        ctx.strokeStyle = tc.bg2; ctx.lineWidth = 2; ctx.stroke();
        // label
        const ma = a + (end - a) / 2;
        const lx = cx + Math.cos(ma) * r * 0.72;
        const ly = cy + Math.sin(ma) * r * 0.72;
        ctx.font = 'bold 9px Inter,sans-serif';
        ctx.fillStyle = tc.label; ctx.textAlign = 'center';
        ctx.fillText(s.label, lx, ly);
        a = end;
      });
      // donut hole
      ctx.beginPath(); ctx.arc(cx, cy, r * 0.48, 0, Math.PI * 2);
      ctx.fillStyle = tc.bg1; ctx.fill();
      ctx.font = 'bold 12px Inter,sans-serif'; ctx.fillStyle = '#F59E0B'; ctx.textAlign = 'center';
      ctx.fillText('Live', cx, cy - 7);
      ctx.font = '9px Inter,sans-serif'; ctx.fillStyle = tc.gridLabel;
      ctx.fillText('Dashboard', cx, cy + 8);
      // ── right: line chart ──
      const lx = half * 1.05, ly = H * 0.15, lw = half * 0.88, lh = H * 0.58;
      ctx.strokeStyle = tc.gridLine; ctx.lineWidth = 1;
      for (let g = 0; g <= 4; g++) {
        const gy = ly + lh - (g / 4) * lh;
        ctx.beginPath(); ctx.moveTo(lx, gy); ctx.lineTo(lx + lw, gy); ctx.stroke();
      }
      // area fill
      ctx.beginPath();
      lineData.forEach((v, i) => {
        const px = lx + (i / (lineData.length - 1)) * lw;
        const py = ly + lh - v * lh;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      });
      ctx.lineTo(lx + lw, ly + lh); ctx.lineTo(lx, ly + lh); ctx.closePath();
      const ag = ctx.createLinearGradient(lx, ly, lx, ly + lh);
      ag.addColorStop(0, 'rgba(6,182,212,0.35)');
      ag.addColorStop(1, 'rgba(6,182,212,0.02)');
      ctx.fillStyle = ag; ctx.fill();
      // line
      ctx.beginPath();
      lineData.forEach((v, i) => {
        const px = lx + (i / (lineData.length - 1)) * lw;
        const py = ly + lh - v * lh;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      });
      ctx.strokeStyle = '#06B6D4'; ctx.lineWidth = 2; ctx.stroke();
      // moving dot
      const di = Math.floor((Date.now() / 40) % lineData.length);
      const dpx = lx + (di / (lineData.length - 1)) * lw;
      const dpy = ly + lh - lineData[di] * lh;
      ctx.beginPath(); ctx.arc(dpx, dpy, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#06B6D4'; ctx.fill();
      ctx.beginPath(); ctx.arc(dpx, dpy, 9, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(6,182,212,0.4)'; ctx.lineWidth = 2; ctx.stroke();
      drawMetrics(ctx, W, H, [
        { label: 'Dashboards', value: '120+', color: '#F59E0B' },
        { label: 'Charts Built', value: '600+', color: '#06B6D4' },
        { label: 'Refresh Rate', value: 'Live', color: '#10B981' }
      ]);
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ════════════════════════════════════════════════════════════
     MODE: cloud  –  Server Cluster Topology (Cloud & DevOps)
  ════════════════════════════════════════════════════════════ */
  function modeCloud(c) {
    const servers = [
      { label: 'Dev',     icon: '⚙',  x: 0.12, y: 0.28, color: '#2563EB' },
      { label: 'Staging', icon: '🔵', x: 0.40, y: 0.14, color: '#06B6D4' },
      { label: 'DB',      icon: '🗄',  x: 0.40, y: 0.72, color: '#8B5CF6' },
      { label: 'Prod',    icon: '✅',  x: 0.70, y: 0.28, color: '#10B981' },
      { label: 'CDN',     icon: '🌐',  x: 0.70, y: 0.72, color: '#F59E0B' },
      { label: 'Monitor', icon: '📊', x: 0.88, y: 0.48, color: '#EC4899' }
    ];
    const links = [[0,1],[0,2],[1,3],[2,3],[1,2],[3,4],[3,5],[4,5]];
    let packets = [], t = 0;
    function frame() {
      const ctx = c.ctx, W = c.w, H = c.h;
      var tc = getTC();
      ctx.clearRect(0, 0, W, H);
      var bgG = ctx.createLinearGradient(0, 0, W, H);
      bgG.addColorStop(0, tc.bg1); bgG.addColorStop(1, tc.bg2);
      ctx.fillStyle = bgG; ctx.fillRect(0, 0, W, H);
      t += 0.016;
      // links
      links.forEach(([ai, bi]) => {
        const a = servers[ai], b = servers[bi];
        const ax = a.x * W, ay = a.y * H, bx = b.x * W, by = b.y * H;
        ctx.strokeStyle = 'rgba(99,102,241,0.18)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
      });
      // inject packets
      if (Math.random() < 0.04) {
        const li = links[Math.floor(Math.random() * links.length)];
        packets.push({ ai: li[0], bi: li[1], p: 0, speed: rnd(0.006, 0.015) });
      }
      packets = packets.filter(pk => {
        pk.p += pk.speed;
        if (pk.p > 1) return false;
        const a = servers[pk.ai], b = servers[pk.bi];
        const x = lerp(a.x * W, b.x * W, pk.p);
        const y = lerp(a.y * H, b.y * H, pk.p);
        const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
        g.addColorStop(0, 'rgba(99,102,241,0.95)');
        g.addColorStop(1, 'rgba(99,102,241,0)');
        ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        return true;
      });
      // server nodes
      servers.forEach(s => {
        const sx = s.x * W, sy = s.y * H;
        const pulse = 0.8 + 0.2 * Math.sin(t * 2 + s.x * 10);
        const g2 = ctx.createRadialGradient(sx, sy, 0, sx, sy, 34);
        g2.addColorStop(0, s.color + '33');
        g2.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g2;
        ctx.beginPath(); ctx.arc(sx, sy, 34, 0, Math.PI * 2); ctx.fill();
        // server box
        ctx.shadowColor = s.color; ctx.shadowBlur = 15 * pulse;
        roundRectFill(ctx, sx - 34, sy - 20, 68, 40, 10, s.color + '22');
        ctx.strokeStyle = s.color; ctx.lineWidth = 1.5;
        roundRectStroke(ctx, sx - 34, sy - 20, 68, 40, 10);
        ctx.shadowBlur = 0;
        // label
        ctx.font = 'bold 10px Inter,sans-serif'; ctx.fillStyle = tc.label; ctx.textAlign = 'center';
        ctx.fillText(s.label, sx, sy + 4);
        // status dot
        ctx.beginPath(); ctx.arc(sx + 24, sy - 12, 4, 0, Math.PI * 2);
        ctx.fillStyle = s.color; ctx.fill();
      });
      drawMetrics(ctx, W, H, [
        { label: 'Uptime', value: '99.9%', color: '#10B981' },
        { label: 'Deploy Freq', value: '8×/day', color: '#2563EB' },
        { label: 'MTTR', value: '4min', color: '#06B6D4' }
      ]);
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ════════════════════════════════════════════════════════════
     MODE: mlops  –  ML Lifecycle Wheel (MLOps)
  ════════════════════════════════════════════════════════════ */
  function modeMLops(c) {
    const stages = [
      { label: 'Data Prep', color: '#2563EB' },
      { label: 'Training', color: '#8B5CF6' },
      { label: 'Evaluation', color: '#06B6D4' },
      { label: 'Deploy', color: '#10B981' },
      { label: 'Monitor', color: '#F59E0B' },
      { label: 'Retrain', color: '#EC4899' }
    ];
    let spinAngle = 0, active = 0, switchT = 0;
    function frame() {
      const ctx = c.ctx, W = c.w, H = c.h;
      var tc = getTC();
      ctx.clearRect(0, 0, W, H);
      var bgG = ctx.createLinearGradient(0, 0, W, H);
      bgG.addColorStop(0, tc.bg1); bgG.addColorStop(1, tc.bg2);
      ctx.fillStyle = bgG; ctx.fillRect(0, 0, W, H);
      spinAngle += 0.004;
      switchT += 0.016;
      if (switchT > 2.5) { active = (active + 1) % stages.length; switchT = 0; }
      const cx = W * 0.42, cy = H * 0.5;
      const R = Math.min(cx, cy) * 0.72;
      const slice = (Math.PI * 2) / stages.length;
      stages.forEach((s, i) => {
        const a1 = spinAngle + i * slice - slice / 2;
        const a2 = a1 + slice - 0.05;
        const isActive = i === active;
        const r = isActive ? R : R * 0.88;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, a1, a2);
        ctx.closePath();
        ctx.fillStyle = isActive ? s.color + 'BB' : s.color + '33';
        ctx.fill();
        ctx.strokeStyle = isActive ? s.color : s.color + '55';
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.stroke();
        const ma = a1 + slice / 2;
        const lr = isActive ? R * 0.65 : R * 0.57;
        const lx = cx + Math.cos(ma) * lr;
        const ly = cy + Math.sin(ma) * lr;
        ctx.font = `${isActive ? 'bold ' : ''}10px Inter,sans-serif`;
        ctx.fillStyle = isActive ? tc.label : tc.gridLabel;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(s.label, lx, ly);
      });
      // center
      ctx.beginPath(); ctx.arc(cx, cy, R * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = tc.bg1; ctx.fill();
      ctx.strokeStyle = stages[active].color; ctx.lineWidth = 2; ctx.stroke();
      ctx.font = 'bold 11px Inter,sans-serif';
      ctx.fillStyle = stages[active].color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('MLOps', cx, cy - 8);
      ctx.font = '9px Inter,sans-serif'; ctx.fillStyle = tc.gridLabel;
      ctx.fillText(stages[active].label, cx, cy + 8);
      ctx.textBaseline = 'alphabetic';
      // pipeline on right
      const px = W * 0.72, pstages = ['Collect', 'Preprocess', 'Train', 'Serve', 'Track'];
      pstages.forEach((ps, i) => {
        const py = H * 0.18 + i * H * 0.15;
        const isAct = i === active % pstages.length;
        ctx.fillStyle = isAct ? '#2563EB22' : tc.inactiveBg;
        ctx.strokeStyle = isAct ? '#2563EB' : tc.inactiveFg;
        ctx.lineWidth = 1;
        roundRectFill(ctx, px - 55, py - 14, 110, 28, 8, ctx.fillStyle);
        roundRectStroke(ctx, px - 55, py - 14, 110, 28, 8);
        ctx.font = `${isAct ? 'bold ' : ''}10px Inter,sans-serif`;
        ctx.fillStyle = isAct ? '#93C5FD' : tc.gridLabel;
        ctx.textAlign = 'center';
        ctx.fillText(ps, px, py + 4);
        if (i < pstages.length - 1) {
          const arrowY = py + 14;
          ctx.strokeStyle = isAct ? '#2563EB88' : 'rgba(99,102,241,0.2)';
          ctx.lineWidth = 1; ctx.beginPath();
          ctx.moveTo(px, arrowY); ctx.lineTo(px, arrowY + H * 0.15 - 14); ctx.stroke();
        }
      });
      drawMetrics(ctx, W, H, [
        { label: 'Models Live', value: '50+', color: '#8B5CF6' },
        { label: 'Drift Detected', value: '99%', color: '#06B6D4' },
        { label: 'Re-train Cycle', value: '24h', color: '#10B981' }
      ]);
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ════════════════════════════════════════════════════════════
     MODE: saas  –  Build Pipeline (Website & SaaS Dev)
  ════════════════════════════════════════════════════════════ */
  function modeSaas(c) {
    const stages = [
      { label: 'Spec', icon: '📋', color: '#2563EB' },
      { label: 'Design', icon: '🎨', color: '#8B5CF6' },
      { label: 'Code', icon: '💻', color: '#06B6D4' },
      { label: 'Test', icon: '🧪', color: '#F59E0B' },
      { label: 'Deploy', icon: '🚀', color: '#10B981' }
    ];
    let active = 0, progress = 0, t = 0;
    const lines = ['> Initializing repo...', '> Installing deps...', '> Building assets...', '> Running tests...', '> Deploying to cloud...', '> ✅ Live at prod.saas.io'];
    let lineIdx = 0, lineT = 0;
    function frame() {
      const ctx = c.ctx, W = c.w, H = c.h;
      var tc = getTC();
      ctx.clearRect(0, 0, W, H);
      var bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      t += 0.016; progress += 0.008;
      if (progress >= 1) { progress = 0; active = (active + 1) % stages.length; lineIdx = (lineIdx + 1) % lines.length; }
      // pipeline bar
      const barY = H * 0.26, bw = (W * 0.82) / stages.length, gap = (W * 0.82 - bw * stages.length) / (stages.length + 1);
      stages.forEach((s, i) => {
        const bx = W * 0.08 + gap + i * (bw + gap);
        const isDone = i < active;
        const isCurr = i === active;
        const alpha = isDone ? 1 : isCurr ? 0.85 : 0.3;
        // glow for active
        if (isCurr) { ctx.shadowColor = s.color; ctx.shadowBlur = 20; }
        ctx.fillStyle = isDone || isCurr ? s.color + (isDone ? 'BB' : '55') : tc.inactiveBg;
        ctx.strokeStyle = isDone || isCurr ? s.color : 'rgba(99,102,241,0.2)';
        ctx.lineWidth = isCurr ? 2 : 1;
        roundRectFill(ctx, bx, barY - 30, bw, 60, 12, ctx.fillStyle);
        roundRectStroke(ctx, bx, barY - 30, bw, 60, 12);
        ctx.shadowBlur = 0;
        ctx.font = '18px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(s.icon, bx + bw / 2, barY - 3);
        ctx.font = `${isCurr ? 'bold ' : ''}10px Inter,sans-serif`;
        ctx.fillStyle = isCurr ? tc.label : tc.gridLabel;
        ctx.fillText(s.label, bx + bw / 2, barY + 18);
        // progress bar below active
        if (isCurr) {
          ctx.fillStyle = 'rgba(30,40,60,0.4)';
          roundRectFill(ctx, bx, barY + 32, bw, 5, 3, tc.progressTrk);
          ctx.fillStyle = s.color;
          roundRectFill(ctx, bx, barY + 32, bw * progress, 5, 3, s.color);
        }
        // connector
        if (i < stages.length - 1) {
          const cx2 = bx + bw, cy2 = barY;
          ctx.strokeStyle = isDone ? stages[i].color + '66' : 'rgba(99,102,241,0.15)';
          ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
          ctx.beginPath(); ctx.moveTo(cx2, cy2); ctx.lineTo(cx2 + gap, cy2); ctx.stroke();
          ctx.setLineDash([]);
        }
      });
      // terminal output
      const tx = W * 0.08, ty = H * 0.48, tw = W * 0.84, th = H * 0.32;
      ctx.fillStyle = 'rgba(13,17,23,0.8)';
      roundRectFill(ctx, tx, ty, tw, th, 10, 'rgba(13,17,23,0.8)');
      ctx.strokeStyle = 'rgba(99,102,241,0.2)'; ctx.lineWidth = 1;
      roundRectStroke(ctx, tx, ty, tw, th, 10);
      ctx.font = '9px "Courier New",monospace'; ctx.fillStyle = '#22D3EE'; ctx.textAlign = 'left';
      for (let i = Math.max(0, lineIdx - 3); i <= lineIdx; i++) {
        ctx.fillStyle = i === lineIdx ? '#22D3EE' : 'rgba(100,200,220,0.4)';
        ctx.fillText(lines[i % lines.length], tx + 14, ty + 20 + (i - Math.max(0, lineIdx - 3)) * 18);
      }
      // blinking cursor
      if (Math.floor(t * 2) % 2 === 0) {
        ctx.fillStyle = '#22D3EE';
        ctx.fillRect(tx + 14 + ctx.measureText(lines[lineIdx % lines.length]).width, ty + 8 + (Math.min(lineIdx, 3)) * 18, 6, 12);
      }
      drawMetrics(ctx, W, H, [
        { label: 'Apps Delivered', value: '80+', color: '#10B981' },
        { label: 'Deploy Time', value: '3–4wk', color: '#2563EB' },
        { label: 'Tech Stack', value: '15+', color: '#8B5CF6' }
      ]);
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ════════════════════════════════════════════════════════════
     MODE: strategy  –  KPI Roadmap (Business Consulting)
  ════════════════════════════════════════════════════════════ */
  function modeStrategy(c) {
    const kpis = [
      { label: 'Assess', target: 0.82, color: '#F97316' },
      { label: 'Roadmap', target: 0.70, color: '#2563EB' },
      { label: 'Execute', target: 0.91, color: '#10B981' },
      { label: 'Scale', target: 0.65, color: '#8B5CF6' }
    ];
    let vals = kpis.map(() => 0), t = 0;
    const milestones = ['Discovery', 'Analysis', 'Strategy', 'Pilot', 'Launch', 'Growth'];
    let milestoneT = 0, activeMilestone = 0;
    function frame() {
      const ctx = c.ctx, W = c.w, H = c.h;
      var tc = getTC();
      ctx.clearRect(0, 0, W, H);
      var bgG = ctx.createLinearGradient(0, 0, W, H);
      bgG.addColorStop(0, tc.bg1); bgG.addColorStop(1, tc.bg2);
      ctx.fillStyle = bgG; ctx.fillRect(0, 0, W, H);
      t += 0.016; milestoneT += 0.016;
      if (milestoneT > 2.2) { activeMilestone = (activeMilestone + 1) % milestones.length; milestoneT = 0; }
      vals = vals.map((v, i) => lerp(v, kpis[i].target, 0.03));
      // ── KPI gauges top ──
      const gaugeR = Math.min(H * 0.20, W * 0.10);
      kpis.forEach((k, i) => {
        const cx = W * (0.15 + i * 0.235), cy = H * 0.34, r = gaugeR;
        // track
        ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI * 0.8, Math.PI * 2.2);
        ctx.strokeStyle = tc.progressTrk; ctx.lineWidth = 8; ctx.lineCap = 'round';
        ctx.stroke();
        // fill
        const sweep = (Math.PI * 1.4) * vals[i];
        ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI * 0.8, Math.PI * 0.8 + sweep);
        const g = ctx.createLinearGradient(cx - r, cy, cx + r, cy);
        g.addColorStop(0, k.color + '88'); g.addColorStop(1, k.color);
        ctx.strokeStyle = g; ctx.lineWidth = 8; ctx.lineCap = 'round';
        ctx.stroke();
        // center text
        ctx.font = 'bold 15px Inter,sans-serif'; ctx.fillStyle = k.color; ctx.textAlign = 'center';
        ctx.fillText(Math.round(vals[i] * 100) + '%', cx, cy + 5);
        ctx.font = '9px Inter,sans-serif'; ctx.fillStyle = tc.gridLabel;
        ctx.fillText(k.label, cx, cy + r + 16);
      });
      // ── milestone timeline ──
      const tx = W * 0.06, ty = H * 0.76, tw = W * 0.88;
      const step = tw / (milestones.length - 1);
      milestones.forEach((m, i) => {
        const mx = tx + i * step;
        const isDone = i < activeMilestone;
        const isAct = i === activeMilestone;
        // connector
        if (i < milestones.length - 1) {
          ctx.beginPath(); ctx.moveTo(mx, ty); ctx.lineTo(mx + step, ty);
          ctx.strokeStyle = isDone ? '#2563EB' : 'rgba(99,102,241,0.2)'; ctx.lineWidth = 2; ctx.stroke();
        }
        // node
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
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ════════════════════════════════════════════════════════════
     MODE: industries  –  Industry Hub (used on all solution pages)
  ════════════════════════════════════════════════════════════ */
  function modeIndustries(c) {
    const inds = [
      { label: 'Manufacturing', color: '#2563EB' },
      { label: 'FinTech', color: '#F59E0B' },
      { label: 'Healthcare', color: '#10B981' },
      { label: 'Retail', color: '#EC4899' },
      { label: 'Logistics', color: '#06B6D4' },
      { label: 'SaaS', color: '#8B5CF6' },
      { label: 'E-comm', color: '#F97316' },
      { label: 'Real Estate', color: '#14B8A6' },
      { label: 'Education', color: '#84CC16' },
      { label: 'Startups', color: '#FB7185' },
      { label: 'SMBs', color: '#A78BFA' },
      { label: 'Enterprise', color: '#60A5FA' }
    ];
    let t = 0, spinSpeed = 0.003;
    let orbitR, cx, cy;
    function recalc() { cx = c.w * 0.5; cy = c.h * 0.5; orbitR = Math.min(c.w, c.h) * 0.36; }
    recalc();
    window.addEventListener('resize', recalc);
    function frame() {
      const ctx = c.ctx, W = c.w, H = c.h;
      var tc = getTC();
      ctx.clearRect(0, 0, W, H);
      var bgG = ctx.createLinearGradient(0, 0, W, H);
      bgG.addColorStop(0, tc.bg1); bgG.addColorStop(1, tc.bg2);
      ctx.fillStyle = bgG; ctx.fillRect(0, 0, W, H);
      t += spinSpeed;
      // orbit ring
      ctx.beginPath(); ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(99,102,241,0.1)'; ctx.lineWidth = 1; ctx.stroke();
      // spokes + nodes
      inds.forEach((ind, i) => {
        const a = t + (i / inds.length) * Math.PI * 2;
        const nx = cx + Math.cos(a) * orbitR;
        const ny = cy + Math.sin(a) * orbitR;
        // spoke
        ctx.strokeStyle = ind.color + '33'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(nx, ny); ctx.stroke();
        // pulse packet
        const pp = ((t * 0.5 + i * 0.3) % 1);
        const ppx = lerp(cx, nx, pp), ppy = lerp(cy, ny, pp);
        const pg = ctx.createRadialGradient(ppx, ppy, 0, ppx, ppy, 5);
        pg.addColorStop(0, ind.color + 'CC'); pg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(ppx, ppy, 5, 0, Math.PI * 2);
        ctx.fillStyle = pg; ctx.fill();
        // node
        const nr = 22;
        const gn = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr * 1.5);
        gn.addColorStop(0, ind.color + '30'); gn.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gn; ctx.beginPath(); ctx.arc(nx, ny, nr * 1.5, 0, Math.PI * 2); ctx.fill();
        roundRectFill(ctx, nx - nr, ny - 13, nr * 2, 26, 8, ind.color + '22');
        ctx.strokeStyle = ind.color + '88'; ctx.lineWidth = 1;
        roundRectStroke(ctx, nx - nr, ny - 13, nr * 2, 26, 8);
        ctx.font = '8.5px Inter,sans-serif'; ctx.fillStyle = tc.textMid; ctx.textAlign = 'center';
        ctx.fillText(ind.label, nx, ny + 4);
      });
      // center hub
      const hr = Math.min(W, H) * 0.1;
      const hg = ctx.createRadialGradient(cx, cy, 0, cx, cy, hr);
      hg.addColorStop(0, 'rgba(37,99,235,0.5)'); hg.addColorStop(1, 'rgba(37,99,235,0.05)');
      ctx.beginPath(); ctx.arc(cx, cy, hr, 0, Math.PI * 2); ctx.fillStyle = hg; ctx.fill();
      ctx.strokeStyle = 'rgba(99,102,241,0.5)'; ctx.lineWidth = 2; ctx.stroke();
      ctx.font = 'bold 12px Inter,sans-serif'; ctx.fillStyle = '#93C5FD'; ctx.textAlign = 'center';
      ctx.fillText('AKcelerate', cx, cy - 6);
      ctx.font = '9px Inter,sans-serif'; ctx.fillStyle = tc.gridLabel;
      ctx.fillText('12 Industries', cx, cy + 10);
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ════════════════════════════════════════════════════════════
     MODE: about  –  Company Growth + Team Stats
  ════════════════════════════════════════════════════════════ */
  function modeAbout(c) {
    const pts = [12, 18, 22, 28, 35, 45, 60, 75, 90, 108, 130, 150];
    let vals = pts.map(() => 0), t = 0;
    const stats = [
      { label: 'Years', value: 5, color: '#2563EB', icon: '📅' },
      { label: 'Clients', value: 120, color: '#10B981', icon: '🤝' },
      { label: 'Projects', value: 340, color: '#8B5CF6', icon: '💼' },
      { label: 'Countries', value: 8, color: '#F59E0B', icon: '🌍' }
    ];
    let dispVals = stats.map(() => 0);
    function frame() {
      const ctx = c.ctx, W = c.w, H = c.h;
      var tc = getTC();
      ctx.clearRect(0, 0, W, H);
      var bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      t += 0.016;
      vals = vals.map((v, i) => lerp(v, pts[i] / 150, 0.04));
      dispVals = dispVals.map((v, i) => lerp(v, stats[i].value, 0.05));
      // ── growth line chart (top 55% of canvas) ──
      const lx = W * 0.06, ly = H * 0.05, lw = W * 0.88, lh = H * 0.45;
      // grid
      ctx.strokeStyle = tc.gridLine; ctx.lineWidth = 1;
      for (let g = 1; g <= 4; g++) {
        const gy = ly + lh - (g / 4) * lh;
        ctx.beginPath(); ctx.moveTo(lx, gy); ctx.lineTo(lx + lw, gy); ctx.stroke();
      }
      // area
      ctx.beginPath();
      vals.forEach((v, i) => {
        const px = lx + (i / (vals.length - 1)) * lw;
        const py = ly + lh - v * lh;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      });
      ctx.lineTo(lx + lw, ly + lh); ctx.lineTo(lx, ly + lh); ctx.closePath();
      const ag = ctx.createLinearGradient(lx, ly, lx, ly + lh);
      ag.addColorStop(0, 'rgba(37,99,235,0.4)'); ag.addColorStop(1, 'rgba(37,99,235,0.03)');
      ctx.fillStyle = ag; ctx.fill();
      ctx.beginPath();
      vals.forEach((v, i) => {
        const px = lx + (i / (vals.length - 1)) * lw;
        const py = ly + lh - v * lh;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      });
      ctx.strokeStyle = '#2563EB'; ctx.lineWidth = 2; ctx.stroke();
      // dots + year labels
      const years = ['2019','2020','2021','2022','2023','2024','2025'];
      vals.forEach((v, i) => {
        if (i % 2 !== 0) return;
        const px = lx + (i / (vals.length - 1)) * lw;
        const py = ly + lh - v * lh;
        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#2563EB'; ctx.fill();
        ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(37,99,235,0.4)'; ctx.lineWidth = 2; ctx.stroke();
        ctx.font = '8px Inter,sans-serif'; ctx.fillStyle = tc.gridLabel; ctx.textAlign = 'center';
        ctx.fillText(years[i / 2] || '', px, ly + lh + 14);
      });
      ctx.font = '9px Inter,sans-serif'; ctx.fillStyle = '#60A5FA'; ctx.textAlign = 'left';
      ctx.fillText('Client Growth Trajectory', lx, ly - 4);
      // ── stat cards (bottom 35% of canvas) ──
      stats.forEach((s, i) => {
        const cw = (W - W * 0.08) / stats.length - 8;
        const cx = W * 0.04 + i * (cw + 8);
        const cy = H * 0.62;
        roundRectFill(ctx, cx, cy, cw, H * 0.28, 10, s.color + '15');
        ctx.strokeStyle = s.color + '40'; ctx.lineWidth = 1;
        roundRectStroke(ctx, cx, cy, cw, H * 0.28, 10);
        ctx.font = '18px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(s.icon, cx + cw / 2, cy + 28);
        ctx.font = 'bold 16px Inter,sans-serif'; ctx.fillStyle = s.color;
        ctx.fillText(Math.round(dispVals[i]) + (s.value > 10 ? '+' : ''), cx + cw / 2, cy + 52);
        ctx.font = '8px Inter,sans-serif'; ctx.fillStyle = tc.gridLabel;
        ctx.fillText(s.label, cx + cw / 2, cy + 67);
      });
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ── shared: metrics overlay (bottom right) ── */
  function drawMetrics(ctx, W, H, metrics) {
    var tc = getTC();
    metrics.forEach((m, i) => {
      const mw = 90, mh = 36, gap = 8;
      const mx = W - (metrics.length - i) * (mw + gap) + gap / 2;
      const my = H - mh - 10;
      roundRectFill(ctx, mx, my, mw, mh, 8, tc.cardBg);
      ctx.strokeStyle = m.color + '55'; ctx.lineWidth = 1;
      roundRectStroke(ctx, mx, my, mw, mh, 8);
      ctx.font = 'bold 13px Inter,sans-serif'; ctx.fillStyle = m.color; ctx.textAlign = 'center';
      ctx.fillText(m.value, mx + mw / 2, my + 16);
      ctx.font = '7px Inter,sans-serif'; ctx.fillStyle = tc.gridLabel;
      ctx.fillText(m.label, mx + mw / 2, my + 29);
    });
  }

  /* ── shared: decorative frame overlay ── */
  function drawVizFrame(ctx, W, H, title) {
    /* corner accent — top-left */
    var cl = 18, ct = 18, cs2 = 28;
    ctx.strokeStyle = 'rgba(37,99,235,0.55)'; ctx.lineWidth = 2; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(cl, ct + cs2); ctx.lineTo(cl, ct); ctx.lineTo(cl + cs2, ct); ctx.stroke();
    /* corner accent — top-right */
    ctx.strokeStyle = 'rgba(6,182,212,0.45)';
    ctx.beginPath(); ctx.moveTo(W - cl - cs2, ct); ctx.lineTo(W - cl, ct); ctx.lineTo(W - cl, ct + cs2); ctx.stroke();
    /* corner accent — bottom-left */
    ctx.strokeStyle = 'rgba(6,182,212,0.35)';
    ctx.beginPath(); ctx.moveTo(cl, H - ct - cs2); ctx.lineTo(cl, H - ct); ctx.lineTo(cl + cs2, H - ct); ctx.stroke();
    /* corner accent — bottom-right */
    ctx.strokeStyle = 'rgba(37,99,235,0.35)';
    ctx.beginPath(); ctx.moveTo(W - cl - cs2, H - ct); ctx.lineTo(W - cl, H - ct); ctx.lineTo(W - cl, H - ct - cs2); ctx.stroke();
    /* title badge */
    if (title) {
      ctx.font = '600 ' + Math.round(H * 0.038) + 'px Inter,sans-serif';
      var tw = ctx.measureText(title).width;
      var bx = W / 2 - tw / 2 - 10, by = H - Math.round(H * 0.1), bw2 = tw + 20, bh = Math.round(H * 0.072);
      var tc2 = getTC();
      roundRectFill(ctx, bx, by, bw2, bh, 8, tc2.cardBgMid);
      ctx.strokeStyle = 'rgba(37,99,235,0.3)'; ctx.lineWidth = 1;
      roundRectStroke(ctx, bx, by, bw2, bh, 8);
      ctx.fillStyle = tc2.textMid; ctx.textAlign = 'center';
      ctx.fillText(title, W / 2, by + bh * 0.66);
      ctx.textAlign = 'left';
    }
  }

  /* ── canvas helpers ── */
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y); ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h); ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r); ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }
  function roundRectFill(ctx, x, y, w, h, r, color) {
    if (color) ctx.fillStyle = color;
    roundRect(ctx, x, y, w, h, r); ctx.fill();
  }
  function roundRectStroke(ctx, x, y, w, h, r) {
    roundRect(ctx, x, y, w, h, r); ctx.stroke();
  }

  /* ─── casestudies mode — ROI results dashboard ─── */
  function modeCaseStudies(c) {
    var ctx = c.ctx;
    var W = c.w, H = c.h;
    var t = 0;
    var cases = [
      { label: 'Automotive', metric: '42%', sub: 'Downtime Cut', col: '#2563EB', pct: 0.42 },
      { label: 'Pharma',     metric: '31%', sub: 'OEE Gain',    col: '#06B6D4', pct: 0.31 },
      { label: 'FMCG',       metric: '5.2×', sub: 'ROI',        col: '#8B5CF6', pct: 0.72 },
      { label: 'Logistics',  metric: '28%', sub: 'Cost Save',   col: '#22C55E', pct: 0.28 },
      { label: 'Energy',     metric: '19%', sub: 'Efficiency',  col: '#F59E0B', pct: 0.19 }
    ];
    var active = 0, switchTimer = 0;
    var particles = [];
    for (var i = 0; i < 25; i++) {
      particles.push({ x: rnd(0, W), y: rnd(0, H), r: rnd(1, 2.2), vy: rnd(-0.3, -0.1), opacity: rnd(0.2, 0.5) });
    }
    function frame() {
      var tc = getTC();
      ctx.clearRect(0, 0, W, H);
      t += 0.018;
      switchTimer++;
      if (switchTimer > 130) { active = (active + 1) % cases.length; switchTimer = 0; }

      /* bg gradient */
      var bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      /* particles */
      particles.forEach(function (p) {
        p.y += p.vy;
        if (p.y < -5) p.y = H + 5;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37,99,235,' + p.opacity + ')'; ctx.fill();
      });

      /* horizontal bar chart */
      var bx = W * 0.05, bw = W * 0.45, barH = (H * 0.65) / cases.length, by0 = H * 0.12;
      ctx.font = '500 ' + Math.round(H * 0.045) + 'px Poppins,sans-serif';
      cases.forEach(function (cs, i) {
        var y = by0 + i * (barH + H * 0.022);
        var progress = Math.min(1, Math.max(0, (t - i * 0.3) * 0.8));
        var isActive = i === active;
        /* track */
        roundRectFill(ctx, bx, y + barH * 0.35, bw, barH * 0.3, 3, tc.trackFill);
        /* fill */
        var fillW = bw * cs.pct * progress;
        var gr = ctx.createLinearGradient(bx, 0, bx + fillW, 0);
        gr.addColorStop(0, cs.col + 'aa'); gr.addColorStop(1, cs.col);
        roundRectFill(ctx, bx, y + barH * 0.35, fillW, barH * 0.3, 3, gr);
        /* glow if active */
        if (isActive) {
          ctx.shadowColor = cs.col; ctx.shadowBlur = 12;
          roundRectFill(ctx, bx, y + barH * 0.35, fillW, barH * 0.3, 3, gr);
          ctx.shadowBlur = 0;
        }
        /* label */
        ctx.fillStyle = isActive ? tc.label : tc.textMid;
        ctx.font = (isActive ? '600' : '400') + ' ' + Math.round(H * 0.042) + 'px Poppins,sans-serif';
        ctx.fillText(cs.label, bx, y + barH * 0.28);
        /* metric */
        ctx.fillStyle = cs.col;
        ctx.font = '700 ' + Math.round(H * 0.048) + 'px Poppins,sans-serif';
        ctx.fillText(cs.metric, bx + bw + W * 0.025, y + barH * 0.6);
        ctx.fillStyle = tc.textFaint;
        ctx.font = '400 ' + Math.round(H * 0.036) + 'px Inter,sans-serif';
        ctx.fillText(cs.sub, bx + bw + W * 0.025, y + barH * 0.88);
      });

      /* headline panel */
      var c2 = cases[active];
      var px = W * 0.54, py = H * 0.12, pw = W * 0.42, ph = H * 0.58;
      roundRectFill(ctx, px, py, pw, ph, 12, tc.panelBg);
      ctx.strokeStyle = c2.col + '44'; ctx.lineWidth = 1;
      roundRectStroke(ctx, px, py, pw, ph, 12);

      /* big number */
      ctx.font = '800 ' + Math.round(H * 0.18) + 'px Poppins,sans-serif';
      var gr2 = ctx.createLinearGradient(px, py, px + pw, py + ph);
      gr2.addColorStop(0, c2.col); gr2.addColorStop(1, '#06B6D4');
      ctx.fillStyle = gr2;
      ctx.textAlign = 'center';
      ctx.fillText(c2.metric, px + pw / 2, py + ph * 0.48);
      ctx.fillStyle = tc.textMid;
      ctx.font = '600 ' + Math.round(H * 0.058) + 'px Poppins,sans-serif';
      ctx.fillText(c2.sub, px + pw / 2, py + ph * 0.65);
      ctx.fillStyle = tc.textFaint;
      ctx.font = '400 ' + Math.round(H * 0.04) + 'px Inter,sans-serif';
      ctx.fillText(c2.label + ' Industry', px + pw / 2, py + ph * 0.78);
      ctx.textAlign = 'left';

      drawVizFrame(ctx, W, H, 'Case Study Results');
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ─── contact mode — globe / network connections ─── */
  function modeContact(c) {
    var ctx = c.ctx;
    var W = c.w, H = c.h;
    var t = 0;
    var cx = W * 0.55, cy = H * 0.5, R = Math.min(W, H) * 0.32;
    var nodes = [
      { lbl: 'Mumbai', angle: 0,    dist: R * 0.0, col: '#2563EB', size: 10 },
      { lbl: 'London', angle: 0.6,  dist: R * 0.85, col: '#06B6D4', size: 6 },
      { lbl: 'Dubai',  angle: 1.8,  dist: R * 0.78, col: '#8B5CF6', size: 6 },
      { lbl: 'Singapore', angle: 3.2, dist: R * 0.82, col: '#22C55E', size: 6 },
      { lbl: 'NYC',    angle: 4.8,  dist: R * 0.88, col: '#F59E0B', size: 6 },
      { lbl: 'Sydney', angle: 5.6,  dist: R * 0.75, col: '#EC4899', size: 6 }
    ];
    var pulses = [];
    setInterval(function () {
      var n = nodes[1 + Math.floor(Math.random() * (nodes.length - 1))];
      pulses.push({ x: cx + n.dist * Math.cos(n.angle + t * 0.2), y: cy + n.dist * Math.sin(n.angle + t * 0.2), r: 0, col: n.col, max: 40 });
    }, 900);

    function nodePos(n) {
      return { x: cx + n.dist * Math.cos(n.angle + t * 0.2), y: cy + n.dist * Math.sin(n.angle + t * 0.2) };
    }

    function frame() {
      var tc = getTC();
      ctx.clearRect(0, 0, W, H);
      t += 0.012;
      var bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      /* globe circle */
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(37,99,235,0.15)'; ctx.lineWidth = 1; ctx.stroke();
      /* lat/lon rings */
      for (var i = 1; i <= 4; i++) {
        ctx.beginPath(); ctx.arc(cx, cy, R * i / 4, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(37,99,235,0.08)'; ctx.lineWidth = 0.5; ctx.stroke();
      }
      for (var a = 0; a < Math.PI * 2; a += Math.PI / 4) {
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
        ctx.strokeStyle = 'rgba(37,99,235,0.05)'; ctx.lineWidth = 0.5; ctx.stroke();
      }

      /* connections */
      var hub = nodePos(nodes[0]);
      nodes.slice(1).forEach(function (n) {
        var p = nodePos(n);
        ctx.beginPath(); ctx.moveTo(hub.x, hub.y); ctx.lineTo(p.x, p.y);
        var gr = ctx.createLinearGradient(hub.x, hub.y, p.x, p.y);
        gr.addColorStop(0, n.col + 'aa'); gr.addColorStop(1, 'rgba(37,99,235,0.1)');
        ctx.strokeStyle = gr; ctx.lineWidth = 1; ctx.stroke();
      });

      /* pulses */
      pulses = pulses.filter(function (p) { return p.r < p.max; });
      pulses.forEach(function (p) {
        p.r += 1.5;
        var alpha = (1 - p.r / p.max) * 0.6;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = p.col + Math.round(alpha * 255).toString(16).padStart(2, '0');
        ctx.lineWidth = 1.5; ctx.stroke();
      });

      /* nodes */
      nodes.forEach(function (n, i) {
        var p = nodePos(n);
        /* glow */
        ctx.beginPath(); ctx.arc(p.x, p.y, n.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = n.col + '22'; ctx.fill();
        /* dot */
        ctx.beginPath(); ctx.arc(p.x, p.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = n.col; ctx.fill();
        /* label */
        if (i > 0) {
          ctx.fillStyle = tc.text;
          ctx.font = '500 ' + Math.round(H * 0.04) + 'px Inter,sans-serif';
          ctx.fillText(n.lbl, p.x + n.size + 5, p.y + 4);
        }
      });

      /* HQ label */
      ctx.fillStyle = '#2563EB';
      ctx.font = '700 ' + Math.round(H * 0.045) + 'px Poppins,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Mumbai HQ', hub.x, hub.y - 18);
      ctx.textAlign = 'left';

      /* info panel left */
      var ix = W * 0.03, iy = H * 0.15;
      ctx.fillStyle = tc.panelBg;
      roundRect(ctx, ix, iy, W * 0.36, H * 0.6, 10); ctx.fill();
      var infos = [
        { label: 'Response Time', val: '<2h',   col: '#2563EB' },
        { label: 'Projects Live',  val: '37+',  col: '#06B6D4' },
        { label: 'Industries',     val: '13+',  col: '#8B5CF6' },
        { label: 'Satisfaction',   val: '98%',  col: '#22C55E' }
      ];
      infos.forEach(function (info, i2) {
        var ry = iy + H * 0.1 + i2 * H * 0.12;
        ctx.fillStyle = tc.textMid;
        ctx.font = '400 ' + Math.round(H * 0.038) + 'px Inter,sans-serif';
        ctx.fillText(info.label, ix + 14, ry);
        ctx.fillStyle = info.col;
        ctx.font = '700 ' + Math.round(H * 0.055) + 'px Poppins,sans-serif';
        ctx.fillText(info.val, ix + 14, ry + H * 0.07);
      });

      drawVizFrame(ctx, W, H, 'Global Connections');
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ─── services mode — radial service hub ─── */
  function modeServices(c) {
    var ctx = c.ctx;
    var W = c.w, H = c.h;
    var t = 0;
    var cx = W * 0.38, cy = H * 0.5;
    var R = Math.min(W * 0.32, H * 0.44);
    var services = [
      { lbl: 'AI & ML',       sub: 'Neural Networks', col: '#2563EB', icon: '🤖' },
      { lbl: 'Automation',    sub: 'RPA & Workflows',  col: '#06B6D4', icon: '⚙️' },
      { lbl: 'Analytics',     sub: 'BI & KPIs',       col: '#8B5CF6', icon: '📊' },
      { lbl: 'Cloud',         sub: 'AWS / GCP',       col: '#22C55E', icon: '☁️' },
      { lbl: 'SaaS Dev',      sub: 'Full-stack',      col: '#F59E0B', icon: '💻' },
      { lbl: 'Consulting',    sub: 'Strategy',        col: '#EC4899', icon: '🎯' }
    ];
    var active = 0, switchT = 0;
    var orbitPts = [];
    for (var i = 0; i < 30; i++) {
      orbitPts.push({ a: rnd(0, Math.PI * 2), r: rnd(R * 0.1, R * 0.9), speed: rnd(0.002, 0.008) });
    }

    function frame() {
      var tc = getTC();
      ctx.clearRect(0, 0, W, H);
      t += 0.015;
      switchT++;
      if (switchT > 100) { active = (active + 1) % services.length; switchT = 0; }

      var bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      /* orbit rings */
      [R * 0.45, R * 0.75, R].forEach(function (r2) {
        ctx.beginPath(); ctx.arc(cx, cy, r2, 0, Math.PI * 2);
        ctx.strokeStyle = tc.orbitRing; ctx.lineWidth = 1; ctx.stroke();
      });

      /* orbit particles */
      orbitPts.forEach(function (p) {
        p.a += p.speed;
        var px = cx + p.r * Math.cos(p.a), py = cy + p.r * Math.sin(p.a);
        ctx.beginPath(); ctx.arc(px, py, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37,99,235,0.35)'; ctx.fill();
      });

      /* service nodes */
      services.forEach(function (svc, i) {
        var angle = (i / services.length) * Math.PI * 2 - Math.PI / 2 + t * 0.08;
        var px = cx + R * Math.cos(angle), py = cy + R * Math.sin(angle);
        var isActive = i === active;
        var nodeR = isActive ? 22 : 16;

        /* connection line */
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py);
        var gr = ctx.createLinearGradient(cx, cy, px, py);
        gr.addColorStop(0, svc.col + '55'); gr.addColorStop(1, 'transparent');
        ctx.strokeStyle = isActive ? svc.col + 'aa' : gr;
        ctx.lineWidth = isActive ? 2 : 0.8; ctx.stroke();

        /* node ring */
        if (isActive) {
          ctx.beginPath(); ctx.arc(px, py, nodeR + 8, 0, Math.PI * 2);
          ctx.fillStyle = svc.col + '22'; ctx.fill();
        }
        ctx.beginPath(); ctx.arc(px, py, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? svc.col : tc.nodeBg;
        ctx.fill();
        ctx.strokeStyle = svc.col; ctx.lineWidth = isActive ? 2 : 1.5; ctx.stroke();

        /* label */
        var textX = px + (px > cx ? 28 : -28), textY = py + 5;
        ctx.textAlign = px > cx + 10 ? 'left' : px < cx - 10 ? 'right' : 'center';
        ctx.fillStyle = isActive ? tc.label : tc.textMid;
        ctx.font = (isActive ? '600' : '400') + ' ' + Math.round(H * 0.042) + 'px Poppins,sans-serif';
        ctx.fillText(svc.lbl, textX, textY - 4);
        ctx.fillStyle = isActive ? svc.col : tc.textFaint;
        ctx.font = '400 ' + Math.round(H * 0.033) + 'px Inter,sans-serif';
        ctx.fillText(svc.sub, textX, textY + 12);
        ctx.textAlign = 'left';
      });

      /* center hub */
      var hubR = R * 0.18;
      ctx.beginPath(); ctx.arc(cx, cy, hubR + 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(37,99,235,0.1)'; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, hubR, 0, Math.PI * 2);
      var hubGr = ctx.createRadialGradient(cx, cy, 0, cx, cy, hubR);
      hubGr.addColorStop(0, '#2563EB'); hubGr.addColorStop(1, '#0EA5E9');
      ctx.fillStyle = hubGr; ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 ' + Math.round(H * 0.05) + 'px Poppins,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('AK', cx, cy + Math.round(H * 0.02));
      ctx.textAlign = 'left';

      /* right info panel */
      var c2 = services[active];
      var px2 = W * 0.62, py2 = H * 0.15, pw = W * 0.34, ph = H * 0.6;
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
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ─── pricing mode — value radar + comparison ─── */
  function modePricing(c) {
    var ctx = c.ctx;
    var W = c.w, H = c.h;
    var t = 0;
    var cx = W * 0.35, cy = H * 0.52, R = Math.min(W * 0.28, H * 0.38);
    var dims = ['Scalability','AI Depth','Support','Custom','Speed','Value'];
    var plans = [
      { name: 'Starter',      col: '#64748B', vals: [0.4,0.3,0.4,0.2,0.5,0.5], lineWidth: 1.5 },
      { name: 'Professional', col: '#2563EB', vals: [0.75,0.7,0.75,0.65,0.8,0.85], lineWidth: 2.5 },
      { name: 'Enterprise',   col: '#06B6D4', vals: [1,0.95,1,1,0.95,1], lineWidth: 2 }
    ];
    var animate = 0;

    function radarPt(i, val) {
      var angle = (i / dims.length) * Math.PI * 2 - Math.PI / 2;
      return { x: cx + R * val * Math.cos(angle), y: cy + R * val * Math.sin(angle) };
    }

    function frame() {
      var tc = getTC();
      ctx.clearRect(0, 0, W, H);
      t += 0.015;
      animate = Math.min(1, animate + 0.015);

      var bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      /* radar grid */
      for (var ring = 1; ring <= 4; ring++) {
        ctx.beginPath();
        dims.forEach(function (d, i) {
          var pt = radarPt(i, ring / 4);
          i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
        });
        ctx.closePath();
        ctx.strokeStyle = tc.orbitRing; ctx.lineWidth = 0.8; ctx.stroke();
      }
      dims.forEach(function (d, i) {
        var pt = radarPt(i, 1);
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(pt.x, pt.y);
        ctx.strokeStyle = tc.orbitRing; ctx.lineWidth = 0.8; ctx.stroke();
        /* label */
        var lx = cx + (R * 1.22) * Math.cos((i / dims.length) * Math.PI * 2 - Math.PI / 2);
        var ly = cy + (R * 1.22) * Math.sin((i / dims.length) * Math.PI * 2 - Math.PI / 2);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '500 ' + Math.round(H * 0.04) + 'px Inter,sans-serif';
        ctx.textAlign = lx < cx - 5 ? 'right' : lx > cx + 5 ? 'left' : 'center';
        ctx.fillText(d, lx, ly + 4);
      });
      ctx.textAlign = 'left';

      /* plan polygons */
      plans.forEach(function (plan) {
        ctx.beginPath();
        plan.vals.forEach(function (v, i) {
          var pt = radarPt(i, v * animate);
          i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
        });
        ctx.closePath();
        ctx.fillStyle = plan.col + '22';
        ctx.fill();
        ctx.strokeStyle = plan.col;
        ctx.lineWidth = plan.lineWidth;
        ctx.stroke();
      });

      /* legend right */
      var lx2 = W * 0.62, ly2 = H * 0.18;
      ctx.font = '600 ' + Math.round(H * 0.048) + 'px Poppins,sans-serif';
      ctx.fillStyle = tc.text;
      ctx.fillText('Plan Comparison', lx2, ly2);

      plans.forEach(function (plan, i) {
        var by = ly2 + H * 0.1 + i * H * 0.24;
        /* box */
        roundRectFill(ctx, lx2, by, W * 0.32, H * 0.18, 10, tc.panelBg);
        ctx.strokeStyle = plan.col + '55'; ctx.lineWidth = 1;
        roundRectStroke(ctx, lx2, by, W * 0.32, H * 0.18, 10);
        /* dot */
        ctx.beginPath(); ctx.arc(lx2 + 16, by + H * 0.06, 5, 0, Math.PI * 2);
        ctx.fillStyle = plan.col; ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '700 ' + Math.round(H * 0.045) + 'px Poppins,sans-serif';
        ctx.fillText(plan.name, lx2 + 28, by + H * 0.072);
        /* bar */
        var avgScore = plan.vals.reduce(function (a, b) { return a + b; }, 0) / plan.vals.length;
        roundRectFill(ctx, lx2 + 10, by + H * 0.11, W * 0.3 - 10, 5, 3, tc.trackFill);
        var fillW = (W * 0.3 - 10) * avgScore * animate;
        var barGr = ctx.createLinearGradient(lx2 + 10, 0, lx2 + 10 + fillW, 0);
        barGr.addColorStop(0, plan.col); barGr.addColorStop(1, '#06B6D4');
        roundRectFill(ctx, lx2 + 10, by + H * 0.11, fillW, 5, 3, barGr);
        ctx.fillStyle = plan.col;
        ctx.font = '600 ' + Math.round(H * 0.038) + 'px Inter,sans-serif';
        ctx.fillText(Math.round(avgScore * 100) + '%', lx2 + W * 0.3, by + H * 0.135);
      });

      drawVizFrame(ctx, W, H, 'Plan Value Radar');
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ─── insights mode — reading & trends dashboard ─── */
  function modeInsights(c) {
    var ctx = c.ctx;
    var W = c.w, H = c.h;
    var t = 0;
    var categories = ['AI Strategy','Automation','Data Ops','Cloud','MLOps'];
    var colors = ['#2563EB','#06B6D4','#8B5CF6','#22C55E','#F59E0B'];
    /* spark lines per category */
    var sparks = categories.map(function () {
      var pts = [];
      for (var i = 0; i < 24; i++) pts.push(rnd(0.2, 0.9));
      return pts;
    });
    var particles = [];
    for (var i = 0; i < 30; i++) particles.push({ x: rnd(0, W), y: rnd(0, H), vx: rnd(-0.25, 0.25), vy: rnd(-0.4, -0.1), r: rnd(1, 2), col: colors[i % colors.length] });

    function frame() {
      var tc = getTC();
      ctx.clearRect(0, 0, W, H);
      t += 0.016;
      var bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      /* particles */
      particles.forEach(function (p) {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -4) p.y = H + 4;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col + '55'; ctx.fill();
      });

      /* left: trend category bars */
      var bx = W * 0.04, bw = W * 0.44;
      categories.forEach(function (cat, i) {
        var by = H * 0.12 + i * H * 0.15;
        var heat = 0.3 + 0.5 * Math.abs(Math.sin(t * 0.3 + i));
        roundRectFill(ctx, bx, by + H * 0.06, bw * heat, H * 0.06, 3, colors[i] + 'aa');
        roundRectFill(ctx, bx, by + H * 0.06, bw, H * 0.06, 3, tc.trackFill);
        var fillW = bw * heat;
        var gr = ctx.createLinearGradient(bx, 0, bx + fillW, 0);
        gr.addColorStop(0, colors[i] + 'dd'); gr.addColorStop(1, colors[i]);
        roundRectFill(ctx, bx, by + H * 0.06, fillW, H * 0.06, 3, gr);
        ctx.fillStyle = tc.text;
        ctx.font = '500 ' + Math.round(H * 0.042) + 'px Inter,sans-serif';
        ctx.fillText(cat, bx, by + H * 0.045);
        ctx.fillStyle = colors[i];
        ctx.font = '700 ' + Math.round(H * 0.04) + 'px Poppins,sans-serif';
        ctx.fillText(Math.round(heat * 100) + '%', bx + fillW + 6, by + H * 0.095);
      });

      /* right: sparklines */
      var sx = W * 0.54, sw = W * 0.42, sheight = H * 0.58;
      var sy = H * 0.16;
      roundRectFill(ctx, sx, sy - 10, sw, sheight + 20, 12, tc.panelBgFaint);

      ctx.fillStyle = tc.textMid;
      ctx.font = '600 ' + Math.round(H * 0.043) + 'px Poppins,sans-serif';
      ctx.fillText('Topic Trends', sx + 12, sy + 6);

      categories.forEach(function (cat, i) {
        var lineY = sy + H * 0.11 + i * H * 0.096;
        var pts = sparks[i];
        /* update last point */
        pts.push(rnd(0.2, 0.9)); if (pts.length > 24) pts.shift();

        ctx.beginPath();
        pts.forEach(function (v, pi) {
          var px2 = sx + 10 + pi * (sw - 20) / (pts.length - 1);
          var py2 = lineY + H * 0.07 - v * H * 0.065;
          pi === 0 ? ctx.moveTo(px2, py2) : ctx.lineTo(px2, py2);
        });
        ctx.strokeStyle = colors[i]; ctx.lineWidth = 1.5; ctx.stroke();

        /* dot at latest */
        var last = pts[pts.length - 1];
        var lx = sx + 10 + (pts.length - 1) * (sw - 20) / (pts.length - 1);
        var ly = lineY + H * 0.07 - last * H * 0.065;
        ctx.beginPath(); ctx.arc(lx, ly, 3, 0, Math.PI * 2);
        ctx.fillStyle = colors[i]; ctx.fill();
        ctx.fillStyle = tc.textFaint;
        ctx.font = '400 ' + Math.round(H * 0.033) + 'px Inter,sans-serif';
        ctx.fillText(cat, sx + 12, lineY + 6);
      });

      drawVizFrame(ctx, W, H, 'Content Intelligence');
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ─── founder mode — personal brand visual ─── */
  function modeFounder(c) {
    var ctx = c.ctx;
    var W = c.w, H = c.h;
    var t = 0;
    var cx = W * 0.38, cy = H * 0.5;
    /* expertise rings */
    var skills = [
      { lbl: 'AI & Machine Learning', pct: 95, col: '#2563EB', r: H * 0.38 },
      { lbl: 'Business Strategy',     pct: 90, col: '#06B6D4', r: H * 0.3 },
      { lbl: 'Data Engineering',      pct: 92, col: '#8B5CF6', r: H * 0.22 },
      { lbl: 'Product Dev',           pct: 85, col: '#22C55E', r: H * 0.14 }
    ];
    var orbitDots = [];
    skills.forEach(function (s) {
      for (var i = 0; i < 5; i++) orbitDots.push({ r: s.r, a: rnd(0, Math.PI * 2), speed: rnd(0.005, 0.015) * (Math.random() > 0.5 ? 1 : -1), col: s.col });
    });

    function frame() {
      var tc = getTC();
      ctx.clearRect(0, 0, W, H);
      t += 0.012;
      var bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, tc.bg1); bg.addColorStop(1, tc.bg2);
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      /* rings */
      skills.forEach(function (s) {
        var circ = 2 * Math.PI * s.r;
        var dash = (s.pct / 100) * circ;
        ctx.beginPath(); ctx.arc(cx, cy, s.r, -Math.PI / 2 + t * 0.04, -Math.PI / 2 + t * 0.04 + (Math.PI * 2 * (s.pct / 100)));
        ctx.strokeStyle = s.col + '55'; ctx.lineWidth = 3; ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cy, s.r, -Math.PI / 2, Math.PI * 2 - Math.PI / 2);
        ctx.strokeStyle = tc.orbitRing; ctx.lineWidth = 1; ctx.stroke();
        /* label at angle */
        var langle = -Math.PI / 2 + (s.pct / 100) * Math.PI * 2 / 2 + t * 0.04;
        var lx = cx + s.r * Math.cos(langle), ly = cy + s.r * Math.sin(langle);
        ctx.fillStyle = s.col;
        ctx.font = '600 ' + Math.round(H * 0.042) + 'px Poppins,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(s.pct + '%', lx, ly + 5);
        ctx.textAlign = 'left';
      });

      /* orbit dots */
      orbitDots.forEach(function (d) {
        d.a += d.speed;
        var px = cx + d.r * Math.cos(d.a), py = cy + d.r * Math.sin(d.a);
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = d.col; ctx.fill();
      });

      /* center */
      ctx.beginPath(); ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      var cGr = ctx.createRadialGradient(cx, cy, 0, cx, cy, 32);
      cGr.addColorStop(0, '#2563EB'); cGr.addColorStop(1, '#0EA5E9');
      ctx.fillStyle = cGr; ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 ' + Math.round(H * 0.06) + 'px Poppins,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('K', cx, cy + Math.round(H * 0.023));
      ctx.textAlign = 'left';

      /* right side text */
      var rx = W * 0.57, ry = H * 0.15;
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

      skills.forEach(function (s, i) {
        var sy = ry + H * 0.31 + i * H * 0.13;
        ctx.beginPath(); ctx.arc(rx + 7, sy - 4, 4, 0, Math.PI * 2);
        ctx.fillStyle = s.col; ctx.fill();
        ctx.fillStyle = tc.text;
        ctx.font = '400 ' + Math.round(H * 0.038) + 'px Inter,sans-serif';
        ctx.fillText(s.lbl, rx + 18, sy);
      });

      drawVizFrame(ctx, W, H, 'Founder Profile');
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ── public API ── */
  AKviz.init = function (id, mode) {
    var c = setupCanvas(id);
    if (!c) return;
    var map = {
      neural: modeNeural, flow: modeFlow, analytics: modeAnalytics,
      dataviz: modeDataviz, cloud: modeCloud, mlops: modeMLops,
      saas: modeSaas, strategy: modeStrategy, industries: modeIndustries,
      about: modeAbout, casestudies: modeCaseStudies, contact: modeContact,
      services: modeServices, pricing: modePricing, insights: modeInsights,
      founder: modeFounder
    };
    if (map[mode]) map[mode](c);
  };

  G.AKviz = AKviz;
})(window);
