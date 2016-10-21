const assert = require('chai').assert;
const PokemonList = require('../Lib/PokemonListClass');
const Pokemon = require('../Lib/PokemonClass');

describe('List pokemons can', () => {
  it('return super powerful pokemon', () => {
    let powerfulPokemon = new Pokemon('Max', 1000);
    let feeblePokemon = new Pokemon('Min', 1);
    let pokemons = new PokemonList(powerfulPokemon, feeblePokemon);

    let retrnMaxPokemon = pokemons.max();

    assert.deepEqual(retrnMaxPokemon, powerfulPokemon);
  });
});
