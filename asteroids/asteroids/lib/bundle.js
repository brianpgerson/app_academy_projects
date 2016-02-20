/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var gameView = __webpack_require__ (5);

	var gv = new gameView();
	gv.start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Asteroid = __webpack_require__ (2);
	var Ship = __webpack_require__ (6);
	var Bullet = __webpack_require__ (7);

	var DIM_X = 1000;
	var DIM_Y = 800;
	var NUM_ASTEROIDS = 3;

	function Game(){
	  this.asteroids = [];
	  this.bullets = [];
	  this.ship = new Ship({pos: this.randomPosition(), game: this});
	  this.addAsteroids();
	}

	Game.prototype.wrap = function (pos) {
	  var x = (pos[0] < -1) ? (DIM_X + pos[0] % DIM_X) : (pos[0] % DIM_X);
	  var y = (pos[1] < -1) ? (DIM_Y + pos[1] % DIM_Y) : (pos[1] % DIM_Y);
	  return [x,y];
	};

	Game.prototype.allObjects = function () {
	  return this.asteroids.concat(this.ship).concat(this.bullets);
	};

	Game.prototype.addObject = function (object) {
	  if (object instanceof Asteroid) {
	    this.asteroids.push(object);
	  } else {
	    this.bullets.push(object);
	  }
	};

	Game.prototype.addAsteroids = function () {
	  for (var i = 0; i < NUM_ASTEROIDS; i++) {
	    this.addObject(new Asteroid( {
	      pos: this.randomPosition(), game: this
	    } ));
	  }
	};

	Game.prototype.isOutOfBounds = function(pos){
	  if (pos[0] === DIM_X - 1 || pos[0] < 0) {
	      console.log("WOW");
	  } else if (pos[1] === DIM_Y - 10 || pos[1] < 0 ){
	     console.log("HEY!");
	  }
	};

	Game.prototype.remove = function(object) {
	  if (object instanceof Asteroid) {
	      this.asteroids =
	     this.asteroids.filter(function(el) { return el.pos !== object.pos; } );
	  } else {
	    this.bullets =
	     this.bullets.filter(function(el) { return el.pos !== object.pos; } );
	  }

	};

	Game.prototype.checkCollisions = function () {
	  for (var i = 0; i < this.allObjects().length; i++) {
	    var thisGuy = this.allObjects()[i];
	    this.isOutOfBounds(thisGuy.pos);
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__ (3);
	var MovingObject = __webpack_require__ (4);
	var Ship = __webpack_require__ (6);

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
	  if (otherObject.color === "#ff0000") {
	    this.game.remove(this);
	    this.game.remove(otherObject);
	  } else if ( otherObject.color === "#7F00FF" ) {
	    otherObject.relocate();
	  }
	};

	module.exports = Asteroid;


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__ (1);

	function GameView() {
	  this.game = new Game();
	  this.ctx = document.getElementById("myCanvas").getContext("2d");
	}

	GameView.prototype.start = function () {
	  this.bindKeyHandlers();
	  setInterval(function() {
	    this.game.step();
	    this.game.draw(this.ctx);
	  }.bind(this), 20);
	};

	GameView.prototype.bindKeyHandlers = function () {
	  key('up', function(){ this.game.ship.power([0, -1]) }.bind(this));
	  key('down', function(){ this.game.ship.power([0, 1]) }.bind(this));
	  key('left', function(){ this.game.ship.power([-1, 0]) }.bind(this));
	  key('right', function(){ this.game.ship.power([1, 0]) }.bind(this));
	  key('k', function(){ this.game.ship.fireBullet() }.bind(this));

	};

	module.exports = GameView;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__ (3);
	var MovingObject = __webpack_require__ (4);
	var Bullet = __webpack_require__ (7);

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__ (3);
	var MovingObject = __webpack_require__ (4);

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


/***/ }
/******/ ]);