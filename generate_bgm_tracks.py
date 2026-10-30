"""Generate the two new BGM loops: opening (music box) and credits (warm, slow)."""
import math, struct, wave
from pathlib import Path
import random
OUT = Path(__file__).resolve().parents[1] / "assets" / "audio"
RATE = 22050
N = lambda n: 440 * 2 ** ((n - 69) / 12)

def render(name, bpm, bars, build):
    beat = 60 / bpm; total = int(RATE * bars * 4 * beat); buf = [0.0] * total
    def tone(start, dur, f, amp, kind):
        b = int(start * RATE); L = min(int(dur * RATE), total - b)
        if L <= 0: return
        w = 2 * math.pi * f / RATE
        for i in range(L):
            t = i / RATE
            if kind == "box":    # music-box: bright bell with fast decay
                env = math.exp(-t * 4.2) * min(1, t / 0.003)
                v = math.sin(w*i) + .45*math.sin(w*i*2.01) + .2*math.sin(w*i*4.2)*math.exp(-t*9)
            elif kind == "pad":
                env = min(1, t / .5) * min(1, max(0, (dur - t) / .6)); v = math.sin(w*i) + .3*math.sin(w*i*2) + .2*math.sin(w*i*.5)
            elif kind == "bass":
                env = math.exp(-t * 1.6) * min(1, t / .01); v = math.sin(w*i) + .15*math.sin(w*i*2)
            else:  # soft piano-ish
                env = math.exp(-t * 2.4) * min(1, t / .006); v = math.sin(w*i) + .35*math.sin(w*i*2) + .12*math.sin(w*i*3)
            buf[b+i] += amp * env * v
    build(tone, beat)
    # soft echo
    d = int(0.28 * RATE)
    for i in range(total - 1, d - 1, -1): buf[i] += buf[i - d] * 0.28
    for i in range(d): buf[i] += buf[total - d + i] * 0.28 * (i / d) * 0  # keep loop seam clean
    fade = int(.05 * RATE); peak = max(abs(x) for x in buf) or 1; sc = .8 / peak
    with wave.open(str(OUT / name), "wb") as f:
        f.setnchannels(1); f.setsampwidth(2); f.setframerate(RATE)
        f.writeframes(b"".join(struct.pack("<h", int(max(-1, min(1, v*sc*min(1, i/fade, (total-1-i)/fade)))*32767)) for i, v in enumerate(buf)))
    print(name, round(total / RATE, 1), "s")

# 1) OPENING: dreamy music box in C major, 72 bpm, "waiting for a gift" feeling
def opening(tone, beat):
    prog = [[60,64,67],[57,60,64],[53,57,60],[55,59,62]]        # C Am F G
    arp = [0,1,2,1,2,1,2,1]
    mel = [[79,0,76,0,72,0,76,79],[76,0,72,0,69,0,72,76],[77,0,74,0,72,0,69,72],[74,0,71,0,74,0,79,0]]
    alt = [[84,0,79,0,76,0,79,84],[81,0,76,0,72,0,76,0],[84,0,81,0,77,0,81,0],[83,0,79,0,74,0,71,0]]
    for bar in range(16):
        ch = prog[bar % 4]; s = bar * 4 * beat
        for n in ch: tone(s, 4 * beat, N(n - 12), .035, "pad")
        tone(s, 2 * beat, N(ch[0] - 24), .09, "bass")
        for k in range(8): tone(s + k * beat / 2, beat * 1.2, N(ch[arp[k]] + 12), .06, "box")
        if bar >= 4:
            m = (alt if bar >= 12 else mel)[bar % 4]
            for k, n in enumerate(m):
                if n: tone(s + k * beat / 2, beat * 1.4, N(n), .11, "box")
        if bar == 15: tone(s + 3 * beat, beat, N(91), .1, "box")

# 2) CREDITS: slower, warmer, piano + strings, F major -> emotional lift, 66 bpm
def credits(tone, beat):
    prog = [[53,57,60],[50,53,58],[55,58,62],[48,52,55],[46,50,53],[53,57,60],[55,58,62],[48,52,55]]  # F Dm/Bb Gm C Bb F Gm C
    mel = [[72,0,0,69,0,72,0,77],[74,0,70,0,69,0,0,70],[70,0,74,0,77,0,74,0],[72,0,0,67,0,72,0,0],
           [70,0,0,74,0,77,0,74],[72,0,0,77,0,81,0,77],[79,0,77,0,74,0,70,0],[72,0,0,0,0,0,0,0]]
    for bar in range(16):
        i = bar % 8; ch = prog[i]; s = bar * 4 * beat
        for n in ch: tone(s, 4 * beat, N(n), .05, "pad")
        tone(s, 3 * beat, N(ch[0] - 24), .1, "bass")
        for k in range(4): tone(s + k * beat, 1.6 * beat, N(ch[k % 3] + 12 if k else ch[0] + 12), .055, "piano")
        if bar >= 2:
            for k, n in enumerate(mel[i]):
                if n: tone(s + k * beat / 2, beat * 2.2, N(n + (12 if bar >= 8 else 0)), .1 if bar < 12 else .12, "piano")
render("bgm-opening.wav", 72, 16, opening)
render("bgm-credits.wav", 66, 16, credits)
