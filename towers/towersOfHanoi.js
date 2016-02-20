var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function HanoiGame(){
  this.towers = [[3,2,1],[],[]];
}

HanoiGame.prototype.promptMove = function(callback){
  this.print();
  reader.question("Please enter a FROM tower and a TO tower: ",
  function(answer){
    var towers = answer.match(new RegExp(/\d/g));
    var fromTower = parseInt(towers[0]);
    var toTower = parseInt(towers[1]);

    callback(fromTower, toTower);
  });
};

HanoiGame.prototype.isValidMove =
  function (startTowerIdx, endTowerIdx) {
    var startTower = this.towers[startTowerIdx];
    var endTower = this.towers[endTowerIdx];

    if (startTower === undefined || endTower === undefined) {
      return false;
    }

    var moveDisk = startTower.slice(-1)[0];
    var endDisk = endTower.slice(-1)[0];

    if (moveDisk === undefined) {
      return false;
    } else if (moveDisk < endDisk || endDisk === undefined) {
      return true;
    } else {
      return false;
    }
};

HanoiGame.prototype.move = function (startTowerIdx, endTowerIdx) {
  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
    var disk = this.towers[startTowerIdx].pop();
    this.towers[endTowerIdx].push(disk);
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.print = function () {
  console.log(JSON.stringify(this.towers));
};

HanoiGame.prototype.isWon = function () {
  return this.towers[0].length === 0 &&
  (this.towers[1].length === 0 || this.towers[2].length === 0);
};

HanoiGame.prototype.run = function(completionCallback) {
  this.promptMove(function (fromTower, toTower) {
    if (this.move(fromTower, toTower)) {
      if (this.isWon()) {
        completionCallback();
        return;
      }
    }
    this.run(completionCallback);
  }.bind(this));
};

var hg = new HanoiGame();
hg.run(function(){
  console.log("YOU WIN WOWWWW");
  reader.close();
});
