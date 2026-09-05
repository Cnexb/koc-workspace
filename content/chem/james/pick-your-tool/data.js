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

const EXTRA_GEAR = {
  burette: {
    name: "Burette",
    nameZh: "滴定管",
    easy: "A tall glass tube with a tap. Use it when the volume must be accurate.",
    exam: "Makes accurate measurements of liquid volumes.",
    icon: "images/burette.svg",
  },
  pipette: {
    name: "Pipette",
    nameZh: "移液管",
    easy: "Delivers one accurate volume of liquid, such as 25.0 cm³.",
    exam: "Makes accurate measurements of liquid volumes.",
    icon: "images/pipette.svg",
  },
  "volumetric-flask": {
    name: "Volumetric flask",
    nameZh: "容量瓶",
    easy: "Makes one accurate volume of solution when filled to the mark.",
    exam: "Makes accurate measurements of liquid volumes.",
    icon: "images/volumetric-flask.svg",
  },
  "pipe-clay-triangle": {
    name: "Pipe-clay triangle",
    nameZh: "泥三角",
    easy: "A clay-covered triangle that holds a crucible on a tripod.",
    exam: "Supports a crucible on a tripod.",
    icon: "images/pipe-clay-triangle.svg",
  },
  tongs: {
    name: "Tongs / crucible tongs",
    nameZh: "坩堝鉗",
    easy: "Metal clips for picking up a hot evaporating dish or crucible.",
    exam: "Pick up a hot evaporating dish.",
    icon: "images/tongs.svg",
  },
  spatula: {
    name: "Spatula",
    nameZh: "藥匙",
    easy: "A small scoop for moving a little bit of solid, like salt.",
    exam: "Transfers a small amount of a solid.",
    icon: "images/spatula.svg",
  },
  "heat-proof-mat": {
    name: "Heat-resistant mat",
    nameZh: "耐熱墊",
    easy: "Protects the bench from a hot flame or hot glass.",
    exam: "Provides a heat-resistant surface for placing a hot object / Bunsen burner.",
    icon: "images/heat-proof-mat.svg",
  },
  "bare-hands": {
    name: "Bare hands",
    nameZh: "徒手",
    easy: "Never pick up hot apparatus with bare hands.",
    exam: "Not an apparatus — use tongs.",
    icon: "images/bare-hands.svg",
  },
};

const KIT_GROUPS = [
  { id: "volume", title: "Volume", titleZh: "量度體積", ids: ["beaker", "measuring-cylinder", "conical-flask", "burette", "pipette", "volumetric-flask"] },
  { id: "heating", title: "Heating", titleZh: "加熱", ids: ["test-tube", "crucible", "evaporating-dish", "bunsen-burner", "tripod", "wire-gauze", "pipe-clay-triangle", "heat-proof-mat"] },
  { id: "solids", title: "Solids", titleZh: "固體", ids: ["spatula", "tongs", "dropper"] },
];

const TREE_EASY = ["solid", "hot", "heat-liq", "hold", "heat-few", "evap", "drops", "stir"];
const TREE_MID = ["heat-sol", "light", "triangle", "holder"];
const TREE_HARD = ["vol", "std-sol"];
const TREE_TRIAL = 7;

const LEARN_POINTS = [
  "Accurate volume (burette / pipette / volumetric flask) is not the same as a rough volume (measuring cylinder).",
  "A large amount of liquid is heated in a beaker on tripod and gauze. A solid heated strongly goes in a crucible on a pipe-clay triangle.",
  "Spatula for powder, tongs for a hot dish, never bare hands. Light a Bunsen with the air hole closed and a match ready first.",
];

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
  "You matched the job to the right apparatus.",
  "That is the tool for this job.",
  "Clear laboratory thinking.",
  "Keep matching the job, not the first name you know.",
  "That would score the mark.",
];

const MISS_MEMES = [
  "Read why this tool is the wrong job.",
  "A common mix-up — try again.",
  "Use the hint, then choose again.",
  "Think about what the question is asking you to do.",
];

const PRAISE = [
  "You matched the job to the right apparatus.",
  "That is the tool this job needs.",
  "That would score the mark.",
  "You chose the right apparatus.",
  "Good laboratory thinking. Keep going.",
  "You read the job, not just a familiar name.",
  "On to the next one.",
  "That is the model answer.",
  "A clean match.",
  "You compared the uses, not a guess.",
  "Trust that same careful look next time.",
  "The job and the apparatus line up.",
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
  "Right tool",
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
  "Not this time — check the note",
  "Close — have another look",
  "Not yet. Read the note below",
  "Almost — try once more",
  "Have another go",
  "Use the hint, then choose again",
];

const MISS_BODIES = [
  "Read the short explanation, then try again.",
  "First picks can be wrong. Think about the job once more.",
  "Use the hint, then choose again.",
  "Do not pick the first familiar name.",
  "Read what the question is actually asking you to do.",
  "Pause, see why this tool is different, then try a fresh answer.",
];

const TREE_Q = [
  {
    id: "vol",
    theme: "Accurate volume vs rough volume",
    scenario: "You need to accurately measure 23.5 cm³ of dilute hydrochloric acid.",
    hint: "Think accurate vs rough. A marked cylinder is useful, but it is not the most accurate tool.",
    exam: "Pipette, burette and volumetric flask make accurate measurements of liquid volumes. A measuring cylinder makes a rough measurement.",
    options: [
      { label: "Beaker", id: "beaker", ok: false, fail: "A beaker holds or mixes a liquid. It is not for an accurate volume like 23.5 cm³.", trap: "A beaker has no precise volume scale for this job. Accurate volume tools are pipette, burette, or volumetric flask.", examRef: "Q.5: beaker contains / mixes solutions." },
      { label: "Measuring cylinder", id: "measuring-cylinder", ok: false, fail: "A measuring cylinder gives a rough volume. 23.5 cm³ needs an accurate tool.", trap: "Q.5.9 “measure the volume of a liquid” is often a measuring cylinder. This question says accurately — that is burette / pipette / volumetric flask.", examRef: "Notes §M: measuring cylinder = rough measurement." },
      { label: "Burette", id: "burette", ok: true, why: "A burette (or a pipette, or a volumetric flask) is for an accurate liquid volume. A measuring cylinder is only rough." },
    ],
  },
  {
    id: "hold",
    theme: "Accurate volume vs rough volume",
    scenario: "You only need to hold and swirl a solution — you are not measuring a volume.",
    hint: "You are mixing, not measuring.",
    exam: "Conical flask: contains a solution that is shaken or swirled.",
    options: [
      { label: "Measuring cylinder", id: "measuring-cylinder", ok: false, fail: "A measuring cylinder is for measuring volume. Do not swirl a solution in it.", trap: "Volume tool ≠ mixing flask.", examRef: "Q.5.9: measuring cylinder — measure the volume of a liquid." },
      { label: "Conical flask", id: "conical-flask", ok: true, why: "A conical flask holds a solution that you shake or swirl. The narrow neck helps stop spills." },
      { label: "Burette", id: "burette", ok: false, fail: "A burette is for accurate volume, not for swirling a solution.", trap: "Save the burette for accurate measuring.", examRef: "Notes §M: burette makes accurate measurements of liquid volumes." },
    ],
  },
  {
    id: "heat-liq",
    theme: "Heating apparatus rules",
    scenario: "You need to boil about 200 cm³ of water.",
    hint: "Match the volume. A few cm³ and 200 cm³ need different glass.",
    exam: "Q.6(iv): beaker, Bunsen burner, wire gauze, tripod, heat-resistant mat.",
    options: [
      { label: "Test tube on a holder", id: "test-tube", note: "On a holder", ok: false, fail: "A test tube is for a few cm³ of liquid, not about 200 cm³.", trap: "Few cm³ → test tube. 200 cm³ → beaker.", examRef: "Q.6(iii): heating a few cm³ of water." },
      { label: "Beaker on tripod and wire gauze", id: "beaker", note: "On tripod and gauze", ok: true, why: "A large volume of liquid is heated in a beaker on a tripod and wire gauze, with a Bunsen burner and heat-resistant mat." },
      { label: "Crucible on a pipe-clay triangle", id: "crucible", note: "On a pipe-clay triangle", ok: false, fail: "A crucible is for heating a solid strongly, not 200 cm³ of water.", trap: "Crucible = solid. Beaker = a large amount of liquid.", examRef: "Q.5.6: crucible contains a solid which is heated strongly." },
    ],
  },
  {
    id: "heat-sol",
    theme: "Heating apparatus rules",
    scenario: "You need to heat a solid very strongly.",
    hint: "A dish of solution and a pot of solid are different jobs.",
    exam: "Crucible contains a solid which is heated strongly. A pipeclay triangle supports the crucible on a tripod.",
    options: [
      { label: "Evaporating dish on wire gauze", id: "evaporating-dish", note: "On wire gauze", ok: false, fail: "An evaporating dish is for a solution you heat until only solid is left. It is not for heating a solid very strongly.", trap: "Dish = solution to dryness. Crucible = solid heated strongly.", examRef: "Q.5.16: evaporating dish — solution evaporated to dryness." },
      { label: "Beaker on wire gauze", id: "beaker", note: "On wire gauze", ok: false, fail: "A beaker is for liquid. Strong heating of a solid needs a crucible.", trap: "Beaker = liquid. Strong heating of a solid = crucible.", examRef: "Q.5: beaker contains / mixes solutions; boils about 200 cm³ of water." },
      { label: "Crucible on a pipe-clay triangle", id: "crucible", note: "On a pipe-clay triangle", ok: true, why: "A crucible holds a solid heated strongly. A pipe-clay triangle supports the crucible on a tripod." },
    ],
  },
  {
    id: "solid",
    theme: "Solid handling",
    scenario: "Transfer a small amount of solid powder (for example sodium chloride) from a bottle into a test tube.",
    hint: "Powder from a bottle — not a hot dish, and not a liquid drop.",
    exam: "Q.6(i): spatula only. Notes: spatulas pick up small amounts of solids.",
    options: [
      { label: "Spatula", id: "spatula", ok: true, why: "A spatula scoops a small amount of solid, such as salt, from a bottle." },
      { label: "Tongs", id: "tongs", ok: false, fail: "Tongs pick up a hot dish. They are not for scooping powder.", trap: "Tongs = hot dish. Spatula = a small amount of solid.", examRef: "Q.5: tongs pick up a hot evaporating dish." },
      { label: "Dropper", id: "dropper", ok: false, fail: "A dropper adds drops of liquid, not solid powder.", trap: "Dropper is liquid drops, not solid.", examRef: "Q.5.10: dropper — add drop quantities of a liquid." },
    ],
  },
  {
    id: "hot",
    theme: "Solid handling",
    scenario: "The evaporating dish (or crucible) is hot. You must move it.",
    hint: "The dish is hot. What keeps your fingers safe?",
    exam: "Q.5: tongs pick up a hot evaporating dish.",
    options: [
      { label: "Spatula", id: "spatula", ok: false, fail: "A spatula scoops powder. It cannot pick up a hot dish safely.", trap: "Spatula scoops solid. Hot dish = tongs.", examRef: "Q.6(i): spatula — transferring a small amount of solid." },
      { label: "Tongs / crucible tongs", id: "tongs", ok: true, why: "Tongs (crucible tongs) pick up a hot evaporating dish or crucible." },
      { label: "Bare hands", id: "bare-hands", ok: false, fail: "Never pick up hot apparatus with bare hands. Use tongs.", trap: "The model answer is tongs.", examRef: "Q.5: tongs pick up a hot evaporating dish." },
    ],
  },
  {
    id: "light",
    theme: "Heating apparatus rules",
    scenario: "You are about to light a Bunsen burner.",
    hint: "Have the match ready at the barrel before the gas comes out. The air hole starts closed.",
    exam: "Close the air hole first. Put a lighted match near the top of the barrel. Then turn on the gas tap. Open the air hole slowly until the flame is non-luminous.",
    options: [
      { label: "Open the air hole, then turn on the gas", nameZh: "先開氣孔，再開煤氣", icon: "images/bunsen-open-first.svg", ok: false, fail: "Close the air hole first. Then put a lighted match at the barrel, then turn on the gas.", trap: "The air hole is closed when you light, then opened slowly.", examRef: "Notes: close the air hole first." },
      { label: "Close the air hole, light a match at the barrel, then turn on the gas", nameZh: "先關氣孔，在燈管口點火，再開煤氣", icon: "images/bunsen-match-then-gas.svg", ok: true, why: "Close the air hole first. Put a lighted match near the top of the barrel. Then turn on the gas tap. Open the air hole slowly until the flame is non-luminous (pale blue)." },
      { label: "Turn on the gas, then look for a match", nameZh: "先開煤氣，再找火柴", icon: "images/bunsen-gas-first.svg", ok: false, fail: "The match should already be at the barrel before you turn on the gas.", trap: "Match first, then gas. Gas first can let unburnt gas build up.", examRef: "Notes: match at the barrel, then the gas tap." },
    ],
  },
  {
    id: "heat-few",
    theme: "Heating apparatus rules",
    scenario: "You need to heat only a few cm³ of water.",
    hint: "A small volume does not need a beaker on a tripod.",
    exam: "Q.6(iii): test tube, Bunsen burner, heat-resistant mat, test tube holder.",
    options: [
      { label: "Beaker on tripod and wire gauze", id: "beaker", note: "On tripod and gauze", ok: false, fail: "A beaker on gauze is for a large volume, such as 200 cm³.", trap: "Few cm³ → test tube. 200 cm³ → beaker.", examRef: "Q.6(iv): boiling 200 cm³ of water." },
      { label: "Test tube on a holder", id: "test-tube", note: "On a holder", ok: true, why: "A few cm³ of liquid is heated in a test tube held with a test tube holder." },
      { label: "Crucible on a pipe-clay triangle", id: "crucible", note: "On a pipe-clay triangle", ok: false, fail: "A crucible is for heating a solid strongly, not a few cm³ of water.", trap: "Crucible = solid. Small liquid = test tube.", examRef: "Q.5.6: crucible contains a solid which is heated strongly." },
    ],
  },
  {
    id: "evap",
    theme: "Heating apparatus rules",
    scenario: "You need to heat a salt solution until only dry salt is left.",
    hint: "You start with a solution and want the leftover solid after the water is gone.",
    exam: "Q.5.16: evaporating dish contains a solution which is to be evaporated to dryness.",
    options: [
      { label: "Crucible", id: "crucible", ok: false, fail: "A crucible is for heating a solid strongly, not for drying a solution.", trap: "Dish = solution to dryness. Crucible = solid heated strongly.", examRef: "Q.5.6: crucible contains a solid which is heated strongly." },
      { label: "Evaporating dish", id: "evaporating-dish", ok: true, why: "An evaporating dish holds a solution that is heated until only solid is left." },
      { label: "Watch glass", id: "watch-glass", ok: false, fail: "A watch glass holds a small amount of solid, or covers a beaker. It is not the usual dish for evaporating a solution to dryness.", trap: "Watch glass = small solid / cover. Dryness of a solution = evaporating dish.", examRef: "Q.5: watch glass holds a small amount of solid." },
    ],
  },
  {
    id: "drops",
    theme: "Solid handling",
    scenario: "You need to add liquid a few drops at a time.",
    hint: "A pour of liquid is not the same as a few drops.",
    exam: "Q.5.10: dropper — add drop quantities of a liquid.",
    options: [
      { label: "Measuring cylinder", id: "measuring-cylinder", ok: false, fail: "A measuring cylinder measures a volume. It is not for adding a few drops.", trap: "Cylinder = volume. Drops = dropper.", examRef: "Q.5.9: measuring cylinder — measure the volume of a liquid." },
      { label: "Glass rod", id: "glass-rod", ok: false, fail: "A glass rod stirs a mixture, or guides liquid onto filter paper. It does not add drops.", trap: "Rod = stir / pour guide. Drops = dropper.", examRef: "Q.5: glass rod stirs a mixture." },
      { label: "Dropper", id: "dropper", ok: true, why: "A dropper adds a liquid one drop at a time." },
    ],
  },
  {
    id: "stir",
    theme: "Solid handling",
    scenario: "You need to stir a mixture.",
    hint: "A temperature tool is not a stirring tool.",
    exam: "Q.5: glass rod stirs a mixture.",
    options: [
      { label: "Thermometer", id: "thermometer", ok: false, fail: "A thermometer measures temperature. It is not the stirring tool.", trap: "Thermometer = temperature. Stirring = glass rod.", examRef: "Q.5: thermometer measures temperature." },
      { label: "Glass rod", id: "glass-rod", ok: true, why: "A glass rod stirs a mixture. It can also guide liquid onto filter paper." },
      { label: "Dropper", id: "dropper", ok: false, fail: "A dropper adds drops of liquid. It is not for stirring.", trap: "Dropper = drops. Stir = glass rod.", examRef: "Q.5.10: dropper — add drop quantities of a liquid." },
    ],
  },
  {
    id: "triangle",
    theme: "Heating apparatus rules",
    scenario: "A crucible must sit on a tripod over a Bunsen burner. What supports the crucible?",
    hint: "Wire gauze is for a beaker or evaporating dish, not a crucible.",
    exam: "A pipeclay triangle supports a crucible on a tripod.",
    options: [
      { label: "Wire gauze", id: "wire-gauze", ok: false, fail: "Wire gauze supports a beaker or evaporating dish. A crucible sits on a pipe-clay triangle.", trap: "Gauze = beaker / dish. Triangle = crucible.", examRef: "Q.5: wire gauze supports a beaker or evaporating dish on a tripod while heating." },
      { label: "Pipe-clay triangle", id: "pipe-clay-triangle", ok: true, why: "A pipe-clay triangle holds a crucible on a tripod so it can be heated strongly." },
      { label: "Heat-resistant mat", id: "heat-proof-mat", ok: false, fail: "A heat-resistant mat protects the bench. It does not hold the crucible on the tripod.", trap: "Mat = bench. Triangle = crucible on tripod.", examRef: "Q.5: heat-resistant mat provides a heat-resistant surface." },
    ],
  },
  {
    id: "holder",
    theme: "Heating apparatus rules",
    scenario: "You must heat a test tube without burning your fingers.",
    hint: "You need a clip for the tube, not a stand for a flask.",
    exam: "Q.5: test tube holder holds a test tube for heating.",
    options: [
      { label: "Tongs / crucible tongs", id: "tongs", ok: false, fail: "Tongs pick up a hot dish or crucible. They are not the usual clip for a test tube.", trap: "Tongs = hot dish. Test tube = test tube holder.", examRef: "Q.5: tongs pick up a hot evaporating dish." },
      { label: "Stand and clamp", id: "stand-and-clamp", ok: false, fail: "A stand and clamp holds a funnel or flask still. For heating a test tube, use a test tube holder.", trap: "Clamp = flask / funnel. Tube being heated = test tube holder.", examRef: "Q.5: stand and clamp supports apparatus (e.g. a funnel or flask)." },
      { label: "Test tube holder", id: "test-tube-holder", ok: true, why: "A test tube holder is a clip so you can heat a test tube without burning your fingers." },
    ],
  },
  {
    id: "std-sol",
    theme: "Accurate volume vs rough volume",
    scenario: "You need to make one accurate volume of solution, for example 250.0 cm³, filled to a mark.",
    hint: "Think of one exact volume in a flask, not a tap-tube for running liquid out.",
    exam: "Notes §M: pipette, burette and volumetric flask make accurate measurements of liquid volumes.",
    options: [
      { label: "Measuring cylinder", id: "measuring-cylinder", ok: false, fail: "A measuring cylinder is only a rough volume. 250.0 cm³ to a mark needs a volumetric flask.", trap: "Cylinder = rough. One exact volume to a mark = volumetric flask.", examRef: "Notes §M: measuring cylinder = rough measurement." },
      { label: "Volumetric flask", id: "volumetric-flask", ok: true, why: "A volumetric flask makes one accurate volume of solution when it is filled to the mark." },
      { label: "Conical flask", id: "conical-flask", ok: false, fail: "A conical flask is for swirling a solution, not for making one accurate volume.", trap: "Conical flask = mix / swirl. Accurate mark = volumetric flask.", examRef: "Q.5: conical flask contains a solution that is shaken or swirled." },
    ],
  },
];

function byId(id) {
  return APPARATUS.find((item) => item.id === id);
}

function gearInfo(id) {
  if (!id) return null;
  return EXTRA_GEAR[id] || byId(id) || null;
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

function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
