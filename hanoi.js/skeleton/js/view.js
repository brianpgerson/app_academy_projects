function View(game, $el) {
  this.game = game;
  this.$el = $el;
  this.setupTowers();
}

View.prototype.setupTowers = function () {
  for (var i = 0; i < 3; i++) {
    var $tower = $("<ul>").data('towerNum', i);
    for (var j = 0; j < 3; j++) {
      var $disk = $("<li>");
      $tower.append($disk);
    }
    this.$el.append($tower);
  }
  this.updateClasses();
};

View.prototype.updateClasses = function () {
  for (var n = 0; n < this.game.towers.length; n++) {
    for (var k = 0; k < this.game.towers[n].length; k++) {
      debugger;
      var diskSize = this.game.towers[n][k];
      var className = "disk-" + diskSize;
      var $tower = $(this.$el.find('ul')[n]);
      var $disks = $($tower.find('li'));
      var $disk = $([].slice.apply($disks).reverse()[k]);
      $disk.addClass(className);
    }
  }

};


module.exports = View;
