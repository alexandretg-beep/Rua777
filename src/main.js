(() => {
  const canvas = document.querySelector("#game");

  if (!canvas) {
    throw new Error("Canvas do jogo não encontrado.");
  }

  const game = Rua777.createGame(canvas);
  const updateStep = 1 / 60;
  let previousTime = performance.now();
  let accumulatedTime = 0;

  function frame(currentTime) {
    const elapsedSeconds = (currentTime - previousTime) / 1000;
    const deltaTime = Math.min(elapsedSeconds, Rua777.config.maxDeltaTime);
    previousTime = currentTime;
    accumulatedTime += deltaTime;

    while (accumulatedTime >= updateStep) {
      game.update(updateStep);
      accumulatedTime -= updateStep;
    }

    game.draw();

    requestAnimationFrame(frame);
  }

  game.draw();
  requestAnimationFrame(frame);
})();
