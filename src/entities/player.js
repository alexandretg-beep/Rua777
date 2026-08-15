window.Rua777 = window.Rua777 || {};

Rua777.createPlayer = function createPlayer() {
  const player = {
    x: 104,
    y: 166,
    width: 18,
    height: 39,
    direction: "down",
    moving: false
  };

  function update(input, deltaTime) {
    let xAxis = 0;
    let yAxis = 0;

    if (input.isHeld("ArrowLeft", "KeyA")) xAxis -= 1;
    if (input.isHeld("ArrowRight", "KeyD")) xAxis += 1;
    if (input.isHeld("ArrowUp", "KeyW")) yAxis -= 1;
    if (input.isHeld("ArrowDown", "KeyS")) yAxis += 1;

    player.moving = xAxis !== 0 || yAxis !== 0;

    if (!player.moving) return;

    if (xAxis !== 0 && yAxis !== 0) {
      const diagonalScale = Math.SQRT1_2;
      xAxis *= diagonalScale;
      yAxis *= diagonalScale;
    }

    if (Math.abs(xAxis) > Math.abs(yAxis)) {
      player.direction = xAxis < 0 ? "left" : "right";
    } else if (yAxis !== 0) {
      player.direction = yAxis < 0 ? "up" : "down";
    }

    const speed = Rua777.config.playerSpeed;
    player.x += xAxis * speed * deltaTime;
    player.y += yAxis * speed * deltaTime;

    player.x = Math.max(0, Math.min(Rua777.config.width - player.width, player.x));
    player.y = Math.max(145, Math.min(Rua777.config.height - player.height, player.y));
  }

  function draw(context) {
    const x = Math.round(player.x);
    const y = Math.round(player.y);

    context.fillStyle = "rgba(18, 20, 23, 0.35)";
    context.fillRect(x + 2, y + 35, 14, 4);

    // Placeholder de Nila: moletom cinza, calça escura e mochila vinho.
    context.fillStyle = "#555b62";
    context.fillRect(x, y, 16, 22);
    context.fillStyle = "#26292e";
    context.fillRect(x + 2, y + 22, 12, 17);
    context.fillStyle = "#6f283b";
    context.fillRect(x + 12, y + 4, 5, 14);
  }

  return { state: player, update, draw };
};
