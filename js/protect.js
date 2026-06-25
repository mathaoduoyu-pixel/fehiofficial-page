/* ══════════════════════════════
   FEHI OFFICIAL — protect.js
   Asset & content protection
══════════════════════════════ */

(function () {
  'use strict';

  // ── Disable right-click on images ──
  document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('contextmenu', (e) => e.preventDefault());
    img.setAttribute('draggable', 'false');
    img.ondragstart = () => false;
  });

  // ── Disable right-click globally on .no-copy elements ──
  document.querySelectorAll('.no-copy').forEach((el) => {
    el.addEventListener('contextmenu', (e) => e.preventDefault());
    el.addEventListener('selectstart', (e) => e.preventDefault());
    el.addEventListener('copy', (e) => e.preventDefault());
  });

  // ── Disable drag on all images (observer for dynamic) ──
  const imgObserver = new MutationObserver(() => {
    document.querySelectorAll('img:not([draggable="false"])').forEach((img) => {
      img.setAttribute('draggable', 'false');
      img.addEventListener('contextmenu', (e) => e.preventDefault());
      img.ondragstart = () => false;
    });
  });
  imgObserver.observe(document.body, { childList: true, subtree: true });

  // ── Block common devtools keyboard shortcuts ──
  document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U (view source)
    if (e.ctrlKey && e.key.toUpperCase() === 'U') {
      e.preventDefault();
      return false;
    }
    // Ctrl+S (save)
    if (e.ctrlKey && e.key.toUpperCase() === 'S') {
      e.preventDefault();
      return false;
    }
  });

  // ── Disable global context menu on the page ──
  // (allow on text inputs so UX not broken)
  document.addEventListener('contextmenu', (e) => {
    const tag = e.target.tagName.toLowerCase();
    if (!['input', 'textarea'].includes(tag)) {
      e.preventDefault();
    }
  });

})();
