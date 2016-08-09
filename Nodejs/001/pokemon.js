'use strict';
const fs = require('fs');
const random = require('./random');

class Pokemon{
    constructor( name, skil ){
        this.name = name;
        this.skil = skil;
    }
    show(){
        console.log( `Покемон: ${this.name} уровень: ${this.skil}`);
    }
    valueOf(){
        return this.skil;
    }
}
class PokemonList extends Array{
    constuctor(...param){
        super.constructor( param.filter( (item) => {return item instanceof Pokemon }) );  // не могу понять, почему не работает проверка 
    }    
    add(name, skil){        
        if (name instanceof  Pokemon){
            this.push(name);
            console.log('Добавлен -----');
            name.show();
            console.log('-------------');
            return true;
            }else if ( name !== undefined && skil !== undefined ){
             this.push( new Pokemon(name, skil));
                return true;
        }        
        return false;
    }
    show(){
            this.forEach( (item)=>{
                item.show();
        });
        console.log('Общее количество покемонов в списке: %s', this.length )
    }
    getPokemon(name){
        let index = this.findIndex( (item) =>{
                return item.name === name });
        if (index !== -1){
            console.log('Удален -----');
            this[index].show();
            console.log('-------------');
            return this.splice(index,1)[0];
        } return false;       
    }    
    max(){
       let max = Math.max.apply(null,this.map(
                                (item) =>{
                                    return +item.valueOf();
                                }
                            )),
            index = this.findIndex( (item) => {
                return item.skil === max;
            });
        return this[index];
        
        
    }
    
}    



// Выполнение кода
let pok1 = new Pokemon('Бульбазавр',50),
    pok2 = new Pokemon('Ивизавр','3'),
    namepok = ['Венузавр','Чармандер', 'Чармелеон', 'Чаризард', 'Сквиртл', 'Вартортл', 'Бластойз', 'Катерпи',
               'Метапод', 'Батерфри', 'Видл', 'Какуна'];
pok1.show();
let found = new PokemonList(pok1),
    lost = new PokemonList(pok2);
console.log(found);
// Генерируем список покемонов и заполняем списки
namepok.forEach( (item, i) =>{
    if ( i < (namepok.length / 2) ){
        found.add(item, random( 2, 100 ));
    } else { lost.add(item, random( 2, 100 ));};
});


found.show();
lost.show();
found.add(lost.getPokemon('Батерфри')); //Можно и пушить, но раз уж написал обработку то через add =)
found.show();
lost.show();
console.log(found);

console.log(found.max());








