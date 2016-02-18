var React = require('react');
var Pokemart = require('../stores/pokemon');

var PokemonDetail = React.createClass({
  getInitialState: function(){
    return({
      pokemon: this.getStateFromStore(parseInt(this.props.params.pokemonId))
    });
  },
  getStateFromStore: function(toFindId){
    return Pokemart.find(toFindId); // TODO need to parse int?
  },
  componentWillReceiveProps: function(newProps){
    this.setState({pokemon: this.getStateFromStore(parseInt(newProps.params.pokemonId))});
  },
  render: function(){
    // TODO ask about image_url

    var pokeAttributes;
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
    } else {
      pokeAttributes = "no pokemon :(";
    }

    return (
      <div>
        <div className="pokemon-detail-pane">
          <div className="detail">
            {pokeAttributes}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PokemonDetail;
