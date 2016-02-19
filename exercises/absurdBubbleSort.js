var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askIfGreaterThan(el1, el2, callback) {
    reader.question("Is " + el1 + " bigger than " + el2 + "????? >> ",
    function(answer){
        if (answer === "yes") {
          callback(true);
        } else if (answer === "no") {
          callback(false);
        } else {
          console.log("What the hell are you doin'?");
        }
    });
}

function innerBubbleSortLoop(arr, idx, madeAnySwaps, outBubbleSortLoop){
  if (idx < arr.length - 1) {
    askIfGreaterThan(arr[idx], arr[idx + 1], function(bool) {
      if (bool) {
        var temp = arr[idx];
        arr[idx] = arr[idx + 1];
        arr[idx + 1] = temp;
        madeAnySwaps = true;
      }
      innerBubbleSortLoop(arr, idx + 1, madeAnySwaps, outBubbleSortLoop);
    });
  } else {
    outBubbleSortLoop(madeAnySwaps);
  }
}

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
      reader.close();
    }
  }

  outBubbleSortLoop(true);
}

absurdBubbleSort([3, 2, 1], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});
