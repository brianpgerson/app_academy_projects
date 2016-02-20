var React = require('react');
var ReactDOM = require('react-dom');
var Search = require('./components/search');

$(function(){
  ReactDOM.render(
    <Search />,
    document.getElementById('content')
  );

});
