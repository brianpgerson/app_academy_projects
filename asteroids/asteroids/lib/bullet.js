var Util = require ('./util.js');
var MovingObject = require ('./movingObject.js');

var COLOR = "#ff0000";
var RADIUS = 5;


function Bullet(optionsHash) {
  optionsHash['color'] =  COLOR;
  optionsHash['radius'] =  RADIUS;
  MovingObject.call(this, optionsHash);
}

Util.prototype.inherits(Bullet, MovingObject);


Bullet.prototype.collideWith = function (otherObject) {
  debugger;

  if (otherObject.color === "#000000") {
    this.game.remove(otherObject);
  }
};


module.exports = Bullet;
