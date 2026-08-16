const canvas = document.getElementById("arena");
const ctx = canvas.getContext("2d");

const redHandEl = document.getElementById("redHand");
const blueHandEl = document.getElementById("blueHand");
const redElixirEl = document.getElementById("redElixir");
const blueElixirEl = document.getElementById("blueElixir");
const redCrownsEl = document.getElementById("redCrowns");
const blueCrownsEl = document.getElementById("blueCrowns");
const timerEl = document.getElementById("timer");
const phaseTextEl = document.getElementById("phaseText");
const messageEl = document.getElementById("message");
const messageTitleEl = document.getElementById("messageTitle");
const messageBodyEl = document.getElementById("messageBody");
const restartButton = document.getElementById("restartButton");
const deckPickerEl = document.getElementById("deckPicker");
const blueDeckChoicesEl = document.getElementById("blueDeckChoices");
const redDeckChoicesEl = document.getElementById("redDeckChoices");
const startMatchButton = document.getElementById("startMatchButton");

const W = canvas.width;
const H = canvas.height;
const RIVER_Y = H / 2;
const CARD_KEYS = {
  red: ["1", "2", "3", "4"],
  blue: ["7", "8", "9", "0"],
};

const cardPool = [
  {
    id: "sword",
    name: "Squires",
    type: "troop",
    cost: 3,
    count: 3,
    hp: 95,
    damage: 18,
    range: 18,
    speed: 48,
    attackRate: 0.75,
    radius: 9,
    note: "swarm",
  },
  {
    id: "giant",
    name: "Brute",
    type: "troop",
    cost: 5,
    count: 1,
    hp: 420,
    damage: 42,
    range: 20,
    speed: 31,
    attackRate: 1.05,
    radius: 15,
    buildingsOnly: true,
    note: "tower focus",
  },
  {
    id: "archer",
    name: "Bow Pair",
    type: "troop",
    cost: 3,
    count: 2,
    hp: 82,
    damage: 16,
    range: 96,
    speed: 43,
    attackRate: 0.72,
    radius: 8,
    ranged: true,
    note: "ranged",
  },
  {
    id: "marksman",
    name: "Marksman",
    type: "troop",
    cost: 4,
    count: 1,
    hp: 128,
    damage: 31,
    range: 132,
    speed: 37,
    attackRate: 0.95,
    radius: 10,
    ranged: true,
    note: "long range",
  },
  {
    id: "knight",
    name: "Knight",
    type: "troop",
    cost: 3,
    count: 1,
    hp: 240,
    damage: 29,
    range: 18,
    speed: 52,
    attackRate: 0.78,
    radius: 11,
    note: "fighter",
  },
  {
    id: "minipekka",
    name: "Mini P.E.K.K.A",
    type: "troop",
    cost: 4,
    count: 1,
    hp: 310,
    damage: 68,
    range: 18,
    speed: 45,
    attackRate: 1.05,
    radius: 13,
    note: "heavy hit",
  },
  {
    id: "valkyrie",
    name: "Valkyrie",
    type: "troop",
    cost: 4,
    count: 1,
    hp: 350,
    damage: 38,
    range: 22,
    speed: 43,
    attackRate: 0.9,
    radius: 14,
    note: "brawler",
  },
  {
    id: "wizard",
    name: "Wizard",
    type: "troop",
    cost: 5,
    count: 1,
    hp: 145,
    damage: 40,
    range: 118,
    speed: 38,
    attackRate: 1,
    radius: 10,
    ranged: true,
    note: "ranged blast",
  },
  {
    id: "minions",
    name: "Minions",
    type: "troop",
    cost: 3,
    count: 3,
    hp: 68,
    damage: 19,
    range: 18,
    speed: 74,
    attackRate: 0.78,
    radius: 8,
    flying: true,
    note: "flying swarm",
  },
  {
    id: "babydragon",
    name: "Baby Dragon",
    type: "troop",
    cost: 4,
    count: 1,
    hp: 320,
    damage: 34,
    range: 104,
    speed: 46,
    attackRate: 1.1,
    radius: 14,
    flying: true,
    ranged: true,
    note: "flying ranged",
  },
  {
    id: "bolt",
    name: "Spark",
    type: "spell",
    cost: 4,
    damage: 120,
    radius: 72,
    note: "area hit",
  },
  {
    id: "fireball",
    name: "Fireball",
    type: "spell",
    cost: 4,
    damage: 175,
    radius: 84,
    effectColor: "#e8702a",
    note: "heavy blast",
  },
  {
    id: "arrows",
    name: "Arrows",
    type: "spell",
    cost: 3,
    damage: 92,
    radius: 118,
    effectColor: "#f4d779",
    note: "wide strike",
  },
  {
    id: "zap",
    name: "Zap",
    type: "spell",
    cost: 2,
    damage: 55,
    radius: 66,
    freeze: 0.8,
    effectColor: "#bba4ff",
    note: "stun blast",
  },
  {
    id: "freeze",
    name: "Freeze",
    type: "spell",
    cost: 4,
    damage: 0,
    radius: 102,
    freeze: 3.2,
    effectColor: "#8fe6ee",
    note: "stops attacks",
  },
  {
    id: "cannon",
    name: "Cannon",
    type: "building",
    cost: 4,
    hp: 360,
    damage: 25,
    range: 140,
    attackRate: 0.9,
    lifetime: 30,
    radius: 18,
    note: "defense",
  },
  {
    id: "tesla",
    name: "Tesla",
    type: "building",
    cost: 4,
    hp: 300,
    damage: 32,
    range: 154,
    attackRate: 0.82,
    lifetime: 28,
    radius: 16,
    note: "long defense",
  },
  {
    id: "bombtower",
    name: "Bomb Tower",
    type: "building",
    cost: 4,
    hp: 470,
    damage: 34,
    range: 112,
    attackRate: 1.1,
    lifetime: 32,
    radius: 20,
    note: "sturdy defense",
  },
  {
    id: "rider",
    name: "Ram Rider",
    type: "troop",
    cost: 4,
    count: 1,
    hp: 230,
    damage: 34,
    range: 18,
    speed: 76,
    attackRate: 0.85,
    radius: 12,
    buildingsOnly: true,
    note: "win con",
  },
];

let state;
let deckChoices;
let selectedDecks;
let lastTime = 0;

function makePlayer(side, deck) {
  return {
    side,
    elixir: 5,
    deck,
    nextIndex: 4,
    hand: [],
    selected: 0,
    cursor: side === "red" ? { x: W / 2, y: H - 130 } : { x: W / 2, y: 130 },
    towersDestroyed: 0,
  };
}

function startMatch() {
  const red = makePlayer("red", selectedDecks.red);
  const blue = makePlayer("blue", selectedDecks.blue);
  red.hand = red.deck.slice(0, 4);
  blue.hand = blue.deck.slice(0, 4);

  state = {
    players: { red, blue },
    towers: [
      makeTower("blue", "Princess", 250, 74, 850, 96, 34, 0.9),
      makeTower("blue", "King", 480, 64, 1400, 112, 42, 0.82),
      makeTower("blue", "Princess", 710, 74, 850, 96, 34, 0.9),
      makeTower("red", "Princess", 250, 566, 850, 96, 34, 0.9),
      makeTower("red", "King", 480, 576, 1400, 112, 42, 0.82),
      makeTower("red", "Princess", 710, 566, 850, 96, 34, 0.9),
    ],
    units: [],
    buildings: [],
    projectiles: [],
    effects: [],
    phase: "regulation",
    timeLeft: 120,
    gameOver: false,
  };

  messageEl.classList.add("hidden");
  deckPickerEl.classList.add("hidden");
  lastTime = performance.now();
  updateHud();
}

function makeTower(side, kind, x, y, hp, range, damage, attackRate) {
  return {
    id: `${side}-${kind}-${x}`,
    side,
    kind,
    x,
    y,
    hp,
    maxHp: hp,
    range,
    damage,
    attackRate,
    attackCooldown: 0,
    radius: kind === "King" ? 28 : 23,
    alive: true,
  };
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createDeck() {
  const troops = shuffle(cardPool.filter((card) => card.type === "troop").map((card) => card.id)).slice(0, 5);
  const spells = shuffle(cardPool.filter((card) => card.type === "spell").map((card) => card.id)).slice(0, 2);
  const building = shuffle(cardPool.filter((card) => card.type === "building").map((card) => card.id)).slice(0, 1);
  return shuffle([...troops, ...spells, ...building]);
}

function createDeckChoices() {
  const choices = [];
  const seen = new Set();
  while (choices.length < 3) {
    const deck = createDeck();
    const signature = [...deck].sort().join("|");
    if (!seen.has(signature)) {
      seen.add(signature);
      choices.push(deck);
    }
  }
  return choices;
}

function showDeckPicker() {
  deckChoices = {
    blue: createDeckChoices(),
    red: createDeckChoices(),
  };
  selectedDecks = { blue: null, red: null };
  renderDeckChoices("blue", blueDeckChoicesEl);
  renderDeckChoices("red", redDeckChoicesEl);
  startMatchButton.disabled = true;
  messageEl.classList.add("hidden");
  deckPickerEl.classList.remove("hidden");
}

function renderDeckChoices(side, target) {
  target.innerHTML = "";
  deckChoices[side].forEach((deck, index) => {
    const choice = document.createElement("button");
    choice.type = "button";
    choice.className = "deck-choice";
    if (selectedDecks[side] === deck) choice.classList.add("selected");
    choice.dataset.side = side;
    choice.dataset.deckIndex = index;
    choice.innerHTML = `<strong>Deck ${index + 1}</strong><span>${deck.map((id) => getCard(id).name).join(" / ")}</span>`;
    target.appendChild(choice);
  });
}

function selectDeck(side, index) {
  selectedDecks[side] = deckChoices[side][index];
  renderDeckChoices(side, side === "blue" ? blueDeckChoicesEl : redDeckChoicesEl);
  startMatchButton.disabled = !selectedDecks.blue || !selectedDecks.red;
}

function getCard(id) {
  return cardPool.find((card) => card.id === id);
}

function updateHud() {
  renderHand("red", redHandEl);
  renderHand("blue", blueHandEl);
  redElixirEl.textContent = `${state.players.red.elixir.toFixed(1)} elixir`;
  blueElixirEl.textContent = `${state.players.blue.elixir.toFixed(1)} elixir`;
  redCrownsEl.textContent = `${state.players.red.towersDestroyed} towers`;
  blueCrownsEl.textContent = `${state.players.blue.towersDestroyed} towers`;
  phaseTextEl.textContent = state.phase === "sudden" ? "Sudden death" : "Regulation";
  timerEl.textContent = formatTime(state.timeLeft);
}

function renderHand(side, target) {
  const player = state.players[side];
  const keys = CARD_KEYS[side];
  target.innerHTML = "";

  player.hand.forEach((id, index) => {
    const card = getCard(id);
    const el = document.createElement("article");
    el.className = "card";
    if (player.selected === index) el.classList.add("selected");
    if (player.elixir < card.cost) el.classList.add("disabled");
    el.innerHTML = `
      <span class="key">${keys[index]}</span>
      <span class="card-name">${card.name}</span>
      <span class="card-meta"><span>${card.cost} elixir</span><span>${card.note}</span></span>
    `;
    target.appendChild(el);
  });
}

function formatTime(seconds) {
  const clamped = Math.max(0, Math.ceil(seconds));
  const min = Math.floor(clamped / 60);
  const sec = clamped % 60;
  return `${min}:${String(sec).padStart(2, "0")}`;
}

function loop(now) {
  const dt = Math.min(0.033, (now - lastTime) / 1000 || 0);
  lastTime = now;

  if (state && !state.gameOver) {
    update(dt);
  }
  if (state) draw();
  requestAnimationFrame(loop);
}

function update(dt) {
  state.timeLeft -= dt;

  for (const player of Object.values(state.players)) {
    player.elixir = Math.min(10, player.elixir + dt * (state.phase === "sudden" ? 1.18 : 0.72));
  }

  updateUnits(dt);
  updateBuildings(dt);
  updateTowers(dt);
  updateProjectiles(dt);
  updateEffects(dt);
  checkDestroyedTowers();
  checkTimer();
  updateHud();
}

function updateUnits(dt) {
  for (const unit of state.units) {
    if (!unit.alive) continue;
    unit.frozen = Math.max(0, (unit.frozen || 0) - dt);
    unit.attackCooldown = Math.max(0, unit.attackCooldown - dt);
    if (unit.frozen > 0) continue;

    const target = findTarget(unit);
    if (!target) continue;

    const dx = target.x - unit.x;
    const dy = target.y - unit.y;
    const dist = Math.hypot(dx, dy) || 1;
    const targetRadius = target.radius || 12;

    // A ranged unit remains still while its target is inside attack range.
    // It returns to advancing as soon as that target is out of range.
    if (dist <= unit.range + targetRadius) {
      if (unit.attackCooldown <= 0) {
        target.hp -= unit.damage;
        unit.attackCooldown = unit.attackRate;
        addHitEffect(target.x, target.y, unit.side);
      }
    } else {
      const step = unit.speed * dt;
      unit.x += (dx / dist) * step;
      unit.y += (dy / dist) * step;
      keepInArena(unit);
    }
  }

  state.units = state.units.filter((unit) => unit.alive && unit.hp > 0);
}

function findTarget(actor) {
  const enemySide = actor.side === "red" ? "blue" : "red";
  const enemies = [
    ...state.units.filter((unit) => unit.side === enemySide && unit.alive && !actor.buildingsOnly),
    ...state.buildings.filter((building) => building.side === enemySide && building.alive),
    ...state.towers.filter((tower) => tower.side === enemySide && tower.alive),
  ].filter((target) => canAttackTarget(actor, target));

  let best = null;
  let bestDist = Infinity;
  for (const target of enemies) {
    const dist = Math.hypot(target.x - actor.x, target.y - actor.y);
    if (dist < bestDist) {
      best = target;
      bestDist = dist;
    }
  }
  return best;
}

function canAttackTarget(actor, target) {
  if (!target.flying) return true;
  return actor.type === "troop" && actor.ranged;
}

function updateBuildings(dt) {
  for (const building of state.buildings) {
    if (!building.alive) continue;
    building.frozen = Math.max(0, (building.frozen || 0) - dt);
    building.lifetime -= dt;
    building.attackCooldown = Math.max(0, building.attackCooldown - dt);
    if (building.lifetime <= 0 || building.hp <= 0) {
      building.alive = false;
      continue;
    }
    if (building.frozen > 0) continue;

    const target = nearestEnemyInRange(building, building.range, false);
    if (target && building.attackCooldown <= 0) {
      target.hp -= building.damage;
      building.attackCooldown = building.attackRate;
      addHitEffect(target.x, target.y, building.side);
    }
  }
  state.buildings = state.buildings.filter((building) => building.alive);
}

function updateTowers(dt) {
  for (const tower of state.towers) {
    if (!tower.alive) continue;
    tower.frozen = Math.max(0, (tower.frozen || 0) - dt);
    tower.attackCooldown = Math.max(0, tower.attackCooldown - dt);
    if (tower.frozen > 0) continue;
    const target = nearestEnemyInRange(tower, tower.range, false);
    if (target && tower.attackCooldown <= 0) {
      state.projectiles.push({
        side: tower.side,
        x: tower.x,
        y: tower.y,
        target,
        speed: 360,
        damage: tower.damage,
        radius: 4,
      });
      tower.attackCooldown = tower.attackRate;
    }
  }
}

function nearestEnemyInRange(actor, range, buildingsOnly) {
  const enemySide = actor.side === "red" ? "blue" : "red";
  const candidates = [
    ...state.units.filter((unit) => unit.side === enemySide && unit.alive && !buildingsOnly),
    ...state.buildings.filter((building) => building.side === enemySide && building.alive),
    ...state.towers.filter((tower) => tower.side === enemySide && tower.alive),
  ].filter((target) => canAttackTarget(actor, target));
  let best = null;
  let bestDist = Infinity;
  for (const target of candidates) {
    const dist = Math.hypot(target.x - actor.x, target.y - actor.y);
    if (dist <= range && dist < bestDist) {
      best = target;
      bestDist = dist;
    }
  }
  return best;
}

function updateProjectiles(dt) {
  for (const projectile of state.projectiles) {
    const target = projectile.target;
    if (!target || target.hp <= 0 || target.alive === false) {
      projectile.done = true;
      continue;
    }
    const dx = target.x - projectile.x;
    const dy = target.y - projectile.y;
    const dist = Math.hypot(dx, dy) || 1;
    const step = projectile.speed * dt;
    if (dist <= step + projectile.radius) {
      target.hp -= projectile.damage;
      projectile.done = true;
      addHitEffect(target.x, target.y, projectile.side);
    } else {
      projectile.x += (dx / dist) * step;
      projectile.y += (dy / dist) * step;
    }
  }
  state.projectiles = state.projectiles.filter((projectile) => !projectile.done);
}

function updateEffects(dt) {
  for (const effect of state.effects) {
    effect.life -= dt;
    effect.radius += dt * effect.grow;
  }
  state.effects = state.effects.filter((effect) => effect.life > 0);
}

function checkDestroyedTowers() {
  for (const tower of state.towers) {
    if (tower.alive && tower.hp <= 0) {
      tower.alive = false;
      const scorer = tower.side === "red" ? "blue" : "red";
      state.players[scorer].towersDestroyed += 1;
      state.effects.push({ x: tower.x, y: tower.y, radius: 20, grow: 150, life: 0.45, color: "#d5962c" });

      if (state.phase === "sudden") {
        endGame(`${capitalize(scorer)} wins sudden death`, "A tower fell first in overtime.");
      }
    }
  }
}

function checkTimer() {
  if (state.timeLeft > 0 || state.gameOver) return;

  const redScore = state.players.red.towersDestroyed;
  const blueScore = state.players.blue.towersDestroyed;

  if (state.phase === "regulation") {
    if (redScore !== blueScore) {
      const winner = redScore > blueScore ? "red" : "blue";
      endGame(`${capitalize(winner)} wins`, "They took more towers before regulation ended.");
    } else {
      state.phase = "sudden";
      state.timeLeft = 60;
      state.effects.push({ x: W / 2, y: H / 2, radius: 30, grow: 210, life: 0.55, color: "#d5962c" });
    }
    return;
  }

  const winner = highestTowerHpWinner();
  if (winner === "draw") {
    endGame("Draw", "Both sides kept the same total tower health.");
  } else {
    endGame(`${capitalize(winner)} wins by HP`, "No tower fell in sudden death, so remaining tower health decided it.");
  }
}

function highestTowerHpWinner() {
  const totals = { red: 0, blue: 0 };
  for (const tower of state.towers) {
    if (tower.alive) totals[tower.side] += Math.max(0, tower.hp);
  }
  if (Math.abs(totals.red - totals.blue) < 1) return "draw";
  return totals.red > totals.blue ? "red" : "blue";
}

function endGame(title, body) {
  state.gameOver = true;
  messageTitleEl.textContent = title;
  messageBodyEl.textContent = body;
  messageEl.classList.remove("hidden");
  updateHud();
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function keepInArena(obj) {
  obj.x = Math.max(28, Math.min(W - 28, obj.x));
  obj.y = Math.max(28, Math.min(H - 28, obj.y));
}

function deploy(side) {
  if (state.gameOver) return;
  const player = state.players[side];
  const card = getCard(player.hand[player.selected]);
  if (!card || player.elixir < card.cost) {
    state.effects.push({ x: player.cursor.x, y: player.cursor.y, radius: 12, grow: 45, life: 0.25, color: "#c94742" });
    return;
  }

  if (card.type !== "spell" && !canDeploy(side, player.cursor.y)) {
    state.effects.push({ x: player.cursor.x, y: player.cursor.y, radius: 14, grow: 55, life: 0.28, color: "#c94742" });
    return;
  }

  player.elixir -= card.cost;
  if (card.type === "spell") {
    castSpell(side, card, player.cursor.x, player.cursor.y);
  } else if (card.type === "building") {
    deployBuilding(side, card, player.cursor.x, player.cursor.y);
  } else {
    deployTroops(side, card, player.cursor.x, player.cursor.y);
  }

  cycleCard(player);
  updateHud();
}

function canDeploy(side, y) {
  if (side === "red") return y > RIVER_Y + 20;
  return y < RIVER_Y - 20;
}

function cycleCard(player) {
  const next = player.deck[player.nextIndex % player.deck.length];
  player.hand[player.selected] = next;
  player.nextIndex += 1;
}

function castSpell(side, card, x, y) {
  const enemySide = side === "red" ? "blue" : "red";
  const targets = [
    ...state.units.filter((unit) => unit.side === enemySide && unit.alive),
    ...state.buildings.filter((building) => building.side === enemySide && building.alive),
    ...state.towers.filter((tower) => tower.side === enemySide && tower.alive),
  ];
  for (const target of targets) {
    if (!canAttackTarget({ type: "spell" }, target)) continue;
    if (Math.hypot(target.x - x, target.y - y) <= card.radius + (target.radius || 10)) {
      target.hp -= card.damage;
      if (card.freeze) target.frozen = Math.max(target.frozen || 0, card.freeze);
    }
  }
  state.effects.push({
    x,
    y,
    radius: card.radius * 0.25,
    grow: 190,
    life: card.freeze ? card.freeze * 0.24 + 0.35 : 0.35,
    color: card.effectColor || (side === "red" ? "#c94742" : "#306fc9"),
  });
}

function deployBuilding(side, card, x, y) {
  state.buildings.push({
    ...card,
    side,
    x,
    y,
    maxHp: card.hp,
    alive: true,
    attackCooldown: 0.25,
  });
  addHitEffect(x, y, side);
}

function deployTroops(side, card, x, y) {
  const offsets = spreadOffsets(card.count, 18);
  for (const offset of offsets) {
    state.units.push({
      ...card,
      side,
      x: x + offset.x,
      y: y + offset.y,
      maxHp: card.hp,
      alive: true,
      attackCooldown: 0.2 + Math.random() * 0.2,
    });
  }
  addHitEffect(x, y, side);
}

function spreadOffsets(count, gap) {
  if (count === 1) return [{ x: 0, y: 0 }];
  if (count === 2) return [{ x: -gap, y: 0 }, { x: gap, y: 0 }];
  return [
    { x: -gap, y: 0 },
    { x: gap, y: 0 },
    { x: 0, y: gap },
  ];
}

function addHitEffect(x, y, side) {
  state.effects.push({
    x,
    y,
    radius: 6,
    grow: 60,
    life: 0.22,
    color: side === "red" ? "#c94742" : "#306fc9",
  });
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  drawArena();
  drawDeploymentZones();
  drawTowers();
  drawBuildings();
  drawUnits();
  drawProjectiles();
  drawEffects();
  drawCursors();
}

function drawArena() {
  ctx.fillStyle = "#92c27d";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "#79b8d8";
  ctx.fillRect(0, RIVER_Y - 22, W, 44);

  ctx.fillStyle = "#caa875";
  roundRect(204, RIVER_Y - 31, 96, 62, 8);
  ctx.fill();
  roundRect(660, RIVER_Y - 31, 96, 62, 8);
  ctx.fill();

  ctx.strokeStyle = "rgba(90, 76, 50, 0.38)";
  ctx.lineWidth = 3;
  ctx.setLineDash([12, 10]);
  ctx.beginPath();
  ctx.moveTo(0, RIVER_Y);
  ctx.lineTo(W, RIVER_Y);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "rgba(255, 250, 240, 0.22)";
  ctx.fillRect(0, 0, W, 88);
  ctx.fillRect(0, H - 88, W, 88);
}

function drawDeploymentZones() {
  ctx.fillStyle = "rgba(48, 111, 201, 0.08)";
  ctx.fillRect(0, 0, W, RIVER_Y - 20);
  ctx.fillStyle = "rgba(201, 71, 66, 0.08)";
  ctx.fillRect(0, RIVER_Y + 20, W, H - RIVER_Y - 20);
}

function drawTowers() {
  for (const tower of state.towers) {
    if (!tower.alive) {
      drawRubble(tower.x, tower.y);
      continue;
    }
    const color = tower.side === "red" ? "#c94742" : "#306fc9";
    ctx.fillStyle = color;
    roundRect(tower.x - tower.radius, tower.y - tower.radius, tower.radius * 2, tower.radius * 2, 6);
    ctx.fill();

    ctx.fillStyle = "#fffaf0";
    ctx.fillRect(tower.x - 9, tower.y - tower.radius - 12, 18, 10);

    drawHpBar(tower.x, tower.y + tower.radius + 10, tower.hp, tower.maxHp, 58);
    drawText(tower.kind === "King" ? "K" : "P", tower.x, tower.y + 5, "#fffaf0", "700 18px system-ui");
  }
}

function drawRubble(x, y) {
  ctx.fillStyle = "rgba(70, 59, 45, 0.45)";
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(x - 18 + i * 9, y + (i % 2) * 7, 6 + (i % 3), 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawBuildings() {
  for (const building of state.buildings) {
    const color = building.side === "red" ? "#a93c38" : "#285aa0";
    ctx.fillStyle = color;
    roundRect(building.x - 18, building.y - 18, 36, 36, 6);
    ctx.fill();
    ctx.fillStyle = "#2a251f";
    ctx.fillRect(building.x - 4, building.y - 24, 8, 18);
    drawHpBar(building.x, building.y + 28, building.hp, building.maxHp, 46);
  }
}

function drawUnits() {
  for (const unit of state.units) {
    const color = unit.side === "red" ? "#c94742" : "#306fc9";
    const lift = unit.flying ? 7 : 0;
    if (unit.flying) {
      ctx.fillStyle = "rgba(38, 33, 26, 0.22)";
      ctx.beginPath();
      ctx.ellipse(unit.x, unit.y + unit.radius * 0.6, unit.radius * 0.9, unit.radius * 0.36, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(unit.x, unit.y - lift, unit.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#fffaf0";
    ctx.lineWidth = 2;
    ctx.stroke();
    if (unit.ranged) {
      ctx.strokeStyle = "#f5df8a";
      ctx.beginPath();
      ctx.moveTo(unit.x - unit.radius * 0.45, unit.y - lift + unit.radius * 0.45);
      ctx.lineTo(unit.x + unit.radius * 0.5, unit.y - lift - unit.radius * 0.5);
      ctx.stroke();
    }
    if (unit.flying) {
      ctx.strokeStyle = "#fffaf0";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(unit.x - unit.radius * 1.2, unit.y - lift);
      ctx.lineTo(unit.x - unit.radius * 0.55, unit.y - lift - unit.radius * 0.35);
      ctx.moveTo(unit.x + unit.radius * 1.2, unit.y - lift);
      ctx.lineTo(unit.x + unit.radius * 0.55, unit.y - lift - unit.radius * 0.35);
      ctx.stroke();
    }
    drawHpBar(unit.x, unit.y - lift + unit.radius + 8, unit.hp, unit.maxHp, 30);
  }
}

function drawProjectiles() {
  for (const projectile of state.projectiles) {
    ctx.fillStyle = projectile.side === "red" ? "#c94742" : "#306fc9";
    ctx.beginPath();
    ctx.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawEffects() {
  for (const effect of state.effects) {
    ctx.strokeStyle = effect.color;
    ctx.globalAlpha = Math.max(0, effect.life / 0.45);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

function drawCursors() {
  drawCursor(state.players.blue, "#306fc9");
  drawCursor(state.players.red, "#c94742");
}

function drawCursor(player, color) {
  const card = getCard(player.hand[player.selected]);
  const allowed = canDeploy(player.side, player.cursor.y);
  ctx.strokeStyle = allowed ? color : "#6c665e";
  ctx.lineWidth = 3;
  ctx.setLineDash(allowed ? [] : [6, 6]);
  ctx.beginPath();
  ctx.arc(player.cursor.x, player.cursor.y, card?.type === "spell" ? card.radius : 24, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  drawText(player.side === "red" ? "A" : "B", player.cursor.x, player.cursor.y + 5, color, "700 16px system-ui");
}

function drawHpBar(x, y, hp, maxHp, width) {
  const pct = Math.max(0, Math.min(1, hp / maxHp));
  ctx.fillStyle = "rgba(36, 32, 26, 0.28)";
  roundRect(x - width / 2, y, width, 7, 4);
  ctx.fill();
  ctx.fillStyle = pct > 0.4 ? "#56a65b" : "#d5962c";
  roundRect(x - width / 2, y, width * pct, 7, 4);
  ctx.fill();
}

function drawText(text, x, y, color, font) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}

function roundRect(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function moveCursor(side, dx, dy) {
  if (state.gameOver) return;
  const cursor = state.players[side].cursor;
  cursor.x += dx;
  cursor.y += dy;
  cursor.x = Math.max(42, Math.min(W - 42, cursor.x));
  cursor.y = Math.max(42, Math.min(H - 42, cursor.y));
}

window.addEventListener("keydown", (event) => {
  if (!state || state.gameOver || !deckPickerEl.classList.contains("hidden") || event.repeat) return;
  const key = event.key.toLowerCase();

  if (["1", "2", "3", "4"].includes(key)) {
    state.players.red.selected = Number(key) - 1;
    updateHud();
    return;
  }
  if (["7", "8", "9", "0"].includes(key)) {
    state.players.blue.selected = key === "0" ? 3 : Number(key) - 7;
    updateHud();
    return;
  }

  const step = event.shiftKey ? 56 : 28;
  if (key === "w") moveCursor("red", 0, -step);
  if (key === "s") moveCursor("red", 0, step);
  if (key === "a") moveCursor("red", -step, 0);
  if (key === "d") moveCursor("red", step, 0);
  if (event.code === "Space") {
    event.preventDefault();
    deploy("red");
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    moveCursor("blue", 0, -step);
  }
  if (event.key === "ArrowDown") {
    event.preventDefault();
    moveCursor("blue", 0, step);
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveCursor("blue", -step, 0);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    moveCursor("blue", step, 0);
  }
  if (event.key === "Enter") {
    event.preventDefault();
    deploy("blue");
  }
});

blueDeckChoicesEl.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-deck-index]");
  if (button) selectDeck("blue", Number(button.dataset.deckIndex));
});

redDeckChoicesEl.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-deck-index]");
  if (button) selectDeck("red", Number(button.dataset.deckIndex));
});

startMatchButton.addEventListener("click", startMatch);
restartButton.addEventListener("click", showDeckPicker);

showDeckPicker();
requestAnimationFrame(loop);
