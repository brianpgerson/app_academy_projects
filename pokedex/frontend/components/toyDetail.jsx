var React = require('react');
var Pokemart = require('../stores/pokemon');
var serverPokemonApi = require('../util/apiUtil.js');

var ToyDetail = React.createClass({
  getInitialState: function() {
    return({
      toy: null
    });
  },
  getStateFromStore: function(toFindId){
    var toys = Pokemart.find(toFindId).toys;
    return toys.filter(function(toy){
      return toy.id === parseInt(this.props.params.toyId);
    }.bind(this))[0];
  },
  componentDidMount: function() {
    console.log("hello");
    this.changeToken = Pokemart.addListener(this._onChange);
  },
  componentWillUnmount: function() {
    this.changeToken.remove();
  },
  _onChange: function() {
    this.setState({toy: this.getStateFromStore(parseInt(this.props.params.pokemonId))});
  },
  componentWillReceiveProps: function(newProps){
    this.setState({toy: this.getStateFromStore(parseInt(newProps.params.pokemonId))});
  },
  render: function() {
    var toyDetail;
    if (this.state.toy) {
      toyDetail = (<ul>
        <li>Happiness: {this.state.toy.happiness}</li>
        <li>Price: {this.state.toy.price}</li>
        <li><img src={this.state.toy.image_url} /></li>
      </ul>);
    } else {
      toyDetail = <div>No toy, sorry.</div>;
    }
    return(
      <div>
        {toyDetail}
      </div>
    );
  }
});


module.exports = ToyDetail;
