var Asteroid = require ('./asteroid.js');

var DIM_X = 500;
var DIM_Y = 500;
var NUM_ASTEROIDS = 4;

function Game(){
  this.asteroids = [];
  this.addAsteroids();
}

Game.prototype.wrap = function (pos) {
  var x = (pos[0] < 0) ? (DIM_X + pos[0] % DIM_X) : (pos[0] % DIM_X);
  var y = (pos[1] < 0) ? (DIM_Y + pos[1] % DIM_Y) : (pos[1] % DIM_Y);
  return [x,y];
};

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid( { pos: this.randomPosition(), game: this } ));
  }
};

Game.prototype.remove = function(asteroid) {
  this.asteroids =
   this.asteroids.filter(function(el) { return el.pos !== asteroid.pos; } );
};

Game.prototype.checkCollisions = function () {
  for (var i = 0; i < this.asteroids.length; i++) {
    var thisGuy = this.asteroids[i];
    for (var j = i + 1; j < this.asteroids.length; j++) {
      var thatGuy = this.asteroids[j];
      if (thisGuy.isCollidedWith(thatGuy)) {
        thisGuy.collideWith(thatGuy);
      }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.randomPosition = function () {
  var posX = Math.floor(Math.random() * DIM_X);
  var posY = Math.floor(Math.random() * DIM_Y);
  return [posX, posY];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, DIM_X, DIM_Y);
  for (var i = 0; i < this.asteroids.length; i++) {
    this.asteroids[i].draw(ctx);
  }
};

Game.prototype.moveObjects = function (ctx) {
  for (var i = 0; i < this.asteroids.length; i++) {
    this.asteroids[i].move();
  }
};

module.exports = Game;
