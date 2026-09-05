const ZOOM_DEFAULT = 1;
const ZOOM_MIN = 1;
const ZOOM_STEP = 0.25;
const ZOOM_MAX = 2.5;

const state = {
  view: "wall",
  lang: "en",
  tab: "all",
  seen: {},
  cleared: false,
  lbId: "",
  lbZoom: ZOOM_DEFAULT,
  mode: "check",
  deck: [],
  i: 0,
  pick: "",
  checked: false,
  firstTry: {},
  missCounts: {},
  missQueue: [],
  phase: "main",
  recapQueue: [],
  fb: null,
};

function displayTitle(item) {
  if (!item) return "";
  return state.lang === "zh" ? `${item.zh} · ${item.title}` : item.title;
}

function itemsForTab(tab) {
  const id = tab || state.tab;
  if (id === "all") return WALL_ITEMS;
  return WALL_ITEMS.filter((row) => row.tag === id);
}

function seenCount() {
  return WALL_ITEMS.filter((row) => state.seen[row.id]).length;
}

function wallStamp() {
  const need = WALL_ITEMS.length;
  const got = seenCount();
  if (state.cleared) return `<span class="stamp cleared">Cleared</span>`;
  if (got > 0) return `<span class="stamp progress">${got}/${need} opened</span>`;
  return `<span class="stamp todo">0/${need}</span>`;
}

function firstTryCorrect() {
  return Object.values(state.firstTry).filter((ok) => ok === true).length;
}

function checkStamp() {
  if (!state.deck.length) return "";
  if (state.phase === "done" && firstTryCorrect() >= state.deck.length) return `<span class="stamp cleared">Cleared</span>`;
  if (state.phase === "done") return `<span class="stamp revised">Revised</span>`;
  if (firstTryCorrect() || Object.keys(state.firstTry).length) {
    return `<span class="stamp progress">${firstTryCorrect()}/${state.deck.length} first try</span>`;
  }
  return "";
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      lang: state.lang,
      theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
      tab: state.tab,
      seen: state.seen,
      cleared: state.cleared,
      deck: state.deck,
      i: state.i,
      firstTry: state.firstTry,
      missCounts: state.missCounts,
      missQueue: state.missQueue,
      phase: state.phase,
      recapQueue: state.recapQueue,
    }));
  } catch (err) { /* file:// may block */ }
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    state.lang = data.lang === "zh" ? "zh" : "en";
    state.tab = data.tab || "all";
    state.seen = data.seen || {};
    state.cleared = Boolean(data.cleared);
    state.deck = Array.isArray(data.deck) ? data.deck : [];
    state.i = data.i || 0;
    state.firstTry = data.firstTry || {};
    state.missCounts = data.missCounts || {};
    state.missQueue = data.missQueue || [];
    state.phase = data.phase || "main";
    state.recapQueue = Array.isArray(data.recapQueue) ? data.recapQueue : [];
    if (data.theme === "dark" || data.theme === "light") applyTheme(data.theme === "dark", true);
  } catch (err) { /* ignore */ }
}

function applyTheme(dark, skipSave) {
  document.documentElement.classList.toggle("dark", dark);
  const btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.setAttribute("aria-pressed", dark ? "true" : "false");
    btn.textContent = dark ? "Light mode" : "Dark mode";
  }
  if (!skipSave) saveProgress();
}

function loadThemeFallback() {
  if (localStorage.getItem(STORAGE_KEY)) return;
  applyTheme(Boolean(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches), true);
}

function applyLang() {
  const zh = state.lang === "zh";
  document.documentElement.lang = zh ? "zh-Hant" : "en";
  const btn = document.getElementById("lang-toggle");
  if (btn) {
    btn.setAttribute("aria-pressed", zh ? "true" : "false");
    btn.textContent = zh ? "EN" : "中";
  }
}

function prefersReducedMotion() {
  return Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

let confettiFrame = 0;
function burstConfetti() {
  if (prefersReducedMotion()) return;
  const canvas = document.getElementById("confetti");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (confettiFrame) cancelAnimationFrame(confettiFrame);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.classList.add("show");
  const colors = ["#0ea5e9", "#1d4ed8", "#38bdf8", "#fbbf24", "#34d399", "#fff"];
  const pieces = Array.from({ length: 40 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * 80,
    w: 6 + Math.random() * 6,
    h: 8 + Math.random() * 8,
    vx: -3 + Math.random() * 6,
    vy: 3 + Math.random() * 5,
    rot: Math.random() * 360,
    vr: -8 + Math.random() * 16,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
  let t = 0;
  const tick = () => {
    t += 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.14;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (t < 50) confettiFrame = requestAnimationFrame(tick);
    else {
      confettiFrame = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.classList.remove("show");
    }
  };
  confettiFrame = requestAnimationFrame(tick);
}

function markSeen(id) {
  const was = state.cleared;
  state.seen[id] = true;
  if (seenCount() >= WALL_ITEMS.length && !state.cleared) {
    state.cleared = true;
    if (!was) burstConfetti();
  }
  saveProgress();
}

function show(id, opts) {
  const options = opts || {};
  state.view = id;
  if (id === "check") {
    if (options.fresh || !state.deck.length) remixCheck();
  }
  document.querySelectorAll(".view").forEach((node) => node.classList.toggle("active", node.id === id));
  document.querySelectorAll(".nav button").forEach((btn) => {
    btn.setAttribute("aria-current", btn.dataset.view === id ? "page" : "false");
  });
  if (id === "wall") renderWall();
  if (id === "check") renderCheck();
  saveProgress();
}

function buildNav() {
  const nav = document.getElementById("nav");
  nav.innerHTML = "";
  [
    { id: "wall", label: "Wall" },
    { id: "check", label: "Check yourself" },
  ].forEach((view) => {
    const btn = document.createElement("button");
    btn.textContent = view.label;
    btn.dataset.view = view.id;
    btn.addEventListener("click", () => show(view.id, view.id === "check" ? {} : undefined));
    nav.appendChild(btn);
  });
}

function renderWall() {
  const root = document.getElementById("wall");
  const list = itemsForTab(state.tab);
  const tabs = WALL_TABS.map((row) => {
    const n = itemsForTab(row.id).filter((item) => state.seen[item.id]).length;
    const need = itemsForTab(row.id).length;
    return `<button type="button" class="wall-tab${row.id === state.tab ? " on" : ""}" data-tab="${row.id}">${row.label}<span class="tab-count">${n}/${need}</span></button>`;
  }).join("");
  root.innerHTML = `
    <div class="toolbar">
      <div>
        <h2>Notes Wall</h2>
        <p class="lead">Tap a chart to open it full size. Cleared means every page has been opened — not just the tab.</p>
      </div>
      <div class="score-wrap">
        ${wallStamp()}
        <button class="btn btn-primary" data-go="check">Check yourself</button>
      </div>
    </div>
    <div class="wall-tabs">${tabs}</div>
    <div class="wall-grid">
      ${list.map((item) => `
        <button type="button" class="wall-card${state.seen[item.id] ? " is-seen" : ""}" data-id="${item.id}">
          ${state.seen[item.id] ? `<span class="stamp progress">Opened</span>` : `<span class="stamp todo">Open</span>`}
          <img src="${item.src}" alt="${item.title}" />
          <h3>${displayTitle(item)}</h3>
          <p>${item.exam}</p>
        </button>
      `).join("")}
    </div>
    <p class="export-note">This is an offline website. Double-click <strong>index.html</strong>. Keep this folder together when you share it.</p>
  `;
  root.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.tab = btn.dataset.tab;
      saveProgress();
      renderWall();
    });
  });
  root.querySelectorAll("[data-id]").forEach((btn) => {
    btn.addEventListener("click", () => openLightbox(btn.dataset.id));
  });
  root.querySelector("[data-go=check]").addEventListener("click", () => show("check"));
}

function openLightbox(id) {
  const item = byId(id);
  if (!item) return;
  state.lbId = id;
  state.lbZoom = ZOOM_DEFAULT;
  markSeen(id);
  paintLightbox();
  const box = document.getElementById("lightbox");
  box.hidden = false;
  box.classList.add("show");
  renderWall();
}

function closeLightbox() {
  const box = document.getElementById("lightbox");
  box.hidden = true;
  box.classList.remove("show");
  state.lbId = "";
}

function stepLightbox(dir) {
  const list = itemsForTab(state.tab);
  const i = list.findIndex((row) => row.id === state.lbId);
  if (i < 0) return;
  const next = list[(i + dir + list.length) % list.length];
  openLightbox(next.id);
}

function paintLightbox() {
  const item = byId(state.lbId);
  if (!item) return;
  const img = document.getElementById("lb-img");
  img.src = item.src;
  img.alt = item.title;
  img.style.transform = `scale(${state.lbZoom})`;
  document.getElementById("lb-zoom-label").textContent = Math.round(state.lbZoom * 100) + "%";
  document.getElementById("lb-smaller").disabled = state.lbZoom <= ZOOM_MIN;
  document.getElementById("lb-bigger").disabled = state.lbZoom >= ZOOM_MAX;
  const steps = (item.steps || []).map((line) => `<li>${line}</li>`).join("");
  document.getElementById("lb-copy").innerHTML = `
    <p class="exam-kicker">${WALL_TABS.find((t) => t.id === item.tag).label}</p>
    <p class="exam-line"><strong>${displayTitle(item)}</strong></p>
    <p>${item.exam}</p>
    ${steps ? `<p class="exam-kicker">Steps</p><ol class="steps">${steps}</ol>` : ""}
  `;
}

function bumpZoom(delta) {
  state.lbZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, Math.round((state.lbZoom + delta) * 100) / 100));
  paintLightbox();
}

function currentQ() {
  if (state.phase === "recap") return state.recapQueue[0] || null;
  return state.deck[state.i] || null;
}

function remixCheck() {
  state.deck = buildCheckDeck();
  state.i = 0;
  state.pick = "";
  state.checked = false;
  state.firstTry = {};
  state.missCounts = {};
  state.missQueue = [];
  state.phase = "main";
  state.recapQueue = [];
  state.fb = null;
}

function pickIsCorrect(q, pick) {
  const item = byId(q.id);
  if (q.type === "spot") return pick === item.id;
  return pick === item.title;
}

function recordAnswer(q, ok) {
  const first = !(q.key in state.firstTry);
  if (first) state.firstTry[q.key] = ok;
  if (!ok) {
    state.missCounts[q.key] = (state.missCounts[q.key] || 0) + 1;
    if (!state.missQueue.includes(q.key)) state.missQueue.push(q.key);
  } else if (state.phase === "recap") {
    state.missQueue = state.missQueue.filter((key) => key !== q.key);
  }
}

function setFb(ok, q, pick) {
  const item = byId(q.id);
  const chosen = q.type === "spot" ? (byId(pick) ? displayTitle(byId(pick)) : pick) : pick;
  state.fb = {
    ok,
    title: ok ? "Correct — that matches the notes" : "Not this time — look at the page again",
    item,
    chosen,
  };
}

function nextLabel(q) {
  const locked = state.checked && pickIsCorrect(q, state.pick);
  if (!locked) return "Next";
  if (state.phase === "recap") {
    const more = state.recapQueue.length > 1 || state.missQueue.length > 0;
    return more ? "Next recap" : "Finish";
  }
  const last = state.i === state.deck.length - 1;
  if (!last) return "Next";
  const n = state.missQueue.length;
  return n ? `Recap ${n} miss${n === 1 ? "" : "es"}` : "Finish";
}

function startRecap() {
  const keys = state.missQueue.slice();
  if (!keys.length) {
    state.phase = "done";
    return;
  }
  state.recapQueue = shuffle(state.deck.filter((q) => keys.includes(q.key)).map(cloneQuestion));
  state.phase = "recap";
  state.pick = "";
  state.checked = false;
  state.fb = null;
}

function goNext() {
  const q = currentQ();
  if (!q || !(state.checked && pickIsCorrect(q, state.pick))) return;
  if (state.phase === "recap") {
    state.recapQueue.shift();
    if (!state.recapQueue.length) {
      if (state.missQueue.length) startRecap();
      else state.phase = "done";
    }
    state.pick = "";
    state.checked = false;
    state.fb = null;
    saveProgress();
    renderCheck();
    return;
  }
  if (state.i < state.deck.length - 1) {
    state.i += 1;
    state.pick = "";
    state.checked = false;
    state.fb = null;
  } else {
    startRecap();
  }
  saveProgress();
  renderCheck();
}

function optionLabel(q, opt) {
  if (q.type === "spot") return displayTitle(byId(opt));
  if (state.lang === "zh") {
    const item = WALL_ITEMS.find((row) => row.title === opt);
    return item ? displayTitle(item) : opt;
  }
  return opt;
}

function renderCheckDone() {
  const root = document.getElementById("check");
  const need = state.deck.length;
  const got = firstTryCorrect();
  const clean = got >= need && need > 0;
  const weak = Object.keys(state.missCounts).map((key) => {
    const q = state.deck.find((row) => row.key === key);
    const item = q ? byId(q.id) : null;
    return item ? { name: displayTitle(item), n: state.missCounts[key] } : null;
  }).filter(Boolean).sort((a, b) => b.n - a.n);
  root.innerHTML = `
    <div class="done-card">
      ${clean ? `<span class="stamp cleared">Cleared</span>` : `<span class="stamp revised">Revised</span>`}
      <h2>${clean ? "Clean first-try run" : "Recap finished"}</h2>
      <p class="exam-line">First try ${got} / ${need}${clean ? " — Cleared." : ". Recap is done; this is not a clean run."}</p>
      <p class="exam-kicker">Weak pages</p>
      ${weak.length ? `<ul class="weak-list">${weak.map((row) => `<li><strong>${row.name}</strong> — missed ${row.n} time${row.n === 1 ? "" : "s"}</li>`).join("")}</ul>` : "<p>Clean run — no misses to recap.</p>"}
      <div class="toolbar">
        <button class="btn btn-primary" data-go="wall">Back to the wall</button>
        <button class="btn btn-ghost" data-fresh="1">New mix</button>
      </div>
    </div>
  `;
  root.querySelector("[data-go=wall]").addEventListener("click", () => show("wall"));
  root.querySelector("[data-fresh]").addEventListener("click", () => show("check", { fresh: true }));
}

function renderCheck() {
  if (!state.deck.length) remixCheck();
  if (state.phase === "done") {
    renderCheckDone();
    return;
  }
  const q = currentQ();
  if (!q) {
    state.phase = "done";
    renderCheckDone();
    return;
  }
  const item = byId(q.id);
  const locked = state.checked && pickIsCorrect(q, state.pick);
  const root = document.getElementById("check");
  const progress = state.phase === "recap"
    ? `<p class="recap-banner">Recap · ${state.recapQueue.length} still to get right</p>`
    : `<p class="tiny">${state.i + 1} / ${state.deck.length} · first try ${firstTryCorrect()} / ${Object.keys(state.firstTry).length}</p>`;
  const choices = q.options.map((opt, i) => {
    const selected = String(state.pick) === String(opt) ? " selected" : "";
    const right = state.checked && ((q.type === "spot" && opt === q.id) || (q.type === "name" && opt === item.title));
    const wrong = state.checked && String(state.pick) === String(opt) && !right;
    const mark = right ? " is-right" : (wrong ? " is-wrong" : "");
    if (q.type === "spot") {
      const choice = byId(opt);
      return `<button class="choice spot${selected}${mark}" data-opt="${opt}">
        <span class="keycap">${i + 1}</span>
        <img src="${choice.src}" alt="${state.checked ? choice.title : "Notes page option " + (i + 1)}" />
        ${state.checked ? `<span>${displayTitle(choice)}</span>` : ""}
      </button>`;
    }
    return `<button class="choice${selected}${mark}" data-opt="${opt}"><span class="keycap">${i + 1}</span><span>${optionLabel(q, opt)}</span></button>`;
  }).join("");
  const fb = state.fb ? `<div class="feedback ${state.fb.ok ? "ok" : "bad"}">
    <strong>${state.fb.title}</strong>
    <p class="exam-kicker">Model answer</p>
    <p><strong>${displayTitle(item)}</strong> — ${item.exam}</p>
    ${state.fb.ok ? "" : `<p>You chose <strong>${state.fb.chosen}</strong>.</p>`}
  </div>` : `<p class="tiny keys">Press ${[1, 2, 3, 4].map((k) => `<span class="keycap">${k}</span>`).join(" ")} to choose</p>`;
  root.innerHTML = `
    <div class="toolbar">
      <div>
        <h2>Check yourself</h2>
        <p class="lead">${q.prompt}</p>
      </div>
      <div class="score-wrap">${checkStamp()}<div class="score">${firstTryCorrect()} / ${state.deck.length}</div></div>
    </div>
    ${progress}
    <div class="drill-stage${q.type === "spot" ? " is-spot" : ""}">
      ${q.type === "name" ? `<div class="photo-frame specimen"><img src="${item.src}" alt="${state.checked ? item.title : "Notes page"}" /></div>` : ""}
      <div class="fb-col">
        ${state.checked ? fb : fb}
        <div class="choices${q.type === "spot" ? " spots" : ""}">${choices}</div>
        <div class="toolbar drill-actions">
          <div>
            ${state.checked && !locked ? `<button class="btn btn-primary" id="check-again">Try again</button>` : ""}
            <button class="btn btn-primary" id="check-next" ${!locked ? "disabled" : ""}>${nextLabel(q)}</button>
          </div>
          <button class="btn btn-ghost" id="check-reset">New mix</button>
        </div>
      </div>
    </div>
  `;
  root.querySelectorAll(".choice").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (locked) return;
      const pick = btn.dataset.opt;
      const ok = pickIsCorrect(q, pick);
      state.pick = pick;
      recordAnswer(q, ok);
      setFb(ok, q, pick);
      state.checked = true;
      saveProgress();
      renderCheck();
    });
  });
  const again = document.getElementById("check-again");
  if (again) {
    again.addEventListener("click", () => {
      state.pick = "";
      state.checked = false;
      state.fb = null;
      renderCheck();
    });
  }
  document.getElementById("check-next").addEventListener("click", () => goNext());
  document.getElementById("check-reset").addEventListener("click", () => show("check", { fresh: true }));
}

function bindLightbox() {
  document.getElementById("lb-close").addEventListener("click", () => closeLightbox());
  document.getElementById("lightbox").addEventListener("click", (event) => {
    if (event.target.id === "lightbox") closeLightbox();
  });
  document.getElementById("lb-prev").addEventListener("click", (event) => {
    event.stopPropagation();
    stepLightbox(-1);
  });
  document.getElementById("lb-next").addEventListener("click", (event) => {
    event.stopPropagation();
    stepLightbox(1);
  });
  document.getElementById("lb-smaller").addEventListener("click", (event) => {
    event.stopPropagation();
    bumpZoom(-ZOOM_STEP);
  });
  document.getElementById("lb-bigger").addEventListener("click", (event) => {
    event.stopPropagation();
    bumpZoom(ZOOM_STEP);
  });
}

loadProgress();
loadThemeFallback();
applyLang();
buildNav();
bindLightbox();
show("wall");

document.getElementById("theme-toggle").addEventListener("click", () => {
  applyTheme(!document.documentElement.classList.contains("dark"));
});
document.getElementById("lang-toggle").addEventListener("click", () => {
  state.lang = state.lang === "zh" ? "en" : "zh";
  applyLang();
  saveProgress();
  if (state.view === "wall") renderWall();
  if (state.view === "check") renderCheck();
  if (state.lbId) paintLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.target && /^(INPUT|TEXTAREA)$/.test(event.target.tagName)) return;
  if (event.key === "Escape") {
    event.preventDefault();
    if (state.lbId) closeLightbox();
    else show("wall");
    return;
  }
  if (state.lbId && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
    event.preventDefault();
    stepLightbox(event.key === "ArrowLeft" ? -1 : 1);
    return;
  }
  if (event.key === "Enter") {
    const next = document.getElementById("check-next");
    if (next && !next.disabled) {
      event.preventDefault();
      next.click();
    }
    return;
  }
  const n = Number(event.key);
  if (n < 1 || n > 4) return;
  const active = document.querySelector(".view.active");
  if (!active) return;
  const choices = active.querySelectorAll(".choice");
  if (!choices.length || !choices[n - 1]) return;
  event.preventDefault();
  choices[n - 1].click();
});
