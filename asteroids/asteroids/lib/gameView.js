var Game = require ('./game.js');

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
