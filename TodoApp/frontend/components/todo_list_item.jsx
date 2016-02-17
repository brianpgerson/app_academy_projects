var React = require('react'),
    DoneButton = require('./done_button'),
    TodoStore = require('../stores/todo_store');


var TodoListItem = React.createClass({
  handleDestroy: function(e){
    e.preventDefault();
    TodoStore.destroy(this.props.id);
  },
  render: function(){
    return (
      <div>
        <div>{this.props.title}</div>
        <div>{this.props.body}</div>
        <input type="button" onClick={this.handleDestroy} value="DELETE"/>
        <DoneButton id={this.props.id} />
      </div>
    );
  }

});

module.exports = TodoListItem;
