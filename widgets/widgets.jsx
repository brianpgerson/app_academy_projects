var React = require('react'),
    ReactDOM = require('react-dom'),
    Tabs = require('./tabs'),
    AutoComplete = require('./autocomplete'),
    WeatherClock = require('./weather_clock');

var Widgets = React.createClass({
  render: function(){
    return(
      <div>
        <Tabs />
        <WeatherClock />
        <AutoComplete />
      </div>
  );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Widgets/>, document.getElementById("root"));
});
