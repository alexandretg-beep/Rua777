window.Rua777 = window.Rua777 || {};

Rua777.createGame = function createGame(canvas) {
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Contexto 2D do canvas não está disponível.");
  }

  context.imageSmoothingEnabled = false;

  const input = Rua777.createInput();
  const scene = Rua777.createRuaScene();
  const player = Rua777.createPlayer();

  function update(deltaTime) {
    player.update(input, deltaTime, scene.obstacles);
  }

  function draw() {
    scene.draw(context);
    player.draw(context);
  }

  return { update, draw };
};
