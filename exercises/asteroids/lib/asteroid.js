var Util = require ('./util.js');
var MovingObject = require ('./movingObject.js');
var Ship = require ('./ship.js');

var COLOR = "#000000";
var RADIUS = 20;

function Asteroid(optionsHash) {
  optionsHash['color'] =  COLOR;
  optionsHash['radius'] =  RADIUS;
  optionsHash['vel'] = Util.prototype.randomVec(2);
  MovingObject.call(this, optionsHash);
}

Util.prototype.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function (otherObject) {
  if (otherObject.color !== "#000000") {
    debugger;
    otherObject.relocate();
  }
};

module.exports = Asteroid;
