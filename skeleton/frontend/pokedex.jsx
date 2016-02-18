var serverPokemonApi = require('./util/apiUtil.js');
var Pokemart = require('./stores/pokemon');
var React = require('react');
var PokemonsIndex = require('./components/pokemonsIndex');
var PokemonDetail = require('./components/pokemonDetail');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var App = require('./components/app');

var routes = (
  <Route component={App} path="/">
    <Route component={PokemonDetail} path="pokemon/:pokemonId">
    </Route>
  </Route>
);

$(function(){
  ReactDOM.render(
    <Router>
      {routes}
    </Router>,
    document.getElementById('root')
  );
});
