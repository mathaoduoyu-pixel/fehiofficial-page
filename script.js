/* ══════════════════════════════════════
   PARTICLE + LINE ANIMATION (INTRO)
══════════════════════════════════════ */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let W, H, particles, lines;
const PARTICLE_COUNT = 90;
const LINE_DIST = 130;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Accent colors
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

particles = Array.from({ length: PARTICLE_COUNT }, createParticle);

function drawFrame() {
  ctx.clearRect(0, 0, W, H);

  // Update + draw particles
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;

    // wrap around
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

  // Draw connecting lines
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
        // gradient line between two particle colors
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

let introRaf;
function introLoop() {
  drawFrame();
  introRaf = requestAnimationFrame(introLoop);
}
introLoop();

/* ══════════════════════════════════════
   INTRO → MAIN TRANSITION
   Total intro: ~4s
   bar fills 1.6s→3.6s, then slide out
══════════════════════════════════════ */
const INTRO_DURATION = 3800; // ms sebelum slide out

setTimeout(() => {
  const intro = document.getElementById('intro');
  const main  = document.getElementById('main');

  // Slide intro up, fade main in
  intro.classList.add('slide-out');
  main.classList.remove('hidden');
  // small delay so repaint happens first
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      main.classList.add('visible');
    });
  });

  // Stop particle loop after transition done
  setTimeout(() => cancelAnimationFrame(introRaf), 1200);

  // Stagger button entrance
  const btns = document.querySelectorAll('.link-btn');
  btns.forEach((btn, i) => {
    setTimeout(() => btn.classList.add('appear'), 300 + i * 90);
  });

}, INTRO_DURATION);

/* ══════════════════════════════════════
   LINKTREE BUTTONS
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

const container = document.getElementById("buttons");
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
  container.appendChild(a);
});
