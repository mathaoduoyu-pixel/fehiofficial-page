/* ══════════════════════════════════════════
   FEHI OFFICIAL — ripple.js
══════════════════════════════════════════ */

(function () {
  const DURATION   = 480;
  const MAX_RADIUS = 40;
  const LINE_WIDTH = 3.5;

  // Warna bergantian tiap klik
  const COLORS = [
    { ring: 'rgba(7, 196, 174, ALPHA)',  halo: 'rgba(5, 166, 148, ALPHA)' },  // teal
    { ring: 'rgba(232, 168, 106, ALPHA)', halo: 'rgba(250, 216, 179, ALPHA)' }, // cream/peach
  ];
  let colorIndex = 0;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position:      'fixed',
    inset:         '0',
    zIndex:        '2147483647',
    pointerEvents: 'none',
    touchAction:   'none',
    userSelect:    'none',
  });
  document.body.appendChild(canvas);

  const rings = [];
  let rafId   = 0;
  let running = false;
  const dedup = { x: -9999, y: -9999, t: 0 };

  function sync() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  sync();
  const ro = new ResizeObserver(sync);
  ro.observe(document.documentElement);

  function colorStr(template, alpha) {
    return template.replace('ALPHA', alpha.toFixed(3));
  }

  function tick(now) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = rings.length - 1; i >= 0; i--) {
      const r = rings[i];
      const elapsed = now - r.startTime;
      if (elapsed >= DURATION) { rings.splice(i, 1); continue; }

      const p    = elapsed / DURATION;
      const ease = 1 - Math.pow(1 - p, 3);
      const rad  = 6 + ease * (MAX_RADIUS - 6);
      const fade = Math.max(0, 1 - Math.pow(p, 1.8));

      const c = r.color;

      // Halo tipis
      ctx.beginPath();
      ctx.arc(r.x, r.y, rad, 0, Math.PI * 2);
      ctx.strokeStyle = colorStr(c.halo, fade * 0.12);
      ctx.lineWidth   = LINE_WIDTH * 3;
      ctx.stroke();

      // Primary ring
      ctx.beginPath();
      ctx.arc(r.x, r.y, rad, 0, Math.PI * 2);
      ctx.strokeStyle = colorStr(c.ring, fade * 0.8);
      ctx.lineWidth   = LINE_WIDTH;
      ctx.shadowColor = colorStr(c.halo, fade * 0.5);
      ctx.shadowBlur  = 4;
      ctx.stroke();
      ctx.shadowBlur  = 0;
    }

    if (rings.length > 0) {
      rafId = requestAnimationFrame(tick);
    } else {
      running = false;
    }
  }

  function startLoop() {
    if (running) return;
    running = true;
    rafId = requestAnimationFrame(tick);
  }

  function spawn(x, y) {
    const now = performance.now();
    if (Math.abs(x - dedup.x) < 10 && Math.abs(y - dedup.y) < 10 && now - dedup.t < 80) return;
    dedup.x = x; dedup.y = y; dedup.t = now;

    // Ambil warna sekarang lalu toggle
    const color = COLORS[colorIndex % 2];
    colorIndex++;

    rings.push({ x, y, startTime: now, color });
    if (rings.length > 12) rings.shift();
    startLoop();
  }

  window.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    spawn(e.clientX, e.clientY);
  }, { passive: true, capture: true });

  window.addEventListener('touchstart', function (e) {
    for (let i = 0; i < e.changedTouches.length; i++) {
      spawn(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
    }
  }, { passive: true, capture: true });
})();
