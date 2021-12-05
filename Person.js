class Person extends GameObject {
  constructor(config) {
    super(config);
    this.movingProgressRemaining = 0;

    this.isPlayerControlled = config.isPlayerControlled || false;

    this.map = {
      "KeyF": "main",
      "KeyG": "second",
    };

    this.heldInteraction = null;

    this.directionUpdate = {
      "up": ["y", -1],
      "down": ["y", 1],
      "left": ["x", -1],
      "right": ["x", 1]
    }
  }

  update(state) {
    if (state.arrow) this.lastDirection = state.arrow;
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else if (this.heldInteraction) {
      const button = state.map.isSpaceButton(this.x, this.y, this.lastDirection);
      if (button === "back" && this.heldInteraction === "main") {
        console.log('skip back');
      } else if (button === "back" && this.heldInteraction === "second") {
        console.log('rewind');
      } else if (button === "forward" && this.heldInteraction === "main") {
        console.log('skip forward');
      } else if (button === "forward" && this.heldInteraction === "second") {
        console.log('fast forward');
      } else if (button === "play/pause") {
        if (this.pauseOrPlay === 'play') {
          console.log('pause');
          this.pauseOrPlay = 'pause';
        } else if (this.pauseOrPlay === 'pause') {
          console.log('play');
          this.pauseOrPlay = 'play';
        }
      }
    } else {
      if (this.isPlayerControlled && state.arrow) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow
        })
      }
      this.updaetSprite(state);
    }

  }

  startBehavior(state, behavior) {
    this.direction = behavior.direction;
    if (behavior.type === "walk") {
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        return;
      }
      this.movingProgressRemaining = 16;
    }
  }

  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaining -= 1;
    }
  }

  updaetSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation(`walk-${this.direction}`);
      return;
    }
    this.sprite.setAnimation(`idle-${this.direction}`);
  }

  buttonsInit() {
    document.addEventListener("keydown", e => {
      const interaction = this.map[e.code];
      if (interaction && !this.heldInteraction) {
        this.heldInteraction = interaction;
      }
    });

    document.addEventListener("keyup", e => {
      const interaction = this.map[e.code];
      if (this.heldInteraction && interaction) {
        this.heldInteraction = null;
      }
  });
}
}
