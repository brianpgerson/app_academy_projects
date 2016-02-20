var ApiAction = require('../actions/apiActions.js');

var ApiUtil = {
  fetchBenches: function(boundaries){
    $.get(
      'api/benches',
      boundaries,
      function(data){
        ApiAction.receiveBenches(data);
      }
    );
  }
};

window.ApiUtil = ApiUtil;

module.exports = ApiUtil;
