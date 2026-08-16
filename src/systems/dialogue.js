window.Rua777 = window.Rua777 || {};

Rua777.createDialogue = function createDialogue() {
  const state = {
    open: false,
    speaker: "",
    text: ""
  };

  function show(speaker, text) {
    state.open = true;
    state.speaker = speaker;
    state.text = text;
  }

  function close() {
    state.open = false;
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
    context.fillText(state.text, 30, 239);

    context.font = "9px monospace";
    context.fillStyle = "#aab3bd";
    context.fillText("E / Enter / Espaço", 340, 251);
  }

  return {
    show,
    close,
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
