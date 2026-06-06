// app.js

window.currentSettings = Object.assign({}, window.DEFAULT_SETTINGS);

function applySettings(s) {
  const root = document.documentElement;
  root.style.setProperty("--accent", s.accentColor);
  root.style.setProperty("--font-main", s.font + ", sans-serif");
  document.body.style.fontFamily = s.font + ", sans-serif";

  const container = document.getElementById("app");
  if (container) {
    container.style.paddingTop = s.paddingTop + "px";
    container.style.maxWidth   = s.maxWidth + "px";
  }

  const avatar = document.querySelector(".avatar");
  if (avatar) {
    avatar.style.width        = s.avatarSize + "px";
    avatar.style.height       = s.avatarSize + "px";
    avatar.style.borderRadius = s.avatarRadius + "px";
  }
  const ring = document.querySelector(".avatar-ring");
  if (ring) {
    ring.style.width        = (s.avatarSize + 12) + "px";
    ring.style.height       = (s.avatarSize + 12) + "px";
    ring.style.borderRadius = (s.avatarRadius + 4) + "px";
  }

  const nameEl = document.querySelector(".profile-name span:first-child");
  if (nameEl) nameEl.style.fontSize = s.nameSize + "px";

  const bioEl = document.querySelector(".profile-bio");
  if (bioEl) bioEl.style.fontSize = s.bioSize + "px";

  window.renderButtons(s);
}

window.applySettings = applySettings;

document.addEventListener("DOMContentLoaded", () => {
  const p = window.PROFILE;
  document.querySelector(".bg-image").style.backgroundImage = `url('${p.background}')`;
  applySettings(window.currentSettings);
});
