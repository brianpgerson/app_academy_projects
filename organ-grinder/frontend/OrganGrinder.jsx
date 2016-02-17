var KeyStore = require('./stores/KeyStore.js');
var Note = require('./util/Note');
var TONES = require('./constants/Tones');
var KeyListener = require('./util/KeyListener');
var React = require('react');
var ReactDOM = require('react-dom');
var Key = require('./components/Key');

$(function(){
  ReactDOM.render(
    <Key noteName={"C4"}/>,
    document.getElementById('content')
  );
});
