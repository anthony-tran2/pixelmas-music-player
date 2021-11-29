class Sprite {
  constructor(config) {
    this.image = new Image();
    this.image.src = config.src;
    this.size = config.size;
    this.image.onload = () => {
      this.isLoaded = true;
    }

    this.useShadow = config.useShadow === undefined ? true : config.useShadow;
    if (this.useShadow) {
      this.shadow = new Image();
      this.shadow.src = config.shadowSrc || "./images/shadow.png";
      this.shadow.onload = () => {
        this.isShadowLoaded = true;
      }
    }

    this.animations = config.animations || {
      "idle-up": [ [0,2] ],
      "idle-down": [ [0,0] ],
      "idle-left": [ [0,3] ],
      "idle-right": [ [0,1] ],
      "walk-up": [ [1,2], [0,2], [3,2], [0,2] ],
      "walk-down": [ [1,0], [0,0], [3,0], [0,0] ],
      "walk-left": [ [1,3], [0,3], [3,3], [0,3] ],
      "walk-right": [ [1,1], [0,1], [3,1], [0,1] ],
    }
    this.currentAnimation = config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 16;
    this.animationFrameProgress = this.animationFrameLimit;

    this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame++;

    if(this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx) {
    const x = this.gameObject.x - 9;
    const y = this.gameObject.y - 18;

    this.isShadowLoaded && this.useShadow && ctx.drawImage(this.shadow, x, y)

    const [frameX, frameY] = this.frame;

    this.isLoaded && ctx.drawImage(
      this.image,
      frameX * this.size, frameY * this.size,
      this.size,this.size,
      x,y,
      this.size,this.size
      )
      this.updateAnimationProgress();
  }
}
