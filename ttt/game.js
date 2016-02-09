var Board = require('./board.js');

function Game(reader) {
  this.reader = reader;
  this.board = new Board();
}

Game.prototype.run = function (completionCallback) {
  this.promptMove(function (pos, mark) {
    if (this.move(pos,mark)) {
      if (this.board.won()) {
        completionCallback();
        return;
      }
    }
    this.run(completionCallback);
  }.bind(this));
};

Game.prototype.promptMove = function (callback) {
  this.board.printGrid();
  this.reader.question("Please enter a position and a mark: ",
    function(answer){
      var pos = answer.match(new RegExp(/\d/g));
      var x = parseInt(pos[0]);
      var y = parseInt(pos[1]);
      var position = [x, y];
      var mark = answer.match(new RegExp(/[xo]/));
      callback(position, mark[0]);
  });
};

Game.prototype.validMove = function (pos) {
  var x = pos[0];
  var y = pos[1];
  if (x > 2 || x < 0 || y > 2 || y < 0) {
    return false;
  } else if (!this.board.empty(pos)) {
    return false;
  } else {
    return true;
  }
};

Game.prototype.move = function (pos, mark) {
  if (this.validMove(pos)) {
    this.board.placeMark(pos, mark);
    return true;
  } else {
    return false;
  }
};

module.exports = Game;
