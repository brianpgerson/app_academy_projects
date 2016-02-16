var React = require('react'),
    TodoStore = require('../stores/todo_store');

var TodoForm = React.createClass({
  getInitialState: function(){
    return({ title: "", body: "" });
  },
  updateTitle: function(e){
    this.setState({title: e.target.value});
  },
  updateBody: function(e){
    this.setState({body: e.target.value});
  },
  handleSubmit: function(){
    var newTitle = this.state.title;
    var newBody = this.state.body;
    var newTodo = {title: newTitle, body: newBody};
    TodoStore.create(newTodo);
    this.setState({title: "", body: ""});
  },
  render: function(){
    return(
      <form>
        <p>
        <label>
          New Todo List Item Title:
          <input value={this.state.title} onChange={this.updateTitle}></input>
        </label>
        </p>
        <p>
        <label>
          New Todo List Item Body:
        <input value={this.state.body} onChange={this.updateBody}></input>
        </label>
      </p>

        <input type="submit" onClick={this.handleSubmit}></input>
      </form>
    );
  }

});


module.exports = TodoForm;
