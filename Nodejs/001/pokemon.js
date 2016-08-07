'use strict';
const fs = require('fs');

class Pokemon{
    constructor( name, skil ){
        this.name = name;
        this.skil = skil;
    }
    show(){
        return `Покемон: ${this.name} уровень: ${this.skil}`;
    }
}
class PokemonList{
    constructor( ...pokemons ){
        this.plist = [];
        pokemons.forEach( (item, i) =>{
            if ( item instanceof Pokemon ){
                this.plist.push(item);
            }
        });


    }
    add(name, skil){
        this.plist.push( new Pokemon(name, skil))
    }
    show(){
        if ( this.plist === undefined ){
            return false;
        }
        this.plist.forEach( (item, i)=>{
            console.log( '[%s] %s', i+1, item.show());
        });
        console.log('Общее количество покемонов в списке: %s', this.plist.length )
    }
    getPokemon(name){
        let result = this.plist.filter( (item, i)=>{
                                return name === item.name;
                            });
        if ( result.length !== 0 ){
            this.plist = this.plist.filter((item, i)=>{
                                return name !== item.name;
                            });
            return result;
        }
        return false;
    }
    setPokemon(pokObject){
        if (pokObject[0].name !== undefined &&  pokObject[0].skil !== undefined){
            this.add(pokObject[0].name, pokObject[0].skil);            
            return true;
        }
        return false;
    }
    max(){
        let max = Math.max.apply(null, this.plist.map( (item) =>{
            return item.skil;
        } ));
        max = this.plist.filter( (item)=>{
            return item.skil === max;
        });
        return max[0].name+' '+max[0].skil;
        
    }
    valueOf(){
        return this.max();
    }
    
}
    

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Выполнение кода
let pok1 = new Pokemon('Бульбазавр','50'),
    pok2 = new Pokemon('Ивизавр','3'),
    namepok = ['Венузавр','Чармандер', 'Чармелеон', 'Чаризард', 'Сквиртл', 'Вартортл', 'Бластойз', 'Катерпи',
               'Метапод', 'Батерфри', 'Видл', 'Какуна'];
//console.log(pok1.show());
let found = new PokemonList(pok1, 324),
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
found.setPokemon(lost.getPokemon('Батерфри'));
found.show();
lost.show();
console.log(found);





/** Хотел распарсить файлик pokemons.txt но не смог вернуть список заначений :(


function getPokList(file){

    fs.readFileSync(file, 'utf-8', (err, content) => {
                                if(err) throw err;        
                                let re = /\/(\W+)\/\W+$/gm,
                                    m;  ;
                                while ((m = re.exec(content)) !== null){
                                    if (m.index === re.lastIndex) {
                                        re.lastIndex++;
                                    };
                                    list.push(m[1]); 
                                };        
    });    
}
*/

