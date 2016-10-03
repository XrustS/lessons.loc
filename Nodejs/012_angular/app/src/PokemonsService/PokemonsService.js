angular
    .module('PokemonApp')
    .factory('PokemonsService', function($http) {

    return {

        getPokemons: function() {
            return $http.get('http://pokeapi.co/api/v2/pokemon/?limit=10');
        },
        getMyPokemons: (pokemonId) => {
            let id = pokemonId ? '/'+pokemonId : '';
            
           return $http({url: 'http://api.backendless.com/v1/data/pokemons'+id,
                   method: 'GET',
                   headers: {
                       "application-id": "6B2B2686-183A-C1C9-FFD6-8390114AAE00",
                       "secret-key": "48626DE8-252F-527D-FF28-7E1614009D00"
                   }
                  })
        },

        getPokemon: function(pokemonId) {
            return $http.get('http://pokeapi.co/api/v2/pokemon/' + pokemonId);
        },

        createPokemon: function(pokemonData) {
            return $http.post('http://api.backendless.com/v1/data/pokemons', pokemonData);
        },
        
        editPokemon: (pokemonId, modelPokemon) => {
            return $http.put('http://api.backendless.com/v1/data/pokemons/'+pokemonId, modelPokemon);
        },

        deletePokemon: function(pokemonId) {
            return $http({
                method: 'DELETE',
                url: 'http://api.backendless.com/v1/data/pokemons/' + pokemonId,                        
            });
        }

    }

}

            );
