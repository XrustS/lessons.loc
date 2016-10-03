var pokemonApp = angular.module('PokemonApp', ['ngRoute', 'ngWebSocket']);

angular.
module('PokemonApp').

config(['$routeProvider',
    function config($routeProvider) {

        $routeProvider.
        when('/pokemons', {
            templateUrl: 'src/PokemonList/PokemonList.html',
            controller: 'PokemonListCtrl'
        }).
        when('/pokemons/:pokemonId', {
            templateUrl: 'src/PokemonDetail/PokemonDetail.html',
            controller: 'PokemonDetailCtrl'
        }).
        when('/mypokemons/:pokemonId', {
            templateUrl: 'src/PokemonEdit/PokemonEdit.html',
            controller: 'PokemonEditCtrl'
        }).
        when('/create', {
            templateUrl: 'src/CreatePokemon/CreatePokemon.html',
            controller: 'CreatePokemonCtrl'
        }).
        when('/realtime/:userName', {
            templateUrl: 'src/PokemonRealtime/PokemonRealtime.html',
            controller: 'PokemonRealtimeCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]).
config(['$httpProvider', function($httpProvider) {
    let headers = {
        "application-id": "6B2B2686-183A-C1C9-FFD6-8390114AAE00",
        "secret-key": "48626DE8-252F-527D-FF28-7E1614009D00"
    };
    $httpProvider.defaults.headers.post = headers;    
    $httpProvider.defaults.headers.put = headers;    
    $httpProvider.defaults.headers.delete = headers;
}]);
