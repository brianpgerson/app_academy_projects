var PokemonDispatcher = require('../dispatcher/dispatcher');
var PokemonConstants = require('../constants/pokemonConstants');

var PokemonActions = {
  receiveAllPokemons: function(pokemen){
    PokemonDispatcher.dispatch({
      actionType: PokemonConstants.POKEMONS_RECEIVED,
      pokemen: pokemen
    });
  }
};

module.exports = PokemonActions;
