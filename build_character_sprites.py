#!/usr/bin/env python3
"""Build first-pass, hand-authored pixel-style SVG game sprites."""

from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "assets" / "characters"
CELL_W, CELL_H, SCALE = 64, 80, 4

PALETTES = {
    "leha": {"skin": "#d99b7f", "hair": "#352a38", "cloth": "#d7dde5", "cloth2": "#aebdd0", "bottom": "#3e506f", "accent": "#d2ae68", "hijab": "#d8d2e1"},
    "hikam": {"skin": "#d99b7f", "hair": "#302835", "cloth": "#a98570", "cloth2": "#c5a28a", "bottom": "#41475b", "accent": "#d2ae68", "hijab": None},
    "poniman": {"skin": "#c9866e", "hair": "#342936", "cloth": "#c5d4dd", "cloth2": "#9eb3c2", "bottom": "#475a77", "accent": "#d3b46c", "hijab": None},
    "aini": {"skin": "#dfa184", "hair": "#342a35", "cloth": "#d7dde5", "cloth2": "#adbdce", "bottom": "#42536f", "accent": "#d4b16a", "hijab": "#b9c7d4"},
    "ayu": {"skin": "#bd806d", "hair": "#262630", "cloth": "#d7dde5", "cloth2": "#a9bdc9", "bottom": "#485874", "accent": "#d3a768", "hijab": None},
    "pista": {"skin": "#d79b7d", "hair": "#312c3b", "cloth": "#d7dde5", "cloth2": "#a9b8ca", "bottom": "#3f526e", "accent": "#d4b36d", "hijab": "#9e9ab6"},
    "nurul": {"skin": "#ca8a73", "hair": "#352b3a", "cloth": "#d7dde5", "cloth2": "#b0c1d0", "bottom": "#40536f", "accent": "#d5b26d", "hijab": "#e0d8ca"},
    "anita": {"skin": "#d6a080", "hair": "#3a2630", "cloth": "#e4e2df", "cloth2": "#bc9eb0", "bottom": "#394967", "accent": "#d27668", "hijab": None},
    "wawaw": {"skin": "#c88870", "hair": "#302835", "cloth": "#b9c5d0", "cloth2": "#8698aa", "bottom": "#39445c", "accent": "#d6b36b", "hijab": None},
    "ibu-menteri": {"skin": "#d29a7e", "hair": "#302835", "cloth": "#242b3e", "cloth2": "#ded8d1", "bottom": "#30364b", "accent": "#d6b36b", "hijab": "#28283a"},
    "jupe": {"skin": "#d49a7f", "hair": "#2e2530", "cloth": "#e3c3c6", "cloth2": "#c99aa3", "bottom": "#3b4560", "accent": "#d6b36b", "hijab": None},
    "jawir": {"skin": "#d7977e", "hair": "#2a2630", "cloth": "#d7dde5", "cloth2": "#aebdcd", "bottom": "#40516e", "accent": "#d4af69", "hijab": None},
    "nadia": {"skin": "#d99a7e", "hair": "#312939", "cloth": "#9faebc", "cloth2": "#71839b", "bottom": "#35425e", "accent": "#d5b06a", "hijab": "#aab5c4"},
    "mentari": {"skin": "#c88870", "hair": "#30283a", "cloth": "#c1ced2", "cloth2": "#8fa7b2", "bottom": "#42506a", "accent": "#d6b36b", "hijab": "#d6c6b7"},
}

NAMES = [
    ("leha", "Leha", "school"), ("hikam", "Hikam", "drummer"),
    ("poniman", "Poniman", "narrator"), ("aini", "Aini", "provisional"),
    ("ayu", "Ayu", "provisional"), ("pista", "Pista", "provisional"),
    ("nurul", "Nurul", "provisional"), ("anita", "Anita", "provisional"),
    ("wawaw", "Wawaw", "provisional"), ("ibu-menteri", "Ibu Menteri", "provisional"),
    ("jawir", "Jawir", "woman"), ("jupe", "Mbak Jupe", "office"),
    ("nadia", "Nadia", "hijab"), ("mentari", "Mentari", "hijab"),
]


def rect(x, y, w, h, color, extra=""):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{color}" {extra}/>'


def sprite(key, pose):
    p = PALETTES[key]
    if key == "poniman":
        bob = 0 if pose in ("idle", "drum") else 2
        eyes = '<rect x="27" y="31" width="3" height="4" fill="#34304a"/><rect x="38" y="31" width="3" height="4" fill="#34304a"/>'
        smile = '<path d="M29 39 Q34 44 40 39" fill="none" stroke="#9b5d50" stroke-width="2"/>' 
        return f'<g shape-rendering="crispEdges"><polygon points="32,{5+bob} 40,22 59,24 45,37 49,57 32,47 15,57 19,37 5,24 24,22" fill="#f3cf74" stroke="#4a3c4c" stroke-width="3" stroke-linejoin="miter"/><polygon points="32,{12+bob} 38,25 52,26 42,36 45,49 32,42 20,49 22,36 12,26 26,25" fill="#ffe6a0"/>{eyes}{smile}<path d="M10 17 L15 21 M51 15 L55 10 M8 43 L13 43 M52 45 L57 47" stroke="#f7d787" stroke-width="3"/></g>'
    out = ['<g shape-rendering="crispEdges">']
    # Ground/contact pixel is inside the cell, not part of the transparent sheet.
    out.append(rect(15, 74, 34, 2, "#1d2035", 'opacity=".14"'))

    # Legs and shoes: pose changes the stride, keeping total height and foot line stable.
    if pose == "walk":
        out += [rect(23, 57, 8, 12, p["bottom"]), rect(34, 57, 8, 11, p["bottom"]), rect(18, 67, 13, 4, p["bottom"]), rect(34, 66, 13, 4, p["bottom"])]
    else:
        out += [rect(24, 57, 8, 12, p["bottom"]), rect(34, 57, 8, 12, p["bottom"]), rect(21, 68, 12, 4, "#2d2d3a"), rect(34, 68, 12, 4, "#2d2d3a")]

    # Body silhouette with a school skirt for the female student roster and a tunic for Hikam.
    if key == "hikam":
        out += [rect(21, 39, 23, 19, p["cloth"]), rect(18, 42, 7, 14, p["cloth2"]), rect(41, 42, 7, 14, p["cloth2"]), rect(28, 40, 7, 9, "#55465a"), rect(31, 40, 3, 9, p["accent"])]
    elif key in ("nadia", "mentari"):
        out += [rect(20, 39, 24, 21, p["cloth"]), rect(17, 42, 7, 16, p["cloth2"]), rect(42, 42, 7, 16, p["cloth2"]), rect(18, 57, 28, 9, p["bottom"])]
    else:
        out += [rect(21, 39, 23, 17, p["cloth"]), rect(17, 42, 7, 14, p["cloth2"]), rect(42, 42, 7, 14, p["cloth2"]), rect(17, 54, 31, 13, p["bottom"])]

    # Arms and gesture. The drummer pose intentionally includes sticks, not a guitar.
    if pose == "talk":
        out += [rect(15, 42, 7, 11, p["cloth2"]), rect(10, 37, 7, 6, p["skin"]), rect(43, 43, 7, 13, p["cloth2"]), rect(45, 54, 5, 4, p["skin"])]
    elif pose == "cheer":
        out += [rect(16, 38, 6, 12, p["cloth2"]), rect(12, 31, 6, 8, p["skin"]), rect(44, 38, 6, 12, p["cloth2"]), rect(46, 30, 6, 9, p["skin"])]
    elif pose == "drum":
        out += [rect(16, 42, 7, 12, p["cloth2"]), rect(43, 42, 7, 12, p["cloth2"]), rect(13, 51, 6, 4, p["skin"]), rect(48, 51, 6, 4, p["skin"])]
    elif pose == "walk":
        out += [rect(16, 43, 7, 12, p["cloth2"]), rect(42, 41, 7, 12, p["cloth2"]), rect(13, 53, 5, 4, p["skin"]), rect(47, 50, 5, 4, p["skin"])]
    else:
        out += [rect(16, 42, 7, 14, p["cloth2"]), rect(42, 42, 7, 14, p["cloth2"]), rect(14, 54, 5, 4, p["skin"]), rect(46, 54, 5, 4, p["skin"])]
    if pose == "drum" and key == "hikam":
        out += ['<path d="M14 49 L27 36 M37 36 L51 49" stroke="#e8ca8a" stroke-width="2" stroke-linecap="square"/>', rect(24, 62, 16, 5, "#88839a")]

    # Head, face and hair/hijab.
    if p["hijab"]:
        out += [rect(19, 11, 27, 29, p["hijab"]), rect(22, 16, 21, 18, p["skin"]), rect(19, 28, 7, 13, p["hijab"]), rect(39, 27, 7, 14, p["hijab"]), rect(20, 36, 26, 6, p["hijab"])]
        # Small scarf fold pixels.
        out += [rect(22, 31, 3, 8, p["cloth2"]), rect(40, 31, 3, 8, p["cloth2"])]
    else:
        out += [rect(21, 12, 23, 22, p["hair"]), rect(23, 17, 19, 17, p["skin"])]
        out += [rect(19, 15, 6, 14, p["hair"]), rect(42, 14, 5, 14, p["hair"]), rect(23, 10, 18, 6, p["hair"])]
        if key == "hikam":
            out += [rect(19, 11, 7, 5, p["hair"]), rect(27, 8, 6, 5, p["hair"]), rect(39, 10, 6, 5, p["hair"])]
        if key in ("poniman", "ayu", "jawir", "jupe"):
            out += [rect(20, 26, 5, 11, p["hair"]), rect(41, 25, 5, 11, p["hair"])]
        if key == "anita":
            # Longer side locks and a small rose hair clip distinguish this provisional classmate.
            out += [rect(19, 25, 6, 18, p["hair"]), rect(41, 24, 6, 19, p["hair"]), rect(39, 14, 4, 3, p["accent"])]

    # Face pixels: eyes, nose and a restrained smile.
    out += [rect(27, 22, 2, 2, "#302b39"), rect(36, 22, 2, 2, "#302b39"), rect(31, 26, 2, 2, "#bd806d"), rect(30, 29, 6, 1, "#8f5658")]
    # Outfit marker pixels help differentiate provisional roster designs without text.
    out += [rect(31, 43, 3, 9, p["accent"]), rect(28, 43, 3, 4, "#f1e7d5")]
    if key in ("leha", "nadia", "mentari", "aini", "pista", "nurul"):
        out += [rect(28, 58, 3, 3, p["accent"]), rect(35, 58, 3, 3, p["accent"])]
    out.append("</g>")
    return "".join(out)


def make_svg(width, height, body, title):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width * SCALE}" height="{height * SCALE}" viewBox="0 0 {width} {height}" role="img" aria-label="{title}" shape-rendering="crispEdges">{body}</svg>'''


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    pose_names = ["idle", "walk", "talk", "drum" ]
    pose_order = {"hikam": pose_names, **{key: ["idle", "walk", "talk", "cheer"] for key, _, _ in NAMES if key != "hikam"}}
    full_rows = []
    for row, (key, name, _) in enumerate(NAMES):
        frames = pose_order[key]
        cells = []
        for col, pose in enumerate(frames):
            cells.append(f'<g transform="translate({col * CELL_W} 0)">{sprite(key, pose)}</g>')
            # Standalone idle portraits are used in the game UI.
            if pose == "idle":
                idle_svg = make_svg(CELL_W, CELL_H, sprite(key, pose), f"Sprite sementara {name}, pose diam")
                (OUT / f"{key}-idle.svg").write_text(idle_svg, encoding="utf-8")
        strip = make_svg(CELL_W * 4, CELL_H, "".join(cells), f"Sprite strip {name}, empat pose")
        (OUT / f"{key}.svg").write_text(strip, encoding="utf-8")
        full_rows.append(f'<g transform="translate(0 {row * CELL_H})">{"".join(cells)}</g>')
    sheet = make_svg(CELL_W * 4, CELL_H * len(NAMES), "".join(full_rows), "Sprite sheet sementara empat belas karakter, empat pose per karakter")
    (OUT / "roster-spritesheet.svg").write_text(sheet, encoding="utf-8")
    print(f"Created {len(NAMES)} character strips, {len(NAMES)} idle sprites, and roster sheet at {OUT}")


if __name__ == "__main__":
    main()
