const VIEWS = [
  { id: "find", label: "Spot It" },
];

const STATION_LEVELS = [
  { id: "easy", label: "Easy", hint: "Name and recognise apparatus" },
];

const STATION_CARDS = [
  { go: "find", title: "Spot It", level: "easy", blurb: "Read the name, then tap the matching photo or diagram.", thumb: "images/notes-test-tube-diagram.jpg" },
];

const FIND_CHOICE_H_DEFAULT = 220;
const FIND_CHOICE_H_MIN = 140;
const FIND_CHOICE_H_STEP = 40;
const FIND_CHOICE_H_MAX = 320;

const state = {
  learnId: "beaker",
  revealed: false,
  learnCore: [],
  learnExtra: [],
  streak: 0,
  nameDeck: [],
  nameI: 0,
  namePick: "",
  nameChecked: false,
  nameScore: 0,
  nameDone: {},
  jobDeck: [],
  jobI: 0,
  jobPick: "",
  jobChecked: false,
  jobScore: 0,
  jobDone: {},
  buildDeck: [],
  buildI: 0,
  buildDrag: null,
  buildNames: {},
  buildDraws: {},
  buildChecked: false,
  buildScore: 0,
  buildDone: {},
  findDeck: [],
  findI: 0,
  findPick: "",
  findChecked: false,
  findScore: 0,
  findDone: {},
  treeDeck: [],
  treeI: 0,
  treeFail: null,
  treeScore: 0,
  treeDone: {},
  fb: null,
  wallTab: "all",
  wallSeen: {},
  learnSeen: {},
  cleared: {},
  best: {},
  badgePop: "",
  nameMiss: [],
  namePhase: "main",
  nameRecapDeck: [],
  nameRecapI: 0,
  findMiss: [],
  findPhase: "main",
  findRecapDeck: [],
  findRecapI: 0,
  jobMiss: [],
  jobPhase: "main",
  jobRecapDeck: [],
  jobRecapI: 0,
  buildMiss: [],
  buildPhase: "main",
  buildRecapDeck: [],
  buildRecapI: 0,
  treeMiss: [],
  treePhase: "main",
  treeRecapDeck: [],
  treeRecapI: 0,
  treeRecapDone: {},
  scrambleDeck: [],
  scrambleI: 0,
  scramblePick: "",
  scrambleChecked: false,
  scrambleScore: 0,
  scrambleDone: {},
  scramblePicks: {},
  scrambleLeft: 900,
  scrambleElapsed: 0,
  scrambleUsed: 0,
  scrambleOver: false,
  scramblePhase: "main",
  previewSize: FIND_CHOICE_H_DEFAULT,
};

function pickOne(list) {
  return list[Math.floor(Math.random() * list.length)];
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
  if (kind === "partial") {
    return { cls: "partial praise", title: pickOne(PARTIAL_TITLES), body: pickOne(PARTIAL_BODIES), meme: "Some matches are already correct." };
  }
  if (kind === true || kind === "ok") {
    state.streak += 1;
    burstConfetti();
    const n = state.streak;
    const title = n >= 3
      ? pickOne(STREAK_TITLES).replace("{n}", String(n))
      : pickOne(WIN_TITLES);
    return { cls: "ok praise vibe-" + streakTier().vibe, title, body: pickOne(PRAISE), meme: pickOne(WIN_MEMES) };
  }
  state.streak = 0;
  return { cls: "bad", title: pickOne(MISS_TITLES), body: pickOne(MISS_BODIES), meme: pickOne(MISS_MEMES) };
}

function setFb(kind, extra) {
  const p = praise(kind);
  state.fb = { cls: p.cls, title: p.title, body: p.body, extra: extra || "", meme: p.meme || "" };
  paintStreak();
}

function paintStreak() {
  const hud = document.getElementById("streak-hud");
  if (hud) hud.innerHTML = streakBox();
}

function stationNeed(id) {
  if (id === "learn") return APPARATUS.filter((a) => a.diagram).length;
  if (id === "name") return NAME_Q.length;
  if (id === "find") return FIND_Q.length;
  if (id === "job") return JOB_Q.length;
  if (id === "build") return BUILD.length;
  if (id === "tree") return TREE_Q.length;
  if (id === "scramble") return 10;
  if (id === "wall") return 3;
  return 0;
}

function stationGot(id) {
  if (id === "learn") return Object.keys(state.learnSeen).length;
  if (id === "wall") return ["glass", "heat", "setup"].filter((tab) => state.wallSeen[tab]).length;
  if (id === "name") return Math.max(state.best.name || 0, state.nameScore || 0);
  if (id === "find") return Math.max(state.best.find || 0, state.findScore || 0);
  if (id === "job") return Math.max(state.best.job || 0, state.jobScore || 0);
  if (id === "build") return Math.max(state.best.build || 0, state.buildScore || 0);
  if (id === "tree") return Math.max(state.best.tree || 0, state.treeScore || 0);
  if (id === "scramble") return Math.max(state.best.scramble || 0, state.scrambleScore || 0);
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
  const card = STATION_CARDS.find((row) => row.go === id);
  const name = card ? card.title : id;
  return `<div class="badge-pop">Badge unlocked — ${name}</div>`;
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
    localStorage.setItem("spot-it-progress", JSON.stringify({
      cleared: state.cleared,
      best: state.best,
      learnSeen: state.learnSeen,
      wallSeen: state.wallSeen,
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
    localStorage.setItem("spot-it-theme", dark ? "dark" : "light");
  } catch (err) { /* offline file mode may block storage */ }
}

function loadTheme() {
  let dark = false;
  try {
    const saved = localStorage.getItem("spot-it-theme");
    if (saved === "dark") dark = true;
    else if (saved === "light") dark = false;
    else dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch (err) { /* ignore */ }
  applyTheme(dark);
}

function loadProgress() {
  try {
    const raw = localStorage.getItem("spot-it-progress");
    if (!raw) return;
    const data = JSON.parse(raw);
    state.cleared = data.cleared || {};
    state.best = data.best || {};
    state.learnSeen = data.learnSeen || {};
    state.wallSeen = data.wallSeen || {};
  } catch (err) { /* ignore bad storage */ }
}

function clampFindChoiceH(size) {
  size = Number(size);
  if (!Number.isFinite(size)) return FIND_CHOICE_H_DEFAULT;
  return Math.max(FIND_CHOICE_H_MIN, Math.min(FIND_CHOICE_H_MAX, Math.round(size)));
}

function previewSizeLabel() {
  return Math.round((state.previewSize / FIND_CHOICE_H_DEFAULT) * 100) + "%";
}

function applyPreviewSize() {
  document.documentElement.style.setProperty("--find-choice-h", state.previewSize + "px");
}

function savePreviewSize() {
  try {
    localStorage.setItem("spot-it-preview-size", String(state.previewSize));
  } catch (err) { /* offline file mode may block storage */ }
}

function loadPreviewSize() {
  try {
    const raw = localStorage.getItem("spot-it-preview-size");
    if (raw) state.previewSize = clampFindChoiceH(raw);
  } catch (err) { /* ignore */ }
  applyPreviewSize();
}

function bumpPreviewSize(delta) {
  state.previewSize = clampFindChoiceH(state.previewSize + delta);
  savePreviewSize();
  applyPreviewSize();
  const label = document.getElementById("specimen-zoom-label");
  if (label) label.textContent = previewSizeLabel();
  const smaller = document.getElementById("specimen-smaller");
  const bigger = document.getElementById("specimen-bigger");
  if (smaller) smaller.disabled = state.previewSize <= FIND_CHOICE_H_MIN;
  if (bigger) bigger.disabled = state.previewSize >= FIND_CHOICE_H_MAX;
}

function findZoomHtml() {
  return `<div class="specimen-zoom">
      <button type="button" class="btn btn-ghost" id="specimen-smaller" ${state.previewSize <= FIND_CHOICE_H_MIN ? "disabled" : ""} aria-label="Smaller pictures">−</button>
      <span class="specimen-zoom-label" id="specimen-zoom-label">${previewSizeLabel()}</span>
      <button type="button" class="btn btn-ghost" id="specimen-bigger" ${state.previewSize >= FIND_CHOICE_H_MAX ? "disabled" : ""} aria-label="Bigger pictures">+</button>
    </div>`;
}

function bindFindZoom() {
  const smaller = document.getElementById("specimen-smaller");
  const bigger = document.getElementById("specimen-bigger");
  if (smaller) smaller.addEventListener("click", () => bumpPreviewSize(-FIND_CHOICE_H_STEP));
  if (bigger) bigger.addEventListener("click", () => bumpPreviewSize(FIND_CHOICE_H_STEP));
}

function findMissListHtml() {
  const keys = state.findMiss || [];
  if (!keys.length) return "";
  const items = keys.map((key) => {
    const q = FIND_Q.find((row) => row.key === key);
    if (!q) return key;
    const item = byId(q.id);
    const kind = q.kind === "diagram" ? "2D diagram" : "photo";
    return `${item ? item.name : q.id} (${kind})`;
  });
  return `<p class="exam-kicker">Missed</p><ul class="miss-list">${items.map((line) => `<li>${line}</li>`).join("")}</ul>`;
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

function startFloaters() {
  const nodes = Array.from(document.querySelectorAll(".lab-bg img"));
  if (!nodes.length) return;
  const items = nodes.map((el, i) => {
    const w = 108 + (i % 5) * 16;
    el.style.width = w + "px";
    el.style.left = "0px";
    el.style.top = "0px";
    return {
      el,
      w,
      x: Math.random() * Math.max(40, window.innerWidth - w),
      y: 80 + Math.random() * Math.max(40, window.innerHeight - 180),
      vx: (0.18 + Math.random() * 0.42) * (Math.random() < 0.5 ? -1 : 1),
      vy: (0.14 + Math.random() * 0.36) * (Math.random() < 0.5 ? -1 : 1),
      rot: -22 + Math.random() * 44,
      vr: (Math.random() - 0.5) * 0.12,
    };
  });
  const tick = () => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    items.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      if (p.x < -30) { p.x = -30; p.vx = Math.abs(p.vx); }
      if (p.x > W - p.w + 30) { p.x = W - p.w + 30; p.vx = -Math.abs(p.vx); }
      if (p.y < 40) { p.y = 40; p.vy = Math.abs(p.vy); }
      if (p.y > H - 70) { p.y = H - 70; p.vy = -Math.abs(p.vy); }
      p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`;
    });
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function trapHtml(text) {
  if (!text) return "";
  return `<div class="trap">${text}</div>`;
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

function choiceMarkup(list, getLabel, getBody) {
  return list.map((item, i) => {
    return `<button class="choice" data-i="${i}"><span class="keycap">${i + 1}</span>${getBody(item, i)}<span>${getLabel(item, i)}</span></button>`;
  }).join("");
}

function drawingSrc(id) {
  const fromNotes = ["beaker", "test-tube", "measuring-cylinder", "filter-funnel", "conical-flask", "round-bottomed-flask", "evaporating-dish", "watch-glass", "wire-gauze", "bunsen-burner", "tripod", "dropper", "glass-rod", "thermometer", "crucible"];
  if (fromNotes.includes(id)) return notesDiagramSrc(id);
  return diagramSrc(id);
}

function usesDiagram(id) {
  if (!id) return false;
  const item = byId(id);
  if (item) return Boolean(item.diagram);
  return trayHasDiagram(id);
}

function itemSrc(id) {
  if (!id) return "";
  if (usesDiagram(id)) return drawingSrc(id);
  const item = byId(id);
  if (item && item.photo) return photoSrc(id);
  if (trayHasPhoto(id)) return photoSrc(id);
  return "";
}

function itemImg(id) {
  const src = itemSrc(id);
  return src ? `<img src="${src}" alt="" />` : "";
}

function burstConfetti() {
  const canvas = document.getElementById("confetti");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.classList.add("show");
  const colors = ["#0ea5e9", "#1d4ed8", "#38bdf8", "#fbbf24", "#34d399", "#fff", "#0369a1"];
  const pieces = Array.from({ length: 140 }, () => ({
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
    if (t < 100) requestAnimationFrame(tick);
    else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.classList.remove("show");
    }
  };
  requestAnimationFrame(tick);
}

const SCRAMBLE_N = 10;
const SCRAMBLE_SECONDS = 15 * 60;
let scrambleClock = null;

function formatClock(seconds) {
  const s = Math.max(0, seconds);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
}

function stopScrambleClock() {
  if (scrambleClock) {
    clearInterval(scrambleClock);
    scrambleClock = null;
  }
}

function startScrambleClock() {
  stopScrambleClock();
  if (state.scrambleOver || state.scramblePhase === "done") return;
  paintScrambleClock();
  scrambleClock = setInterval(() => {
    if (state.scrambleElapsed >= SCRAMBLE_SECONDS) {
      finishScramble(true);
      return;
    }
    state.scrambleElapsed += 1;
    state.scrambleLeft = SCRAMBLE_SECONDS - state.scrambleElapsed;
    paintScrambleClock();
    if (state.scrambleElapsed >= SCRAMBLE_SECONDS) finishScramble(true);
  }, 1000);
}

function paintScrambleClock() {
  const el = document.getElementById("scramble-clock");
  if (!el) return;
  el.textContent = formatClock(state.scrambleElapsed);
  el.classList.toggle("is-low", state.scrambleElapsed >= SCRAMBLE_SECONDS - 60);
}

function finishScramble(timedOut) {
  if (state.scramblePhase === "done") {
    stopScrambleClock();
    return;
  }
  stopScrambleClock();
  state.scrambleOver = Boolean(timedOut);
  state.scrambleUsed = state.scrambleElapsed;
  state.scramblePhase = "done";
  state.fb = null;
  if (!timedOut) burstConfetti();
  tickClear("scramble");
  if (state.view === "scramble") renderScramble();
}

function scrambleThumb(opt) {
  if (opt.diagram) return `<img src="${opt.diagram}" alt="" />`;
  return itemImg(opt.id);
}

function makeScrambleDeck() {
  const jobs = JOB_Q.map((q) => ({
    kind: "job",
    key: "job-" + q.n,
    source: "What's It For?",
    prompt: q.exam,
    model: `${q.answer} — ${q.exam}`,
    photo: "",
    answer: q.answer,
    trap: (JOB_HELP[q.n] || {}).trap || "",
    options: shuffle(q.options.map((opt) => ({
      label: opt.label,
      id: opt.id || "",
      diagram: opt.diagram || "",
      ok: opt.label === q.answer,
    }))),
  }));
  const trees = TREE_Q.map((q) => ({
    kind: "tree",
    key: "tree-" + q.id,
    source: "Pick Your Tool",
    prompt: q.scenario,
    model: q.exam,
    photo: q.scene || "",
    caption: q.sceneCaption || "",
    answer: (q.options.find((opt) => opt.ok) || {}).label,
    trap: "",
    options: shuffle(q.options.map((opt) => ({
      label: opt.label,
      id: opt.id || "",
      ok: Boolean(opt.ok),
      trap: opt.trap || "",
      fail: opt.fail || "",
      why: opt.why || "",
    }))),
  }));
  const builds = [];
  BUILD.forEach((setup) => {
    setup.slots.forEach((slot) => {
      const answer = trayName(slot.answer);
      const names = setup.tray.map(trayName);
      const wrong = shuffle(names.filter((name) => name !== answer)).slice(0, 3);
      const labels = shuffle([answer].concat(wrong));
      builds.push({
        kind: "build",
        key: "build-" + setup.id + "-" + slot.id,
        source: "Build the Bench",
        prompt: `${setup.title} — which apparatus is “${slot.label}”?`,
        model: `${slot.label} — ${answer}. ${setup.exam}`,
        photo: setup.diagram || setup.photo,
        answer,
        trap: "",
        options: labels.map((label) => {
          const id = setup.tray.find((tid) => trayName(tid) === label) || "";
          return { label, id, ok: label === answer };
        }),
      });
    });
  });
  return shuffle(
    shuffle(jobs).slice(0, 3)
      .concat(shuffle(trees).slice(0, 3))
      .concat(shuffle(builds).slice(0, 4))
  ).slice(0, SCRAMBLE_N);
}

function remix(id) {
  state.fb = null;
  if (id === "learn") {
    const drawn = APPARATUS.filter((a) => a.diagram);
    state.learnCore = shuffle(drawn.filter((a) => a.letter));
    state.learnExtra = shuffle(drawn.filter((a) => !a.letter));
    const all = state.learnCore.concat(state.learnExtra);
    state.learnId = all.length ? all[0].id : "beaker";
    state.revealed = false;
  }
  if (id === "name") {
    state.nameDeck = shuffle(NAME_Q.map((q) => ({ ...q, options: shuffle(q.options.slice()) })));
    state.nameI = 0;
    state.namePick = "";
    state.nameChecked = false;
    state.nameScore = 0;
    state.nameDone = {};
    state.nameMiss = [];
    state.namePhase = "main";
    state.nameRecapDeck = [];
    state.nameRecapI = 0;
  }
  if (id === "find") {
    state.findDeck = shuffle(FIND_Q.map((q) => ({ ...q, ids: shuffle(q.ids.slice()) })));
    state.findI = 0;
    state.findPick = "";
    state.findChecked = false;
    state.findScore = 0;
    state.findDone = {};
    state._findFor = null;
    state.findMiss = [];
    state.findPhase = "main";
    state.findRecapDeck = [];
    state.findRecapI = 0;
  }
  if (id === "job") {
    state.jobDeck = shuffle(JOB_Q.map((q) => ({ ...q, options: shuffle(q.options.slice()) })));
    state.jobI = 0;
    state.jobPick = "";
    state.jobChecked = false;
    state.jobScore = 0;
    state.jobDone = {};
    state.jobMiss = [];
    state.jobPhase = "main";
    state.jobRecapDeck = [];
    state.jobRecapI = 0;
  }
  if (id === "build") {
    state.buildDeck = shuffle(BUILD.slice());
    state.buildI = 0;
    state.buildNames = {};
    state.buildDraws = {};
    state.buildDrag = null;
    state.buildChecked = false;
    state.buildScore = 0;
    state.buildDone = {};
    state._buildFor = null;
    state.buildMiss = [];
    state.buildPhase = "main";
    state.buildRecapDeck = [];
    state.buildRecapI = 0;
  }
  if (id === "tree") {
    state.treeDeck = shuffle(TREE_Q.map((q) => ({ ...q, options: shuffle(q.options.slice()) })));
    state.treeI = 0;
    state.treeFail = null;
    state.treeScore = 0;
    state.treeDone = {};
    state.treeMiss = [];
    state.treePhase = "main";
    state.treeRecapDeck = [];
    state.treeRecapI = 0;
    state.treeRecapDone = {};
  }
  if (id === "scramble") {
    stopScrambleClock();
    state.scrambleDeck = makeScrambleDeck();
    state.scrambleI = 0;
    state.scramblePick = "";
    state.scrambleChecked = false;
    state.scrambleScore = 0;
    state.scrambleDone = {};
    state.scramblePicks = {};
    state.scrambleLeft = SCRAMBLE_SECONDS;
    state.scrambleElapsed = 0;
    state.scrambleUsed = 0;
    state.scrambleOver = false;
    state.scramblePhase = "main";
  }
}

function hasRun(id) {
  if (id === "learn") return state.learnCore.length > 0;
  if (id === "name") return state.nameDeck.length > 0;
  if (id === "find") return state.findDeck.length > 0;
  if (id === "job") return state.jobDeck.length > 0;
  if (id === "build") return state.buildDeck.length > 0;
  if (id === "tree") return state.treeDeck.length > 0;
  if (id === "scramble") return state.scrambleDeck.length > 0;
  return false;
}

function resumeHint(id) {
  if (!hasRun(id)) return "";
  if (id === "learn") return "Continue";
  if (id === "scramble") {
    if (state.scramblePhase === "done" || state.scrambleOver) return "Finished";
    const n = state.scrambleDeck.length;
    const i = state.scrambleI || 0;
    return n ? `Continue · ${i + 1}/${n} · ${formatClock(state.scrambleElapsed)}` : "Continue";
  }
  const phase = state[id + "Phase"];
  if (phase === "done") return "Finished";
  if (phase === "recap") {
    const n = (state[id + "RecapDeck"] || []).length;
    const i = state[id + "RecapI"] || 0;
    return n ? `Continue recap · ${i + 1}/${n}` : "Continue recap";
  }
  const n = (state[id + "Deck"] || []).length;
  const i = state[id + "I"] || 0;
  return n ? `Continue · ${i + 1}/${n}` : "Continue";
}

function quizKey(id, q) {
  if (id === "name") return nameKey(q);
  if (id === "find") return q.key;
  if (id === "job") return q.n;
  return q.id;
}

function cloneForRecap(id, q) {
  if (id === "name" || id === "job" || id === "tree") return { ...q, options: shuffle(q.options.slice()) };
  if (id === "find") return { ...q, ids: shuffle(q.ids.slice()) };
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
  if (id === "name") { state.namePick = ""; state.nameChecked = false; }
  if (id === "find") { state.findPick = ""; state.findChecked = false; state._findFor = null; }
  if (id === "job") { state.jobPick = ""; state.jobChecked = false; }
  if (id === "tree") { state.treeFail = null; state.treeRecapDone = {}; }
  if (id === "build") { state._buildFor = null; }
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

function renderStationDone(root, id, title) {
  const n = (state[id + "Miss"] || []).length;
  const missHtml = id === "find" ? findMissListHtml() : "";
  root.innerHTML = `
    <div class="done-card">
      ${stationBadge(id)}
      <h2>${title}</h2>
      <p class="exam-line">${n ? `Recap done. You retried ${n} question${n === 1 ? "" : "s"} you missed.` : "Clean run — no misses to recap."}</p>
      ${missHtml}
      <div class="toolbar">
        <button class="btn btn-primary" data-fresh="${id}">New mix</button>
      </div>
    </div>
  `;
  root.querySelector("[data-fresh]").addEventListener("click", () => show(id, true));
}

function show(id, fresh) {
  if (id === "home") id = "find";
  if (state.view === "scramble" && id !== "scramble") stopScrambleClock();
  state.view = id;
  document.querySelectorAll(".view").forEach((node) => node.classList.toggle("active", node.id === id));
  document.querySelectorAll(".nav button").forEach((btn) => {
    btn.setAttribute("aria-current", btn.dataset.view === id ? "page" : "false");
  });
  paintStreak();
  if (id === "home") renderHome();
  const quiz = id === "learn" || id === "name" || id === "find" || id === "job" || id === "build" || id === "tree" || id === "scramble";
  if (quiz && (fresh || !hasRun(id))) remix(id);
  if (id === "learn") renderLearn();
  if (id === "name") renderName();
  if (id === "find") renderFind();
  if (id === "job") renderJob();
  if (id === "build") renderBuild();
  if (id === "tree") renderTree();
  if (id === "wall") renderWall();
  if (id === "scramble") {
    renderScramble();
    startScrambleClock();
  }
  paintNavBadges();
}

function buildNav() {
  const nav = document.getElementById("nav");
  nav.innerHTML = "";
  VIEWS.forEach((view) => {
    const btn = document.createElement("button");
    btn.textContent = view.label;
    btn.dataset.view = view.id;
    btn.addEventListener("click", () => show(view.id));
    nav.appendChild(btn);
  });
  paintNavBadges();
}

function stationCardHtml(card) {
  const hint = resumeHint(card.go);
  const level = STATION_LEVELS.find((row) => row.id === card.level);
  return `<button class="game-card${state.cleared[card.go] ? " is-cleared" : ""}" data-go="${card.go}">
    ${stationBadge(card.go)}
    <img class="card-thumb" src="${card.thumb}" alt="" />
    <span class="level-pill level-${card.level}">${level ? level.label : ""}</span>
    <h3>${card.title}</h3>
    <p>${card.blurb}</p>
    ${hint ? `<span class="resume-tag">${hint}</span>` : ""}
    ${hasRun(card.go) ? `<span class="fresh-link" data-fresh="${card.go}">New mix</span>` : ""}
  </button>`;
}

function renderHome() {
  const games = document.getElementById("home-games");
  if (!games) return;
  games.innerHTML = STATION_LEVELS.map((level) => {
    const cards = STATION_CARDS.filter((card) => card.level === level.id);
    return `<div class="level-block">
      <h3 class="level-heading"><span class="level-pill level-${level.id}">${level.label}</span> ${level.hint}</h3>
      <div class="grid games-row">${cards.map(stationCardHtml).join("")}</div>
    </div>`;
  }).join("");
  games.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", () => show(btn.dataset.go));
  });
  games.querySelectorAll("[data-fresh]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      show(btn.dataset.fresh, true);
    });
  });
}

function renderLearn() {
  if (!state.learnCore.length) remix("learn");
  const item = byId(state.learnId) || byId("beaker");
  const root = document.getElementById("learn");
  root.innerHTML = `
    <div class="toolbar">
      <div>
        <h2>Meet the Kit</h2>
        <p class="lead">Look at each piece. Reveal the model answer when you are ready. Charts are on Notes Wall.</p>
      </div>
      ${stationBadge("learn")}
    </div>
    ${badgePopHtml("learn")}
    <div class="chips" id="learn-core"></div>
    <div class="chips quiet" id="learn-extra"></div>
    <div class="detail">
      <div>
        <p class="caption">2D diagram</p>
        ${item.diagram
          ? (state.revealed
            ? `<div class="photo-frame"><img class="diag-in" src="${drawingSrc(item.id)}" alt="${item.name}" /></div>`
            : `<div class="photo-frame"><span class="tiny">Reveal to fade it in</span></div>`)
          : `<div class="photo-frame"><img src="${photoSrc(item.id)}" alt="${state.revealed ? item.name : "Unnamed apparatus"}" /></div>`}
      </div>
      <div>
        <p class="caption">${item.diagram ? "Photograph" : "No 2D diagram in the notes"}</p>
        ${item.diagram
          ? `<div class="photo-frame"><img src="${photoSrc(item.id)}" alt="${state.revealed ? item.name : "Unnamed apparatus"}" /></div>`
          : `<div class="photo-frame"><span class="tiny">This piece is shown as a photo from the notes.</span></div>`}
      </div>
    </div>
    <div style="margin-top:14px">
      ${state.revealed
        ? `<p class="exam-kicker">Model answer</p>
           <p class="exam-line"><strong>${item.name}</strong> — ${item.exam}</p>
           <button class="btn btn-ghost" id="hide-name">Hide</button>
           <button class="btn btn-ghost" id="learn-fresh">New mix</button>`
        : `<button class="btn btn-primary" id="reveal-name">Reveal model answer</button>
           <button class="btn btn-ghost" id="learn-fresh">New mix</button>`}
    </div>
  `;
  const fillChips = (nodeId, list) => {
    const node = document.getElementById(nodeId);
    list.forEach((a) => {
      const btn = document.createElement("button");
      btn.textContent = a.name;
      btn.className = a.id === state.learnId ? "on" : "";
      btn.addEventListener("click", () => {
        state.learnId = a.id;
        state.revealed = false;
        renderLearn();
      });
      node.appendChild(btn);
    });
  };
  fillChips("learn-core", state.learnCore);
  fillChips("learn-extra", state.learnExtra);
  const reveal = document.getElementById("reveal-name");
  const hide = document.getElementById("hide-name");
  if (reveal) reveal.addEventListener("click", () => {
    state.revealed = true;
    state.learnSeen[item.id] = true;
    tickClear("learn");
    renderLearn();
  });
  if (hide) hide.addEventListener("click", () => { state.revealed = false; renderLearn(); });
  const fresh = document.getElementById("learn-fresh");
  if (fresh) fresh.addEventListener("click", () => show("learn", true));
}

function renderWall() {
  const tab = state.wallTab || "all";
  const items = WALL_ITEMS.filter((row) => tab === "all" || row.tag === tab);
  const tabs = WALL_TABS.map((row) => `<button type="button" class="wall-tab${row.id === tab ? " on" : ""}" data-tab="${row.id}">${row.label}</button>`).join("");
  document.getElementById("wall").innerHTML = `
    <div class="toolbar">
      <div>
        <h2>Notes Wall</h2>
        <p class="lead">Charts and set-up photos from your notes. Open Glassware, Heating, and Set-ups to complete this station.</p>
      </div>
      ${stationBadge("wall")}
    </div>
    ${badgePopHtml("wall")}
    <div class="wall-tabs">${tabs}</div>
    ${items.map((row) => `<p class="caption">${row.title}</p><img class="wall-img" src="${row.src}" alt="${row.title}" />`).join("")}
  `;
  document.querySelectorAll(".wall-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.wallTab = btn.dataset.tab;
      if (state.wallTab !== "all") state.wallSeen[state.wallTab] = true;
      tickClear("wall");
      renderWall();
    });
  });
}

function renderScramble() {
  const root = document.getElementById("scramble");
  if (!root) return;
  if (!state.scrambleDeck.length) remix("scramble");
  if (state.scramblePhase === "done") {
    const timedOut = state.scrambleOver;
    const used = formatClock(state.scrambleUsed || state.scrambleElapsed);
    const scoreLine = `Score: <strong>${state.scrambleScore} / ${SCRAMBLE_N}</strong>`;
    root.innerHTML = `
      <div class="done-card">
        ${stationBadge("scramble")}
        <h2>Scramble</h2>
        <p class="exam-line">${timedOut
          ? `Time is up after ${used}. ${scoreLine}`
          : `Well done — you have finished the exercise. Time used: <strong>${used}</strong>. ${scoreLine}`}</p>
        <p class="lead">${timedOut
          ? "Unanswered questions do not score. Try a new scramble when you are ready."
          : "A new scramble mixes a different 10 questions."}</p>
        <div class="toolbar">
          <button class="btn btn-primary" data-go-home="1">Home</button>
          <button class="btn btn-ghost" data-fresh="scramble">New scramble</button>
        </div>
      </div>
    `;
    root.querySelector("[data-go-home]").addEventListener("click", () => show("home"));
    root.querySelector("[data-fresh]").addEventListener("click", () => show("scramble", true));
    return;
  }
  const q = state.scrambleDeck[state.scrambleI];
  const last = state.scrambleI === state.scrambleDeck.length - 1;
  const locked = Boolean(state.scrambleChecked);
  const flipped = locked && Boolean(state.scramblePick);
  const picked = q.options.find((opt) => opt.label === state.scramblePick);
  const answerOpt = q.options.find((opt) => opt.ok);
  const options = q.options.map((opt, i) => {
    return `<button class="choice" data-label="${opt.label}"><span class="keycap">${i + 1}</span>${scrambleThumb(opt)}<span>${opt.label}</span></button>`;
  }).join("");
  let stage = "";
  if (flipped && picked) {
    const ok = Boolean(picked.ok);
    const trap = ok ? "" : trapHtml(picked.trap || q.trap || "");
    const failLine = !ok && picked.fail ? `<p>${picked.fail}</p>` : "";
    const front = `${scrambleThumb(picked)}<strong>${picked.label}</strong>`;
    const back = `<div class="fb-note">${state.fb ? state.fb.meme : ""}</div><strong>${state.fb ? state.fb.title : ""}</strong><p>${state.fb ? state.fb.body : ""}</p>
      ${failLine}
      <p class="exam-kicker">Model answer</p>
      <p>${answerOpt && answerOpt.why ? answerOpt.why : q.model}</p>
      ${trap}
      ${ok && answerOpt ? diagBlock(answerOpt.diagram || itemSrc(answerOpt.id), q.answer) : ""}`;
    stage = flipPanel(ok, front, back);
  } else {
    stage = `${keyHint(q.options.length)}<div class="choices">${options}</div>`;
  }
  root.innerHTML = `
    <div class="toolbar">
      <div>
        <h2>Scramble</h2>
        <p class="lead">Timed test · ${q.source}. The clock counts up. One attempt per question. Press 1–4.</p>
      </div>
      <div class="score-wrap">
        <div id="scramble-clock" class="scramble-clock${state.scrambleElapsed >= SCRAMBLE_SECONDS - 60 ? " is-low" : ""}">${formatClock(state.scrambleElapsed)}</div>
        ${stationBadge("scramble")}
        <div class="score">${state.scrambleScore} / ${SCRAMBLE_N}</div>
      </div>
    </div>
    ${badgePopHtml("scramble")}
    <p class="tiny">${state.scrambleI + 1} / ${SCRAMBLE_N}</p>
    <p class="exam-kicker">Question</p>
    <p class="exam-line">${q.prompt}</p>
    ${q.photo && !flipped ? `${q.caption ? `<p class="caption">${q.caption}</p>` : ""}<div class="photo-frame slim"><img src="${q.photo}" alt="" /></div>` : ""}
    ${stage}
    <div class="toolbar" style="margin-top:16px">
      <div>
        <button class="btn btn-ghost" id="scramble-back" ${state.scrambleI === 0 ? "disabled" : ""}>Back</button>
        <button class="btn btn-primary" id="scramble-next" ${!locked ? "disabled" : ""}>${last ? "Finish" : "Next"}</button>
      </div>
      <button class="btn btn-ghost" id="scramble-reset">New scramble</button>
    </div>
  `;
  if (flipped) armFlip(root);
  root.querySelectorAll(".choice").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (locked || state.scramblePhase === "done") return;
      state.scramblePick = btn.dataset.label;
      const opt = q.options.find((row) => row.label === state.scramblePick);
      const ok = Boolean(opt && opt.ok);
      state.scramblePicks[q.key] = state.scramblePick;
      award(state.scrambleDone, q.key, ok, "scrambleScore");
      setFb(ok ? true : "wrong", "");
      state.scrambleChecked = true;
      renderScramble();
    });
  });
  document.getElementById("scramble-back").addEventListener("click", () => {
    state.scrambleI -= 1;
    const prev = state.scrambleDeck[state.scrambleI];
    state.scramblePick = state.scramblePicks[prev.key] || "";
    state.scrambleChecked = Object.prototype.hasOwnProperty.call(state.scrambleDone, prev.key);
    state.fb = null;
    renderScramble();
  });
  document.getElementById("scramble-next").addEventListener("click", () => {
    if (!last) {
      state.scrambleI += 1;
      const nxt = state.scrambleDeck[state.scrambleI];
      state.scramblePick = state.scramblePicks[nxt.key] || "";
      state.scrambleChecked = Object.prototype.hasOwnProperty.call(state.scrambleDone, nxt.key);
      state.fb = null;
      renderScramble();
    } else {
      finishScramble(false);
    }
  });
  document.getElementById("scramble-reset").addEventListener("click", () => show("scramble", true));
}

function feedbackBox() {
  const fb = state.fb;
  if (!fb) return "";
  return `<div class="feedback ${fb.cls}">${fb.meme ? `<div class="fb-note">${fb.meme}</div>` : ""}<strong>${fb.title}</strong><p>${fb.body}</p>${fb.extra ? `<div class="explain">${fb.extra}</div>` : ""}</div>`;
}

function modelFn(name) {
  if (name === "Gas syringe") return "Collect and measure the volume of a gas";
  if (name === "Tongs" || name === "Tongs / crucible tongs") return "Pick up a hot evaporating dish";
  if (name === "Bare hands") return "(not an apparatus in Q.5)";
  if (name === "Burette") return "Accurate measurements of liquid volumes (notes §M)";
  if (name === "Test tube / beaker") return "Mix solutions for observing any changes";
  if (name === "Beaker on tripod and wire gauze") return "Boiling 200 cm³ of water — A, C, D, E, F";
  if (name === "Test tube on a holder") return "Heating a few cm³ of water — B, C, F, G";
  if (name === "Crucible on a pipe-clay triangle") return "Contains a solid which is heated strongly; pipeclay triangle supports a crucible on tripod";
  if (name === "Evaporating dish on wire gauze") return "Contains a solution which is to be evaporated to dryness; wire gauze supports a dish on a tripod";
  if (name === "Close the air hole, light a match at the barrel, then turn on the gas") return "Close the air hole first. Put a lighted match near the top of the barrel. Then turn on the gas tap.";
  if (name === "Open the air hole, then turn on the gas") return "Notes: close the air hole first, then light, then open the air hole slowly.";
  if (name === "Turn on the gas, then look for a match") return "Notes: match at the barrel, then turn on the gas tap.";
  const item = APPARATUS.find((a) => a.name === name);
  return item ? item.exam : "";
}

function trapLine(picked, answer) {
  const key = `${answer}|${picked}`;
  const rev = `${picked}|${answer}`;
  return NAME_TRAPS[key] || NAME_TRAPS[rev] || "";
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

function nameKey(q) {
  return q.key || q.id;
}

function pictureSrc(id, kind) {
  if (kind === "diagram") return drawingSrc(id);
  if (kind === "photo") return photoSrc(id);
  const preferred = itemSrc(id);
  if (preferred) return preferred;
  return photoSrc(id);
}

function renderName() {
  if (!state.nameDeck.length) remix("name");
  const root = document.getElementById("name");
  if (state.namePhase === "done") {
    renderStationDone(root, "name", "Name That Piece");
    return;
  }
  const cur = currentQuiz("name");
  const q = cur.q;
  const item = byId(q.id);
  const locked = cur.recap
    ? state.nameChecked && state.namePick === item.name
    : state.nameChecked && state.namePick === item.name;
  const flipped = Boolean(state.nameChecked && state.namePick);
  const options = q.options.map((label, i) => {
    return `<button class="choice" data-label="${label}"><span class="keycap">${i + 1}</span><span>${label}</span></button>`;
  }).join("");
  let stage = "";
  if (flipped) {
    const ok = state.namePick === item.name;
    const trap = ok ? "" : trapHtml(trapLine(state.namePick, item.name));
    const front = `<strong>${state.namePick}</strong>`;
    const back = `<div class="fb-note">${state.fb ? state.fb.meme : ""}</div><strong>${state.fb ? state.fb.title : ""}</strong><p>${state.fb ? state.fb.body : ""}</p>
      <p class="exam-kicker">Model answer</p>
      <p><strong>${item.name}</strong> — ${item.exam}</p>
      ${ok ? "" : `<p>You chose <strong>${state.namePick}</strong>${modelFn(state.namePick) ? ` — ${modelFn(state.namePick)}` : ""}.</p>`}
      ${trap}
      ${ok ? diagBlock(itemSrc(item.id), item.name) : ""}`;
    stage = flipPanel(ok, front, back);
  } else {
    stage = `${keyHint(q.options.length)}<div class="choices">${options}</div>`;
  }
  root.innerHTML = `
    <div class="toolbar">
      <div>
        <h2>Name That Piece</h2>
        <p class="lead">${cur.recap ? "Recap — questions you missed." : (usesDiagram(q.id) ? "2D diagram" : "Photograph") + " — choose the correct name. Press 1–4."}</p>
      </div>
      <div class="score-wrap">${stationBadge("name")}<div class="score">${state.nameScore} / ${state.nameDeck.length}</div></div>
    </div>
    ${badgePopHtml("name")}
    ${cur.recap ? `<p class="recap-banner">Recap ${cur.i + 1} / ${cur.deck.length}</p>` : `<p class="tiny">${cur.i + 1} / ${cur.deck.length}</p>`}
    ${flipped ? "" : `<div class="photo-frame"><img src="${pictureSrc(q.id, q.kind)}" alt="" /></div>`}
    ${stage}
    <div class="toolbar" style="margin-top:16px">
      <div>
        ${flipped && !locked ? `<button class="btn btn-primary" id="name-again">Try again</button>` : ""}
        <button class="btn btn-ghost" id="name-back" ${cur.i === 0 ? "disabled" : ""}>Back</button>
        <button class="btn btn-primary" id="name-next" ${!locked ? "disabled" : ""}>${nextLabel("name", cur.last, locked)}</button>
      </div>
      <button class="btn btn-ghost" id="name-reset">New mix</button>
    </div>
  `;
  if (flipped) armFlip(root);
  root.querySelectorAll(".choice").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (locked) return;
      state.namePick = btn.dataset.label;
      const ok = state.namePick === item.name;
      award(state.nameDone, nameKey(q), ok, "nameScore");
      setFb(ok ? true : "wrong", "");
      state.nameChecked = true;
      renderName();
    });
  });
  const again = document.getElementById("name-again");
  if (again) {
    again.addEventListener("click", () => {
      state.namePick = "";
      state.nameChecked = false;
      state.fb = null;
      renderName();
    });
  }
  document.getElementById("name-back").addEventListener("click", () => {
    state[cur.iKey] -= 1;
    state.namePick = "";
    state.fb = null;
    if (cur.recap) {
      state.nameChecked = false;
    } else {
      const prev = currentQuiz("name");
      state.nameChecked = Boolean(state.nameDone[nameKey(prev.q)]);
      if (state.nameChecked) state.namePick = byId(prev.q.id).name;
    }
    renderName();
  });
  document.getElementById("name-next").addEventListener("click", () => {
    if (!cur.last) {
      state[cur.iKey] += 1;
      state.namePick = "";
      state.fb = null;
      if (cur.recap) {
        state.nameChecked = false;
      } else {
        const nxt = currentQuiz("name");
        state.nameChecked = Boolean(state.nameDone[nameKey(nxt.q)]);
        if (state.nameChecked) state.namePick = byId(nxt.q.id).name;
      }
    } else {
      finishOrRecap("name");
    }
    renderName();
  });
  document.getElementById("name-reset").addEventListener("click", () => show("name", true));
}

function jobThumb(opt) {
  if (opt.diagram) return `<img src="${opt.diagram}" alt="" />`;
  return itemImg(opt.id);
}

function jobExplain(q, pick, ok) {
  const help = JOB_HELP[q.n] || { trap: "" };
  if (ok) {
    return `<p class="exam-kicker">Model answer</p><p><strong>${q.answer}</strong> — ${q.exam}</p>`;
  }
  const pickedFn = modelFn(pick);
  return `<p>You chose <strong>${pick}</strong>${pickedFn ? ` — ${pickedFn}` : ""}.</p>
    <p class="exam-kicker">Model answer</p>
    <p><strong>${q.answer}</strong> — ${q.exam}</p>
    ${trapHtml(help.trap)}`;
}

function renderJob() {
  if (!state.jobDeck.length) remix("job");
  const root = document.getElementById("job");
  if (state.jobPhase === "done") {
    renderStationDone(root, "job", "What's It For?");
    return;
  }
  const cur = currentQuiz("job");
  const q = cur.q;
  const locked = state.jobChecked && state.jobPick === q.answer;
  const flipped = Boolean(state.jobChecked && state.jobPick);
  const pickedOpt = q.options.find((opt) => opt.label === state.jobPick);
  const answerOpt = q.options.find((opt) => opt.label === q.answer);
  const options = q.options.map((opt, i) => {
    return `<button class="choice" data-label="${opt.label}"><span class="keycap">${i + 1}</span>${jobThumb(opt)}<span>${opt.label}</span></button>`;
  }).join("");
  let stage = "";
  if (flipped && pickedOpt) {
    const ok = state.jobPick === q.answer;
    const front = `${jobThumb(pickedOpt)}<strong>${pickedOpt.label}</strong>`;
    const backDiag = ok ? diagBlock(answerOpt && (answerOpt.diagram || itemSrc(answerOpt.id)), q.answer) : "";
    const back = `<div class="fb-note">${state.fb ? state.fb.meme : (ok ? pickOne(WIN_MEMES) : pickOne(MISS_MEMES))}</div><strong>${state.fb ? state.fb.title : (ok ? "Correct" : "Have another go")}</strong><p>${state.fb ? state.fb.body : ""}</p><div class="explain">${jobExplain(q, state.jobPick, ok)}</div>${backDiag}`;
    stage = flipPanel(ok, front, back);
  } else {
    stage = `${keyHint(q.options.length)}<div class="choices">${options}</div>`;
  }
  root.innerHTML = `
    <div class="toolbar">
      <div>
        <h2>What's It For?</h2>
        <p class="lead">${cur.recap ? "Recap — questions you missed." : "Topic 01 Q.5. Choose the apparatus, then check the model answer. Press 1–4."}</p>
      </div>
      <div class="score-wrap">${stationBadge("job")}<div class="score">${state.jobScore} / ${state.jobDeck.length}</div></div>
    </div>
    ${badgePopHtml("job")}
    ${cur.recap ? `<p class="recap-banner">Recap ${cur.i + 1} / ${cur.deck.length}</p>` : `<p class="tiny">${cur.i + 1} / ${cur.deck.length}</p>`}
    <p class="exam-kicker">Model answer</p>
    <p class="exam-line">${q.exam}</p>
    ${stage}
    <div class="toolbar" style="margin-top:16px">
      <div>
        ${flipped && !locked ? `<button class="btn btn-primary" id="job-again">Try again</button>` : ""}
        <button class="btn btn-ghost" id="job-back" ${cur.i === 0 ? "disabled" : ""}>Back</button>
        <button class="btn btn-primary" id="job-next" ${!locked ? "disabled" : ""}>${nextLabel("job", cur.last, locked)}</button>
      </div>
      <button class="btn btn-ghost" id="job-reset">New mix</button>
    </div>
  `;
  if (flipped) armFlip(root);
  root.querySelectorAll(".choice").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (locked) return;
      state.jobPick = btn.dataset.label;
      const ok = state.jobPick === q.answer;
      award(state.jobDone, q.n, ok, "jobScore");
      setFb(ok ? true : "wrong", "");
      state.jobChecked = true;
      renderJob();
    });
  });
  const again = document.getElementById("job-again");
  if (again) {
    again.addEventListener("click", () => {
      state.jobPick = "";
      state.jobChecked = false;
      state.fb = null;
      renderJob();
    });
  }
  document.getElementById("job-back").addEventListener("click", () => {
    state[cur.iKey] -= 1;
    state.jobPick = "";
    state.fb = null;
    if (cur.recap) {
      state.jobChecked = false;
    } else {
      const prev = currentQuiz("job");
      state.jobChecked = Boolean(state.jobDone[prev.q.n]);
      if (state.jobChecked) state.jobPick = prev.q.answer;
    }
    renderJob();
  });
  document.getElementById("job-next").addEventListener("click", () => {
    if (!cur.last) {
      state[cur.iKey] += 1;
      state.jobPick = "";
      state.fb = null;
      if (cur.recap) {
        state.jobChecked = false;
      } else {
        const nxt = currentQuiz("job");
        state.jobChecked = Boolean(state.jobDone[nxt.q.n]);
        if (state.jobChecked) state.jobPick = nxt.q.answer;
      }
    } else {
      finishOrRecap("job");
    }
    renderJob();
  });
  document.getElementById("job-reset").addEventListener("click", () => show("job", true));
}

function buildStats(q) {
  const nameNeed = q.slots.length;
  const diagNeed = q.slots.filter((slot) => trayHasDiagram(slot.answer)).length;
  const nameGot = q.slots.filter((slot) => state.buildNames[slot.id] === slot.answer).length;
  const diagGot = q.slots.filter((slot) => trayHasDiagram(slot.answer) && state.buildDraws[slot.id] === slot.answer).length;
  const filledNames = q.slots.every((slot) => state.buildNames[slot.id]);
  const filledDraws = q.slots.every((slot) => !trayHasDiagram(slot.answer) || state.buildDraws[slot.id]);
  return {
    nameNeed,
    diagNeed,
    nameGot,
    diagGot,
    total: nameNeed + diagNeed,
    got: nameGot + diagGot,
    filled: filledNames && filledDraws,
    allRight: nameGot === nameNeed && diagGot === diagNeed,
  };
}

function placeBuild(slotId, type, id) {
  const bag = type === "name" ? state.buildNames : state.buildDraws;
  Object.keys(bag).forEach((key) => {
    if (bag[key] === id) delete bag[key];
  });
  bag[slotId] = id;
  state.buildDrag = null;
  state.buildChecked = false;
}

function dropClass(checked, placed, answer) {
  if (!checked) return placed ? " filled" : "";
  if (placed === answer) return " filled right";
  if (placed) return " filled wrong";
  return "";
}

function setupImageSrc(q) {
  if (q.diagram) return q.diagram;
  return q.photo || "";
}

function renderBuild() {
  if (!state.buildDeck.length) remix("build");
  const root = document.getElementById("build");
  if (state.buildPhase === "done") {
    renderStationDone(root, "build", "Build the Bench");
    return;
  }
  const cur = currentQuiz("build");
  const q = cur.q;
  const buildKey = (cur.recap ? "r" : "m") + "-" + cur.i;
  if (buildKey !== state._buildFor) {
    state.buildNames = {};
    state.buildDraws = {};
    state.buildDrag = null;
    state.buildChecked = false;
    state._buildFor = buildKey;
    state._nameOrder = shuffle(q.tray.slice());
    state._drawOrder = shuffle(q.tray.filter((id) => trayHasDiagram(id)));
    state._photoOrder = shuffle(q.slots.slice());
    state.fb = null;
  }
  const stats = buildStats(q);
  const locked = state.buildChecked && stats.allRight;
  let feedback = "";
  if (state.buildChecked) feedback = feedbackBox();

  const slotCards = q.slots.map((slot) => {
    const nameId = state.buildNames[slot.id];
    const drawId = state.buildDraws[slot.id];
    const hasDraw = trayHasDiagram(slot.answer);
    const nameDrop = nameId
      ? `<span class="dropped-name">${trayName(nameId)}</span>`
      : `<span class="empty">Drop the name here</span>`;
    const drawDrop = !hasDraw
      ? `<span class="tiny">No exam diagram for this piece — name only</span>`
      : drawId
        ? `<img src="${drawingSrc(drawId)}" alt="Exam diagram" />`
        : `<span class="empty">Drop the diagram here</span>`;
    return `
      <div class="setup-slot">
        <em>${slot.label}</em>
        <div class="drop drop-lg name-drop${dropClass(state.buildChecked, nameId, slot.answer)}" data-slot="${slot.id}" data-kind="name">${nameDrop}</div>
        <div class="drop drop-lg diag-drop${dropClass(state.buildChecked, drawId, slot.answer)}${hasDraw ? "" : " skipped"}" data-slot="${slot.id}" data-kind="diagram">${drawDrop}</div>
      </div>`;
  }).join("");

  const names = state._nameOrder.map((id) => {
    const used = Object.values(state.buildNames).includes(id);
    const selected = state.buildDrag && state.buildDrag.type === "name" && state.buildDrag.id === id ? " selected" : "";
    return `<button class="drag-chip big${selected}${used ? " used" : ""}" draggable="true" data-kind="name" data-id="${id}">${trayName(id)}</button>`;
  }).join("");

  const diagrams = state._drawOrder.map((id) => {
    const used = Object.values(state.buildDraws).includes(id);
    const selected = state.buildDrag && state.buildDrag.type === "diagram" && state.buildDrag.id === id ? " selected" : "";
    return `<button class="drag-diag big${selected}${used ? " used" : ""}" draggable="true" data-kind="diagram" data-id="${id}">
      <img src="${drawingSrc(id)}" alt="Exam diagram" />
    </button>`;
  }).join("");

  const setupSrc = setupImageSrc(q);
  const setupIsDiagram = Boolean(q.diagram || (q.photo && q.photo.indexOf("diagram-") !== -1));
  const matchPanel = `
    <p class="caption">${setupIsDiagram ? "2D diagram from the notes" : "Set-up photo from the notes"} — drop onto the large slots (W, X, Y… match the labels)</p>
    <div class="photo-frame setup-hero"><img src="${setupSrc}" alt="${q.title}" /></div>
    <div class="setup-slots">${slotCards}</div>`;

  root.innerHTML = `
    <div class="toolbar">
      <div>
        <h2>Build the Bench</h2>
        <p class="lead">${cur.recap ? "Recap — set-ups you missed." : "Place names and 2D diagrams onto the set-up from the notes."}</p>
      </div>
      <div class="score-wrap">${stationBadge("build")}<div class="score">${state.buildScore} / ${state.buildDeck.length}</div></div>
    </div>
    ${badgePopHtml("build")}
    ${cur.recap ? `<p class="recap-banner">Recap ${cur.i + 1} / ${cur.deck.length} · ${q.title}</p>` : `<p class="tiny">Set-up ${cur.i + 1} of ${cur.deck.length} · ${q.title}</p>`}
    <p class="exam-kicker">Model answer</p>
    <p class="exam-line">${q.exam}</p>
    ${matchPanel}
    <p class="caption">Names — drag onto a Name slot</p>
    <div class="chips drag-tray">${names}</div>
    <p class="caption">Unlabelled 2D diagrams — drag onto a Diagram slot</p>
    <div class="grid pack-grid drag-tray">${diagrams}</div>
    ${feedback}
    <div class="toolbar" style="margin-top:16px">
      <div>
        <button class="btn btn-primary" id="build-check" ${!stats.filled || locked ? "disabled" : ""}>Check the set-up</button>
        <button class="btn btn-ghost" id="build-keep" ${!state.buildChecked || locked || stats.got === 0 ? "disabled" : ""}>Keep the right ones and try again</button>
        <button class="btn btn-ghost" id="build-back" ${cur.i === 0 ? "disabled" : ""}>Back</button>
        <button class="btn btn-primary" id="build-next" ${!locked ? "disabled" : ""}>${nextLabel("build", cur.last, locked)}</button>
      </div>
      <button class="btn btn-ghost" id="build-reset">New mix</button>
    </div>
  `;

  const bindDrag = (node) => {
    node.addEventListener("dragstart", (event) => {
      if (locked) return;
      const type = node.dataset.kind;
      const id = node.dataset.id;
      state.buildDrag = { type, id };
      event.dataTransfer.setData("text/plain", type + ":" + id);
      event.dataTransfer.effectAllowed = "move";
    });
    node.addEventListener("click", () => {
      if (locked) return;
      const type = node.dataset.kind;
      const id = node.dataset.id;
      if (state.buildDrag && state.buildDrag.type === type && state.buildDrag.id === id) {
        state.buildDrag = null;
      } else {
        state.buildDrag = { type, id };
      }
      renderBuild();
    });
  };
  root.querySelectorAll("[data-kind][data-id]").forEach(bindDrag);

  root.querySelectorAll(".drop").forEach((zone) => {
    const type = zone.dataset.kind;
    const slot = zone.dataset.slot;
    if (zone.classList.contains("skipped")) return;
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("over");
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("over"));
    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      zone.classList.remove("over");
      if (locked) return;
      const raw = event.dataTransfer.getData("text/plain") || "";
      const parts = raw.split(":");
      const dropType = parts[0];
      const id = parts[1];
      if (dropType !== type || !id) return;
      placeBuild(slot, type, id);
      renderBuild();
    });
    zone.addEventListener("click", () => {
      if (locked) return;
      if (state.buildDrag && state.buildDrag.type === type) {
        placeBuild(slot, type, state.buildDrag.id);
        renderBuild();
        return;
      }
      if (!state.buildChecked) {
        if (type === "name" && state.buildNames[slot]) {
          delete state.buildNames[slot];
          renderBuild();
        } else if (type === "diagram" && state.buildDraws[slot]) {
          delete state.buildDraws[slot];
          renderBuild();
        }
      }
    });
  });

  document.getElementById("build-check").addEventListener("click", () => {
    const now = buildStats(q);
    if (now.allRight) {
      award(state.buildDone, q.id, true, "buildScore");
      setFb(true, q.mark);
    } else if (now.got > 0) {
      award(state.buildDone, q.id, false, "buildScore");
      setFb("partial", `Matched <strong>${now.nameGot}</strong>/${now.nameNeed} names and <strong>${now.diagGot}</strong>/${now.diagNeed} diagrams. Keep the green slots.`);
    } else {
      award(state.buildDone, q.id, false, "buildScore");
      setFb("wrong", q.mark);
    }
    state.buildChecked = true;
    renderBuild();
  });
  document.getElementById("build-keep").addEventListener("click", () => {
    q.slots.forEach((slot) => {
      if (state.buildNames[slot.id] !== slot.answer) delete state.buildNames[slot.id];
      if (trayHasDiagram(slot.answer) && state.buildDraws[slot.id] !== slot.answer) delete state.buildDraws[slot.id];
    });
    state.buildChecked = false;
    state.buildDrag = null;
    state.fb = {
      cls: "partial praise",
      title: "Those green ones stay — nice work",
      body: "Now finish the empty slots. You have already shown you can do this.",
      extra: "",
    };
    renderBuild();
  });
  document.getElementById("build-back").addEventListener("click", () => {
    state[cur.iKey] -= 1;
    state._buildFor = null;
    renderBuild();
  });
  document.getElementById("build-next").addEventListener("click", () => {
    if (!cur.last) {
      state[cur.iKey] += 1;
      state._buildFor = null;
    } else {
      finishOrRecap("build");
    }
    renderBuild();
  });
  document.getElementById("build-reset").addEventListener("click", () => show("build", true));
}

function treeThumb(opt) {
  return itemImg(opt.id);
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
    return `<button class="choice tree-choice" data-i="${i}"><span class="keycap">${i + 1}</span>${thumb}<span>${opt.label}</span></button>`;
  }).join("");
  let stage = "";
  if (state.treeFail) {
    const opt = state.treeFail;
    const front = `<strong>${opt.label}</strong>`;
    const back = `<div class="fb-note">${pickOne(MISS_MEMES)}</div><strong>${pickOne(MISS_TITLES)}</strong>
      <p class="exam-kicker">Notes / model answer</p>
      <p>${opt.fail}</p>
      ${trapHtml(opt.trap || "")}`;
    stage = flipPanel(false, front, back);
  } else if (locked) {
    const win = q.options.find((o) => o.ok);
    const front = `<strong>${win.label}</strong>`;
    const back = `<div class="fb-note">${state.fb ? state.fb.meme : ""}</div><strong>${state.fb ? state.fb.title : ""}</strong><p>${state.fb ? state.fb.body : ""}</p>
      <p class="exam-kicker">Model answer</p>
      <p>${win.why}</p>
      ${win.id ? diagBlock(itemSrc(win.id), win.label) : ""}`;
    stage = flipPanel(true, front, back);
  } else {
    stage = `${keyHint(q.options.length)}<div class="choices">${options}</div>`;
  }
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
    ${q.scene && !flipped ? `<p class="caption">${q.sceneCaption || ""}</p><div class="photo-frame slim"><img src="${q.scene}" alt="" /></div>` : ""}
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
  root.querySelectorAll(".tree-choice").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (locked) return;
      const opt = q.options[Number(btn.dataset.i)];
      if (opt.ok) {
        if (cur.recap) state.treeRecapDone[q.id] = true;
        award(state.treeDone, q.id, true, "treeScore");
        setFb(true, "");
        state.treeFail = null;
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
    renderTree();
  });
  document.getElementById("tree-next").addEventListener("click", () => {
    if (!cur.last) {
      state[cur.iKey] += 1;
      state.treeFail = null;
      state.fb = null;
    } else {
      finishOrRecap("tree");
    }
    renderTree();
  });
  document.getElementById("tree-reset").addEventListener("click", () => show("tree", true));
}

function renderFind() {
  if (!state.findDeck.length) remix("find");
  const root = document.getElementById("find");
  if (state.findPhase === "done") {
    renderStationDone(root, "find", "Spot It");
    return;
  }
  const cur = currentQuiz("find");
  const q = cur.q;
  const findKey = (cur.recap ? "r" : "m") + "-" + cur.i;
  if (state._findFor !== findKey) {
    state._findFor = findKey;
    state._findOrder = shuffle(q.ids.slice());
  }
  const item = byId(q.id);
  const locked = state.findChecked && state.findPick === q.id;
  const flipped = Boolean(state.findChecked && state.findPick);
  const kindLabel = q.kind === "diagram" ? "2D diagram" : "Photo";
  const kindNoun = q.kind === "diagram" ? "2D diagram" : "photograph";
  const options = state._findOrder.map((id, i) => {
    return `<button class="choice find-choice" data-id="${id}"><span class="keycap">${i + 1}</span><img src="${pictureSrc(id, q.kind)}" alt="" /></button>`;
  }).join("");
  let stage = "";
  if (flipped) {
    const ok = state.findPick === q.id;
    const picked = byId(state.findPick);
    const trap = ok ? "" : trapHtml(trapLine(picked ? picked.name : "", item.name));
    const extraDiag = ok && q.kind === "photo" ? diagBlock(drawingSrc(item.id), item.name) : "";
    const front = `<img src="${pictureSrc(state.findPick, q.kind)}" alt="" />`;
    const back = `<div class="fb-note">${state.fb ? state.fb.meme : ""}</div><strong>${state.fb ? state.fb.title : ""}</strong><p>${state.fb ? state.fb.body : ""}</p>
      <p class="exam-kicker">Model answer</p>
      <p><strong>${item.name}</strong> — ${item.exam}</p>
      ${ok ? "" : `<p>You chose <strong>${picked ? picked.name : ""}</strong>${picked ? ` — ${picked.exam}` : ""}.</p>`}
      ${trap}
      ${extraDiag}`;
    stage = flipPanel(ok, front, back);
  } else {
    stage = `${findZoomHtml()}${keyHint(state._findOrder.length)}<div class="choices">${options}</div>`;
  }
  root.innerHTML = `
    <div class="toolbar">
      <div>
        <h2>Spot It</h2>
        <p class="lead">${cur.recap ? "Recap — questions you missed." : "Find the matching " + kindNoun + ". Press 1–4."}</p>
      </div>
      <div class="score-wrap">${stationBadge("find")}<div class="score">${state.findScore} / ${state.findDeck.length}</div></div>
    </div>
    ${badgePopHtml("find")}
    ${cur.recap ? `<p class="recap-banner">Recap ${cur.i + 1} / ${cur.deck.length}</p>` : `<p class="tiny">${cur.i + 1} / ${cur.deck.length}</p>`}
    <p class="exam-kicker">Apparatus name <span class="kind-pill">${kindLabel}</span></p>
    <p class="exam-line">${item.name}</p>
    ${stage}
    <div class="toolbar" style="margin-top:16px">
      <div>
        ${flipped && !locked ? `<button class="btn btn-primary" id="find-again">Try again</button>` : ""}
        <button class="btn btn-ghost" id="find-back" ${cur.i === 0 ? "disabled" : ""}>Back</button>
        <button class="btn btn-primary" id="find-next" ${!locked ? "disabled" : ""}>${nextLabel("find", cur.last, locked)}</button>
      </div>
      <button class="btn btn-ghost" id="find-reset">New mix</button>
    </div>
  `;
  if (flipped) armFlip(root);
  bindFindZoom();
  root.querySelectorAll(".find-choice").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (locked) return;
      state.findPick = btn.dataset.id;
      const ok = state.findPick === q.id;
      award(state.findDone, q.key, ok, "findScore");
      setFb(ok ? true : "wrong", "");
      state.findChecked = true;
      renderFind();
    });
  });
  const again = document.getElementById("find-again");
  if (again) {
    again.addEventListener("click", () => {
      state.findPick = "";
      state.findChecked = false;
      state.fb = null;
      renderFind();
    });
  }
  document.getElementById("find-back").addEventListener("click", () => {
    state[cur.iKey] -= 1;
    state.findPick = "";
    state.fb = null;
    if (cur.recap) {
      state.findChecked = false;
    } else {
      const prev = currentQuiz("find");
      state.findChecked = Boolean(state.findDone[prev.q.key]);
      if (state.findChecked) state.findPick = prev.q.id;
    }
    renderFind();
  });
  document.getElementById("find-next").addEventListener("click", () => {
    if (!cur.last) {
      state[cur.iKey] += 1;
      state.findPick = "";
      state.fb = null;
      if (cur.recap) {
        state.findChecked = false;
      } else {
        const nxt = currentQuiz("find");
        state.findChecked = Boolean(state.findDone[nxt.q.key]);
        if (state.findChecked) state.findPick = nxt.q.id;
      }
    } else {
      finishOrRecap("find");
    }
    renderFind();
  });
  document.getElementById("find-reset").addEventListener("click", () => show("find", true));
}

loadProgress();
loadTheme();
loadPreviewSize();
buildNav();
show("find");
startFloaters();

const themeBtn = document.getElementById("theme-toggle");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    applyTheme(!document.documentElement.classList.contains("dark"));
  });
}

document.addEventListener("keydown", (event) => {
  if (event.target && /^(INPUT|TEXTAREA)$/.test(event.target.tagName)) return;
  if (event.key === "Enter" || event.key === " ") {
    const next = document.getElementById("find-next");
    if (next && !next.disabled) {
      event.preventDefault();
      next.click();
      return;
    }
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
