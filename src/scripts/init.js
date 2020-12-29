import Snake from "./snake";
import { CANVAS, SCORE_FIELD, START_BUTTON, SNAKE_SPEED } from "./constants";

START_BUTTON.addEventListener("click", function () {
  START_BUTTON.classList.add("hide");
  CANVAS.classList.remove("hide");
  SCORE_FIELD.classList.remove("hide");

  let snake1 = new Snake(5, 10);
  snake1.spawnBait();
  snake1.drawSnake();

  document.addEventListener("keydown", function (event) {
    let pressedKey = event.code;
    let direction;
    switch (pressedKey) {
      case "KeyA":
      case "ArrowLeft":
        direction = "left";
        break;
      case "KeyD":
      case "ArrowRight":
        direction = "right";
        break;
      case "KeyW":
      case "ArrowUp":
        direction = "up";
        break;
      case "KeyS":
      case "ArrowDown":
        direction = "down";
        break;
    }
    snake1.updateDirection(direction);
  });

  let nextFrameTime = Date.now() + SNAKE_SPEED;
  let moveSuccessful = true;

  function init() {
    if (Date.now() > nextFrameTime) {
      moveSuccessful = snake1.moveSnake();
      if (moveSuccessful) {
        SCORE_FIELD.textContent = `Score: ${snake1.score}`;
        nextFrameTime = Date.now() + SNAKE_SPEED;
        requestAnimationFrame(init);
      } else {
        START_BUTTON.classList.remove("hide");
        CANVAS.classList.add("hide");
        SCORE_FIELD.classList.add("hide");
        START_BUTTON.textContent = `Score: ${snake1.score}
        Game Over`;
      }
    } else {
      requestAnimationFrame(init);
    }
  }
  init();
});
