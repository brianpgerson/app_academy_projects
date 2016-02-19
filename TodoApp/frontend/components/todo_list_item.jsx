var React = require('react'),
    DoneButton = require('./done_button'),
    TodoDetailView = require('./detail_view'),
    TodoStore = require('../stores/todo_store');


var TodoListItem = React.createClass({
  getInitialState: function(){
    return {displayBool: false};
  },
  handleItemClick: function(e){
    e.preventDefault();
    var bool = this.state.displayBool === true ? false : true;
    this.setState({displayBool: bool});
  },
  render: function(){
    return (
      <div>
        <div onClick={this.handleItemClick}>{this.props.title}</div>
        <TodoDetailView display={this.state.displayBool} body={this.props.body} id={this.props.id} />
        <DoneButton id={this.props.id} />
      </div>
    );
  }

});

module.exports = TodoListItem;
