var KeysDispatcher = require('../dispatcher/Dispatcher');

var KeyActions = {
  addKey: function(key) {
    KeysDispatcher.dispatch({
      actionType: "ADD_KEY",
      key: key
    });
  },
  removeKey: function(key) {
    KeysDispatcher.dispatch({
      actionType: 'REMOVE_KEY',
      key: key
    });
  }
};

module.exports = KeyActions;
