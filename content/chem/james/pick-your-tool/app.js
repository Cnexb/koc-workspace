const VIEWS = [
  { id: "kit", label: "Look at the kit" },
  { id: "tree", label: "Quiz" },
];

const state = {
  lang: "en",
  streak: 0,
  treeDeck: [],
  treeI: 0,
  treeFail: null,
  treeScore: 0,
  treeDone: {},
  treeHintOpen: false,
  treeFirstTry: {},
  kitZoom: null,
  fb: null,
  cleared: {},
  best: {},
  badgePop: "",
  treeMiss: [],
  treePhase: "main",
  treeRecapDeck: [],
  treeRecapI: 0,
  treeRecapDone: {},
};

function pickOne(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function displayName(info) {
  if (!info) return "";
  if (state.lang === "zh" && info.nameZh) return `${info.nameZh} · ${info.name}`;
  return info.name;
}

function optionLabel(opt) {
  const info = gearInfo(opt.id);
  const zh = opt.nameZh || (info && info.nameZh);
  if (state.lang === "zh" && zh) return `${zh} · ${opt.label}`;
  return opt.label;
}

function streakTier() {
  let tier = STREAK_TIERS[0];
  STREAK_TIERS.forEach((row) => {
    if (state.streak >= row.min) tier = row;
  });
  return tier;
}

function streakBox() {
  const tier = streakTier();
  return `<div class="streak vibe-${tier.vibe}" title="Correct answers in a row"><span class="streak-n">${state.streak}</span><span class="streak-label">${tier.label}</span><span class="streak-note">${tier.note}</span></div>`;
}

function praise(kind) {
  if (kind === true || kind === "ok") {
    state.streak += 1;
    burstConfetti();
    const n = state.streak;
    const title = n >= 3
      ? pickOne(STREAK_TITLES).replace("{n}", String(n))
      : pickOne(WIN_TITLES);
    return { title, body: pickOne(PRAISE), meme: pickOne(WIN_MEMES) };
  }
  state.streak = 0;
  return { title: pickOne(MISS_TITLES), body: pickOne(MISS_BODIES), meme: pickOne(MISS_MEMES) };
}

function setFb(kind) {
  const p = praise(kind);
  state.fb = { title: p.title, body: p.body, meme: p.meme || "" };
  paintStreak();
}

function paintStreak() {
  const hud = document.getElementById("streak-hud");
  if (hud) hud.innerHTML = streakBox();
}

function stationNeed(id) {
  if (id === "tree") return TREE_TRIAL;
  return 0;
}

function stationGot(id) {
  if (id === "tree") return Math.max(state.best.tree || 0, state.treeScore || 0);
  return state.best[id] || 0;
}

function stationBadge(id) {
  const need = stationNeed(id);
  if (!need) return "";
  const got = stationGot(id);
  if (state.cleared[id]) return `<span class="stamp cleared" title="Station cleared">Cleared</span>`;
  if (got > 0) return `<span class="stamp progress" title="Best so far">${got}/${need}</span>`;
  return `<span class="stamp todo">${got}/${need}</span>`;
}

function badgePopHtml(id) {
  if (state.badgePop !== id) return "";
  return `<div class="badge-pop">Badge unlocked — Pick Your Tool</div>`;
}

function tickClear(id) {
  const need = stationNeed(id);
  const got = stationGot(id);
  if (got > (state.best[id] || 0)) state.best[id] = got;
  if (need > 0 && got >= need && !state.cleared[id]) {
    state.cleared[id] = true;
    state.badgePop = id;
    burstConfetti();
    setTimeout(() => {
      if (state.badgePop === id) {
        state.badgePop = "";
        const pop = document.querySelector(".badge-pop");
        if (pop) pop.remove();
      }
    }, 3200);
  }
  saveProgress();
  paintNavBadges();
}

function saveProgress() {
  try {
    localStorage.setItem("chem-pick-your-tool-progress", JSON.stringify({
      cleared: state.cleared,
      best: state.best,
    }));
  } catch (err) { /* offline file mode may block storage */ }
}

function applyTheme(dark) {
  document.documentElement.classList.toggle("dark", dark);
  const btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.setAttribute("aria-pressed", dark ? "true" : "false");
    btn.textContent = dark ? "Light mode" : "Dark mode";
    btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }
  try {
    localStorage.setItem("chem-pick-your-tool-theme", dark ? "dark" : "light");
  } catch (err) { /* offline file mode may block storage */ }
}

function loadTheme() {
  let dark = false;
  try {
    const saved = localStorage.getItem("chem-pick-your-tool-theme");
    if (saved === "dark") dark = true;
    else if (saved === "light") dark = false;
    else dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch (err) { /* ignore */ }
  applyTheme(dark);
}

function applyLang(lang) {
  state.lang = lang === "zh" ? "zh" : "en";
  document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
  const btn = document.getElementById("lang-toggle");
  if (btn) {
    btn.setAttribute("aria-pressed", state.lang === "zh" ? "true" : "false");
    btn.textContent = state.lang === "zh" ? "EN" : "中";
    btn.setAttribute("aria-label", state.lang === "zh" ? "Switch to English labels" : "Show Chinese labels");
  }
  try {
    localStorage.setItem("chem-pick-your-tool-lang", state.lang);
  } catch (err) { /* ignore */ }
}

function loadLang() {
  let lang = "en";
  try {
    const saved = localStorage.getItem("chem-pick-your-tool-lang");
    if (saved === "zh" || saved === "en") lang = saved;
  } catch (err) { /* ignore */ }
  applyLang(lang);
}

function loadProgress() {
  try {
    const raw = localStorage.getItem("chem-pick-your-tool-progress");
    if (!raw) return;
    const data = JSON.parse(raw);
    state.cleared = data.cleared || {};
    state.best = data.best || {};
  } catch (err) { /* ignore bad storage */ }
}

function paintNavBadges() {
  document.querySelectorAll(".nav button").forEach((btn) => {
    const id = btn.dataset.view;
    btn.classList.toggle("cleared", Boolean(state.cleared[id]));
    let stamp = btn.querySelector(".nav-stamp");
    if (state.cleared[id]) {
      if (!stamp) {
        stamp = document.createElement("span");
        stamp.className = "nav-stamp";
        stamp.textContent = "✓";
        btn.appendChild(stamp);
      }
    } else if (stamp) {
      stamp.remove();
    }
  });
}

function trapHtml(text) {
  if (!text) return "";
  return `<div class="trap">${text}</div>`;
}

function examRefHtml(text) {
  if (!text) return "";
  return `<p class="exam-ref">${text}</p>`;
}

function keyHint(n) {
  const keys = ["1", "2", "3", "4"].slice(0, n);
  return `<p class="tiny keys">Press ${keys.map((k) => `<span class="keycap">${k}</span>`).join(" ")} to choose</p>`;
}

function armFlip(root) {
  const card = (root || document).querySelector(".flip-card");
  if (!card) return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => card.classList.add("is-flipped"));
  });
}

function flipPanel(ok, front, back) {
  return `<div class="flip-stage"><div class="flip-card ${ok ? "win" : "miss"}"><div class="flip-face flip-front">${front}</div><div class="flip-face flip-back">${back}</div></div></div>`;
}

function diagBlock(src, alt) {
  if (!src) return "";
  return `<div class="photo-frame slim"><img class="diag-in" src="${src}" alt="${alt || ""}" /></div>`;
}

function drawingSrc(id) {
  const fromNotes = ["beaker", "test-tube", "measuring-cylinder", "filter-funnel", "conical-flask", "round-bottomed-flask", "evaporating-dish", "watch-glass", "wire-gauze", "bunsen-burner", "tripod", "dropper", "glass-rod", "thermometer", "crucible"];
  if (fromNotes.includes(id)) return notesDiagramSrc(id);
  return diagramSrc(id);
}

function usesDiagram(id) {
  if (!id) return false;
  const item = byId(id);
  return Boolean(item && item.diagram);
}

function itemSrc(id) {
  if (!id) return "";
  const extra = EXTRA_GEAR[id];
  if (extra && extra.icon) return extra.icon;
  if (usesDiagram(id)) return drawingSrc(id);
  const item = byId(id);
  if (item && item.photo) return photoSrc(id);
  return "";
}

function escapeAttr(text) {
  return String(text || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function kitThumb(id) {
  return itemSrc(id);
}

let confettiRaf = 0;
let confettiBound = false;

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function sizeConfetti(canvas) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
}

function burstConfetti() {
  if (prefersReducedMotion()) return;
  const canvas = document.getElementById("confetti");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (confettiRaf) cancelAnimationFrame(confettiRaf);
  sizeConfetti(canvas);
  if (!confettiBound) {
    window.addEventListener("resize", () => sizeConfetti(canvas));
    confettiBound = true;
  }
  canvas.classList.add("show");
  const colors = ["#0ea5e9", "#1d4ed8", "#38bdf8", "#fbbf24", "#34d399", "#fff", "#0369a1"];
  const pieces = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: -24 - Math.random() * 120,
    w: 6 + Math.random() * 7,
    h: 8 + Math.random() * 10,
    vx: -3.5 + Math.random() * 7,
    vy: 3.5 + Math.random() * 6,
    rot: Math.random() * 360,
    vr: -8 + Math.random() * 16,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
  let t = 0;
  const tick = () => {
    t += 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < pieces.length; i += 1) {
      const p = pieces[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.14;
      p.rot += p.vr;
      const rad = (p.rot * Math.PI) / 180;
      const c = Math.cos(rad);
      const s = Math.sin(rad);
      ctx.setTransform(c, s, -s, c, p.x, p.y);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (t < 100) confettiRaf = requestAnimationFrame(tick);
    else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.classList.remove("show");
      confettiRaf = 0;
    }
  };
  confettiRaf = requestAnimationFrame(tick);
}

function cloneQuestion(q) {
  return { ...q, options: shuffle(q.options.slice()) };
}

function mixTreeDeck() {
  const map = {};
  TREE_Q.forEach((q) => { map[q.id] = q; });
  const takeN = (ids, n) => shuffle(ids.map((id) => cloneQuestion(map[id]))).slice(0, n);
  return takeN(TREE_EASY, 4).concat(takeN(TREE_MID, 2)).concat(takeN(TREE_HARD, 1));
}

function remix(id) {
  state.fb = null;
  state.treeHintOpen = false;
  if (id === "tree") {
    state.treeDeck = mixTreeDeck();
    state.treeI = 0;
    state.treeFail = null;
    state.treeScore = 0;
    state.treeDone = {};
    state.treeMiss = [];
    state.treePhase = "main";
    state.treeRecapDeck = [];
    state.treeRecapI = 0;
    state.treeRecapDone = {};
    state.treeFirstTry = {};
  }
}

function hasRun(id) {
  if (id === "tree") return state.treeDeck.length > 0;
  return false;
}

function quizKey(id, q) {
  return q.id;
}

function cloneForRecap(id, q) {
  if (id === "tree") return cloneQuestion(q);
  return { ...q };
}

function noteMiss(id, key) {
  if (state[id + "Phase"] === "recap") return;
  const bag = state[id + "Miss"];
  if (!bag) return;
  if (!bag.includes(key)) bag.push(key);
}

function currentQuiz(id) {
  const recap = state[id + "Phase"] === "recap";
  const deck = recap ? state[id + "RecapDeck"] : state[id + "Deck"];
  const iKey = recap ? id + "RecapI" : id + "I";
  const i = state[iKey] || 0;
  return { recap, deck, i, iKey, last: Boolean(deck.length) && i === deck.length - 1, q: deck[i] };
}

function startRecap(id) {
  const keys = state[id + "Miss"] || [];
  const list = (state[id + "Deck"] || []).filter((q) => keys.includes(quizKey(id, q))).map((q) => cloneForRecap(id, q));
  if (!list.length) {
    state[id + "Phase"] = "done";
    return;
  }
  state[id + "RecapDeck"] = shuffle(list);
  state[id + "RecapI"] = 0;
  state[id + "Phase"] = "recap";
  state.fb = null;
  state.treeHintOpen = false;
  if (id === "tree") { state.treeFail = null; state.treeRecapDone = {}; }
}

function finishOrRecap(id) {
  if (state[id + "Phase"] === "recap") state[id + "Phase"] = "done";
  else startRecap(id);
}

function nextLabel(id, last, locked) {
  if (!locked) return "Next";
  if (!last) return "Next";
  if (state[id + "Phase"] === "recap") return "Finish";
  const n = (state[id + "Miss"] || []).length;
  return n ? `Recap ${n} miss${n === 1 ? "" : "es"}` : "Finish";
}

function firstTryScore() {
  return Object.keys(state.treeFirstTry).filter((key) => state.treeFirstTry[key] === true).length;
}

function resumeHint() {
  if (!hasRun("tree")) return "Start quiz";
  const phase = state.treePhase;
  if (phase === "done") return "Finished — play again";
  if (phase === "recap") {
    const n = (state.treeRecapDeck || []).length;
    const i = state.treeRecapI || 0;
    return n ? `Continue recap · ${i + 1}/${n}` : "Continue recap";
  }
  const n = (state.treeDeck || []).length;
  const i = state.treeI || 0;
  return n ? `Continue · ${i + 1}/${n}` : "Continue";
}

function renderStationDone(root, id, title) {
  const n = (state[id + "Miss"] || []).length;
  root.innerHTML = `
    <div class="done-card">
      ${stationBadge(id)}
      <h2>${title}</h2>
      <p class="exam-line">${n ? `Recap done. You retried ${n} question${n === 1 ? "" : "s"} you missed.` : "Clean run — no misses to recap."}</p>
      <p class="lead">First try: ${firstTryScore()} / ${state.treeDeck.length || TREE_TRIAL}</p>
      <p class="lead">What you learned</p>
      <ul class="learn-list">
        ${LEARN_POINTS.map((line) => `<li>${line}</li>`).join("")}
      </ul>
      <div class="toolbar">
        <button class="btn btn-primary" data-go-kit="1">Look at the kit</button>
        <button class="btn btn-ghost" data-fresh="${id}">New mix</button>
      </div>
    </div>
  `;
  root.querySelector("[data-go-kit]").addEventListener("click", () => show("kit"));
  root.querySelector("[data-fresh]").addEventListener("click", () => show(id, true));
}

function show(id, fresh) {
  state.view = id;
  document.querySelectorAll(".view").forEach((node) => node.classList.toggle("active", node.id === id));
  document.querySelectorAll(".nav button").forEach((btn) => {
    btn.setAttribute("aria-current", btn.dataset.view === id ? "page" : "false");
  });
  paintStreak();
  if (id === "kit") renderKit();
  const quiz = id === "tree";
  if (quiz && (fresh || !hasRun(id))) remix(id);
  if (id === "tree") renderTree();
  paintNavBadges();
}

function buildNav() {
  const nav = document.getElementById("nav");
  nav.innerHTML = "";
  const homeWrap = document.createElement("div");
  homeWrap.className = "nav-home";
  const restWrap = document.createElement("div");
  restWrap.className = "nav-stations";
  VIEWS.forEach((view) => {
    const btn = document.createElement("button");
    btn.textContent = view.label;
    btn.dataset.view = view.id;
    btn.addEventListener("click", () => show(view.id));
    (view.id === "kit" ? homeWrap : restWrap).appendChild(btn);
  });
  nav.appendChild(homeWrap);
  nav.appendChild(restWrap);
  paintNavBadges();
}

function kitCardHtml(id) {
  const info = gearInfo(id);
  const src = kitThumb(id);
  const name = displayName(info);
  return `<button type="button" class="learn-card kit-card" data-zoom="${id}">
      ${src ? `<img src="${src}" alt="${escapeAttr(name)}" />` : ""}
      <strong>${name}</strong>
      <p>${info ? info.easy : ""}</p>
    </button>`;
}

function closeKitZoom() {
  state.kitZoom = null;
  renderKit();
}

function renderKit() {
  const root = document.getElementById("kit");
  if (!root) return;
  const groups = KIT_GROUPS.map((group) => {
    const title = state.lang === "zh" && group.titleZh ? `${group.titleZh} · ${group.title}` : group.title;
    return `<section class="kit-group">
      <h3>${title}</h3>
      <div class="grid learn-grid kit-grid">${group.ids.map(kitCardHtml).join("")}</div>
    </section>`;
  }).join("");
  let zoom = "";
  if (state.kitZoom) {
    const info = gearInfo(state.kitZoom);
    const src = kitThumb(state.kitZoom);
    const name = displayName(info);
    zoom = `<div class="kit-zoom" id="kit-zoom" role="dialog" aria-label="${escapeAttr(name)}">
      <div class="kit-zoom-card">
        ${src ? `<img src="${src}" alt="${escapeAttr(name)}" />` : ""}
        <strong>${name}</strong>
        <p>${info ? info.easy : ""}</p>
        <button type="button" class="btn btn-primary" id="kit-zoom-close">Close</button>
      </div>
    </div>`;
  }
  root.innerHTML = `
    <div class="toolbar">
      <div>
        <h2>Look at the kit</h2>
        <p class="lead">Read these tools. The quiz asks you to pick the right job.</p>
      </div>
      <div class="score-wrap">${stationBadge("tree")}</div>
    </div>
    <div class="toolbar kit-actions">
      <button class="btn btn-primary" id="kit-start">${resumeHint()}</button>
      ${hasRun("tree") ? `<button class="btn btn-ghost" id="kit-fresh">New mix</button>` : ""}
    </div>
    ${groups}
    <p class="export-note">This is an offline website. Double-click <strong>index.html</strong> in Chrome — no install. 中 shows Chinese names as a label aid. The marked answer is still the English name.</p>
    ${zoom}
  `;
  document.getElementById("kit-start").addEventListener("click", () => show("tree"));
  const fresh = document.getElementById("kit-fresh");
  if (fresh) fresh.addEventListener("click", () => show("tree", true));
  root.querySelectorAll("[data-zoom]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.kitZoom = btn.dataset.zoom;
      renderKit();
    });
  });
  const zoomBox = document.getElementById("kit-zoom");
  if (zoomBox) {
    zoomBox.addEventListener("click", (event) => {
      if (event.target.id === "kit-zoom") closeKitZoom();
    });
    document.getElementById("kit-zoom-close").addEventListener("click", closeKitZoom);
  }
}

function award(done, key, ok, scoreKey) {
  const station = scoreKey.replace("Score", "");
  if (!ok) noteMiss(station, key);
  if (done[key] === true) return;
  if (ok) {
    done[key] = true;
    state[scoreKey] += 1;
    tickClear(station);
  } else {
    done[key] = false;
  }
}

function treeThumb(opt) {
  const src = opt.icon || itemSrc(opt.id);
  const label = optionLabel(opt);
  const img = src ? `<img src="${src}" alt="${escapeAttr(label)}" />` : "";
  const note = opt.note ? `<span class="choice-note">${opt.note}</span>` : "";
  return img + note;
}

function winPicture(win) {
  if (win.icon) return diagBlock(win.icon, win.label);
  if (win.id) return diagBlock(itemSrc(win.id), win.label);
  return "";
}

function renderTree() {
  if (!state.treeDeck.length) remix("tree");
  const root = document.getElementById("tree");
  if (state.treePhase === "done") {
    renderStationDone(root, "tree", "Pick Your Tool");
    return;
  }
  const cur = currentQuiz("tree");
  const q = cur.q;
  const locked = cur.recap ? state.treeRecapDone[q.id] === true : state.treeDone[q.id] === true;
  const flipped = Boolean(state.treeFail) || locked;
  const options = q.options.map((opt, i) => {
    const thumb = treeThumb(opt);
    return `<button class="choice tree-choice" data-i="${i}"><span class="keycap">${i + 1}</span>${thumb}<span>${optionLabel(opt)}</span></button>`;
  }).join("");
  let stage = "";
  if (state.treeFail) {
    const opt = state.treeFail;
    const front = `<strong>${optionLabel(opt)}</strong>`;
    const back = `<div class="fb-note">${pickOne(MISS_MEMES)}</div><strong>${pickOne(MISS_TITLES)}</strong>
      <p class="exam-kicker">Why this is not the job</p>
      <p>${opt.fail}</p>
      ${trapHtml(opt.trap || "")}
      ${examRefHtml(opt.examRef || "")}`;
    stage = flipPanel(false, front, back);
  } else if (locked) {
    const win = q.options.find((o) => o.ok);
    const front = `<strong>${optionLabel(win)}</strong>`;
    const back = `<div class="fb-note">${state.fb ? state.fb.meme : ""}</div><strong>${state.fb ? state.fb.title : ""}</strong><p>${state.fb ? state.fb.body : ""}</p>
      <p class="exam-kicker">Model answer</p>
      <p>${win.why}</p>
      ${winPicture(win)}`;
    stage = flipPanel(true, front, back);
  } else {
    stage = `${keyHint(q.options.length)}<div class="choices tree-choices">${options}</div>`;
  }
  const hintBlock = q.hint
    ? `<div class="hint-row">
        <button type="button" class="btn btn-ghost" id="tree-hint">${state.treeHintOpen ? "Hide hint" : "Hint"}</button>
        ${state.treeHintOpen ? `<p class="hint-box">${q.hint}</p>` : ""}
      </div>`
    : "";
  root.innerHTML = `
    <div class="toolbar">
      <div>
        <h2>Pick Your Tool</h2>
        <p class="lead">${cur.recap ? "Recap — questions you missed." : q.theme + ". Press 1–3 to choose."}</p>
      </div>
      <div class="score-wrap">${stationBadge("tree")}<div class="score">${state.treeScore} / ${state.treeDeck.length}</div></div>
    </div>
    ${badgePopHtml("tree")}
    ${cur.recap ? `<p class="recap-banner">Recap ${cur.i + 1} / ${cur.deck.length}</p>` : `<p class="tiny">${cur.i + 1} / ${cur.deck.length}</p>`}
    <p class="exam-line">${q.scenario}</p>
    ${!flipped ? hintBlock : ""}
    ${stage}
    <div class="toolbar" style="margin-top:16px">
      <div>
        ${state.treeFail ? `<button class="btn btn-primary" id="tree-again">Try again</button>` : ""}
        <button class="btn btn-ghost" id="tree-back" ${cur.i === 0 ? "disabled" : ""}>Back</button>
        <button class="btn btn-primary" id="tree-next" ${!locked ? "disabled" : ""}>${nextLabel("tree", cur.last, locked)}</button>
      </div>
      <button class="btn btn-ghost" id="tree-reset">New mix</button>
    </div>
  `;
  if (flipped) armFlip(root);
  const hintBtn = document.getElementById("tree-hint");
  if (hintBtn) {
    hintBtn.addEventListener("click", () => {
      state.treeHintOpen = !state.treeHintOpen;
      renderTree();
    });
  }
  root.querySelectorAll(".tree-choice").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (locked) return;
      const opt = q.options[Number(btn.dataset.i)];
      if (state.treePhase === "main" && state.treeFirstTry[q.id] === undefined) {
        state.treeFirstTry[q.id] = Boolean(opt.ok);
      }
      if (opt.ok) {
        if (cur.recap) state.treeRecapDone[q.id] = true;
        award(state.treeDone, q.id, true, "treeScore");
        setFb(true);
        state.treeFail = null;
        state.treeHintOpen = false;
      } else {
        noteMiss("tree", q.id);
        state.streak = 0;
        paintStreak();
        state.treeFail = opt;
        state.fb = null;
      }
      renderTree();
    });
  });
  const again = document.getElementById("tree-again");
  if (again) {
    again.addEventListener("click", () => {
      state.treeFail = null;
      renderTree();
    });
  }
  document.getElementById("tree-back").addEventListener("click", () => {
    state[cur.iKey] -= 1;
    state.treeFail = null;
    state.fb = null;
    state.treeHintOpen = false;
    renderTree();
  });
  document.getElementById("tree-next").addEventListener("click", () => {
    if (!cur.last) {
      state[cur.iKey] += 1;
      state.treeFail = null;
      state.fb = null;
      state.treeHintOpen = false;
    } else {
      finishOrRecap("tree");
    }
    renderTree();
  });
  document.getElementById("tree-reset").addEventListener("click", () => show("tree", true));
}

loadProgress();
loadTheme();
loadLang();
buildNav();
show("kit");

const themeBtn = document.getElementById("theme-toggle");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    applyTheme(!document.documentElement.classList.contains("dark"));
  });
}

const langBtn = document.getElementById("lang-toggle");
if (langBtn) {
  langBtn.addEventListener("click", () => {
    applyLang(state.lang === "zh" ? "en" : "zh");
    if (state.view === "kit") renderKit();
    else if (state.view === "tree") renderTree();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.target && /^(INPUT|TEXTAREA)$/.test(event.target.tagName)) return;
  if (event.key === "Escape" && state.kitZoom) {
    event.preventDefault();
    closeKitZoom();
    return;
  }
  if (event.key === "Enter") {
    const next = document.getElementById("tree-next");
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
