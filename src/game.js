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
  const dialogue = Rua777.createDialogue();
  let nearGate = false;

  function update(deltaTime) {
    if (dialogue.isOpen()) {
      player.stop();

      if (input.consumePress("KeyE", "Enter", "Space")) {
        dialogue.close();
      }
    } else {
      player.update(input, deltaTime, scene.obstacles);
      nearGate = scene.isPlayerNearGate(player.state);

      if (nearGate && input.consumePress("KeyE")) {
        // Texto provisório: não altera o cânone sem aprovação.
        dialogue.show("Nila", "Então esta é a nossa nova casa...");
      }
    }

    input.endFrame();
  }

  function draw() {
    scene.draw(context);
    player.draw(context);

    if (nearGate && !dialogue.isOpen()) {
      Rua777.drawInteractionPrompt(context);
    }

    dialogue.draw(context);
  }

  return { update, draw };
};
