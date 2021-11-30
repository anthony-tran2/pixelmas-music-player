class Person extends GameObject {
  constructor(config) {
    super(config);
    this.movingProgressRemaining = 0;

    this.isPlayerControlled = config.isPlayerControlled || false;

    this.directionUpdate = {
      "up": ["y", -1],
      "down": ["y", 1],
      "left": ["x", -1],
      "right": ["x", 1]
    }

    this.rewindProgress = 0;
    this.pauseOrPlay = "pause";
  }

  update(state) {
    const isButton = state.map.isSpaceButton(this.x, this.y, this.direction);
    if (this.movingProgressRemaining > 0){
      this.updatePosition();
    } else {
      if (this.isPlayerControlled && state.arrow) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow
        })
      }
      this.updateSprite(state);
    }

    if (this.rewindProgress > 0) {
      this.updateTime();
    } else {
      if (this.isPlayerControlled && state.interaction) {
        if (isButton && state.interaction) {
          if (isButton === "play/pause") {
            if (this.pauseOrPlay === "pause") {
              console.log('play');
            } else {
              console.log('pause');
            }
          } else if (isButton === "back") {
            if (state.interaction === "main") {
              console.log('backtrack');
            } else {
              console.log('rewind');
          }
          }
        }

        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow
        })
      }
      this.updateSprite(state);
    }

  }

  startBehavior(state, behavior) {
    this.direction = behavior.direction;
    if (behavior.type === "walk") {
      if (state.map.isSpaceTaken(this.x, this.y, this.direction) || state.interaction) {
        return;
      }
      this.movingProgressRemaining = 16;
    }
  }

  updatePosition () {
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaining -=1;
    }
  }

  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation(`walk-${this.direction}`);
      return;
    }
    this.sprite.setAnimation(`idle-${this.direction}`);
  }

  // startBehavior(state, behavior) {
  //   this.direction = behavior.direction;
  //   if (behavior.type === "walk") {
  //     if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
  //       return;
  //     }
  //     this.movingProgressRemaining = 16;
  //   }
  // }

  updateTime() {
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaining -= 1;
    }
  }

  // updaetSprite() {
  //   if (this.movingProgressRemaining > 0) {
  //     this.sprite.setAnimation(`walk-${this.direction}`);
  //     return;
  //   }
  //   this.sprite.setAnimation(`idle-${this.direction}`);
  // }
}
