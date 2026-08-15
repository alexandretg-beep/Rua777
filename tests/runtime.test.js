const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const listeners = {};

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

const horizontal = Rua777.createPlayer();
dispatch("keydown", "KeyD");
horizontal.update(input, 0.05, scene.obstacles);
dispatch("keyup", "KeyD");
assert.equal(horizontal.state.x, 108.25);

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

assert.equal(
  scene.isPlayerNearGate({ x: 225, y: 129, width: 18, height: 39 }),
  true
);
assert.equal(
  scene.isPlayerNearGate({ x: 100, y: 166, width: 18, height: 39 }),
  false
);

const drawCalls = [];
const context = {
  fillRect() {},
  strokeRect() {},
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

const game = Rua777.createGame(canvas);

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

console.log("PASS 9/9");
console.log("✓ scripts carregam");
console.log("✓ movimento horizontal");
console.log("✓ diagonal normalizada");
console.log("✓ colisão com muro");
console.log("✓ colisão com árvore");
console.log("✓ proximidade do portão");
console.log("✓ interação bloqueada à distância");
console.log("✓ diálogo abre");
console.log("✓ diálogo fecha");
