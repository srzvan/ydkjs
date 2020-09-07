function randMax(max) {
  return Math.trunc(1e9 * Math.random()) % max;
}

var reel = {
  symbols: ["♠", "♥", "♦", "♣", "☺", "★", "☾", "☀"],
  spin() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1);
    }
    this.position = (this.position + 100 + randMax(100)) % this.symbols.length;
  },
  display() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1);
    }
    return this.symbols[this.position];
  },
};

var slotMachine = {
  reels: [Object.create(reel), Object.create(reel), Object.create(reel)],
  spin() {
    this.reels.forEach(function spinReel(reel) {
      reel.spin();
    });
  },
  display() {
    let row1 = this.reels.map((reel) => {
      const above = Object.create(reel);
      above.position = above.position === 0 ? above.symbols.length - 1 : (above.position - 1) % above.symbols.length;

      return `${above.display()}`;
    });

    let row2 = this.reels.map((reel) => `${reel.display()}`);

    let row3 = this.reels.map((reel) => {
      const below = Object.create(reel);
      below.position = (below.position + 1) % below.symbols.length;

      return `${below.display()}`;
    });

    return [row1.join(" | "), row2.join(" | "), row3.join(" | ")].join("\n");
  },
};

slotMachine.spin();
console.log(slotMachine.display());
// ☾ | ☀ | ★
// ☀ | ♠ | ☾
// ♠ | ♥ | ☀

slotMachine.spin();
console.log(slotMachine.display());
// ♦ | ♠ | ♣
// ♣ | ♥ | ☺
// ☺ | ♦ | ★
