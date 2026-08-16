window.Rua777 = window.Rua777 || {};

Rua777.createPlayer = function createPlayer(assets) {
  const player = {
    x: 104,
    y: 166,
    width: 18,
    height: 39,
    direction: "down",
    moving: false,
    speed: Rua777.config.playerSpeed
  };

  const animation = {
    frame: 0,
    elapsed: 0,
    frameDuration: 0.14,
    framesPerDirection: 6
  };

  const directionRow = Object.freeze({ down: 0, right: 1, left: 2, up: 3 });
  let movingTime = 0;

  function stop() {
    player.moving = false;
    player.speed = Rua777.config.playerSpeed;
    movingTime = 0;
    animation.frame = 0;
    animation.elapsed = 0;
  }

  function updateAnimation(deltaTime) {
    if (!player.moving) {
      animation.frame = 0;
      animation.elapsed = 0;
      return;
    }

    const speedRatio = player.speed / Rua777.config.playerSpeed;
    const currentFrameDuration = animation.frameDuration / speedRatio;
    animation.elapsed += deltaTime;
    while (animation.elapsed >= currentFrameDuration) {
      animation.elapsed -= currentFrameDuration;
      animation.frame = (animation.frame + 1) % animation.framesPerDirection;
    }
  }

  function update(input, deltaTime, obstacles) {
    let xAxis = 0;
    let yAxis = 0;

    if (input.isHeld("ArrowLeft", "KeyA")) xAxis -= 1;
    if (input.isHeld("ArrowRight", "KeyD")) xAxis += 1;
    if (input.isHeld("ArrowUp", "KeyW")) yAxis -= 1;
    if (input.isHeld("ArrowDown", "KeyS")) yAxis += 1;

    player.moving = xAxis !== 0 || yAxis !== 0;
    if (!player.moving) {
      stop();
      return;
    }

    const accelerationProgress = Math.min(
      movingTime / Rua777.config.playerAccelerationTime,
      1
    );
    const easedProgress = accelerationProgress * (2 - accelerationProgress);
    player.speed = Rua777.config.playerSpeed + (
      Rua777.config.playerMaxSpeed - Rua777.config.playerSpeed
    ) * easedProgress;
    updateAnimation(deltaTime);
    movingTime += deltaTime;

    if (xAxis !== 0 && yAxis !== 0) {
      xAxis *= Math.SQRT1_2;
      yAxis *= Math.SQRT1_2;
    }

    if (Math.abs(xAxis) > Math.abs(yAxis)) {
      player.direction = xAxis < 0 ? "left" : "right";
    } else if (yAxis !== 0) {
      player.direction = yAxis < 0 ? "up" : "down";
    }

    const distance = player.speed * deltaTime;
    const nextX = Math.max(0, Math.min(
      Rua777.config.width - player.width,
      player.x + xAxis * distance
    ));

    if (Rua777.collision.canOccupy(player, nextX, player.y, obstacles)) {
      player.x = nextX;
    }

    const nextY = Math.max(108, Math.min(
      Rua777.config.height - player.height,
      player.y + yAxis * distance
    ));

    if (Rua777.collision.canOccupy(player, player.x, nextY, obstacles)) {
      player.y = nextY;
    }
  }

  function drawPlaceholder(context, x, y) {
    context.fillStyle = "#555b62";
    context.fillRect(x, y, 16, 22);
    context.fillStyle = "#26292e";
    context.fillRect(x + 2, y + 22, 12, 17);
    context.fillStyle = "#6f283b";
    context.fillRect(x + 12, y + 4, 5, 14);
  }

  function draw(context) {
    const x = Math.round(player.x);
    const y = Math.round(player.y);

    context.fillStyle = "rgba(18, 20, 23, 0.35)";
    context.fillRect(x + 2, y + 35, 14, 4);

    const sprite = assets && assets.getImage("nila-walk");
    if (sprite) {
      const sourceWidth = Math.floor(sprite.naturalWidth / animation.framesPerDirection);
      const sourceHeight = Math.floor(sprite.naturalHeight / 4);
      const destinationWidth = 72;
      const destinationHeight = 80;

      context.drawImage(
        sprite,
        animation.frame * sourceWidth,
        directionRow[player.direction] * sourceHeight,
        sourceWidth,
        sourceHeight,
        Math.round(player.x + player.width / 2 - destinationWidth / 2),
        Math.round(player.y + player.height - destinationHeight),
        destinationWidth,
        destinationHeight
      );
    } else {
      drawPlaceholder(context, x, y);
    }

    if (Rua777.config.debug) {
      const box = Rua777.collision.playerBox(player);
      context.strokeStyle = "#4de1ff";
      context.strokeRect(box.x + 0.5, box.y + 0.5, box.width - 1, box.height - 1);
    }
  }

  return { state: player, animation, stop, update, draw };
};
