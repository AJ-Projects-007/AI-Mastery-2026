/* ==========================================================================
   NOVA AI ACADEMY — main.js
   Interactions: custom cursor, magnetic buttons, scrollspy nav, mobile menu,
   scroll reveal, count-up stats, testimonial carousel, hero parallax, forms,
   toasts, back-to-top. Every animation respects prefers-reduced-motion.
   ========================================================================== */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ------------------------------------------------------------ utilities */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function lerp(a, b, t) { return a + (b - a) * t; }

  /* Simple toast notifications */
  var toastContainer = $('#toast-container');
  function toast(message, icon) {
    if (!toastContainer) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<span>' + (icon || '✨') + '</span> ' + message;
    toastContainer.appendChild(el);
    setTimeout(function () {
      el.classList.add('is-leaving');
      setTimeout(function () { el.remove(); }, 380);
    }, 3400);
  }

  /* -------------------------------------------------------- custom cursor */
  var cursorDot = $('.cursor-dot');
  var cursorRing = $('.cursor-ring');
  var cursorActive = finePointer && !prefersReduced && cursorDot && cursorRing;

  if (cursorActive) {
    var cx = -100, cy = -100, rx = -100, ry = -100;
    var mx = -100, my = -100;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      cursorDot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
    });

    (function ringLoop() {
      cx = lerp(cx, mx, 0.18);
      cy = lerp(cy, my, 0.18);
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      cursorRing.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(ringLoop);
    })();

    var hoverTargets = 'a, button, .course-card, .why-card, .mini-card, .info-card, input, textarea, .social-link';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest && e.target.closest(hoverTargets)) cursorRing.classList.add('is-hover');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest && e.target.closest(hoverTargets)) cursorRing.classList.remove('is-hover');
    });
  }

  /* -------------------------------------------------------- magnetic hover */
  function initMagnetic() {
    if (!finePointer || prefersReduced) return;

    $all('.magnetic').forEach(function (el) {
      var strength = 0.32;

      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = 'translate(' + dx * strength + 'px,' + dy * strength + 'px)';
      });

      el.addEventListener('mouseleave', function () {
        el.style.transform = '';
      });
    });
  }

  /* --------------------------------------------------------------- navbar */
  var nav = $('#nav');
  var backToTop = $('#back-to-top');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;

    nav.classList.toggle('is-scrolled', y > 30);
    if (backToTop) backToTop.classList.toggle('is-visible', y > 600);

    // Scrollspy: highlight the section currently in view.
    var sections = $all('section[id]');
    var link = null;
    for (var i = 0; i < sections.length; i++) {
      var s = sections[i];
      if (y >= s.offsetTop - nav.offsetHeight - 90) link = s.id;
    }
    if (link) {
      $all('.nav-link').forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + link);
      });
    }
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () { onScroll(); ticking = false; });
    }
  }, { passive: true });

  /* Mobile menu */
  var navToggle = $('#nav-toggle');
  var navLinks = $('#nav-links');

  function setMenu(open) {
    navLinks.classList.toggle('is-open', open);
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      setMenu(!navLinks.classList.contains('is-open'));
    });
    $all('#nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  }

  /* --------------------------------------------------------- scroll reveal */
  function initReveal() {
    var items = $all('.reveal');
    if (prefersReduced) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    // Stagger siblings slightly for a cascading reveal.
    items.forEach(function (el) {
      var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.setProperty('--d', (idx % 4) * 0.09 + 's');
      io.observe(el);
    });
  }

  /* ---------------------------------------------------------- count-up  */
  function animateCount(el, target, suffix, duration) {
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      var value = Math.round(target * eased);
      el.textContent = value.toLocaleString('en-US') + (suffix || '');
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('en-US') + (suffix || '');
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    var stats = $all('.stat-value');
    if (!stats.length) return;
    if (!('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);

        if (prefersReduced) {
          el.textContent = Number(el.getAttribute('data-count')).toLocaleString('en-US') + (el.getAttribute('data-suffix') || '');
          return;
        }
        animateCount(el, Number(el.getAttribute('data-count')), el.getAttribute('data-suffix') || '', 1900);
      });
    }, { threshold: 0.4 });

    stats.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------- hero floating parallax */
  function initHeroParallax() {
    if (!finePointer || prefersReduced) return;
    var cards = $all('.float-card');
    if (!cards.length) return;

    var hero = $('#hero');
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var nx = (e.clientX - r.left) / r.width - 0.5;   // -0.5..0.5
      var ny = (e.clientY - r.top) / r.height - 0.5;

      cards.forEach(function (card, i) {
        var depth = 14 + i * 8;
        card.style.setProperty('--px', (nx * depth).toFixed(1) + 'px');
        card.style.setProperty('--py', (ny * depth).toFixed(1) + 'px');
      });
    });
  }

  /* ----------------------------------------------------------- carousel  */
  function initCarousel() {
    var track = $('#carousel-track');
    var dotsWrap = $('#carousel-dots');
    var prev = $('#carousel-prev');
    var next = $('#carousel-next');
    if (!track || !dotsWrap) return;

    var slides = $all('.t-card', track);
    var index = 0;
    var timer = null;
    var touchX = null;
    var count = slides.length;

    // Build dots.
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); restart(); });
      dotsWrap.appendChild(dot);
    });

    function goTo(i) {
      index = (i + count) % count;
      track.style.transform = 'translateX(-' + index * 100 + '%)';
      $all('.carousel-dot', dotsWrap).forEach(function (d, k) {
        d.classList.toggle('is-active', k === index);
      });
      // Keep inactive slides out of the accessibility tree.
      slides.forEach(function (s, k) {
        s.setAttribute('aria-hidden', k === index ? 'false' : 'true');
      });
    }

    function restart() {
      stop();
      if (!prefersReduced) timer = setInterval(function () { goTo(index + 1); }, 5600);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    if (prev) prev.addEventListener('click', function () { goTo(index - 1); restart(); });
    if (next) next.addEventListener('click', function () { goTo(index + 1); restart(); });

    // Pause on hover / focus, resume on leave.
    var viewport = $('#carousel-viewport');
    viewport.addEventListener('mouseenter', stop);
    viewport.addEventListener('mouseleave', restart);
    viewport.addEventListener('focusin', stop);
    viewport.addEventListener('focusout', restart);

    // Swipe support.
    viewport.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    viewport.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 48) {
        goTo(index + (dx < 0 ? 1 : -1));
        restart();
      }
      touchX = null;
    }, { passive: true });

    goTo(0);   // set initial transform + aria-hidden state
    restart();
  }

  /* -------------------------------------------------------------- forms  */
  function initContactForm() {
    var form = $('#contact-form');
    if (!form) return;
    var note = $('#form-note');

    function setInvalid(input, invalid) {
      input.classList.toggle('is-invalid', invalid);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.elements.name;
      var email = form.elements.email;
      var message = form.elements.message;
      var ok = true;

      setInvalid(name, !name.value.trim());
      setInvalid(email, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
      setInvalid(message, !message.value.trim());
      if (!name.value.trim() || !message.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        ok = false;
      }

      if (!ok) {
        note.textContent = 'Please fill in the required fields correctly.';
        note.classList.add('is-error');
        return;
      }

      note.classList.remove('is-error');
      note.textContent = '';
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending…';

      // Simulated submission — swap in a real endpoint (fetch/FormData) here.
      setTimeout(function () {
        btn.disabled = false;
        btn.innerHTML = 'Send Message <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/></svg>';
        form.reset();
        note.textContent = 'Message sent! We will get back to you within 24 hours.';
        toast('Message sent — we reply within 24 hours.', '📨');
      }, 900);
    });

    ['name', 'email', 'message'].forEach(function (key) {
      var input = form.elements[key];
      input.addEventListener('input', function () { setInvalid(input, false); });
    });
  }

  function initNewsletter() {
    var form = $('#news-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.elements['news-email'];
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.classList.add('is-invalid');
        return;
      }
      email.classList.remove('is-invalid');
      form.reset();
      toast('Subscribed! Watch your inbox for AI insights.', '📬');
    });

    var input = form.elements['news-email'];
    input.addEventListener('input', function () { input.classList.remove('is-invalid'); });
  }

  /* ------------------------------------------------------ enroll buttons */
  function initEnroll() {
    $all('.enroll-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        toast(btn.getAttribute('data-course') + ' — enrollment opened. See you in class!', '🎓');
      });
    });
  }

  /* ---------------------------------------------------------------- boot  */
  function init() {
    $('#year').textContent = String(new Date().getFullYear());

    initMagnetic();
    initReveal();
    initCounters();
    initHeroParallax();
    initCarousel();
    initContactForm();
    initNewsletter();
    initEnroll();
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
