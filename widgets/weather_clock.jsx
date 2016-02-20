var React = require('react'),
    ReactDOM = require('react-dom'),
    TimeClock = require('./timeclock'),
    Weather = require('./weather');

var WeatherClock = React.createClass({
  render: function(){
    return(
      <div>
        <TimeClock />
        <Weather />
      </div>
    );
  }
});

module.exports = WeatherClock;
