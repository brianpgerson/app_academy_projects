var Asteroid = require ('./asteroid.js');

var DIM_X = 500;
var DIM_Y = 500;
var NUM_ASTEROIDS = 10;

function Game(){
  this.asteroids = [];
  this.addAsteroids();
}

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid( { pos: this.randomPosition() } ));
  }
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

Game.prototype.move = function (ctx) {
  for (var i = 0; i < this.asteroids.length; i++) {
    this.asteroids[i].move();
  }
};

module.exports = Game;
