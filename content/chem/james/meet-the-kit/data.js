const STORAGE_KEY = "meet-the-kit";

const NOTES_DIAGRAMS = [
  "beaker", "test-tube", "measuring-cylinder", "filter-funnel", "conical-flask",
  "round-bottomed-flask", "evaporating-dish", "watch-glass", "wire-gauze",
  "bunsen-burner", "tripod", "dropper", "glass-rod", "thermometer", "crucible",
];

const APPARATUS = [
  { id: "beaker", letter: "(a)", name: "Beaker", zh: "燒杯", easy: "A glass cup for holding, mixing, or heating a larger amount of liquid.", exam: "Contains / mixes solutions; boils about 200 cm³ of water.", photo: true, diagram: true, similar: ["conical-flask", "measuring-cylinder", "crucible", "round-bottomed-flask"] },
  { id: "test-tube", letter: "(b)", name: "Test tube", zh: "試管", easy: "A small glass tube for a little liquid or a small reaction.", exam: "Mixes solutions to observe changes; heats a few cm³ of liquid.", photo: true, diagram: true, similar: ["measuring-cylinder", "dropper", "conical-flask", "glass-rod"] },
  { id: "conical-flask", letter: "(c)", name: "Conical flask", zh: "錐形瓶", easy: "Wide bottom, narrow neck — easy to swirl without spilling.", exam: "Contains a solution that is shaken or swirled.", photo: true, diagram: true, similar: ["beaker", "round-bottomed-flask", "filter-funnel", "measuring-cylinder"] },
  { id: "filter-funnel", letter: "(d)", name: "Filter funnel", zh: "漏斗", easy: "A cone that holds filter paper to separate solid from liquid.", exam: "Filters a suspension.", photo: true, diagram: true, similar: ["conical-flask", "dropper", "measuring-cylinder", "round-bottomed-flask"] },
  { id: "glass-rod", letter: "(e)", name: "Glass rod", zh: "玻璃棒", easy: "A stick for stirring, or for pouring liquid onto filter paper.", exam: "Stirs a mixture; guides liquid onto filter paper.", photo: true, diagram: true, similar: ["thermometer", "dropper", "spatula", "test-tube"] },
  { id: "dropper", letter: "(f)", name: "Dropper", zh: "滴管", easy: "Adds liquid one drop at a time.", exam: "Adds drop quantities of a liquid.", photo: true, diagram: true, similar: ["glass-rod", "thermometer", "test-tube", "filter-funnel"] },
  { id: "tripod", letter: "(g)", name: "Tripod", zh: "三腳架", easy: "A three-legged stand that sits over a Bunsen burner.", exam: "Supports a wire gauze or pipe-clay triangle over a Bunsen burner.", photo: true, diagram: true, similar: ["stand-and-clamp", "wire-gauze", "bunsen-burner", "heat-proof-mat"] },
  { id: "wire-gauze", letter: "(h)", name: "Wire gauze", zh: "鐵絲網", easy: "Metal mesh that spreads heat under a beaker.", exam: "Supports a beaker or evaporating dish on a tripod while heating.", photo: true, diagram: true, similar: ["heat-proof-mat", "tripod", "watch-glass", "evaporating-dish"] },
  { id: "evaporating-dish", letter: "(i)", name: "Evaporating dish", zh: "蒸發皿", easy: "A shallow dish. Heat a solution until only solid is left.", exam: "Contains a solution which is to be evaporated to dryness.", photo: true, diagram: true, similar: ["watch-glass", "crucible", "beaker", "wire-gauze"] },
  { id: "bunsen-burner", letter: "(j)", name: "Bunsen burner", zh: "本生燈", easy: "Makes a flame for heating. Stand it on a heat-resistant mat.", exam: "Provides a flame for heating.", photo: true, diagram: true, similar: ["tripod", "stand-and-clamp", "dropper", "heat-proof-mat"] },
  { id: "measuring-cylinder", letter: "", name: "Measuring cylinder", zh: "量筒", easy: "A tall marked tube for measuring liquid volume.", exam: "Measure the volume of a liquid.", photo: true, diagram: true, similar: ["test-tube", "filter-funnel", "dropper", "beaker"] },
  { id: "round-bottomed-flask", letter: "", name: "Round-bottomed flask", zh: "圓底燒瓶", easy: "Round bottom — it cannot stand by itself. Use a clamp.", exam: "Contains a liquid, often held with a stand and clamp.", photo: true, diagram: true, similar: ["conical-flask", "beaker", "filter-funnel", "stand-and-clamp"] },
  { id: "watch-glass", letter: "", name: "Watch glass", zh: "錶面玻璃", easy: "A small curved glass dish for a pinch of solid, or as a cover.", exam: "Holds a small amount of solid, or covers a beaker.", photo: true, diagram: true, similar: ["evaporating-dish", "crucible", "beaker", "wire-gauze"] },
  { id: "thermometer", letter: "", name: "Thermometer", zh: "溫度計", easy: "Tells you how hot or cold something is.", exam: "Measures temperature.", photo: true, diagram: true, similar: ["glass-rod", "dropper", "test-tube", "spatula"] },
  { id: "crucible", letter: "", name: "Crucible", zh: "坩堝", easy: "A small ceramic pot for heating a solid very strongly.", exam: "Contains a solid which is heated strongly.", photo: true, diagram: true, similar: ["evaporating-dish", "watch-glass", "beaker", "pestle-and-mortar"] },
  { id: "stand-and-clamp", letter: "", name: "Stand and clamp", zh: "鐵架和夾", easy: "Holds apparatus still, such as a funnel or flask.", exam: "Supports apparatus (e.g. a funnel or flask).", photo: true, diagram: true, similar: ["tripod", "bunsen-burner", "test-tube-holder", "test-tube-rack"] },
  { id: "heat-proof-mat", letter: "", name: "Heat-resistant mat", zh: "耐熱墊", easy: "Protects the bench from a hot flame or hot glass.", exam: "Provides a heat-resistant surface for placing a hot object / Bunsen burner.", photo: true, diagram: false, similar: ["wire-gauze", "tripod", "bunsen-burner", "watch-glass"] },
  { id: "test-tube-holder", letter: "", name: "Test tube holder", zh: "試管夾", easy: "A clip so you can heat a test tube without burning your fingers.", exam: "Holds a test tube for heating.", photo: true, diagram: false, similar: ["test-tube-rack", "stand-and-clamp", "bunsen-burner", "spatula"] },
  { id: "test-tube-rack", letter: "", name: "Test tube rack", zh: "試管架", easy: "Keeps test tubes upright on the bench.", exam: "Holds test tubes upright.", photo: true, diagram: false, similar: ["test-tube-holder", "stand-and-clamp", "tripod", "heat-proof-mat"] },
  { id: "spatula", letter: "", name: "Spatula", zh: "藥匙", easy: "A small scoop for moving a little bit of solid, like salt.", exam: "Transfers a small amount of a solid.", photo: true, diagram: false, similar: ["glass-rod", "dropper", "thermometer", "pestle-and-mortar"] },
  { id: "pestle-and-mortar", letter: "", name: "Mortar and pestle", zh: "研缽和研杵", easy: "A bowl and grinder for crushing a solid into powder.", exam: "Grinds a solid into fine powder.", photo: true, diagram: false, similar: ["crucible", "evaporating-dish", "spatula", "watch-glass"] },
  { id: "gas-jar", letter: "", name: "Gas jar", zh: "集氣瓶", easy: "A tall jar for collecting a gas.", exam: "Collects a gas.", photo: true, diagram: false, similar: ["beaker", "measuring-cylinder", "conical-flask", "desiccator"] },
  { id: "desiccator", letter: "", name: "Desiccator", zh: "乾燥器", easy: "A lidded pot that keeps a solid dry.", exam: "Dries a solid.", photo: true, diagram: false, similar: ["gas-jar", "evaporating-dish", "crucible", "beaker"] },
  { id: "electronic-balance", letter: "", name: "Electronic balance", zh: "電子天平", easy: "A digital scale for finding the mass of something.", exam: "Measures the mass of an object.", photo: true, diagram: false, similar: ["heat-proof-mat", "watch-glass", "spatula", "desiccator"] },
];

const NAME_TRAPS = {
  "Beaker|Conical flask": "Common mix-up: conical flask is shaken or swirled. Beaker contains / mixes solutions. Tip: neck vs spout.",
  "Conical flask|Beaker": "Common mix-up: look for the tapering neck on a conical flask. A beaker has a spout.",
  "Conical flask|Round-bottomed flask": "Round-bottomed flask needs a stand and clamp. Conical flask has a flat base.",
  "Round-bottomed flask|Conical flask": "Conical flask stands on the bench. Round-bottomed flask cannot.",
  "Test tube|Measuring cylinder": "Measuring cylinder measures volume. Test tube mixes or heats a few cm³.",
  "Measuring cylinder|Test tube": "A test tube is not a volume-measuring tool.",
  "Evaporating dish|Watch glass": "Watch glass holds a small amount of solid. Evaporating dish: solution to dryness.",
  "Watch glass|Evaporating dish": "Evaporating dish is for dryness. Watch glass covers a beaker or holds a pinch of solid.",
  "Evaporating dish|Crucible": "Crucible = solid heated strongly. Evaporating dish = solution evaporated to dryness.",
  "Crucible|Evaporating dish": "Evaporating dish is not for strong heating of a solid.",
  "Tripod|Stand and clamp": "Stand and clamp supports a funnel or flask. Tripod sits over a Bunsen burner.",
  "Stand and clamp|Tripod": "Tripod sits over a Bunsen burner. Stand and clamp supports a funnel or flask.",
  "Wire gauze|Tripod": "Tripod is the three-legged stand. Wire gauze is the mesh that sits on it while heating.",
  "Wire gauze|Heat-resistant mat": "The mat protects the bench. Wire gauze sits on a tripod to spread heat under a beaker.",
  "Heat-resistant mat|Wire gauze": "Wire gauze is metal mesh on a tripod. The mat goes under a Bunsen burner or a hot object.",
  "Glass rod|Thermometer": "Thermometer measures temperature. Glass rod stirs.",
  "Thermometer|Glass rod": "Glass rod stirs. Thermometer measures temperature.",
  "Dropper|Glass rod": "A dropper has a rubber bulb and adds drops. A glass rod is a solid stick for stirring.",
  "Filter funnel|Conical flask": "A conical flask has a neck and a flat base. A filter funnel is a cone with a stem for filter paper.",
  "Filter funnel|Dropper": "A dropper adds drop quantities. A filter funnel filters a suspension.",
  "Bunsen burner|Tripod": "The Bunsen burner makes the flame. The tripod stands over it.",
  "Test tube holder|Test tube rack": "The rack stands tubes on the bench. The holder is the clip for heating.",
  "Test tube rack|Test tube holder": "The holder is for heating. The rack keeps tubes upright.",
  "Spatula|Glass rod": "Glass rod stirs a liquid. Spatula transfers a small amount of solid.",
  "Mortar and pestle|Crucible": "Crucible heats a solid strongly. Mortar and pestle grinds it into powder.",
  "Gas jar|Beaker": "A beaker holds liquid. A gas jar collects a gas.",
  "Desiccator|Gas jar": "A gas jar collects a gas. A desiccator is a lidded pot that keeps a solid dry.",
  "Desiccator|Evaporating dish": "Evaporating dish drives off water by heating. A desiccator keeps a solid dry in a closed pot.",
  "Electronic balance|Heat-resistant mat": "The balance measures mass. The mat only protects the bench.",
};

function byId(id) {
  return APPARATUS.find((item) => item.id === id);
}

function photoSrc(id) {
  return `images/${id}-photo.jpg`;
}

function drawingSrc(id) {
  if (NOTES_DIAGRAMS.includes(id)) return `images/notes-${id}-diagram.jpg`;
  return `images/${id}-diagram.jpg`;
}

function trapLine(a, b) {
  return NAME_TRAPS[`${a}|${b}`] || NAME_TRAPS[`${b}|${a}`] || "";
}

function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickDistractors(item, n) {
  const preferred = shuffle((item.similar || []).map(byId).filter(Boolean));
  const rest = shuffle(APPARATUS.filter((row) => row.id !== item.id && !preferred.some((p) => p.id === row.id)));
  return preferred.concat(rest).slice(0, n);
}

function cloneQuestion(q) {
  return { ...q, options: shuffle(q.options.slice()) };
}

function buildCheckDeck() {
  const pick = (id) => byId(id);
  const nameQ = (item) => ({
    type: "name",
    key: item.id + "-name",
    id: item.id,
    prompt: "Name this piece.",
    options: shuffle([item.name].concat(pickDistractors(item, 3).map((row) => row.name))),
  });
  const spotQ = (item) => ({
    type: "spot",
    key: item.id + "-spot",
    id: item.id,
    prompt: "Tap the picture of this piece.",
    promptName: item.name,
    options: shuffle([item.id].concat(pickDistractors(item, 3).map((row) => row.id))),
  });
  return shuffle([
    nameQ(pick("beaker")),
    nameQ(pick("crucible")),
    nameQ(pick("measuring-cylinder")),
    spotQ(pick("conical-flask")),
    spotQ(pick("watch-glass")),
    spotQ(pick("test-tube-holder")),
  ]);
}
