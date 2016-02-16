var View = function (game, $el) {
  this.game = game;
  this.$el = $el;
  this.setupBoard();
  this.bindEvents();
};

View.prototype.bindEvents = function () {
  this.$el.find('.square').on('click', this.makeMove.bind(this));
};

View.prototype.makeMove = function (e) {
  var $square = $(e.currentTarget);
  var pos = $square.data('pos');
  var currentPlayer = this.game.currentPlayer;
try {
  this.game.playMove(pos);
}
catch(err) {
  alert("That's a bad move, partner!");
  return;
}
  $square.addClass('marked').text(currentPlayer);
  if (this.game.board.isOver()) {
    alert("Hot damn, son - you're good at tic tac toe");
  }
};

View.prototype.setupBoard = function () {
  for (var i = 0; i < 3; i++) {
    var $row = $('<ul>').addClass('row');
    for (var j = 0; j < 3; j++) {
      var $square = $('<li>').addClass('square').data("pos", [i, j]);
      $row.append($square);
    }
    this.$el.append($row);
  }
};

module.exports = View;
