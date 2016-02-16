var React = require('react'),
    ReactDOM = require('react-dom');

var Tile = React.createClass({
  handleClick: function(e){
    this.props.updateCallback(this.props.reactTile, e.altKey);
  },
  render: function() {
    var text;
    var statusClass;

    var tile = this.props.reactTile;
    if (tile.explored === false) {
      if (tile.flagged === false) {
        text = "?";
        statusClass = 'mystery';
      } else {
        text = "⚑";
        statusClass = 'mystery';
      }
    } else if (tile.bombed === false) {
      if(tile.adjacentBombCount() !== 0) {
        statusClass = 'explored';
        text = tile.adjacentBombCount();
      } else {
        statusClass = 'explored';
        text = " ";
      }
    } else {
      statusClass = 'bombed';
      text = "💥";
    }
    return (
      <div onClick={this.handleClick} className={statusClass}>
        {text}
      </div>
    );
  }
});

module.exports = Tile;
