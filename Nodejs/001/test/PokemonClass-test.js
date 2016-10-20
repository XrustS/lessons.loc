const assert = require('chai').assert;
const sinon = require('sinon');
const pokemonClass = require('../Lib/PokemonClass');



describe('Testing methods class PokemonClass', () => {

    xit('When require method show, return name and skil pokemon', () => {
      let pokemon = new pokemonClass(1,2);

        pokemon.show();

      assert.isTrue( console.log.calledWith('Покемон: 1 уровень: 2') , 'Is True');

    });
    it('method valueOf return pokemon skil', () => {
      let pokemon = new pokemonClass('NamePok', 1);

      let result = pokemon.valueOf();

      assert.equal(result, 1);
    });

});
