window.Rua777 = window.Rua777 || {};

Rua777.createGame = function createGame(canvas) {
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Contexto 2D do canvas não está disponível.");

  context.imageSmoothingEnabled = false;

  const assets = Rua777.createAssets
    ? Rua777.createAssets()
    : { getImage() { return null; } };

  if (assets.loadImage) {
    assets.loadImage("nila-walk", "./assets/characters/nila/nila-walk-6frames.png");
    assets.loadImage("nila-jump", "./assets/characters/nila/nila-jump-4frames.png");
  }

  const input = Rua777.createInput();
  const scene = Rua777.createRuaScene();
  const player = Rua777.createPlayer(assets);
  const dialogue = Rua777.createDialogue();
  const interactionButton = typeof document !== "undefined"
    ? document.querySelector('[data-input="KeyE"]')
    : null;
  let nearGate = false;
  let elapsedTime = 0;
  let lastInteractionAvailable = null;

  function syncInteractionButton() {
    if (!interactionButton) return;
    const available = nearGate && !player.state.jumping && !dialogue.isOpen();
    if (available === lastInteractionAvailable) return;
    lastInteractionAvailable = available;
    interactionButton.classList.toggle("is-available", available);
    interactionButton.setAttribute("aria-disabled", String(!available));
  }

  function update(deltaTime) {
    elapsedTime += deltaTime;
    if (dialogue.isOpen()) {
      player.stop();
      if (input.consumePress("KeyE", "Enter", "Space")) dialogue.close();
    } else {
      if (input.consumePress("Space")) player.jump();
      player.update(input, deltaTime, scene.obstacles);
      nearGate = scene.isPlayerNearGate(player.state);
      if (nearGate && !player.state.jumping && input.consumePress("KeyE")) {
        dialogue.show("Nila", "Então esta é a nossa nova casa...");
      }
    }
    syncInteractionButton();
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
