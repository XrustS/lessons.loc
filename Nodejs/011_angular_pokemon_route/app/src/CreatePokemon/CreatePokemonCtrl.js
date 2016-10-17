'use strict';

pokemonApp.controller('CreatePokemonCtrl', function() {

    var vm = this;
    vm.newPokemon = {};
    vm.addPokemon = function(myPokemon) {
        console.log(myPokemon);
        vm.newPokemon = {};
    };
    
    // Validation
    
    vm.isRequired = (condition) =>{
        if(conditon.required)
            return true;
        return false;
    }
   

});
