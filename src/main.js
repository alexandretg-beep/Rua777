(() => {
  const canvas = document.querySelector("#game");

  if (!canvas) {
    throw new Error("Canvas do jogo não encontrado.");
  }

  const game = Rua777.createGame(canvas);
  game.draw();
})();
