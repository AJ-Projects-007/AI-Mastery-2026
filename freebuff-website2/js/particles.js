/* ==========================================================================
   NOVA AI ACADEMY — particles.js
   Twin-galaxy particle universe.

   Two invisible gravity points continuously emit glowing particles that
   spiral outward in expanding elliptical orbits — twin galaxies forming and
   dissolving in deep space. Soft trails via translucent frame fading,
   additive blending, pre-rendered glow sprites for 60fps performance, and a
   subtle mouse field that bends nearby particles.
   ========================================================================== */
(function () {
  'use strict';

  var canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d', { alpha: false });

  /* ---------------------------------------------------------------- config */
  var BG = '#030712';
  var SPRITE_RGB = {
    white: '255,255,255',
    blue: '79,157,255',
    light: '124,200,255',
    steel: '154,166,184'
  };
  var MOUSE_RADIUS = 170;        // bend radius around the pointer
  var TRAIL_ALPHA = 0.16;        // fade amount per frame (gentle trails)
  var CYCLE = 16;                // seconds for one form/dissolve cycle
  var MAX_DT = 0.05;             // clamp to avoid jumps after tab switches

  /* ---------------------------------------------------------------- state */
  var W = 0, H = 0, DPR = 1;
  var galaxies = [];
  var particles = [];
  var free = [];
  var stars = [];
  var sprites = {};
  var mouse = { x: -9999, y: -9999 };
  var rafId = null;
  var lastTime = 0;
  var targetCount = 800;
  var reduceMotion = false;
  var started = false;

  /* ------------------------------------------------------------ sprites  */
  /* Pre-rendered radial-gradient glow sprites — much faster than shadowBlur. */
  function makeSprite(rgb) {
    var s = 64;
    var c = document.createElement('canvas');
    c.width = c.height = s;
    var g = c.getContext('2d');
    var grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    grad.addColorStop(0, 'rgba(' + rgb + ',1)');
    grad.addColorStop(0.22, 'rgba(' + rgb + ',0.55)');
    grad.addColorStop(0.55, 'rgba(' + rgb + ',0.14)');
    grad.addColorStop(1, 'rgba(' + rgb + ',0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
    return c;
  }

  /* ------------------------------------------------------------ particle */
  function makeParticle() {
    return {
      active: false,
      gi: 0,            // galaxy index
      angle: 0,
      radius: 0,
      growth: 0,        // radial expansion speed
      spin: 0,          // angular velocity
      ell: 1,           // ellipse stretch (1..2)
      life: 0,
      lifeRate: 0,
      size: 0,
      sprite: null,
      ox: 0, oy: 0      // mouse-bend offsets
    };
  }

  function initParticle(p, gi) {
    var g = galaxies[gi];
    p.gi = gi;
    p.angle = Math.random() * Math.PI * 2;
    p.radius = 4 + Math.random() * 14;
    p.growth = 12 + Math.random() * 22;             // px per second
    p.spin = (0.12 + Math.random() * 0.5) * (Math.random() < 0.5 ? -1 : 1);
    p.ell = 1 + Math.random() * 0.9;
    p.life = 0;
    p.lifeRate = 0.05 + Math.random() * 0.09;       // full life in ~8–20s
    p.size = 0.5 + Math.random() * 1.1;
    p.sprite = g.sprites[Math.random() < 0.72 ? g.primary : g.secondary];
    p.ox = 0;
    p.oy = 0;
    p.active = true;
  }

  function spawn(gi) {
    if (!free.length) return;
    var p = free.pop();
    initParticle(p, gi);
    particles.push(p);
  }

  function kill(i) {
    var p = particles[i];
    particles[i] = particles[particles.length - 1];
    particles.pop();
    p.active = false;
    free.push(p);
  }

  /* ------------------------------------------------------------ galaxies */
  function layoutGalaxies() {
    if (W < 720) {
      galaxies[0].baseX = W * 0.40;
      galaxies[0].baseY = H * 0.30;
      galaxies[1].baseX = W * 0.58;
      galaxies[1].baseY = H * 0.66;
    } else {
      galaxies[0].baseX = W * 0.32;
      galaxies[0].baseY = H * 0.40;
      galaxies[1].baseX = W * 0.68;
      galaxies[1].baseY = H * 0.40;
    }
    galaxies[0].x = galaxies[0].baseX;
    galaxies[0].y = galaxies[0].baseY;
    galaxies[1].x = galaxies[1].baseX;
    galaxies[1].y = galaxies[1].baseY;
  }

  function setupGalaxies() {
    var palettes = [
      { primary: 'light', secondary: 'white' },   // electric-blue galaxy
      { primary: 'steel', secondary: 'white' }    // steel-gray galaxy
    ];
    for (var i = 0; i < 2; i++) {
      galaxies.push({
        baseX: 0, baseY: 0, x: 0, y: 0,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() < 0.5 ? -1 : 1) * 0.045,   // rad/s, slow
        phase: i * Math.PI,                              // out of phase
        primary: palettes[i].primary,
        secondary: palettes[i].secondary,
        sprites: [sprites[palettes[i].primary], sprites[palettes[i].secondary]]
      });
    }
    layoutGalaxies();
  }

  /* Galaxy intensity: smooth 0.45→1 pulse ("forming and dissolving"). */
  function pulse(t, phase) {
    return 0.72 + 0.28 * Math.sin(t * (Math.PI * 2 / CYCLE) + phase);
  }

  /* --------------------------------------------------------------- stars */
  function setupStars() {
    var n = Math.round((W * H) / 16000);
    stars = [];
    for (var i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        size: 0.3 + Math.random() * 0.8,
        tw: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.2
      });
    }
  }

  /* -------------------------------------------------------------- sizing */
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    // Density scaling — thousands of particles on big screens, fewer on small.
    if (W >= 1440) targetCount = 1600;
    else if (W >= 900) targetCount = 1200;
    else if (W >= 560) targetCount = 850;
    else targetCount = 600;

    layoutGalaxies();
    setupStars();
  }

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  /* ---------------------------------------------------------------- mouse */
  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('touchmove', function (e) {
    if (e.touches && e.touches[0]) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });
  window.addEventListener('mouseout', function (e) {
    if (!e.relatedTarget) { mouse.x = -9999; mouse.y = -9999; }
  });

  /* ------------------------------------------------------------- helpers */
  function ellipsePoint(p, g) {
    var cosR = Math.cos(g.rot);
    var sinR = Math.sin(g.rot);
    var lx = Math.cos(p.angle) * p.radius * p.ell;
    var ly = Math.sin(p.angle) * p.radius * (2 - p.ell);
    return {
      x: g.x + lx * cosR - ly * sinR + p.ox,
      y: g.y + lx * sinR + ly * cosR + p.oy
    };
  }

  function drawParticle(p, g, t) {
    var pt = ellipsePoint(p, g);
    var fadeIn = Math.min(1, p.life / 0.15);
    var fadeOut = Math.min(1, (1 - p.life) / 0.3);
    var alpha = fadeIn * fadeOut * pulse(t, g.phase) * 0.9;
    if (alpha <= 0.012) return;

    var s = p.size * 7;
    ctx.globalAlpha = alpha;
    ctx.drawImage(p.sprite, pt.x - s, pt.y - s, s * 2, s * 2);
  }

  /* ---------------------------------------------------------------- loop */
  function update(dt, t) {
    var i, p, g, dx, dy, d2, d, f, decay = Math.exp(-2.4 * dt);

    // Drift galaxy centers slowly, bounce off the edges.
    for (i = 0; i < galaxies.length; i++) {
      g = galaxies[i];
      g.x += g.vx * dt;
      g.y += g.vy * dt;
      if (g.x < 40 || g.x > W - 40) g.vx *= -1;
      if (g.y < 40 || g.y > H - 40) g.vy *= -1;
      g.x = Math.max(24, Math.min(W - 24, g.x));
      g.y = Math.max(24, Math.min(H - 24, g.y));
      g.rot += g.spin * dt;
    }

    // Mouse bend: push nearby particles away from the pointer, gently.
    var R2 = MOUSE_RADIUS * MOUSE_RADIUS;
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      g = galaxies[p.gi];
      var pt = ellipsePoint(p, g);
      dx = pt.x - mouse.x;
      dy = pt.y - mouse.y;
      d2 = dx * dx + dy * dy;
      if (d2 < R2 && d2 > 4) {
        d = Math.sqrt(d2);
        f = (1 - d / MOUSE_RADIUS) * 26 * dt;
        p.ox += (dx / d) * f;
        p.oy += (dy / d) * f;
      }
      p.ox *= decay;
      p.oy *= decay;

      // Orbit + expansion + age.
      p.angle += p.spin * dt * (30 / (p.radius + 26));   // faster near core
      p.radius += p.growth * dt;
      p.life += p.lifeRate * dt;
      if (p.life >= 1) kill(i);
    }

    // Keep the galaxy population fed — bias emission toward the more active galaxy.
    var alive = particles.length;
    var w0 = pulse(t, galaxies[0].phase);
    var w1 = pulse(t, galaxies[1].phase);
    var need = targetCount * ((w0 + w1) / 2);
    var shortage = need - alive;
    if (shortage > 0) {
      var want = Math.ceil(shortage * 1.6 * dt) + (shortage > 10 ? 2 : 0);
      for (i = 0; i < want && free.length; i++) {
        spawn(Math.random() < w0 / (w0 + w1) ? 0 : 1);
      }
    }
  }

  function draw(t) {
    // Trail fade — dims the previous frame (kept dark, no flashes).
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(3,7,18,' + TRAIL_ALPHA + ')';
    ctx.fillRect(0, 0, W, H);

    // Additive blending for the glow layer.
    ctx.globalCompositeOperation = 'lighter';

    // Twinkling background stars.
    for (var s = 0; s < stars.length; s++) {
      var st = stars[s];
      var a = 0.16 + 0.4 * (0.5 + 0.5 * Math.sin(t * st.speed + st.tw));
      var sz = st.size * 6;
      ctx.globalAlpha = a;
      ctx.drawImage(sprites.white, st.x - sz, st.y - sz, sz * 2, sz * 2);
    }

    // Galaxy cores.
    for (var i = 0; i < galaxies.length; i++) {
      var g = galaxies[i];
      var glow = pulse(t, g.phase);
      ctx.globalAlpha = 0.5 * glow;
      var core = 46 * (0.8 + 0.4 * glow);
      ctx.drawImage(sprites[g.primary], g.x - core, g.y - core, core * 2, core * 2);
    }

    // Particles.
    for (var k = 0; k < particles.length; k++) {
      drawParticle(particles[k], galaxies[particles[k].gi], t);
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  function frame(now) {
    if (!lastTime) lastTime = now;
    var dt = Math.min((now - lastTime) / 1000, MAX_DT);
    lastTime = now;
    var t = now / 1000;

    update(dt, t);
    draw(t);
    rafId = requestAnimationFrame(frame);
  }

  /* ---------------------------------------------------- reduced motion  */
  /* Render a single static frame instead of animating. */
  function drawStatic() {
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    for (var s = 0; s < stars.length; s++) {
      var st = stars[s];
      var sz = st.size * 6;
      ctx.globalAlpha = 0.5;
      ctx.drawImage(sprites.white, st.x - sz, st.y - sz, sz * 2, sz * 2);
    }
    for (var i = 0; i < galaxies.length; i++) {
      var g = galaxies[i];
      ctx.globalAlpha = 0.45;
      ctx.drawImage(sprites[g.primary], g.x - 46, g.y - 46, 92, 92);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  /* ---------------------------------------------------------------- boot */
  function init() {
    if (started) return;
    started = true;

    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    sprites.white = makeSprite(SPRITE_RGB.white);
    sprites.blue = makeSprite(SPRITE_RGB.blue);
    sprites.light = makeSprite(SPRITE_RGB.light);
    sprites.steel = makeSprite(SPRITE_RGB.steel);

    // Galaxies must exist before resize() (layoutGalaxies reads them).
    setupGalaxies();

    resize();

    var poolSize = Math.max(2400, targetCount + 400);
    for (var i = 0; i < poolSize; i++) free.push(makeParticle());

    if (reduceMotion) {
      drawStatic();
      return;
    }
    lastTime = 0;
    rafId = requestAnimationFrame(frame);
  }

  // The script loads at the end of <body>, so the canvas is already available.
  init();
})();
