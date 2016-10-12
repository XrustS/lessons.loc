'use strict';

function PokemonDetailCtrl($routeParams, PokemonsService){
    
        let vm = this;

        vm.pokemonLoaded = false;
        vm.activeControlTab = false;

        vm.pokemon = PokemonsService.get({

            pokemonId: $routeParams['pokemonId']

        }, function(successResult) {
            // Окей!
            
            vm.pokemonLoaded = true;            

            vm.activeControlTab = true;

          //  this.activeTab = 1;
        }, function(errorResult) {
            // Не окей..

            vm.pokemonLoaded = true;

            vm.disableControlTab = true;
        });
    }

pokemonApp.component('pokemonDetail', {

    controller: PokemonDetailCtrl,
    templateUrl: './src/PokemonDetail/PokemonDetail.html'
})
