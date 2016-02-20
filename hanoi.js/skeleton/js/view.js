function View(game, $el) {
  this.game = game;
  this.$el = $el;
  this.currentPile = undefined;
  this.setupTowers();
  this.bindStuff();
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

  var $towers = $(this.$el.find('ul'));

  for (var n = 0; n < this.game.towers.length; n++) {

    var $tower = $($towers[n]);
    var $disks = $($tower.find('li'));
    $disks.removeClass('disk-1 disk-2 disk-3');

    for (var k = 0; k < this.game.towers[n].length; k++) {
      var diskSize = this.game.towers[n][k];
      var className = "disk-" + diskSize;
      var $disk = $([].slice.apply($disks).reverse()[k]);
      $disk.addClass(className);
    }
  }
};

View.prototype.bindStuff = function () {
  this.$el.on('click', 'ul', this.clickTower.bind(this));
};

View.prototype.clickTower = function(e) {
  if (this.currentPile === undefined) {

    this.currentPile = $(e.currentTarget).data('towerNum');
    $(this.$el.find('ul')[this.currentPile]).toggleClass('selected');

  } else {
    try {
      this.game.move(this.currentPile, $(e.currentTarget).data('towerNum'));
    } catch(err) {
      alert("Whatcha doin' there, hombre?");
    }
    $(this.$el.find('ul')[this.currentPile]).toggleClass('selected');
    this.currentPile = undefined;
  }

  this.updateClasses();
};

module.exports = View;
