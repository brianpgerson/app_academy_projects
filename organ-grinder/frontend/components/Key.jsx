var React = require('react');
var Note = require('../util/Note');
var TONES = require('../constants/Tones');
var KeyStore = require('../stores/KeyStore');

var Key = React.createClass({
  componentDidMount: function() {
    debugger;
    this.note = new Note(TONES[this.props.noteName]);
    KeyStore.addListener(this.handlePlayNote);
  },
  componentWillUnmount: function() {
    KeyStore.remove(this.handlePlayNote);
  },
  handlePlayNote: function(){
    if (KeyStore.allKeys().indexOf(this.props.noteName) >= 0) {
      this.note.start();
    }
  },
  render: function(){
    return (
      <div>
        The Key Is: {this.props.noteName}
      </div>
    );
  }
});

module.exports = Key;
