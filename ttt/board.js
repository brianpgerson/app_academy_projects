function Board() {
  this.grid = this.makeGrid();
}

Board.prototype.printGrid = function () {
  for (var i = 0; i < this.grid.length; i++) {
    console.log(JSON.stringify(this.grid[i]) + "\n");
  }
};

Board.prototype.makeGrid = function () {
  return [new Array(3), new Array(3), new Array(3)];
};

Board.prototype.empty = function (pos) {
  var x = pos[0];
  var y = pos[1];
  return this.grid[y][x] === undefined;
};

Board.prototype.placeMark = function (pos, mark) {
  var x = pos[0];
  var y = pos[1];
  this.grid[y][x] = mark;
};

Board.prototype.won = function () {
  var diags = this.diagonals();
  var cols = this.columns();
  var toCheck = [diags, cols, this.grid];
  for (var i = 0; i < toCheck.length; i++) {
    for (var j = 0; j < toCheck[i].length; j++) {
      var filteredCheck = toCheck[i][j].filter(function (el){
        return el !== undefined;
      });
      if (filteredCheck.length === 3){
        var winCheck = toCheck[i][j].reduce(this.reduceFunc);
        if (winCheck) {
          return true;
        }
      }
    }
  }
  return false;
};

Board.prototype.reduceFunc = function(a, b) {
  if (a === b) {
    return a;
  } else {
    return false;
  }
};

Board.prototype.winner = function() {
  return this.grid.reduce(this.reduceFunc);
};

Board.prototype.diagonals = function () {
  var leftDiagonal = [
    this.grid[0][0],
    this.grid[1][1],
    this.grid[2][2]
  ];
  var rightDiagonal = [
    this.grid[0][2],
    this.grid[1][1],
    this.grid[2][0]
  ];
  return [leftDiagonal, rightDiagonal];
};

Board.prototype.columns = function () {
  var cols = [];
  for (var i = 0; i < this.grid.length; i++) {
    var row = [];
    for (var j = 0; j < this.grid[i].length; j++) {
      row.push(this.grid[j][i]);
    }
    cols.push(row);
  }
  return cols;
};

module.exports = Board;
