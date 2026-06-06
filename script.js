/* ══════════════════════════════════════
   PARTICLE + LINE ANIMATION
   Canvas is persistent — shared across
   both intro and main screens
══════════════════════════════════════ */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let W, H;
const PARTICLE_COUNT = 90;
const LINE_DIST = 130;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const COLORS = ['#4ade80', '#22d3ee', '#a855f7', '#facc15'];

function rand(min, max) { return Math.random() * (max - min) + min; }

function createParticle() {
  return {
    x: rand(0, W),
    y: rand(0, H),
    vx: rand(-0.6, 0.6),
    vy: rand(-0.6, 0.6),
    r: rand(1.2, 2.5),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: rand(0.3, 0.9)
  };
}

const particles = Array.from({ length: PARTICLE_COUNT }, createParticle);

function drawFrame() {
  ctx.clearRect(0, 0, W, H);

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

  ctx.globalAlpha = 1;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
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
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
}

// Particle loop runs forever — canvas never stops
(function loop() {
  drawFrame();
  requestAnimationFrame(loop);
})();

/* ══════════════════════════════════════
   LINKTREE BUTTONS (build DOM early)
══════════════════════════════════════ */
const BUTTONS = [
  {
    label: "WEBSITE",
    desc: "mathaoduoyu.my.id — Info lengkap bot & fitur",
    icon: "https://raw.githubusercontent.com/mathaoduoyu-pixel/Menu-bot/main/foto%20website%20%5BF04EE82%5D.png",
    url: "https://mathaoduoyu.my.id/"
  },
  {
    label: "TIKTOK",
    desc: "@mathaoduoyu — Follow buat konten bot terbaru",
    icon: "https://raw.githubusercontent.com/mathaoduoyu-pixel/Menu-bot/main/foto%20tiktok%20%5B6080D33%5D.png",
    url: "https://www.tiktok.com/@mathaoduoyu?_r=1&_t=ZS-96yvwSPXtXc"
  },
  {
    label: "INSTAGRAM",
    desc: "@mathaoduoyu — Follow Instagram kami",
    icon: "https://raw.githubusercontent.com/mathaoduoyu-pixel/Menu-bot/main/foto%20ig%20%5B02A3D80%5D.png",
    url: "https://www.instagram.com/mathaoduoyu?igsh=YTY1ZnUyOTFsczY="
  },
  {
    label: "CHANNEL WA",
    desc: "Ikuti channel untuk info & update bot terbaru",
    icon: "https://raw.githubusercontent.com/mathaoduoyu-pixel/Menu-bot/main/foto%20channel%20%5B202579D%5D.png",
    url: "https://whatsapp.com/channel/0029VbCUKCCLI8Ybg4kXPu1F"
  },
  {
    label: "GRUP WA",
    desc: "Join grup untuk akses & diskusi bareng",
    icon: "https://raw.githubusercontent.com/mathaoduoyu-pixel/Menu-bot/main/foto%20grup%20wa%20%5BB7A4A42%5D.png",
    url: "https://chat.whatsapp.com/IFsI0khJT4U5m7kmLZ9TJr"
  }
];

const btnContainer = document.getElementById("buttons");
BUTTONS.forEach((btn) => {
  const a = document.createElement("a");
  a.href = btn.url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.className = "link-btn";
  a.innerHTML = `
    <img class="btn-icon"
      src="${btn.icon}"
      alt="${btn.label}"
      onerror="this.src='https://placehold.co/44x44/111/fff?text=M'"/>
    <div class="btn-text">
      <span class="btn-label">${btn.label}</span>
      <span class="btn-desc">${btn.desc}</span>
    </div>
    <span class="btn-arrow">→</span>
  `;
  btnContainer.appendChild(a);
});

/* ══════════════════════════════════════
   TRANSITION
   Timeline:
   0ms      → bar starts filling (CSS: 1.6s delay, 2s duration = done at 3.6s)
   3800ms   → intro slides UP (translateY -110%)
   4300ms   → main slides UP from below (translateY 0), 500ms gap = clean overlap
   4500ms+  → buttons stagger in
══════════════════════════════════════ */
const INTRO_DURATION = 3800;

setTimeout(() => {
  const intro = document.getElementById('intro');
  const main  = document.getElementById('main');

  // Step 1: Slide intro UP smoothly
  intro.classList.add('slide-out');

  // Step 2: After 300ms (mid-slide), fade+slide main in from slight offset
  // Feels like one continuous page shift, not two separate moves
  setTimeout(() => {
    main.classList.add('visible');

    // Step 3: Stagger buttons — start after main is mostly settled (~700ms into its transition)
    const btns = document.querySelectorAll('.link-btn');
    btns.forEach((btn, i) => {
      setTimeout(() => btn.classList.add('appear'), 500 + i * 110);
    });
  }, 300);

}, INTRO_DURATION);
