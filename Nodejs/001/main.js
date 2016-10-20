/**
* Главная точка входа.
* Разнес классы по разным файлам  ./Lib/PokemonClass.js (содержит класс Pokemon),
*                                 ./Lib/PokemonListClass.js (содержит класс PokemonList)
*/
'use strict';
let path = './Lib/';
const random = require(path+'random');
const Pokemon = require(path+'PokemonClass');
const PokemonList = require(path+'PokemonListClass');

let pok1 = new Pokemon('Бульбазавр','1000'),
    pok2 = new Pokemon('Ивизавр','3'),
    namepok = ['Венузавр','Чармандер', 'Чармелеон', 'Чаризард', 'Сквиртл', 'Вартортл', 'Бластойз', 'Катерпи',
               'Метапод', 'Батерфри', 'Видл', 'Какуна'];
pok1.show();
let found = new PokemonList(pok1),
    lost = new PokemonList(pok2);
// Генерируем список покемонов и заполняем списки
namepok.forEach( (item, i) =>{
    
    if ( i < (namepok.length / 2) ){        
        
        found.add(item, random( 2, 100 ));        
        
    } else { lost.add(item, random( 2, 100 ));};
});

console.log('***** Список found ******');
found.show();
console.log('***** Список lost ******');
lost.show();
console.log('***** Перемещение покемона \'Батерфри\' из списка lost в список found ******');
found.add(lost.get('Батерфри'));
console.log('***** Список found ******');
found.show();
console.log('***** Список lost ******');
lost.show();
console.log('***** Покемон с максимальным уровнем в списке found ******');
console.log(found.max());
console.log('***** Покемон с максимальным уровнем в списке lost ******');
console.log(lost.max());
