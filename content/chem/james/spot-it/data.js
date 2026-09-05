const APPARATUS = [
  { id: "beaker", letter: "(a)", name: "Beaker", easy: "A glass cup for holding, mixing, or heating a larger amount of liquid.", exam: "Contains / mixes solutions; boils about 200 cm³ of water.", photo: true, diagram: true },
  { id: "test-tube", letter: "(b)", name: "Test tube", easy: "A small glass tube for a little liquid or a small reaction.", exam: "Mixes solutions to observe changes; heats a few cm³ of liquid.", photo: true, diagram: true },
  { id: "conical-flask", letter: "(c)", name: "Conical flask", easy: "Wide bottom, narrow neck — easy to swirl without spilling.", exam: "Contains a solution that is shaken or swirled.", photo: true, diagram: true },
  { id: "filter-funnel", letter: "(d)", name: "Filter funnel", easy: "A cone that holds filter paper to separate solid from liquid.", exam: "Filters a suspension.", photo: true, diagram: true },
  { id: "glass-rod", letter: "(e)", name: "Glass rod", easy: "A stick for stirring, or for pouring liquid onto filter paper.", exam: "Stirs a mixture; guides liquid onto filter paper.", photo: true, diagram: true },
  { id: "dropper", letter: "(f)", name: "Dropper", easy: "Adds liquid one drop at a time.", exam: "Adds drop quantities of a liquid.", photo: true, diagram: true },
  { id: "tripod", letter: "(g)", name: "Tripod", easy: "A three-legged stand that sits over a Bunsen burner.", exam: "Supports a wire gauze or pipe-clay triangle over a Bunsen burner.", photo: true, diagram: true },
  { id: "wire-gauze", letter: "(h)", name: "Wire gauze", easy: "Metal mesh that spreads heat under a beaker.", exam: "Supports a beaker or evaporating dish on a tripod while heating.", photo: true, diagram: true },
  { id: "evaporating-dish", letter: "(i)", name: "Evaporating dish", easy: "A shallow dish. Heat a solution until only solid is left.", exam: "Contains a solution which is to be evaporated to dryness.", photo: true, diagram: true },
  { id: "bunsen-burner", letter: "(j)", name: "Bunsen burner", easy: "Makes a flame for heating. Stand it on a heat-resistant mat.", exam: "Provides a flame for heating.", photo: true, diagram: true },
  { id: "measuring-cylinder", letter: "", name: "Measuring cylinder", easy: "A tall marked tube for measuring liquid volume.", exam: "Measure the volume of a liquid.", photo: true, diagram: true },
  { id: "round-bottomed-flask", letter: "", name: "Round-bottomed flask", easy: "Round bottom — it cannot stand by itself. Use a clamp.", exam: "Contains a liquid, often held with a stand and clamp.", photo: true, diagram: true },
  { id: "watch-glass", letter: "", name: "Watch glass", easy: "A small curved glass dish for a pinch of solid, or as a cover.", exam: "Holds a small amount of solid, or covers a beaker.", photo: true, diagram: true },
  { id: "thermometer", letter: "", name: "Thermometer", easy: "Tells you how hot or cold something is.", exam: "Measures temperature.", photo: true, diagram: true },
  { id: "crucible", letter: "", name: "Crucible", easy: "A small ceramic pot for heating a solid very strongly.", exam: "Contains a solid which is heated strongly.", photo: true, diagram: true },
  { id: "heat-proof-mat", letter: "", name: "Heat-resistant mat", easy: "Protects the bench from a hot flame or hot glass.", exam: "Provides a heat-resistant surface for placing a hot object / Bunsen burner.", photo: true, diagram: false },
  { id: "stand-and-clamp", letter: "", name: "Stand and clamp", easy: "Holds apparatus still, such as a funnel or flask.", exam: "Supports apparatus (e.g. a funnel or flask).", photo: true, diagram: true },
  { id: "test-tube-holder", letter: "", name: "Test tube holder", easy: "A clip so you can heat a test tube without burning your fingers.", exam: "Holds a test tube for heating.", photo: true, diagram: false },
  { id: "test-tube-rack", letter: "", name: "Test tube rack", easy: "Keeps test tubes upright on the bench.", exam: "Holds test tubes upright.", photo: true, diagram: false },
  { id: "spatula", letter: "", name: "Spatula", easy: "A small scoop for moving a little bit of solid, like salt.", exam: "Transfers a small amount of a solid.", photo: true, diagram: false },
  { id: "pestle-and-mortar", letter: "", name: "Mortar and pestle", easy: "A bowl and grinder for crushing a solid into powder.", exam: "Grinds a solid into fine powder.", photo: true, diagram: false },
  { id: "gas-jar", letter: "", name: "Gas jar", easy: "A tall jar for collecting a gas.", exam: "Collects a gas.", photo: true, diagram: false },
  { id: "desiccator", letter: "", name: "Desiccator", easy: "A lidded pot that keeps a solid dry.", exam: "Dries a solid.", photo: true, diagram: false },
  { id: "electronic-balance", letter: "", name: "Electronic balance", easy: "A digital scale for finding the mass of something.", exam: "Measures the mass of an object (up to 0.0001 g in the exercise).", photo: true, diagram: false },
];

const NAME_Q = [
  { key: "beaker-photo", id: "beaker", kind: "photo", options: ["Beaker", "Conical flask", "Crucible", "Measuring cylinder"] },
  { key: "conical-diagram", id: "conical-flask", kind: "diagram", options: ["Conical flask", "Beaker", "Round-bottomed flask", "Filter funnel"] },
  { key: "test-tube-photo", id: "test-tube", kind: "photo", options: ["Test tube", "Measuring cylinder", "Dropper", "Conical flask"] },
  { key: "cylinder-diagram", id: "measuring-cylinder", kind: "diagram", options: ["Measuring cylinder", "Test tube", "Filter funnel", "Dropper"] },
  { key: "funnel-photo", id: "filter-funnel", kind: "photo", options: ["Filter funnel", "Dropper", "Conical flask", "Measuring cylinder"] },
  { key: "rod-diagram", id: "glass-rod", kind: "diagram", options: ["Glass rod", "Thermometer", "Dropper", "Tripod"] },
  { key: "dropper-photo", id: "dropper", kind: "photo", options: ["Dropper", "Glass rod", "Thermometer", "Test tube"] },
  { key: "tripod-diagram", id: "tripod", kind: "diagram", options: ["Tripod", "Stand and clamp", "Wire gauze", "Bunsen burner"] },
  { key: "gauze-photo", id: "wire-gauze", kind: "photo", options: ["Wire gauze", "Watch glass", "Tripod", "Evaporating dish"] },
  { key: "dish-diagram", id: "evaporating-dish", kind: "diagram", options: ["Evaporating dish", "Watch glass", "Crucible", "Beaker"] },
  { key: "bunsen-photo", id: "bunsen-burner", kind: "photo", options: ["Bunsen burner", "Tripod", "Stand and clamp", "Dropper"] },
  { key: "watch-diagram", id: "watch-glass", kind: "diagram", options: ["Watch glass", "Evaporating dish", "Crucible", "Beaker"] },
  { key: "crucible-photo", id: "crucible", kind: "photo", options: ["Crucible", "Evaporating dish", "Beaker", "Watch glass"] },
  { key: "flask-diagram", id: "round-bottomed-flask", kind: "diagram", options: ["Round-bottomed flask", "Conical flask", "Beaker", "Filter funnel"] },
  { key: "thermo-photo", id: "thermometer", kind: "photo", options: ["Thermometer", "Glass rod", "Dropper", "Test tube"] },
  { key: "stand-diagram", id: "stand-and-clamp", kind: "diagram", options: ["Stand and clamp", "Tripod", "Bunsen burner", "Glass rod"] },
];

const FIND_Q = [
  { key: "find-beaker-photo", id: "beaker", kind: "photo", ids: ["beaker", "conical-flask", "crucible", "measuring-cylinder"] },
  { key: "find-beaker-diagram", id: "beaker", kind: "diagram", ids: ["beaker", "test-tube", "conical-flask", "watch-glass"] },
  { key: "find-flask-photo", id: "conical-flask", kind: "photo", ids: ["conical-flask", "beaker", "round-bottomed-flask", "filter-funnel"] },
  { key: "find-flask-diagram", id: "conical-flask", kind: "diagram", ids: ["round-bottomed-flask", "conical-flask", "beaker", "filter-funnel"] },
  { key: "find-tube-photo", id: "test-tube", kind: "photo", ids: ["measuring-cylinder", "test-tube", "dropper", "thermometer"] },
  { key: "find-cyl-diagram", id: "measuring-cylinder", kind: "diagram", ids: ["test-tube", "filter-funnel", "measuring-cylinder", "dropper"] },
  { key: "find-funnel-photo", id: "filter-funnel", kind: "photo", ids: ["dropper", "conical-flask", "filter-funnel", "round-bottomed-flask"] },
  { key: "find-rod-diagram", id: "glass-rod", kind: "diagram", ids: ["thermometer", "dropper", "glass-rod", "test-tube"] },
  { key: "find-dropper-photo", id: "dropper", kind: "photo", ids: ["glass-rod", "dropper", "thermometer", "test-tube"] },
  { key: "find-tripod-diagram", id: "tripod", kind: "diagram", ids: ["wire-gauze", "tripod", "bunsen-burner", "stand-and-clamp"] },
  { key: "find-gauze-photo", id: "wire-gauze", kind: "photo", ids: ["watch-glass", "tripod", "wire-gauze", "evaporating-dish"] },
  { key: "find-dish-diagram", id: "evaporating-dish", kind: "diagram", ids: ["watch-glass", "crucible", "beaker", "evaporating-dish"] },
  { key: "find-bunsen-photo", id: "bunsen-burner", kind: "photo", ids: ["tripod", "stand-and-clamp", "bunsen-burner", "dropper"] },
  { key: "find-watch-diagram", id: "watch-glass", kind: "diagram", ids: ["evaporating-dish", "watch-glass", "crucible", "beaker"] },
  { key: "find-crucible-photo", id: "crucible", kind: "photo", ids: ["evaporating-dish", "beaker", "watch-glass", "crucible"] },
  { key: "find-rbf-diagram", id: "round-bottomed-flask", kind: "diagram", ids: ["conical-flask", "beaker", "round-bottomed-flask", "filter-funnel"] },
];

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

const NAME_TRAPS = {
  "Beaker|Conical flask": "Common mix-up: conical flask = shaken or swirled. Beaker = contains / mixes solutions. Tip: neck vs spout.",
  "Conical flask|Beaker": "Common mix-up: beaker = contains / mixes solutions. Conical flask = shaken or swirled. Tip: look for the tapering neck.",
  "Conical flask|Round-bottomed flask": "Common mix-up: round-bottomed flask is held with a stand and clamp. Conical flask has a flat base.",
  "Round-bottomed flask|Conical flask": "Common mix-up: conical flask stands on the bench. Round-bottomed flask needs a stand and clamp.",
  "Test tube|Measuring cylinder": "Common mix-up: measuring cylinder = measure the volume of a liquid. Test tube = mix solutions / heat a few cm³.",
  "Measuring cylinder|Test tube": "Common mix-up: test tube is not the Q.5 volume tool. Measuring cylinder = measure the volume of a liquid.",
  "Evaporating dish|Watch glass": "Common mix-up: watch glass holds a small amount of solid. Evaporating dish = solution evaporated to dryness.",
  "Watch glass|Evaporating dish": "Common mix-up: evaporating dish = dryness. Watch glass = small amount of solid / covers a beaker.",
  "Evaporating dish|Crucible": "Common mix-up: crucible = solid heated strongly. Evaporating dish = solution evaporated to dryness.",
  "Crucible|Evaporating dish": "Common mix-up: evaporating dish is not Q.5.6. Crucible = solid heated strongly.",
  "Tripod|Stand and clamp": "Common mix-up: stand and clamp supports a funnel or flask. Tripod supports gauze or pipe-clay triangle over a Bunsen burner.",
  "Stand and clamp|Tripod": "Common mix-up: tripod sits over a Bunsen burner. Stand and clamp supports a funnel or flask.",
  "Wire gauze|Tripod": "Common mix-up: tripod is the stand. Wire gauze supports a beaker or evaporating dish on a tripod while heating.",
  "Glass rod|Thermometer": "Common mix-up: thermometer measures temperature. Glass rod stirs a mixture.",
  "Thermometer|Glass rod": "Common mix-up: glass rod stirs a mixture. Thermometer measures temperature.",
  "Dropper|Glass rod": "Common mix-up: glass rod stirs / guides liquid onto filter paper. Dropper = add drop quantities of a liquid.",
  "Filter funnel|Conical flask": "Common mix-up: conical flask is swirled. Filter funnel filters a suspension.",
  "Filter funnel|Dropper": "Common mix-up: dropper = drop quantities. Filter funnel filters a suspension.",
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
  { n: 1, easy: "You need to catch a gas and see how much there is.", exam: "Collect and measure the volume of a gas", answer: "Gas syringe", options: [{ id: null, label: "Gas syringe", diagram: "images/diagram-gas-syringe.jpg" }, { id: "conical-flask", label: "Conical flask" }, { id: "measuring-cylinder", label: "Measuring cylinder" }, { id: "dropper", label: "Dropper" }] },
  { n: 4, easy: "Mix a liquid by stirring.", exam: "Stir a mixture", answer: "Glass rod", options: [{ id: "glass-rod", label: "Glass rod" }, { id: "beaker", label: "Beaker" }, { id: "thermometer", label: "Thermometer" }, { id: "dropper", label: "Dropper" }] },
  { n: 6, easy: "Heat a solid very strongly (hotter than a dish of solution).", exam: "Contains a solid which is heated strongly", answer: "Crucible", options: [{ id: "crucible", label: "Crucible" }, { id: "evaporating-dish", label: "Evaporating dish" }, { id: "beaker", label: "Beaker" }, { id: "watch-glass", label: "Watch glass" }] },
  { n: 9, easy: "Measure 10 cm³ of a liquid carefully.", exam: "Measure the volume of a liquid", answer: "Measuring cylinder", options: [{ id: "measuring-cylinder", label: "Measuring cylinder" }, { id: "beaker", label: "Beaker" }, { id: "conical-flask", label: "Conical flask" }, { id: "dropper", label: "Dropper" }] },
  { n: 10, easy: "Add liquid a few drops at a time.", exam: "Add drop quantities of a liquid", answer: "Dropper", options: [{ id: "dropper", label: "Dropper" }, { id: "measuring-cylinder", label: "Measuring cylinder" }, { id: "glass-rod", label: "Glass rod" }, { id: "thermometer", label: "Thermometer" }] },
  { n: 11, easy: "Separate muddy water into mud and water.", exam: "Filter a suspension", answer: "Filter funnel", options: [{ id: "filter-funnel", label: "Filter funnel" }, { id: "evaporating-dish", label: "Evaporating dish" }, { id: "beaker", label: "Beaker" }, { id: "conical-flask", label: "Conical flask" }] },
  { n: 14, easy: "Mix two solutions in a small amount and watch if anything happens.", exam: "Mix solutions for observing any changes", answer: "Test tube / beaker", options: [{ id: "test-tube", label: "Test tube / beaker" }, { id: "evaporating-dish", label: "Evaporating dish" }, { id: "measuring-cylinder", label: "Measuring cylinder" }, { id: "crucible", label: "Crucible" }] },
  { n: 16, easy: "Heat a salt solution until only dry salt is left.", exam: "Contain a solution which is to be evaporated to dryness", answer: "Evaporating dish", options: [{ id: "evaporating-dish", label: "Evaporating dish" }, { id: "beaker", label: "Beaker" }, { id: "crucible", label: "Crucible" }, { id: "watch-glass", label: "Watch glass" }] },
];

const PACK = [
  { id: "i", easy: "Move a little solid salt from a bottle into a test tube.", exam: "Transferring a small amount of solid sodium chloride from the reagent bottle to a test tube.", need: ["spatula"], mark: "H Spatula only." },
  { id: "ii", easy: "Watch a small reaction: a few cm³ of dilute hydrochloric acid and an iron nail.", exam: "Studying the reaction between a few cm³ of dilute hydrochloric acid and an iron nail.", need: ["test-tube"], mark: "B Test tube / boiling tube only." },
  { id: "iii", easy: "Heat a small amount of water (only a few cm³).", exam: "Heating a few cm³ of water.", need: ["test-tube", "bunsen-burner", "heat-proof-mat", "test-tube-holder"], mark: "B, C, F, G — test tube, Bunsen burner, heat-resistant mat, test tube holder." },
  { id: "iv", easy: "Boil a mug-sized amount of water (about 200 cm³).", exam: "Boiling 200 cm³ of water.", need: ["beaker", "bunsen-burner", "wire-gauze", "tripod", "heat-proof-mat"], mark: "A, C, D, E, F — beaker, Bunsen burner, wire gauze, tripod, heat-resistant mat." },
];

const PACK_PIECES = [
  { id: "beaker", name: "Beaker", letter: "A" },
  { id: "test-tube", name: "Test tube", letter: "B" },
  { id: "bunsen-burner", name: "Bunsen burner", letter: "C" },
  { id: "wire-gauze", name: "Wire gauze", letter: "D" },
  { id: "tripod", name: "Tripod", letter: "E" },
  { id: "heat-proof-mat", name: "Heat-resistant mat", letter: "F" },
  { id: "test-tube-holder", name: "Test tube holder", letter: "G" },
  { id: "spatula", name: "Spatula", letter: "H" },
];

const CHARTS = [
  { src: "images/chart-tubes-beakers.jpg", title: "Test tube, beaker, measuring cylinder, filter funnel" },
  { src: "images/chart-flasks-dishes.jpg", title: "Conical flask, round-bottomed flask, evaporating dish, watch glass" },
  { src: "images/chart-heating-dropper.jpg", title: "Wire gauze, Bunsen burner, tripod, dropper" },
  { src: "images/chart-rod-thermo-crucible.jpg", title: "Glass rod, thermometer, crucible" },
];

const WALL_TABS = [
  { id: "all", label: "All" },
  { id: "glass", label: "Glassware" },
  { id: "heat", label: "Heating" },
  { id: "setup", label: "Set-ups" },
];

const WALL_ITEMS = [
  { tag: "glass", src: "images/chart-tubes-beakers.jpg", title: "Test tube, beaker, measuring cylinder, filter funnel" },
  { tag: "glass", src: "images/chart-flasks-dishes.jpg", title: "Conical flask, round-bottomed flask, evaporating dish, watch glass" },
  { tag: "heat", src: "images/chart-heating-dropper.jpg", title: "Wire gauze, Bunsen burner, tripod, dropper" },
  { tag: "heat", src: "images/chart-rod-thermo-crucible.jpg", title: "Glass rod, thermometer, crucible" },
  { tag: "setup", src: "images/setup-evaporation.jpg", title: "Topic 01 Q.3 — salt from sea water" },
  { tag: "setup", src: "images/setup-filtration.jpg", title: "Topic 01 Q.4 — mud and sea water" },
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

const TREE_Q = [
  {
    id: "vol",
    theme: "Precision vs rough containers",
    scene: "images/notes-volume-glassware.jpg",
    sceneCaption: "Laboratory safety notes §M",
    scenario: "You need to accurately measure 23.5 cm³ of dilute hydrochloric acid.",
    exam: "Pipette, burette and volumetric flask make accurate measurements of liquid volumes. A measuring cylinder makes a rough measurement.",
    options: [
      { label: "Beaker", id: "beaker", ok: false, fail: "Q.5: beaker contains / mixes solutions; boils about 200 cm³ of water.", trap: "Common mix-up: a beaker is not in notes §M with pipette / burette / volumetric flask. Those three make accurate volume measurements." },
      { label: "Measuring cylinder", id: "measuring-cylinder", ok: false, fail: "Notes §M: a measuring cylinder makes a rough measurement of liquid volume.", trap: "Common mix-up: Q.5.9 is measure the volume of a liquid = measuring cylinder. Accurate 23.5 cm³ is pipette / burette / volumetric flask." },
      { label: "Burette", ok: true, why: "Notes §M: pipette, burette and volumetric flask make accurate measurements of liquid volumes." },
    ],
  },
  {
    id: "hold",
    theme: "Precision vs rough containers",
    scenario: "You only need to hold and swirl a solution — you are not measuring a volume.",
    exam: "Conical flask: contains a solution that is shaken or swirled.",
    options: [
      { label: "Measuring cylinder", id: "measuring-cylinder", ok: false, fail: "Q.5.9: measuring cylinder — measure the volume of a liquid.", trap: "Common mix-up: do not swirl in a measuring cylinder. Tip: volume tool ≠ mixing flask." },
      { label: "Conical flask", id: "conical-flask", ok: true, why: "Contains a solution that is shaken or swirled." },
      { label: "Burette", ok: false, fail: "Notes §M: burette makes accurate measurements of liquid volumes.", trap: "Common mix-up: burette is for accurate volume, not swirling." },
    ],
  },
  {
    id: "heat-liq",
    theme: "Heating apparatus rules",
    scene: "images/diagram-beaker-heating.jpg",
    sceneCaption: "Notes: large quantity of liquid in a beaker on tripod and wire gauze",
    scenario: "You need to boil about 200 cm³ of water.",
    exam: "Q.6(iv): beaker, Bunsen burner, wire gauze, tripod, heat-resistant mat.",
    options: [
      { label: "Test tube on a holder", id: "test-tube", ok: false, fail: "Q.6(iii): heating a few cm³ of water — test tube, Bunsen burner, heat-resistant mat, test tube holder.", trap: "Common mix-up: few cm³ → test tube. 200 cm³ → beaker. Tip: match the volume in the question." },
      { label: "Beaker on tripod and wire gauze", id: "beaker", ok: true, why: "Q.6(iv): beaker, Bunsen burner, wire gauze, tripod, heat-resistant mat. Notes: heat a large quantity of liquid in a beaker on a tripod and wire gauze." },
      { label: "Crucible on a pipe-clay triangle", id: "crucible", ok: false, fail: "Q.5.6: crucible contains a solid which is heated strongly. Pipeclay triangle supports a crucible on a tripod.", trap: "Common mix-up: crucible is for a solid, not 200 cm³ of water." },
    ],
  },
  {
    id: "heat-sol",
    theme: "Heating apparatus rules",
    scene: "images/diagram-crucible-setup.jpg",
    sceneCaption: "Notes: solid heated strongly in a crucible on a pipe-clay triangle",
    scenario: "You need to heat a solid very strongly.",
    exam: "Crucible contains a solid which is heated strongly. A pipeclay triangle supports the crucible on a tripod.",
    options: [
      { label: "Evaporating dish on wire gauze", id: "evaporating-dish", ok: false, fail: "Q.5.16: evaporating dish contains a solution which is to be evaporated to dryness. Wire gauze supports a beaker or evaporating dish on a tripod while heating.", trap: "Common mix-up: dish = solution to dryness. Crucible = solid heated strongly." },
      { label: "Beaker on wire gauze", id: "beaker", ok: false, fail: "Q.5: beaker contains / mixes solutions; boils about 200 cm³ of water.", trap: "Common mix-up: beaker is for liquid. Strong heating of a solid is the crucible line." },
      { label: "Crucible on a pipe-clay triangle", id: "crucible", ok: true, why: "Contains a solid which is heated strongly. Pipeclay triangle supports a crucible on a tripod." },
    ],
  },
  {
    id: "solid",
    theme: "Solid handling",
    scenario: "Transfer a small amount of solid powder (for example sodium chloride) from a bottle into a test tube.",
    exam: "Q.6(i): spatula only. Notes: spatulas pick up small amounts of solids.",
    options: [
      { label: "Spatula", id: "spatula", ok: true, why: "Q.6(i): spatula only. Notes: spatulas pick up small amounts of solids." },
      { label: "Tongs", ok: false, fail: "Q.5: tongs pick up a hot evaporating dish.", trap: "Common mix-up: tongs = hot dish, not powder. Tip: spatula for a small amount of solid." },
      { label: "Dropper", id: "dropper", ok: false, fail: "Q.5.10: dropper — add drop quantities of a liquid.", trap: "Common mix-up: dropper is liquid drops, not solid." },
    ],
  },
  {
    id: "hot",
    theme: "Solid handling",
    scenario: "The evaporating dish (or crucible) is hot. You must move it.",
    exam: "Q.5: tongs pick up a hot evaporating dish.",
    options: [
      { label: "Spatula", id: "spatula", ok: false, fail: "Q.6(i): spatula — transferring a small amount of solid.", trap: "Common mix-up: spatula scoops solid. Hot dish = tongs." },
      { label: "Tongs / crucible tongs", ok: true, why: "Q.5: tongs pick up a hot evaporating dish." },
      { label: "Bare hands", ok: false, fail: "Q.5: tongs pick up a hot evaporating dish.", trap: "Common mix-up: never write bare hands. Tip: the model answer is tongs." },
    ],
  },
  {
    id: "light",
    theme: "Heating apparatus rules",
    scene: "images/diagram-bunsen-parts.jpg",
    sceneCaption: "Notes: how to light a Bunsen burner",
    scenario: "You are about to light a Bunsen burner.",
    exam: "Close the air hole first. Put a lighted match near the top of the barrel. Then turn on the gas tap. Open the air hole slowly until the flame is non-luminous.",
    options: [
      { label: "Open the air hole, then turn on the gas", ok: false, fail: "Notes: close the air hole first. Put a lighted match near the top of the barrel. Then turn on the gas tap.", trap: "Common mix-up: air hole is closed when lighting, then opened slowly. Tip: closed first is not a mistake." },
      { label: "Close the air hole, light a match at the barrel, then turn on the gas", ok: true, why: "Notes: close the air hole first. Put a lighted match near the top of the barrel. Then turn on the gas tap. Open the air hole slowly until the flame is non-luminous." },
      { label: "Turn on the gas, then look for a match", ok: false, fail: "Notes: put a lighted match near the top of the barrel, then turn on the gas tap.", trap: "Common mix-up: match at the barrel before the gas tap." },
    ],
  },
];

const EIGHT = ["beaker", "test-tube", "bunsen-burner", "wire-gauze", "tripod", "heat-proof-mat", "test-tube-holder", "spatula"];

const BUILD = [
  {
    id: "evap",
    title: "Salt from sea water",
    easy: "Build the evaporation set-up. Place each piece into W, X, Y and Z.",
    exam: "Topic 01 Q.3 — obtaining common salt from sea water.",
    photo: "images/setup-evaporation.jpg",
    diagram: "images/diagram-evaporation-setup.jpg",
    slots: [
      { id: "W", label: "W · top", answer: "evaporating-dish" },
      { id: "X", label: "X", answer: "wire-gauze" },
      { id: "Y", label: "Y", answer: "tripod" },
      { id: "Z", label: "Z · heat", answer: "bunsen-burner" },
    ],
    tray: ["evaporating-dish", "wire-gauze", "tripod", "bunsen-burner", "beaker", "crucible", "conical-flask", "heat-proof-mat"],
    mark: "W evaporating dish · X wire gauze · Y tripod · Z Bunsen burner",
  },
  {
    id: "filt",
    title: "Mud and sea water",
    easy: "Build the filtration set-up. Pour down a glass rod into a funnel.",
    exam: "Topic 01 Q.4 — separating mud from sea water.",
    photo: "images/setup-filtration.jpg",
    slots: [
      { id: "P", label: "P · pour", answer: "glass-rod" },
      { id: "Q", label: "Q · support", answer: "stand-and-clamp" },
      { id: "R", label: "R · in the funnel", answer: "filter-paper" },
      { id: "S", label: "S · funnel", answer: "filter-funnel" },
      { id: "T", label: "T · collect", answer: "beaker" },
    ],
    tray: ["glass-rod", "stand-and-clamp", "filter-paper", "filter-funnel", "beaker", "dropper", "conical-flask", "measuring-cylinder"],
    mark: "P glass rod · Q stand and clamp · R filter paper · S filter funnel · T beaker",
  },
  {
    id: "boil",
    title: "Boil 200 cm³ of water",
    easy: "A large volume needs a beaker on gauze — not a test tube. Stack from the bench up.",
    exam: "Topic 01 Q.6(iv) and Laboratory safety: heat a large quantity in a beaker on a tripod and wire gauze.",
    photo: "images/diagram-beaker-heating.jpg",
    slots: [
      { id: "1", label: "On the bench", answer: "heat-proof-mat" },
      { id: "2", label: "Heat source", answer: "bunsen-burner" },
      { id: "3", label: "Stand", answer: "tripod" },
      { id: "4", label: "Spreads the heat", answer: "wire-gauze" },
      { id: "5", label: "Holds 200 cm³", answer: "beaker" },
    ],
    tray: ["heat-proof-mat", "bunsen-burner", "tripod", "wire-gauze", "beaker", "test-tube", "evaporating-dish", "conical-flask"],
    mark: "A, C, D, E, F — beaker, Bunsen burner, wire gauze, tripod, heat-resistant mat",
  },
  {
    id: "few",
    title: "Heat a few cm³ of water",
    easy: "Only a little liquid — use a test tube, not a beaker.",
    exam: "Topic 01 Q.6(iii).",
    photo: "images/setup-eight-pieces.jpg",
    slots: [
      { id: "1", label: "On the bench", answer: "heat-proof-mat" },
      { id: "2", label: "Heat source", answer: "bunsen-burner" },
      { id: "3", label: "Holds the tube", answer: "test-tube-holder" },
      { id: "4", label: "A few cm³ of water", answer: "test-tube" },
    ],
    tray: ["heat-proof-mat", "bunsen-burner", "test-tube-holder", "test-tube", "beaker", "wire-gauze", "tripod", "spatula"],
    mark: "B, C, F, G — test tube, Bunsen burner, heat-resistant mat, test tube holder",
  },
  {
    id: "crucible",
    title: "Heat a solid very strongly",
    easy: "A crucible sits on a pipe-clay triangle on a tripod — not on wire gauze.",
    exam: "Laboratory safety notes: very strong heating of a solid in a crucible.",
    photo: "images/diagram-crucible-setup.jpg",
    slots: [
      { id: "1", label: "On the bench", answer: "heat-proof-mat" },
      { id: "2", label: "Heat source", answer: "bunsen-burner" },
      { id: "3", label: "Stand", answer: "tripod" },
      { id: "4", label: "Supports the crucible", answer: "pipe-clay-triangle" },
      { id: "5", label: "Holds the solid", answer: "crucible" },
    ],
    tray: ["heat-proof-mat", "bunsen-burner", "tripod", "pipe-clay-triangle", "crucible", "wire-gauze", "evaporating-dish", "beaker"],
    mark: "Heat-resistant mat, Bunsen burner, tripod, pipe-clay triangle, crucible",
  },
  {
    id: "bath",
    title: "Evaporate a few drops on a watch glass",
    easy: "Dickson’s salt experiment: a watch glass of solution sits on a beaker of boiling water.",
    exam: "Topic 01 Q.10 step 4 — water-bath evaporation.",
    photo: "images/setup-watchglass-bath.jpg",
    slots: [
      { id: "1", label: "On the bench", answer: "heat-proof-mat" },
      { id: "2", label: "Heat source", answer: "bunsen-burner" },
      { id: "3", label: "Stand", answer: "tripod" },
      { id: "4", label: "Spreads the heat", answer: "wire-gauze" },
      { id: "5", label: "Boiling water", answer: "beaker" },
      { id: "6", label: "Holds the drops", answer: "watch-glass" },
    ],
    tray: ["heat-proof-mat", "bunsen-burner", "tripod", "wire-gauze", "beaker", "watch-glass", "evaporating-dish", "test-tube"],
    mark: "Heat-resistant mat, Bunsen burner, tripod, wire gauze, beaker, watch glass",
  },
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
