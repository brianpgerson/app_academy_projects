var React = require('react'),
    ReactDOM = require('react-dom');

var AutoComplete = React.createClass({
  getInitialState: function() {
    return ({names: this.props.names, initialState: ""});
  },
  render: function() {
    return (
      <div>
        <input type="text"></input>
        <ul>

        </ul>
      </div>
    );
  }
});

module.exports = AutoComplete;
