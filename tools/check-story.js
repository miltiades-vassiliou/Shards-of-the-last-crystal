// tools/check-story.js — automatically checks story.js for mistakes.
//
// Run it from the project folder with:   node tools/check-story.js
//
// It plays through EVERY possible path (every scene, with every combination
// of items you could be carrying) and reports:
//   * choices that point to a scene that doesn't exist (broken links)
//   * scenes nobody can ever reach
//   * dead ends: a non-ending scene where no choice is available
//   * endings that can never be reached
//   * {placeholders} that aren't in the GENDER_WORDS table
//   * image files that don't exist yet (a warning, not an error)

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");

// Load story.js the same way the browser would, then grab its tables.
const code = fs.readFileSync(path.join(root, "story.js"), "utf8");
const { STORY, GENDER_WORDS } = vm.runInNewContext(
  code + "\n({ STORY, GENDER_WORDS })"
);
const scenes = STORY.scenes;

const errors = [];
const warnings = [];

// --- 1. Broken links, unknown placeholders, missing images ---
const knownPlaceholders = new Set(["name"]);
for (const words of Object.values(GENDER_WORDS)) {
  Object.keys(words).forEach(k => knownPlaceholders.add(k));
}

function checkPlaceholders(text, where) {
  for (const match of text.matchAll(/\{(\w+)\}/g)) {
    if (!knownPlaceholders.has(match[1])) {
      errors.push(`Unknown placeholder {${match[1]}} in ${where}`);
    }
  }
}

if (!scenes[STORY.start]) errors.push(`Start scene "${STORY.start}" does not exist`);

for (const [id, scene] of Object.entries(scenes)) {
  checkPlaceholders(scene.title, `"${id}" title`);
  scene.text.forEach(line => checkPlaceholders(line, `"${id}" text`));

  for (const choice of scene.choices) {
    checkPlaceholders(choice.text, `"${id}" choice`);
    if (!scenes[choice.goto]) {
      errors.push(`Scene "${id}": choice "${choice.text}" goes to missing scene "${choice.goto}"`);
    }
  }
  if (scene.ending && scene.choices.length > 0) {
    errors.push(`Scene "${id}" is an ending but has choices`);
  }
  if (!scene.ending && scene.choices.length === 0) {
    errors.push(`Scene "${id}" has no choices but is not marked as an ending`);
  }
  if (scene.image && !fs.existsSync(path.join(root, scene.image))) {
    warnings.push(`Scene "${id}": image ${scene.image} not found`);
  }
}

// --- 2. Play every path: (scene, inventory) pairs ---
const reachedScenes = new Set();
const reachedEndings = new Set();
const seen = new Set();
const queue = [{ id: STORY.start, inventory: [] }];

while (queue.length > 0 && errors.length === 0) {
  const { id, inventory } = queue.shift();
  const key = id + "|" + [...inventory].sort().join(",");
  if (seen.has(key)) continue;
  seen.add(key);

  const scene = scenes[id];
  reachedScenes.add(id);
  if (scene.ending) {
    reachedEndings.add(scene.ending);
    continue;
  }

  const available = scene.choices.filter(c =>
    (!c.needs || inventory.includes(c.needs)) &&
    (!c.needsNot || !inventory.includes(c.needsNot))
  );
  if (available.length === 0) {
    errors.push(`Dead end: scene "${id}" has no available choice when carrying [${inventory.join(", ")}]`);
  }

  for (const c of available) {
    let next = [...inventory];
    if (c.gives && !next.includes(c.gives)) next.push(c.gives);
    if (c.uses) next = next.filter(item => item !== c.uses);
    queue.push({ id: c.goto, inventory: next });
  }
}

for (const id of Object.keys(scenes)) {
  if (!reachedScenes.has(id)) errors.push(`Scene "${id}" can never be reached`);
}
const allEndings = Object.values(scenes).filter(s => s.ending).map(s => s.ending);

// --- 3. Report ---
console.log(`Scenes: ${Object.keys(scenes).length}   Endings: ${allEndings.length}   Paths explored: ${seen.size}`);
console.log(`Endings reachable: ${[...reachedEndings].join(", ") || "none"}`);
warnings.forEach(w => console.log("WARNING: " + w));
errors.forEach(e => console.log("ERROR:   " + e));

if (errors.length > 0) {
  console.log(`\n${errors.length} problem(s) found.`);
  process.exit(1);
}
console.log("\nAll checks passed.");
