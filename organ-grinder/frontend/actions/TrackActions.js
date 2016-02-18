var KeysDispatcher = require('../dispatcher/Dispatcher');

var TrackActions = {
  addTrack: function(track) {
    debugger;
    KeysDispatcher.dispatch({
      actionType: "ADD_TRACK",
      track: track
    });
  }
};
module.exports = TrackActions;
