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
  },
  fetchSinglePokemon: function(id) {
    $.get(
      "api/pokemon/" + id,
      {},
      function(data) {
        PokemonActions.receiveSinglePokemon(data);
      }
    );
  },
  createPokemon: function(newObj){
    $.post(
      "/api/pokemon",
      newObj,
      function(response){
        PokemonActions.receiveSinglePokemon(response);
      }
    );
  }
};

module.exports = serverPokemonApi;
