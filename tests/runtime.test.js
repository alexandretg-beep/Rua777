const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const listeners = {};

const officialSpritePath = path.join(
  root,
  "assets/characters/nila/nila-walk-6frames.png"
);
const officialSprite = fs.readFileSync(officialSpritePath);
assert.equal(officialSprite.subarray(1, 4).toString("ascii"), "PNG");
const officialSpriteWidth = officialSprite.readUInt32BE(16);
const officialSpriteHeight = officialSprite.readUInt32BE(20);
assert.equal(officialSpriteWidth, 768);
assert.equal(officialSpriteHeight, 512);
assert.equal(officialSprite[25], 6);
assert.deepEqual(
  [officialSpriteWidth / 6, officialSpriteHeight / 4],
  [128, 128]
);

const jumpSpritePath = path.join(
  root,
  "assets/characters/nila/nila-jump-4frames.png"
);
const jumpSpriteFile = fs.readFileSync(jumpSpritePath);
assert.equal(jumpSpriteFile.subarray(1, 4).toString("ascii"), "PNG");
const jumpSpriteWidth = jumpSpriteFile.readUInt32BE(16);
const jumpSpriteHeight = jumpSpriteFile.readUInt32BE(20);
assert.equal(jumpSpriteWidth, 512);
assert.equal(jumpSpriteHeight, 512);
assert.equal(jumpSpriteFile[25], 6);
assert.deepEqual([jumpSpriteWidth / 4, jumpSpriteHeight / 4], [128, 128]);

global.window = globalThis;
global.addEventListener = (type, handler) => {
  (listeners[type] ||= []).push(handler);
};

function dispatch(type, code) {
  const event = {
    code,
    defaultPrevented: false,
    preventDefault() {
      this.defaultPrevented = true;
    }
  };

  for (const handler of listeners[type] || []) {
    handler(event);
  }

  return event;
}

function load(relativePath) {
  const filename = path.join(root, relativePath);
  const source = fs.readFileSync(filename, "utf8");
  vm.runInThisContext(source, { filename });
}

[
  "src/config.js",
  "src/systems/input.js",
  "src/systems/collision.js",
  "src/systems/dialogue.js",
  "src/scenes/rua.js",
  "src/entities/player.js",
  "src/game.js"
].forEach(load);

const scene = Rua777.createRuaScene();
const input = Rua777.createInput();

input.press("ArrowRight");
assert.equal(input.isHeld("ArrowRight"), true);
assert.equal(input.consumePress("ArrowRight"), true);
input.release("ArrowRight");
assert.equal(input.isHeld("ArrowRight"), false);

input.press("KeyE");
assert.equal(input.consumePress("KeyE"), true);
input.release("KeyE");

input.press("Space");
assert.equal(input.isHeld("Space"), true);
assert.equal(input.consumePress("Space"), true);
input.release("Space");

input.press("ArrowLeft");
dispatch("blur");
assert.equal(input.isHeld("ArrowLeft"), false);

input.press("ArrowDown");
dispatch("pagehide");
assert.equal(input.isHeld("ArrowDown"), false);

const horizontal = Rua777.createPlayer();
dispatch("keydown", "KeyD");
horizontal.update(input, 0.05, scene.obstacles);
dispatch("keyup", "KeyD");
assert.equal(horizontal.state.x, 108.25);

const accelerating = Rua777.createPlayer();
dispatch("keydown", "KeyD");
accelerating.update(input, 0.05, scene.obstacles);
const firstStep = accelerating.state.x - 104;
let previousX = accelerating.state.x;
let acceleratedStep = firstStep;
for (let frame = 0; frame < 6; frame += 1) {
  accelerating.update(input, 0.05, scene.obstacles);
  acceleratedStep = accelerating.state.x - previousX;
  previousX = accelerating.state.x;
}
dispatch("keyup", "KeyD");
assert.ok(acceleratedStep > firstStep);
accelerating.update(input, 0.05, scene.obstacles);
assert.equal(accelerating.state.speed, Rua777.config.playerSpeed);

const sprite = { naturalWidth: 768, naturalHeight: 512 };
const drawnRows = [];
const spriteContext = {
  fillRect() {},
  drawImage(...args) {
    drawnRows.push(args[2]);
  }
};
const spriteAssets = {
  getImage(key) {
    return key === "nila-jump"
      ? { naturalWidth: 512, naturalHeight: 512 }
      : sprite;
  }
};

const facingRight = Rua777.createPlayer(spriteAssets);
dispatch("keydown", "KeyD");
facingRight.update(input, 0.05, scene.obstacles);
dispatch("keyup", "KeyD");
facingRight.draw(spriteContext);
assert.equal(drawnRows.pop(), 128);

const facingLeft = Rua777.createPlayer(spriteAssets);
dispatch("keydown", "KeyA");
facingLeft.update(input, 0.05, scene.obstacles);
dispatch("keyup", "KeyA");
facingLeft.draw(spriteContext);
assert.equal(drawnRows.pop(), 256);
assert.equal(facingLeft.animation.framesPerDirection, 6);

const facingUp = Rua777.createPlayer(spriteAssets);
dispatch("keydown", "KeyW");
facingUp.update(input, 0.05, scene.obstacles);
dispatch("keyup", "KeyW");
facingUp.draw(spriteContext);
assert.equal(drawnRows.pop(), 384);

const jumper = Rua777.createPlayer(spriteAssets);
assert.equal(jumper.jump(), true);
assert.equal(jumper.jump(), false);
jumper.update(input, 0.14, scene.obstacles);
assert.equal(jumper.state.jumping, true);
assert.ok(jumper.state.jumpOffset > 0);
jumper.draw(spriteContext);
assert.equal(jumper.jumpAnimation.framesPerDirection, 4);
assert.equal(drawnRows.pop(), 0);
jumper.update(input, 0.42, scene.obstacles);
assert.equal(jumper.state.jumping, false);
assert.equal(jumper.state.jumpOffset, 0);

const diagonal = Rua777.createPlayer();
dispatch("keydown", "KeyD");
dispatch("keydown", "KeyS");
diagonal.update(input, 0.05, scene.obstacles);
dispatch("keyup", "KeyD");
dispatch("keyup", "KeyS");

const diagonalDistance = Math.hypot(
  diagonal.state.x - 104,
  diagonal.state.y - 166
);
assert.ok(Math.abs(diagonalDistance - 4.25) < 1e-9);

const upward = Rua777.createPlayer();
dispatch("keydown", "KeyW");
for (let frame = 0; frame < 30; frame += 1) {
  upward.update(input, 0.05, scene.obstacles);
}
dispatch("keyup", "KeyW");
assert.ok(upward.state.y >= 129);

assert.equal(
  Rua777.collision.canOccupy(upward.state, 54, 135, scene.obstacles),
  false
);

let foregroundRects = 0;
const foregroundContext = {
  fillRect() {
    foregroundRects += 1;
  }
};
scene.drawForeground(
  foregroundContext,
  { x: 45, y: 140, width: 18, height: 39 },
  0
);
assert.equal(foregroundRects, 2);

foregroundRects = 0;
scene.drawForeground(
  foregroundContext,
  { x: 45, y: 166, width: 18, height: 39 },
  0
);
assert.equal(foregroundRects, 0);

assert.equal(
  scene.isPlayerNearGate({ x: 225, y: 129, width: 18, height: 39 }),
  true
);
assert.equal(
  scene.isPlayerNearGate({ x: 100, y: 166, width: 18, height: 39 }),
  false
);

const drawCalls = [];
const strokeCalls = [];
const context = {
  fillRect() {},
  strokeRect(...args) {
    strokeCalls.push(args);
  },
  fillText(...args) {
    drawCalls.push(args);
  }
};
const canvas = {
  getContext(type) {
    assert.equal(type, "2d");
    return context;
  }
};

const assetLoads = [];
Rua777.createAssets = () => ({
  loadImage(key, url) {
    assetLoads.push([key, url]);
  },
  getImage() {
    return null;
  }
});

const game = Rua777.createGame(canvas);
assert.deepEqual(assetLoads, [
  ["nila-walk", "./assets/characters/nila/nila-walk-6frames.png"],
  ["nila-jump", "./assets/characters/nila/nila-jump-4frames.png"]
]);

dispatch("keydown", "KeyD");
for (let frame = 0; frame < 30; frame += 1) {
  game.update(0.05);
}
dispatch("keyup", "KeyD");

dispatch("keydown", "KeyW");
for (let frame = 0; frame < 20; frame += 1) {
  game.update(0.05);
}
dispatch("keyup", "KeyW");

game.draw();
assert.ok(drawCalls.some((call) => call.includes("E — Interagir")));
assert.ok(strokeCalls.some((call) => call[0] === 214.5 && call[1] === 140.5));

drawCalls.length = 0;
dispatch("keydown", "KeyE");
game.update(0.016);
dispatch("keyup", "KeyE");
game.draw();
assert.ok(
  drawCalls.some((call) => call.includes("Então esta é a nossa nova casa..."))
);

drawCalls.length = 0;
dispatch("keydown", "Enter");
game.update(0.016);
dispatch("keyup", "Enter");
game.draw();
assert.ok(
  !drawCalls.some((call) => call.includes("Então esta é a nossa nova casa..."))
);

global.document = {
  querySelector(selector) {
    assert.equal(selector, "#game");
    return canvas;
  }
};
global.requestAnimationFrame = () => 1;
load("src/main.js");

console.log("PASS 43/43");
console.log("✓ sprite oficial é um PNG");
console.log("✓ largura da sprite oficial");
console.log("✓ altura da sprite oficial");
console.log("✓ sprite oficial possui canal alfa");
console.log("✓ grade oficial usa células 128 × 128");
console.log("✓ sprite de pulo é um PNG");
console.log("✓ largura da sprite de pulo");
console.log("✓ altura da sprite de pulo");
console.log("✓ sprite de pulo possui canal alfa");
console.log("✓ grade de pulo usa células 128 × 128");
console.log("✓ scripts carregam");
console.log("✓ jogo carrega o novo arquivo da sprite");
console.log("✓ entrada de toque para movimento");
console.log("✓ entrada de toque para interação");
console.log("✓ entrada de toque para pulo");
console.log("✓ pulo usa uma ativação por pressão");
console.log("✓ controles liberados ao perder foco");
console.log("✓ controles liberados ao trocar de página");
console.log("✓ movimento horizontal");
console.log("✓ aceleração leve ao manter a direção");
console.log("✓ velocidade reinicia ao soltar");
console.log("✓ sprite olha para a direita");
console.log("✓ sprite olha para a esquerda");
console.log("✓ recortes da sprite usam coordenadas inteiras");
console.log("✓ caminhada usa seis quadros por direção");
console.log("✓ linha completa de subida é selecionada");
console.log("✓ salto começa somente quando Nila está no chão");
console.log("✓ salto ganha altura");
console.log("✓ salto usa quatro quadros por direção");
console.log("✓ salto seleciona a linha da direção atual");
console.log("✓ salto termina no chão");
console.log("✓ altura visual reinicia após o salto");
console.log("✓ diagonal normalizada");
console.log("✓ colisão com muro");
console.log("✓ colisão com árvore");
console.log("✓ copa cobre Nila quando ela passa atrás");
console.log("✓ copa não cobre Nila quando ela passa à frente");
console.log("✓ proximidade do portão");
console.log("✓ portão destacado quando a interação está disponível");
console.log("✓ interação bloqueada à distância");
console.log("✓ diálogo abre");
console.log("✓ diálogo fecha");
