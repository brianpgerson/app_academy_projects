var PokemonForm = require('./pokemonForm');
var PokemonsIndex = require('./pokemonsIndex');
var React = require('react');

var App = React.createClass({
  render: function() {
    return (
      <div id="pokedex">
        <div className="pokemon-index-pane">
          <PokemonForm />
          <PokemonsIndex />
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
