/* Animated 2D pixel-art backdrops for every gameplay scene.
   Same visual language as the opening scene: dithered gradients, procedural props,
   ambient motion (clouds, steam, dust, rain, lights, crowds) and warm glow.
   One internal canvas (400x200) is scaled with nearest-neighbour behind the DOM characters. */
(() => {
  const W = 400, H = 200, HZ = 112;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mk = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d"); x.imageSmoothingEnabled = false; return [c, x]; };
  const R = (c, col, x, y, w, h) => { c.fillStyle = col; c.fillRect(Math.round(x), Math.round(y), Math.max(1, Math.round(w)), Math.max(1, Math.round(h))); };
  const E = (c, col, cx, cy, rx, ry) => { c.fillStyle = col; for (let y = -ry; y <= ry; y++) { const hw = Math.round(rx * Math.sqrt(1 - (y * y) / (ry * ry + 0.01))); c.fillRect(Math.round(cx - hw), Math.round(cy + y), hw * 2 + 1, 1); } };
  const rnd = (s) => () => (s = (s * 16807) % 2147483647) / 2147483647;
  const hx = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const mix = (a, b, t) => { const A = hx(a), B = hx(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`; };
  const bay = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
  const DT = (c, x0, y0, w, h, a, z, steps = 6) => { for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const t = y / Math.max(1, h - 1), q = Math.floor(t * steps) / steps, f = t * steps - Math.floor(t * steps); c.fillStyle = mix(a, z, Math.min(1, q + (f > bay[y & 3][x & 3] / 16 ? 1 / steps : 0))); c.fillRect(x0 + x, y0 + y, 1, 1); } };
  const T = (c, s, x, y, col = "#fff4d8", size = 8, align = "center", shadow = "#151b38") => { c.font = `bold ${size}px "DM Mono", monospace`; c.textAlign = align; c.textBaseline = "middle"; if (shadow) { c.fillStyle = shadow; c.fillText(s, Math.round(x) + 1, Math.round(y) + 2); } c.fillStyle = col; c.fillText(s, Math.round(x), Math.round(y) + 1); };
  const glow = (c, x, y, r, col, a, steps = 5) => { for (let i = steps; i >= 1; i--) { c.globalAlpha = a / steps * 1.4; E(c, col, x, y, r * i / steps, r * i / steps * 0.9); } c.globalAlpha = 1; };
  const spark = (c, x, y, col, s = 1) => { R(c, col, x, y - s, 1, s * 2 + 1); R(c, col, x - s, y, s * 2 + 1, 1); };
  const sign = (c, s, x, y, w, bg = "#1a2040", fg = "#f2dca0", size = 7) => { R(c, "#0b0e22", x - w / 2 - 2, y - 7, w + 4, 15); R(c, bg, x - w / 2, y - 5, w, 11); R(c, fg + "55", x - w / 2, y - 5, w, 1); T(c, s, x, y, fg, size, "center", null); };
  const planks = (c, y0, y1, cols, seed = 3) => { const r = rnd(seed); let y = y0, k = 0; while (y < y1) { const h = 6 + Math.round((y - y0) / (y1 - y0) * 12), pw = 30 + k * 6; for (let x = -pw + ((k * 17) % pw); x < W; x += pw) { R(c, cols[(Math.floor(x / pw) + k) % cols.length], x, y, pw, h); R(c, "#ffffff10", x, y, pw, 1); R(c, "#00000030", x, y, 1, h); if (r() > .6) R(c, "#00000014", x + 4, y + 2, 6, 1); } R(c, "#00000030", 0, y + h - 1, W, 1); y += h; k++; } };
  const tiles = (c, y0, y1, a, b, s = 16) => { for (let y = y0, j = 0; y < y1; y += s / 2, j++) for (let x = (j % 2) * s / 2 - s; x < W; x += s) { R(c, ((x / s + j) | 0) % 2 ? a : b, x, y, s / 2 + (j % 2 ? 0 : 0), s / 2); } };
  const shade = (c, y0, n = 12, a = .3) => { for (let i = 0; i < n; i++) { c.fillStyle = `rgba(0,0,0,${a - i * a / n})`; c.fillRect(0, y0 + i, W, 1); } };
  const cloudShape = (c, x, y, s, col) => { E(c, col, x, y, 10 * s, 3 * s); E(c, col, x - 6 * s, y + 1, 7 * s, 2.5 * s); E(c, col, x + 7 * s, y + 1, 8 * s, 2.5 * s); E(c, col, x + 1 * s, y - 2 * s, 6 * s, 3 * s); };
  const tree = (c, x, y, s, leaf, leaf2, trunk = "#6b4a3a") => { R(c, trunk, x - 2 * s, y - 14 * s, 4 * s, 14 * s); R(c, "#00000030", x + s, y - 14 * s, s, 14 * s); E(c, leaf, x, y - 22 * s, 13 * s, 11 * s); E(c, leaf2, x - 4 * s, y - 25 * s, 8 * s, 6 * s); E(c, leaf, x + 8 * s, y - 17 * s, 8 * s, 6 * s); };
  const deskSet = (c, x, y, s = 1) => { R(c, "#2a2230", x - 2 * s, y + 6 * s, 3 * s, 9 * s); R(c, "#2a2230", x + 17 * s, y + 6 * s, 3 * s, 9 * s); R(c, "#b98a5c", x - 4 * s, y, 28 * s, 4 * s); R(c, "#dcb27e", x - 4 * s, y, 28 * s, 1); R(c, "#7a5a3c", x - 4 * s, y + 4 * s, 28 * s, 2 * s); R(c, "#4a5f8a", x + 2 * s, y - 3 * s, 6 * s, 3 * s); R(c, "#e7d3a8", x + 12 * s, y - 2 * s, 7 * s, 2 * s); R(c, "#3b4a6b", x + 2 * s, y + 18 * s, 18 * s, 2 * s); R(c, "#6b5a7a", x + 4 * s, y + 10 * s, 14 * s, 3 * s); };
  const plant = (c, x, y, s = 1) => { R(c, "#b5654a", x - 5 * s, y - 8 * s, 10 * s, 8 * s); R(c, "#d07b5b", x - 5 * s, y - 8 * s, 10 * s, 2); for (const [dx, dy, r] of [[-5, -14, 4], [0, -18, 4], [5, -13, 4], [-1, -12, 4]]) { E(c, "#4f8a63", x + dx * s, y + dy * s, r * s, 3 * s); E(c, "#6fae7e", x + dx * s - 1, y + dy * s - 1, (r - 1) * s, 2 * s); } };
  const clock = (c, x, y, r) => { E(c, "#2a2230", x, y, r + 1, r + 1); E(c, "#f4ecd8", x, y, r, r); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; R(c, "#2a2230", x + Math.sin(a) * (r - 1), y - Math.cos(a) * (r - 1), 1, 1); } };
  const clockHands = (c, x, y, r, t) => { const m = (t * 6 % 360) * Math.PI / 180, h = (t * 0.5 % 360) * Math.PI / 180; for (let i = 0; i < r - 2; i++) { R(c, "#2a2230", x + Math.sin(h) * i * 0.6, y - Math.cos(h) * i * 0.6, 1, 1); R(c, "#c0392b", x + Math.sin(m) * i, y - Math.cos(m) * i, 1, 1); } };
  const bunting = (c, y, cols, t, amp = 3) => { for (let x = 0; x < W; x++) R(c, "#3a2c3f", x, y + Math.round(Math.sin(x / W * Math.PI * 3) * amp + amp), 1, 1); for (let i = 0; i < 18; i++) { const x = 8 + i * 22, yy = y + Math.round(Math.sin(x / W * Math.PI * 3) * amp + amp) + 1, w = Math.sin(t * 2 + i) > .6 ? 1 : 0; for (let k = 0; k < 6; k++) R(c, cols[i % cols.length], x - 3 + k / 2 + w, yy + k, 7 - k, 1); } };

  /* ---------- ambient particles ---------- */
  const pool = (n, r, f) => Array.from({ length: n }, () => f(r));
  const driftUp = (c, S, key, dt, n, col, a0 = 0.6, spd = 6, area = [0, 0, W, H]) => {
    const p = S[key] || (S[key] = pool(n, rnd(n * 7 + 3), (r) => ({ x: area[0] + r() * area[2], y: area[1] + r() * area[3], v: spd * (.5 + r()), p: r() * 6.28, a: a0 * (.4 + r() * .6) })));
    for (const m of p) { m.y -= m.v * dt; m.x += Math.sin(S.t * .8 + m.p) * 5 * dt; if (m.y < area[1]) { m.y = area[1] + area[3]; m.x = area[0] + Math.random() * area[2]; } c.globalAlpha = m.a * (.5 + .5 * Math.sin(S.t * 2 + m.p)); R(c, col, m.x, m.y, 1, 1); } c.globalAlpha = 1;
  };
  const fall = (c, S, key, dt, n, cols, spd = 22, size = 2, sway = 10) => {
    const p = S[key] || (S[key] = pool(n, rnd(n * 13 + 5), (r) => ({ x: r() * W, y: r() * H, v: spd * (.6 + r() * .8), p: r() * 6.28, c: cols[Math.floor(r() * cols.length)], w: r() })));
    for (const m of p) { m.y += m.v * dt; m.x += Math.sin(S.t * 1.7 + m.p) * sway * dt; if (m.y > H + 3) { m.y = -3; m.x = Math.random() * W; } const f = Math.sin(S.t * 6 + m.p) > 0; R(c, m.c, m.x, m.y, f ? size : 1, f ? 1 : size); }
  };
  const drifter = (c, S, key, dt, n, y0, y1, spd, draw) => {
    const p = S[key] || (S[key] = pool(n, rnd(n * 31 + 1), (r) => ({ x: r() * W, y: y0 + r() * (y1 - y0), v: spd * (.5 + r()), s: .7 + r() * .8 })));
    for (const m of p) { m.x += m.v * dt; if (m.x > W + 30) { m.x = -30; m.y = y0 + Math.random() * (y1 - y0); } draw(c, m); }
  };
  const birds = (c, S, dt, t) => drifter(c, S, "birds", dt, 3, 14, 52, 16, (c2, m) => { const f = Math.sin(t * 9 + m.x * .1) > 0; R(c2, "#1b2036", m.x, m.y + (f ? 0 : 1), 2, 1); R(c2, "#1b2036", m.x + 2, m.y + (f ? 1 : 0), 1, 1); R(c2, "#1b2036", m.x + 3, m.y + (f ? 0 : 1), 2, 1); });

  const classroom = (b, o) => {
    DT(b, 0, 0, W, HZ + 4, o.wallA, o.wallB); for (let x = 0; x < W; x += 20) R(b, "#ffffff0a", x, 6, 1, HZ);
    R(b, "#2a2f45", 0, 0, W, 5); R(b, o.trim, 0, HZ - 4, W, 6); R(b, "#ffffff40", 0, HZ - 4, W, 1);
    planks(b, HZ + 2, H, o.floor, 5); shade(b, HZ + 2);
    // window
    R(b, "#d9c4a1", 22, 22, 72, 62); R(b, o.sky[0], 26, 26, 64, 54); DT(b, 26, 26, 64, 54, o.sky[0], o.sky[1]); R(b, "#d9c4a1", 57, 26, 3, 54); R(b, "#d9c4a1", 26, 52, 64, 3); R(b, "#b99d78", 18, 84, 80, 4); R(b, "#f0dfc0", 18, 84, 80, 1);
    // board
    R(b, "#6b4b33", 120, 20, 168, 70); R(b, "#2f5a4a", 124, 24, 160, 62); DT(b, 124, 24, 160, 62, "#2f5a4a", "#264a3c", 3); R(b, "#c9b08a", 120, 88, 168, 4); for (let i = 0; i < 5; i++) R(b, ["#f4ecd8", "#f0a8b8", "#9fd0ff"][i % 3], 130 + i * 9, 88, 6, 2);
    clock(b, 320, 36, 11); R(b, "#c9b08a", 304, 58, 34, 22); R(b, "#f4ecd8", 306, 60, 30, 18);
    plant(b, 372, HZ + 4, 1.4); R(b, "#6b4b33", 345, 14, 40, 52); R(b, "#3b5a7a", 349, 18, 32, 44); // door
    R(b, "#d6ad66", 376, 42, 2, 2);
  };

  /* ---------- painters ---------- */
  const P = {};

  P["school-class"] = {
    bg(b, st) {
      classroom(b, { wallA: "#cfe0dc", wallB: "#b4ccc8", trim: "#9c7e5f", floor: ["#b98a62", "#c3946b", "#ae7f58"], sky: ["#7fc0e4", "#d6ecf2"] });
      T(b, "BAHASA · IPS · SEJARAH", 204, 32, "#f4ecd8cc", 7, "center", null);
      for (let i = 0; i < 4; i++) R(b, "#f4ecd899", 134 + i * 36, 45 + (i % 2) * 5, 22, 1);
      b.fillStyle = "#f4ecd8"; for (const [x, y] of [[150, 62], [152, 63], [154, 62], [156, 63], [210, 60], [211, 61], [212, 62], [213, 61]]) b.fillRect(x, y, 1, 1);
      deskSet(b, 40, 130); deskSet(b, 150, 138); deskSet(b, 262, 128);
      if (!st.explore) sign(b, "KELAS XI · SMAN 94", 204, 106, 108, "#2a3350", "#f2dca0", 6);
    },
    fx(c, S, dt) {
      const t = S.t; c.save(); c.beginPath(); c.rect(26, 26, 64, 54); c.clip(); drifter(c, S, "cl", dt, 3, 30, 60, 4, (c2, m) => cloudShape(c2, m.x * .4 + 20, m.y, m.s * .8, "#ffffffcc")); c.restore();
      c.globalAlpha = .1 + .03 * Math.sin(t); c.fillStyle = "#fff6d0"; for (let y = 0; y < 100; y++) c.fillRect(30 + y * .9, 84 + y, 54 - y * .15, 1); c.globalAlpha = 1;
      driftUp(c, S, "dust", dt, 26, "#fff6d0", .8, 3, [40, 80, 110, 90]); clockHands(c, 320, 36, 11, t);
    },
  };

  P["calendar"] = {
    bg(b) {
      classroom(b, { wallA: "#d8e6df", wallB: "#bdd2cb", trim: "#9c7e5f", floor: ["#b98a62", "#c3946b", "#ae7f58"], sky: ["#8ac5e8", "#e2f1f4"] });
      R(b, "#2a2230", 126, 14, 156, 82); R(b, "#f4ecd8", 130, 18, 148, 74); R(b, "#c0392b", 130, 18, 148, 14); T(b, "KALENDER SEKOLAH", 204, 25, "#fff4d8", 8, "center", null);
      T(b, "MAULID NABI", 204, 44, "#2a2230", 11, "center", null); T(b, "JUMAT", 204, 60, "#c0392b", 10, "center", null);
      for (let i = 0; i < 5; i++) { R(b, "#2a2230", 148 + i * 22, 70, 14, 14); R(b, "#fffdf4", 149 + i * 22, 71, 12, 12); }
      deskSet(b, 60, 138); deskSet(b, 280, 134); sign(b, "KELAS · PENGUMUMAN HARI LIBUR", 204, 106, 150, "#2a3350", "#f2dca0", 6);
    },
    fx(c, S, dt) { const t = S.t; c.save(); c.beginPath(); c.rect(26, 26, 64, 54); c.clip(); drifter(c, S, "cl", dt, 3, 30, 60, 4, (c2, m) => cloudShape(c2, m.x * .4 + 20, m.y, m.s * .8, "#ffffffcc")); c.restore(); driftUp(c, S, "dust", dt, 22, "#fff6d0", .8, 3, [40, 80, 110, 90]); clockHands(c, 320, 36, 11, t); if (Math.sin(t * 2.5) > .2) { R(c, "#c0392b", 150 + (Math.floor(t * .6) % 5) * 22, 74, 10, 2); } },
  };

  P["dreams"] = {
    bg(b) {
      classroom(b, { wallA: "#e0b58f", wallB: "#a8706a", trim: "#7a5040", floor: ["#9a6a52", "#a5745a", "#8f5f4a"], sky: ["#f2a65a", "#7a4a78"] });
      R(b, "#2a2230", 120, 20, 168, 70); R(b, "#2f4a50", 124, 24, 160, 62); T(b, "RENCANA MASA DEPAN", 204, 34, "#f4ecd8", 8, "center", null); T(b, "UI", 170, 60, "#f2dca0", 14, "center", null); T(b, "STIS", 238, 60, "#9fd0ff", 12, "center", null);
      R(b, "#f4ecd8", 40, 100, 44, 14); T(b, "CITA-CITA", 62, 107, "#2a2230", 6, "center", null);
      deskSet(b, 60, 138); deskSet(b, 290, 134);
    },
    fx(c, S, dt) { const t = S.t; c.globalAlpha = .13 + .04 * Math.sin(t * .8); c.fillStyle = "#ffcf8a"; for (let y = 0; y < 110; y++) c.fillRect(34 + y * 1.1, 84 + y, 64 - y * .2, 1); c.globalAlpha = 1; drifter(c, S, "bd", dt, 2, 34, 56, 10, (c2, m) => { const f = Math.sin(t * 9 + m.x) > 0; R(c2, "#2a1f3a", m.x * .2 + 30, m.y + (f ? 0 : 1), 2, 1); R(c2, "#2a1f3a", m.x * .2 + 32, m.y + (f ? 1 : 0), 2, 1); }); driftUp(c, S, "dust", dt, 30, "#ffd9a0", .9, 3, [30, 70, 200, 100]); clockHands(c, 320, 36, 11, t * 3); },
  };

  P["school-gate"] = {
    bg(b, st) {
      DT(b, 0, 0, W, HZ, "#79b8e0", "#e4f0ec", 7);
      for (let i = 0; i < 12; i++) E(b, "#8aa7a066", 20 + i * 36, HZ - 4, 24, 6);
      R(b, "#d1b496", 98, 38, 204, 80); R(b, "#b99a7a", 98, 38, 204, 5); R(b, "#8a3a3a", 92, 28, 216, 12); R(b, "#a54a4a", 92, 28, 216, 3);
      for (let i = 0; i < 6; i++) { R(b, "#6b8aa0", 112 + i * 30, 54, 18, 22); R(b, "#a8d0e6", 114 + i * 30, 56, 14, 18); R(b, "#d9c4a1", 120 + i * 30, 54, 2, 22); }
      R(b, "#5a4636", 186, 86, 28, 34); R(b, "#d6ad66", 209, 104, 2, 2);
      sign(b, "SMA SMAN 94", 200, 20, 90, "#1c2a4a", "#f4ecd8", 8);
      DT(b, 0, HZ, W, H - HZ, "#8fb36a", "#5f8f50", 4); R(b, "#c7b799", 0, 140, W, 60); DT(b, 0, 140, W, 60, "#cdbf9f", "#a99a7c", 4); R(b, "#00000020", 0, 139, W, 1);
      for (let x = 20; x < W; x += 52) R(b, "#00000012", x, 142, 1, 56);
      tree(b, 40, 124, 1.5, "#3f7a4c", "#5aa066"); tree(b, 362, 126, 1.6, "#3f7a4c", "#5aa066");
      R(b, "#e8e2d0", 66, 36, 3, 92); for (let i = 0; i < 3; i++) R(b, "#cfc7b0", 66, 50 + i * 20, 3, 2);
      R(b, "#9c9ea8", 108, 98, 20, 34); R(b, "#c9ccd6", 108, 98, 4, 34); R(b, "#9c9ea8", 272, 98, 20, 34); R(b, "#c9ccd6", 272, 98, 4, 34); R(b, "#6b6d7a", 108, 98, 184, 5);
      for (let x = 128; x < 272; x += 11) R(b, "#555766", x, 103, 2, 28); R(b, "#6b6d7a", 128, 118, 144, 2);
      R(b, "#8a5a3a", 296, 134, 40, 4); R(b, "#6b4a30", 298, 138, 3, 8); R(b, "#6b4a30", 332, 138, 3, 8); R(b, "#a8774e", 296, 126, 40, 3);
    },
    fx(c, S, dt) { const t = S.t; drifter(c, S, "cl", dt, 4, 12, 70, 5, (c2, m) => cloudShape(c2, m.x, m.y, m.s, "#fffffff0")); birds(c, S, dt, t);
      for (let y = 0; y < 14; y++) { const wv = Math.round(Math.sin(t * 5 + y * .5) * (1 + y * .25)); R(c, y < 7 ? "#d94a4a" : "#f4f0e8", 69 + wv, 36 + y, 14 - Math.abs(wv), 1); } fall(c, S, "leaf", dt, 8, ["#c7a24a", "#8a5a2a", "#6b9a4a"], 12, 2, 14); },
  };

  P["school-canteen"] = {
    bg(b) {
      DT(b, 0, 0, W, HZ + 4, "#e7c9a0", "#c9996b"); for (let x = 0; x < W; x += 24) R(b, "#00000010", x, 0, 1, HZ);
      R(b, "#6b4a30", 0, 0, W, 6); tiles(b, HZ + 4, H, "#d9c9a8", "#b9a584", 18); shade(b, HZ + 4);
      R(b, "#8a3a2a", 90, 16, 220, 24); R(b, "#b34c38", 90, 16, 220, 3); T(b, "KANTIN", 200, 28, "#fff4d8", 13, "center");
      R(b, "#6b4a30", 40, 64, 320, 8); R(b, "#a8774e", 40, 64, 320, 3); R(b, "#8a5a3a", 46, 72, 308, 40); for (let x = 52; x < 350; x += 28) R(b, "#00000022", x, 74, 1, 36);
      sign(b, "JAJANAN HARI INI", 200, 56, 124, "#2a3350", "#f2dca0", 6);
      for (let i = 0; i < 9; i++) { const x = 60 + i * 34; R(b, ["#e7b04a", "#d96a4a", "#8a5a3a", "#f0a8b8", "#6fae7e"][i % 5], x, 56 + 7, 14, 6); R(b, "#00000025", x, 62 + 7, 14, 1); }
      R(b, "#9c9ea8", 300, 44, 28, 20); R(b, "#c9ccd6", 300, 44, 28, 3); R(b, "#555766", 326, 50, 6, 3);
      for (const x of [70, 250]) { R(b, "#a8774e", x, 124, 80, 6); R(b, "#6b4a30", x + 4, 130, 4, 24); R(b, "#6b4a30", x + 72, 130, 4, 24); R(b, "#8a5a3a", x - 4, 150, 88, 4); R(b, "#f4ecd8", x + 14, 120, 12, 4); R(b, "#d96a4a", x + 48, 119, 10, 5); }
    },
    fx(c, S, dt) { const t = S.t; for (const x of [150, 290]) { const sw = Math.sin(t * 1.5 + x) * 2; R(c, "#2a2230", x + sw, 6, 1, 14); E(c, "#ffe6a0", x + sw, 24, 4, 4); glow(c, x + sw, 24, 26, "#ffd48a", .13); }
      driftUp(c, S, "st", dt, 22, "#ffffffcc", .7, 9, [306, 18, 22, 30]); driftUp(c, S, "ds", dt, 14, "#fff1c8", .5, 3, [20, 20, 360, 150]); },
  };

  P["motor"] = {
    bg(b) {
      DT(b, 0, 0, W, HZ - 6, "#6ea6c4", "#f1c58b", 8); E(b, "#ffe0a1", 72, 44, 14, 14);
      for (let x = 0; x < W; x += 2) R(b, "#7a8aa8", x, HZ - 40 - Math.round(Math.abs(Math.sin(x / 38)) * 22), 2, 40 + 6);
    },
    fx(c, S, dt) {
      const t = S.t, sp = 60; glow(c, 72, 44, 40, "#ffe2a7", .18);
      drifter(c, S, "cl", dt, 4, 10, 60, 6, (c2, m) => cloudShape(c2, m.x, m.y, m.s, "#f7e7d4cc"));
      // scrolling far trees/buildings
      const off = (t * 28) % 80; for (let i = -1; i < 7; i++) { const x = i * 80 - off + 20; R(c, "#3a5a48", x, HZ - 28, 6, 10); E(c, "#4b7a5a", x + 3, HZ - 32, 12, 9); E(c, "#5b8a68", x, HZ - 36, 7, 5); R(c, "#6a5a6a", x + 40, HZ - 36, 24, 36); R(c, "#f2d9a0", x + 44, HZ - 30, 4, 4); R(c, "#f2d9a0", x + 54, HZ - 30, 4, 4); R(c, "#4a3a4a", x + 40, HZ - 38, 24, 3); }
      // ground and road in perspective
      R(c, "#5b8a56", 0, HZ - 6, W, 20); DT(c, 0, HZ - 6, W, 18, "#6b9a5c", "#4b7a48", 3);
      for (let y = HZ + 12; y < H; y++) { const k = (y - (HZ + 12)) / (H - HZ - 12), l = 200 - k * 0 , half = 40 + k * 260; R(c, y % 6 < 3 ? "#44485a" : "#3c4052", 200 - half, y, half * 2, 1); R(c, "#f2d9a0", 200 - half, y, 2 + k * 3, 1); R(c, "#f2d9a0", 200 + half - (2 + k * 3), y, 2 + k * 3, 1); }
      for (let i = 0; i < 14; i++) { const k = ((i / 14) + t * .5) % 1, y = HZ + 12 + k * k * (H - HZ - 12), kk = (y - (HZ + 12)) / (H - HZ - 12), hf = 40 + kk * 260; for (const f of [-1 / 3, 1 / 3]) R(c, "#f4e6c0", 200 + f * hf - 1, y, 2 + kk * 3, 2 + kk * 6); }
      R(c, "#9a8a6a", 0, HZ + 12, 4, 2); driftUp(c, S, "dust", dt, 14, "#ffe9b8", .7, 8, [0, 60, W, 120]);
    },
  };

  P["happy-days"] = P["cafe"] = {
    bg(b) {
      DT(b, 0, 0, W, HZ + 4, "#3a2a4a", "#6a3a56"); for (let x = 0; x < W; x += 16) R(b, "#ffffff08", x, 6, 8, HZ);
      R(b, "#1a1426", 0, 0, W, 6); tiles(b, HZ + 4, H, "#f4ecd8", "#2a2a3a", 20); shade(b, HZ + 4);
      R(b, "#caa56a", 110, 16, 180, 70); R(b, "#2a2a4a", 116, 22, 168, 58); DT(b, 116, 22, 168, 58, "#1e2a52", "#3a3a6e", 5);
      R(b, "#b9503c", 0, 96, W, 16); R(b, "#d9715a", 0, 96, W, 2); R(b, "#f4ecd8", 0, 112, W, 3); for (let x = 0; x < W; x += 10) R(b, "#00000012", x, 98, 1, 12);
      R(b, "#6b4a30", 20, 82, 120, 8); R(b, "#a8774e", 20, 82, 120, 3); R(b, "#8a5a3a", 24, 90, 112, 40); for (const x of [40, 80, 120]) { R(b, "#b9503c", x - 6, 140, 12, 4); R(b, "#6b6d7a", x - 1, 144, 2, 14); }
      R(b, "#a8774e", 250, 128, 90, 6); R(b, "#6b6d7a", 292, 134, 6, 22); R(b, "#f4ecd8", 276, 122, 8, 6); E(b, "#f0a8b8", 308, 122, 6, 5); E(b, "#fff0d8", 308, 118, 5, 4); R(b, "#b9503c", 306, 109, 2, 4);
    },
    fx(c, S, dt) { const t = S.t, on = Math.sin(t * 40) > -.97 || Math.floor(t) % 7 !== 0; if (on) { glow(c, 200, 52, 60, "#ff6a9a", .2); T(c, "HAPPY", 200, 44, "#ffb0c8", 14, "center", "#ff3a7a"); T(c, "DAYS", 200, 62, "#9fe8ff", 13, "center", "#2a9ad6"); } else { T(c, "HAPPY", 200, 44, "#6a4a5a", 14, "center", null); T(c, "DAYS", 200, 62, "#3a5a6a", 13, "center", null); }
      for (let i = 0; i < 16; i++) { const x = 12 + i * 25, y = 12 + Math.round(Math.sin(i * .9) * 2) + (i % 2) * 2, a = .5 + .5 * Math.sin(t * 2 + i); R(c, "#2a2230", x, 8, 1, y - 8); glow(c, x, y + 3, 7, ["#ffd88a", "#ff9fb0", "#9fd0ff"][i % 3], .3 * a, 2); R(c, ["#ffd88a", "#ff9fb0", "#9fd0ff"][i % 3], x - 1, y, 3, 4); }
      driftUp(c, S, "st", dt, 8, "#fff", .5, 7, [300, 100, 18, 24]); driftUp(c, S, "m", dt, 20, "#ffd9e8", .6, 4, [0, 20, W, 160]); },
  };

  P["alas-tua"] = {
    bg(b) {
      DT(b, 0, 0, W, HZ + 4, "#1d2742", "#43364f"); for (let i = 0; i < 40; i++) R(b, "#f6ecc8", (i * 53) % W, (i * 31) % 70, 1, 1);
      for (let x = 0; x < W; x += 28) { R(b, "#171c34", x, 70 + Math.round(Math.sin(x) * 4), 28, 50); tree(b, x + 14, HZ + 2, 1.5, "#1d3a3a", "#27504a", "#2a2230"); }
      R(b, "#5b3f33", 40, 30, 320, 90); for (let x = 40; x < 360; x += 12) R(b, "#00000025", x, 30, 1, 90); R(b, "#3b2a24", 40, 24, 320, 8); R(b, "#6b4a3c", 36, 22, 328, 3);
      R(b, "#243050", 130, 44, 140, 50); DT(b, 134, 48, 132, 42, "#16203a", "#2a3a58", 4); R(b, "#6b4a3c", 198, 48, 3, 42); R(b, "#6b4a3c", 134, 68, 132, 3);
      sign(b, "ALAS TUA", 200, 36, 90, "#2a1d1a", "#f2c27a", 9);
      planks(b, HZ + 4, H, ["#5a3f33", "#654637", "#4f382d"], 9); shade(b, HZ + 4);
      R(b, "#8a5a3a", 150, 134, 100, 6); R(b, "#5a3f33", 160, 140, 5, 26); R(b, "#5a3f33", 236, 140, 5, 26);
      for (const x of [118, 262]) { R(b, "#7a4a3a", x, 128, 20, 26); R(b, "#9a644c", x, 118, 20, 12); R(b, "#5a3f33", x + 2, 154, 3, 14); R(b, "#5a3f33", x + 15, 154, 3, 14); }
      R(b, "#2a2230", 64, 40, 2, 44); R(b, "#d6ad66", 58, 84, 14, 18); R(b, "#6b4a30", 56, 82, 18, 2);
    },
    fx(c, S, dt) { const t = S.t, fl = Math.sin(t * 9) + Math.sin(t * 5.3); glow(c, 65, 94, 46 + fl * 2, "#ffb860", .3); R(c, "#ffe08a", 63, 88, 4, 8); R(c, "#fff6cc", 64, 90, 2, 4);
      glow(c, 200, 130, 80, "#ffb860", .08); driftUp(c, S, "ff", dt, 26, "#ffe99a", 1, 5, [0, 60, W, 120]);
      drifter(c, S, "moth", dt, 2, 70, 100, 6, (c2, m) => { const f = Math.sin(t * 20 + m.x) > 0; R(c2, "#e8dcc0", m.x * .2 + 40 + Math.sin(t * 2 + m.y) * 12, m.y + Math.sin(t * 3) * 4, f ? 3 : 2, 1); }); },
  };

  P["graduation"] = {
    bg(b) {
      DT(b, 0, 0, W, HZ, "#6ab0e6", "#f4e6c8", 8); for (let i = 0; i < 5; i++) E(b, "#8aa7a066", 30 + i * 90, HZ - 4, 50, 8);
      R(b, "#d6c3a0", 70, 44, 260, 72); R(b, "#b9a37e", 70, 44, 260, 5); R(b, "#8a3a3a", 62, 34, 276, 12); for (let i = 0; i < 6; i++) { R(b, "#6b8aa0", 90 + i * 40, 62, 22, 28); R(b, "#a8d0e6", 92 + i * 40, 64, 18, 24); }
      R(b, "#5a4636", 190, 88, 20, 28);
      tree(b, 28, 130, 1.8, "#3f7a4c", "#5aa066"); tree(b, 372, 130, 1.8, "#3f7a4c", "#5aa066");
      DT(b, 0, HZ + 6, W, H - HZ - 6, "#8fb36a", "#5f8f50", 4); R(b, "#d9c9a2", 0, 150, W, 50);
      R(b, "#d94a4a", 100, 14, 200, 18); R(b, "#f0a8a8", 100, 14, 200, 2); T(b, "SELAMAT ATAS KELULUSAN", 200, 24, "#fff4d8", 9, "center", "#7a2a2a"); R(b, "#2a2230", 100, 8, 2, 8); R(b, "#2a2230", 298, 8, 2, 8);
    },
    fx(c, S, dt) { const t = S.t; fall(c, S, "cf", dt, 46, ["#f0a8b8", "#f2dca0", "#9fd0ff", "#b9f0b0", "#ff8a6a"], 26, 2, 12);
      drifter(c, S, "cl", dt, 3, 8, 50, 4, (c2, m) => cloudShape(c2, m.x, m.y, m.s, "#ffffffe6"));
      const caps = S.caps || (S.caps = Array.from({ length: 3 }, (_, i) => ({ x: 120 + i * 80, p: i * 2 })));
      for (const k of caps) { const ph = ((t * .5 + k.p) % 3) / 3, y = 140 - Math.sin(ph * Math.PI) * 90, rot = Math.floor(ph * 8) % 2; R(c, "#1b2036", k.x - 6, y, 13, 2); if (rot) R(c, "#1b2036", k.x - 3, y - 3, 7, 3); else R(c, "#1b2036", k.x - 3, y + 2, 7, 3); R(c, "#e5c27b", k.x + 6, y + 2, 1, 4); }
      for (let i = 0; i < 4; i++) { const x = 40 + i * 106, y = 150 - ((t * 14 + i * 30) % 170); E(c, ["#d94a4a", "#e5c27b", "#6aa0e6", "#6fae7e"][i], x, y, 6, 8); R(c, "#ffffff55", x - 3, y - 4, 2, 3); R(c, "#2a2230", x, y + 8, 1, 14); } },
  };

  P["daily-life"] = {
    bg(b) {
      DT(b, 0, 0, 200, HZ, "#e6c27a", "#f4e6c8", 6); DT(b, 200, 0, 200, HZ, "#6a92d6", "#d6e6f4", 6);
      R(b, "#3f7a4c", 0, HZ - 30, 200, 30); R(b, "#2f4a8a", 200, HZ - 30, 200, 30);
      R(b, "#7a9a6a", 24, 40, 120, 66); R(b, "#5a7a4a", 24, 40, 120, 6); for (let i = 0; i < 4; i++) { R(b, "#e6d9a8", 36 + i * 28, 56, 16, 20); R(b, "#9fc0d0", 38 + i * 28, 58, 12, 16); }
      R(b, "#c9ccd6", 254, 40, 120, 66); R(b, "#2f4a8a", 254, 40, 120, 6); for (let i = 0; i < 4; i++) { R(b, "#e6d9a8", 266 + i * 28, 56, 16, 20); R(b, "#9fc0d0", 268 + i * 28, 58, 12, 16); }
      sign(b, "UIN", 84, 28, 50, "#2a4a3a", "#e8f4dc", 10); sign(b, "UI", 314, 28, 50, "#d6a63a", "#2a2230", 10);
      R(b, "#ffffff", 199, 0, 2, H); R(b, "#d6ad66", 198, 0, 1, H); R(b, "#d6ad66", 201, 0, 1, H);
      R(b, "#6a6c7a", 0, HZ, W, 6); DT(b, 0, HZ + 6, W, H - HZ - 6, "#555a6a", "#3c4052", 4); for (let x = 0; x < W; x += 36) R(b, "#f2d9a0", x, 150, 20, 2);
      sign(b, "KULIAH · KEGIATAN · KABAR", 200, 12, 180, "#1c2a4a", "#f4ecd8", 7);
    },
    fx(c, S, dt) { const t = S.t; for (const [cx, col] of [[84, "#ffd88a"], [314, "#fff0b0"]]) { const a = (t * .5 + (cx > 200 ? 1.6 : 0)) % 6.283; E(c, col, cx + Math.cos(a) * 60, 52 - Math.sin(a) * 26, 5, 5); }
      drifter(c, S, "cl", dt, 3, 12, 40, 4, (c2, m) => cloudShape(c2, m.x, m.y + 20, m.s * .6, "#ffffffcc"));
      for (let i = 0; i < 8; i++) { const x = ((t * 18 + i * 52) % 440) - 20, y = 126 + (i % 3) * 8, step = Math.floor(t * 8 + i) % 2; R(c, i % 2 ? "#1b2036" : "#3a2a3a", x, y - 10, 5, 8); R(c, "#e0a58a", x + 1, y - 13, 3, 3); R(c, "#1b2036", x + (step ? 0 : 2), y - 2, 2, 3); R(c, "#1b2036", x + (step ? 3 : 1), y - 2, 2, 3); }
      fall(c, S, "lf", dt, 8, ["#c7a24a", "#8a5a2a"], 12, 2, 14); },
  };

  P["noto"] = {
    bg(b) {
      DT(b, 0, 0, W, HZ + 4, "#2a1f2e", "#4a3340"); for (let x = 0; x < W; x += 18) R(b, "#ffffff07", x, 6, 1, HZ);
      R(b, "#150f1a", 0, 0, W, 6); planks(b, HZ + 4, H, ["#5a3f33", "#654637", "#4f382d"], 4); shade(b, HZ + 4);
      R(b, "#8a6a52", 262, 16, 110, 80); R(b, "#16203a", 268, 22, 98, 68); DT(b, 268, 22, 98, 68, "#121a30", "#2a3552", 5); R(b, "#8a6a52", 316, 22, 3, 68); R(b, "#8a6a52", 268, 56, 98, 3);
      for (let i = 0; i < 4; i++) { const y = 26 + i * 20; R(b, "#6b4a3c", 22, y + 14, 150, 4); for (let k = 0; k < 9; k++) { R(b, ["#f4ecd8", "#d9a066", "#8aa9d6", "#c9ccd6"][(k + i) % 4], 28 + k * 16, y + 4, 9, 10); R(b, "#00000025", 28 + k * 16, y + 12, 9, 2); } }
      R(b, "#4a2f26", 0, 100, W, 18); R(b, "#8a5a3a", 0, 98, W, 4); for (let x = 0; x < W; x += 20) R(b, "#00000020", x, 102, 1, 14);
      R(b, "#9c9ea8", 40, 76, 36, 22); R(b, "#c9ccd6", 40, 76, 36, 3); R(b, "#555766", 74, 82, 7, 3); R(b, "#2a2230", 52, 70, 12, 6);
      for (const x of [60, 220, 330]) { R(b, "#8a5a3a", x, 138, 56, 5); R(b, "#5a3f33", x + 8, 143, 4, 24); R(b, "#5a3f33", x + 44, 143, 4, 24); R(b, "#f4ecd8", x + 20, 132, 10, 6); R(b, "#6b4a30", x + 22, 130, 6, 2); }
    },
    fx(c, S, dt) { const t = S.t; c.save(); c.beginPath(); c.rect(268, 22, 98, 68); c.clip(); for (let i = 0; i < 30; i++) { const x = 268 + ((i * 37 + t * 8) % 98), y = ((i * 53 + t * 150) % 72) + 20; R(c, "#9fb8e0", x, y, 1, 4); } for (const [x, y, w] of [[290, 40, 10], [320, 36, 14], [345, 44, 8]]) { R(c, "#f2c27a", x, y, w, 3); } c.restore();
      R(c, "#f2c27a", 280, 34, 60, 1); T(c, "NOTO COFFEE", 316, 14, "#f2c27a", 8, "center", "#2a1d1a");
      for (const x of [110, 170, 230]) { const sw = Math.sin(t * 1.4 + x) * 2; R(c, "#2a2230", x + sw, 6, 1, 20); E(c, "#ffd88a", x + sw, 30, 6, 5); glow(c, x + sw, 32, 34, "#ffb860", .14); }
      driftUp(c, S, "st", dt, 26, "#ffffffcc", .7, 9, [60, 112, 330, 56]); driftUp(c, S, "ds", dt, 12, "#ffe6b0", .5, 3, [0, 20, W, 160]); },
  };

  P["concert"] = {
    bg(b) {
      DT(b, 0, 0, W, H, "#10102a", "#2a1a3e", 7); R(b, "#7a1f2f", 0, 0, 56, HZ + 20); R(b, "#7a1f2f", 344, 0, 56, HZ + 20);
      for (let x = 0; x < 56; x += 7) { R(b, "#a63245", x, 0, 3, HZ + 20); R(b, "#4a121f", x + 4, 0, 2, HZ + 20); R(b, "#a63245", 344 + x, 0, 3, HZ + 20); R(b, "#4a121f", 344 + x + 4, 0, 2, HZ + 20); }
      sign(b, "SMAN 2 TANGERANG · KOMPETISI BAND", 200, 20, 230, "#1c1a3a", "#f2dca0", 7);
      R(b, "#3a2a2a", 40, HZ + 18, 320, 14); R(b, "#6b4a3a", 40, HZ + 18, 320, 3); planks(b, HZ + 32, 150, ["#2a2030", "#322638"], 11); R(b, "#0b0814", 0, 150, W, 50);
      R(b, "#20203a", 150, 60, 100, 6); R(b, "#2a2a4a", 150, 60, 100, 2);
      // drum kit
      E(b, "#7a1f2f", 200, 100, 22, 16); E(b, "#d9d2c0", 200, 100, 19, 13); E(b, "#cfcab8", 200, 100, 8, 6); R(b, "#d6ad66", 180, 112, 40, 2);
      E(b, "#d9d2c0", 160, 92, 12, 6); E(b, "#7a1f2f", 160, 92, 11, 5); E(b, "#d9d2c0", 240, 92, 12, 6); E(b, "#7a1f2f", 240, 92, 11, 5);
      R(b, "#9c9ea8", 128, 70, 2, 40); E(b, "#e5c27b", 129, 70, 14, 2); R(b, "#9c9ea8", 270, 66, 2, 44); E(b, "#e5c27b", 271, 66, 16, 2);
    },
    fx(c, S, dt) { const t = S.t; for (let i = 0; i < 5; i++) { const a = Math.sin(t * .9 + i * 1.3) * .6, x0 = 60 + i * 70, col = ["#ff6a9a", "#6ad6ff", "#ffe08a", "#9a6aff", "#6affb0"][i]; c.globalAlpha = .1 + .05 * Math.sin(t * 3 + i); c.fillStyle = col; for (let y = 8; y < 150; y++) { const k = y / 150, w = 4 + k * 40, cx = x0 + a * k * 90; c.fillRect(Math.round(cx - w / 2), y, Math.round(w), 1); } c.globalAlpha = 1; R(c, col, x0 - 3, 6, 7, 4); glow(c, x0, 8, 10, col, .5, 2); }
      for (const [x, y, f] of [[162, 92, 5.2], [238, 92, 6.1], [200, 100, 7.4]]) { const hit = Math.sin(t * f) > .85; if (hit) { spark(c, x, y - 8, "#fff6d6", 2); } }
      const crowd = [18, 44, 72, 100, 128, 156, 184, 212, 240, 268, 296, 324, 352, 380];
      crowd.forEach((x, i) => { const b = Math.round(Math.abs(Math.sin(t * 4.2 + i * .9)) * 4), y = 168 + (i % 2) * 8 - b; E(c, "#06040c", x, y, 8, 8); R(c, "#06040c", x - 8, y, 16, 40); if (i % 3 === 0) { const up = Math.round(Math.sin(t * 5 + i) * 3); R(c, "#06040c", x + 7, y - 10 + up, 3, 12); R(c, ["#ffe08a", "#ff6a9a", "#6ad6ff"][i % 3], x + 6, y - 14 + up, 5, 5); glow(c, x + 8, y - 11 + up, 8, "#ffe08a", .35, 2); } });
      for (let i = 0; i < 34; i++) { if (Math.sin(t * 3 + i * 2.3) > .8) spark(c, (i * 37) % W, 140 + (i * 13) % 40, "#fff6d6", 1); }
      driftUp(c, S, "haze", dt, 30, "#c9a0ff", .5, 5, [0, 40, W, 120]); },
  };

  P["campus"] = {
    bg(b) {
      DT(b, 0, 0, W, HZ, "#6ab0e6", "#e4f0ec", 8);
      R(b, "#b34c38", 90, 30, 220, 88); R(b, "#8a3a2a", 90, 30, 220, 6); for (let i = 0; i < 4; i++) { R(b, "#f4ecd8", 108 + i * 52, 44, 10, 74); R(b, "#d9d2c0", 117 + i * 52, 44, 2, 74); }
      R(b, "#f4ecd8", 80, 22, 240, 10); R(b, "#d9d2c0", 80, 30, 240, 2); for (let i = 0; i < 6; i++) { R(b, "#6b8aa0", 130 + i * 28, 56, 12, 20); R(b, "#a8d0e6", 131 + i * 28, 57, 10, 18); }
      sign(b, "UNIVERSITAS INDONESIA", 200, 20, 164, "#d6a63a", "#2a2230", 8);
      R(b, "#5a4636", 186, 88, 28, 30);
      DT(b, 0, HZ + 4, W, H - HZ - 4, "#8fb36a", "#5f8f50", 4);
      for (let y = HZ + 6; y < H; y++) { const k = (y - HZ - 6) / (H - HZ - 6), half = 18 + k * 120; R(b, "#d9c9a2", 200 - half, y, half * 2, 1); } R(b, "#00000020", 0, HZ + 3, W, 1);
      tree(b, 30, 150, 2, "#3f7a4c", "#5aa066"); tree(b, 370, 150, 2, "#3f7a4c", "#5aa066"); tree(b, 70, 126, 1.4, "#4a8a56", "#6ab078"); tree(b, 335, 126, 1.4, "#4a8a56", "#6ab078");
      sign(b, "PERPUSTAKAAN · KEGIATAN KAMPUS", 200, 188, 190, "#1c2a4a", "#f4ecd8", 7);
    },
    fx(c, S, dt) { const t = S.t; drifter(c, S, "cl", dt, 4, 8, 44, 5, (c2, m) => cloudShape(c2, m.x, m.y, m.s, "#fffffff0")); birds(c, S, dt, t);
      for (let i = 0; i < 6; i++) { const x = ((t * (8 + i) + i * 70) % 460) - 30, y = 128 + (i % 3) * 5, st = Math.floor(t * 6 + i) % 2, d = i % 2 ? 1 : -1, xx = d > 0 ? x : 400 - x; R(c, ["#3a4a8a", "#8a3a4a", "#3a6a5a"][i % 3], xx, y - 9, 5, 8); R(c, "#e0a58a", xx + 1, y - 12, 3, 3); R(c, "#2a2230", xx + (st ? 0 : 2), y - 1, 2, 3); R(c, "#2a2230", xx + (st ? 3 : 1), y - 1, 2, 3); }
      fall(c, S, "lf", dt, 10, ["#c7a24a", "#8a5a2a", "#6b9a4a"], 12, 2, 16); },
  };

  P["office"] = {
    bg(b) {
      DT(b, 0, 0, W, HZ + 4, "#2a3550", "#3a4666"); R(b, "#1a2036", 0, 0, W, 6);
      R(b, "#0b0e22", 40, 18, 150, 84); DT(b, 44, 22, 142, 76, "#0d1230", "#2a2f64", 5); R(b, "#6a7288", 114, 22, 3, 76); R(b, "#6a7288", 44, 58, 142, 3); R(b, "#aab4c8", 38, 102, 154, 4);
      let x = 0; const r = rnd(12); while (x < 142) { const bw = 8 + Math.floor(r() * 12), bh = 18 + Math.floor(r() * 40); R(b, "#141a3a", 44 + x, 98 - bh, bw, bh); x += bw + 1; }
      sign(b, "RUANG KERJA", 300, 26, 100, "#1c2a4a", "#f4ecd8", 8); clock(b, 300, 62, 12); R(b, "#c9b08a", 250, 22, 100, 2);
      tiles(b, HZ + 4, H, "#3a3f58", "#323650", 18); shade(b, HZ + 4);
      R(b, "#6b4a30", 80, 128, 250, 10); R(b, "#a8774e", 80, 128, 250, 3); R(b, "#4a3224", 90, 138, 6, 38); R(b, "#4a3224", 314, 138, 6, 38);
      R(b, "#1a1a2a", 170, 98, 60, 32); R(b, "#2a3a5a", 173, 101, 54, 26); R(b, "#6b6d7a", 196, 130, 8, 4); R(b, "#6b6d7a", 188, 133, 24, 2);
      R(b, "#f4ecd8", 250, 118, 22, 10); R(b, "#e7d3a8", 256, 114, 22, 10); R(b, "#f4ecd8", 112, 120, 24, 8);
      plant(b, 360, 150, 1.6);
    },
    fx(c, S, dt) { const t = S.t; for (let i = 0; i < 22; i++) if (Math.sin(t * .6 + i * 3.1) > -.3) R(c, "#f3c76e", 48 + (i * 29) % 134, 74 + (i * 11) % 22, 1, 1); R(c, "#2a3a5a", 173, 101, 54, 26);
      for (let i = 0; i < 6; i++) R(c, ["#9fd0ff", "#f2dca0", "#9fe8c0"][i % 3], 178, 105 + i * 3.5, 14 + ((i * 7 + Math.floor(t * 2)) % 30), 1);
      if (Math.floor(t * 1.6) % 2) R(c, "#fff6d6", 178 + 14 + (Math.floor(t) * 7 % 30), 105 + 3.5 * 5, 2, 1); glow(c, 200, 112, 40, "#6aa0e6", .1); clockHands(c, 300, 62, 12, t); driftUp(c, S, "d", dt, 16, "#dfe6ff", .5, 3, [0, 20, W, 160]); },
  };

  P["birthday"] = {
    bg(b) {
      DT(b, 0, 0, W, HZ + 4, "#4a2f5a", "#8a4a68"); for (let r2 = 0; r2 < 5; r2++) for (let k = 0; k < 18; k++) { const px = k * 24 + (r2 % 2 ? 12 : 0), py = 14 + r2 * 22; R(b, "#ffffff10", px, py - 1, 1, 3); R(b, "#ffffff10", px - 1, py, 3, 1); }
      R(b, "#2a1a30", 0, 0, W, 6); planks(b, HZ + 4, H, ["#8a5a5a", "#945f60", "#7f5252"], 14); shade(b, HZ + 4);
      R(b, "#d94a6a", 86, 22, 228, 22); R(b, "#f08aa0", 86, 22, 228, 3); T(b, "SELAMAT ULANG TAHUN, LEHA", 200, 33, "#fff4d8", 10, "center", "#7a1f3a");
      E(b, "#4a2f44", 200, 156, 120, 12); R(b, "#8a5a3a", 120, 118, 160, 8); R(b, "#c4906a", 120, 118, 160, 3); R(b, "#5a3a2a", 130, 126, 6, 30); R(b, "#5a3a2a", 264, 126, 6, 30);
      R(b, "#f4ecd8", 168, 100, 64, 18); R(b, "#d94a6a", 168, 100, 64, 4); R(b, "#f0a8b8", 176, 88, 48, 12); R(b, "#f4ecd8", 176, 88, 48, 3); R(b, "#c4906a", 160, 118, 80, 2);
      for (const [x, c1] of [[140, "#e5c27b"], [248, "#9fd0ff"]]) { R(b, c1, x, 100, 18, 18); R(b, "#d94a6a", x + 7, 100, 4, 18); R(b, "#d94a6a", x, 107, 18, 4); }
      E(b, "#ffe6a0", 40, 70, 4, 4);
    },
    fx(c, S, dt) { const t = S.t; bunting(c, 50, ["#ffd88a", "#ff9fb0", "#9fd0ff", "#b9f0b0"], t);
      for (const x of [184, 200, 216]) { const fl = Math.sin(t * 10 + x); R(c, "#f4ecd8", x, 82, 2, 6); R(c, "#f08f3c", x - 1, 78 - fl * .5, 4, 4); R(c, "#ffe08a", x, 79, 2, 3); glow(c, x + 1, 80, 20, "#ffd48a", .16); }
      for (let i = 0; i < 7; i++) { const x = 30 + i * 56, y = 150 - ((t * 10 + i * 34) % 150) , sw = Math.sin(t + i) * 4; E(c, ["#ff8aa8", "#ffd88a", "#9fd0ff", "#b9f0b0"][i % 4], x + sw, y + 30, 7, 9); R(c, "#ffffff55", x + sw - 3, y + 26, 2, 3); R(c, "#2a2230", x + sw, y + 39, 1, 16); }
      fall(c, S, "cf", dt, 54, ["#f0a8b8", "#f2dca0", "#9fd0ff", "#b9f0b0", "#ff8a6a"], 24, 2, 12);
      const sx = 70 + Math.sin(t * .8) * 8, sy = 90 + Math.sin(t * 1.3) * 6; glow(c, sx, sy, 16, "#ffe08a", .4); R(c, "#151b38", sx - 1, sy - 6, 3, 13); R(c, "#151b38", sx - 6, sy - 1, 13, 3); R(c, "#f1cf7a", sx, sy - 5, 1, 11); R(c, "#f1cf7a", sx - 5, sy, 11, 1); },
  };

  P["phone"] = {
    bg(b) { DT(b, 0, 0, W, H, "#0e1228", "#2a2548", 8); R(b, "#00000040", 0, 0, W, H); },
    fx(c, S, dt) { const t = S.t; for (let i = 0; i < 18; i++) { const x = (i * 71) % W, y = (i * 47) % H, a = .12 + .1 * Math.sin(t * .9 + i); c.globalAlpha = a; E(c, ["#ff9fb0", "#9fd0ff", "#ffd88a"][i % 3], x, y + Math.sin(t * .5 + i) * 6, 8 + i % 6, 8 + i % 6); } c.globalAlpha = 1; driftUp(c, S, "d", dt, 28, "#dfe6ff", .6, 4); },
  };

  P["default"] = P["story-art"] = P["montage"] = {
    bg(b) { DT(b, 0, 0, W, H, "#141a38", "#6a4a78", 8); for (let i = 0; i < 70; i++) R(b, "#f6ecc8", (i * 47) % W, (i * 29) % 110, 1, 1); for (let y = 116; y < H; y++) { const k = (y - 116) / (H - 116), half = 20 + k * 160; R(b, "#3a2f4a", 200 - half, y, half * 2, 1); } E(b, "#1d1730", 200, 116, 220, 6); },
    fx(c, S, dt) { const t = S.t; for (let i = 0; i < 30; i++) { if (Math.sin(t * 1.2 + i * 3) > .5) spark(c, (i * 47) % W, (i * 29) % 110, "#fff3c7", 1); } driftUp(c, S, "fl", dt, 30, "#ffe99a", 1, 6, [0, 60, W, 140]); },
  };

  P["prologue"] = {
    overlay: true,
    bg() {},
    fx(c, S, dt) { const t = S.t; glow(c, 40, 40, 70, "#cdd8ff", .06 + .02 * Math.sin(t)); driftUp(c, S, "d", dt, 30, "#fff1c8", .8, 4); for (let i = 0; i < 20; i++) if (Math.sin(t * 1.4 + i * 3.7) > .85) spark(c, (i * 61) % W, (i * 23) % 90, "#fff6d6", 1); },
  };

  /* ---------- mounting ---------- */
  let current = null, raf = 0, last = 0, acc = 0;
  function unmount() { if (current) { current.canvas.remove(); current = null; } cancelAnimationFrame(raf); raf = 0; }

  function mount(sceneEl, mode, stage) {
    unmount();
    const painter = P[mode] || P.default;
    const host = sceneEl.querySelector(".school-art") || sceneEl;
    const canvas = document.createElement("canvas"); canvas.width = W; canvas.height = H; canvas.className = "scene-canvas" + (painter.overlay ? " scene-canvas-overlay" : "");
    canvas.setAttribute("aria-hidden", "true");
    host.prepend(canvas); host.classList.toggle("art-canvas-on", !painter.overlay); host.dataset.artMode = mode;
    const ctx = canvas.getContext("2d"); ctx.imageSmoothingEnabled = false;
    const [bg, b] = mk(W, H); painter.bg(b, { explore: stage?.playMode === "explore", stage });
    const S = { t: 0 }; current = { canvas, ctx, bg, S, painter };
    const draw = (dt) => { ctx.clearRect(0, 0, W, H); if (!painter.overlay) ctx.drawImage(bg, 0, 0); painter.fx(ctx, S, dt); };
    if (reduce) { S.t = 2; draw(.033); return; }
    const loop = (now) => {
      raf = requestAnimationFrame(loop); const dt = Math.min(.1, (now - last) / 1000 || .016); last = now;
      if (document.hidden || !canvas.isConnected || canvas.offsetParent === null) return;
      acc += dt; if (acc < 1 / 30) return; S.t += acc; const step = acc; acc = 0; draw(step);
    };
    raf = requestAnimationFrame(loop);
  }

  window.SceneArt = { mount, unmount, modes: Object.keys(P) };
})();
