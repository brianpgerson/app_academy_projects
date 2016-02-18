var React = require('react'),
    TodoStore = require('../stores/todo_store');

var DoneButton = React.createClass({
  handleDone: function(e){
    e.preventDefault();
    debugger;
    TodoStore.toggleDone(this.props.id);
  },
  render: function(){
    return (
      <input type="button" onClick={this.handleDone} value="DONESKIES" />
    );
  }
});


module.exports = DoneButton;
