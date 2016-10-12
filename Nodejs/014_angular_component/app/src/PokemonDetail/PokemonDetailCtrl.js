'use strict';

pokemonApp.controller('PokemonDetailCtrl', function($scope, $routeParams, PokemonsService, $mdToast) {

    $scope.pokemonLoaded = false;

    $scope.pokemon = PokemonsService.get({
        pokemonId: $routeParams['pokemonId']
    }, function(successResult) {
        // Окей!
        
        $scope.pokemonLoaded = true;
        
        $scope.activeTab = 1;
    }, function(errorResult) {
        // Не окей..
        
        $scope.pokemonLoaded = true;
       
        $scope.disableControlTab = true;
    });

//    $scope.pokemon.$promise.then(function(result) {
//        //$scope.pokemonLoaded = true;
//    });

    $scope.deletePokemon = function(pokemonId) {

        $scope.pokemon.$delete({
            pokemonId: pokemonId
        }, function(successResult) {
            // Окей!            
            $scope.deletionSuccess = true;
            showMessage('Покемон  успешно удален!')
        }, function(errorResult) {
            // Не окей..
            $scope.deletionError = true;
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
});
