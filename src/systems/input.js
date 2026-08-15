window.Rua777 = window.Rua777 || {};

Rua777.createInput = function createInput() {
  const held = new Set();
  const pressed = new Set();
  const gameKeys = new Set([
    "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
    "KeyW", "KeyA", "KeyS", "KeyD",
    "KeyE", "Enter", "Space"
  ]);

  function onKeyDown(event) {
    if (!gameKeys.has(event.code)) return;

    event.preventDefault();

    if (!held.has(event.code)) {
      pressed.add(event.code);
    }

    held.add(event.code);
  }

  function onKeyUp(event) {
    if (!gameKeys.has(event.code)) return;

    event.preventDefault();
    held.delete(event.code);
  }

  function clear() {
    held.clear();
    pressed.clear();
  }

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", clear);

  return {
    isHeld(...codes) {
      return codes.some((code) => held.has(code));
    },

    consumePress(...codes) {
      const code = codes.find((candidate) => pressed.has(candidate));

      if (!code) return false;

      pressed.delete(code);
      return true;
    },

    endFrame() {
      pressed.clear();
    },

    clear
  };
};
