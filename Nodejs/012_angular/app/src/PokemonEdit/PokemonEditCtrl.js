'use strict';

pokemonApp.controller('PokemonEditCtrl', function($scope, PokemonsService, $routeParams) {

    
    PokemonsService.getMyPokemons($routeParams['pokemonId'])
        .success((data) => {
                   
                $scope.pokemon = data;
            });

    $scope.editPokemon = function(objectId, myPokemon) {

        $scope.editSuccess = false;

        PokemonsService.editPokemon(objectId, myPokemon).then(function(response) {
            let data = response.data;

            $scope.pokemonId = data.objectId;
            $scope.editSuccess = true;

        });

    }

});
 