(() => {
  "use strict";

  const TRANSLATIONS = {
    en: {
      title: "Physical vs Chemical Separation",
      subtitle: "A state engine that separates mixtures physically and changes compounds only with energy input",
      labTitle: "Interactive separation laboratory",
      labHeading: "Choose a sample",
      sampleIron: "Iron + sulphur",
      sampleSand: "Sand + water",
      chipKind: "Kind",
      chipBonded: "Bonded",
      chipEnergy: "Energy",
      chipResult: "Last result",
      workspace: "Workspace",
      stageIron: "Iron + sulphur mixture",
      stageIronCompound: "Iron(II) sulphide compound",
      stageIronSeparated: "Iron pulled from sulphur",
      stageSand: "Sand + water mixture",
      stageSandDecanted: "Sand settled, water poured off",
      stageSandFiltered: "Sand residue and water filtrate",
      physicalMethods: "Physical methods",
      chemicalMethods: "Chemical / energy",
      magnet: "Magnet",
      decant: "Decant",
      filter: "Filter",
      heat: "Strong heat",
      reset: "Reset",
      sourceBeaker: "Mixture",
      pouredBeaker: "Decanted liquid",
      filterLabel: "Filtration",
      clingFilm: "cling film",
      residue: "Residue",
      filtrate: "Filtrate",
      demoIdle: "Idle",
      demoMagnetApproach: "Magnet approaches",
      demoMagnetPull: "Iron is attracted",
      demoMagnetLift: "Iron lifts away",
      demoMagnetFail: "No attraction",
      demoSettle: "Sedimentation",
      demoPour: "Decantation",
      demoFilterPour: "Pouring into funnel",
      demoFilterDrip: "Residue and filtrate",
      demoHeatGlow: "Energy input",
      demoPlaying: "Playing",
      mixture: "Mixture",
      compound: "Compound",
      elements: "Elements",
      yes: "Yes",
      no: "No",
      ready: "Ready",
      separated: "Separated",
      combined: "Combined",
      decomposed: "Decomposed",
      blocked: "Blocked",
      note: "Note",
      energyNone: "—",
      energyHeat: "Heat",
      energyElectricity: "Electricity",
      energyBoth: "Heat + electricity",
      iron: "Iron",
      sulphur: "Sulphur",
      ironSulphide: "Iron(II) sulphide",
      sand: "Sand",
      water: "Water",
      captionIronStart: "Grey iron and yellow sulphur are mixed but not bonded. Try a magnet, or supply heat to make a compound.",
      captionSandStart: "Insoluble sand is suspended in water. Use decantation and filtration — physical methods that leave the substances chemically unchanged.",
      captionMagnetSuccess: "The magnet attracts iron. Sulphur is left behind. The components of the mixture kept their own properties.",
      captionSettle: "Sand is dense and insoluble. Left undisturbed, it settles to the bottom — sedimentation.",
      captionPour: "The liquid is poured off, leaving the solid behind. Decantation is a quick but rough physical method.",
      captionFilterStep: "The mixture is poured onto filter paper. Sand stays as residue; water passing through is the filtrate.",
      captionDecantSuccess: "Sand settled, then the water was poured off. Decantation is a physical separation of an insoluble solid from a liquid.",
      captionFilterSuccess: "Filter paper traps sand as residue. Clear water is the filtrate. No new substance was formed.",
      captionHeatSuccess: "Strong heating supplies energy. Iron and sulphur combine to form black, non-magnetic iron(II) sulphide.",
      warnFeSMagnetTitle: "A magnet cannot separate this compound",
      warnFeSMagnetBody: "Iron(II) sulphide is a compound. Iron and sulphur are chemically bonded. A magnet cannot separate them — that only works on the mixture.",
      warnFeSPhysicalTitle: "Physical methods cannot undo a compound",
      warnFeSPhysicalBody: "Iron(II) sulphide is a new substance. Decantation and filtration do not break the Fe–S bonds. Chemical change needed energy input; reversing it needs another chemical method.",
      noteAlreadySeparated: "These components are already physically separated.",
      noteAlreadyDecanted: "The liquid has already been poured off. Filtering the remainder can still trap leftover sand.",
      noteNoIron: "There is no magnetic metal in this sand–water mixture. Use decantation or filtration instead.",
      noteNotSolidLiquid: "Decantation and filtration are for insoluble solids in liquids, not for this iron–sulphur powder.",
      noteHeatWrongSample: "Strong heating is the energy method that combines iron and sulphur. It does not separate sand from water, and it does not split H₂O.",
      noteAlreadyFeS: "The mixture has already reacted. FeS is a compound; more heating here does not pull iron and sulphur apart.",
      noteHeatSeparated: "The iron has already been lifted away. Heat can form FeS only while iron and sulphur are still mixed together."
    },
    zh: {
      title: "物理與化學分離",
      subtitle: "以狀態引擎分辨混合物的物理分離，以及化合物所需的能量輸入",
      labTitle: "互動分離實驗室",
      labHeading: "選擇樣本",
      sampleIron: "鐵 + 硫",
      sampleSand: "沙 + 水",
      chipKind: "種類",
      chipBonded: "鍵合",
      chipEnergy: "能量",
      chipResult: "上次結果",
      workspace: "工作區",
      stageIron: "鐵與硫混合物",
      stageIronCompound: "硫化鐵(II)化合物",
      stageIronSeparated: "鐵已被磁鐵吸出",
      stageSand: "沙與水混合物",
      stageSandDecanted: "沙已沉降，水已傾出",
      stageSandFiltered: "沙為殘餘物，水為濾液",
      physicalMethods: "物理方法",
      chemicalMethods: "化學／能量",
      magnet: "磁鐵",
      decant: "傾析",
      filter: "過濾",
      heat: "強熱",
      reset: "重設",
      sourceBeaker: "混合物",
      pouredBeaker: "傾出液體",
      filterLabel: "過濾",
      clingFilm: "保鮮膜",
      residue: "殘餘物",
      filtrate: "濾液",
      demoIdle: "待機",
      demoMagnetApproach: "磁鐵靠近",
      demoMagnetPull: "鐵被吸引",
      demoMagnetLift: "鐵被吸起",
      demoMagnetFail: "沒有吸引",
      demoSettle: "沉降",
      demoPour: "傾析",
      demoFilterPour: "倒入漏斗",
      demoFilterDrip: "殘餘物與濾液",
      demoHeatGlow: "能量輸入",
      demoPlaying: "演示中",
      mixture: "混合物",
      compound: "化合物",
      elements: "元素",
      yes: "是",
      no: "否",
      ready: "就緒",
      separated: "已分離",
      combined: "已化合",
      decomposed: "已分解",
      blocked: "已阻擋",
      note: "提示",
      energyNone: "—",
      energyHeat: "熱能",
      energyElectricity: "電能",
      energyBoth: "熱能 + 電能",
      iron: "鐵",
      sulphur: "硫",
      ironSulphide: "硫化鐵(II)",
      sand: "沙",
      water: "水",
      captionIronStart: "灰色鐵粉和黃色硫粉只是混合，尚未鍵合。可試磁鐵，或加熱製成化合物。",
      captionSandStart: "不溶的沙懸浮在水中。請用傾析和過濾——這些物理方法不會改變物質的化學身分。",
      captionMagnetSuccess: "磁鐵吸走鐵，硫留在原處。混合物的各成分仍保持各自性質。",
      captionSettle: "沙又密又不溶。靜置後沉降到杯底——這是沉降。",
      captionPour: "把液體傾出，固體留下。傾析是快捷但較粗略的物理方法。",
      captionFilterStep: "把混合物倒上濾紙。沙留作殘餘物，通過的水是濾液。",
      captionDecantSuccess: "沙沉降後把水傾出。傾析是把不溶固體與液體分開的物理方法。",
      captionFilterSuccess: "濾紙截留沙作為殘餘物，清水是濾液。沒有新物質生成。",
      captionHeatSuccess: "強熱提供能量。鐵和硫化合成黑色、不帶磁性的硫化鐵(II)。",
      warnFeSMagnetTitle: "磁鐵不能分離這個化合物",
      warnFeSMagnetBody: "硫化鐵(II)是化合物。鐵和硫已經化學鍵合，磁鐵不能把它們分開——那只適用於混合物。",
      warnFeSPhysicalTitle: "物理方法不能拆開化合物",
      warnFeSPhysicalBody: "硫化鐵(II)是新物質。傾析和過濾不能破壞 Fe–S 鍵。形成它需要能量輸入，要還原也需要另一個化學方法。",
      noteAlreadySeparated: "這些成分已經被物理分離。",
      noteAlreadyDecanted: "液體已經傾出。過濾剩餘部分仍可截留沙粒。",
      noteNoIron: "這個沙–水混合物沒有磁性金屬。請改用傾析或過濾。",
      noteNotSolidLiquid: "傾析和過濾適用於液體中的不溶固體，不適用於鐵–硫粉末。",
      noteHeatWrongSample: "強熱是把鐵和硫化合成化合物的能量方法。它不能把沙從水分開，也不能拆開 H₂O。",
      noteAlreadyFeS: "混合物已經反應。FeS 是化合物，再加熱也不能把鐵和硫拉開。",
      noteHeatSeparated: "鐵已經被吸走。只有鐵和硫仍混在一起時，加熱才能生成 FeS。"
    }
  };

  const ui = {
    lang: "en",
    pendingLang: null
  };

  const MOTION = {
    easeOut: "cubic-bezier(0.22, 1, 0.36, 1)",
    easeIn: "cubic-bezier(0.55, 0.06, 0.68, 0.19)",
    easeInOut: "cubic-bezier(0.45, 0.05, 0.55, 0.95)",
    magnetApproach: 720,
    magnetPull: 860,
    magnetLift: 700,
    magnetFail: 980,
    magnetStagger: 40,
    settleBase: 1050,
    settleSpread: 520,
    settleStagger: 48,
    settlePause: 360,
    pourSlide: 540,
    pourTilt: 720,
    decantPosition: 680,
    decantTip: 900,
    decantFlow: 1900,
    decantUpright: 760,
    decantReturn: 560,
    streamGrow: 460,
    streamHold: 1300,
    easeRest: 500,
    heat: 1450,
    filterGrain: 980,
    dripCycle: 700,
    dripRepeats: 7
  };

  const lab = window.SeparationEngine.createLab("ironSulphur");
  let snapshot = lab.getState();
  const demo = {
    playing: false,
    step: "idle",
    timers: [],
    animations: [],
    frames: [],
    runId: 0
  };

  const APPARATUS = {
    decant: {
      receiverInsetX: 0.16,
      receiverInsetY: 0.2,
      rodOffsetX: 0.365,
      rodOffsetY: 0.42,
      tipAngle: 52,
      flowAngle: 58,
      sourceStartFill: 72,
      sourceEndFill: 10,
      receiverEndFill: 60
    },
    magnet: {
      targetInsetX: 0.2,
      targetInsetY: 0.34,
      liftRatioX: 0.3,
      liftDistanceY: 38
    }
  };

  const DOM = {
    body: document.body,
    magnet: document.getElementById("magnetArm"),
    magnetCling: document.getElementById("magnetCling"),
    ironParticles: document.getElementById("feParticles"),
    ironBench: document.querySelector(".bench-fe"),
    watchGlass: document.querySelector(".watch-glass"),
    sandBench: document.querySelector(".bench-sand"),
    sourceBeaker: document.getElementById("sourceBeaker"),
    sourceLip: document.getElementById("sourceLip"),
    sourceWater: document.querySelector(".source-beaker .sand-water"),
    receiverBeaker: document.getElementById("pouredBeaker"),
    receiverWater: document.querySelector(".poured-water"),
    decantRod: document.getElementById("decantRod"),
    stream: document.getElementById("lipStream"),
    liquidLayer: document.getElementById("liquidLayer")
  };

  function t(key) {
    return TRANSLATIONS[ui.lang][key] || TRANSLATIONS.en[key] || key;
  }

  function prettyFormula(formula) {
    return String(formula || "").replace(/([A-Za-z)])(\d+)/g, "$1<sub>$2</sub>");
  }

  function stageTitleFor(state) {
    if (state.sample === "ironSulphur") {
      if (state.kind === "compound") {
        return t("stageIronCompound");
      }
      if (state.phase === "magnetSeparated") {
        return t("stageIronSeparated");
      }
      return t("stageIron");
    }
    if (state.sample === "sandWater") {
      if (state.phase === "decanted") {
        return t("stageSandDecanted");
      }
      if (state.phase === "filtered") {
        return t("stageSandFiltered");
      }
      return t("stageSand");
    }
    return t("stageIron");
  }

  function energyLabel(state) {
    if (state.energy.heat && state.energy.electricity) {
      return t("energyBoth");
    }
    if (state.energy.heat) {
      return t("energyHeat");
    }
    if (state.energy.electricity) {
      return t("energyElectricity");
    }
    return t("energyNone");
  }

  function kindLabel(kind) {
    return t(kind);
  }

  function resultLabel(outcome) {
    return t(outcome);
  }

  function applyI18n() {
    document.documentElement.lang = ui.lang === "zh" ? "zh-Hant" : "en";
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === ui.lang);
    });
    document.title = ui.lang === "zh"
      ? "物理與化學分離 · Physical vs Chemical Separation"
      : "Physical vs Chemical Separation · 物理與化學分離";
  }

  function seedParticles() {
    const dish = DOM.ironParticles;
    const cling = DOM.magnetCling;
    if (cling) {
      cling.replaceChildren();
    }
    dish.innerHTML = "";

    const ironSpots = [
      [18, 22], [38, 48], [62, 28], [74, 58], [28, 70],
      [50, 36], [12, 54], [80, 18], [44, 78], [66, 72]
    ];
    const sulphurSpots = [
      [30, 18], [54, 22], [70, 40], [22, 40], [46, 56],
      [78, 64], [14, 76], [58, 80], [36, 32], [86, 46]
    ];

    ironSpots.forEach(([x, y]) => {
      const grain = document.createElement("span");
      grain.className = "particle fe";
      grain.style.left = x + "%";
      grain.style.top = y + "%";
      dish.appendChild(grain);
    });

    sulphurSpots.forEach(([x, y]) => {
      const grain = document.createElement("span");
      grain.className = "particle s";
      grain.style.left = x + "%";
      grain.style.top = y + "%";
      dish.appendChild(grain);
    });
  }

  function seedSandGrains() {
    const bed = document.getElementById("sandGrains");
    bed.innerHTML = "";
    // Suspended mid-liquid only — no pre-settled bed look
    const spots = [
      [18, 18], [42, 14], [66, 22], [28, 32], [54, 28],
      [74, 36], [16, 44], [38, 48], [60, 42], [80, 26],
      [24, 24], [48, 38], [70, 16], [32, 12], [58, 20]
    ];
    spots.forEach(([x, y], index) => {
      const grain = document.createElement("span");
      const size = 0.72 + (index % 5) * 0.09;
      grain.className = "sand-grain";
      grain.style.left = x + "%";
      grain.style.top = y + "%";
      grain.style.transform = "scale(" + size.toFixed(2) + ")";
      grain.dataset.scale = String(size);
      // Larger grains rest lower / settle faster (Stokes-like)
      grain.dataset.rest = String(76 + (index % 5) * 2.4);
      bed.appendChild(grain);
    });
  }

  function render(state) {
    snapshot = state;
    document.body.dataset.sample = state.sample;
    document.body.dataset.phase = state.phase;
    document.body.dataset.kind = state.kind;

    document.querySelectorAll(".stage-tab").forEach((button) => {
      const active = button.dataset.sample === state.sample;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });

    document.querySelectorAll(".bench").forEach((bench) => {
      bench.hidden = bench.dataset.sample !== state.sample;
    });

    document.getElementById("chipKindValue").textContent = kindLabel(state.kind);
    document.getElementById("chipBondedValue").textContent = state.bonded ? t("yes") : t("no");
    document.getElementById("chipEnergyValue").textContent = energyLabel(state);
    document.getElementById("chipResultValue").textContent = resultLabel(state.log.outcome);
    document.getElementById("stageTitle").textContent = stageTitleFor(state);
    document.getElementById("formulaBadge").innerHTML = prettyFormula(state.formula);

    const banner = document.getElementById("warningBanner");
    if (state.warning) {
      banner.hidden = false;
      document.getElementById("warningTitle").textContent = t(state.warning.titleKey);
      document.getElementById("warningBody").textContent = t(state.warning.bodyKey);
    } else {
      banner.hidden = true;
    }

    document.getElementById("liveCaption").textContent = t(state.log.captionKey);
    const equation = document.getElementById("equationLine");
    if (state.log.equation) {
      equation.hidden = false;
      equation.innerHTML = prettyFormula(state.log.equation);
    } else {
      equation.hidden = true;
    }

    renderDemoChip();
  }

  function renderDemoChip() {
    const chip = document.getElementById("demoStepChip");
    const keyMap = {
      idle: "demoIdle",
      "magnet-approach": "demoMagnetApproach",
      "magnet-pull": "demoMagnetPull",
      "magnet-lift": "demoMagnetLift",
      "magnet-fail": "demoMagnetFail",
      settle: "demoSettle",
      pour: "demoPour",
      "filter-pour": "demoFilterPour",
      filter: "demoFilterDrip",
      heat: "demoHeatGlow"
    };
    chip.textContent = t(keyMap[demo.step] || "demoIdle");
  }

  function setDemoStep(step, captionKey) {
    demo.step = step;
    document.body.dataset.demo = step === "idle" ? "" : step;
    renderDemoChip();
    if (captionKey) {
      document.getElementById("liveCaption").textContent = t(captionKey);
    }
  }

  function setControlsLocked(locked) {
    document.querySelectorAll("[data-action], .stage-tab").forEach((button) => {
      button.disabled = locked;
    });
  }

  function wait(ms) {
    return new Promise((resolve) => {
      const timer = {
        id: 0,
        resolve: resolve
      };
      timer.id = window.setTimeout(function () {
        demo.timers = demo.timers.filter((item) => item !== timer);
        resolve();
      }, ms);
      demo.timers.push(timer);
    });
  }

  function animateFrames(duration, draw) {
    return new Promise((resolve) => {
      const startedAt = performance.now();
      const runId = demo.runId;
      const frame = {
        id: 0,
        done: false,
        cancel: function () {
          if (frame.done) {
            return;
          }
          frame.done = true;
          window.cancelAnimationFrame(frame.id);
          demo.frames = demo.frames.filter((item) => item !== frame);
          resolve(false);
        }
      };

      function tick(now) {
        if (frame.done || runId !== demo.runId) {
          frame.cancel();
          return;
        }
        const progress = Math.min(1, Math.max(0, (now - startedAt) / duration));
        draw(progress);
        if (progress >= 1) {
          frame.done = true;
          demo.frames = demo.frames.filter((item) => item !== frame);
          resolve(true);
          return;
        }
        frame.id = window.requestAnimationFrame(tick);
      }

      demo.frames.push(frame);
      frame.id = window.requestAnimationFrame(tick);
    });
  }

  function track(animation) {
    if (animation) {
      demo.animations.push(animation);
    }
    return animation;
  }

  function cancelDemo() {
    demo.runId += 1;
    demo.timers.forEach((timer) => {
      window.clearTimeout(timer.id);
      timer.resolve();
    });
    demo.timers = [];
    demo.frames.slice().forEach((frame) => frame.cancel());
    demo.frames = [];
    demo.animations.forEach((animation) => {
      if (animation && animation.cancel) {
        animation.cancel();
      }
    });
    demo.animations = [];
    demo.playing = false;
    demo.step = "idle";
    document.body.dataset.demo = "";
    document.body.dataset.heating = "false";
    document.body.classList.remove("is-dripping");
    const feBench = document.querySelector(".bench-fe");
    if (feBench) {
      feBench.classList.remove("is-heating");
    }
    setControlsLocked(false);
    applyPendingLanguage();
  }

  function demoKind(type, state) {
    if (type === "magnet" && state.sample === "ironSulphur" && state.kind === "compound") {
      return "magnetFail";
    }
    if (type === "magnet" && state.sample === "ironSulphur" && state.phase === "mixed") {
      return "magnetPull";
    }
    if (type === "decant" && state.sample === "sandWater" && state.phase === "mixed") {
      return "decant";
    }
    if (type === "filter" && state.sample === "sandWater" && (state.phase === "mixed" || state.phase === "decanted")) {
      return "filter";
    }
    if (type === "heat" && state.sample === "ironSulphur" && state.kind === "mixture" && state.phase === "mixed") {
      return "heat";
    }
    return null;
  }

  function prepareMagnetPath() {
    const magnet = DOM.magnet;
    const cling = DOM.magnetCling;
    const dish = DOM.watchGlass;
    if (!magnet || !cling || !dish) {
      return;
    }
    const dishBox = dish.getBoundingClientRect();
    const clingBox = cling.getBoundingClientRect();
    if (!dishBox.width || !clingBox.width) {
      return;
    }

    const transform = window.getComputedStyle(magnet).transform;
    const matrix = transform === "none"
      ? new DOMMatrixReadOnly()
      : new DOMMatrixReadOnly(transform);
    const clingBaseCenter = {
      x: clingBox.left + clingBox.width / 2 - matrix.m41,
      y: clingBox.top + clingBox.height / 2 - matrix.m42
    };
    const target = {
      x: dishBox.right - dishBox.width * APPARATUS.magnet.targetInsetX,
      y: dishBox.top + dishBox.height * APPARATUS.magnet.targetInsetY
    };
    const approachX = target.x - clingBaseCenter.x;
    const approachY = target.y - clingBaseCenter.y;
    const liftX = approachX * APPARATUS.magnet.liftRatioX;
    const liftY = approachY - Math.max(
      30,
      dishBox.height * 0.23,
      APPARATUS.magnet.liftDistanceY
    );

    magnet.style.setProperty("--magnet-approach-x", approachX.toFixed(2) + "px");
    magnet.style.setProperty("--magnet-approach-y", approachY.toFixed(2) + "px");
    magnet.style.setProperty("--magnet-lift-x", liftX.toFixed(2) + "px");
    magnet.style.setProperty("--magnet-lift-y", liftY.toFixed(2) + "px");
  }

  function flyIronToMagnet() {
    const runId = demo.runId;
    const cling = DOM.magnetCling;
    const clingBox = cling.getBoundingClientRect();
    const grains = Array.from(DOM.ironParticles.querySelectorAll(".particle.fe"));
    const ranked = grains.map((grain, index) => {
      const from = grain.getBoundingClientRect();
      const dx = clingBox.left + (index % 4) * 10 - from.left;
      const dy = clingBox.top + Math.floor(index / 4) * 9 - from.top;
      const dist = Math.hypot(dx, dy);
      return { grain, dx, dy, dist, index };
    }).sort((a, b) => a.dist - b.dist);

    return Promise.all(ranked.map((item, order) => {
      const midX = item.dx * 0.45;
      const midY = item.dy * 0.45 - 18 - (order % 3) * 4;
      const animation = item.grain.animate(
        [
          { transform: "translate(0px, 0px)" },
          { transform: "translate(" + midX + "px, " + midY + "px)", offset: 0.42 },
          { transform: "translate(" + item.dx + "px, " + item.dy + "px)" }
        ],
        {
          duration: MOTION.magnetPull,
          delay: order * MOTION.magnetStagger,
          fill: "forwards",
          easing: MOTION.easeOut
        }
      );
      track(animation);
      return animation.finished.catch(function () {});
    })).then(function () {
      if (runId !== demo.runId || demo.step !== "magnet-pull") {
        return;
      }
      ranked.forEach((item) => {
        item.grain.getAnimations().forEach((animation) => animation.cancel());
        item.grain.style.left = (item.index % 4) * 10 + "px";
        item.grain.style.top = Math.floor(item.index / 4) * 9 + "px";
        item.grain.style.transform = "none";
        item.grain.classList.add("is-attached");
        cling.appendChild(item.grain);
      });
    });
  }

  function resetSandTransforms() {
    const source = DOM.sourceBeaker;
    const liquid = DOM.liquidLayer;
    const stream = DOM.stream;
    const rod = DOM.decantRod;
    [source, liquid, stream, rod].forEach((node) => {
      if (!node) {
        return;
      }
      node.getAnimations().forEach((animation) => animation.cancel());
      node.style.transform = "";
    });
    if (stream) {
      stream.style.height = "0px";
      stream.style.width = "";
      stream.style.opacity = "0";
      stream.style.left = "0px";
      stream.style.top = "0px";
    }
    if (rod) {
      rod.classList.remove("is-active");
      rod.style.height = "";
      rod.style.left = "";
      rod.style.top = "";
      rod.style.opacity = "";
    }
    [DOM.sourceWater, DOM.receiverWater].forEach((water) => {
      if (!water) {
        return;
      }
      water.getAnimations().forEach((animation) => animation.cancel());
      water.style.height = "";
      water.style.clipPath = "";
      water.style.transform = "";
    });
    document.querySelectorAll("#sandGrains .sand-grain").forEach((grain) => {
      grain.getAnimations().forEach((animation) => animation.cancel());
      grain.style.opacity = "";
      grain.style.visibility = "";
    });
    document.body.classList.remove("is-dripping");
  }

  function easeToRest(el) {
    if (!el) {
      return;
    }
    const current = window.getComputedStyle(el).transform;
    el.getAnimations().forEach((animation) => animation.cancel());
    if (!current || current === "none") {
      el.style.transform = "";
      return;
    }
    const anim = track(el.animate(
      [
        { transform: current },
        { transform: "none" }
      ],
      { duration: MOTION.easeRest, fill: "forwards", easing: MOTION.easeOut }
    ));
    anim.finished.then(function () {
      el.style.transform = "";
    }).catch(function () {});
  }

  function endPourGently() {
    const source = DOM.sourceBeaker;
    const liquid = DOM.liquidLayer;
    const stream = DOM.stream;
    if (stream) {
      stream.getAnimations().forEach((animation) => animation.cancel());
      stream.style.height = "0px";
      stream.style.opacity = "0";
      stream.style.transform = "";
    }
    easeToRest(source);
    easeToRest(liquid);
  }

  function placeVerticalStream(fromEl, toEl) {
    const wrap = document.querySelector(".bench-sand");
    const stream = document.getElementById("lipStream");
    if (!wrap || !stream || !fromEl || !toEl) {
      return Promise.resolve();
    }
    const wrapBox = wrap.getBoundingClientRect();
    const from = fromEl.getBoundingClientRect();
    const to = toEl.getBoundingClientRect();
    const x = from.left + from.width / 2 - wrapBox.left - 4;
    const y = from.bottom - wrapBox.top - 2;
    const height = Math.max(14, to.top - y + 4);
    stream.style.left = x + "px";
    stream.style.top = y + "px";
    stream.style.opacity = "1";
    stream.style.width = "7px";
    stream.style.transform = "none";

    const grow = stream.animate(
      [
        { height: "0px", opacity: 0.35, offset: 0 },
        { height: height + "px", opacity: 1, offset: 0.28 },
        { height: height + "px", opacity: 0.85, offset: 0.72 },
        { height: height + "px", opacity: 0.55, offset: 1 }
      ],
      { duration: MOTION.streamGrow + MOTION.streamHold, fill: "forwards", easing: MOTION.easeInOut }
    );
    track(grow);

    const pulse = stream.animate(
      [
        { width: "6px" },
        { width: "9px" },
        { width: "6px" }
      ],
      {
        duration: 420,
        iterations: Math.max(2, Math.round(MOTION.streamHold / 420)),
        delay: MOTION.streamGrow * 0.35,
        easing: MOTION.easeInOut
      }
    );
    track(pulse);

    return grow.finished.catch(function () {});
  }

  function positionGuideLine(element, from, to, wrapBox) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI - 90;
    const transform = "rotate(" + angle + "deg)";

    element.style.left = (from.x - wrapBox.left) + "px";
    element.style.top = (from.y - wrapBox.top) + "px";
    element.style.height = length + "px";
    element.style.transform = transform;
  }

  function prepareDecantGeometry() {
    const wrap = DOM.sandBench;
    const source = DOM.sourceBeaker;
    const sourceLip = DOM.sourceLip;
    const receiver = DOM.receiverBeaker;
    const rod = DOM.decantRod;
    const stream = DOM.stream;
    if (!wrap || !source || !sourceLip || !receiver || !rod || !stream) {
      return null;
    }

    const wrapBox = wrap.getBoundingClientRect();
    const sourceBox = source.getBoundingClientRect();
    const lipBox = sourceLip.getBoundingClientRect();
    const receiverBox = receiver.getBoundingClientRect();
    const transformOrigin = window.getComputedStyle(source).transformOrigin
      .split(" ")
      .map((value) => parseFloat(value));
    const pivot = {
      x: sourceBox.left + transformOrigin[0],
      y: sourceBox.top + transformOrigin[1]
    };
    const lipStart = {
      x: lipBox.left + lipBox.width / 2,
      y: lipBox.top + lipBox.height / 2
    };
    // The rod touches the inner wall rather than dropping into the centre.
    const receiverContact = {
      x: receiverBox.left + receiverBox.width * APPARATUS.decant.receiverInsetX,
      y: receiverBox.top + receiverBox.height * APPARATUS.decant.receiverInsetY
    };
    const lipContact = {
      x: receiverContact.x - sourceBox.width * APPARATUS.decant.rodOffsetX,
      y: receiverContact.y - sourceBox.height * APPARATUS.decant.rodOffsetY
    };
    positionGuideLine(rod, lipContact, receiverContact, wrapBox);

    stream.style.width = "4px";
    stream.style.height = "0px";
    stream.style.opacity = "0";
    rod.style.opacity = "0";
    rod.classList.add("is-active");

    return {
      dx: lipContact.x - lipStart.x,
      dy: lipContact.y - lipStart.y,
      pivot: pivot,
      lipOffset: {
        x: lipStart.x - pivot.x,
        y: lipStart.y - pivot.y
      },
      receiverContact: receiverContact,
      wrapBox: wrapBox
    };
  }

  function clampedDepthIntegral(depth) {
    if (depth <= 0) {
      return 0;
    }
    if (depth < 100) {
      return depth * depth / 2;
    }
    return 100 * depth - 5000;
  }

  function fluidPolygon(angle, fillPercent, source) {
    const width = source.clientWidth || 148;
    const height = source.clientHeight || 210;
    const delta = Math.tan(angle * Math.PI / 180) * width / height * 100;

    const visibleVolume = (leftY) => {
      const startDepth = 100 - leftY;
      const endDepth = startDepth + delta;
      if (Math.abs(delta) < 0.0001) {
        return Math.max(0, Math.min(100, startDepth));
      }
      return (clampedDepthIntegral(endDepth) - clampedDepthIntegral(startDepth)) / delta;
    };

    let low = -100 - Math.abs(delta);
    let high = 200 + Math.abs(delta);
    for (let index = 0; index < 28; index += 1) {
      const middle = (low + high) / 2;
      if (visibleVolume(middle) > fillPercent) {
        low = middle;
      } else {
        high = middle;
      }
    }
    const leftY = (low + high) / 2;
    const rightY = leftY - delta;
    return "polygon(0% " + leftY.toFixed(2) + "%, 100% " + rightY.toFixed(2) +
      "%, 100% 100%, 0% 100%)";
  }

  function smoothStep(value) {
    const progress = Math.min(1, Math.max(0, value));
    return progress * progress * (3 - 2 * progress);
  }

  function smootherStep(value) {
    const progress = Math.min(1, Math.max(0, value));
    return progress * progress * progress * (progress * (progress * 6 - 15) + 10);
  }

  function setApparatusPose(element, x, y, angle) {
    element.style.transform = "translate3d(" + x.toFixed(2) + "px, " +
      y.toFixed(2) + "px, 0) rotate(" + angle.toFixed(2) + "deg)";
  }

  function placePourStream(stream, geometry, translateX, translateY, angle, strength) {
    if (!stream || !geometry) {
      return;
    }
    const radians = angle * Math.PI / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const from = {
      x: geometry.pivot.x + translateX +
        geometry.lipOffset.x * cos - geometry.lipOffset.y * sin,
      y: geometry.pivot.y + translateY +
        geometry.lipOffset.x * sin + geometry.lipOffset.y * cos
    };
    positionGuideLine(stream, from, geometry.receiverContact, geometry.wrapBox);
    stream.style.width = (2.2 + strength * 3.8).toFixed(2) + "px";
    stream.style.opacity = (strength * 0.9).toFixed(3);
  }

  async function playDecantPour() {
    const source = DOM.sourceBeaker;
    const sourceWater = DOM.sourceWater;
    const receiverWater = DOM.receiverWater;
    const rod = DOM.decantRod;
    const stream = DOM.stream;
    const geometry = prepareDecantGeometry();
    if (!source || !sourceWater || !receiverWater || !rod || !stream || !geometry) {
      return;
    }

    const tipAngle = APPARATUS.decant.tipAngle;
    const flowAngle = APPARATUS.decant.flowAngle;
    const sourceStartFill = APPARATUS.decant.sourceStartFill;
    const sourceEndFill = APPARATUS.decant.sourceEndFill;
    const receiverEndFill = APPARATUS.decant.receiverEndFill;
    sourceWater.style.height = "100%";
    sourceWater.style.clipPath = fluidPolygon(0, sourceStartFill, source);
    receiverWater.style.height = receiverEndFill + "%";
    receiverWater.style.transform = "scaleY(0)";

    let completed = await animateFrames(MOTION.decantPosition, function (progress) {
      const eased = smootherStep(progress);
      const lift = Math.sin(Math.PI * eased) * 16;
      setApparatusPose(
        source,
        geometry.dx * eased,
        geometry.dy * eased - lift,
        0
      );
      rod.style.opacity = (0.82 * eased).toFixed(3);
    });
    if (!completed) {
      return;
    }

    completed = await animateFrames(MOTION.decantTip, function (progress) {
      const angle = tipAngle * smootherStep(progress);
      setApparatusPose(source, geometry.dx, geometry.dy, angle);
      sourceWater.style.clipPath = fluidPolygon(angle, sourceStartFill, source);
    });
    if (!completed) {
      return;
    }

    completed = await animateFrames(MOTION.decantFlow, function (progress) {
      const angleProgress = smoothStep(progress / 0.3);
      const angle = tipAngle + (flowAngle - tipAngle) * angleProgress;
      const transferred = smootherStep(progress);
      const sourceFill = sourceStartFill -
        (sourceStartFill - sourceEndFill) * transferred;
      const startFlow = smoothStep(progress / 0.12);
      const endFlow = 1 - smoothStep((progress - 0.78) / 0.22);
      const pulse = 0.96 + Math.sin(progress * Math.PI * 10) * 0.04;
      const streamStrength = Math.max(0, startFlow * endFlow * pulse);

      setApparatusPose(source, geometry.dx, geometry.dy, angle);
      sourceWater.style.clipPath = fluidPolygon(angle, sourceFill, source);
      receiverWater.style.transform = "scaleY(" + transferred.toFixed(4) + ")";
      placePourStream(
        stream,
        geometry,
        geometry.dx,
        geometry.dy,
        angle,
        streamStrength
      );
    });
    if (!completed) {
      return;
    }

    sourceWater.style.clipPath = fluidPolygon(flowAngle, sourceEndFill, source);
    receiverWater.style.transform = "scaleY(1)";
    placePourStream(stream, geometry, geometry.dx, geometry.dy, flowAngle, 0);

    completed = await animateFrames(MOTION.decantUpright, function (progress) {
      const angle = flowAngle * (1 - smootherStep(progress));
      setApparatusPose(source, geometry.dx, geometry.dy, angle);
      sourceWater.style.clipPath = fluidPolygon(angle, sourceEndFill, source);
    });
    if (!completed) {
      return;
    }

    completed = await animateFrames(MOTION.decantReturn, function (progress) {
      const eased = smootherStep(progress);
      const remaining = 1 - eased;
      const lift = Math.sin(Math.PI * eased) * 10;
      setApparatusPose(
        source,
        geometry.dx * remaining,
        geometry.dy * remaining - lift,
        0
      );
      rod.style.opacity = (0.82 * remaining).toFixed(3);
    });
    if (!completed) {
      return;
    }

    source.style.transform = "";
    rod.style.opacity = "0";
    stream.style.height = "0px";
    stream.style.opacity = "0";
  }

  function playFilterPour() {
    const source = document.getElementById("sourceBeaker");
    const liquid = document.getElementById("liquidLayer");
    const lip = document.getElementById("sourceLip");
    const target = document.getElementById("funnelMouth");
    const lip0 = lip ? lip.getBoundingClientRect() : { left: 0, width: 0 };
    const tgt0 = target ? target.getBoundingClientRect() : { left: 0, width: 0 };
    const tiltShiftX = 28;
    const slide = Math.max(20, (tgt0.left + tgt0.width / 2) - (lip0.left + lip0.width / 2) - tiltShiftX);
    const lift = -24;
    const tilt = 36;
    // Free surface stays near-level; sediment tilts with the beaker (no full-content counter-spin)
    const liquidCounter = -28;

    const slideAnim = source.animate(
      [
        { transform: "translate3d(0, 0, 0) rotate(0deg)" },
        { transform: "translate3d(" + slide + "px, " + lift + "px, 0) rotate(0deg)" }
      ],
      { duration: MOTION.pourSlide, fill: "forwards", easing: MOTION.easeOut }
    );
    track(slideAnim);

    return slideAnim.finished.catch(function () {}).then(function () {
      const tiltAnim = source.animate(
        [
          { transform: "translate3d(" + slide + "px, " + lift + "px, 0) rotate(0deg)" },
          { transform: "translate3d(" + slide + "px, " + lift + "px, 0) rotate(" + tilt + "deg)" }
        ],
        { duration: MOTION.pourTilt, fill: "forwards", easing: MOTION.easeOut }
      );
      track(tiltAnim);
      if (liquid) {
        track(liquid.animate(
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(" + liquidCounter + "deg)" }
          ],
          { duration: MOTION.pourTilt, fill: "forwards", easing: MOTION.easeOut }
        ));
      }
      return tiltAnim.finished.catch(function () {});
    }).then(function () {
      const lipNow = document.getElementById("sourceLip");
      const targetNow = document.getElementById("funnelMouth");
      return placeVerticalStream(lipNow, targetNow);
    });
  }

  function settleSand() {
    const host = document.getElementById("sandGrains");
    const hostHeight = host ? host.getBoundingClientRect().height : 100;
    const grains = Array.from(document.querySelectorAll("#sandGrains .sand-grain"));

    return Promise.all(grains.map((grain, index) => {
      const scale = Number(grain.dataset.scale || 1);
      const rest = Number(grain.dataset.rest || 80);
      const start = parseFloat(grain.style.top) || 20;
      const dropPx = (hostHeight * (rest - start)) / 100;
      // Larger grains settle faster (shorter duration)
      const duration = MOTION.settleBase + MOTION.settleSpread * (1.15 - scale) + (index % 3) * 40;
      const drift = ((index % 5) - 2) * 3.5;
      const animation = grain.animate(
        [
          { transform: "translate(0px, 0px) scale(" + scale + ")", offset: 0 },
          {
            transform: "translate(" + (drift * 0.4) + "px, " + (dropPx * 0.55) + "px) scale(" + scale + ")",
            offset: 0.55
          },
          { transform: "translate(" + drift + "px, " + dropPx + "px) scale(" + scale + ")", offset: 1 }
        ],
        {
          duration: duration,
          delay: index * MOTION.settleStagger,
          fill: "forwards",
          easing: MOTION.easeIn
        }
      );
      track(animation);
      return animation.finished.then(function () {
        grain.style.top = rest + "%";
        grain.style.left = (parseFloat(grain.style.left) + drift * 0.08) + "%";
        grain.style.transform = "scale(" + scale + ")";
        grain.getAnimations().forEach((a) => a.cancel());
      }).catch(function () {});
    })).then(function () {
      // Bed reads as the sediment pile; hide discrete grains after they merge
      grains.forEach((grain, index) => {
        const fade = grain.animate(
          [
            { opacity: 1 },
            { opacity: 0 }
          ],
          {
            duration: 380,
            delay: index * 18,
            fill: "forwards",
            easing: MOTION.easeOut
          }
        );
        track(fade);
      });
      return wait(420);
    });
  }

  function transferSandToResidue() {
    const grains = Array.from(document.querySelectorAll("#sandGrains .sand-grain"));
    const residue = document.querySelector(".residue-pile");
    if (!residue || !grains.length) {
      return Promise.resolve();
    }
    const to = residue.getBoundingClientRect();

    return Promise.all(grains.map((grain, index) => {
      grain.getAnimations().forEach((animation) => animation.cancel());
      grain.style.opacity = "1";
      grain.style.visibility = "visible";
      const from = grain.getBoundingClientRect();
      const dx = to.left + to.width / 2 - from.left - from.width / 2 + ((index % 5) - 2) * 4;
      const dy = to.top + 6 - from.top + Math.floor(index / 5) * 3;
      const scale = Number(grain.dataset.scale || 1);
      const animation = grain.animate(
        [
          { transform: "translate(0px, 0px) scale(" + scale + ")", opacity: 1, offset: 0 },
          {
            transform: "translate(" + (dx * 0.55) + "px, " + (dy * 0.35 - 24) + "px) scale(" + scale + ")",
            opacity: 1,
            offset: 0.45
          },
          {
            transform: "translate(" + dx + "px, " + dy + "px) scale(" + (scale * 0.55) + ")",
            opacity: 0,
            offset: 1
          }
        ],
        {
          duration: MOTION.filterGrain,
          delay: index * 36,
          fill: "forwards",
          easing: MOTION.easeInOut
        }
      );
      track(animation);
      return animation.finished.catch(function () {});
    }));
  }

  function playFiniteDrips() {
    const drips = Array.from(document.querySelectorAll(".drip-stack .drip"));
    document.body.classList.add("is-dripping");
    return Promise.all(drips.map((drip, index) => {
      const animation = drip.animate(
        [
          { transform: "translateY(0)", opacity: 0, offset: 0 },
          { transform: "translateY(4px)", opacity: 1, offset: 0.18 },
          { transform: "translateY(28px)", opacity: 0, offset: 1 }
        ],
        {
          duration: MOTION.dripCycle,
          delay: index * 220,
          iterations: MOTION.dripRepeats,
          easing: MOTION.easeIn
        }
      );
      track(animation);
      return animation.finished.catch(function () {});
    })).then(function () {
      document.body.classList.remove("is-dripping");
    });
  }

  function markGrainsSettledVisually() {
    const grains = Array.from(document.querySelectorAll("#sandGrains .sand-grain"));
    grains.forEach((grain) => {
      const rest = Number(grain.dataset.rest || 80);
      const scale = Number(grain.dataset.scale || 1);
      grain.getAnimations().forEach((a) => a.cancel());
      grain.style.top = rest + "%";
      grain.style.transform = "scale(" + scale + ")";
      grain.style.opacity = "0";
    });
  }

  async function playDemo(kind) {
    if (kind === "magnetPull") {
      prepareMagnetPath();
      setDemoStep("magnet-approach", "demoMagnetApproach");
      await wait(MOTION.magnetApproach);
      setDemoStep("magnet-pull", "captionMagnetSuccess");
      await flyIronToMagnet();
      setDemoStep("magnet-lift", "demoMagnetLift");
      await wait(MOTION.magnetLift);
      return;
    }
    if (kind === "magnetFail") {
      prepareMagnetPath();
      setDemoStep("magnet-fail", "demoMagnetFail");
      await wait(MOTION.magnetFail);
      return;
    }
    if (kind === "decant") {
      setDemoStep("settle", "captionSettle");
      await settleSand();
      await wait(MOTION.settlePause);
      setDemoStep("pour", "captionPour");
      // Allow the receiver and guide-rod layout to become measurable.
      await wait(90);
      await playDecantPour();
      return;
    }
    if (kind === "filter") {
      const needsSettle = snapshot.phase === "mixed";
      if (needsSettle) {
        setDemoStep("settle", "captionSettle");
        await settleSand();
        await wait(MOTION.settlePause);
      } else {
        markGrainsSettledVisually();
      }
      setDemoStep("filter-pour", "captionFilterStep");
      // Let the filter station layout so funnel mouth has a real box
      await wait(90);
      const pourPromise = playFilterPour();
      await wait(MOTION.pourSlide + MOTION.pourTilt);
      await transferSandToResidue();
      setDemoStep("filter", "captionFilterStep");
      await Promise.all([pourPromise, playFiniteDrips()]);
      return;
    }
    if (kind === "heat") {
      document.body.dataset.heating = "true";
      document.querySelector(".bench-fe").classList.add("is-heating");
      setDemoStep("heat", "demoHeatGlow");
      await wait(MOTION.heat);
      return;
    }
  }

  function commit(action) {
    const next = lab.dispatch(action);
    applyI18n();
    render(next);
  }

  async function handleAction(type) {
    if (demo.playing) {
      return;
    }
    const kind = demoKind(type, snapshot);
    if (!kind) {
      commit({ type: type });
      return;
    }
    demo.playing = true;
    const runId = ++demo.runId;
    setControlsLocked(true);
    try {
      await playDemo(kind);
      if (runId !== demo.runId) {
        return;
      }
      // Commit while demo heights still match final phase CSS — then ease beaker upright
      commit({ type: type });
      if (kind === "decant") {
        const sourceWater = document.querySelector(".source-beaker .sand-water");
        const receiverWater = document.querySelector(".poured-water");
        if (sourceWater) {
          sourceWater.style.height = "";
          sourceWater.style.clipPath = "";
        }
        if (receiverWater) {
          receiverWater.style.height = "";
          receiverWater.style.transform = "";
        }
      }
      document.body.dataset.demo = "";
      demo.step = "idle";
      endPourGently();
      await wait(MOTION.easeRest);
    } finally {
      if (runId !== demo.runId) {
        return;
      }
      demo.playing = false;
      demo.step = "idle";
      document.body.dataset.demo = "";
      document.body.dataset.heating = "false";
      document.body.classList.remove("is-dripping");
      const feBench = document.querySelector(".bench-fe");
      if (feBench) {
        feBench.classList.remove("is-heating");
      }
      setControlsLocked(false);
      renderDemoChip();
      applyPendingLanguage();
    }
  }

  function resetLab() {
    cancelDemo();
    resetSandTransforms();
    seedParticles();
    seedSandGrains();
    commit({ type: "reset" });
    renderDemoChip();
  }

  function switchLanguage(lang) {
    if (demo.playing) {
      ui.pendingLang = lang;
      return;
    }
    ui.lang = lang;
    applyI18n();
    render(snapshot);
  }

  function applyPendingLanguage() {
    if (!ui.pendingLang || demo.playing) {
      return;
    }
    const lang = ui.pendingLang;
    ui.pendingLang = null;
    switchLanguage(lang);
  }

  let resizeTimer = 0;
  let viewportWidth = window.innerWidth;
  function handleViewportChange() {
    if (Math.abs(window.innerWidth - viewportWidth) < 1) {
      return;
    }
    viewportWidth = window.innerWidth;
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      if (demo.playing) {
        resetLab();
        return;
      }
      prepareMagnetPath();
    }, 140);
  }

  seedParticles();
  seedSandGrains();
  applyI18n();
  render(snapshot);
  prepareMagnetPath();

  document.querySelectorAll(".stage-tab").forEach((button) => {
    button.addEventListener("click", () => {
      if (demo.playing) {
        return;
      }
      cancelDemo();
      resetSandTransforms();
      seedParticles();
      seedSandGrains();
      commit({ type: "loadSample", sample: button.dataset.sample });
    });
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      handleAction(button.dataset.action);
    });
  });

  document.getElementById("resetButton").addEventListener("click", resetLab);

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => switchLanguage(button.dataset.lang));
  });

  window.addEventListener("resize", handleViewportChange, { passive: true });
  window.addEventListener("orientationchange", handleViewportChange, { passive: true });
})();
