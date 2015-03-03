Pokedex.Router = Backbone.Router.extend({
  routes: {
    "": "pokemonIndex",
    "pokemon/:id" : "pokemonDetail",
    "pokemon/:pokemonId/toys/:toyId": "toyDetail"
  },

  pokemonDetail: function (id, callback) {
    if (!this._pokemonIndex) {
      this.pokemonIndex(this.pokemonDetail.bind(this, id));
    }


    var pokemon = new Pokedex.Models.Pokemon({id: id})

    pokemon.fetch({
      success: function () {

        this._detailView = new Pokedex.Views.PokemonDetail( {
            model: pokemon,
            collection: this._pokemonIndex.collection
          })
        $("#pokedex .pokemon-detail").html(this._detailView.$el);
        // detailView.render();

        this._detailView.refreshPokemon(callback)
      }.bind(this)
    });
  },

  pokemonIndex: function (callback) {
    this._pokemonIndex = new Pokedex.Views.PokemonIndex();
    this.pokemonForm();
    this._pokemonIndex.refreshPokemon(
      callback
    );
    $("#pokedex .pokemon-list").html(this._pokemonIndex.$el);
  },

  toyDetail: function (pokemonId, toyId) {
    if (!this._detailView) {
      this.pokemonDetail(pokemonId, this.toyDetail.bind(this, pokemonId, toyId));
    } else {
    // var toy = new Pokedex.Models.Toy({id: toyId});
    var pokemon = new Pokedex.Models.Pokemon({id: pokemonId});
    pokemon.fetch({
      success: function() {
        var toy = pokemon.toys().get(toyId);
        this._toyDetailView = new Pokedex.Views.ToyDetail({
          model: toy,
          collection: this._pokemonIndex.collection
        });
        $("#pokedex .toy-detail").html(this._toyDetailView.$el)
        this._toyDetailView.render();
      }.bind(this)
    })
  }
  },

  pokemonForm: function () {

    this._formView = new Pokedex.Views.PokemonForm({
      model: new Pokedex.Models.Pokemon(),
      collection: this._pokemonIndex.collection
    });

    this._formView.render();
  }
});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
