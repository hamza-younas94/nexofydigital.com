/* ============================================================
   Nexofy Digital — interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---- Navbar: shadow/border on scroll ---- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    const setOpen = (open) => {
      menu.classList.toggle('open', open);
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

  /* ---- Active nav link while scrolling ---- */
  const navLinks = Array.from(document.querySelectorAll('.nav-menu a[href^="#"]'));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if (sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---- Staggered scroll reveal ---- */
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('in'));
  } else {
    const ro = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const group = Array.from(entry.target.parentElement
          ? entry.target.parentElement.querySelectorAll(':scope > .reveal')
          : [entry.target]);
        const idx = Math.max(0, group.indexOf(entry.target));
        entry.target.style.transitionDelay = Math.min(idx * 80, 320) + 'ms';
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    reveals.forEach((el) => ro.observe(el));
  }

  /* ---- Cursor spotlight on service cards ---- */
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.service-card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---- Contact form ---- */
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    service: document.getElementById('service'),
    message: document.getElementById('message'),
  };
  const statusEl = document.getElementById('formStatus');
  const btn = form.querySelector('button[type="submit"]');
  const btnText = form.querySelector('.btn-text');
  const btnLoading = form.querySelector('.btn-loading');
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setError = (key, msg) => {
    const err = document.getElementById(key + 'Error');
    if (err) err.textContent = msg || '';
    if (fields[key]) fields[key].closest('.form-group').classList.toggle('invalid', Boolean(msg));
  };

  const validate = () => {
    let ok = true;
    if (!fields.name.value.trim()) { setError('name', 'Please tell us your name.'); ok = false; }
    else setError('name', '');

    if (!fields.email.value.trim()) { setError('email', 'We need an email to reply.'); ok = false; }
    else if (!emailRe.test(fields.email.value.trim())) { setError('email', 'That email doesn’t look right.'); ok = false; }
    else setError('email', '');

    if (!fields.service.value) { setError('service', 'Pick what you need.'); ok = false; }
    else setError('service', '');

    if (fields.message.value.trim().length < 10) { setError('message', 'A little more detail helps — 10 characters or so.'); ok = false; }
    else setError('message', '');

    return ok;
  };

  Object.entries(fields).forEach(([key, el]) => {
    el.addEventListener('input', () => { if (el.closest('.form-group').classList.contains('invalid')) setError(key, ''); });
  });

  const loading = (on) => {
    btn.disabled = on;
    if (btnText) btnText.hidden = on;
    if (btnLoading) btnLoading.hidden = !on;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = '';
    statusEl.className = 'form-status';
    if (!validate()) return;

    loading(true);
    const payload = {
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      service: fields.service.value,
      message: fields.message.value.trim(),
    };

    try {
      const res = await fetch('contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        form.reset();
        statusEl.textContent = data.message || 'Thanks — your message is in. We’ll reply within a day.';
        statusEl.classList.add('success');
      } else {
        statusEl.textContent = data.message || 'Something went wrong sending that. Email projects@nexofydigital.com and we’ll pick it up.';
        statusEl.classList.add('error');
      }
    } catch (err) {
      statusEl.textContent = 'Connection failed. Please try again, or email projects@nexofydigital.com.';
      statusEl.classList.add('error');
    } finally {
      loading(false);
    }
  });
})();
