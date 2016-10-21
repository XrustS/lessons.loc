const assert = require('chai').assert;
const PokemonList = require('../Lib/PokemonListClass');
const Pokemon = require('../Lib/PokemonClass');

describe('When add pokemon to the list', () => {
  beforeEach(() => {
    pokemons = new PokemonList();
  });

  it('return False, if try adding empty argument', () => {
    let result = pokemons.add();

    assert.isFalse(result);
  });
  it('return True, if set argument pokemon', () => {
    let bulbazavr = new Pokemon('Bulbazavr', 1);

    let result = pokemons.add(bulbazavr);

    assert.isTrue(result);
  });
  it('exist in list added pokemon', () => {

    pokemons.add('Pikachu', 1);

    let indexLastPokemon = pokemons.length - 1;

    let Pikachu = pokemons[indexLastPokemon];

   assert.deepEqual(Pikachu, { name: 'Pikachu' , skill: 1})
  });
});
