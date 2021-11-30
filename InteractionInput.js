class InteractionInput {
  constructor() {
    this.heldInteraction = null;
    this.map = {
      "KeyF": "main",
      "KeyG": "second",
    }
  }

  get interaction() {
    return this.heldInteraction;
  }

  init() {
    document.addEventListener("keydown", e => {
      const interaction = this.map[e.code];
      if (interaction && !this.heldInteraction) {
        this.heldInteraction = interaction;
        console.log(this.heldInteraction);
      }
    });

    document.addEventListener("keyup", e => {
      const interaction = this.map[e.code];
      if (this.heldInteraction && interaction) {
        this.heldInteraction = null;
        console.log(this.heldInteraction);
      }
    });
  }
}
