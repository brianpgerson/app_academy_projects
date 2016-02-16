var React = require('react'),
    TodoStore = require('/Users/appacademy/Desktop/w7d2/TodoApp/frontend/stores/todo_store'),
    TodoListItem = require('./todo_list_item');

var TodoList = React.createClass({
  getInitialState: function(){
    return(
      {todos: TodoStore.all()}
    );
  },
  componentDidMount: function(){
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  },
  componentWillUnmount: function(){
    TodoStore.removeChangedHandler(this.todosChanged);
  },
  todosChanged: function(){
    this.setState({todos: TodoStore.all()});
  },
  render: function(){
    var todoListItems = this.state.todos.map(function(todo, index){
      return <TodoListItem key={index} title={todo.title} body={todo.body}/>;
    });

    return(
      <div>
          {todoListItems}
      </div>
    );
  }
});

module.exports = TodoList;
