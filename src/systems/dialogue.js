window.Rua777 = window.Rua777 || {};

Rua777.createDialogue = function createDialogue() {
  const state = {
    open: false,
    speaker: "",
    text: "",
    visibleCharacters: 0
  };
  const charactersPerSecond = 32;

  function show(speaker, text) {
    state.open = true;
    state.speaker = speaker;
    state.text = text;
    state.visibleCharacters = 0;
  }

  function close() {
    state.open = false;
  }

  function isComplete() {
    return state.visibleCharacters >= state.text.length;
  }

  function update(deltaTime) {
    if (!state.open || isComplete()) return;
    state.visibleCharacters = Math.min(
      state.text.length,
      state.visibleCharacters + charactersPerSecond * deltaTime
    );
  }

  function advance() {
    if (!state.open) return "closed";
    if (!isComplete()) {
      state.visibleCharacters = state.text.length;
      return "completed";
    }
    close();
    return "closed";
  }

  function draw(context) {
    if (!state.open) return;

    context.fillStyle = "rgba(14, 17, 21, 0.94)";
    context.fillRect(18, 203, 444, 55);
    context.strokeStyle = "#d4c6ab";
    context.strokeRect(18.5, 203.5, 443, 54);

    context.font = "bold 11px monospace";
    context.fillStyle = "#d4c6ab";
    context.fillText(state.speaker, 30, 220);

    context.font = "11px monospace";
    context.fillStyle = "#eef1f4";
    context.fillText(state.text.slice(0, Math.floor(state.visibleCharacters)), 30, 239);

    context.font = "9px monospace";
    context.fillStyle = "#aab3bd";
    context.fillText("E / toque · avançar", 330, 251);
  }

  return {
    show,
    close,
    update,
    advance,
    isComplete,
    draw,
    isOpen() {
      return state.open;
    }
  };
};

Rua777.drawInteractionPrompt = function drawInteractionPrompt(context) {
  context.fillStyle = "rgba(14, 17, 21, 0.88)";
  context.fillRect(176, 169, 128, 20);
  context.strokeStyle = "#d4c6ab";
  context.strokeRect(176.5, 169.5, 127, 19);
  context.font = "10px monospace";
  context.fillStyle = "#eef1f4";
  context.fillText("E / toque — Interagir", 181, 183);
};
