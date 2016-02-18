var React = require('react'),
    ReactDOM = require('react-dom'),
    Tabs = require('./tabs'),
    AutoComplete = require('./autocomplete'),
    WeatherClock = require('./weather_clock');

var names = [
  "Tom",
  "Joeseph",
  "Sarah",
  "Markov",
  "Barkley",
  "Allex",
  "Alligator"
];

var Widgets = React.createClass({
  render: function(){
    return(
      <div>
        <Tabs />
        <WeatherClock />
        <AutoComplete names={names} />
      </div>
  );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Widgets/>, document.getElementById("root"));
});
