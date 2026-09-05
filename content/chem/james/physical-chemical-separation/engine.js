(function (root, factory) {
  "use strict";
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.SeparationEngine = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const SAMPLES = ["ironSulphur", "sandWater", "acidifiedWater"];

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function emptyVessels() {
    return {
      dish: [],
      magnetPile: [],
      beaker: [],
      poured: [],
      residue: [],
      filtrate: [],
      cathode: [],
      anode: []
    };
  }

  function makePreset(sample) {
    if (sample === "sandWater") {
      return {
        sample: "sandWater",
        kind: "mixture",
        bonded: false,
        formula: "SiO2 + H2O",
        massRatio: "",
        phase: "mixed",
        components: [
          {
            id: "sand",
            nameKey: "sand",
            formula: "SiO2",
            amount: 1,
            unit: "portion",
            magnetic: false,
            colour: "tan",
            phase: "solid",
            location: "beaker"
          },
          {
            id: "water",
            nameKey: "water",
            formula: "H2O",
            amount: 1,
            unit: "portion",
            magnetic: false,
            colour: "blue",
            phase: "liquid",
            location: "beaker"
          }
        ],
        vessels: Object.assign(emptyVessels(), { beaker: ["sand", "water"] }),
        energy: { heat: false, electricity: false },
        gasVolumes: { H2: 0, O2: 0 },
        warning: null,
        log: {
          action: "loadSample",
          outcome: "ready",
          captionKey: "captionSandStart",
          equation: ""
        }
      };
    }

    if (sample === "acidifiedWater") {
      return {
        sample: "acidifiedWater",
        kind: "compound",
        bonded: true,
        formula: "H2O",
        massRatio: "",
        phase: "compound",
        components: [
          {
            id: "water",
            nameKey: "acidifiedWater",
            formula: "H2O",
            amount: 1,
            unit: "portion",
            magnetic: false,
            colour: "blue",
            phase: "liquid",
            location: "beaker"
          }
        ],
        vessels: Object.assign(emptyVessels(), { beaker: ["water"] }),
        energy: { heat: false, electricity: false },
        gasVolumes: { H2: 0, O2: 0 },
        warning: null,
        log: {
          action: "loadSample",
          outcome: "ready",
          captionKey: "captionWaterStart",
          equation: ""
        }
      };
    }

    return {
      sample: "ironSulphur",
      kind: "mixture",
      bonded: false,
      formula: "Fe + S",
      massRatio: "7 : 4",
      phase: "mixed",
      components: [
        {
          id: "Fe",
          nameKey: "iron",
          formula: "Fe",
          amount: 7,
          unit: "g",
          magnetic: true,
          colour: "grey",
          phase: "solid",
          location: "dish"
        },
        {
          id: "S",
          nameKey: "sulphur",
          formula: "S",
          amount: 4,
          unit: "g",
          magnetic: false,
          colour: "yellow",
          phase: "solid",
          location: "dish"
        }
      ],
      vessels: Object.assign(emptyVessels(), { dish: ["Fe", "S"] }),
      energy: { heat: false, electricity: false },
      gasVolumes: { H2: 0, O2: 0 },
      warning: null,
      log: {
        action: "loadSample",
        outcome: "ready",
        captionKey: "captionIronStart",
        equation: ""
      }
    };
  }

  function setLog(state, action, outcome, captionKey, equation) {
    state.log = {
      action: action,
      outcome: outcome,
      captionKey: captionKey,
      equation: equation || ""
    };
    return state;
  }

  function block(state, action, titleKey, bodyKey) {
    state.warning = {
      level: "danger",
      titleKey: titleKey,
      bodyKey: bodyKey
    };
    return setLog(state, action, "blocked", bodyKey, "");
  }

  function note(state, action, captionKey) {
    return setLog(state, action, "note", captionKey, "");
  }

  function moveComponent(state, id, location) {
    const component = state.components.find((item) => item.id === id);
    if (component) {
      component.location = location;
    }
    Object.keys(state.vessels).forEach((vessel) => {
      state.vessels[vessel] = state.vessels[vessel].filter((item) => item !== id);
    });
    if (state.vessels[location]) {
      state.vessels[location].push(id);
    }
  }

  function applyMagnet(state) {
    if (state.sample === "ironSulphur" && state.kind === "compound") {
      return block(state, "magnet", "warnFeSMagnetTitle", "warnFeSMagnetBody");
    }
    if (state.sample === "ironSulphur" && state.kind === "mixture") {
      if (state.phase === "magnetSeparated") {
        return note(state, "magnet", "noteAlreadySeparated");
      }
      moveComponent(state, "Fe", "magnetPile");
      state.phase = "magnetSeparated";
      return setLog(state, "magnet", "separated", "captionMagnetSuccess", "");
    }
    if (state.sample === "sandWater") {
      return note(state, "magnet", "noteNoIron");
    }
    if (state.kind === "compound") {
      return block(state, "magnet", "warnWaterPhysicalTitle", "warnWaterPhysicalBody");
    }
    return note(state, "magnet", "noteAlreadyElectrolysed");
  }

  function applyDecant(state) {
    if (state.kind === "compound") {
      if (state.sample === "ironSulphur") {
        return block(state, "decant", "warnFeSPhysicalTitle", "warnFeSPhysicalBody");
      }
      return block(state, "decant", "warnWaterPhysicalTitle", "warnWaterPhysicalBody");
    }
    if (state.sample !== "sandWater") {
      return note(state, "decant", "noteNotSolidLiquid");
    }
    if (state.phase === "filtered") {
      return note(state, "decant", "noteAlreadySeparated");
    }
    if (state.phase === "decanted") {
      return note(state, "decant", "noteAlreadyDecanted");
    }
    moveComponent(state, "water", "poured");
    state.phase = "decanted";
    return setLog(state, "decant", "separated", "captionDecantSuccess", "");
  }

  function applyFilter(state) {
    if (state.kind === "compound") {
      if (state.sample === "ironSulphur") {
        return block(state, "filter", "warnFeSPhysicalTitle", "warnFeSPhysicalBody");
      }
      return block(state, "filter", "warnWaterPhysicalTitle", "warnWaterPhysicalBody");
    }
    if (state.sample !== "sandWater") {
      return note(state, "filter", "noteNotSolidLiquid");
    }
    if (state.phase === "filtered") {
      return note(state, "filter", "noteAlreadySeparated");
    }
    moveComponent(state, "sand", "residue");
    moveComponent(state, "water", "filtrate");
    state.phase = "filtered";
    return setLog(state, "filter", "separated", "captionFilterSuccess", "");
  }

  function applyHeat(state) {
    if (state.sample !== "ironSulphur") {
      return note(state, "heat", "noteHeatWrongSample");
    }
    if (state.kind === "compound") {
      return note(state, "heat", "noteAlreadyFeS");
    }
    if (state.phase === "magnetSeparated") {
      return note(state, "heat", "noteHeatSeparated");
    }
    state.kind = "compound";
    state.bonded = true;
    state.formula = "FeS";
    state.phase = "compound";
    state.energy.heat = true;
    state.components = [
      {
        id: "FeS",
        nameKey: "ironSulphide",
        formula: "FeS",
        amount: 11,
        unit: "g",
        magnetic: false,
        colour: "black",
        phase: "solid",
        location: "dish"
      }
    ];
    state.vessels = Object.assign(emptyVessels(), { dish: ["FeS"] });
    return setLog(state, "heat", "combined", "captionHeatSuccess", "Fe + S → FeS");
  }

  function applyElectrolyse(state) {
    if (state.sample !== "acidifiedWater") {
      return note(state, "electrolyse", "noteElectrolyseMixture");
    }
    if (state.kind === "elements") {
      return note(state, "electrolyse", "noteAlreadyElectrolysed");
    }
    state.kind = "elements";
    state.bonded = false;
    state.formula = "H2 + O2";
    state.phase = "electrolysed";
    state.energy.electricity = true;
    state.gasVolumes = { H2: 20, O2: 10 };
    state.components = [
      {
        id: "H2",
        nameKey: "hydrogen",
        formula: "H2",
        amount: 20,
        unit: "cm3",
        magnetic: false,
        colour: "colourless",
        phase: "gas",
        location: "cathode"
      },
      {
        id: "O2",
        nameKey: "oxygen",
        formula: "O2",
        amount: 10,
        unit: "cm3",
        magnetic: false,
        colour: "colourless",
        phase: "gas",
        location: "anode"
      }
    ];
    state.vessels = Object.assign(emptyVessels(), {
      cathode: ["H2"],
      anode: ["O2"]
    });
    return setLog(state, "electrolyse", "decomposed", "captionElectrolyseSuccess", "2H2O(l) → 2H2(g) + O2(g)");
  }

  function reduce(state, action) {
    if (!action || !action.type) {
      return state;
    }
    if (action.type === "loadSample") {
      const sample = SAMPLES.includes(action.sample) ? action.sample : "ironSulphur";
      return makePreset(sample);
    }
    if (action.type === "reset") {
      return makePreset(state.sample);
    }

    const next = clone(state);
    next.warning = null;

    if (action.type === "magnet") {
      return applyMagnet(next);
    }
    if (action.type === "decant") {
      return applyDecant(next);
    }
    if (action.type === "filter") {
      return applyFilter(next);
    }
    if (action.type === "heat") {
      return applyHeat(next);
    }
    if (action.type === "electrolyse") {
      return applyElectrolyse(next);
    }
    return next;
  }

  function createLab(initialSample) {
    let state = makePreset(SAMPLES.includes(initialSample) ? initialSample : "ironSulphur");

    return {
      getState: function () {
        return clone(state);
      },
      dispatch: function (action) {
        state = reduce(state, action);
        return clone(state);
      },
      reset: function () {
        state = makePreset(state.sample);
        return clone(state);
      }
    };
  }

  return {
    SAMPLES: SAMPLES,
    createLab: createLab,
    makePreset: makePreset,
    reduce: reduce
  };
});
