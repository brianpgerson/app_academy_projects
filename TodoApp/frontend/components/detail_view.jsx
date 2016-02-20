var React = require('react'),
    TodoStore = require('../stores/todo_store');


var TodoDetailView = React.createClass({
  handleDestroy: function(e){
    e.preventDefault();
    TodoStore.destroy(this.props.id);
  },
  render: function(){
    if (this.props.display === true) {
      return (
        <div>
        <div>{this.props.body}</div>
        <input type="button" onClick={this.handleDestroy} value="DELETE"/>
      </div>
    );
    } else {
      return <div></div>;
    }
  }
});

module.exports = TodoDetailView;
