var Store = require('flux/utils').Store;
var KeysDispatcher = require('../dispatcher/Dispatcher');

var _tracks = [];

var TrackStore = new Store(KeysDispatcher);

TrackStore.__onDispatch = function(payload) {
  debugger;
  switch(payload.actionType) {
    case "ADD_TRACK":
    _tracks.push(payload.track);
    console.log(_tracks);
    this.__emitChange();
  }
};



module.exports = TrackStore;
