const APPARATUS = [
  { id: "beaker", letter: "(a)", name: "Beaker", nameZh: "燒杯", easy: "A glass cup for holding, mixing, or heating a larger amount of liquid.", exam: "Contains / mixes solutions; boils about 200 cm³ of water.", photo: true, diagram: true },
  { id: "test-tube", letter: "(b)", name: "Test tube", nameZh: "試管", easy: "A small glass tube for a little liquid or a small reaction.", exam: "Mixes solutions to observe changes; heats a few cm³ of liquid.", photo: true, diagram: true },
  { id: "conical-flask", letter: "(c)", name: "Conical flask", nameZh: "錐形瓶", easy: "Wide bottom, narrow neck — easy to swirl without spilling.", exam: "Contains a solution that is shaken or swirled.", photo: true, diagram: true },
  { id: "filter-funnel", letter: "(d)", name: "Filter funnel", nameZh: "過濾漏斗", easy: "A cone that holds filter paper to separate solid from liquid.", exam: "Filters a suspension.", photo: true, diagram: true },
  { id: "glass-rod", letter: "(e)", name: "Glass rod", nameZh: "玻璃棒", easy: "A stick for stirring, or for pouring liquid onto filter paper.", exam: "Stirs a mixture; guides liquid onto filter paper.", photo: true, diagram: true },
  { id: "dropper", letter: "(f)", name: "Dropper", nameZh: "滴管", easy: "Adds liquid one drop at a time.", exam: "Adds drop quantities of a liquid.", photo: true, diagram: true },
  { id: "tripod", letter: "(g)", name: "Tripod", nameZh: "三腳架", easy: "A three-legged stand that sits over a Bunsen burner.", exam: "Supports a wire gauze or pipe-clay triangle over a Bunsen burner.", photo: true, diagram: true },
  { id: "wire-gauze", letter: "(h)", name: "Wire gauze", nameZh: "鐵絲網", easy: "Metal mesh that spreads heat under a beaker.", exam: "Supports a beaker or evaporating dish on a tripod while heating.", photo: true, diagram: true },
  { id: "evaporating-dish", letter: "(i)", name: "Evaporating dish", nameZh: "蒸發皿", easy: "A shallow dish. Heat a solution until only solid is left.", exam: "Contains a solution which is to be evaporated to dryness.", photo: true, diagram: true },
  { id: "bunsen-burner", letter: "(j)", name: "Bunsen burner", nameZh: "本生燈", easy: "Makes a flame for heating. Stand it on a heat-resistant mat.", exam: "Provides a flame for heating.", photo: true, diagram: true },
  { id: "measuring-cylinder", letter: "", name: "Measuring cylinder", nameZh: "量筒", easy: "A tall marked tube for measuring liquid volume.", exam: "Measure the volume of a liquid.", photo: true, diagram: true },
  { id: "round-bottomed-flask", letter: "", name: "Round-bottomed flask", nameZh: "圓底燒瓶", easy: "Round bottom — it cannot stand by itself. Use a clamp.", exam: "Contains a liquid, often held with a stand and clamp.", photo: true, diagram: true },
  { id: "watch-glass", letter: "", name: "Watch glass", nameZh: "表面皿", easy: "A small curved glass dish for a pinch of solid, or as a cover.", exam: "Holds a small amount of solid, or covers a beaker.", photo: true, diagram: true },
  { id: "thermometer", letter: "", name: "Thermometer", nameZh: "溫度計", easy: "Tells you how hot or cold something is.", exam: "Measures temperature.", photo: true, diagram: true },
  { id: "crucible", letter: "", name: "Crucible", nameZh: "坩堝", easy: "A small ceramic pot for heating a solid very strongly.", exam: "Contains a solid which is heated strongly.", photo: true, diagram: true },
  { id: "heat-proof-mat", letter: "", name: "Heat-resistant mat", nameZh: "耐熱墊", easy: "Protects the bench from a hot flame or hot glass.", exam: "Provides a heat-resistant surface for placing a hot object / Bunsen burner.", photo: true, diagram: false },
  { id: "stand-and-clamp", letter: "", name: "Stand and clamp", nameZh: "鐵架和夾", easy: "Holds apparatus still, such as a funnel or flask.", exam: "Supports apparatus (e.g. a funnel or flask).", photo: true, diagram: true },
  { id: "test-tube-holder", letter: "", name: "Test tube holder", nameZh: "試管夾", easy: "A clip so you can heat a test tube without burning your fingers.", exam: "Holds a test tube for heating.", photo: true, diagram: false },
  { id: "test-tube-rack", letter: "", name: "Test tube rack", nameZh: "試管架", easy: "Keeps test tubes upright on the bench.", exam: "Holds test tubes upright.", photo: true, diagram: false },
  { id: "spatula", letter: "", name: "Spatula", nameZh: "藥匙", easy: "A small scoop for moving a little bit of solid, like salt.", exam: "Transfers a small amount of a solid.", photo: true, diagram: false },
  { id: "pestle-and-mortar", letter: "", name: "Mortar and pestle", nameZh: "研缽和研杵", easy: "A bowl and grinder for crushing a solid into powder.", exam: "Grinds a solid into fine powder.", photo: true, diagram: false },
  { id: "gas-jar", letter: "", name: "Gas jar", nameZh: "集氣瓶", easy: "A tall jar for collecting a gas.", exam: "Collects a gas.", photo: true, diagram: false },
  { id: "desiccator", letter: "", name: "Desiccator", nameZh: "乾燥器", easy: "A lidded pot that keeps a solid dry.", exam: "Dries a solid.", photo: true, diagram: false },
  { id: "electronic-balance", letter: "", name: "Electronic balance", nameZh: "電子天平", easy: "A digital scale for finding the mass of something.", exam: "Measures the mass of an object (up to 0.0001 g in the exercise).", photo: true, diagram: false },
];

const EXTRA_NAMES = {
  "gas-syringe": { name: "Gas syringe", nameZh: "氣體注射筒" },
};

const JOB_HELP = {
  1: { trap: "Common mix-up: measuring cylinder = measure the volume of a liquid (Q.5.9), not a gas. Tip: write gas syringe." },
  4: { trap: "Common mix-up: thermometer measures temperature. Q.5 stir a mixture = glass rod." },
  6: { trap: "Common mix-up: evaporating dish = solution evaporated to dryness (Q.5.16). Crucible = solid heated strongly (Q.5.6)." },
  9: { trap: "Common mix-up: a beaker contains / mixes solutions. It is not the Q.5 answer for measure the volume of a liquid." },
  10: { trap: "Common mix-up: measuring cylinder = volume of a liquid (Q.5.9). Dropper = add drop quantities of a liquid (Q.5.10)." },
  11: { trap: "Common mix-up: beaker can collect filtrate, but Q.5.11 is filter funnel — filter a suspension." },
  14: { trap: "Common mix-up: either test tube or beaker scores. Do not write evaporating dish or crucible." },
  16: { trap: "Common mix-up: watch glass holds a small amount of solid. Q.5.16 is evaporating dish — solution evaporated to dryness." },
};

const STREAK_TIERS = [
  { min: 0, label: "Ready", vibe: "calm", note: "Correct answers in a row" },
  { min: 1, label: "Getting started", vibe: "warm", note: "First correct answer" },
  { min: 2, label: "Focused", vibe: "hot", note: "Two in a row" },
  { min: 3, label: "Steady", vibe: "fire", note: "Keep checking the model answer" },
  { min: 5, label: "Confident", vibe: "scary", note: "Five correct in a row" },
  { min: 7, label: "Lab ready", vibe: "boss", note: "Work carefully and keep going" },
  { min: 10, label: "Excellent", vibe: "mythic", note: "Ten in a row — stay accurate" },
  { min: 15, label: "Outstanding", vibe: "final", note: "Fifteen in a row. Keep that standard" },
];

const WIN_MEMES = [
  "That matches the model answer.",
  "Clear and accurate.",
  "Well chosen.",
  "Keep that standard.",
  "Good laboratory thinking.",
];

const MISS_MEMES = [
  "Check the model answer below.",
  "A common mix-up — read the note.",
  "Compare the shape once more.",
  "Use the hint, then try again.",
];

const JOB_Q = [
  { n: 1, easy: "You need to catch a gas and see how much there is.", exam: "Collect and measure the volume of a gas", hint: "This is about a gas, not a liquid.", answer: "Gas syringe", options: [{ id: null, label: "Gas syringe", nameZh: "氣體注射筒", diagram: "images/diagram-gas-syringe.jpg" }, { id: "conical-flask", label: "Conical flask" }, { id: "measuring-cylinder", label: "Measuring cylinder" }, { id: "dropper", label: "Dropper" }] },
  { n: 4, easy: "Mix a liquid by stirring.", exam: "Stir a mixture", hint: "A temperature tool is not a stirring tool.", answer: "Glass rod", options: [{ id: "glass-rod", label: "Glass rod" }, { id: "beaker", label: "Beaker" }, { id: "thermometer", label: "Thermometer" }, { id: "dropper", label: "Dropper" }] },
  { n: 6, easy: "Heat a solid very strongly (hotter than a dish of solution).", exam: "Contains a solid which is heated strongly", hint: "A dish of solution and a pot of solid are different jobs.", answer: "Crucible", options: [{ id: "crucible", label: "Crucible" }, { id: "evaporating-dish", label: "Evaporating dish" }, { id: "beaker", label: "Beaker" }, { id: "watch-glass", label: "Watch glass" }] },
  { n: 9, easy: "Measure 10 cm³ of a liquid carefully.", exam: "Measure the volume of a liquid", hint: "A cup that holds liquid is not the volume-measuring tool.", answer: "Measuring cylinder", options: [{ id: "measuring-cylinder", label: "Measuring cylinder" }, { id: "beaker", label: "Beaker" }, { id: "conical-flask", label: "Conical flask" }, { id: "dropper", label: "Dropper" }] },
  { n: 10, easy: "Add liquid a few drops at a time.", exam: "Add drop quantities of a liquid", hint: "A pour of liquid is not the same as a few drops.", answer: "Dropper", options: [{ id: "dropper", label: "Dropper" }, { id: "measuring-cylinder", label: "Measuring cylinder" }, { id: "glass-rod", label: "Glass rod" }, { id: "thermometer", label: "Thermometer" }] },
  { n: 11, easy: "Separate muddy water into mud and water.", exam: "Filter a suspension", hint: "Think of muddy water and paper.", answer: "Filter funnel", options: [{ id: "filter-funnel", label: "Filter funnel" }, { id: "evaporating-dish", label: "Evaporating dish" }, { id: "beaker", label: "Beaker" }, { id: "conical-flask", label: "Conical flask" }] },
  { n: 14, easy: "Mix two solutions in a small amount and watch if anything happens.", exam: "Mix solutions for observing any changes", hint: "Small amount, watch for a change — not heating to dryness.", answer: "Test tube / beaker", options: [{ id: "test-tube", extraId: "beaker", label: "Test tube / beaker", nameZh: "試管／燒杯", note: "Either scores." }, { id: "evaporating-dish", label: "Evaporating dish" }, { id: "measuring-cylinder", label: "Measuring cylinder" }, { id: "crucible", label: "Crucible" }] },
  { n: 16, easy: "Heat a salt solution until only dry salt is left.", exam: "Contain a solution which is to be evaporated to dryness", hint: "You need the leftover solid after the water is gone.", answer: "Evaporating dish", options: [{ id: "evaporating-dish", label: "Evaporating dish" }, { id: "beaker", label: "Beaker" }, { id: "crucible", label: "Crucible" }, { id: "watch-glass", label: "Watch glass" }] },
];

const KIT_ITEMS = [
  { ids: [], diagram: "images/diagram-gas-syringe.jpg", name: "Gas syringe", nameZh: "氣體注射筒", job: "Collect and measure the volume of a gas" },
  { ids: ["glass-rod"], name: "Glass rod", nameZh: "玻璃棒", job: "Stir a mixture" },
  { ids: ["crucible"], name: "Crucible", nameZh: "坩堝", job: "Contains a solid which is heated strongly" },
  { ids: ["measuring-cylinder"], name: "Measuring cylinder", nameZh: "量筒", job: "Measure the volume of a liquid" },
  { ids: ["dropper"], name: "Dropper", nameZh: "滴管", job: "Add drop quantities of a liquid" },
  { ids: ["filter-funnel"], name: "Filter funnel", nameZh: "過濾漏斗", job: "Filter a suspension" },
  { ids: ["test-tube", "beaker"], name: "Test tube / beaker", nameZh: "試管／燒杯", job: "Mix solutions for observing any changes", note: "Either scores." },
  { ids: ["evaporating-dish"], name: "Evaporating dish", nameZh: "蒸發皿", job: "Contain a solution which is to be evaporated to dryness" },
];

function byId(id) {
  return APPARATUS.find((item) => item.id === id);
}

function photoSrc(id) {
  return `images/${id}-photo.jpg`;
}

function diagramSrc(id) {
  return `images/${id}-diagram.jpg`;
}

function notesDiagramSrc(id) {
  return `images/notes-${id}-diagram.jpg`;
}

function optionZh(opt) {
  if (opt.nameZh) return opt.nameZh;
  const item = opt.id ? byId(opt.id) : null;
  return item && item.nameZh ? item.nameZh : "";
}

const PRAISE = [
  "Well spotted — that is exactly right.",
  "You read the shape carefully. Well done.",
  "That would score the mark.",
  "You chose the right apparatus.",
  "Nice work — keep looking at the details.",
  "The photo and the name agree.",
  "On to the next one.",
  "That is the model answer.",
  "A clean match.",
  "You compared the outline, not a guess.",
  "Trust that same careful look next time.",
  "The shape, the job, and the name all line up.",
  "Full mark on this one. Keep going.",
  "You noticed the detail that matters.",
  "That is how this question is marked.",
];

const WIN_TITLES = [
  "Correct — well done",
  "Yes — that is it",
  "Well chosen",
  "Full mark",
  "That’s the one",
  "Excellent match",
  "Got it in one",
  "Accurate work",
];

const STREAK_TITLES = [
  "{n} in a row — well done",
  "{n} correct in a row — keep going",
  "{n} in a row. Stay accurate",
  "{n} consecutive correct answers",
];

const MISS_TITLES = [
  "Not this time — check the model answer",
  "Close — have another look",
  "Not yet. Read the note below",
  "Almost — try once more",
  "Have another go",
  "Use the hint, then choose again",
];

const MISS_BODIES = [
  "Read the short explanation, then try again.",
  "First picks can be wrong. Compare the shape once more.",
  "Use the hint below, then choose again.",
  "Look at the outline, not the first name that comes to mind.",
  "Read what the question is actually asking.",
  "Pause, see why this one is different, then try a fresh answer.",
];

const PARTIAL_TITLES = [
  "Some of this set-up is already correct",
  "Part of the match is right — keep going",
  "Several slots are already correct",
  "You are part-way there",
];

const PARTIAL_BODIES = [
  "Keep the green matches, fix the rest, and check again.",
  "Do not clear the whole answer. Hold what is right and finish the gaps.",
  "Some ticks are already in place. Complete the rest carefully.",
  "One more careful pass should finish this set-up.",
];

const TRAY_META = {
  "filter-paper": { name: "Filter paper", photo: false },
  "pipe-clay-triangle": { name: "Pipe-clay triangle", photo: false },
};

function trayName(id) {
  if (TRAY_META[id]) return TRAY_META[id].name;
  const item = byId(id);
  return item ? item.name : id;
}

function trayHasPhoto(id) {
  if (TRAY_META[id]) return false;
  return true;
}

function trayHasDiagram(id) {
  if (TRAY_META[id]) return false;
  const item = byId(id);
  return Boolean(item && item.diagram);
}

function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
