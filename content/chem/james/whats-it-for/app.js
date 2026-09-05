const VIEWS = [
  { id: "kit", label: "Look at the kit" },
  { id: "job", label: "Quiz" },
];

const state = {
  streak: 0,
  jobDeck: [],
  jobI: 0,
  jobPick: "",
  jobChecked: false,
  jobScore: 0,
  jobFirstTry: 0,
  jobRecovered: 0,
  jobDone: {},
  jobShowExam: false,
  jobHintOpen: false,
  jobZoom: null,
  fb: null,
  cleared: {},
  best: {},
  badgePop: "",
  jobMiss: [],
  jobPhase: "main",
  jobRecapDeck: [],
  jobRecapI: 0,
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
  if (id === "job") return JOB_Q.length;
  return 0;
}

function stationGot(id) {
  if (id === "job") return Math.max(state.best.job || 0, state.jobScore || 0);
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
  return `<div class="badge-pop">Badge unlocked — What's It For?</div>`;
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
    localStorage.setItem("chem-whats-it-for-v2-progress", JSON.stringify({
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
    localStorage.setItem("chem-whats-it-for-v2-theme", dark ? "dark" : "light");
  } catch (err) { /* offline file mode may block storage */ }
}

function loadTheme() {
  let dark = false;
  try {
    const saved = localStorage.getItem("chem-whats-it-for-v2-theme");
    if (saved === "dark") dark = true;
    else if (saved === "light") dark = false;
    else dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch (err) { /* ignore */ }
  applyTheme(dark);
}

function loadProgress() {
  try {
    const raw = localStorage.getItem("chem-whats-it-for-v2-progress");
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
  return `<div class="photo-frame slim"><img class="diag-in zoom-img" src="${src}" alt="${alt || ""}" data-zoom="${src}" /></div>`;
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

function remix(id) {
  state.fb = null;
  if (id === "job") {
    state.jobDeck = shuffle(JOB_Q.map((q) => ({ ...q, options: shuffle(q.options.slice()) })));
    state.jobI = 0;
    state.jobPick = "";
    state.jobChecked = false;
    state.jobScore = 0;
    state.jobFirstTry = 0;
    state.jobRecovered = 0;
    state.jobDone = {};
    state.jobMiss = [];
    state.jobPhase = "main";
    state.jobRecapDeck = [];
    state.jobRecapI = 0;
    state.jobHintOpen = false;
    state.jobZoom = null;
  }
}

function hasRun(id) {
  if (id === "job") return state.jobDeck.length > 0;
  return false;
}

function quizKey(id, q) {
  if (id === "job") return q.n;
  return q.id;
}

function cloneForRecap(id, q) {
  if (id === "job") return { ...q, options: shuffle(q.options.slice()) };
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
  if (id === "job") { state.jobPick = ""; state.jobChecked = false; state.jobHintOpen = false; }
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
  const first = state.jobFirstTry || 0;
  const recovered = state.jobRecovered || 0;
  root.innerHTML = `
    <div class="done-card">
      ${stationBadge(id)}
      <h2>${title}</h2>
      <p class="exam-line">First try: <strong>${first} / ${JOB_Q.length}</strong></p>
      <p class="exam-line">Needed another look: <strong>${recovered}</strong></p>
      <p class="lead">${n ? `Recap done. You retried ${n} question${n === 1 ? "" : "s"} you missed.` : "Clean run — no misses to recap."}</p>
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
  const quiz = id === "job";
  if (quiz && (fresh || !hasRun(id))) remix(id);
  if (id === "job") renderJob();
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

function zoomImg(src, alt) {
  if (!src) return "";
  return `<img class="zoom-img" src="${src}" alt="${alt || ""}" data-zoom="${src}" />`;
}

function piecePics(id, extraDiagram) {
  const pics = [];
  if (extraDiagram) pics.push({ src: extraDiagram, alt: "2D diagram" });
  if (!id) return pics;
  if (usesDiagram(id)) pics.push({ src: drawingSrc(id), alt: "2D diagram" });
  const item = byId(id);
  if (item && item.photo) pics.push({ src: photoSrc(id), alt: "Photograph" });
  return pics;
}

function kitCardHtml(row) {
  const pics = [];
  if (row.diagram) pics.push({ src: row.diagram, alt: row.name });
  if (row.ids && row.ids.length > 1) {
    row.ids.forEach((id) => {
      if (usesDiagram(id)) pics.push({ src: drawingSrc(id), alt: (byId(id) || {}).name || id });
    });
  } else {
    (row.ids || []).forEach((id) => {
      piecePics(id).forEach((pic) => pics.push(pic));
    });
  }
  const shown = pics.slice(0, 2);
  return `<article class="kit-card">
    <div class="kit-thumbs">${shown.map((pic) => zoomImg(pic.src, pic.alt)).join("")}</div>
    <h3>${row.name} <span class="zh">${row.nameZh || ""}</span></h3>
    <p class="kit-job">${row.job}</p>
    ${row.note ? `<p class="either">${row.note}</p>` : ""}
  </article>`;
}

function renderKit() {
  const root = document.getElementById("kit");
  if (!root) return;
  const inQuiz = hasRun("job") && state.jobPhase !== "done";
  root.innerHTML = `
    <div class="toolbar">
      <div>
        <h2>Look at the kit</h2>
        <p class="lead">Eight uses from Topic 01 Q.5. English and Chinese names. Then start the quiz.</p>
      </div>
      ${stationBadge("job")}
    </div>
    <div class="kit-grid">${KIT_ITEMS.map(kitCardHtml).join("")}</div>
    <div class="toolbar" style="margin-top:16px">
      <button class="btn btn-primary" id="kit-start">${inQuiz ? "Back to quiz" : "Start quiz"}</button>
    </div>
    ${lightboxHtml()}
  `;
  bindZoom(root);
  document.getElementById("kit-start").addEventListener("click", () => show("job"));
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

function award(done, key, ok, scoreKey) {
  const station = scoreKey.replace("Score", "");
  if (!ok) noteMiss(station, key);
  if (done[key] === true) return;
  if (ok) {
    if (station === "job") {
      if (done[key] === false || (state.jobMiss || []).includes(key)) state.jobRecovered += 1;
      else state.jobFirstTry += 1;
    }
    done[key] = true;
    state[scoreKey] += 1;
    tickClear(station);
  } else {
    done[key] = false;
  }
}

function jobThumb(opt) {
  const pics = [];
  if (opt.diagram) pics.push({ src: opt.diagram, alt: opt.label });
  const ids = [opt.id, opt.extraId].filter(Boolean);
  if (opt.extraId) {
    ids.forEach((id) => {
      if (usesDiagram(id)) pics.push({ src: drawingSrc(id), alt: (byId(id) || {}).name || id });
    });
  } else {
    ids.forEach((id) => {
      piecePics(id).forEach((pic) => pics.push(pic));
    });
  }
  const cls = opt.extraId ? "choice-thumbs pair" : "choice-thumbs";
  return `<div class="${cls}">${pics.map((pic) => zoomImg(pic.src, pic.alt)).join("")}</div>`;
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

function lightboxHtml() {
  if (!state.jobZoom) return "";
  return `<div class="lightbox" id="lightbox" role="dialog" aria-label="Enlarged picture"><img src="${state.jobZoom}" alt="" /><p class="tiny">Tap anywhere to close</p></div>`;
}

function bindZoom(root) {
  (root || document).querySelectorAll(".zoom-img").forEach((img) => {
    img.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      state.jobZoom = img.dataset.zoom || img.getAttribute("src");
      const view = state.view === "kit" ? renderKit : renderJob;
      view();
    });
  });
  const box = document.getElementById("lightbox");
  if (box) {
    box.addEventListener("click", () => {
      state.jobZoom = null;
      if (state.view === "kit") renderKit();
      else renderJob();
    });
  }
}

function choiceButton(opt, i, dimmed) {
  const zh = optionZh(opt);
  return `<button class="choice${dimmed ? " is-dim" : ""}" data-label="${opt.label}" ${dimmed ? "disabled" : ""}>
    <span class="keycap">${i + 1}</span>
    ${jobThumb(opt)}
    <span>${opt.label}</span>
    ${zh ? `<span class="zh">${zh}</span>` : ""}
    ${opt.note ? `<span class="either">${opt.note}</span>` : ""}
  </button>`;
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
  const options = q.options.map((opt, i) => choiceButton(opt, i, flipped)).join("");
  let stage = "";
  if (flipped && pickedOpt) {
    const ok = state.jobPick === q.answer;
    const front = `${jobThumb(pickedOpt)}<strong>${pickedOpt.label}</strong>`;
    const backDiag = ok ? diagBlock(answerOpt && (answerOpt.diagram || itemSrc(answerOpt.id)), q.answer) : "";
    const back = `<div class="fb-note">${state.fb ? state.fb.meme : (ok ? pickOne(WIN_MEMES) : pickOne(MISS_MEMES))}</div><strong>${state.fb ? state.fb.title : (ok ? "Correct" : "Have another go")}</strong><p>${state.fb ? state.fb.body : ""}</p><div class="explain">${jobExplain(q, state.jobPick, ok)}</div>${backDiag}`;
    stage = flipPanel(ok, front, back);
  }
  root.innerHTML = `
    <div class="toolbar">
      <div>
        <h2>What's It For?</h2>
        <p class="lead">${cur.recap ? "Recap — questions you missed." : "8 uses from Topic 01 Q.5. Choose the apparatus. Press 1–4."}</p>
      </div>
      <div class="score-wrap">${stationBadge("job")}<div class="score">${state.jobScore} / ${state.jobDeck.length}</div></div>
    </div>
    ${badgePopHtml("job")}
    ${cur.recap ? `<p class="recap-banner">Recap ${cur.i + 1} / ${cur.deck.length}</p>` : `<p class="tiny">${cur.i + 1} / ${cur.deck.length}</p>`}
    <p class="exam-kicker">Use</p>
    <p class="exam-line">${q.easy}</p>
    <button type="button" class="btn btn-ghost" id="job-exam">${state.jobShowExam ? "Hide exam wording" : "Show exam wording"}</button>
    ${state.jobShowExam ? `<p class="exam-paper">${q.exam}</p>` : ""}
    <div class="hint-row">
      <button type="button" class="btn btn-ghost" id="job-hint">${state.jobHintOpen ? "Hide hint" : "Hint"}</button>
    </div>
    ${state.jobHintOpen ? `<div class="hint-panel">${q.hint}</div>` : ""}
    ${stage}
    ${keyHint(q.options.length)}
    <div class="choices">${options}</div>
    <div class="toolbar" style="margin-top:16px">
      <div>
        ${flipped && !locked ? `<button class="btn btn-primary" id="job-again">Try again</button>` : ""}
        <button class="btn btn-ghost" id="job-back" ${cur.i === 0 ? "disabled" : ""}>Back</button>
        <button class="btn btn-primary" id="job-next" ${!locked ? "disabled" : ""}>${nextLabel("job", cur.last, locked)}</button>
      </div>
      <button class="btn btn-ghost" id="job-reset">New mix</button>
    </div>
    ${lightboxHtml()}
  `;
  if (flipped) armFlip(root);
  bindZoom(root);
  root.querySelectorAll(".choice").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (locked || flipped) return;
      state.jobPick = btn.dataset.label;
      const ok = state.jobPick === q.answer;
      award(state.jobDone, q.n, ok, "jobScore");
      setFb(ok ? true : "wrong", "");
      state.jobChecked = true;
      state.jobHintOpen = false;
      renderJob();
    });
  });
  document.getElementById("job-exam").addEventListener("click", () => {
    state.jobShowExam = !state.jobShowExam;
    renderJob();
  });
  document.getElementById("job-hint").addEventListener("click", () => {
    state.jobHintOpen = !state.jobHintOpen;
    renderJob();
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
    state.jobHintOpen = false;
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
      state.jobHintOpen = false;
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

loadProgress();
loadTheme();
buildNav();
show("kit");

const themeBtn = document.getElementById("theme-toggle");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    applyTheme(!document.documentElement.classList.contains("dark"));
  });
}

document.addEventListener("keydown", (event) => {
  if (event.target && /^(INPUT|TEXTAREA)$/.test(event.target.tagName)) return;
  if (state.jobZoom) {
    if (event.key === "Escape") {
      state.jobZoom = null;
      if (state.view === "kit") renderKit();
      else renderJob();
    }
    return;
  }
  const n = Number(event.key);
  if (n < 1 || n > 4) return;
  const active = document.querySelector(".view.active");
  if (!active) return;
  const choices = active.querySelectorAll(".choice:not([disabled])");
  if (!choices.length || !choices[n - 1]) return;
  event.preventDefault();
  choices[n - 1].click();
});
