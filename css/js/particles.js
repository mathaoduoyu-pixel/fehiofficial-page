/* ══════════════════════════════════════
   PARTICLE + LINE ANIMATION
   Canvas persistent — jalan terus di
   kedua screen (intro & main)
══════════════════════════════════════ */

(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');

  let W, H;
  const PARTICLE_COUNT = 90;
  const LINE_DIST      = 130;
  const COLORS         = ['#4ade80', '#22d3ee', '#a855f7', '#facc15'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function createParticle() {
    return {
      x:     rand(0, W),
      y:     rand(0, H),
      vx:    rand(-0.6, 0.6),
      vy:    rand(-0.6, 0.6),
      r:     rand(1.2, 2.5),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: rand(0.3, 0.9)
    };
  }

  const particles = Array.from({ length: PARTICLE_COUNT }, createParticle);

  function drawFrame() {
    ctx.clearRect(0, 0, W, H);

    // Draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    }

    // Draw connection lines
    ctx.globalAlpha = 1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINE_DIST) {
          const alpha = (1 - dist / LINE_DIST) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const grad = ctx.createLinearGradient(
            particles[i].x, particles[i].y,
            particles[j].x, particles[j].y
          );
          grad.addColorStop(0, particles[i].color);
          grad.addColorStop(1, particles[j].color);
          ctx.strokeStyle = grad;
          ctx.globalAlpha = alpha;
          ctx.lineWidth   = 0.8;
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  // Loop selamanya — canvas tidak pernah berhenti
  (function loop() {
    drawFrame();
    requestAnimationFrame(loop);
  })();
})();
