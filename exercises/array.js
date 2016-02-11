Array.prototype.uniq = function () {
    var uniqueElements = [];
    for (var i = 0; i < this.length; i++) {
      if (uniqueElements.indexOf(this[i]) === -1) {
        uniqueElements.push(this[i]);
      }
    }
    return uniqueElements;
};

Array.prototype.twoSum = function () {
  var sumPairs = [];
  for (var i = 0; i < this.length; i++) {
    for (var j = i + 1; j < this.length; j++) {
      if (this[i] + this[j] === 0) {
        sumPairs.push([i, j]);
      }
    }
  }
  return sumPairs;
};

Array.prototype.transpose = function () {
  var transposed = [];
  for (var rowNum = 0; rowNum < this.length; rowNum++) {
    var newRow = [];
    for (var colNum = 0; colNum < this[rowNum].length; colNum++) {
      newRow.push(this[colNum][rowNum]);
    }
    transposed.push(newRow);
  }
  return transposed;
};

Array.prototype.myEach = function (myFun) {
  for (var i = 0; i < this.length; i++) {
    myFun(this[i]);
  }
};


Array.prototype.myMap = function (mapFunc) {
  var newArray = [];
  this.myEach(function(el) {
    newArray.push(mapFunc(el));
  });
  return newArray;
};

Array.prototype.myInject = function (injectFunc){
  var accumulator = this.shift();
  this.myEach(function(el){
    accumulator = injectFunc(accumulator, el);
  });
  return accumulator;
};

Array.prototype.bubbleSort = function () {
  var swapped = true;
  while (swapped) {
    swapped = false;
    for (var i = 0; i < this.length - 1; i++) {
      if (this[i] > this[i + 1]) {
        swapped = true;
        var temp = this[i];
        this[i] = this[i + 1];
        this[i + 1] = temp;
      }
    }
  }
  return this;
};

function substrings(string) {
  var substrs = [];
  for (var i = 0; i < string.length - 1; i++) {
    for (var j = i + 1; j <= string.length; j++) {
      substrs.push(string.slice(i, j));
    }
  }
  return substrs.uniq;
}
