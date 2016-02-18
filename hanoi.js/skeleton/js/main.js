var HanoiView = require('./view.js');
var HanoiGame =
require('/Users/appacademy/Desktop/dubsixdeetres/hanoi.js/hanoi-core-solution/game.js');

$(function () {
  var rootEl = $('.hanoi');
  var game = new HanoiGame();
  new HanoiView(game,rootEl);
});
