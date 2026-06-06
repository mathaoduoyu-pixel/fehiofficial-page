/* ══════════════════════════════════════
   TRANSITION ORCHESTRATOR
   Satu halaman bergeser — bukan pindah.

   Timeline yang disengaja:
   ─────────────────────────────────────
   0ms       → CSS bar mulai fill (delay 1.7s, durasi 2.2s → selesai ~3.9s)
   4200ms    → intro mulai slide UP (lambat, 1.6s)
   4700ms    → main mulai naik dari bawah (overlap 500ms = terasa menyatu)
   5200ms    → profile reveal (setelah main setengah jalan)
   5400ms+   → tombol stagger masuk satu-satu
   ─────────────────────────────────────
   Gap antara intro-out & main-in sengaja pendek (500ms) supaya
   keduanya terasa satu gerakan kontinu, bukan dua animasi terpisah.
══════════════════════════════════════ */

(function initTransition() {

  /* ── REFS ── */
  const intro   = document.getElementById('intro');
  const main    = document.getElementById('main');
  const profile = document.querySelector('.profile-section');

  /* ── TIMING (ms) ── */
  const LOADING_WAIT   = 4200;   // tunggu bar loading selesai
  const MAIN_OFFSET    = 500;    // main mulai muncul 500ms setelah intro geser
  const PROFILE_OFFSET = 500;    // profile reveal setelah main mulai
  const BTN_START      = 700;    // mulai stagger tombol setelah main
  const BTN_INTERVAL   = 120;    // jeda antar tombol

  /* ── STEP 1: Intro slide up ── */
  setTimeout(() => {
    intro.classList.add('slide-out');

    /* ── STEP 2: Main rises from below (overlap dengan intro) ── */
    setTimeout(() => {
      main.classList.add('visible');

      /* ── STEP 3: Profile reveal ── */
      setTimeout(() => {
        if (profile) profile.classList.add('revealed');
      }, PROFILE_OFFSET);

      /* ── STEP 4: Buttons stagger in ── */
      const btns = document.querySelectorAll('.link-btn');
      btns.forEach((btn, i) => {
        setTimeout(() => {
          btn.classList.add('revealed');
        }, BTN_START + i * BTN_INTERVAL);
      });

    }, MAIN_OFFSET);

  }, LOADING_WAIT);

})();
