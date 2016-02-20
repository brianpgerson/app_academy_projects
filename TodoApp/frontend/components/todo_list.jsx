var React = require('react'),
    TodoStore = require('../stores/todo_store'),
    TodoListForm = require('./todo_form'),
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
      return <TodoListItem id={todo.id} key={todo.id} title={todo.title} body={todo.body}/>;
    });

    return(
      <div>
          {todoListItems}
          <p>
            Add a new item!
          </p>
          <TodoListForm />
      </div>
    );
  }
});

module.exports = TodoList;
