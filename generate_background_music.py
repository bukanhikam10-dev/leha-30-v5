"""Generate the prototype's original gentle pixel-game background loop."""
import math
import struct
import wave
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "assets" / "audio" / "bgm-main.wav"
RATE = 22050
BPM = 84
BEAT = 60 / BPM
BARS = 16
DURATION = BARS * 4 * BEAT
TOTAL = int(RATE * DURATION)
buf = [0.0] * TOTAL

# Frequencies for D major / B minor / G / A; each chord lasts one bar.
chords = [
    [293.66, 369.99, 440.00],
    [246.94, 293.66, 369.99],
    [196.00, 246.94, 293.66],
    [220.00, 277.18, 329.63],
]
roots = [146.83, 123.47, 98.00, 110.00]
melody = [
    [587.33, 440.00, 493.88, 369.99, 440.00, 369.99, 329.63, 293.66],
    [493.88, 369.99, 440.00, 369.99, 329.63, 293.66, 329.63, 369.99],
    [440.00, 369.99, 329.63, 293.66, 329.63, 369.99, 440.00, 493.88],
    [493.88, 440.00, 369.99, 329.63, 369.99, 440.00, 493.88, 440.00],
]

def add_tone(start, duration, frequency, amplitude, kind="pluck"):
    begin = int(start * RATE)
    length = min(int(duration * RATE), TOTAL - begin)
    if length <= 0:
        return
    phase = 2 * math.pi * frequency / RATE
    for i in range(length):
        t = i / RATE
        if kind == "pad":
            env = min(1.0, t / 0.12) * min(1.0, (duration - t) / 0.2)
            env = max(0.0, env) * math.exp(-t * 0.45)
            value = math.sin(phase * i) + 0.24 * math.sin(phase * i * 2)
        elif kind == "bass":
            env = math.exp(-t * 2.0) * min(1.0, t / 0.015)
            value = math.sin(phase * i) + 0.12 * math.sin(phase * i * 2)
        else:
            env = math.exp(-t * 3.2) * min(1.0, t / 0.008)
            value = math.sin(phase * i) + 0.28 * math.sin(phase * i * 2) + 0.1 * math.sin(phase * i * 3)
        buf[begin + i] += amplitude * env * value

for bar in range(BARS):
    chord_index = bar % 4
    start = bar * 4 * BEAT
    for note in chords[chord_index]:
        add_tone(start, 3.9 * BEAT, note, 0.045, "pad")
    add_tone(start, 1.7 * BEAT, roots[chord_index], 0.12, "bass")
    # Soft four-on-the-floor plucks keep the loop moving without sounding busy.
    for beat in (0, 2):
        add_tone(start + beat * BEAT, 0.7 * BEAT, chords[chord_index][1], 0.075)
    phrase = melody[chord_index]
    for step, note in enumerate(phrase):
        add_tone(start + step * BEAT / 2, 0.42 * BEAT, note, 0.115)

# Gentle fade across the loop seam, then normalize with plenty of headroom.
fade = int(0.09 * RATE)
peak = max(abs(x) for x in buf) or 1
scale = 0.78 / peak
with wave.open(str(OUT), "wb") as wav:
    wav.setnchannels(1)
    wav.setsampwidth(2)
    wav.setframerate(RATE)
    samples = bytearray()
    for i, value in enumerate(buf):
        edge = min(1.0, i / fade, (TOTAL - 1 - i) / fade)
        sample = int(max(-1.0, min(1.0, value * scale * edge)) * 32767)
        samples.extend(struct.pack("<h", sample))
    wav.writeframes(samples)
print(OUT)
