var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var BenchConstants = require('../constants/benchConstants');

var BenchStore = new Store(AppDispatcher);
var _benches = {};

function resetBench(bench) {
  _benches[bench.id] = bench;
}

function resetBenches(benches) {
  _benches = {};
  benches.forEach(function(bench, i) {
    resetBench(bench);
  });
}

BenchStore.all = function () {
  return _benches;
};

BenchStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case BenchConstants.BENCHES_RECEIVED:
    resetBenches(payload.benches);
    this.__emitChange();
    break;
  }
};


window.BenchStore = BenchStore;
module.exports = BenchStore;
