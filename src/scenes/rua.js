window.Rua777 = window.Rua777 || {};

Rua777.createRuaScene = function createRuaScene() {
  const obstacles = Object.freeze([
    { id: "muro-esquerdo", x: 0, y: 145, width: 216, height: 13 },
    { id: "portao", x: 216, y: 142, width: 48, height: 16 },
    { id: "muro-direito", x: 264, y: 145, width: 216, height: 13 },
    { id: "arvore", x: 54, y: 164, width: 14, height: 22 }
  ]);

  const gateInteraction = Object.freeze({
    x: 205,
    y: 155,
    width: 70,
    height: 35
  });

  function isPlayerNearGate(player) {
    return Rua777.collision.intersects(
      Rua777.collision.playerBox(player),
      gateInteraction
    );
  }

  function drawTreeCanopy(context, elapsedTime) {
    const leafOffset = Math.round(Math.sin(elapsedTime * 1.8));

    context.fillStyle = "#304d36";
    context.fillRect(39 + leafOffset, 130, 44, 40);
    context.fillStyle = "#3b6042";
    context.fillRect(45 - leafOffset, 124, 30, 18);
  }

  function draw(context, elapsedTime = 0) {
    const { width, height } = Rua777.config;

    context.fillStyle = Rua777.config.backgroundColor;
    context.fillRect(0, 0, width, height);

    // Casa provisória.
    context.fillStyle = "#59636b";
    context.fillRect(92, 32, 296, 91);
    context.fillStyle = "#343b42";
    context.fillRect(126, 66, 58, 57);
    context.fillRect(288, 58, 56, 65);

    // Jardim, calçada e rua.
    context.fillStyle = "#3f5d46";
    context.fillRect(0, 123, width, 32);
    context.fillStyle = "#a79f91";
    context.fillRect(0, 155, width, 50);
    context.fillStyle = "#424950";
    context.fillRect(0, 205, width, 65);

    // Muro e portão.
    context.fillStyle = "#77746d";
    context.fillRect(0, 145, 216, 13);
    context.fillRect(264, 145, 216, 13);
    context.fillStyle = "#4a4038";
    context.fillRect(216, 142, 48, 16);
    context.fillStyle = "#837567";
    for (let x = 220; x < 264; x += 8) {
      context.fillRect(x, 144, 3, 14);
    }

    // Árvore provisória: somente a copa se move; tronco e colisão ficam fixos.
    drawTreeCanopy(context, elapsedTime);
    context.fillStyle = "#594536";
    context.fillRect(54, 156, 14, 30);

    if (Rua777.config.debug) {
      context.strokeStyle = "#ff4d6d";
      obstacles.forEach((obstacle) => {
        context.strokeRect(
          obstacle.x + 0.5,
          obstacle.y + 0.5,
          obstacle.width - 1,
          obstacle.height - 1
        );
      });

      context.strokeStyle = "#ffe66d";
      context.strokeRect(
        gateInteraction.x + 0.5,
        gateInteraction.y + 0.5,
        gateInteraction.width - 1,
        gateInteraction.height - 1
      );
    }
  }

  function drawGateHint(context, elapsedTime = 0) {
    const pulse = (Math.sin(elapsedTime * 4) + 1) / 2;
    const alpha = (0.5 + pulse * 0.35).toFixed(2);
    const previousStrokeStyle = context.strokeStyle;
    const previousLineWidth = context.lineWidth;

    context.strokeStyle = `rgba(255, 226, 150, ${alpha})`;
    context.lineWidth = 2;
    context.strokeRect(214.5, 140.5, 51, 19);

    context.strokeStyle = previousStrokeStyle;
    context.lineWidth = previousLineWidth;
  }

  function drawForeground(context, player, elapsedTime = 0) {
    const overlapsCanopy = (
      player.x + player.width > 39 &&
      player.x < 83 &&
      player.y + player.height <= 186
    );

    if (overlapsCanopy) drawTreeCanopy(context, elapsedTime);
  }

  return { obstacles, isPlayerNearGate, draw, drawGateHint, drawForeground };
};
