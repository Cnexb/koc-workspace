/**
 * First 20 elements — common isotope, shells, and school-chemistry stable ion.
 * Stability: noble-gas atoms, or ions that reach a noble-gas electron count.
 * C / Si / B: no simple stable ion in typical secondary-school ionic chemistry.
 */
window.ATOM_LAB_ELEMENTS = [
  {
    Z: 1, symbol: "H", name: "Hydrogen", nameZh: "氫",
    massNumber: 1, shells: [1],
    stableCharge: 1,
    note: "Loses 1 electron → H⁺ (like He electron count: 0).",
    noteZh: "失去 1 個電子 → H⁺（電子數與 He 的空殼相當）。"
  },
  {
    Z: 2, symbol: "He", name: "Helium", nameZh: "氦",
    massNumber: 4, shells: [2],
    stableCharge: 0,
    note: "Noble gas — already has a full outer shell.",
    noteZh: "惰性氣體 — 外層已滿。"
  },
  {
    Z: 3, symbol: "Li", name: "Lithium", nameZh: "鋰",
    massNumber: 7, shells: [2, 1],
    stableCharge: 1,
    note: "Loses 1 electron → Li⁺ (same electron arrangement as He).",
    noteZh: "失去 1 個電子 → Li⁺（電子排布與 He 相同）。"
  },
  {
    Z: 4, symbol: "Be", name: "Beryllium", nameZh: "鈹",
    massNumber: 9, shells: [2, 2],
    stableCharge: 2,
    note: "Loses 2 electrons → Be²⁺ (like He).",
    noteZh: "失去 2 個電子 → Be²⁺（與 He 相同）。"
  },
  {
    Z: 5, symbol: "B", name: "Boron", nameZh: "硼",
    massNumber: 11, shells: [2, 3],
    stableCharge: null,
    note: "Does not form a simple stable ion in school chemistry (mainly covalent).",
    noteZh: "中學化學中一般不形成簡單穩定離子（多為共價）。"
  },
  {
    Z: 6, symbol: "C", name: "Carbon", nameZh: "碳",
    massNumber: 12, shells: [2, 4],
    stableCharge: null,
    note: "Does not form a simple stable ion (forms covalent bonds).",
    noteZh: "不形成簡單穩定離子（以共價鍵結合）。"
  },
  {
    Z: 7, symbol: "N", name: "Nitrogen", nameZh: "氮",
    massNumber: 14, shells: [2, 5],
    stableCharge: -3,
    note: "Gains 3 electrons → N³⁻ (like Ne).",
    noteZh: "得到 3 個電子 → N³⁻（與 Ne 相同）。"
  },
  {
    Z: 8, symbol: "O", name: "Oxygen", nameZh: "氧",
    massNumber: 16, shells: [2, 6],
    stableCharge: -2,
    note: "Gains 2 electrons → O²⁻ (like Ne). Neutral O is unstable.",
    noteZh: "得到 2 個電子 → O²⁻（與 Ne 相同）。中性 O 原子不穩定。"
  },
  {
    Z: 9, symbol: "F", name: "Fluorine", nameZh: "氟",
    massNumber: 19, shells: [2, 7],
    stableCharge: -1,
    note: "Gains 1 electron → F⁻ (like Ne).",
    noteZh: "得到 1 個電子 → F⁻（與 Ne 相同）。"
  },
  {
    Z: 10, symbol: "Ne", name: "Neon", nameZh: "氖",
    massNumber: 20, shells: [2, 8],
    stableCharge: 0,
    note: "Noble gas — already has a full outer shell.",
    noteZh: "惰性氣體 — 外層已滿。"
  },
  {
    Z: 11, symbol: "Na", name: "Sodium", nameZh: "鈉",
    massNumber: 23, shells: [2, 8, 1],
    stableCharge: 1,
    note: "Loses 1 electron → Na⁺ (like Ne).",
    noteZh: "失去 1 個電子 → Na⁺（與 Ne 相同）。"
  },
  {
    Z: 12, symbol: "Mg", name: "Magnesium", nameZh: "鎂",
    massNumber: 24, shells: [2, 8, 2],
    stableCharge: 2,
    note: "Loses 2 electrons → Mg²⁺ (like Ne).",
    noteZh: "失去 2 個電子 → Mg²⁺（與 Ne 相同）。"
  },
  {
    Z: 13, symbol: "Al", name: "Aluminium", nameZh: "鋁",
    massNumber: 27, shells: [2, 8, 3],
    stableCharge: 3,
    note: "Loses 3 electrons → Al³⁺ (like Ne).",
    noteZh: "失去 3 個電子 → Al³⁺（與 Ne 相同）。"
  },
  {
    Z: 14, symbol: "Si", name: "Silicon", nameZh: "矽",
    massNumber: 28, shells: [2, 8, 4],
    stableCharge: null,
    note: "Does not form a simple stable ion (forms covalent bonds).",
    noteZh: "不形成簡單穩定離子（以共價鍵結合）。"
  },
  {
    Z: 15, symbol: "P", name: "Phosphorus", nameZh: "磷",
    massNumber: 31, shells: [2, 8, 5],
    stableCharge: -3,
    note: "Gains 3 electrons → P³⁻ (like Ar).",
    noteZh: "得到 3 個電子 → P³⁻（與 Ar 相同）。"
  },
  {
    Z: 16, symbol: "S", name: "Sulfur", nameZh: "硫",
    massNumber: 32, shells: [2, 8, 6],
    stableCharge: -2,
    note: "Gains 2 electrons → S²⁻ (like Ar).",
    noteZh: "得到 2 個電子 → S²⁻（與 Ar 相同）。"
  },
  {
    Z: 17, symbol: "Cl", name: "Chlorine", nameZh: "氯",
    massNumber: 35, shells: [2, 8, 7],
    stableCharge: -1,
    note: "Gains 1 electron → Cl⁻ (like Ar).",
    noteZh: "得到 1 個電子 → Cl⁻（與 Ar 相同）。"
  },
  {
    Z: 18, symbol: "Ar", name: "Argon", nameZh: "氬",
    massNumber: 40, shells: [2, 8, 8],
    stableCharge: 0,
    note: "Noble gas — already has a full outer shell.",
    noteZh: "惰性氣體 — 外層已滿。"
  },
  {
    Z: 19, symbol: "K", name: "Potassium", nameZh: "鉀",
    massNumber: 39, shells: [2, 8, 8, 1],
    stableCharge: 1,
    note: "Loses 1 electron → K⁺ (like Ar).",
    noteZh: "失去 1 個電子 → K⁺（與 Ar 相同）。"
  },
  {
    Z: 20, symbol: "Ca", name: "Calcium", nameZh: "鈣",
    massNumber: 40, shells: [2, 8, 8, 2],
    stableCharge: 2,
    note: "Loses 2 electrons → Ca²⁺ (like Ar).",
    noteZh: "失去 2 個電子 → Ca²⁺（與 Ar 相同）。"
  }
];

window.ATOM_LAB_SHELL_CAPS = [2, 8, 8, 8];

window.formatIonSymbol = function formatIonSymbol(symbol, charge) {
  if (charge === 0) return symbol;
  const abs = Math.abs(charge);
  const sign = charge > 0 ? "+" : "−";
  const num = abs === 1 ? "" : String(abs);
  return `${symbol}${num}${sign}`;
};

window.shellsForElectrons = function shellsForElectrons(electronCount) {
  const caps = window.ATOM_LAB_SHELL_CAPS;
  const shells = [];
  let remaining = Math.max(0, electronCount);
  for (let i = 0; i < caps.length && remaining > 0; i++) {
    const take = Math.min(caps[i], remaining);
    shells.push(take);
    remaining -= take;
  }
  return shells;
};

/** Stable when the outermost occupied shell is completely full. */
window.isOuterShellFull = function isOuterShellFull(electronCount) {
  if (electronCount <= 0) return false;
  const caps = window.ATOM_LAB_SHELL_CAPS;
  const shells = window.shellsForElectrons(electronCount);
  if (!shells.length) return false;
  const outer = shells.length - 1;
  return shells[outer] === caps[outer];
};

window.describeShellConfig = function describeShellConfig(electronCount) {
  const shells = window.shellsForElectrons(electronCount);
  if (!shells.length) return "—";
  return shells.join(", ");
};

window.isElectronicallyStable = function isElectronicallyStable(element, charge) {
  if (element.stableCharge === null) {
    return charge === 0 ? false : null;
  }
  return charge === element.stableCharge;
};
