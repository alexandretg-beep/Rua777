window.Rua777 = window.Rua777 || {};

Rua777.createInput = function createInput() {
  const held = new Set();
  const pressed = new Set();
  const gameKeys = new Set([
    "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
    "KeyW", "KeyA", "KeyS", "KeyD",
    "KeyE", "Enter", "Space"
  ]);

  function press(code) {
    if (!gameKeys.has(code)) return;
    if (!held.has(code)) pressed.add(code);
    held.add(code);
  }

  function release(code) {
    held.delete(code);
  }

  function onKeyDown(event) {
    if (!gameKeys.has(event.code)) return;
    event.preventDefault();
    press(event.code);
  }

  function onKeyUp(event) {
    if (!gameKeys.has(event.code)) return;
    event.preventDefault();
    release(event.code);
  }

  function bindTouchControls() {
    if (
      typeof document === "undefined" ||
      typeof document.querySelectorAll !== "function"
    ) return;

    document.querySelectorAll("[data-input]").forEach((button) => {
      const code = button.dataset.input;

      button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        press(code);
        button.classList.add("is-pressed");
      });

      ["pointerup", "pointercancel", "pointerleave"].forEach((type) => {
        button.addEventListener(type, (event) => {
          event.preventDefault();
          release(code);
          button.classList.remove("is-pressed");
        });
      });
    });
  }

  function clear() {
    held.clear();
    pressed.clear();

    if (
      typeof document !== "undefined" &&
      typeof document.querySelectorAll === "function"
    ) {
      document.querySelectorAll("[data-input].is-pressed").forEach((button) => {
        button.classList.remove("is-pressed");
      });
    }
  }

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", clear);
  bindTouchControls();

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

    press,
    release,
    clear
  };
};
