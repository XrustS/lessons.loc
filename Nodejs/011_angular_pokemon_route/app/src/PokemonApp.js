var pokemonApp = angular.module('PokemonApp', ['ngRoute']);

angular.
module('PokemonApp').
config(['$routeProvider',
    function config($routeProvider) {

        $routeProvider.
        when('/', {
            templateUrl: 'src/Main/MainPage.html',
            controller: 'MainPageCtrl as vm'
        }).
        when('/pokemons', {
            templateUrl: 'src/PokemonList/PokemonList.html',
            controller: 'PokemonListCtrl as vm'
        }).
        when('/pokemons/:pokemonId', {
            templateUrl: 'src/PokemonDetail/PokemonDetail.html',
            controller: 'PokemonDetailCtrl as vm'
        }).
        when('/create', {
            templateUrl: 'src/CreatePokemon/CreatePokemon.html',
            controller: 'CreatePokemonCtrl as vm'
        }).
        otherwise({
            templateUrl: 'src/404.html'
            //redirectTo: '/'
            
        });
    }
]);
