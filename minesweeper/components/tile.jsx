var React = require('react'),
    ReactDOM = require('react-dom');

var Tile = React.createClass({
  handleClick: function(e){
    this.props.updateCallback(this.props.reactTile, e.altKey);
  },
  render: function() {
    var text;
    var tile = this.props.reactTile;
    if (tile.explored === false) {
      if (tile.flagged === false) {
        text = "?";
      } else {
        text = "!";
      }
    } else if (tile.bombed === false) {
      if(tile.adjacentBombCount() !== 0) {
        text = tile.adjacentBombCount();
      } else {
        text = " ";
      }
    }
    return (
      <div onClick={this.handleClick} className="tile">
        {text}
      </div>
    );
  }
});

module.exports = Tile;
