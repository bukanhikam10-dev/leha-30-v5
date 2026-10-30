# Untuk Leha — web game prototype

Static, dependency-free prototype for a personalized Indonesian adventure game. It is ready to preview locally and can be deployed as a static site on Vercel.

## Run locally

Open `index.html` in a browser. Progress for the prologue is stored in browser local storage.

## Deploy to Vercel

Import this folder as a GitHub repository in Vercel. No build command is required; use the static output as-is and set the project root to this folder if the repository contains other files.

## Current scope

- Opening flow with a character loading screen, followed by an Easter-egg selection screen. Leha is playable; Hikam and Mbak Jupe are locked.
- Playable prologue and all story chapters through the finale, unlocked in order.
- Chapter 1 school scenes with conversations at SMAN 94.
- Chapter 2 automatic motorcycle ride animation, with no steering mini-game.
- Chapter 3 Maulid wager, calendar reveal, and Happy Days scene.
- Chapter 4 band competition with a left/right drum rhythm mini-game, first-place announcement, and the fakeout gag.
- Chapters 5–6 story scenes about Leha and Hikam's dreams and changing routines.
- Chapter 7 social-media opening and campus conversations with Mentari and Nadia.
- Chapter 8 professional-life scene and the conversation with Ibu Menteri.
- Chapter 9 reunion with Wawaw at Noto Coffee, followed by Hikam and Leha's conversation.
- Finale with Hikam handing Leha a letter, followed by a scrolling end-credit scene. No memory-fragment selection, personal photo, or voice note.
- Leha is controllable only left and right with A/D, left/right arrows, or the on-screen controls. In social scenes, move close to a friend and press Enter or click them to talk.
- Every stage follows Poniman’s narrator intro, character interaction or gameplay, and narrator outro. Dialogues with Hikam show Hikam as an on-screen character; move Leha close to him and press Enter to talk.
- Hand-authored SVG pixel-style sprite strips for fourteen characters, with four poses each, plus a combined roster sheet.

Most dialogue and chapter flow are stored in the `games` object in `app.js`. Each chapter contains `stages`; edit the stage `intro` and `outro` for Poniman’s narration, `script` for a Hikam interaction, and each friend’s `dialogue` array for social conversations. Each line uses `[speaker, text]`. Save the file and refresh the browser to see your edits. Completed chapters are remembered in that browser's local storage; use the browser's site data controls to reset the playthrough.

The story uses the details provided so far. Locations, conversations, and visual designs that were not specified are starter content and can be edited as more personal details are confirmed.

## Character sprites

The first-pass sprites are created locally as SVG, so they require no image API key. Leha and Hikam follow the attached visual reference; Hikam is shown as a drummer. Nadia and Mentari wear hijab, and Jawir is depicted as a woman. Poniman is the star-shaped narrator and game guide. Distinguishing features for Aini, Ayu, Pista, Nurul, and Anita are provisional because the supplied blueprint does not specify their appearances.

- Individual four-pose strips: `assets/characters/<name>.svg`
- Idle portraits used by the UI: `assets/characters/<name>-idle.svg`
- Combined sheet: `assets/characters/roster-spritesheet.svg`
- Rebuild after edits: `python3 scripts/build_character_sprites.py`

## Background music

The game now has three BGM loops, switched with a crossfade by `music-director.js`: `bgm-opening.wav` (home + loading), `bgm-main.wav` (character select through the ending letter), and `bgm-credits.wav` (only while credits scroll). Use the **Suara** button to turn music on or off. To use a different song, replace the matching WAV using the same filename. Keep it in the project folder so it is included when you publish the game.

## Publish on GitHub and Vercel

After extracting the ZIP, upload the files inside the extracted game folder directly to the GitHub repository root. `index.html`, `app.js`, `styles.css`, and `assets/` should sit beside one another at the top level; do not upload the ZIP itself as a repository file. In Vercel, set the project Root Directory to `./`, choose the Other framework preset, leave Build Command blank, and set Output Directory to `.`. Then redeploy.


## Finale, sound effects, and dialogue animation

- The finale now ends with Hikam handing Leha a letter. As soon as the typed letter finishes, the scrolling end credits begin automatically. The memory-fragment selection has been removed.
- Credits list Hikam as Developer, Script, Sound Design, Visual Design, Game Design, and Producer, then end with "The man who lucky have Leha: Hikam".
- Audible synthesized effects play for character movement, drum inputs, and button presses. They are generated in the browser and need no extra audio files or API key.
- The loading screen takes about 4.8 seconds to move from 0% to 100%; Continue becomes available at 100%.
- Character dialogue uses a typewriter effect. Press the dialogue button once to reveal the whole line, then press again to continue.


## Opening scene

The home screen's illustration is an animated pixel-art canvas (`opening-scene.js`): night room, window with twinkling stars and shooting stars, swaying curtains, candle, fairy lights, lamp glow, dust motes, a detailed animated Leha (breathing, blinking, eyes follow the cursor, waves periodically), Poniman the star, and gift boxes. Click Leha or the gifts for a reaction. Other scenes are unchanged. Respects `prefers-reduced-motion`.

## Animated gameplay scenes

`scene-art.js` draws an animated pixel-art backdrop (400x200, nearest-neighbour scaled) for every scene mode: school class/gate/canteen, motorbike ride (perspective road, parallax), dreams (sunset class), calendar, Happy Days/cafe, Alas Tua, graduation (confetti, tossed caps, balloons), daily life (UIN/UI day-night split), Noto Coffee (rain), band concert (sweeping spotlights, bobbing crowd), UI campus, office, birthday, phone (bokeh) and the default montage. The prologue room keeps its hotspots and gets an ambient overlay. Characters get idle breathing, step bounce and a ground shadow in CSS. Add a new scene by adding a painter `P["mode-name"] = { bg(b), fx(c, S, dt) }`.
