Pokedex.Views = (Pokedex.Views || {});

Pokedex.Views.PokemonForm = Backbone.View.extend({
  events: {
    "click button": "savePokemon"
  },

  render: function () {
    var content = JST["pokemonForm"];
    this.$el.html(content);
    $('#pokedex .pokemon-form').append(this.$el);
  },

  savePokemon: function (event) {
    event.preventDefault();
    var $form = $(event.delegateTarget).find("form")
    var attributes = $form.serializeJSON()["pokemon"];
    var pokemon = new Pokedex.Models.Pokemon(attributes);
    pokemon.save({}, {
      success: function () {

        this.collection.add(pokemon);
        Backbone.history.navigate("/pokemon/" + pokemon.id, {trigger: true});
      }.bind(this)
    })
  }
});
