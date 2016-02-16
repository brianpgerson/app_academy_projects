var React = require('react');

var TodoListItem = React.createClass({
  render: function(){
    return (
      <div>
        <div>{this.props.title}</div>
        <div>{this.props.body}</div>
      </div>
    );
  }

});


module.exports = TodoListItem;
