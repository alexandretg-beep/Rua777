window.Rua777 = window.Rua777 || {};

Rua777.createAssets = function createAssets() {
  const images = new Map();
  const states = new Map();

  function loadImage(id, source) {
    states.set(id, "loading");

    return new Promise((resolve) => {
      const image = new Image();

      image.addEventListener("load", () => {
        images.set(id, image);
        states.set(id, "ready");
        resolve(true);
      });

      image.addEventListener("error", () => {
        states.set(id, "error");
        console.warn(`Asset não carregado: ${source}`);
        resolve(false);
      });

      image.src = source;
    });
  }

  return {
    loadImage,
    getImage(id) {
      return images.get(id) || null;
    },
    getState(id) {
      return states.get(id) || "missing";
    }
  };
};
