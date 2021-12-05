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

    this.pauseOrPlay = 'pause';

    this.directionUpdate = {
      "up": ["y", -1],
      "down": ["y", 1],
      "left": ["x", -1],
      "right": ["x", 1]
    }

    this.songs = ['Carol Of The Bells - Pentatonix', 'Frosty The Snowman - Pentatonix', 'I Just Called To Say I Love You - Pentatonix', 'I Saw Three Ships - Pentatonix', "I'll Be Home For Christmas - Michael Bublé", "It's Beginning To Look A Lot Like Christmas - Michael Bublé", 'We Wish You A Merry Christmas - Pentatonix', 'White Christmas - Michael Bublé', 'Winter Wonderland - Michael Bublé', 'Wonderful Christmas Pentatonix'];
  }

  update(state) {
    if (state.arrow) this.lastDirection = state.arrow;
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else if (this.heldInteraction) {
      if (!this.beingHeld) {
        this.buttonInteraction(state.map.isSpaceButton(this.x, this.y, this.lastDirection), state);
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

  buttonInteraction(button, state) {
  const song = document.querySelector('audio');
  if (button === "back" && this.heldInteraction === "main") {
    this.songs.unshift(this.songs.splice(this.songs.length - 1, 1)[0]);
    song.src = `./songs/${this.songs[0]}.mp3`;
    if (this.pauseOrPlay === 'pause') {
      this.pauseOrPlay = 'play';
      state.map.gameObjects.pause.sprite.currentAnimation = "idle-down";
    }
    song.play();
  } else if (button === "back" && this.heldInteraction === "second") {
    console.log('rewind');
  } else if (button === "forward" && this.heldInteraction === "main") {
    this.songs.push(this.songs.splice(0, 1)[0]);
    song.src = `./songs/${this.songs[0]}.mp3`;
    if (this.pauseOrPlay === 'pause') {
      this.pauseOrPlay = 'play';
      state.map.gameObjects.pause.sprite.currentAnimation = "idle-down";
    }
    song.play();
  } else if (button === "forward" && this.heldInteraction === "second") {
    console.log('fast forward');
  } else if (button === "play/pause") {
    if (this.pauseOrPlay === 'play') {
      song.pause();
      this.pauseOrPlay = 'pause';
      state.map.gameObjects.pause.sprite.currentAnimation = "idle-right";
    } else if (this.pauseOrPlay === 'pause') {
      song.play();
      this.pauseOrPlay = 'play';
      state.map.gameObjects.pause.sprite.currentAnimation = "idle-down";
    }
  }
  this.beingHeld = true;
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
        this.beingHeld = false;
      }
  });
}
}
