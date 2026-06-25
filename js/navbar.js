/* ══════════════════════════════
   FEHI OFFICIAL — navbar.js
══════════════════════════════ */

const navbar   = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const burger   = document.getElementById('navBurger');
const allLinks = document.querySelectorAll('.nav-link');

// ── Scrolled state (shadow + opacity) ──
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  highlightActive();
}, { passive: true });


// ── Burger toggle ──
burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
});

// close on link click (mobile)
allLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  });
});

// close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
  }
});


// ── Active section highlight ──
const sections = document.querySelectorAll('section[id]');

function highlightActive() {
  let current = '';
  const scrollY = window.scrollY + 80;
  sections.forEach((section) => {
    if (scrollY >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });

  allLinks.forEach((link) => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href && href === `#${current}`) {
      link.classList.add('active');
    }
  });
}

highlightActive();
