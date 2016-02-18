function exp1(base, pow) {
  if (pow === 0) {
    return 1;
  } else {
    return exp1(base, pow - 1) * base;
  }
}

function exp2(base, pow) {
  if (pow === 0) {
    return 1;
  } else if (pow === 1) {
    return base;
  } else if (pow % 2 === 1) {

    return base * (exp2(base,((pow - 1) / 2)) * exp2(base,((pow - 1) / 2)));
  } else {
    return (exp2(base, pow / 2)) * (exp2(base, pow / 2));
  }
}

function fib(n) {
  if (n <= 2) {
    return [0,1].slice(0,n);
  } else {
    var prev = fib(n - 1);
    return prev.concat([prev[prev.length - 1] + prev[prev.length - 2]]);
  }
}

function bsearch(array, target) {
  if (array.length === 0 ) {
    return null;
  } else if (array.length === 1) {
    if (array[0] === target) {
      return 0;
    } else {
      return null;
    }
  } else {
    var pivot = Math.floor(array.length/2);
    var pivotVal = array[pivot];

    var left = array.slice(0, pivot);
    var right = array.slice(pivot, array.length);

    if (pivotVal > target) {
      return bsearch(left, target);
    } else {
      return pivot + bsearch(right, target);
    }
  }
}

function makeChange(amt, coins) {
  if (amt === 0) {
    return [];
  } else if (amt < 0 || coins.length === 0) {
    return new Array(1000);
  } else {
    var useIt = [coins[0]].concat(makeChange(amt - coins[0], coins));
    var loseIt = makeChange(amt,coins.slice(1,coins.length));

    if (useIt.length < loseIt.length) {
      return useIt;
    } else {
      return loseIt;
    }
  }
}

function mergeSort(array, sortByFunc) {
  var sortByFunc = sortByFunc || function(a, b) {
    return a < b;
  };
  if (array.length <= 1) { return array; }

  var pivot = Math.floor(array.length/2);

  var left =  array.slice(0, pivot);
  var right =  array.slice(pivot, array.length);

  return merge(mergeSort(left), mergeSort(right), sortByFunc);
}

function merge(left, right, sortByFunc) {
  var merged = [];

  while (left.length > 0 && right.length > 0) {
    if (sortByFunc(left[0], right[0])) {
      merged.push(left.shift());
    } else {
      merged.push(right.shift());
    }
  }
  return merged.concat(left.concat(right));
}

function subset(array) {
  if (array.length === 0) { return [[]]; }
  else {
    var subSlice = subset(array.slice(0,array.length-1));
    var mapSlice = subSlice.map(
      function (el) {
        return el.concat(array[array.length-1]);
      }
    );
    return subSlice.concat(mapSlice);
  }
}
