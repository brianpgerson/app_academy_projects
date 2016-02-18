var React = require('react');
var Pokemart = require('../stores/pokemon');
var serverPokemonApi = require('../util/apiUtil.js');
var PokemonIndexItem = require('./pokemonIndexItem');

var PokemonsIndex = React.createClass({
  getInitialState: function(){
    return({ pokemons: [] });
  },
  componentDidMount: function(){
    this.changeToken = Pokemart.addListener(this._onChange);
    serverPokemonApi.fetchAllPokemons();
  },
  componentWillUnmount: function(){
    this.changeToken.remove();
  },
  _onChange: function(){
    this.setState({pokemons: Pokemart.all()});
  },
  render: function(){
    var all = this.state.pokemons.map(function(pokemon, i) {
      return <PokemonIndexItem pokemon={pokemon} id={i} key={i} />;
    });

    return (
      <div>
        {all}
      </div>
    );
  }
});

module.exports = PokemonsIndex;
