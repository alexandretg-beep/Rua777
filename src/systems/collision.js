window.Rua777 = window.Rua777 || {};

Rua777.collision = {
  intersects(first, second) {
    return (
      first.x < second.x + second.width &&
      first.x + first.width > second.x &&
      first.y < second.y + second.height &&
      first.y + first.height > second.y
    );
  },

  playerBox(player, x = player.x, y = player.y) {
    return {
      x: x + 3,
      y: y + 29,
      width: 12,
      height: 10
    };
  },

  canOccupy(player, x, y, obstacles) {
    const box = this.playerBox(player, x, y);
    return !obstacles.some((obstacle) => this.intersects(box, obstacle));
  }
};
