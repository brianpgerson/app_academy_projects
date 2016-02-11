var TTT = require('./index.js');
var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var game = new TTT.Game(reader);

game.run(function(){
  console.log("YOU WIN WOWWWW");
  reader.close();
});
