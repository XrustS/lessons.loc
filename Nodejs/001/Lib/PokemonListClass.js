'use struct';
const Pokemon = require('./PokemonClass'); // подключил для проверки на принадлежность к объекту класса Pokemon

module.exports = class PokemonList extends Array{
    constuctor(...param){
        super.constructor( ...param.filter( (item) => {
            return item instanceof Pokemon; 
        }) ); 
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
    get(name){                                                  // Надеюсь по пункту №5 я уложился?!))
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
           return this.find( (item) => {
                return item.skil === Math.max(...this);
            });     
        
        
    }
    
} 
