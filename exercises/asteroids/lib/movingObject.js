function MovingObject(optionsHash){
  this.pos = optionsHash['pos'];
  this.vel = optionsHash['vel'];
  this.radius = optionsHash['radius'];
  this.color = optionsHash['color'];
  this.game = optionsHash['game'];
}

MovingObject.prototype.draw = function(ctx){
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
};

MovingObject.prototype.move = function () {
  var x = this.pos[0] + this.vel[0];
  var y = this.pos[1] + this.vel[1];
  this.pos = this.game.wrap([x, y]);
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  var distance = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]), 2) +
    Math.pow((this.pos[1] - otherObject.pos[1]), 2));
  if (distance <= (this.radius + otherObject.radius)) {
    return true;
  }
  return false;
};

MovingObject.prototype.collideWith = function (otherObject) {};
MovingObject.prototype.relocate = function () {};

module.exports = MovingObject;
