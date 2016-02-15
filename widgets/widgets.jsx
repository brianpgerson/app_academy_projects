var React = require('react'),
    ReactDOM = require('react-dom'),
    Tabs = require('./tabs');

var Widgets = React.createClass({
  render: function(){
    return(
      <div>
        <Tabs />
      </div>
  );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Widgets/>, document.getElementById("root"));
});
