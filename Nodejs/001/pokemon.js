'use strict'

/*class Pokemon {    
    constructor(name, skil){
        this.name = name;
        this.skil = skil;        
    }
}
Pokemon.prototype.show = () => {
    return this;
};*/
function Pokemon(name, skil){
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
        //return this.plist;
         this.plist.forEach( (item, i) =>{
            console.log('Покемон: '+ item.name +
                      ' уровень: '+ item.skil);             
        });
        console.log('Всего покмонов: '+this.plist.length);
    }
    this.valueOf = () => {
        var maxValue = Math.max(this.plist);
        console.log(maxValue);
    }
};
var pokemon1 = new Pokemon('Бульбазавр', 10),
    pokemon2 = new Pokemon('Ивизавр', 20),
    pokemon3 = new Pokemon('Венузавр', 30),
    pokemon4 = new Pokemon('Чармандер', 10),
    pokemonlist1 = new PokemonList(pokemon1.getpokemon(), pokemon2.getpokemon(), pokemon3.getpokemon(), pokemon4.getpokemon());

pokemonlist1.add('Сквиртл', 150);
//console.log(pokemonlist1.showAllPk());

var lost = new PokemonList({name:'Пикачу', skil:'300'},
                           {name:'Сэндслэш', skil:'12'},
                           {name:'Райчу', skil:'33'},
                           {name:'Зубат', skil:'23'}                          
                          ),
    found = new PokemonList({name:'Нидорина', skil:'4'},
                            {name:'Мачоп', skil:'7'},
                            {name:'Мачоук', skil:'50'},
                            {name:'Алаказам', skil:'42'}
    );
console.log('Списки до измененя');
console.log('Список найденых покемонов: found');
console.log(found.showAllPk());


found.add(lost.plist[0].name, lost.plist[0].skil );

console.log('Списки после измененя');
console.log('Список найденых покемонов: found');
console.log(found.showAllPk());
found.valueOf();
    




