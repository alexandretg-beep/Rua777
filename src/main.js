(() => {
  const canvas = document.querySelector("#game");

  if (!canvas) {
    throw new Error("Canvas do jogo não encontrado.");
  }

  const game = Rua777.createGame(canvas);
  let previousTime = performance.now();

  function frame(currentTime) {
    const elapsedSeconds = (currentTime - previousTime) / 1000;
    const deltaTime = Math.min(elapsedSeconds, Rua777.config.maxDeltaTime);
    previousTime = currentTime;

    game.update(deltaTime);
    game.draw();

    requestAnimationFrame(frame);
  }

  game.draw();
  requestAnimationFrame(frame);
})();
