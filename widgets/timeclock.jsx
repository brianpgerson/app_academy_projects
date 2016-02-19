var React = require('react'),
    ReactDOM = require('react-dom');

var TimeClock = React.createClass({
  getInitialState: function(){
    var time = new Date().toTimeString().match(/\d+\:\d+\:\d+/);
    return { time: time };
  },
  componentDidMount: function(){
    this.toClear = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function(){
    clearInterval(this.toClear);
  },
  tick: function(){
    var newTime = new Date().toTimeString().match(/\d+\:\d+\:\d+/);
    this.setState({time: newTime});
  },
  render: function() {
    return(
      <div>
        <span className="timeclock">{this.state.time}</span>
      </div>
    );
  }
});

module.exports = TimeClock;
