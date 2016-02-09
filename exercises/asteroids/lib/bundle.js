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

	var Game = __webpack_require__ (1);

	var game = new Game();
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	game.draw(ctx);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Asteroid = __webpack_require__ (2);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__ (3);
	var MovingObject = __webpack_require__ (4);

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	function Util() { }

	Util.prototype.randomVec = function (length) {
	  var x = Math.floor(Math.random() * ((length + 1) - (-length)) + (-length));
	  var ysquared = Math.pow(length,2) - Math.pow(x,2);
	  var y = Math.sqrt(ysquared);
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


/***/ }
/******/ ]);