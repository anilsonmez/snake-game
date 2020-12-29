import Cell from "./cell";
import {
  SNAKE_HEAD_COLOR,
  SNAKE_HEAD_BORDER_COLOR,
  SNAKE_COLOR,
  SNAKE_BORDER_COLOR,
  BACKGROUND_COLOR,
  BAIT_COLOR,
  BAIT_BORDER_COLOR,
  TOGGLE_EDGELESS_MODE,
  CTX,
  WIDTH,
  HEIGHT,
  CELL_SIZE,
} from "./constants";

function Snake(headX, headY) {
  this.cells = [];
  this.cellSize = CELL_SIZE;
  this.ctx = CTX;
  this.directionBuffer = [];
  this.prevDirection = "up";
  this.bait;
  this.edgeless = TOGGLE_EDGELESS_MODE.checked;
  this.score = 3;
  this.cells.push(
    new Cell(
      headX * this.cellSize,
      headY * this.cellSize,
      this.cellSize,
      SNAKE_HEAD_COLOR,
      SNAKE_HEAD_BORDER_COLOR,
      this.ctx
    )
  );
  this.cells.push(
    new Cell(
      headX * this.cellSize,
      headY * this.cellSize + this.cellSize,
      this.cellSize,
      SNAKE_COLOR,
      SNAKE_BORDER_COLOR,
      this.ctx
    )
  );
  this.cells.push(
    new Cell(
      headX * this.cellSize,
      headY * this.cellSize + 2 * this.cellSize,
      this.cellSize,
      SNAKE_COLOR,
      SNAKE_BORDER_COLOR,
      this.ctx
    )
  );
}

Snake.prototype.drawSnake = function () {
  //Delete the last snake by filling the canvas with background color
  this.ctx.fillStyle = BACKGROUND_COLOR;
  this.ctx.fillRect(0, 0, WIDTH + this.cellSize, HEIGHT + this.cellSize);
  //Draw the bait
  this.bait.drawCell();
  //Draw every cell of the snake
  for (let i = 0; i < this.cells.length; i++) {
    this.cells[i].drawCell();
  }
};

Snake.prototype.moveSnake = function () {
  //Store the position of the last cell
  let lastCellX = this.cells[this.cells.length - 1].x;
  let lastCellY = this.cells[this.cells.length - 1].y;
  //Starting from the back of the snake, move every cell except the head cell to the position of the next cell
  for (let i = this.cells.length - 1; i > 0; i--) {
    this.cells[i].moveCell(this.cells[i - 1].x, this.cells[i - 1].y);
  }
  //Move the head cell according to the current direction
  let headCell = this.cells[0];
  let direction = this.directionBuffer.pop();
  if (direction === undefined) {
    direction = this.prevDirection;
  } else {
    this.prevDirection = direction;
  }
  switch (direction) {
    case "up":
      headCell.y -= this.cellSize;
      break;
    case "down":
      headCell.y += this.cellSize;
      break;
    case "right":
      headCell.x += this.cellSize;
      break;
    case "left":
      headCell.x -= this.cellSize;
      break;
  }
  //Check if any collision occured after the movement
  if (!this.collisionDetection()) {
    //If the bait is eaten create a new bait
    if (this.baitEaten()) {
      this.score++;
      this.cells.push(
        new Cell(
          lastCellX,
          lastCellY,
          this.cellSize,
          SNAKE_COLOR,
          SNAKE_BORDER_COLOR,
          this.ctx
        )
      );
      this.spawnBait();
    }
    this.drawSnake();
    //Returnin true means the movement is legal
    return true;
  } else {
    //Collision occured and game over
    return false;
  }
};

Snake.prototype.updateDirection = function (direction) {
  if (
    direction === undefined ||
    (direction === "up" && this.prevDirection === "down") ||
    (direction === "down" && this.prevDirection === "up") ||
    (direction === "right" && this.prevDirection === "left") ||
    (direction === "left" && this.prevDirection === "right")
  ) {
    return;
  }
  this.directionBuffer.unshift(direction);
};

Snake.prototype.collisionDetection = function () {
  let headCell = this.cells[0];
  //If headCell collided with any other cell, collision hapened
  for (let i = 1; i < this.cells.length; i++) {
    if (headCell.x === this.cells[i].x && headCell.y === this.cells[i].y) {
      //Collision hapened
      return true;
    }
  }
  //If headCell has gone out of the play field
  if (
    headCell.x < 0 ||
    headCell.x > WIDTH ||
    headCell.y < 0 ||
    headCell.y > HEIGHT
  ) {
    //If edgeless mode is off then collision hapened
    if (!this.edgeless) {
      return true;
    }
    //If edgeless mode is on calculate the headCell position
    else {
      if (headCell.x < 0) {
        headCell.x = WIDTH;
      } else if (headCell.x > WIDTH) {
        headCell.x = 0;
      } else if (headCell.y < 0) {
        headCell.y = HEIGHT;
      } else if (headCell.y > HEIGHT) {
        headCell.y = 0;
      }
      //No collision happened
      return false;
    }
  }
  //Snake neither collided with itself nor reached the end of the play field
  return false;
};

Snake.prototype.spawnBait = function () {
  let baitX;
  let baitY;
  let baitPosition = true;
  //TODO: This while loop may take too much time if the snake is covering up most of the playing field
  do {
    baitPosition = true;
    baitX = this.cellSize * Math.floor((Math.random() * WIDTH) / this.cellSize);
    baitY =
      this.cellSize * Math.floor((Math.random() * HEIGHT) / this.cellSize);
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i].x === baitX && this.cells[i].y === baitY) {
        baitPosition = false;
      }
    }
  } while (!baitPosition);
  this.bait = new Cell(
    baitX,
    baitY,
    this.cellSize,
    BAIT_COLOR,
    BAIT_BORDER_COLOR,
    this.ctx
  );
};

Snake.prototype.baitEaten = function () {
  //If the head of the snake and the bait are in the same position, bait is eaten
  if (this.cells[0].x === this.bait.x && this.cells[0].y === this.bait.y) {
    return true;
  } else {
    return false;
  }
};

export default Snake;
