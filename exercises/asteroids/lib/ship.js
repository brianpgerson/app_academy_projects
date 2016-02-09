var Util = require ('./util.js');
var MovingObject = require ('./movingObject.js');
var Bullet = require ('./bullet.js');

var COLOR = "#7F00FF";
var RADIUS = 15;

function Ship(optionsHash) {
  optionsHash['color'] =  COLOR;
  optionsHash['radius'] =  RADIUS;
  optionsHash['vel'] = [0, 0];
  MovingObject.call(this, optionsHash);
}

Util.prototype.inherits(Ship, MovingObject);

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0,0];
};

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.fireBullet = function () {
  var bullet = new  Bullet({
    pos: this.pos, vel: [this.vel[0] * 2.5, this.vel[1] * 2.5] , game: this.game
  });
  this.game.addObject(bullet);
};


module.exports = Ship;
