var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var serverPokemonApi = require('../util/apiUtil.js');

var PokemonForm = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return ({
      name: "",
      attack: "",
      defense: "",
      image_url: "",
      type: "",
      moves: ""
    });
  },
  newPokemon: function(){
    var newPokemonObject = {
      pokemon: {
        attack: this.state.attack,
        defense: this.state.defense,
        name: this.state.name,
        image_url: this.state.image_url,
        poke_type: this.state.type,
        moves: this.state.moves.split(" ")
      }
    };
    serverPokemonApi.createPokemon(newPokemonObject);
  },
  render: function() {
    return (
      <form className="new-pokemon">
        <label>Name: </label>
        <input type="text" valueLink={this.linkState('name')} />
        <label>Att: </label>
        <input type="text" valueLink={this.linkState('attack')} />
        <label>Def: </label>
        <input type="text" valueLink={this.linkState('defense')} />
        <label>Img: </label>
        <input type="text" valueLink={this.linkState('image_url')} />
        <label>Type: </label>
        <input type="text" valueLink={this.linkState('type')} />
        <label>Moves: </label>
        <input type="text" valueLink={this.linkState('moves')} />
        <input type="submit" value="Submit" onClick={this.newPokemon} />
      </form>

    );
  }

});

module.exports = PokemonForm;
