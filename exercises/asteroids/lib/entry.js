var Game = require ('./game.js');

var game = new Game();
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
game.draw(ctx);
