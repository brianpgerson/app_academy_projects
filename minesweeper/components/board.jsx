var React = require('react'),
    ReactDOM = require('react-dom'),
    Tile = require('./tile');

var Board = React.createClass({
  render: function() {
    return (
      <div className="boardThing">
        {this.props.board.grid.map(function(row, index) {
          return (
            <div className="row" key={index}>
              {row.map(function(tile, idx) {
                return (
                  <Tile
                    reactTile={row[idx]}
                    key={idx}
                    updateCallback={this.props.updateCallback}/>
                );
              }.bind(this))}
            </div>
          );
        }.bind(this))
        }
      </div>
    );
  }
});


module.exports = Board;
