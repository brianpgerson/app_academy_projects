var React = require('react');
var ReactDOM = require('react-dom');

var MyComponent = React.createClass({
  render: function() {
    return(
      <div>Hello World from Brian and Arjun</div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MyComponent />, document.getElementsByTagName('body')[0]);
});
