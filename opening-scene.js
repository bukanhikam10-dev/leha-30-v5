/* Opening scene only: animated, procedurally drawn 2D pixel art.
   Internal resolution is 320x270 and is scaled up with nearest-neighbour. */
(() => {
  const host = document.getElementById("opening-canvas");
  if (!host) return;
  const W = 320, H = 270, FLOOR = 176;
  const ctx = host.getContext("2d");
  host.width = W; host.height = H;
  ctx.imageSmoothingEnabled = false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const mk = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d"); x.imageSmoothingEnabled = false; return [c, x]; };
  const R = (c, col, x, y, w, h) => { c.fillStyle = col; c.fillRect(Math.round(x), Math.round(y), Math.max(1, Math.round(w)), Math.max(1, Math.round(h))); };
  const ellipse = (c, col, cx, cy, rx, ry) => { c.fillStyle = col; for (let y = -ry; y <= ry; y++) { const hw = Math.round(rx * Math.sqrt(1 - (y * y) / (ry * ry + 0.01))); c.fillRect(Math.round(cx - hw), Math.round(cy + y), hw * 2 + 1, 1); } };
  const rnd = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const mix = (a, b, t) => { const A = hex(a), B = hex(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`; };
  const bayer = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
  const dither = (c, x0, y0, w, h, from, to, vertical = true) => {
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const t = vertical ? y / (h - 1) : x / (w - 1);
      const q = Math.floor(t * 6) / 6, f = t * 6 - Math.floor(t * 6);
      const useNext = f > bayer[y & 3][x & 3] / 16;
      c.fillStyle = mix(from, to, Math.min(1, q + (useNext ? 1 / 6 : 0)));
      c.fillRect(x0 + x, y0 + y, 1, 1);
    }
  };

  /* ---------- static layers ---------- */
  const [bg, b] = mk(W, H);
  const WIN = { x: 26, y: 26, w: 104, h: 98 };
  (function paintBackground() {
    // wall
    dither(b, 0, 0, W, FLOOR, "#141a38", "#2b3558");
    const r = rnd(7);
    for (let x = 0; x < W; x += 16) R(b, "#ffffff08", x, 8, 1, FLOOR - 8);
    for (let row = 0; row < 5; row++) for (let col = 0; col < 14; col++) {
      const px = col * 24 + (row % 2 ? 12 : 0) + 6, py = 20 + row * 30;
      if (px > WIN.x - 6 && px < WIN.x + WIN.w + 6 && py > WIN.y - 6 && py < WIN.y + WIN.h + 6) continue;
      b.fillStyle = "#e8cf8f1c"; b.fillRect(px, py - 2, 1, 5); b.fillRect(px - 2, py, 5, 1);
    }
    // crown molding
    R(b, "#0e1229", 0, 0, W, 7); R(b, "#2a2f55", 0, 7, W, 1); R(b, "#b99a7c", 0, 8, W, 1); R(b, "#6b5547", 0, 9, W, 2);
    // wainscot
    R(b, "#241f3a", 0, 148, W, FLOOR - 148);
    for (let x = 4; x < W; x += 40) { R(b, "#2e2848", x, 154, 32, 16); R(b, "#3a3358", x, 154, 32, 1); R(b, "#17142a", x, 169, 32, 1); R(b, "#17142a", x + 31, 154, 1, 16); }
    R(b, "#c3a283", 0, 146, W, 3); R(b, "#e0c6a4", 0, 146, W, 1); R(b, "#7b624f", 0, 149, W, 1);
    R(b, "#9c7e66", 0, FLOOR - 6, W, 6); R(b, "#caa987", 0, FLOOR - 6, W, 1); R(b, "#5b4638", 0, FLOOR - 1, W, 1);

    // floor planks (perspective rows)
    const rows = [176, 184, 193, 203, 214, 226, 240, 256, 270];
    for (let i = 0; i < rows.length - 1; i++) {
      const y0 = rows[i], y1 = rows[i + 1], plankW = 36 + i * 9, off = (i * 23) % plankW;
      for (let x = -plankW; x < W + plankW; x += plankW) {
        const px = x + off, tone = (Math.floor(px / plankW) + i) % 3;
        const base = ["#6f4d55", "#745159", "#694850"][tone];
        R(b, base, px, y0, plankW, y1 - y0);
        R(b, "#ffffff0d", px, y0, plankW, 1);
        R(b, "#3b2530", px, y0, 1, y1 - y0);
        for (let k = 0; k < 4; k++) R(b, "#00000010", px + 4 + Math.floor(r() * (plankW - 8)), y0 + 2 + Math.floor(r() * Math.max(1, y1 - y0 - 3)), 5 + Math.floor(r() * 8), 1);
      }
      R(b, "#2f1d28", 0, y1 - 1, W, 1);
    }
    for (let i = 0; i < 12; i++) { b.fillStyle = `rgba(0,0,0,${0.32 - i * 0.026})`; b.fillRect(0, FLOOR + i, W, 1); }

    // rug
    ellipse(b, "#1a1a33", 196, 232, 112, 26); ellipse(b, "#c79a5a", 196, 231, 108, 24);
    ellipse(b, "#2b3562", 196, 231, 103, 21); ellipse(b, "#d6ad66", 196, 231, 90, 17); ellipse(b, "#232c52", 196, 231, 87, 15);
    for (let a = 0; a < 28; a++) { const t = a / 28 * Math.PI * 2; R(b, "#d6ad66", 196 + Math.cos(t) * 96, 231 + Math.sin(t) * 18.5, 2, 1); }
    for (let i = -3; i <= 3; i++) { const x = 196 + i * 20; R(b, "#d6ad66aa", x, 231, 1, 1); R(b, "#d6ad66aa", x - 1, 231, 3, 1); R(b, "#d6ad66aa", x, 230, 1, 3); }

    // window frame + sky
    const { x: wx, y: wy, w: ww, h: wh } = WIN;
    R(b, "#c9a784", wx - 6, wy - 6, ww + 12, wh + 12); R(b, "#e6cba8", wx - 6, wy - 6, ww + 12, 1); R(b, "#8a6b55", wx - 6, wy + wh + 5, ww + 12, 1);
    R(b, "#6a5242", wx - 2, wy - 2, ww + 4, wh + 4);
    dither(b, wx, wy, ww, 40, "#0a0e2a", "#1d2358");
    dither(b, wx, wy + 40, ww, 34, "#1d2358", "#4a3a78");
    dither(b, wx, wy + 74, ww, 24, "#4a3a78", "#c0766f");
    // far hills + skyline
    const far = [14, 18, 12, 20, 26, 22, 16, 24, 30, 24, 18, 22, 28, 20, 14, 18, 22, 26, 20, 16, 12, 16, 20, 14, 18, 22, 18, 14, 20, 16, 12, 18, 24, 20, 14, 10, 14, 18, 22, 16, 12];
    for (let i = 0; i < ww; i++) R(b, "#2a2552", wx + i, wy + wh - far[Math.floor(i / 2.6) % far.length] - 4, 1, far[Math.floor(i / 2.6) % far.length] + 4);
    let x = 0; const r2 = rnd(21);
    while (x < ww) { const bw = 6 + Math.floor(r2() * 9), bh = 14 + Math.floor(r2() * 28); R(b, "#171b3f", wx + x, wy + wh - bh, bw, bh); R(b, "#232a58", wx + x, wy + wh - bh, bw, 1); if (r2() > 0.7) R(b, "#171b3f", wx + x + 2, wy + wh - bh - 4, 2, 4); x += bw; }
    R(b, "#10132f", wx, wy + wh - 5, ww, 5);
    // moon
    ellipse(b, "#f4e7bd", wx + 78, wy + 22, 8, 8); ellipse(b, "#0f1438", wx + 82, wy + 20, 7, 7);
    R(b, "#f4e7bd", wx + 71, wy + 20, 1, 3);
    // mullions
    R(b, "#7a604d", wx + ww / 2 - 2, wy, 4, wh); R(b, "#7a604d", wx, wy + wh * 0.46, ww, 4);
    R(b, "#c9a784", wx + ww / 2 - 2, wy, 1, wh); R(b, "#c9a784", wx, wy + wh * 0.46, ww, 1);
    // sill + items
    R(b, "#d4b390", wx - 12, wy + wh + 5, ww + 24, 6); R(b, "#f0d8b8", wx - 12, wy + wh + 5, ww + 24, 1); R(b, "#6e5443", wx - 12, wy + wh + 11, ww + 24, 2);
    R(b, "#6e5443", wx - 6, wy + wh + 13, 6, 5); R(b, "#6e5443", wx + ww, wy + wh + 13, 6, 5);
    // plant on sill
    R(b, "#b5654a", wx + 6, wy + wh - 6, 12, 11); R(b, "#d07b5b", wx + 6, wy + wh - 6, 12, 2); R(b, "#8c4a37", wx + 15, wy + wh - 4, 3, 9);
    for (const [lx, ly, lw] of [[2, -14, 5], [9, -18, 4], [14, -12, 6], [4, -8, 7], [12, -7, 7]]) { ellipse(b, "#4f8a63", wx + 6 + lx + 2, wy + wh + ly, lw / 2 + 1, 3); ellipse(b, "#6fae7e", wx + 6 + lx + 1, wy + wh + ly - 1, lw / 2, 2); }
    // candle
    R(b, "#f3e9d2", wx + ww - 22, wy + wh - 8, 5, 13); R(b, "#cbbfa4", wx + ww - 19, wy + wh - 8, 2, 13); R(b, "#2d2530", wx + ww - 20, wy + wh - 11, 1, 3); R(b, "#9a7b55", wx + ww - 25, wy + wh + 4, 11, 2);

    // picture frame (constellation)
    R(b, "#c3a283", 142, 36, 38, 52); R(b, "#e6cba8", 142, 36, 38, 1); R(b, "#7b624f", 142, 87, 38, 1);
    R(b, "#0f1334", 146, 40, 30, 44);
    dither(b, 146, 40, 30, 44, "#0f1334", "#2a2f66");
    for (const [sx, sy] of [[152, 48], [160, 54], [168, 49], [164, 64], [155, 70], [170, 76]]) { R(b, "#f1dca0", sx, sy, 1, 1); }
    for (const [x1, y1, x2, y2] of [[152, 48, 160, 54], [160, 54, 168, 49], [160, 54, 164, 64], [164, 64, 155, 70], [164, 64, 170, 76]]) { const n = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1)); for (let i = 1; i < n; i += 2) R(b, "#f1dca055", x1 + (x2 - x1) * i / n, y1 + (y2 - y1) * i / n, 1, 1); }
    R(b, "#e6cba8", 156, 92, 10, 5); R(b, "#6b5547", 158, 94, 6, 1);

    // bookshelf (right)
    const sx = 262, sy = 30, sw = 52, sh = 118;
    R(b, "#241a2b", sx - 3, sy - 3, sw + 6, sh + 6); R(b, "#8a6a52", sx - 3, sy - 3, sw + 6, 3); R(b, "#5c4535", sx, sy, sw, sh);
    const palette = ["#a64b55", "#4d6a9b", "#d6ad66", "#5c8a72", "#8c5f9e", "#e7d3a8", "#c77a52"];
    const r3 = rnd(99);
    for (let level = 0; level < 4; level++) {
      const ly = sy + level * 29 + 3; R(b, "#2b2030", sx + 2, ly, sw - 4, 24); R(b, "#9a7b5f", sx, ly + 24, sw, 3); R(b, "#cdae8c", sx, ly + 24, sw, 1);
      let bx = sx + 4;
      if (level === 1) { // globe
        ellipse(b, "#3d5c8f", sx + 14, ly + 15, 8, 8); ellipse(b, "#5a8a64", sx + 11, ly + 13, 4, 3); R(b, "#d6ad66", sx + 13, ly + 22, 3, 2); R(b, "#d6ad66", sx + 9, ly + 23, 11, 1); bx = sx + 26;
      }
      if (level === 3) { // small framed photo + plant
        R(b, "#c3a283", sx + 6, ly + 8, 14, 15); R(b, "#d7dde5", sx + 8, ly + 10, 10, 11); R(b, "#d99b7f", sx + 11, ly + 13, 4, 4); R(b, "#5a6f92", sx + 9, ly + 18, 8, 3);
        R(b, "#b5654a", sx + 34, ly + 14, 10, 10); for (let i = 0; i < 5; i++) ellipse(b, i % 2 ? "#4f8a63" : "#6fae7e", sx + 36 + i * 2 - 3, ly + 10 - (i % 3) * 3, 2, 4); bx = sx + sw;
      }
      while (bx < sx + sw - 6) {
        const bw = 3 + Math.floor(r3() * 4), bh = 14 + Math.floor(r3() * 9), col = palette[Math.floor(r3() * palette.length)];
        R(b, col, bx, ly + 24 - bh, bw, bh); R(b, "#ffffff22", bx, ly + 24 - bh, 1, bh); R(b, "#0000002e", bx + bw - 1, ly + 24 - bh, 1, bh); R(b, "#f1dca099", bx, ly + 24 - bh + 3, bw, 1);
        bx += bw + (r3() > 0.85 ? 3 : 0);
        if (level !== 1 && level !== 3 && r3() > 0.93) bx += 6;
      }
    }

    // floor lamp
    R(b, "#2b2438", 236, 98, 3, 78); R(b, "#403656", 236, 98, 1, 78); ellipse(b, "#2b2438", 237, 175, 9, 3);
    R(b, "#f1d89c", 226, 78, 24, 22); R(b, "#fbeab9", 228, 78, 6, 22); R(b, "#cfae6b", 244, 78, 6, 22); R(b, "#9c7e46", 226, 77, 24, 2); R(b, "#9c7e46", 224, 99, 28, 2);
  })();

  /* ---------- Leha ---------- */
  const S = 1, LW = 96, LH = 134;
  const [lc, lx] = mk(LW, LH); const [sil, sx2] = mk(LW, LH);
  const C = { hij: "#d8d2e1", hijL: "#ece8f2", hijD: "#b7aecb", hijDD: "#9a90b3", skin: "#e2a78c", skinD: "#c98770", blush: "#e58f87", eye: "#2a2536", shirt: "#e1e7ef", shirtD: "#c2cddc", sleeve: "#b7c3d8", sleeveD: "#93a3c0", tie: "#d6ad66", tieD: "#a88142", skirt: "#3e506f", skirtD: "#2f3e59", skirtL: "#51658a", shoe: "#2a2736", shoeL: "#4a4659", btn: "#e5c27b", line: "#151b38" };
  const px = (c, col, x, y, w, h) => { const x0 = Math.round(x * S), y0 = Math.round(y * S), x1 = Math.round((x + w) * S), y1 = Math.round((y + h) * S); c.fillStyle = col; c.fillRect(x0, y0, Math.max(1, x1 - x0), Math.max(1, y1 - y0)); };
  const pe = (c, col, cx, cy, rx, ry) => { for (let y = -ry; y <= ry; y++) { const hw = Math.round(rx * Math.sqrt(1 - (y * y) / (ry * ry + 0.01))); px(c, col, cx - hw, cy + y, hw * 2 + 1, 1); } };
  const thickLine = (c, col, x1, y1, x2, y2, t) => { const n = Math.ceil(Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1)) * 1.2); for (let i = 0; i <= n; i++) px(c, col, x1 + (x2 - x1) * i / n - t / 2, y1 + (y2 - y1) * i / n - t / 2, t, t); };

  function drawLeha(t, st) {
    lx.clearRect(0, 0, LW, LH);
    const cx = 48, breathe = Math.round(Math.sin(t * 2.1) * 0.8 * 10) / 10, sway = Math.sin(t * 1.3);
    const head = st.tilt, by = breathe;
    // shoes + legs
    px(lx, C.skirtD, cx - 10, 112, 8, 12); px(lx, C.skirt, cx + 2, 112, 8, 12);
    px(lx, C.shoe, cx - 12, 124, 11, 5); px(lx, C.shoe, cx + 1, 124, 11, 5); px(lx, C.shoeL, cx - 11, 124, 6, 1); px(lx, C.shoeL, cx + 2, 124, 6, 1);
    // skirt (pleated)
    for (let y = 0; y < 18; y++) { const hw = 13 + Math.round(y * 0.28); px(lx, C.skirt, cx - hw, 94 + y + by * 0.5, hw * 2, 1); }
    for (let k = -3; k <= 3; k++) px(lx, k % 2 ? C.skirtD : C.skirtL, cx + k * 4, 96 + by * 0.5, 1, 16);
    px(lx, C.skirtD, cx - 16, 111, 32, 1);
    // blouse
    px(lx, C.shirt, cx - 14, 62 + by, 28, 34); px(lx, C.shirtD, cx - 14, 62 + by, 3, 34); px(lx, C.shirtD, cx + 11, 62 + by, 3, 34);
    px(lx, C.skirt, cx - 14, 92 + by * 0.5, 28, 5); px(lx, C.btn, cx - 6, 94 + by * 0.5, 2, 2); px(lx, C.btn, cx + 4, 94 + by * 0.5, 2, 2);
    // tie
    px(lx, C.tie, cx - 2, 64 + by, 4, 4); px(lx, C.tie, cx - 3, 68 + by, 6, 18); px(lx, C.tieD, cx + 1, 68 + by, 2, 18); px(lx, C.tie, cx - 1, 86 + by, 3, 3);
    px(lx, "#f4f6fa", cx - 6, 62 + by, 4, 4); px(lx, "#f4f6fa", cx + 2, 62 + by, 4, 4);
    // left arm (screen left) hangs
    px(lx, C.sleeve, cx - 20, 64 + by, 7, 24); px(lx, C.sleeveD, cx - 20, 64 + by, 2, 24); px(lx, C.skin, cx - 20, 88 + by, 7, 6); px(lx, C.skinD, cx - 20, 92 + by, 7, 2);
    // right arm: idle or waving
    if (st.wave > 0) {
      const w = Math.sin(t * 14) * 3;
      thickLine(lx, C.sleeve, cx + 14, 66 + by, cx + 24, 56 + by, 6);
      thickLine(lx, C.sleeve, cx + 24, 56 + by, cx + 26 + w, 38 + by, 6);
      px(lx, C.skin, cx + 23 + w, 30 + by, 7, 8); px(lx, C.skinD, cx + 23 + w, 36 + by, 7, 2);
    } else {
      px(lx, C.sleeve, cx + 13, 64 + by, 7, 24); px(lx, C.sleeveD, cx + 18, 64 + by, 2, 24); px(lx, C.skin, cx + 13, 88 + by, 7, 6); px(lx, C.skinD, cx + 13, 92 + by, 7, 2);
    }
    // hijab: drape over chest
    const hx = cx + head, hy = by;
    for (let y = 0; y < 36; y++) { const hw = Math.round(19 + y * 0.28 + sway * (y / 36) * 1.2); px(lx, C.hij, hx - hw, 40 + y + hy, hw * 2, 1); }
    for (let y = 0; y < 36; y++) { const hw = Math.round(19 + y * 0.28 + sway * (y / 36) * 1.2); px(lx, C.hijD, hx + hw - 6, 40 + y + hy, 6, 1); px(lx, C.hijL, hx - hw, 40 + y + hy, 3, 1); }
    px(lx, C.hijDD, hx - 6, 62 + hy, 1, 12); px(lx, C.hijDD, hx + 3, 64 + hy, 1, 10); px(lx, C.hijDD, hx - 13, 56 + hy, 1, 14); px(lx, C.hijDD, hx + 10, 58 + hy, 1, 12);
    px(lx, C.hijD, hx - 17 + Math.round(sway), 75 + hy, 34, 1);
    // hijab head
    pe(lx, C.hij, hx, 24 + hy, 21, 24); pe(lx, C.hijL, hx - 6, 14 + hy, 9, 9);
    pe(lx, C.hijD, hx + 14, 30 + hy, 6, 16);
    px(lx, C.hijDD, hx - 12, 8 + hy, 2, 1); px(lx, C.hijDD, hx + 8, 7 + hy, 2, 1);
    // face
    pe(lx, C.skin, hx, 29 + hy, 12, 14); px(lx, C.hij, hx - 13, 14 + hy, 26, 5);
    for (let i = -13; i <= 13; i++) { const dy = Math.round(Math.abs(i) * 0.18); px(lx, C.hij, hx + i, 18 + hy + dy, 1, 2); }
    px(lx, C.skinD, hx - 12, 33 + hy, 1, 8); px(lx, C.skinD, hx + 11, 33 + hy, 1, 8);
    pe(lx, C.blush, hx - 8, 35 + hy, 3, 2); pe(lx, C.blush, hx + 8, 35 + hy, 3, 2);
    // brows
    const bl = st.happy ? 1 : 0;
    px(lx, "#6f5a63", hx - 9, 24 + hy - bl, 6, 1); px(lx, "#6f5a63", hx + 3, 24 + hy - bl, 6, 1);
    // eyes
    const ex = Math.max(-1, Math.min(1, st.look));
    if (st.blink) { px(lx, C.eye, hx - 8, 30 + hy, 5, 1); px(lx, C.eye, hx + 3, 30 + hy, 5, 1); }
    else {
      px(lx, "#ffffff", hx - 8, 27 + hy, 5, 5); px(lx, "#ffffff", hx + 3, 27 + hy, 5, 5);
      px(lx, C.eye, hx - 7 + ex, 27 + hy, 3, 5); px(lx, C.eye, hx + 4 + ex, 27 + hy, 3, 5);
      px(lx, "#ffffff", hx - 7 + ex, 27 + hy, 1, 1); px(lx, "#ffffff", hx + 4 + ex, 27 + hy, 1, 1);
      px(lx, "#3a2f40", hx - 8, 26 + hy, 5, 1); px(lx, "#3a2f40", hx + 3, 26 + hy, 5, 1);
    }
    // nose, mouth
    px(lx, C.skinD, hx - 1, 34 + hy, 2, 2);
    if (st.happy) { px(lx, "#8a3d4a", hx - 3, 39 + hy, 6, 1); px(lx, "#8a3d4a", hx - 4, 38 + hy, 1, 1); px(lx, "#8a3d4a", hx + 4, 38 + hy, 1, 1); px(lx, "#f4ece6", hx - 2, 40 + hy, 4, 1); }
    else { px(lx, "#a2515a", hx - 2, 39 + hy, 4, 1); px(lx, "#a2515a", hx - 3, 38 + hy, 1, 1); px(lx, "#a2515a", hx + 3, 38 + hy, 1, 1); }
    // hijab pin
    px(lx, C.tie, hx + 9, 52 + hy, 2, 2); px(lx, "#fff3c7", hx + 9, 52 + hy, 1, 1);
  }

  /* ---------- state ---------- */
  const r4 = rnd(5);
  const stars = Array.from({ length: 46 }, () => ({ x: WIN.x + 2 + Math.floor(r4() * (WIN.w - 4)), y: WIN.y + 2 + Math.floor(r4() * 66), p: r4() * 6.28, s: 0.6 + r4() * 1.8, big: r4() > 0.8 }));
  const lights = Array.from({ length: 4000 }, () => 0);
  const windowsLit = Array.from({ length: 34 }, () => ({ x: WIN.x + 4 + Math.floor(r4() * (WIN.w - 10)), y: WIN.y + WIN.h - 4 - Math.floor(r4() * 24), p: r4() * 6.28, s: 0.2 + r4() * 0.8 }));
  const motes = Array.from({ length: 34 }, () => ({ x: r4() * W, y: r4() * H, v: 2 + r4() * 5, p: r4() * 6.28, a: 0.25 + r4() * 0.6 }));
  const bursts = [];
  let wave = 0, waveUntil = 0, lidPop = 0, shoot = null, nextShoot = 3.2, mouseX = 0.5, started = performance.now();
  let tilt = 0;

  const sparkle = (c, x, y, col, s = 1) => { R(c, col, x, y - s, 1, s * 2 + 1); R(c, col, x - s, y, s * 2 + 1, 1); };
  const star4 = (c, x, y, r, col, core) => {
    for (let i = 0; i <= r; i++) { const w = r - i; R(c, col, x - w, y + i - 0, w * 2 + 1, 1); R(c, col, x - w, y - i, w * 2 + 1, 1); }
    for (let i = -r; i <= r; i++) { const hh = Math.max(0, r - Math.abs(i)) ; R(c, col, x + i, y - Math.round(hh * 1.5), 1, Math.round(hh * 3) + 1); }
    R(c, core, x - 1, y - 1, 3, 3);
  };

  function burst(x, y, n, cols) { for (let i = 0; i < n; i++) { const a = Math.random() * 6.28, v = 14 + Math.random() * 34; bursts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 18, life: 0.7 + Math.random() * 0.7, t: 0, col: cols[i % cols.length] }); } }

  /* ---------- frame ---------- */
  const LEHA_X = 200, LEHA_FEET = 258;
  let last = 0, acc = 0, visible = true;
  function frame(now) {
    if (!reduce) requestAnimationFrame(frame);
    const dt = Math.min(0.1, (now - last) / 1000 || 0.016); last = now;
    const home = document.getElementById("home-screen");
    if (document.hidden || !home || !home.classList.contains("active")) return;
    acc += dt; if (acc < 1 / 30 && !reduce) return; const step = acc; acc = 0;
    const t = Math.max(0, (now - started) / 1000);
    render(t, step);
  }

  function render(t, dt) {
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(bg, 0, 0);
    const { x: wx, y: wy, w: ww, h: wh } = WIN;

    // sky stars
    ctx.save(); ctx.beginPath(); ctx.rect(wx, wy, ww, wh - 6); ctx.clip();
    for (const s of stars) { const a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.s + s.p)); ctx.globalAlpha = a; if (s.big && a > 0.7) sparkle(ctx, s.x, s.y, "#fff3c7", 1); else R(ctx, "#f6ecc8", s.x, s.y, 1, 1); }
    ctx.globalAlpha = 1;
    // moon glow
    const mg = 0.12 + 0.05 * Math.sin(t * 0.8);
    for (let i = 1; i <= 4; i++) { ctx.globalAlpha = mg / i; ellipse(ctx, "#f4e7bd", wx + 78, wy + 22, 8 + i * 4, 8 + i * 4); }
    ctx.globalAlpha = 1;
    // shooting star
    if (t > nextShoot && !shoot) shoot = { x: wx + ww - 10, y: wy + 6 + Math.random() * 18, t: 0 };
    if (shoot) { shoot.t += dt; const p = shoot.t / 0.9; for (let i = 0; i < 12; i++) { ctx.globalAlpha = (1 - i / 12) * (1 - p); R(ctx, "#fff6d6", shoot.x - p * 70 + i * 2.2, shoot.y + p * 34 - i * 1.1, 2, 1); } ctx.globalAlpha = 1; if (p >= 1) { shoot = null; nextShoot = t + 6 + Math.random() * 5; } }
    // city window lights
    for (const l of windowsLit) { const on = Math.sin(t * l.s + l.p) > -0.2; if (on) R(ctx, Math.sin(t * l.s * 2 + l.p) > 0.8 ? "#ffe6a3" : "#f3c76e", l.x, l.y, 1, 1); }
    ctx.restore();

    // curtains
    const sw = Math.sin(t * 0.9);
    for (let i = 0; i < 12; i++) {
      const fold = Math.sin(i * 1.3 + t * 0.9) * 0.5;
      const lenL = 100 + Math.round(fold * 2), col = i % 3 === 0 ? "#8a4059" : i % 3 === 1 ? "#6f3048" : "#7c3a52";
      R(ctx, col, wx - 8 + i, wy - 8, 1, lenL - Math.round(i * 0.3 + sw * (i / 12) * 2));
      R(ctx, col, wx + ww + 8 - i, wy - 8, 1, lenL - Math.round(i * 0.3 - sw * (i / 12) * 2));
    }
    R(ctx, "#d6ad66", wx - 10, wy - 12, ww + 20, 3); R(ctx, "#f1dca0", wx - 10, wy - 12, ww + 20, 1);
    for (const x of [wx - 10, wx + ww + 8]) { ellipse(ctx, "#d6ad66", x + 1, wy - 11, 3, 3); }
    R(ctx, "#d6ad66", wx - 4, wy + 52, 3, 3); R(ctx, "#d6ad66", wx + ww + 1, wy + 52, 3, 3);

    // candle flame + glow
    const fx = wx + ww - 20, fy = wy + wh - 14; const fl = Math.sin(t * 11) + Math.sin(t * 7.3);
    for (let i = 1; i <= 3; i++) { ctx.globalAlpha = 0.07 + 0.015 * fl; ellipse(ctx, "#ffd38a", fx, fy + 3, 4 + i * 4, 4 + i * 4); }
    ctx.globalAlpha = 1; R(ctx, "#f08f3c", fx - 1, fy - 1 - Math.round(fl * 0.4), 3, 4); R(ctx, "#ffe08a", fx, fy - Math.round(fl * 0.4), 1, 3);

    // moonlight patch on the floor, with window-bar shadows
    ctx.save(); ctx.globalAlpha = 0.085 + 0.02 * Math.sin(t * 0.7); ctx.fillStyle = "#cdd8ff";
    for (let y = FLOOR + 2; y < 244; y++) { const k = y - FLOOR, x0 = 24 + k * 0.85; ctx.fillRect(Math.round(x0), y, 40, 1); ctx.fillRect(Math.round(x0 + 46), y, 44, 1); }
    ctx.restore();

    // frame stars twinkle
    for (const [sx, sy] of [[152, 48], [168, 49], [170, 76]]) { if (Math.sin(t * 2 + sx) > 0.6) sparkle(ctx, sx, sy, "#fff3c7", 1); }

    // lamp glow
    const lf = 1 + Math.sin(t * 3) * 0.04 + (Math.sin(t * 17) > 0.96 ? -0.08 : 0);
    for (let i = 1; i <= 6; i++) { ctx.globalAlpha = 0.045 * lf; ellipse(ctx, "#ffd48a", 238, 92, 14 + i * 12, 12 + i * 11); }
    ctx.globalAlpha = 1;

    // fairy lights
    ctx.fillStyle = "#1a1c33";
    const lightCols = ["#ffd88a", "#ff9fb0", "#9fd0ff", "#b9f0b0"];
    let prevY = null;
    for (let x = 0; x < W; x++) { const y = 11 + Math.round(5 * Math.sin(x / W * Math.PI * 4) + 4 * Math.pow(Math.abs(Math.sin(x / 40 * Math.PI)), 1)); R(ctx, "#2a2a45", x, y, 1, 1); prevY = y; }
    for (let i = 0; i < 16; i++) {
      const x = 10 + i * 20, y = 11 + Math.round(5 * Math.sin(x / W * Math.PI * 4) + 4 * Math.abs(Math.sin(x / 40 * Math.PI))) + 1;
      const on = 0.55 + 0.45 * Math.sin(t * 2 + i * 1.7), col = lightCols[i % 4];
      ctx.globalAlpha = 0.14 * on; ellipse(ctx, col, x, y + 4, 6, 6); ctx.globalAlpha = 0.18 * on; ellipse(ctx, col, x, y + 4, 3, 3);
      ctx.globalAlpha = 0.5 + 0.5 * on; R(ctx, "#2a2a45", x, y, 1, 2); R(ctx, col, x - 1, y + 2, 3, 4); R(ctx, "#ffffff90", x - 1, y + 2, 1, 1);
    }
    ctx.globalAlpha = 1;

    // shadows
    ctx.globalAlpha = 0.35; ellipse(ctx, "#0b0814", LEHA_X + 1, LEHA_FEET - 1, 26, 5); ctx.globalAlpha = 0.3; ellipse(ctx, "#0b0814", 106, 224, 52, 6); ctx.globalAlpha = 0.35;ctx.globalAlpha = 1;

    // gifts (left of Leha)
    ctx.save(); ctx.translate(0, -9); drawGifts(t); ctx.restore();

    // Leha state
    const blinkPhase = t % 4.1; const blink = blinkPhase > 3.95 || (t % 9.3 > 9.15);
    if (t > waveUntil && wave) wave = 0;
    if (!wave && Math.floor(t / 7) !== Math.floor((t - dt) / 7) && Math.floor(t / 7) % 1 === 0 && t > 1.6) { wave = 1; waveUntil = t + 2.4; }
    const gazePhase = Math.sin(t * 0.5);
    const look = wave ? 0 : (mouseX - 0.5) * 3 + (gazePhase > 0.7 ? -1.4 : 0);
    const happy = wave || (t % 11 > 8.5) || lidPop > 0.01;
    tilt += (((mouseX - 0.5) * 3 + Math.sin(t * 0.7) * 0.6) - tilt) * 0.08;
    drawLeha(t, { blink, wave, look, happy, tilt: Math.round(tilt) });
    // outline
    sx2.clearRect(0, 0, LW, LH); sx2.drawImage(lc, 0, 0); sx2.globalCompositeOperation = "source-in"; sx2.fillStyle = C.line; sx2.fillRect(0, 0, LW, LH); sx2.globalCompositeOperation = "source-over";
    const lxp = Math.round(LEHA_X - 48), lyp = Math.round(LEHA_FEET - 129);
    const dxy = [[-1, 0], [1, 0], [0, -1], [0, 1], [2, 2]];
    for (const [dx, dy] of dxy) ctx.drawImage(sil, lxp + dx, lyp + dy);
    ctx.drawImage(lc, lxp, lyp);

    // Poniman the star guide
    const pxs = 148 + Math.round(Math.sin(t * 1.1) * 5), pys = 120 + Math.round(Math.sin(t * 1.7) * 4);
    ctx.globalAlpha = 0.18; ellipse(ctx, "#ffe08a", pxs, pys, 14, 14); ctx.globalAlpha = 0.16; ellipse(ctx, "#ffe08a", pxs, pys, 9, 9); ctx.globalAlpha = 1;
    star4(ctx, pxs, pys, 7, "#151b38", "#151b38"); star4(ctx, pxs, pys, 5, "#f1cf7a", "#fff0b8");
    R(ctx, "#151b38", pxs - 2, pys - 1, 1, 2); R(ctx, "#151b38", pxs + 2, pys - 1, 1, 2);
    if (Math.sin(t * 2.3) > 0.4) sparkle(ctx, pxs + 11, pys - 9, "#fff3c7", 1);
    if (Math.sin(t * 2.9 + 1) > 0.5) sparkle(ctx, pxs - 12, pys + 8, "#f1cf7a", 1);

    // floating dust/fireflies
    for (const m of motes) {
      m.y -= m.v * dt; m.x += Math.sin(t * 0.8 + m.p) * 4 * dt; if (m.y < -2) { m.y = H + 2; m.x = Math.random() * W; }
      const a = m.a * (0.5 + 0.5 * Math.sin(t * 2 + m.p)); ctx.globalAlpha = a; R(ctx, m.y > 100 && m.x > 190 && m.x < 260 ? "#ffe3a0" : "#dfe6ff", m.x, m.y, 1, 1);
    }
    ctx.globalAlpha = 1;

    // bursts
    for (let i = bursts.length - 1; i >= 0; i--) { const p = bursts[i]; p.t += dt; p.vy += 60 * dt; p.x += p.vx * dt; p.y += p.vy * dt; if (p.t > p.life) { bursts.splice(i, 1); continue; } ctx.globalAlpha = 1 - p.t / p.life; sparkle(ctx, Math.round(p.x), Math.round(p.y), p.col, p.t < 0.3 ? 1 : 0); }
    ctx.globalAlpha = 1;

    // fade in
    const fi = Math.max(0, 1 - t / 1.1); if (fi > 0) { ctx.globalAlpha = fi; R(ctx, "#0b0e22", 0, 0, W, H); ctx.globalAlpha = 1; }
  }

  function drawGifts(t) {
    const pop = lidPop; lidPop = Math.max(0, lidPop - 0.05);
    const auto = (t % 5.2) > 4.9 ? Math.sin(((t % 5.2) - 4.9) / 0.3 * Math.PI) : 0;
    const lift = Math.round(Math.max(pop, auto) * 7);
    // glow
    ctx.globalAlpha = 0.1 + 0.05 * Math.sin(t * 2); ellipse(ctx, "#ffd88a", 112, 214, 44, 22); ctx.globalAlpha = 1;
    // small cream box
    R(ctx, "#ece1c8", 138, 214, 18, 18); R(ctx, "#cdbf9f", 138, 214, 3, 18); R(ctx, "#f7efdc", 138, 214, 18, 3); R(ctx, "#8aa9d6", 146, 214, 3, 18); R(ctx, "#8aa9d6", 138, 222, 18, 3);
    R(ctx, "#8aa9d6", 143, 211, 4, 3); R(ctx, "#8aa9d6", 148, 211, 4, 3);
    // mid blue box
    R(ctx, "#3f5f9a", 60, 208, 28, 24); R(ctx, "#31497a", 60, 208, 5, 24); R(ctx, "#5679b8", 60, 208, 28, 3);
    R(ctx, "#f0a8b8", 72, 208, 4, 24); R(ctx, "#f0a8b8", 60, 217, 28, 4);
    R(ctx, "#f0a8b8", 68 , 203 - lift / 2, 5, 5); R(ctx, "#f0a8b8", 75, 203 - lift / 2, 5, 5); R(ctx, "#d4859a", 73, 205 - lift / 2, 2, 3);
    // big red box
    R(ctx, "#a44a56", 92, 196, 40, 36); R(ctx, "#7c3541", 92, 196, 7, 36); R(ctx, "#c4606b", 92, 196, 40, 4);
    R(ctx, "#2e1a2a", 92, 231, 40, 1);
    R(ctx, "#e7bd62", 108, 196, 6, 36); R(ctx, "#e7bd62", 92, 211, 40, 6); R(ctx, "#f6dc92", 108, 196, 2, 36); R(ctx, "#b78d3d", 112, 196, 2, 36);
    // lid
    R(ctx, "#2e1a2a", 89, 190 - lift, 46, 1);
    R(ctx, "#b5525e", 89, 189 - lift, 46, 7); R(ctx, "#d06b76", 89, 189 - lift, 46, 2); R(ctx, "#7c3541", 89, 195 - lift, 46, 1); R(ctx, "#e7bd62", 108, 189 - lift, 6, 7);
    // bow
    ellipse(ctx, "#e7bd62", 105, 184 - lift, 6, 5); ellipse(ctx, "#e7bd62", 117, 184 - lift, 6, 5); ellipse(ctx, "#a44a56", 105, 184 - lift, 3, 2); ellipse(ctx, "#a44a56", 117, 184 - lift, 3, 2);
    R(ctx, "#b78d3d", 109, 184 - lift, 4, 5); R(ctx, "#f6dc92", 110, 185 - lift, 2, 2);
    if (lift > 3 && Math.random() > 0.5) burst(111, 182 - lift, 3, ["#fff3c7", "#f1cf7a", "#ff9fb0"]);
    // twinkle
    const tw = Math.floor(t * 3) % 6; const spots = [[96, 200], [128, 224], [64, 214], [150, 218], [112, 205], [84, 222]];
    const [qx, qy] = spots[tw]; if (Math.sin(t * 6 + tw) > 0) sparkle(ctx, qx, qy - lift * 0, "#fff6d6", 1);
  }

  /* ---------- interaction ---------- */
  const pointToScene = (e) => { const r = host.getBoundingClientRect(); const sc = Math.max(r.width / W, r.height / H); const ox = (r.width - W * sc) / 2, oy = (r.height - H * sc) / 2; return { x: (e.clientX - r.left - ox) / sc, y: (e.clientY - r.top - oy) / sc, r }; };
  host.parentElement.addEventListener("pointermove", (e) => { const p = pointToScene(e); mouseX = Math.max(0, Math.min(1, (e.clientX - p.r.left) / p.r.width)); });
  host.parentElement.addEventListener("pointerleave", () => { mouseX = 0.5; });
  host.parentElement.addEventListener("click", (e) => {
    const p = pointToScene(e);
    if (p.x > 150 && p.x < 250 && p.y > 100 && p.y < 262) { wave = 1; waveUntil = (performance.now() - started) / 1000 + 2.2; burst(LEHA_X + 24, 140, 10, ["#fff3c7", "#f1cf7a"]); }
    else if (p.x > 56 && p.x < 160 && p.y > 170 && p.y < 240) { lidPop = 1; burst(111, 188, 18, ["#fff3c7", "#f1cf7a", "#ff9fb0", "#9fd0ff"]); }
    else burst(p.x, p.y, 8, ["#fff3c7", "#f1cf7a"]);
  });

  if (reduce) render(3, 0.033); else requestAnimationFrame(frame);
  window.__openingScene = { render };
})();
