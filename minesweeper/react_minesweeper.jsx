var React = require('react'),
    ReactDOM = require('react-dom'),
    Minesweeper = require('./minesweeper.js'),
    Board = require('./components/board');


var Game = React.createClass({
  getInitialState: function() {
    return ({
      board: new Minesweeper.Board(10, 8)
    });
  },
  updateGame: function(reactTile, flagging) {
    if (flagging) {
      reactTile.toggleFlag();
    } else {
      reactTile.explore();
    }
    this.setState({board: this.state.board });
    if (this.state.board.won()){
      alert("You're the best sweeper in mineland!");
    } else if (this.state.board.lost()) {
      alert("KABOOM BITCH");
    }
  },
  render: function() {
    return(
      <Board
        board={this.state.board}
        updateCallback={this.updateGame}
        />
    );
  }
});

module.exports = Game;

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Game />, document.getElementById("mineland"));
});
