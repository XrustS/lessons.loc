'use strict';

function pokenonDetailFormCtrl(PokemonsService, $mdToast){
    
    
    this.deletePokemon = function(pokemonId) {

        this.pokemon.$delete({
            pokemonId: pokemonId
        }, function(successResult) {
            // Окей!                           
            showMessage('Покемон  успешно удален!')
        }, function(errorResult) {
            // Не окей..               
            showMessage('Покемоны не сдаются!')
        });

    }

    function showMessage(textMessage){
        $mdToast.show(
            $mdToast.simple()
            .textContent(textMessage)                
            .position('bottom right')
            .hideDelay(3000)
        );
    }

};

pokemonApp.component('pokenonDetailForm', {

    controller: pokenonDetailFormCtrl,
    
    bindings: {
        pokemon: '<',
        disablecontroltab: '<'
    },

    templateUrl: './src/PokemonDetailForm/PokemonDetailForm.html'
})