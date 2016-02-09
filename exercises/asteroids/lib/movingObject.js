function MovingObject(optionsHash){
  this.pos = optionsHash['pos'];
  this.vel = optionsHash['vel'];
  this.radius = optionsHash['radius'];
  this.color = optionsHash['color'];
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
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
};

module.exports = MovingObject;
