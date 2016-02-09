function sum(){
  console.log(this);
  var allNums = [].slice.bind(arguments)();
  return allNums.reduce(function(a, b){ return a + b; });
}

Function.prototype.myBind = function(){
  var fn = this;
  var boundArgs = [].slice.bind(arguments)();
  var context = boundArgs.shift();

  return function(){
    var callArgs = [].slice.bind(arguments)();
    var allArgs = boundArgs.concat(callArgs);
    return fn.apply(context, allArgs);
  };
};

function curriedSum(numArgs) {
  var numbers = [];
  function funFunc(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      return numbers.reduce(function(a,b) { return a + b;});
    } else {
      return funFunc;
    }
  }
  return funFunc;
}

Function.prototype.curry = function(numArgs) {
  var args = [];
  var fn = this;
  function _curry(arg) {
    args.push(arg);
    if (args.length === numArgs) {
      return fn.apply(this, args);
    } else {
      return _curry;
    }
  }
  return _curry;
};

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

sumThree.curry(3)(4)(20)(6); // == 30

var sum = curriedSum(4);
sum(5)(30)(20)(1); // => 56
