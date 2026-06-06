// buttons.js — Render link buttons

function renderButtons(settings) {
  const container = document.getElementById("buttons");
  if (!container) return;

  const s = settings || window.currentSettings || window.DEFAULT_SETTINGS;

  container.innerHTML = "";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = s.buttonGap + "px";

  window.BUTTONS.forEach((btn, i) => {
    const el = document.createElement("a");
    el.href = btn.url || "#";
    el.className = "link-btn";
    el.setAttribute("data-id", btn.id);
    el.style.animationDelay = (i * 0.07) + "s";
    el.style.borderRadius = s.btnRadius + "px";
    el.style.minHeight = s.btnMinHeight + "px";

    // Background image
    el.style.setProperty("--btn-bg", `url('${btn.bg}')`);

    // Overlay opacity from settings
    const op = (s.bgOpacity || 4) / 100;
    el.style.setProperty("--btn-overlay-opacity", op);

    el.innerHTML = `
      <div class="btn-bg-img" style="background-image: url('${btn.bg}')"></div>
      <div class="btn-bg-overlay"></div>
      <img class="btn-icon" 
           src="${btn.icon}" 
           alt="${btn.label}"
           onerror="this.src='https://placehold.co/${Math.round(s.avatarSize)}x${Math.round(s.avatarSize)}/1a1a2e/fff?text=K'"
           style="width:${s.avatarSize * 0.6}px;height:${s.avatarSize * 0.6}px;border-radius:${s.avatarRadius * 0.5}px" />
      <div class="btn-text">
        <span class="btn-label" style="font-size:${s.btnTextSize}px">${btn.label}</span>
        <span class="btn-desc" style="font-size:${s.bioSize}px">${btn.desc}</span>
      </div>
      <span class="btn-arrow">→</span>
    `;

    container.appendChild(el);
  });
}

window.renderButtons = renderButtons;
