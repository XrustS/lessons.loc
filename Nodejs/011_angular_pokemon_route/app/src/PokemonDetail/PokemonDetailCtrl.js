'use strict';

pokemonApp.controller('PokemonDetailCtrl', function($routeParams, PokemonService) {

    var vm = this;
    PokemonService.getPokemon($routeParams['pokemonId']).then(function(pokemonData) {
        vm.pokemon = pokemonData.data;
    });

});
