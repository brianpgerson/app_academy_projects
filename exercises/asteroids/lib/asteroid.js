var Util = require ('./util.js');
var MovingObject = require ('./movingObject.js');

var COLOR = "FFFFFF";
var RADIUS = 20;

function Asteroid(optionsHash) {
  optionsHash['color'] =  COLOR;
  optionsHash['radius'] =  RADIUS;
  optionsHash['vel'] = Util.prototype.randomVec(2);
  MovingObject.call(this, optionsHash);
}

Util.prototype.inherits(Asteroid, MovingObject);


module.exports = Asteroid;
