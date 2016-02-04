function uniq(array) {
    var uniqueElements = [];
    for (var i = 0; i < array.length; i++) {
      if (uniqueElements.indexOf(array[i]) === -1) {
        uniqueElements.push(array[i]);
      }
    }
    return uniqueElements;
}

function twoSum(array) {
  var sumPairs = [];
  for (var i = 0; i < array.length; i++) {
    for (var j = i + 1; j < array.length; j++) {
      if (array[i] + array[j] === 0) {
        sumPairs.push([i, j]);
      }
    }
  }
  return sumPairs;
}

function transpose(array){
  var transposed = [];
  for (var rowNum = 0; rowNum < array.length; rowNum++) {
    var newRow = [];
    for (var colNum = 0; colNum < array[rowNum].length; colNum++) {
      newRow.push(array[colNum][rowNum]);
    }
    transposed.push(newRow);
  }
  return transposed;
}

// function other_transpose(array){
//   // TODO predefined array size?
//   // var transposed = new Array(array[0].length,(new Array(array.length),[]))
//   for (var i = 0; i < array.length; i++) {
//     for (var j = 0; j < array[0].length; j++) {
//       transposed[i][j] = array[j][i]
//     }
//   }
// }

function myEach(array, myFun) {
  for (var i = 0; i < array.length; i++) {
    myFun(array[i]);
  }
}


function myMap(array, mapFunc) {
  var newArray = [];
  myEach(array, function(el) {
    newArray.push(mapFunc(el));
  });
  return newArray;
}

function myInject(array, injectFunc){
  var accumulator = array.shift();
  myEach(array, function(el){
    accumulator = injectFunc(accumulator, el);
  });
  return accumulator;
}
