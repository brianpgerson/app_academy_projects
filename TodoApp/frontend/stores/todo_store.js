var _todos = [],
    _callbacks = [];

var TodoStore = {

  changed: function(){
    _callbacks.forEach(function(cb){
      cb();
    });
  },

  addChangedHandler: function(cb){
    _callbacks.push(cb);
  },

  removeChangedHandler: function(cb){
    _callbacks = _callbacks.filter(function(callback){
      return cb !== callback;
    });
  },

  all: function(){
    return _todos;
  },

  fetch: function(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        console.log(xmlhttp.responseText);
        var todos = JSON.parse(xmlhttp.responseText);
        _todos = todos;
        TodoStore.changed();
      } else {
        console.log(xmlhttp.readyState);
      }
    };

    xmlhttp.open("GET", "/api/todos", true);
    xmlhttp.send();
  },

  create: function(todo){
    var newTodo = {todo: todo};
    $.post("/api/todos", newTodo, function(response) {
      _todos.push(response);
      TodoStore.changed();
    });
  },

  destroy: function(id){
    var found = _todos.find(function(todo){
        return todo.id === id;
    });

    if(found){
      $.ajax({
        url: '/api/todos/' + id,
        type: 'DELETE',
        success: function(result){
          console.log(result);
          _todos = _todos.filter(function(el){
            return el.id !== id;
          });
          TodoStore.changed();
        }
      });
    }
  },

  toggleDone: function(id){
    var found = _todos.find(function(todo){
      return todo.id === id;
    });

    var updatedToDo =
      {todo: {title: found['title'], body: found['body'], done: true}};
    if (updatedToDo) {
      $.ajax({
        url: '/api/todos/' + id,
        data: updatedToDo,
        type: 'PATCH',
        success: function(result){
          console.log(result);

          _todos = _todos.filter(function(el){
            return el.id !== id;
          });

          _todos.push(updatedToDo['todo']);

          TodoStore.changed();
        }
      });
    }
  }
};

module.exports = TodoStore;
