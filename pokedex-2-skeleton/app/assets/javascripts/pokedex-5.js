Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li.poke-list-item": "selectPokemonFromList"
  },

  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon();

  },

  addPokemonToList: function (pokemon) {
    var content = JST["pokemonListItem"]({pokemon: pokemon})
    this.$el.append(content);
  },

  refreshPokemon: function (callback) {
    this.collection.fetch( {
      success: function() {
        this.render();
        if (callback) {
          callback();
        }
      }.bind(this)
    })
  },

  render: function () {
    this.$el.empty();
    this.collection.each(this.addPokemonToList.bind(this));
  },

  selectPokemonFromList: function (event) {
    var that = this;
    var pokemon = new Pokedex.Models.Pokemon({id: $(event.target).data("id")});
    pokemon.fetch({
      success: function(pokemon) {
        Backbone.history.navigate("pokemon/"+ pokemon.id, {trigger:true})
        // that.detailView = new Pokedex.Views.PokemonDetail( {
        //     model: pokemon,
        //     collection: that.collection
        //   })
        // $("#pokedex .pokemon-detail").html(that.detailView.$el);
        // // detailView.render();
        // that.detailView.refreshPokemon()
      }

  })
}
})

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
    "click li.toy-list-item": "selectToyFromList"
  },

  refreshPokemon: function (options) {
    this.model.fetch({
      success: function() {

        this.render();
        // debugger
        if (options) {
          options();
        }
      }.bind(this)
    });
  },

  render: function () {
    var content = JST['pokemonDetail']({pokemon: this.model});
    this.$el.html(content);

    this.$el.find(".toys").empty();
    this.model.toys().each((function(toy) {
      var content = JST["toyListItem"]({toy: toy});

      this.$el.find(".toys").append(content);;
    }).bind(this));
  },

  selectToyFromList: function (event) {
    // var toy = new Pokedex.Models.Toy({id: $(event.target).data("id")});
    // toy.fetch({
    //   success: function() {

    //   }
    // });
    var toy = this.model.toys().get($(event.target).data("id"));
    Backbone.history.navigate("pokemon/"+ this.model.id + "/toys/"+ toy.id, {trigger:true})
        // var toyDetailView = new Pokedex.Views.ToyDetail({
        //   model: toy,
        //   collection: this.collection
        // });
        // $("#pokedex .toy-detail").html(toyDetailView.$el)
        // toyDetailView.render();

  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
    var content = JST["toyDetail"]({toy: this.model, pokes: this.collection})
    this.$el.html(content);
  }
});


// $(function () {
//   var pokemonIndex = new Pokedex.Views.PokemonIndex();
//   pokemonIndex.refreshPokemon();
//   $("#pokedex .pokemon-list").html(pokemonIndex.$el);
// });
