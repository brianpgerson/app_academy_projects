var Game = require ('./game.js');

function GameView() {
  this.game = new Game();
  this.ctx = document.getElementById("myCanvas").getContext("2d");
}

GameView.prototype.start = function () {
  setInterval(function() {
    this.game.step();
    this.game.draw(this.ctx);
  }.bind(this), 20);
};

module.exports = GameView;
