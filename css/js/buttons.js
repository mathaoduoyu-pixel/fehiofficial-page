/* ══════════════════════════════════════
   LINKTREE BUTTONS
   Build DOM awal sebelum transisi mulai,
   supaya sudah siap saat main muncul
══════════════════════════════════════ */

const BUTTONS = [
  {
    label: "WEBSITE",
    desc:  "mathaoduoyu.my.id — Info lengkap bot & fitur",
    icon:  "https://raw.githubusercontent.com/mathaoduoyu-pixel/Menu-bot/main/foto%20website%20%5BF04EE82%5D.png",
    url:   "https://mathaoduoyu.my.id/"
  },
  {
    label: "TIKTOK",
    desc:  "@mathaoduoyu — Follow buat konten bot terbaru",
    icon:  "https://raw.githubusercontent.com/mathaoduoyu-pixel/Menu-bot/main/foto%20tiktok%20%5B6080D33%5D.png",
    url:   "https://www.tiktok.com/@mathaoduoyu?_r=1&_t=ZS-96yvwSPXtXc"
  },
  {
    label: "INSTAGRAM",
    desc:  "@mathaoduoyu — Follow Instagram kami",
    icon:  "https://raw.githubusercontent.com/mathaoduoyu-pixel/Menu-bot/main/foto%20ig%20%5B02A3D80%5D.png",
    url:   "https://www.instagram.com/mathaoduoyu?igsh=YTY1ZnUyOTFsczY="
  },
  {
    label: "CHANNEL WA",
    desc:  "Ikuti channel untuk info & update bot terbaru",
    icon:  "https://raw.githubusercontent.com/mathaoduoyu-pixel/Menu-bot/main/foto%20channel%20%5B202579D%5D.png",
    url:   "https://whatsapp.com/channel/0029VbCUKCCLI8Ybg4kXPu1F"
  },
  {
    label: "GRUP WA",
    desc:  "Join grup untuk akses & diskusi bareng",
    icon:  "https://raw.githubusercontent.com/mathaoduoyu-pixel/Menu-bot/main/foto%20grup%20wa%20%5BB7A4A42%5D.png",
    url:   "https://chat.whatsapp.com/IFsI0khJT4U5m7kmLZ9TJr"
  }
];

(function buildButtons() {
  const container = document.getElementById('buttons');
  if (!container) return;

  BUTTONS.forEach((btn) => {
    const a = document.createElement('a');
    a.href   = btn.url;
    a.target = '_blank';
    a.rel    = 'noopener noreferrer';
    a.className = 'link-btn';
    a.innerHTML = `
      <img
        class="btn-icon"
        src="${btn.icon}"
        alt="${btn.label}"
        onerror="this.src='https://placehold.co/44x44/111/fff?text=M'"
      />
      <div class="btn-text">
        <span class="btn-label">${btn.label}</span>
        <span class="btn-desc">${btn.desc}</span>
      </div>
      <span class="btn-arrow">→</span>
    `;
    container.appendChild(a);
  });
})();
