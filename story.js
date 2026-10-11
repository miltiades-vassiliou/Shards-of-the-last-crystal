// story.js — the story, stored as data.
//
// Think of this like tables in Power BI:
//   * GENDER_WORDS is a small lookup table: one column per gender.
//   * STORY.scenes is the main table: one "row" per scene.
//
// ---------------------------------------------------------------------------
// HOW TO READ A SCENE
//   title   – heading shown at the top
//   image   – picture shown above the text (optional)
//   text    – a list of paragraphs
//   choices – a list of buttons. Each choice has:
//       text      what the button says
//       goto      the scene it leads to
//       gives     (optional) an item added to your inventory
//       uses      (optional) an item removed from your inventory
//       needs     (optional) only show this choice if you HAVE this item
//       needsNot  (optional) only show this choice if you DON'T have this item
//   ending  – (only on endings) the ending's name. Endings have no choices.
//
// PLACEHOLDERS
//   Words in {curly braces} are filled in by the engine when the scene is
//   shown: {name} becomes the hero's name, and the others come from the
//   GENDER_WORDS table below (e.g. {lad} becomes "lad", "lass" or "kid").
// ---------------------------------------------------------------------------

const GENDER_WORDS = {
  male:      { lad: "lad",  boy: "boy",   hero: "hero",    ruler: "sorcerer-king" },
  female:    { lad: "lass", boy: "girl",  hero: "heroine", ruler: "sorcerer-queen" },
  nonbinary: { lad: "kid",  boy: "child", hero: "hero",    ruler: "sorcerer-monarch" }
};

const DEFAULT_NAME = "Arin";

const STORY = {
  start: "village",

  scenes: {

    // ===================== ACT 1: EMBERFALL =====================

    village: {
      title: "The Village of Emberfall",
      image: "images/village.jpg",
      text: [
        "Dawn breaks over Emberfall, a village of crooked roofs and wind-chimes at the edge of the world. On the hill above, inside the old stone temple, the Crystal of Wind flickers like a candle in a draught.",
        "It has been dimming for weeks. Nobody says it aloud, but everyone has noticed: the chimes have stopped ringing.",
        "\"{name}!\" Elder Maren's voice rings from the temple steps, sharp with worry. \"Come quickly!\""
      ],
      choices: [
        { text: "Climb the hill to the temple", goto: "temple" },
        { text: "Pretend you didn't hear and sneak off fishing", goto: "river" }
      ]
    },

    temple: {
      title: "The Crystal Shatters",
      image: "images/temple.jpg",
      text: [
        "You reach the top step just as a sound like breaking ice splits the air. The Crystal of Wind bursts apart, and a hundred glittering shards streak out through the temple roof and across the sky like falling stars, flying the wrong way.",
        "Maren staggers, her white robes dusted with crystal powder. She presses something warm into your hand: a feather that glows red and gold, like a coal that refuses to go out.",
        "\"A Phoenix Feather,\" she whispers. \"It will save you once, {name}. Only once. Follow the shards. Someone is calling them.\" She points to a column of black smoke rising beyond the hills."
      ],
      choices: [
        { text: "Take the feather and run toward the smoke", goto: "crash_site", gives: "Phoenix Feather" }
      ]
    },

    river: {
      title: "A Quiet Morning",
      image: "images/river.jpg",
      text: [
        "The river is cool and lazy, and the fish are biting. For one perfect hour, the world's problems belong to someone else.",
        "Then the sky screams. A burning airship tears overhead, trailing smoke and splinters, and crashes somewhere in the hills. A moment later, glittering shards streak across the sky after it, like falling stars flying the wrong way.",
        "Behind you, up on the hill, the temple has gone dark."
      ],
      choices: [
        { text: "Drop your rod and chase the smoke", goto: "crash_site" }
      ]
    },

    crash_site: {
      title: "The Wreck of the Wandering Gale",
      image: "images/crash_site.jpg",
      text: [
        "The airship lies tilted in a field of scorched heather, its balloon sagging like a tired lung. A woman in a battered flight coat is kicking the engine and swearing creatively.",
        "\"Don't just stand there, {lad}! I'm Captain Vessa Thorne, and this is the finest ship in the sky, when it's not on fire.\"",
        "From the tangled rigging comes a frantic squawk. A rukka, a huge cream-and-gold riding bird with a ridiculous crest, is caught in the ropes, kicking and panicking. A brass tag on its harness reads PIP."
      ],
      choices: [
        { text: "Free the tangled rukka first", goto: "airship", gives: "Rukka Whistle" },
        { text: "Help Vessa fix the engine", goto: "airship" }
      ]
    },

    airship: {
      title: "Into the Skies",
      image: "images/airship.jpg",
      text: [
        "With a cough of black smoke and a cheer from Vessa, the Wandering Gale lurches into the air. Emberfall shrinks to a toy village beneath you.",
        "Vessa taps a spinning brass compass. \"Saw your shards fly past. This old thing tracks crystal energy. Some of them came down in the Gearhallow Ruins, the old Ironveil Empire's clockwork city. The rest went north… to Malgareth's Tower.\"",
        "She says the name like a curse. Malgareth: the exiled sorcerer-king, banished for trying to wake something that should stay asleep.",
        "\"Your call, {name}. Where to?\""
      ],
      choices: [
        { text: "Search the Gearhallow Ruins first", goto: "ruins_gate" },
        { text: "Fly straight to Malgareth's Tower. There's no time to lose", goto: "tower_approach" }
      ]
    },

    // ===================== ACT 2: THE GEARHALLOW RUINS =====================

    ruins_gate: {
      title: "The Gearhallow Ruins",
      image: "images/ruins_gate.jpg",
      text: [
        "Vessa lands beside a pair of enormous rusted gates, each one carved with interlocking gears. Beyond them, a dead city of copper towers and silent steam pipes stretches into the mist.",
        "\"I'll guard the ship,\" says Vessa. \"Nothing personal. I just don't do creepy.\"",
        "Pip trots after you as far as the gate, then plants his big feet and refuses to go a step further. Even rukkas have their limits.",
        "Inside the gates the path splits. To the left, a collapsed tunnel breathes cold air, a shortcut toward the glow of a shard. Straight ahead stands a vast domed hall, full of ticking."
      ],
      choices: [
        { text: "Take the collapsed tunnel (a shortcut)", goto: "tunnel" },
        { text: "Enter the ticking clockwork hall", goto: "clockwork_hall" }
      ]
    },

    tunnel: {
      title: "The Collapsed Tunnel",
      image: "images/chasm.jpg",
      text: [
        "The tunnel narrows to a crumbling ledge. To your left is solid rock. To your right is nothing at all: a chasm so deep that the dark seems to go on forever.",
        "On the far side you can see the faint blue glow of a shard. Pebbles skitter from under your boots and fall without a sound."
      ],
      choices: [
        { text: "Edge carefully along the ledge", goto: "chasm" },
        { text: "Think better of it and go back to the clockwork hall", goto: "clockwork_hall" }
      ]
    },

    clockwork_hall: {
      title: "The Brass Guardian",
      image: "images/guardian.jpg",
      text: [
        "The hall is a forest of frozen gears. In its centre kneels a brass giant, twice the height of a house, with a furnace for a heart.",
        "As you step closer, its eyes flare orange. Steam hisses from its joints. It rises.",
        "Carved into the floor in front of it is a line of old Ironveil script. You recognise a few words from Maren's lessons: \"…friend… passage… open…\""
      ],
      choices: [
        { text: "Read the inscription aloud", goto: "gear_vault" },
        { text: "Raise your staff and fight", goto: "chasm" }
      ]
    },

    chasm: {
      title: "The Fall",
      image: "images/fall.jpg",
      text: [
        "The ground gives way, whether crumbling ledge or a brass fist the size of a cart, and suddenly you are falling.",
        "Down and down, into a dark so complete you can't tell whether your eyes are open. The wind roars in your ears."
      ],
      choices: [
        { text: "The Phoenix Feather blazes to life…", goto: "phoenix_rise", needs: "Phoenix Feather", uses: "Phoenix Feather" },
        { text: "Keep falling…", goto: "ending_fallen", needsNot: "Phoenix Feather" }
      ]
    },

    phoenix_rise: {
      title: "Wings of Fire",
      image: "images/phoenix.jpg",
      text: [
        "Heat floods through you. The feather bursts into flame in your pocket, and the flames spread into great burning wings that catch the air and lift you up.",
        "You soar through the dark and land, gasping and unburnt, on a stone floor deep inside the ruins. The feather is gone. Maren was right: only once."
      ],
      choices: [
        { text: "Look around", goto: "gear_vault" }
      ]
    },

    gear_vault: {
      title: "The Ironveil Vault",
      image: "images/vault.jpg",
      text: [
        "A heavy door grinds open onto a circular vault. On a stone altar, a crystal shard pulses with soft blue light. Beside it lies a brass key shaped like a cog, warm to the touch: an Ironveil Gear Key.",
        "A mural covers the far wall. It shows a great machine feeding crystals into a swirling rift, and a single cog-shaped key turning it silent. Above the rift, painted in faded black, is a monstrous shape with too many wings.",
        "Vorthax. The Eidolon of Ruin. So that is what Malgareth wants to wake."
      ],
      choices: [
        { text: "Take the shard and the key, and hurry back to the airship", goto: "tower_approach", gives: "Ironveil Gear Key" }
      ]
    },

    // ===================== ACT 3: MALGARETH'S TOWER =====================

    tower_approach: {
      title: "The Black Tower",
      image: "images/tower.jpg",
      text: [
        "Malgareth's Tower rises from a jagged cliff like a broken black tooth. A storm spins around its peak, and wyverns wheel through the lightning.",
        "\"Lovely,\" mutters Vessa, gripping the wheel. \"Options, {name}?\""
      ],
      choices: [
        { text: "Fly straight through the storm to the top", goto: "storm_run" },
        { text: "Land at the base and sneak in", goto: "tower_base" },
        { text: "Blow the Rukka Whistle and call Pip", goto: "rukka_ride", needs: "Rukka Whistle" }
      ]
    },

    storm_run: {
      title: "Through the Storm",
      image: "images/tower.jpg",
      text: [
        "The Wandering Gale plunges into the storm. Wind slams the hull and wyverns shriek past the windows. Then lightning strikes the mast with a noise like the end of the world.",
        "Vessa wrestles the ship onto a stone bridge near the summit and crash-lands in a shower of sparks. She's bleeding, but grinning. \"Told you she's the finest ship in the sky. Go, {lad}. Finish this.\""
      ],
      choices: [
        { text: "Run for the summit", goto: "summit" }
      ]
    },

    tower_base: {
      title: "The Halls of the Acolytes",
      image: "images/tower_halls.jpg",
      text: [
        "You slip through a servants' door at the foot of the tower. The halls are full of black-robed acolytes chanting in low voices, all of them heading upward.",
        "A spare robe hangs on a hook. Through a window you also spot an outer wall of rough stone, climbable if you're brave, that runs all the way to the summit."
      ],
      choices: [
        { text: "Steal the robe and blend in with the acolytes", goto: "engine_room" },
        { text: "Climb the outer wall to the summit", goto: "summit" }
      ]
    },

    rukka_ride: {
      title: "Pip to the Rescue",
      image: "images/rukka_ride.jpg",
      text: [
        "You blow the whistle. On the deck behind you, Pip's crest shoots straight up. With a joyful \"KWEH!\" the rukka vaults over the rail of the hovering airship and lands on the cliffside with a thump, feathers streaming.",
        "You leap down onto Pip's back. Pip races up a hidden goat path no acolyte would ever think to guard and skids to a halt at a forgotten side door, high up the tower, humming with machinery."
      ],
      choices: [
        { text: "Slip through the side door", goto: "engine_room" }
      ]
    },

    engine_room: {
      title: "The Summoning Engine",
      image: "images/engine.jpg",
      text: [
        "The heart of the tower is a roaring machine of pistons and glass, built from scavenged Ironveil parts. Crystal shards ride a conveyor up into the ceiling, where you can feel a rift pulling at the air.",
        "In the centre of the control panel is a cog-shaped keyhole."
      ],
      choices: [
        { text: "Turn the Ironveil Gear Key and shut the engine down", goto: "summit_silent", needs: "Ironveil Gear Key" },
        { text: "Smash the machine with your staff", goto: "summit" }
      ]
    },

    summit: {
      title: "The Summit",
      image: "images/summit.jpg",
      text: [
        "At the top of the tower, under the boiling sky, stands Malgareth. Crystal shards orbit him like moons. Above him the rift yawns open, and through it a vast eye opens: Vorthax, half-awake and hungry.",
        "\"Ah. The little apprentice.\" Malgareth smiles. \"You've come all this way, {boy}. Why fight me? Join me, and when Vorthax rises, we will rule the world together.\"",
        "The rift is too strong to fight. But you notice that the shards tremble when you come near. They remember the Crystal of Wind… and they remember you."
      ],
      choices: [
        { text: "Accept Malgareth's offer", goto: "ending_dark" },
        { text: "Seize the shards and leap into the rift to seal it", goto: "ending_bittersweet" }
      ]
    },

    summit_silent: {
      title: "The Summit (The Engine Is Silent)",
      image: "images/summit.jpg",
      text: [
        "You burst onto the summit. Malgareth whirls around, his face twisted with fury. With the engine silent, the shards around him wobble and sputter, and the rift above is shrinking.",
        "\"What have you DONE?\" he snarls. Then, more softly: \"No matter. Join me, {boy}. Even now, together, we could still wake it. We could rule everything.\"",
        "He is weakened. Off balance. This is the moment."
      ],
      choices: [
        { text: "Accept Malgareth's offer", goto: "ending_dark" },
        { text: "Strike while his power falters", goto: "ending_heroic" }
      ]
    },

    // ===================== ENDINGS =====================

    ending_fallen: {
      title: "Swallowed by the Dark",
      image: "images/fall.jpg",
      ending: "Early Defeat",
      text: [
        "You fall for a very long time.",
        "Far away in Emberfall, Elder Maren lights a lantern on the temple steps every night and waits for a {hero} who never returns. Without the shards, the wind falls still across the world.",
        "Perhaps another path would have ended differently…"
      ],
      choices: []
    },

    ending_bittersweet: {
      title: "The Last Light",
      image: "images/new_crystal.jpg",
      ending: "Bittersweet",
      text: [
        "You gather the trembling shards to your chest and leap. Malgareth screams. The shards blaze white, and the rift slams shut around you like a door, with Vorthax trapped on the other side forever.",
        "You never come home. But on the summit, where you vanished, a new crystal begins to grow, and the wind returns to the world.",
        "For one last moment you linger there, light as mist, beside Vessa as she kneels by the crystal with her hat in her hands. Pip nuzzles the empty air where you stand. Then the wind gently carries you away.",
        "Captain Vessa Thorne tells your story in every port in the sky. She always ends it the same way: \"Bravest {hero} I ever flew with. Name of {name}. Remember it.\""
      ],
      choices: []
    },

    ending_dark: {
      title: "The New Sorcerer",
      image: "images/throne.jpg",
      ending: "Dark",
      text: [
        "You take Malgareth's hand, and the shards' power floods into you, cold and endless. Within the hour Malgareth is gone, swallowed by the very power he served, and you stand alone on the summit.",
        "Vorthax waits behind the rift, patient, for your command.",
        "Years pass. People whisper of {name}, the {ruler} of the Black Tower, and in Emberfall nobody rings the wind-chimes anymore.",
        "Then, one stormy night, a young apprentice in a hooded travelling cloak climbs the long steps to your throne, staff in hand, just as you once did. You smile. Perhaps this one will choose differently."
      ],
      choices: []
    },

    ending_heroic: {
      title: "The Crystal Reborn",
      image: "images/crystal_reborn.jpg",
      ending: "Heroic",
      text: [
        "Your staff connects with a crack of white light. Malgareth's spell shatters, and he crumples. The shards tear free of him and spiral up into the sky, shining like a comet. The rift above snaps shut, and Vorthax's eye closes, sealed away again.",
        "Days later, the Wandering Gale drifts down over Emberfall with Pip asleep on the deck. In the temple on the hill, the shards have flown home and fused together, and the Crystal of Wind blazes brighter than it has in a hundred years.",
        "Every wind-chime in the village begins to ring. Elder Maren is waiting on the steps. \"Welcome home, {name},\" she says. \"Welcome home, {hero}.\""
      ],
      choices: []
    }
  }
};
