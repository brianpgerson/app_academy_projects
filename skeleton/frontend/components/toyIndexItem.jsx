var React = require('react');
var ToyDetail = require('./toyDetail');
var History = require('react-router').History;

var ToyIndexItem = React.createClass({
  mixins: [History],
  showToyDetail: function(){
    this.history.push("/pokemon/" +
                      this.props.toy.pokemon_id +
                      "/toys/" +
                      this.props.toy.id);
  },
  render: function(){
    return(
      <ul onClick={this.showToyDetail} className="toy-list-item">
        <li>Name: {this.props.toy.name}</li>
      </ul>
    );
  }
});

module.exports = ToyIndexItem;
