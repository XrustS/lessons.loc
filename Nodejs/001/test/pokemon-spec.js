const assert = require('chai').assert;
const sinon = require('sinon');
const pokemon = require('../Lib/PokemonClass');



describe('Pokemon should', () => {

    it('return name and skill pokemon in console when shown,', () => {
      let bulbazavr = new pokemon('Bulbazavr', 2);
      sinon.spy(console, 'log');

      bulbazavr.show();

      assert.isTrue( console.log.calledWith('Покемон: Bulbazavr уровень: 2'));

      console.log.restore();

    });
    it('return pokemon skill when value is requested', () => {
      let chermander = new pokemon('Chermander', 10);

      let result = chermander.valueOf();

      assert.equal(result, 10);
    });

});
