window.Rua777 = window.Rua777 || {};

Rua777.createInput = function createInput() {
  const held = new Set();
  const gameKeys = new Set([
    "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
    "KeyW", "KeyA", "KeyS", "KeyD",
    "KeyE", "Enter", "Space"
  ]);

  function onKeyDown(event) {
    if (gameKeys.has(event.code)) {
      event.preventDefault();
      held.add(event.code);
    }
  }

  function onKeyUp(event) {
    if (gameKeys.has(event.code)) {
      event.preventDefault();
      held.delete(event.code);
    }
  }

  function clear() {
    held.clear();
  }

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", clear);

  return {
    isHeld(...codes) {
      return codes.some((code) => held.has(code));
    },
    clear
  };
};
