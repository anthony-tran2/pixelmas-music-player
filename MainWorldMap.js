class MainWorldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  drawLowerImage(ctx) {
    ctx.drawImage(this.lowerImage, 0, 0);
  }

  drawUpperImage(ctx) {
    ctx.drawImage(this.upperImage, 0, 0);
  }

  isSpaceTaken(currentX, currentY, direction) {
    const {x,y} = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
    }

  isSpaceButton(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    return this.buttons[`${x},${y}`] || false;
  }
}


window.MainWorldMaps = {
  MainOutdoors: {
    lowerSrc: "./images/MapLower.png",
    upperSrc: "./images/MapUpper.png",
    gameObjects: {
      forward: new GameObject({
        isPlayerControlled: false,
        x: utils.withGrid(6.5),
        y: utils.withGrid(5),
        useShadow: false,
        size: 16,
        src: "./images/forwardButton.png"
      }),
      pause: new GameObject({
        isPlayerControlled: false,
        x: utils.withGrid(5),
        y: utils.withGrid(5),
        useShadow: false,
        size: 16,
        src: "./images/pauseButton.png"
      }),
      backward: new GameObject({
        isPlayerControlled: false,
        x: utils.withGrid(3.5),
        y: utils.withGrid(5),
        useShadow: false,
        size: 16,
        src: "./images/backwardButton.png"
      }),
      snowman: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(0),
        y: utils.withGrid(3),
      })
    },
    buttons: {
      [utils.asGridCoords(4, 3)]: "back",
      [utils.asGridCoords(4, 4)]: "play/pause",
      [utils.asGridCoords(4, 5)]: "play/pause",
      [utils.asGridCoords(4, 6)]: "forward",
    },
    walls: {
      [utils.asGridCoords(0, 0)]: true,
      [utils.asGridCoords(0, 1)]: true,
      [utils.asGridCoords(0, 2)]: true,
      [utils.asGridCoords(0, 4)]: true,
      [utils.asGridCoords(0, 5)]: true,
      [utils.asGridCoords(0, 6)]: true,
      [utils.asGridCoords(0, 7)]: true,
      [utils.asGridCoords(0, 8)]: true,
      [utils.asGridCoords(1, 0)]: true,
      [utils.asGridCoords(1, 5)]: true,
      [utils.asGridCoords(1, 7)]: true,
      [utils.asGridCoords(1, 8)]: true,
      [utils.asGridCoords(2, 8)]: true,
      [utils.asGridCoords(3, 4)]: true,
      [utils.asGridCoords(3, 8)]: true,
      [utils.asGridCoords(4, 4)]: true,
      [utils.asGridCoords(4, 7)]: true,
      [utils.asGridCoords(4, 8)]: true,
      [utils.asGridCoords(5, 4)]: true,
      [utils.asGridCoords(5, 9)]: true,
      [utils.asGridCoords(6, 4)]: true,
      [utils.asGridCoords(6, 9)]: true,
      [utils.asGridCoords(3, 0)]: true,
      [utils.asGridCoords(4, 0)]: true,
      [utils.asGridCoords(5, 0)]: true,
      [utils.asGridCoords(6, 0)]: true,
      [utils.asGridCoords(3, 1)]: true,
      [utils.asGridCoords(4, 1)]: true,
      [utils.asGridCoords(5, 1)]: true,
      [utils.asGridCoords(6, 1)]: true,
      [utils.asGridCoords(3, 2)]: true,
      [utils.asGridCoords(4, 2)]: true,
      [utils.asGridCoords(5, 2)]: true,
      [utils.asGridCoords(6, 2)]: true,
      [utils.asGridCoords(7, -1)]: true,
      [utils.asGridCoords(7, 8)]: true,
      [utils.asGridCoords(2, -1)]: true,
      [utils.asGridCoords(8, 8)]: true,
      [utils.asGridCoords(9, 7)]: true,
      [utils.asGridCoords(9, 6)]: true,
      [utils.asGridCoords(9, 5)]: true,
      [utils.asGridCoords(9, 4)]: true,
      [utils.asGridCoords(9, 1)]: true,
      [utils.asGridCoords(9, 0)]: true,
      [utils.asGridCoords(8, 0)]: true,
      [utils.asGridCoords(8, 4)]: true,
      [utils.asGridCoords(-1, 3)]: true,
      [utils.asGridCoords(10, 2)]: true,
      [utils.asGridCoords(10, 3)]: true,
    }
  }
}
