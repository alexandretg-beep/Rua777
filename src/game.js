window.Rua777 = window.Rua777 || {};

Rua777.createGame = function createGame(canvas) {
  const context = canvas.getContext("2d");
  context.imageSmoothingEnabled = false;

  function draw() {
    const { width, height } = Rua777.config;

    context.fillStyle = Rua777.config.backgroundColor;
    context.fillRect(0, 0, width, height);

    // Cenário provisório: casa, jardim, calçada e rua.
    context.fillStyle = "#59636b";
    context.fillRect(92, 32, 296, 91);
    context.fillStyle = "#343b42";
    context.fillRect(126, 66, 58, 57);
    context.fillRect(288, 58, 56, 65);

    context.fillStyle = "#3f5d46";
    context.fillRect(0, 123, width, 32);
    context.fillStyle = "#a79f91";
    context.fillRect(0, 155, width, 50);
    context.fillStyle = "#424950";
    context.fillRect(0, 205, width, 65);

    // Placeholder de Nila, sem substituir sua arte oficial.
    context.fillStyle = "#555b62";
    context.fillRect(104, 166, 16, 22);
    context.fillStyle = "#26292e";
    context.fillRect(106, 188, 12, 17);
    context.fillStyle = "#6f283b";
    context.fillRect(116, 170, 5, 14);
  }

  return { draw };
};
