/* =============================================
   AKcelerate – AI Manufacturing Analytics Platform
   Main Script
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── AOS Init ──────────────────────────────────
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  // ── Theme Toggle ─────────────────────────────
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ak-theme', theme);
  };

  const savedTheme = localStorage.getItem('ak-theme') || 'light';
  applyTheme(savedTheme);

  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  });

  // ── Navbar scroll effect ──────────────────────
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar && navbar.classList.add('scrolled');
      backToTop && backToTop.classList.add('visible');
    } else {
      navbar && navbar.classList.remove('scrolled');
      backToTop && backToTop.classList.remove('visible');
    }
  });

  // ── Mobile menu toggle ────────────────────────
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  menuToggle && menuToggle.addEventListener('click', () => {
    mobileMenu && mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  const mobileLinks = document.querySelectorAll('#mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu && mobileMenu.classList.remove('open');
    });
  });

  // ── Smooth scroll for anchor links ────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      try {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch (_) {}
    });
  });

  // ── Counter animation ─────────────────────────
  const counters = document.querySelectorAll('[data-target],[data-count]');
  const animatedCounters = new Set();

  const animateCounter = (el) => {
    if (animatedCounters.has(el)) return;
    animatedCounters.add(el);
    const target = +(el.getAttribute('data-target') || el.getAttribute('data-count'));
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target + '%';
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + '%';
      }
    }, 16);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ── FAQ accordion ─────────────────────────────
  window.toggleFaq = function(btn) {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item.active').forEach(activeItem => {
      activeItem.classList.remove('active');
      activeItem.querySelector('.faq-answer').classList.remove('open');
    });

    // Open clicked if it was closed
    if (!isActive) {
      item.classList.add('active');
      answer.classList.add('open');
    }
  };

  // ── Contact form validation ────────────────────
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const showErr = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
          el.classList.toggle('show', show);
        }
      };

      // Name
      const name = document.getElementById('name');
      if (name) {
        const ok = name.value.trim().length >= 2;
        showErr('nameErr', !ok);
        if (!ok) valid = false;
      }

      // Email
      const email = document.getElementById('email');
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const ok = emailRegex.test(email.value.trim());
        showErr('emailErr', !ok);
        if (!ok) valid = false;
      }

      // Company
      const company = document.getElementById('company');
      if (company) {
        const ok = company.value.trim().length >= 2;
        showErr('companyErr', !ok);
        if (!ok) valid = false;
      }

      // Message
      const message = document.getElementById('message');
      if (message) {
        const ok = message.value.trim().length >= 20;
        showErr('messageErr', !ok);
        if (!ok) valid = false;
      }

      if (!valid) return;

      // Simulate submission
      const submitBtn = document.getElementById('submitBtn');
      const submitText = document.getElementById('submitText');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'wait';
      }
      if (submitText) submitText.textContent = 'Sending...';

      setTimeout(() => {
        // Show success
        const successMsg = document.getElementById('successMsg');
        if (successMsg) {
          successMsg.style.display = 'flex';
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        contactForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.style.cursor = 'pointer';
        }
        if (submitText) submitText.textContent = 'Send Message';

        // Hide success after 6s
        setTimeout(() => {
          if (successMsg) successMsg.style.display = 'none';
        }, 6000);
      }, 1500);
    });

    // Live validation clear on input
    ['name', 'email', 'company', 'message'].forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.addEventListener('input', () => {
          const err = document.getElementById(fieldId + 'Err');
          if (err) err.classList.remove('show');
        });
      }
    });
  }

  // ── Hero Chart (Chart.js) ─────────────────────
  const heroCtx = document.getElementById('heroChart');
  if (heroCtx && typeof Chart !== 'undefined') {
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = [8420, 9100, 8760, 9540, 9280, 8900, 9820];

    new Chart(heroCtx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Units Produced',
          data,
          borderColor: '#06B6D4',
          backgroundColor: 'rgba(6,182,212,0.08)',
          borderWidth: 2.5,
          pointBackgroundColor: '#06B6D4',
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(17,24,39,0.9)',
            borderColor: 'rgba(6,182,212,0.3)',
            borderWidth: 1,
            titleColor: '#E5E7EB',
            bodyColor: '#9CA3AF',
            callbacks: {
              label: ctx => ` ${ctx.raw.toLocaleString()} units`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { color: '#6B7280', font: { size: 11 } }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: {
              color: '#6B7280',
              font: { size: 11 },
              callback: v => v.toLocaleString()
            }
          }
        }
      }
    });
  }

  // ── OEE Chart ─────────────────────────────────
  const oeeCtx = document.getElementById('oeeChart');
  if (oeeCtx && typeof Chart !== 'undefined') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const beforeData = [65, 66, 64, 67, 66, 68, 70, 69, 71, 72, 73, 74];
    const afterData = [null, null, null, null, null, 70, 74, 78, 81, 83, 85, 87];

    new Chart(oeeCtx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Before AKcelerate',
            data: beforeData,
            borderColor: '#4B5563',
            backgroundColor: 'rgba(75,85,99,0.05)',
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 3,
            tension: 0.4,
            fill: true
          },
          {
            label: 'After AKcelerate',
            data: afterData,
            borderColor: '#06B6D4',
            backgroundColor: 'rgba(6,182,212,0.08)',
            borderWidth: 2.5,
            pointBackgroundColor: '#06B6D4',
            pointRadius: 4,
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#9CA3AF',
              font: { size: 11, family: 'Inter' },
              boxWidth: 20,
              padding: 15
            }
          },
          tooltip: {
            backgroundColor: 'rgba(17,24,39,0.9)',
            borderColor: 'rgba(37,99,235,0.3)',
            borderWidth: 1,
            titleColor: '#E5E7EB',
            bodyColor: '#9CA3AF',
            callbacks: {
              label: ctx => ` ${ctx.raw !== null ? ctx.raw + '%' : 'N/A'}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { color: '#6B7280', font: { size: 11 } }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            min: 55,
            max: 95,
            ticks: {
              color: '#6B7280',
              font: { size: 11 },
              callback: v => v + '%'
            }
          }
        }
      }
    });
  }

  // ── ROI Chart ─────────────────────────────────
  const roiCtx = document.getElementById('roiChart');
  if (roiCtx && typeof Chart !== 'undefined') {
    new Chart(roiCtx, {
      type: 'bar',
      data: {
        labels: ['Year 1', 'Year 2', 'Year 3'],
        datasets: [
          {
            label: 'Investment',
            data: [100, 20, 10],
            backgroundColor: 'rgba(75,85,99,0.4)',
            borderColor: 'rgba(75,85,99,0.7)',
            borderWidth: 1,
            borderRadius: 6
          },
          {
            label: 'Returns',
            data: [120, 180, 215],
            backgroundColor: 'rgba(37,99,235,0.4)',
            borderColor: 'rgba(6,182,212,0.6)',
            borderWidth: 1,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#9CA3AF',
              font: { size: 11, family: 'Inter' },
              boxWidth: 20,
              padding: 15
            }
          },
          tooltip: {
            backgroundColor: 'rgba(17,24,39,0.9)',
            borderColor: 'rgba(37,99,235,0.3)',
            borderWidth: 1,
            titleColor: '#E5E7EB',
            bodyColor: '#9CA3AF',
            callbacks: {
              label: ctx => ` ${ctx.raw}x return`
            }
          },
          title: {
            display: true,
            text: 'Cumulative ROI Over 3 Years',
            color: '#D1D5DB',
            font: { size: 13, family: 'Poppins', weight: '600' },
            padding: { bottom: 16 }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#6B7280', font: { size: 12 } }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: {
              color: '#6B7280',
              font: { size: 11 },
              callback: v => v + 'x'
            }
          }
        }
      }
    });
  }

});
