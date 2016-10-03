'use strict';

pokemonApp.controller('PokemonListCtrl', function($scope, PokemonsService, BerriesService, $q) {

    // PokemonsService.getPokemons().then(function(response) {
    //     $scope.pokemons = response.data.results;
    // });
    //
    // BerriesService.getBerries().then(function(response) {
    //     $scope.berries = response.data.results;
    // });

    $scope.berryLoaded = false;
    $scope.pokemonLoaded = false;
    
    
    
    $q.all({Berrys: BerriesService.getBerries(), 
            Pokemons: PokemonsService.getPokemons(),
            MyPokemons: PokemonsService.getMyPokemons()})
        .then( (values) => {
            $scope.pokemons = values.Pokemons.data.results;
        
            $scope.myPokemons = values.MyPokemons.data.data;
        console.log('MyPokemons =========');
        console.log($scope.myPokemons);
        
            $scope.berries = values.Berrys.data.results;
            $scope.pokemonLoaded = true;
            $scope.berryLoaded = true;        
    });

   /* PokemonsService.getPokemons().then(function(response) {
        $scope.pokemons = response.data.results;
        return PokemonsService.getMyPokemons()
    })
        .then( (resp) => {
        let data = resp.data.data;
                       
        $scope.myPokemons = data;
        $scope.pokemonLoaded = true;
    });

    BerriesService.getBerries().then(function(response) {
        $scope.berries = response.data.results;
        $scope.berryLoaded = true;
    })
    */
});