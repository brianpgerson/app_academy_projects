var Asteroid = require ('./asteroid.js');
var Ship = require ('./ship.js');

var DIM_X = 500;
var DIM_Y = 500;
var NUM_ASTEROIDS = 5;

function Game(){
  this.asteroids = [];
  this.ship = new Ship({pos: this.randomPosition(), game: this});
  this.addAsteroids();
}

Game.prototype.wrap = function (pos) {
  var x = (pos[0] < 0) ? (DIM_X + pos[0] % DIM_X) : (pos[0] % DIM_X);
  var y = (pos[1] < 0) ? (DIM_Y + pos[1] % DIM_Y) : (pos[1] % DIM_Y);
  return [x,y];
};

Game.prototype.allObjects = function () {
  return this.asteroids.concat(this.ship);
};

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid( {
      pos: this.randomPosition(), game: this
    } ));
  }
};

Game.prototype.remove = function(asteroid) {
  this.asteroids =
   this.asteroids.filter(function(el) { return el.pos !== asteroid.pos; } );
};

Game.prototype.checkCollisions = function () {
  for (var i = 0; i < this.allObjects().length; i++) {
    var thisGuy = this.allObjects()[i];
    for (var j = i + 1; j < this.allObjects().length; j++) {
      var thatGuy = this.allObjects()[j];
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
  for (var i = 0; i < this.allObjects().length; i++) {
    this.allObjects()[i].draw(ctx);
  }
};

Game.prototype.moveObjects = function (ctx) {
  for (var i = 0; i < this.allObjects().length; i++) {
    this.allObjects()[i].move();
  }
};

module.exports = Game;
