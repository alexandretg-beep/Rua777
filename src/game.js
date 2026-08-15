window.Rua777 = window.Rua777 || {};

Rua777.createGame = function createGame(canvas) {
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Contexto 2D do canvas não está disponível.");
  }

  context.imageSmoothingEnabled = false;

  const input = Rua777.createInput();
  const player = Rua777.createPlayer();

  function update(deltaTime) {
    player.update(input, deltaTime);
  }

  function drawScene() {
    const { width, height } = Rua777.config;

    context.fillStyle = Rua777.config.backgroundColor;
    context.fillRect(0, 0, width, height);

    // Cenário provisório: casa, jardim, calçada e rua.
    context.fillStyle = "#59636b";
    context.fillRect(92, 32, 296, 91);
    context.fillStyle = "#343b42";
    context.fillRect(126, 66, 58, 57);
    context.fillRect(288, 58, 56, 65);

    context.fillStyle = "#3f5d46";
    context.fillRect(0, 123, width, 32);
    context.fillStyle = "#a79f91";
    context.fillRect(0, 155, width, 50);
    context.fillStyle = "#424950";
    context.fillRect(0, 205, width, 65);
  }

  function draw() {
    drawScene();
    player.draw(context);
  }

  return { update, draw };
};
