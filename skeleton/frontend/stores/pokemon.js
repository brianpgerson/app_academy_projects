var PokemonDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var PokemonConstants = require('../constants/pokemonConstants');

var Pokemart = new Store(PokemonDispatcher);
var _pokemons = {};

function resetPokemon(pokemon) {
  _pokemons[pokemon.id] = pokemon;
}

function resetPokemons(pokemons) {
  _pokemons = {};
  pokemons.forEach(function(pokemon, i) {
    resetPokemon(pokemon);
  });
}

Pokemart.all = function() {
  var results = [];
  for (var prop in _pokemons) {
    if (_pokemons.hasOwnProperty(prop)) {
      results.push(_pokemons[prop]);
    }
  }
  return results;
};

Pokemart.find = function(id){

  return _pokemons[id];
};

Pokemart.__onDispatch = function(payload) {
  switch(payload.actionType) {
  case PokemonConstants.POKEMONS_RECEIVED:
    resetPokemons(payload.pokemen);
    this.__emitChange();
    break;
  case PokemonConstants.POKEMON_RECEIVED:
    resetPokemon(payload.pokemon);
    this.__emitChange();
    break;
  }
};

module.exports = Pokemart;
