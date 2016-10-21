'use struct';
const Pokemon = require('./PokemonClass'); // подключил для проверки на принадлежность к объекту класса Pokemon

module.exports = class PokemonList extends Array{
    constuctor(...param){
        super.constructor( ...param.filter( (item) => {
            return item instanceof Pokemon;
        }) );
    }
    add(name, skill){
        if (name instanceof  Pokemon){
            this.push(name);
            // console.log('Добавлен -----');
            // name.show();
            // console.log('-------------');
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
        console.log('Общее количество покемонов в списке: %s', this.length )
    }
    get(name){
        let index = this.findIndex( (item) =>{
            return item.name === name });

        if (index !== -1){

            // console.log('Удален -----');
            // this[index].show();
            // console.log('-------------');

            return this.splice(index,1)[0];
        } return false;
    }
    max(){
        let max = Math.max(...this);

        return this.find( (item) => item.skill === max);
    }
}
