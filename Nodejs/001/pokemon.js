'use strict';

const random = require('./Lib/random');

class Pokemon{
    constructor( name, skill ){
        this.name = name;
        this.skill = +skill;
    }
    show(){
        clog( `Покемон: ${this.name} уровень: ${this.skill}`);
    }
    valueOf(){
        return +this.skill;
    }
}
class PokemonList extends Array{
    constuctor(...param){
        super.constructor( ...param.filter( (item) => {
            return item instanceof Pokemon;
        }) );
    }
    add(name, skill){
        if (name instanceof  Pokemon){
            this.push(name);
            clog('Добавлен -----');
            name.show();
            clog('-------------');
            return true;
            }else if ( name !== undefined && skill !== undefined ){
             this.push( new Pokemon(name, skill));
                return true;
        }
        return false;
    }
    show(){
            this.forEach( (item)=>{
                item.show();
        });
        clog('Общее количество покемонов в списке: %s', this.length )
    }
    get(name){
        let index = this.findIndex( (item) =>{
                return item.name === name });
        if (index !== -1){
            clog('Удален -----');
            this[index].show();
            clog('-------------');
            return this.splice(index,1)[0];
        } return false;
    }
    max(){
           return this.find( (item) => {
                return item.skill === Math.max(...this);
            });


    }

}



// Выполнение кода
let pok1 = new Pokemon('Бульбазавр','1000'),
    pok2 = new Pokemon('Ивизавр','3'),
    namepok = ['Венузавр','Чармандер', 'Чармелеон', 'Чаризард', 'Сквиртл', 'Вартортл', 'Бластойз', 'Катерпи',
               'Метапод', 'Батерфри', 'Видл', 'Какуна'];
pok1.show();
let found = new PokemonList(pok1),
    lost = new PokemonList(pok2);
//clog(found);
// Генерируем список покемонов и заполняем списки
namepok.forEach( (item, i) =>{
    if ( i < (namepok.length / 2) ){
        found.add(item, random( 2, 100 ));
    } else { lost.add(item, random( 2, 100 ));};
});

clog('***** Список found ******');
found.show();
lost.show();
found.add(lost.get('Батерфри')); //Можно и пушить, но раз уж написал обработку то через add =)
found.show();
lost.show();
clog(found);

clog(found.max());


function clog(...message) {
    console.log(...message);
};
