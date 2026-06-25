/* ══════════════════════════════
   FEHI OFFICIAL — main.js
══════════════════════════════ */

// ── Scroll Reveal Dua Arah ──
// Track posisi scroll sebelumnya buat deteksi arah
let lastScrollY = window.scrollY;

const revealEls = document.querySelectorAll('.reveal');

// Set state awal semua elemen
revealEls.forEach((el) => {
  el.dataset.revealed = 'false';
});

function getScrollDir() {
  const dir = window.scrollY >= lastScrollY ? 'down' : 'up';
  lastScrollY = window.scrollY;
  return dir;
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    const dir = getScrollDir();

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Masuk viewport
        entry.target.classList.remove('reveal-exit-up', 'reveal-exit-down');
        entry.target.classList.add('visible');
        entry.target.dataset.revealed = 'true';
      } else {
        // Keluar viewport — animasi keluar sesuai arah scroll
        const wasRevealed = entry.target.dataset.revealed === 'true';
        if (wasRevealed) {
          entry.target.classList.remove('visible');
          if (dir === 'down') {
            // Scroll down → elemen keluar ke atas
            entry.target.classList.add('reveal-exit-up');
          } else {
            // Scroll up → elemen keluar ke bawah
            entry.target.classList.add('reveal-exit-down');
          }
        }
        entry.target.dataset.revealed = 'false';
      }
    });
  },
  {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px',
  }
);

revealEls.forEach((el) => revealObserver.observe(el));


// ── Stagger children inside reveal groups ──
const staggerParents = document.querySelectorAll('.feat-grid, .steps, .link-stack, .about-stats');

staggerParents.forEach((parent) => {
  const children = parent.children;
  Array.from(children).forEach((child, i) => {
    child.classList.add('reveal');
    child.dataset.revealed = 'false';
    child.style.transitionDelay = `${i * 80}ms`;
    revealObserver.observe(child);
  });
});


// ── Smooth anchor scroll (offset by fixed navbar height) ──
const NAVBAR_HEIGHT = 58;

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const targetY = target.getBoundingClientRect().top + window.pageYOffset - NAVBAR_HEIGHT;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  });
});

// ── Gallery tidak bisa di-klik/pause ──
// pointer-events: none sudah di CSS, handled there

// ── Loading Screen ──
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1700);
});

// ── FAB Gabung + Back to Top visibility ──
const fabJoin   = document.getElementById('fabJoin');
const backToTop = document.getElementById('backToTop');
const SHOW_AFTER = 300; // px scroll

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > SHOW_AFTER;
  fabJoin.classList.toggle('visible', scrolled);
  backToTop.classList.toggle('visible', scrolled);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Ripple Effect ──
document.addEventListener('click', (e) => {
  const SIZE = 160;
  const ripple = document.createElement('div');
  ripple.className = 'ripple-circle';
  ripple.style.cssText = `
    width: ${SIZE}px;
    height: ${SIZE}px;
    top: ${e.clientY - SIZE / 2}px;
    left: ${e.clientX - SIZE / 2}px;
  `;
  document.body.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
});

// Touch juga (mobile)
document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  const SIZE = 160;
  const ripple = document.createElement('div');
  ripple.className = 'ripple-circle';
  ripple.style.cssText = `
    width: ${SIZE}px;
    height: ${SIZE}px;
    top: ${touch.clientY - SIZE / 2}px;
    left: ${touch.clientX - SIZE / 2}px;
  `;
  document.body.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}, { passive: true });
