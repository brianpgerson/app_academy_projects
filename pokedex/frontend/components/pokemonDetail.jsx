var React = require('react');
var Pokemart = require('../stores/pokemon');
var serverPokemonApi = require('../util/apiUtil.js');
var ToysIndex = require('./toysIndex');


var PokemonDetail = React.createClass({
  getInitialState: function(){
    return({
      pokemon: null
    });
  },
  getStateFromStore: function(toFindId){
    return Pokemart.find(toFindId);
  },
  componentDidMount: function() {
    this.changeToken = Pokemart.addListener(this._onChange);
    serverPokemonApi.fetchSinglePokemon(this.props.params.pokemonId);
  },
  componentWillReceiveProps: function(newProps){
    serverPokemonApi.fetchSinglePokemon(newProps.params.pokemonId);
  },
  componentWillUnmount: function() {
    this.changeToken.remove();
  },
  _onChange: function() {
    this.setState({pokemon: this.getStateFromStore(parseInt(this.props.params.pokemonId))});
  },
  render: function(){
    var pokeAttributes;
    var toyAttributes;
    if (this.state.pokemon) {
      pokeAttributes = (
        <ul>
          <li>Name: {this.state.pokemon.name}</li>
          <li>Type: {this.state.pokemon.poke_type}</li>
          <li>Attack Power: {this.state.pokemon.attack}</li>
          <li>Defense: {this.state.pokemon.defense}</li>
          <li><img src={this.state.pokemon.image_url} /></li>
        </ul>
      );
      toyAttributes = (
        <ToysIndex toys={this.state.pokemon.toys} />
      );
    } else {
      pokeAttributes = "no pokemon :(";
      toyAttributes = "no toys :(";
    }
    return (
      <div>
        <div className="pokemon-detail-pane">
          <div className="detail">
            {pokeAttributes}
          </div>
          <div>
            {toyAttributes}
          </div>
        </div>
        <div className="toy-detail-pane">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = PokemonDetail;
