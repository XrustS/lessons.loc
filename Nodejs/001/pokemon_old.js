'use strict';

/****
*       
*       классы Pokemon_v2/PokemonList_v2 
*       с использованием объекта Map
*
****/

function Pokemon_v2(name, skil) {
    let pokemon = new Map();
    pokemon.set(name, skil);
    this.get = () =>{
        return this.pokemon;
    };
    this.show = () => {
        return pokemon.forEach( ( item, key ) =>{
            console.log('Покемон - '+key+
                        ' уровень - '+item );            
        });
    };    
}
function PokemonList_v2(...parm){
    this.pList = new Map();
    for (let i=0; i < parm.length; i+=2){
        this.pList.set(parm[i],parm[i+1]);
    }; 
    this.show = () => {
        this.pList.forEach( (value, key) => {
           console.log(`Покемон ${key} Уровень ${value}`);            
        });
        console.log('Общее количество покемонов: '+this.pList.size);
    };
    this.add = (name, skil) => {
        this.pList.set(name, skil);
    };
    this.delPokemon = (name) => {
        if ( name === undefined){
            return false;
        };
        return this.pList.delete(name);
    };
    this.max = () => {
       
           let maxSkil = {
               name: '',
               skil: 0
           };
           this.pList.forEach( (value, key) => {
               if(value > maxSkil.skil){
                   maxSkil.skil = value;
                   maxSkil.name = key;
               };
           });
           return maxSkil;     
    };
} 


function Pokemon(name, skil) {
    this.name = name;
    this.skil = skil;
    this.getpokemon = () => {
        return { name: this.name,
                skil: this.skil}
    }
};
function PokemonList(...poklist){
    this.plist = poklist;
    this.add = (pkname, pkskil) => {
        this.plist.push( {'name': pkname, 'skil': pkskil} );        
    };
    this.showAllPk = () => {
        this.plist.forEach( (item, i) =>{
            console.log('Покемон: '+ item.name +
                        ' уровень: '+ item.skil);             
        });
        console.log('Всего покмонов: '+this.plist.length);
    }    
};

let pokemon1 = new Pokemon('Бульбазавр', 10),
    pokemon2 = new Pokemon('Ивизавр', 20),
    pokemon3 = new Pokemon('Венузавр', 30),
    pokemon4 = new Pokemon('Чармандер', 10),
    pokemonlist1 = new PokemonList(pokemon1.getpokemon(), pokemon2.getpokemon(), pokemon3.getpokemon(), pokemon4.getpokemon());

pokemonlist1.add('Сквиртл', 150);


let lost = new PokemonList({name:'Пикачу', skil:'300'},
                           {name:'Сэндслэш', skil:'12'},
                           {name:'Райчу', skil:'33'},
                           {name:'Зубат', skil:'23'}                          
                          ),
    found = new PokemonList({name:'Нидорина', skil:'4'},
                            {name:'Мачоп', skil:'7'},
                            {name:'Мачоук', skil:'50'},
                            {name:'Алаказам', skil:'42'}
                           );
/****
*       Выполнение задания с использованием 
*       классов Pokemon_v2/PokemonList_v2
*
****/
let pokemonX = new Pokemon_v2('Голдак', 50);
//pokemonX.show();

let lost_v2 = new PokemonList_v2('Пикачу', '300',
                                 'Сэндслэш', '12',
                                 'Райчу', '33',
                                 'Зубат', '23'
                                ),
    found_v2 = new PokemonList_v2('Нидорина', 4,
                                  'Мачоп', 7,
                                  'Мачоук', '50',
                                  'Алаказам', 42
                                 );
console.log('Список найденых покемонов: lost');
lost_v2.show();
console.log('Список найденых покемонов: found');
found_v2.show();
found_v2.add('Зубат', '23');
lost_v2.delPokemon('Зубат');
console.log('Список найденых покемонов: lost');
lost_v2.show();
console.log('Список найденых покемонов: found');
found_v2.show();
let greatPokemon = found_v2.max();
console.log(`Самый мощный среди найденых ${greatPokemon.name} уровень ${greatPokemon.skil} `);




