/* Three-track BGM director with crossfade.
   opening : home + loading screens
   main    : character select -> map -> every chapter -> ending letter
   credits : only while the end credits are scrolling */
(() => {
  const FILES = { opening: "assets/audio/bgm-opening.wav", main: "assets/audio/bgm-main.wav", credits: "assets/audio/bgm-credits.wav" };
  const VOL = { opening: 0.34, main: 0.32, credits: 0.36 };
  const players = {};
  let current = null, wanted = "opening", enabled = true, userMuted = false, unlocked = false;
  const btn = () => document.getElementById("sound-toggle");
  const paint = () => { const b = btn(); if (!b) return; const on = enabled && unlocked; b.setAttribute("aria-pressed", String(on)); b.title = on ? "Matikan musik latar" : "Nyalakan musik latar"; };

  function audio(name) {
    if (!players[name]) { const a = new Audio(FILES[name]); a.loop = true; a.preload = "auto"; a.volume = 0; players[name] = a; }
    return players[name];
  }
  function fade(a, to, ms, done) {
    clearInterval(a._fade); const from = a.volume, t0 = performance.now();
    a._fade = setInterval(() => {
      const p = Math.min(1, (performance.now() - t0) / ms); a.volume = Math.max(0, Math.min(1, from + (to - from) * p));
      if (p >= 1) { clearInterval(a._fade); done && done(); }
    }, 40);
  }
  function apply() {
    if (!enabled) { Object.values(players).forEach((a) => { if (!a.paused) fade(a, 0, 400, () => a.pause()); }); current = null; paint(); return; }
    if (current === wanted) return;
    const prev = current && players[current], next = audio(wanted);
    if (prev) fade(prev, 0, 900, () => prev.pause());
    next.currentTime = wanted === "credits" ? 0 : next.currentTime;
    const p = next.play();
    const ok = () => { current = wanted; unlocked = true; fade(next, VOL[wanted], 1100); paint(); };
    if (p && p.then) p.then(ok).catch(() => { current = null; paint(); }); else ok();
  }

  window.Music = {
    set(name) { if (!FILES[name]) return; wanted = name; if (unlocked || !userMuted) apply(); },
    forScreen(id) {
      if (id === "home-screen" || id === "loading-screen") this.set("opening");
      else if (id !== "game-screen") this.set("main");
    },
    state() { return Object.fromEntries(Object.entries(players).map(([k, a]) => [k, { playing: !a.paused, vol: +a.volume.toFixed(2) }])); },
    async toggle() {
      if (enabled && unlocked) { enabled = false; userMuted = true; apply(); return false; }
      enabled = true; userMuted = false; current = null; apply(); return true;
    },
  };

  // Browsers only allow audio after a gesture: start the opening song on the first one.
  const unlock = () => { if (!userMuted && !unlocked) { enabled = true; apply(); } };
  ["pointerdown", "keydown", "touchstart"].forEach((ev) => document.addEventListener(ev, (e) => { if (!unlocked && !(e.target.closest && e.target.closest("#sound-toggle"))) unlock(); }, { passive: true }));
  window.addEventListener("load", () => { if (!userMuted) apply(); paint(); Object.keys(FILES).forEach(audio); });
  document.addEventListener("visibilitychange", () => { Object.values(players).forEach((a) => { if (document.hidden) a.pause(); }); if (!document.hidden && enabled && unlocked) { current = null; apply(); } });
})();
