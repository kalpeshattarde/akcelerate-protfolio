/* =========================================================
   AKcelerate visual.js  —  Premium animation & visual layer
   Provides: heroParticles, countUp, progressBars, tiltCards,
             typingCycle, floatingOrbs, scrollReveal
   ========================================================= */
(function (G) {
  'use strict';

  var AKvisual = {};

  /* ─── helpers ─── */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); };
  var rnd = function (a, b) { return a + Math.random() * (b - a); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  /* ─────────────────────────────────────────────────────────
     1. HERO PARTICLES  —  constellation of floating dots
        Usage: AKvisual.heroParticles('canvasId', opts?)
  ───────────────────────────────────────────────────────── */
  AKvisual.heroParticles = function (id, opts) {
    var el = document.getElementById(id);
    if (!el || el.tagName !== 'CANVAS') return;
    var O = Object.assign({
      count: 55, color: 'rgba(37,99,235,0.45)', lineColor: 'rgba(37,99,235,0.12)',
      speed: 0.4, connectDist: 130, radius: 2.2, bgFill: null
    }, opts || {});

    var ctx = el.getContext('2d');
    var W, H, pts, raf;

    function resize() {
      var pr = window.devicePixelRatio || 1;
      W = el.parentElement.offsetWidth || 1280;
      H = el.parentElement.offsetHeight || 420;
      el.width = Math.round(W * pr);
      el.height = Math.round(H * pr);
      el.style.width = W + 'px';
      el.style.height = H + 'px';
      ctx.setTransform(pr, 0, 0, pr, 0, 0);
    }

    function spawn() {
      pts = [];
      for (var i = 0; i < O.count; i++) {
        pts.push({
          x: rnd(0, W), y: rnd(0, H),
          vx: rnd(-O.speed, O.speed),
          vy: rnd(-O.speed, O.speed),
          r: rnd(1.4, O.radius)
        });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      if (O.bgFill) { ctx.fillStyle = O.bgFill; ctx.fillRect(0, 0, W, H); }

      pts.forEach(function (p) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });

      /* draw edges */
      for (var i = 0; i < pts.length; i++) {
        for (var j = i + 1; j < pts.length; j++) {
          var dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < O.connectDist) {
            var alpha = (1 - d / O.connectDist) * 0.6;
            ctx.strokeStyle = O.lineColor.replace('0.12', alpha.toFixed(2));
            ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
          }
        }
      }

      /* draw dots */
      pts.forEach(function (p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = O.color;
        ctx.fill();
      });

      raf = requestAnimationFrame(frame);
    }

    function init() {
      resize();
      spawn();
      frame();
    }

    window.addEventListener('resize', function () {
      resize(); spawn();
    });
    init();
    return { stop: function () { cancelAnimationFrame(raf); } };
  };

  /* ─────────────────────────────────────────────────────────
     2. COUNT-UP  —  animate numbers on scroll into view
        Auto-discovers [data-count] elements.
        Call: AKvisual.countUp()  (or pass selector)
  ───────────────────────────────────────────────────────── */
  AKvisual.countUp = function (selector) {
    var els = $$(selector || '[data-count]');
    if (!els.length) return;

    function animateEl(el) {
      if (el._akDone) return;
      el._akDone = true;
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || (el.textContent.replace(/[\d.]+/, '').trim()) || '';
      var prefix = el.getAttribute('data-prefix') || '';
      var decimals = target % 1 !== 0 ? 1 : 0;
      var duration = 1600;
      var start = null;

      function step(ts) {
        if (!start) start = ts;
        var prog = Math.min((ts - start) / duration, 1);
        var ease = 1 - Math.pow(1 - prog, 3);
        var val = target * ease;
        el.textContent = prefix + val.toFixed(decimals) + suffix;
        if (prog < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) animateEl(e.target); });
      }, { threshold: 0.3 });
      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(animateEl);
    }
  };

  /* ─────────────────────────────────────────────────────────
     3. PROGRESS BARS  —  animate [data-progress] bars
        HTML: <div class="ak-progress-bar" data-progress="75"></div>
  ───────────────────────────────────────────────────────── */
  AKvisual.progressBars = function (selector) {
    var els = $$(selector || '[data-progress]');
    if (!els.length) return;

    function animateBar(el) {
      if (el._akDone) return;
      el._akDone = true;
      var pct = clamp(parseFloat(el.getAttribute('data-progress')), 0, 100);
      var fill = el.querySelector('.ak-progress-fill') || el;
      setTimeout(function () {
        fill.style.transition = 'width 1.2s cubic-bezier(.4,0,.2,1)';
        fill.style.width = pct + '%';
      }, 100);
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) animateBar(e.target); });
      }, { threshold: 0.3 });
      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(animateBar);
    }
  };

  /* ─────────────────────────────────────────────────────────
     4. TILT CARDS  —  subtle 3D mouse tilt on cards
        Usage: AKvisual.tiltCards('.ak-card, .case-card')
  ───────────────────────────────────────────────────────── */
  AKvisual.tiltCards = function (selector) {
    $$(selector || '.ak-card, .case-card, .pricing-card').forEach(function (el) {
      el.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var mx = e.clientX - cx, my = e.clientY - cy;
        var rx = clamp(-my / (r.height / 2) * 6, -6, 6);
        var ry = clamp(mx / (r.width / 2) * 6, -6, 6);
        el.style.transform = 'perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) scale(1.02)';
        el.style.boxShadow = '0 20px 60px rgba(37,99,235,0.18)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
        el.style.boxShadow = '';
      });
    });
  };

  /* ─────────────────────────────────────────────────────────
     5. TYPING CYCLE  —  rotating text typewriter effect
        Usage: AKvisual.typingCycle('elemId', ['text1','text2'])
  ───────────────────────────────────────────────────────── */
  AKvisual.typingCycle = function (id, texts, speed) {
    var el = document.getElementById(id);
    if (!el || !texts || !texts.length) return;
    var idx = 0, pos = 0, deleting = false;
    var spd = speed || 80;

    function tick() {
      var cur = texts[idx];
      if (!deleting) {
        el.textContent = cur.slice(0, ++pos);
        if (pos === cur.length) { deleting = true; setTimeout(tick, 1800); return; }
      } else {
        el.textContent = cur.slice(0, --pos);
        if (pos === 0) { deleting = false; idx = (idx + 1) % texts.length; }
      }
      setTimeout(tick, deleting ? spd / 2 : spd);
    }
    tick();
  };

  /* ─────────────────────────────────────────────────────────
     6. FLOATING ORBS  —  inject animated gradient orb blobs
        Usage: AKvisual.floatingOrbs('containerId', count?)
  ───────────────────────────────────────────────────────── */
  AKvisual.floatingOrbs = function (id, count) {
    var container = document.getElementById(id);
    if (!container) return;
    var n = count || 3;
    var colors = [
      'radial-gradient(circle,rgba(37,99,235,0.18) 0%,transparent 70%)',
      'radial-gradient(circle,rgba(6,182,212,0.15) 0%,transparent 70%)',
      'radial-gradient(circle,rgba(139,92,246,0.12) 0%,transparent 70%)',
    ];
    var sizes = [400, 300, 250];
    var positions = [
      { top: '-10%', right: '5%' }, { bottom: '10%', left: '8%' }, { top: '40%', right: '30%' }
    ];
    for (var i = 0; i < n; i++) {
      var orb = document.createElement('div');
      var s = sizes[i % sizes.length];
      orb.style.cssText = [
        'position:absolute',
        'width:' + s + 'px',
        'height:' + s + 'px',
        'background:' + colors[i % colors.length],
        'border-radius:50%',
        'filter:blur(' + Math.round(s * 0.18) + 'px)',
        'pointer-events:none',
        'z-index:0',
        'animation:akOrbFloat ' + (8 + i * 3) + 's ease-in-out infinite alternate',
        'animation-delay:-' + (i * 2.5) + 's'
      ].join(';');
      var pos = positions[i % positions.length];
      Object.keys(pos).forEach(function (k) { orb.style[k] = pos[k]; });
      container.style.position = container.style.position || 'relative';
      container.style.overflow = container.style.overflow || 'hidden';
      container.insertBefore(orb, container.firstChild);
    }
  };

  /* ─────────────────────────────────────────────────────────
     7. SCROLL REVEAL  —  fade+slide elements on scroll
        Auto-discovers [data-reveal] elements
  ───────────────────────────────────────────────────────── */
  AKvisual.scrollReveal = function () {
    var els = $$('[data-reveal]');
    if (!els.length || !('IntersectionObserver' in window)) return;

    els.forEach(function (el) {
      var dir = el.getAttribute('data-reveal') || 'up';
      var transforms = { up: 'translateY(30px)', down: 'translateY(-30px)', left: 'translateX(-30px)', right: 'translateX(30px)' };
      el.style.opacity = '0';
      el.style.transform = transforms[dir] || 'translateY(30px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'none';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { io.observe(el); });
  };

  /* ─────────────────────────────────────────────────────────
     8. ANIMATED STAT RINGS  —  circular progress rings
        Usage: AKvisual.statRings('[data-ring]')
  ───────────────────────────────────────────────────────── */
  AKvisual.statRings = function (selector) {
    $$(selector || '[data-ring]').forEach(function (el) {
      var pct = clamp(parseFloat(el.getAttribute('data-ring')) || 0, 0, 100);
      var size = parseInt(el.getAttribute('data-ring-size')) || 80;
      var stroke = parseInt(el.getAttribute('data-ring-stroke')) || 6;
      var r = (size - stroke) / 2;
      var circ = 2 * Math.PI * r;
      var dash = (pct / 100) * circ;

      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', size); svg.setAttribute('height', size);
      svg.setAttribute('viewBox', '0 0 ' + size + ' ' + size);
      svg.style.cssText = 'display:block;margin:auto';

      function circle(cls, sd) {
        var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', size / 2); c.setAttribute('cy', size / 2); c.setAttribute('r', r);
        c.setAttribute('fill', 'none'); c.setAttribute('stroke-width', stroke);
        c.setAttribute('stroke-dasharray', circ); c.setAttribute('stroke-dashoffset', sd);
        c.setAttribute('stroke-linecap', 'round');
        c.setAttribute('transform', 'rotate(-90 ' + (size / 2) + ' ' + (size / 2) + ')');
        c.className.baseVal = cls;
        return c;
      }

      svg.appendChild(circle('ak-ring-bg', 0));
      var fg = circle('ak-ring-fg', circ);
      svg.appendChild(fg);

      var label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', '50%'); label.setAttribute('y', '50%');
      label.setAttribute('text-anchor', 'middle'); label.setAttribute('dominant-baseline', 'middle');
      label.setAttribute('font-size', Math.round(size * 0.2)); label.setAttribute('font-weight', '700');
      label.setAttribute('fill', '#2563EB');
      label.textContent = pct + '%';
      svg.appendChild(label);

      el.innerHTML = '';
      el.appendChild(svg);

      if ('IntersectionObserver' in window) {
        var observed = false;
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting && !observed) {
              observed = true;
              fg.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)';
              fg.setAttribute('stroke-dashoffset', circ - dash);
            }
          });
        }, { threshold: 0.3 });
        io.observe(el);
      } else {
        fg.setAttribute('stroke-dashoffset', circ - dash);
      }
    });
  };

  /* ─────────────────────────────────────────────────────────
     9. HOVER RIPPLE  —  ripple effect on CTA buttons
  ───────────────────────────────────────────────────────── */
  AKvisual.buttonRipple = function (selector) {
    $$(selector || '.btn-primary, .btn-secondary').forEach(function (btn) {
      btn.style.overflow = 'hidden';
      btn.style.position = 'relative';
      btn.addEventListener('click', function (e) {
        var r = btn.getBoundingClientRect();
        var ripple = document.createElement('span');
        var size = Math.max(r.width, r.height) * 2;
        ripple.style.cssText = [
          'position:absolute', 'width:' + size + 'px', 'height:' + size + 'px',
          'border-radius:50%', 'background:rgba(255,255,255,0.25)',
          'left:' + (e.clientX - r.left - size / 2) + 'px',
          'top:' + (e.clientY - r.top - size / 2) + 'px',
          'transform:scale(0)', 'animation:akRipple 0.6s ease-out forwards',
          'pointer-events:none'
        ].join(';');
        btn.appendChild(ripple);
        setTimeout(function () { ripple.remove(); }, 700);
      });
    });
  };

  /* ─────────────────────────────────────────────────────────
     10. GRADIENT TEXT SHIMMER  —  animated gradient on text
  ───────────────────────────────────────────────────────── */
  AKvisual.shimmerText = function (selector) {
    $$(selector || '.gradient-text').forEach(function (el) {
      el.classList.add('ak-shimmer-text');
    });
  };

  G.AKvisual = AKvisual;
})(window);
