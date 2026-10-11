// game.js — the engine.
//
// Its job: let the player create a hero, then show a scene, wait for a click,
// and show the next scene. It knows nothing about the actual story; it reads
// everything from STORY and GENDER_WORDS (defined in story.js).

// ---------- Find the boxes from index.html so we can fill them in ----------
const setupScreen = document.getElementById("setup-screen");
const gameScreen = document.getElementById("game-screen");
const nameInput = document.getElementById("hero-name");
const setupError = document.getElementById("setup-error");
const beginButton = document.getElementById("begin-button");

const restartButton = document.getElementById("restart-button");
const sceneBox = document.getElementById("scene");
const imageBox = document.getElementById("scene-image");
const titleBox = document.getElementById("scene-title");
const textBox = document.getElementById("scene-text");
const choicesBox = document.getElementById("choices");
const inventoryBox = document.getElementById("inventory");

// ---------- The game's "state": everything we need to remember ----------
let hero = { name: DEFAULT_NAME, gender: "nonbinary" };
let inventory = [];   // a list of item names, e.g. ["Phoenix Feather"]

// ---------- Character creation ----------
beginButton.onclick = () => {
  const picked = document.querySelector('input[name="gender"]:checked');
  if (!picked) {
    setupError.hidden = false;   // no gender chosen yet: show the message
    return;
  }
  setupError.hidden = true;

  hero.name = nameInput.value.trim() || DEFAULT_NAME;   // blank name -> default
  hero.gender = picked.value;
  inventory = [];

  setupScreen.hidden = true;
  gameScreen.hidden = false;
  showScene(STORY.start);
};

function backToSetup() {
  gameScreen.hidden = true;
  setupScreen.hidden = false;   // the name box still holds the previous name
}

restartButton.onclick = backToSetup;

// ---------- Placeholders ----------
// Swap {name}, {lad}, {hero}... for the right words.
// e.g. "Welcome home, {name}" -> "Welcome home, Arin"
function fillPlaceholders(text) {
  const words = GENDER_WORDS[hero.gender];
  return text.replace(/\{(\w+)\}/g, (whole, key) => {
    if (key === "name") return hero.name;
    return words[key] ?? whole;   // unknown placeholder: leave it as-is
  });
}

// ---------- Items ----------
// Should this choice be shown, given what's in the inventory?
function isChoiceAvailable(choice) {
  if (choice.needs && !inventory.includes(choice.needs)) return false;
  if (choice.needsNot && inventory.includes(choice.needsNot)) return false;
  return true;
}

function pickChoice(choice) {
  if (choice.gives && !inventory.includes(choice.gives)) {
    inventory.push(choice.gives);
  }
  if (choice.uses) {
    inventory = inventory.filter(item => item !== choice.uses);
  }
  showScene(choice.goto);
}

function showInventory() {
  inventoryBox.textContent = "Inventory: ";
  if (inventory.length === 0) {
    inventoryBox.append("(empty)");
  }
  for (const item of inventory) {
    const tag = document.createElement("span");
    tag.className = "item";
    tag.textContent = item;
    inventoryBox.appendChild(tag);
  }
}

// Replay the CSS fade-in animation on an element.
function fadeIn(element) {
  element.classList.remove("fade-in");
  void element.offsetWidth;   // forces the browser to notice the removal
  element.classList.add("fade-in");
}

// ---------- Showing a scene ----------
function showScene(sceneId) {
  const scene = STORY.scenes[sceneId];

  // 1. Picture (hidden if the scene has none, or the file is missing)
  imageBox.hidden = true;
  if (scene.image) {
    imageBox.onload = () => { imageBox.hidden = false; fadeIn(imageBox); };
    imageBox.onerror = () => { imageBox.hidden = true; };
    imageBox.src = scene.image;
  }

  // 2. Title
  titleBox.textContent = fillPlaceholders(scene.title);

  // 3. Story text: one <p> (paragraph) per line in the scene's text list
  textBox.innerHTML = "";
  for (const line of scene.text) {
    const p = document.createElement("p");
    p.textContent = fillPlaceholders(line);
    textBox.appendChild(p);
  }

  // 4. Choice buttons: only the ones your inventory allows
  choicesBox.innerHTML = "";
  for (const choice of scene.choices.filter(isChoiceAvailable)) {
    const button = document.createElement("button");
    button.textContent = fillPlaceholders(choice.text);
    button.onclick = () => pickChoice(choice);
    choicesBox.appendChild(button);
  }

  // 5. Endings: announce which ending this is, and offer a restart
  if (scene.ending) {
    const banner = document.createElement("p");
    banner.className = "ending-banner";
    banner.textContent = "THE END: " + scene.ending + " ending";
    choicesBox.appendChild(banner);

    const restart = document.createElement("button");
    restart.textContent = "Play again";
    restart.onclick = backToSetup;
    choicesBox.appendChild(restart);
  }

  showInventory();
  fadeIn(sceneBox);
  window.scrollTo(0, 0);
}
