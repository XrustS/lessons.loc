'use strict';

pokemonApp.controller('PokemonListCtrl', function($scope, PokemonsService, BerriesService) {

    $scope.pokemons = PokemonsService.query();
    
    $scope.Berries = BerriesService.query();

});
