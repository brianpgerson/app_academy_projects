var PokemonActions = require('../actions/pokemonActions');

var serverPokemonApi = {
  fetchAllPokemons: function(){
    $.get(
      "api/pokemon",
      {},
      function(data){
        PokemonActions.receiveAllPokemons(data);
      }
    );
  }
};

module.exports = serverPokemonApi;
