/**
 * Bohr-style atom renderer — soft coloured 3D particles, random nucleons.
 */
window.AtomRenderer = (function () {
  const SHELL = "#94a3b8";
  const SHELL_FULL = "#eab308";
  const SHELL_STEP = 30;
  const FIRST_SHELL_GAP = 26;
  const ELECTRON_R = 13;
  const VIEW_W = 560;
  const VIEW_H = 560;
  const ATOM_CX = 280;
  const ATOM_CY = 280;

  const COLORS = {
    proton: { light: "#d9f99d", mid: "#86efac", dark: "#4ade80", swatch: "#86efac" },
    neutron: { light: "#fce7f3", mid: "#f9a8d4", dark: "#f472b6", swatch: "#f9a8d4" },
    electron: { light: "#dbeafe", mid: "#93c5fd", dark: "#60a5fa", swatch: "#93c5fd" }
  };

  function clear(svg) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
  }

  function el(name, attrs) {
    const node = document.createElementNS("http://www.w3.org/2000/svg", name);
    if (attrs) {
      Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    }
    return node;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function nucleonRadius(total) {
    if (total <= 4) return 13;
    if (total <= 12) return 11;
    if (total <= 24) return 10;
    return 9;
  }

  function nucleusPackRadius(protons, neutrons) {
    const total = Math.max(1, protons + neutrons);
    const pr = nucleonRadius(total);
    const minDist = pr * 2 + 2;
    // Estimate rings needed for non-overlapping pack
    let remaining = total;
    let rings = 0;
    while (remaining > 0) {
      rings += 1;
      const R = rings * minDist;
      const capacity = Math.max(1, Math.floor((2 * Math.PI * R) / minDist));
      remaining -= Math.min(remaining, capacity);
    }
    return rings * minDist + pr + 4;
  }

  function ensureDefs(svg) {
    let defs = svg.querySelector("defs#atom-defs");
    if (defs) return defs;
    defs = el("defs", { id: "atom-defs" });

    function sphereGrad(id, c) {
      const g = el("radialGradient", {
        id, cx: "32%", cy: "28%", r: "68%", fx: "30%", fy: "26%"
      });
      g.appendChild(el("stop", { offset: "0%", "stop-color": c.light }));
      g.appendChild(el("stop", { offset: "48%", "stop-color": c.mid }));
      g.appendChild(el("stop", { offset: "100%", "stop-color": c.dark }));
      defs.appendChild(g);
    }

    sphereGrad("grad-proton", COLORS.proton);
    sphereGrad("grad-neutron", COLORS.neutron);
    sphereGrad("grad-electron", COLORS.electron);

    const glow = el("radialGradient", { id: "nucleus-glow" });
    glow.appendChild(el("stop", { offset: "0%", "stop-color": "#86efac", "stop-opacity": "0.4" }));
    glow.appendChild(el("stop", { offset: "100%", "stop-color": "#86efac", "stop-opacity": "0" }));
    defs.appendChild(glow);

    const shadow = el("filter", {
      id: "particle-shadow", x: "-40%", y: "-40%", width: "180%", height: "180%"
    });
    shadow.appendChild(el("feDropShadow", {
      dx: "0.8", dy: "1.6", stdDeviation: "1.4",
      "flood-color": "#1c1917", "flood-opacity": "0.28"
    }));
    defs.appendChild(shadow);

    const shellGlow = el("filter", {
      id: "shell-full-glow", x: "-20%", y: "-20%", width: "140%", height: "140%"
    });
    shellGlow.appendChild(el("feGaussianBlur", {
      in: "SourceGraphic", stdDeviation: "2.2", result: "blur"
    }));
    shellGlow.appendChild(el("feMerge", {}));
    const merge = shellGlow.lastChild;
    merge.appendChild(el("feMergeNode", { in: "blur" }));
    merge.appendChild(el("feMergeNode", { in: "SourceGraphic" }));
    defs.appendChild(shellGlow);

    svg.appendChild(defs);
    return defs;
  }

  function drawSphere(parent, x, y, r, gradId, className, opts) {
    const g = el("g", { class: className || "particle" });
    const noWhite = opts && opts.noWhiteOutline;
    g.appendChild(el("ellipse", {
      cx: x + r * 0.08, cy: y + r * 0.72,
      rx: r * 0.72, ry: r * 0.28,
      fill: "#1c1917", opacity: "0.16"
    }));
    g.appendChild(el("circle", {
      cx: x, cy: y, r,
      fill: `url(#${gradId})`,
      filter: "url(#particle-shadow)",
      stroke: noWhite ? "rgba(28,25,23,0.2)" : "rgba(255,255,255,0.35)",
      "stroke-width": noWhite ? 0.8 : 1.2
    }));
    if (!noWhite) {
      g.appendChild(el("ellipse", {
        cx: x - r * 0.28, cy: y - r * 0.32,
        rx: r * 0.38, ry: r * 0.26,
        fill: "#fff", opacity: "0.5"
      }));
    } else {
      g.appendChild(el("ellipse", {
        cx: x - r * 0.28, cy: y - r * 0.32,
        rx: r * 0.32, ry: r * 0.22,
        fill: "#fff", opacity: "0.22"
      }));
    }
    parent.appendChild(g);
    return g;
  }

  /** Letter + separate charge mark for proton (+) and electron (−). Neutrons: letter only. */
  function particleIdentity(parent, x, y, type, r) {
    const letter = type === "p" ? "p" : type === "n" ? "n" : "e";
    const fs = Math.max(9, Math.min(12, r * 0.85));

    const letterNode = el("text", {
      x, y: y + 1,
      "text-anchor": "middle",
      "dominant-baseline": "middle",
      fill: "#fff",
      stroke: "#1c1917",
      "stroke-width": "2.2",
      "paint-order": "stroke fill",
      "font-size": String(fs),
      "font-weight": "800",
      "font-family": '"Segoe UI", system-ui, sans-serif',
      class: "particle-letter"
    });
    letterNode.textContent = letter;
    parent.appendChild(letterNode);

    if (type === "n") return;

    const charge = type === "p" ? "+" : "−";
    const chargeFill = type === "p" ? "#14532d" : "#1e3a8a";
    const bx = x + r * 0.55;
    const by = y - r * 0.55;
    const mark = el("text", {
      x: bx, y: by + 0.5,
      "text-anchor": "middle",
      "dominant-baseline": "middle",
      fill: chargeFill,
      "font-size": String(Math.max(11, r * 0.78)),
      "font-weight": "900",
      "font-family": '"Segoe UI", system-ui, sans-serif',
      class: "charge-mark"
    });
    mark.textContent = charge;
    parent.appendChild(mark);
  }

  /** Non-overlapping ring packing; positions are shuffled for random type assignment. */
  function nonOverlappingNucleonPositions(total, cx, cy, pr) {
    const positions = [];
    if (total <= 0) return positions;
    if (total === 1) {
      positions.push({ x: cx, y: cy });
      return positions;
    }

    const minDist = pr * 2 + 2;
    let remaining = total;
    let ring = 0;
    const baseAngle = Math.random() * Math.PI * 2;

    while (remaining > 0) {
      ring += 1;
      const R = ring * minDist;
      const capacity = Math.max(1, Math.floor((2 * Math.PI * R) / minDist));
      const take = Math.min(remaining, capacity);
      const offset = (ring % 2) * (Math.PI / take);
      for (let i = 0; i < take; i++) {
        const a = baseAngle + offset + (Math.PI * 2 * i) / take;
        positions.push({
          x: cx + Math.cos(a) * R,
          y: cy + Math.sin(a) * R
        });
      }
      remaining -= take;
    }

    return shuffle(positions);
  }

  function packNucleus(protons, neutrons, cx, cy, r, positionsOut) {
    const total = protons + neutrons;
    const types = shuffle([
      ...Array(protons).fill("p"),
      ...Array(neutrons).fill("n")
    ]);
    const group = el("g", { class: "nucleus" });
    if (!total) return group;

    const pr = nucleonRadius(total);
    const positions = nonOverlappingNucleonPositions(total, cx, cy, pr);

    types.forEach((type, i) => {
      const pos = positions[i] || { x: cx, y: cy };
      const grad = type === "p" ? "grad-proton" : "grad-neutron";
      const noWhite = type === "p";
      const ball = drawSphere(
        group, pos.x, pos.y, pr, grad,
        type === "p" ? "proton" : "neutron",
        { noWhiteOutline: noWhite }
      );
      particleIdentity(ball, pos.x, pos.y, type, pr);
      if (positionsOut) {
        positionsOut[type].push({ x: pos.x, y: pos.y, r: pr });
      }
    });
    return group;
  }

  /**
   * Electron placement order (school Bohr model):
   * 1 top, 2 bottom, 3 left, 4 right,
   * then 5–8 pair with 1–4 respectively.
   */
  function electronAngles(count) {
    if (count <= 0) return [];
    // top, bottom, left, right
    const CARDINAL = [-Math.PI / 2, Math.PI / 2, Math.PI, 0];
    const pairSpread = 0.32;
    const angles = [];

    for (let i = 0; i < count; i++) {
      const slot = i < 4 ? i : i - 4;
      const base = CARDINAL[slot];
      const willPair = count > slot + 4; // this slot gets a second electron
      const isPairPartner = i >= 4;

      if (isPairPartner) {
        angles.push(base + pairSpread / 2);
      } else if (willPair) {
        angles.push(base - pairSpread / 2);
      } else {
        angles.push(base);
      }
    }
    return angles;
  }

  function placeElectrons(shells, cx, cy, baseR, positionsOut) {
    const group = el("g", { class: "electrons" });
    const caps = window.ATOM_LAB_SHELL_CAPS;
    if (!shells.length) {
      group.appendChild(el("circle", {
        cx, cy, r: baseR, fill: "none", stroke: SHELL,
        "stroke-width": 2, "stroke-dasharray": "5 4", class: "shell-orbit empty"
      }));
      return group;
    }
    shells.forEach((count, shellIndex) => {
      const radius = baseR + shellIndex * SHELL_STEP;
      const full = count === caps[shellIndex];
      const orbit = el("circle", {
        cx, cy, r: radius, fill: "none",
        stroke: full ? SHELL_FULL : SHELL,
        "stroke-width": full ? 2.6 : 2,
        "stroke-dasharray": "5 4",
        class: full ? "shell-orbit shell-full" : "shell-orbit",
        "data-shell": String(shellIndex)
      });
      if (full) {
        orbit.setAttribute("filter", "url(#shell-full-glow)");
        orbit.setAttribute("opacity", "0.95");
      }
      group.appendChild(orbit);

      const angles = electronAngles(count);
      angles.forEach((angle, slotIndex) => {
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        const eg = el("g", {
          class: "electron",
          "data-shell": String(shellIndex),
          "data-slot": String(slotIndex)
        });
        drawSphere(eg, x, y, ELECTRON_R, "grad-electron", "electron-ball", { noWhiteOutline: true });
        particleIdentity(eg, x, y, "e", ELECTRON_R);
        group.appendChild(eg);
        if (positionsOut) {
          positionsOut.e.push({
            x, y, r: ELECTRON_R,
            shell: shellIndex,
            slot: slotIndex
          });
        }
      });
    });
    return group;
  }

  let lastPositions = { p: [], n: [], e: [] };

  function getLastPositions() {
    return {
      p: lastPositions.p.slice(),
      n: lastPositions.n.slice(),
      e: lastPositions.e.slice()
    };
  }

  /**
   * Position of the particle that will disappear on the next −1.
   * Electrons leave in reverse placement order (last filled = first to fly away),
   * which is also the outermost shell’s last-placed electron.
   * Nucleons use the last recorded slot from the current render.
   */
  function getFlyAwayStart(type) {
    const pool = lastPositions[type] || [];
    if (!pool.length) {
      return { x: ATOM_CX, y: ATOM_CY, r: type === "e" ? ELECTRON_R : 12 };
    }
    const src = pool[pool.length - 1];
    return { x: src.x, y: src.y, r: src.r };
  }

  function layoutMetrics(protons, neutrons, electrons) {
    const shells = window.shellsForElectrons(electrons);
    const nucleusR = nucleusPackRadius(protons, neutrons);
    const baseR = nucleusR + FIRST_SHELL_GAP;
    const shellCount = Math.max(shells.length, 1);
    const outerR = baseR + (shellCount - 1) * SHELL_STEP + ELECTRON_R;
    return { shells, nucleusR, baseR, outerR };
  }

  function render(svg, opts) {
    const { protons, neutrons, electrons } = opts;

    clear(svg);
    svg.setAttribute("viewBox", `0 0 ${VIEW_W} ${VIEW_H}`);
    ensureDefs(svg);

    const cx = ATOM_CX;
    const cy = ATOM_CY;
    const { shells, nucleusR, baseR } = layoutMetrics(protons, neutrons, electrons);
    const positionsOut = { p: [], n: [], e: [] };
    const world = el("g", { class: "atom-world", id: "atom-world" });

    world.appendChild(el("circle", {
      cx, cy, r: nucleusR + 14,
      fill: "url(#nucleus-glow)", class: "nucleus-glow"
    }));
    world.appendChild(packNucleus(protons, neutrons, cx, cy, nucleusR, positionsOut));
    world.appendChild(placeElectrons(shells, cx, cy, baseR, positionsOut));
    svg.appendChild(world);

    lastPositions = positionsOut;
    return { cx, cy, shells, nucleusR, baseR, positions: positionsOut };
  }

  /**
   * Animate a particle flying off-screen from startPos.
   * Returns { promise, skip } — skip() finishes instantly.
   */
  function animateOffScreen(svg, type, startPos, durationMs) {
    ensureDefs(svg);
    const duration = durationMs || 700;
    const start = startPos || { x: ATOM_CX, y: ATOM_CY };
    const angle = -0.55 + Math.random() * 1.1;
    const dist = 340 + Math.random() * 90;
    const end = {
      x: start.x + Math.cos(angle) * dist,
      y: start.y + Math.sin(angle) * dist - 30
    };
    const overlay = el("g", { class: "transfer-particle" });
    const r = (startPos && startPos.r) || (type === "e" ? ELECTRON_R : 12);
    const grad = type === "p" ? "grad-proton" : type === "n" ? "grad-neutron" : "grad-electron";
    drawSphere(overlay, start.x, start.y, r, grad, "moving-ball", {
      noWhiteOutline: type === "p" || type === "e"
    });
    particleIdentity(overlay, start.x, start.y, type, r);
    svg.appendChild(overlay);

    let cancelled = false;
    let rafId = 0;
    let resolveFn = null;

    function cleanup() {
      if (overlay.parentNode) overlay.remove();
    }

    function skip() {
      if (cancelled) return;
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      cleanup();
      if (resolveFn) resolveFn();
    }

    const promise = new Promise((resolve) => {
      resolveFn = resolve;
      const t0 = performance.now();
      function frame(now) {
        if (cancelled) return;
        const p = Math.min(1, (now - t0) / duration);
        const ease = p * p;
        const x = start.x + (end.x - start.x) * ease;
        const y = start.y + (end.y - start.y) * ease;
        overlay.setAttribute("transform", `translate(${x - start.x} ${y - start.y})`);
        overlay.setAttribute("opacity", String(1 - p));
        if (p < 1) {
          rafId = requestAnimationFrame(frame);
        } else {
          cleanup();
          resolve();
        }
      }
      rafId = requestAnimationFrame(frame);
    });

    return { promise, skip };
  }

  return {
    render,
    animateOffScreen,
    getLastPositions,
    getFlyAwayStart,
    layoutMetrics,
    VIEW_W,
    VIEW_H,
    COLORS,
    colors: {
      PROTON: COLORS.proton.swatch,
      NEUTRON: COLORS.neutron.swatch,
      ELECTRON: COLORS.electron.swatch
    }
  };
})();
