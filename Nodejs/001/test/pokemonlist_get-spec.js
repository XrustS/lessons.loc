const assert = require('chai').assert;
const PokemonClass = require('../Lib/PokemonClass');
const PokemonList = require('../Lib/PokemonListClass');

var pokemons,
    bulbazavr = createNewPokemon('Bulbazavr', 1),
    pikachu = createNewPokemon('Pikachu', 20),
    chermander = createNewPokemon('Chermander', 30);

describe('When get pokemon from list', () => {
  beforeEach(() => {
    pokemons = new PokemonList(bulbazavr, pikachu, chermander);
  });
  it('return False, if argument is empty', () => {
    let result = pokemons.get();

    assert.isFalse(result);
  });

  it('return False, if pokemon not found', () => {
    let result = pokemons.get('123');

    assert.isFalse(result);
  });

  it('when get pokemon return object PokemonClass', () => {
    let getPokemon = pokemons.get('Bulbazavr');

    assert.propertyVal(getPokemon, 'name', 'Bulbazavr');
    assert.propertyVal(getPokemon, 'skill', 1);
  });
});

function createNewPokemon(name, skill){
  return new PokemonClass(name, skill);
}
