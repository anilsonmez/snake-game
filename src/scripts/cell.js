function Cell(x, y, size, color, borderColor, ctx) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = color;
  this.borderColor = borderColor;
  this.ctx = ctx;
}

Cell.prototype.drawCell = function () {
  this.ctx.fillStyle = this.borderColor;
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x + 1, this.y + 1, this.size - 2, this.size - 2);
};

Cell.prototype.moveCell = function (xNext, yNext) {
  //Moves the cell for length in the direction
  this.x = xNext;
  this.y = yNext;
  return this;
};

export default Cell;
