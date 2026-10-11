# Shards of the Last Crystal

A short fantasy text adventure that runs in your web browser.

The world's Elemental Crystals are dimming. When the last one shatters, a young
apprentice sets out aboard an airship to recover its shards before an exiled
sorcerer-king can use them to awaken an ancient power.

Every scene offers choices. Some lead to treasure, some to danger, and a few to
one of several endings.

## Play it

**▶ [Play online](https://miltiades-vassiliou.github.io/Shards-of-the-last-crystal/)**: works on
computers, tablets and phones.

Create your hero (name and gender), then click the choices to make your way
through the story. Some items you pick up unlock new choices later, and there
are four different endings to find.

To play offline, download this repository (**Code → Download ZIP**), unzip it
and open `index.html` in any web browser.

## Project files

| File | Purpose |
|---|---|
| `index.html` | The page layout |
| `story.js` | The whole story as data: scenes, choices, items, endings |
| `game.js` | The engine that shows scenes and tracks your inventory |
| `style.css` | The look: colours, fonts, layout |
| `images/` | Scene illustrations, plus `PROMPTS.md` for generating them |
| `tools/check-story.js` | Checks the story for broken links and dead ends: `node tools/check-story.js` |

## About

A learning project, built step by step with [Claude Code](https://claude.com/claude-code):
a story-as-data engine in plain HTML, CSS and JavaScript, with 19 AI-generated
pencil-sketch illustrations. There are no build tools or dependencies, so it is
just files you can open in a browser.
