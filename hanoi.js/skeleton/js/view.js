function View(game, $el) {
  this.game = game;
  this.$el = $el;
  this.setupTowers();
}

View.prototype.setupTowers = function () {
  for (var i = 0; i < 3; i++) {
    var $tower = $("<ul>").data('towerNum', i);
    for (var j = 0; j < 3; j++) {
      var $disc = $("<li>");
      $tower.append($disc);
    }
    this.$el.append($tower);
  }
  for (var n = 0; n < this.game.towers.length; n++) {
    for (var k = 0; k < this.game.towers[i].length; k++)

    }
  }
};
hello
module.exports = View;
