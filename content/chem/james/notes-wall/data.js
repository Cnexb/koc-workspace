const STORAGE_KEY = "notes-wall-v2";

const WALL_TABS = [
  { id: "all", label: "All" },
  { id: "glass", label: "Glassware" },
  { id: "heat", label: "Heating" },
  { id: "setup", label: "Set-ups" },
];

const WALL_ITEMS = [
  {
    id: "tubes-beakers",
    tag: "glass",
    src: "images/chart-tubes-beakers.jpg",
    title: "Test tube, beaker, measuring cylinder, filter funnel",
    zh: "試管、燒杯、量筒、漏斗",
    exam: "Hold, mix, measure, or filter a liquid.",
  },
  {
    id: "flasks-dishes",
    tag: "glass",
    src: "images/chart-flasks-dishes.jpg",
    title: "Conical flask, round-bottomed flask, evaporating dish, watch glass",
    zh: "錐形瓶、圓底燒瓶、蒸發皿、錶面玻璃",
    exam: "Swirl a solution, heat a liquid in a flask, evaporate to dryness, or hold a pinch of solid.",
  },
  {
    id: "volume-glassware",
    tag: "glass",
    src: "images/notes-volume-glassware.jpg",
    title: "Measuring liquid volume",
    zh: "量度液體體積",
    exam: "Read the volume at the bottom of the meniscus. A measuring cylinder measures liquid volume.",
  },
  {
    id: "pouring",
    tag: "glass",
    src: "images/diagram-pouring-liquid.jpg",
    title: "Pouring along a glass rod",
    zh: "沿玻璃棒倒液體",
    exam: "A glass rod guides liquid onto filter paper so it does not splash.",
  },
  {
    id: "heating-dropper",
    tag: "heat",
    src: "images/chart-heating-dropper.jpg",
    title: "Wire gauze, Bunsen burner, tripod — and a dropper on the notes page",
    zh: "鐵絲網、本生燈、三腳架、滴管",
    exam: "Tripod and gauze support a vessel over a Bunsen flame. The dropper on this page adds liquid in drops — it is not a heating tool.",
  },
  {
    id: "rod-thermo-crucible",
    tag: "heat",
    src: "images/chart-rod-thermo-crucible.jpg",
    title: "Glass rod, thermometer, crucible",
    zh: "玻璃棒、溫度計、坩堝",
    exam: "Stir; measure temperature; heat a solid strongly in a crucible.",
  },
  {
    id: "bunsen-parts",
    tag: "heat",
    src: "images/notes-bunsen-parts-page.jpg",
    title: "Parts of a Bunsen burner",
    zh: "本生燈各部分",
    exam: "Close the air hole, light at the barrel, then turn on the gas. Open the air hole slowly for a heating flame.",
  },
  {
    id: "evaporation-photo",
    tag: "setup",
    src: "images/setup-evaporation.jpg",
    title: "Evaporate sea water to get salt",
    zh: "蒸發海水取得鹽",
    exam: "Heat a solution in an evaporating dish until only solid is left.",
    steps: [
      "Heat-resistant mat on the bench, then Bunsen burner.",
      "Tripod over the burner, wire gauze on the tripod.",
      "Evaporating dish of sea water on the gauze. Heat until dryness.",
    ],
  },
  {
    id: "filtration-photo",
    tag: "setup",
    src: "images/setup-filtration.jpg",
    title: "Filter mud from sea water",
    zh: "過濾泥和水",
    exam: "A filter funnel and filter paper separate an insoluble solid from a liquid. The liquid that runs through is the filtrate.",
    steps: [
      "Fold filter paper, sit it in the filter funnel.",
      "Stand and clamp (or a conical flask) hold the funnel.",
      "Pour the muddy mixture along a glass rod onto the paper. Mud stays; filtrate collects below.",
    ],
  },
  {
    id: "evaporation-diagram",
    tag: "setup",
    src: "images/diagram-evaporation-setup.jpg",
    title: "Evaporating dish on wire gauze",
    zh: "蒸發皿放在鐵絲網上",
    exam: "The dish holds a solution to be evaporated to dryness. Wire gauze spreads the heat on a tripod.",
    steps: [
      "Tripod over a Bunsen burner.",
      "Wire gauze on the tripod.",
      "Evaporating dish of solution on the gauze.",
    ],
  },
  {
    id: "crucible-setup",
    tag: "setup",
    src: "images/diagram-crucible-setup.jpg",
    title: "Crucible on a pipe-clay triangle",
    zh: "坩堝放在泥三角上",
    exam: "A crucible holds a solid heated strongly. A pipe-clay triangle supports it on a tripod — not wire gauze.",
    steps: [
      "Tripod over a Bunsen burner.",
      "Pipe-clay triangle on the tripod.",
      "Crucible of solid on the triangle. Heat strongly.",
    ],
  },
  {
    id: "eight-pieces",
    tag: "setup",
    src: "images/setup-eight-pieces.jpg",
    title: "Boil about 200 cm³ of water",
    zh: "煮沸約 200 cm³ 水",
    exam: "Beaker on wire gauze and tripod, over a Bunsen burner on a heat-resistant mat.",
    steps: [
      "Heat-resistant mat, then Bunsen burner.",
      "Tripod, wire gauze, beaker of water.",
      "This is not a test-tube heating. A test tube is only a few cm³.",
    ],
  },
  {
    id: "watchglass-bath",
    tag: "setup",
    src: "images/setup-watchglass-bath.jpg",
    title: "Watch glass over a water bath",
    zh: "錶面玻璃放在水浴上",
    exam: "A watch glass holds a small amount of solid. Gentle heat comes from a beaker of hot water, not a direct flame on the glass.",
    steps: [
      "Beaker of water heated on gauze and tripod.",
      "Watch glass rests on the beaker.",
      "Use this for a small amount of solid, not evaporating a solution to dryness.",
    ],
  },
];

function byId(id) {
  return WALL_ITEMS.find((row) => row.id === id);
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
  const same = shuffle(WALL_ITEMS.filter((row) => row.tag === item.tag && row.id !== item.id));
  const rest = shuffle(WALL_ITEMS.filter((row) => row.tag !== item.tag && row.id !== item.id));
  return same.concat(rest).slice(0, n);
}

function makeSpotQuestion(item, prompt) {
  const distractors = pickDistractors(item, 3).map((row) => row.id);
  return {
    type: "spot",
    key: item.id + "-spot",
    id: item.id,
    prompt: prompt || item.exam,
    options: shuffle([item.id].concat(distractors)),
  };
}

function makeNameQuestion(item, prompt) {
  const distractors = pickDistractors(item, 3).map((row) => row.title);
  return {
    type: "name",
    key: item.id + "-name",
    id: item.id,
    prompt: prompt || "What does this notes page show?",
    options: shuffle([item.title].concat(distractors)),
  };
}

function buildCheckDeck() {
  return shuffle([
    makeSpotQuestion(byId("volume-glassware"), "Which chart is about measuring the volume of a liquid?"),
    makeSpotQuestion(byId("filtration-photo"), "Which set-up filters mud from sea water?"),
    makeSpotQuestion(byId("evaporation-photo"), "Which set-up evaporates sea water to get salt?"),
    makeSpotQuestion(byId("bunsen-parts"), "Which page shows the parts of a Bunsen burner?"),
    makeNameQuestion(byId("crucible-setup"), "A solid is heated strongly. Which set-up is this?"),
    makeNameQuestion(byId("eight-pieces"), "About 200 cm³ of water is boiled. Which set-up is this?"),
  ]);
}

function cloneQuestion(q) {
  return { ...q, options: shuffle(q.options.slice()) };
}
