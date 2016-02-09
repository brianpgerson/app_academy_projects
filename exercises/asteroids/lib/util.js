function Util() { }

Util.prototype.randomVec = function (length) {
  var x = Math.floor(Math.random() * ((length + 1) - (-length)) + (-length));
  var ysquared = Math.pow(length,2) - Math.pow(x,2);
  var y = Math.sqrt(ysquared);
  debugger;
  if (x < 0) {
    y = y * -1;
  }
  return [x, y];
};

Util.prototype.inherits = function (subclass, superclass) {
  function Surrogate () {}
  Surrogate.prototype = superclass.prototype;
  subclass.prototype = new Surrogate();
  subclass.prototype.constructor = subclass;
};

module.exports = Util;
