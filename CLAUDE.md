# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Shards of the Last Crystal": a browser text adventure in plain HTML/CSS/JavaScript. There is no build step, no package.json and no dependencies. Open `index.html` directly (`file://` works) to play.

The owner is new to coding and Git (their background is Power BI M/DAX) and uses this project to learn. Explain what you change and why in plain terms, and prefer small, reviewable steps.

## Repositories and deployment

- `miltiades-vassiliou/Shards-of-the-last-crystal` (public) is the game's home. GitHub Pages serves `main` from the repo root at https://miltiades-vassiliou.github.io/Shards-of-the-last-crystal/ (note the capital S). Every merge to `main` redeploys within about a minute.
- `miltiades-vassiliou/Claude-test1` (private) is the archive of how the game was built, and its history contains the owner's personal email. Never make it public, and never copy its history into the public repo. The two repos are not synced automatically.
- Changes go through a branch and a pull request, which the owner merges. Before pushing more commits to a PR's branch, check the PR is still open: a merged PR does not pick up later pushes.

## Commands

- `node tools/check-story.js`: the project's only test. Run it after any change to `story.js`. It exits 1 on errors and only warns about missing image files.
- Browser check: Chromium and a global Playwright install are available in Claude Code cloud sessions. Run scripts with `NODE_PATH=$(npm root -g) node script.js` against `file:///…/index.html`. From the page you can call `showScene("<sceneId>")` to jump straight to any scene.

## Architecture

`index.html` loads two classic (non-module) scripts in order, which share globals:

1. `story.js` defines `GENDER_WORDS`, `DEFAULT_NAME` and `STORY` (`start` plus a `scenes` map keyed by scene id). It is pure data with no logic.
2. `game.js` is the engine. It toggles between two `<section>`s with the `hidden` attribute: `#setup-screen` (hero name and gender) and `#game-screen`. Its state is just `hero` and `inventory` (an array of item-name strings). `showScene(id)` renders the image, title, text, filtered choices and the ending banner.

### Story data rules (enforced by `tools/check-story.js`)

- A scene has `title`, `text` (an array of paragraphs), `choices`, and an optional `image`. A scene with an `ending` name must have `choices: []`, and every scene without one must have at least one choice.
- Choice fields:
  - `goto` (required)
  - `gives` / `uses`: add or remove an item.
  - `needs` / `needsNot`: show the choice only if the item is held, or not held.
- Items are plain strings matched exactly, so a typo silently breaks a gate.
- The checker explores every (scene, inventory) combination from `STORY.start`. It reports broken `goto`s, unreachable scenes, dead ends (no visible choice for some inventory) and unreachable endings.
- Text uses `{placeholders}`, filled by `fillPlaceholders()` in `game.js`. `{name}` is the hero's name; any other key must exist in **all three** `GENDER_WORDS` entries (male / female / nonbinary), or the checker fails. The story is written in second person, so gender only shows in how other characters address the hero.

### Images

- `images/*.jpg` are AI-generated pencil-sketch illustrations: 1000×1000 JPG, about 300 KB each. Generated originals are about 3 MB PNGs, so resize and convert them before committing (Pillow is available).
- Several scenes share an image. The engine hides `#scene-image` if a file fails to load.
- `images/PROMPTS.md` holds the style block, cast descriptions and per-scene prompts. The hero is always drawn hooded or from behind, because the player chooses their gender.
- The story text was edited to match what each picture shows. When changing a scene's text or image, keep the two consistent.

### Styling

- Colours are CSS variables in `:root` at the top of `style.css`.
- `[hidden] { display: none !important; }` is required, because `#scene-image` sets `display: block`, which would otherwise override the `hidden` attribute.
- Fonts (Cinzel, EB Garamond) load from Google Fonts and fall back to Georgia.
