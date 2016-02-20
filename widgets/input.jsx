var React = require('react'),
    ReactDOM = require('react-dom');

var Input = React.createClass({
  getInitialState: function() {
    return ({value: 'Hello!'});
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <input
        type="text"
        className="funput"
        value={this.state.value}
        onChange={this.handleChange}
        onInput={this.props.inputCallback}
      />
    );
  }
});

module.exports = Input;
