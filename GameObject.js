class GameObject {
  constructor(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      useShadow: config.useShadow,
      size: config.size || 32,
      src: config.src || "images/SnowmanSpritesheet.png",
    });
  }

  update() {

  }
}
