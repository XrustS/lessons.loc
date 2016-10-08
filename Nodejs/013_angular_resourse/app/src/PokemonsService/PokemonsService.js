angular
    .module('PokemonApp')
    .factory('PokemonsService', function($resource, $http) {

        return $resource('https://api.backendless.com/v1/data/Pokemons/:pokemonId/', {
            pokemonId: '@pokemonId'
        }, {
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: function(responseData) {
                    return angular.fromJson(responseData).data;
                }
            },
            update: {
                method: 'PUT'
            }
        })
    })
    .factory('BerriesService', function($resource, $http) {
    
        return $resource('https://api.backendless.com/v1/data/Berries/:berrieId/', 
                        { berrieId: '@berrieId' }, 
                        {
                            query: {
                                method: 'GET',
                                isArray: true,
                                transformResponse: (respData) => {
                                    return angular.fromJson(respData).data;
                                }
                            },
                            update: {
                                method: 'PUT'
                            }
                })
});
