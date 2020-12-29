export const CELL_SIZE = 20;
export const SNAKE_HEAD_COLOR = "rgba(218, 60, 61, 1)";
export const SNAKE_HEAD_BORDER_COLOR = "rgba(218, 60, 61, 1)";
export const SNAKE_COLOR = "rgba(62, 186, 155, 1)";
export const SNAKE_BORDER_COLOR = "rgba(245, 228, 172, 1)";
export const BACKGROUND_COLOR = "rgba(245, 228, 172, 1)";
export const SNAKE_SPEED = 100;
export const BAIT_COLOR = "rgba(30, 4, 19, 1)";
export const BAIT_BORDER_COLOR = "rgba(245, 228, 172, 1)";
export const CANVAS = document.querySelector("canvas");
export const CTX = CANVAS.getContext("2d");
export const SCORE_FIELD = document.querySelector(".score-field");
export const START_BUTTON = document.querySelector(".start-button");
export const TOGGLE_EDGELESS_MODE = document.querySelector(
  'input[value="edgeless"]'
);
export const WIDTH = CANVAS.width - CELL_SIZE;
export const HEIGHT = CANVAS.height - CELL_SIZE;
