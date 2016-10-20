const assert = require('chai').assert;
const PokemonClass = require('../Lib/PokemonClass');
const PokemonList = require('../Lib/PokemonListClass');

var pokemonList;

describe('Testing class PokemonList methods', () => {

  describe('method add()', () => {

    beforeEach(() => {
      pokemonList = new PokemonList();
    });

    it('when take whthout argument return False', () => {
      let result = pokemonList.add();

      assert.isFalse(result);
    });

    it('when take one argument object Pokemon return True', () => {
      let pokemon = new PokemonClass('testPokemon', 1);

      let result = pokemonList.add(pokemon);

      assert.isTrue(result, 'pokemon not addeded, return not True');
    });

    it('when take two arguments name(string) and skil(number) return True', () => {
      let result = pokemonList.add('name', 1);

      assert.isTrue(result);
    });

    it('when use add, PokemonList contain object Pokemon', () => {
      pokemonList.add('name', 1);

      let itemPokemonsList = pokemonList[0];

     assert.deepEqual(itemPokemonsList, { name: 'name' , skil: 1} )

    });
  });
  describe('method get(pokemonName)', () => {
    it('when argument is empty, return False', () => {
      pokemonList.add('name', 1);

      let result = pokemonList.get();

      assert.isFalse(result);
    });

    it('when set argument is not contain in instanse pokemonList', () => {
      let result = pokemonList.get('123');

      assert.isFalse(result);
    });

    it('when get pokemon return object PokemonClass', () => {
      pokemonList.add('namePokemon', 1);

      let pokemon = pokemonList.get('namePokemon');

      assert.propertyVal(pokemon, 'name', 'namePokemon');
      assert.propertyVal(pokemon, 'skil', 1);
    });
  });
  describe('method max()', () => {
    it('return object pokemon max skil', () => {
      let maxPokemon = new PokemonClass('Max', 1000),
          minPokemon = new PokemonClass('Min', 1);

          pokemonList.add(maxPokemon);
          pokemonList.add(minPokemon);

      assert.deepEqual(pokemonList.max(), maxPokemon);
    });
  });
});
