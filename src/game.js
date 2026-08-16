window.Rua777 = window.Rua777 || {};

Rua777.createGame = function createGame(canvas) {
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Contexto 2D do canvas não está disponível.");

  context.imageSmoothingEnabled = false;

  const assets = Rua777.createAssets
    ? Rua777.createAssets()
    : { getImage() { return null; } };

  if (assets.loadImage) {
    assets.loadImage("nila-walk", "./assets/characters/nila/nila-walk.png?v=2");
  }

  const input = Rua777.createInput();
  const scene = Rua777.createRuaScene();
  const player = Rua777.createPlayer(assets);
  const dialogue = Rua777.createDialogue();
  let nearGate = false;
  let elapsedTime = 0;

  function update(deltaTime) {
    elapsedTime += deltaTime;
    if (dialogue.isOpen()) {
      player.stop();
      if (input.consumePress("KeyE", "Enter", "Space")) dialogue.close();
    } else {
      player.update(input, deltaTime, scene.obstacles);
      nearGate = scene.isPlayerNearGate(player.state);
      if (nearGate && input.consumePress("KeyE")) {
        dialogue.show("Nila", "Então esta é a nossa nova casa...");
      }
    }
    input.endFrame();
  }

  function draw() {
    scene.draw(context, elapsedTime);
    if (nearGate && !dialogue.isOpen()) scene.drawGateHint(context, elapsedTime);
    player.draw(context);
    scene.drawForeground(context, player.state, elapsedTime);
    if (nearGate && !dialogue.isOpen()) Rua777.drawInteractionPrompt(context);
    dialogue.draw(context);
  }

  return { update, draw };
};
