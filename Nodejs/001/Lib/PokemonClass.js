'use strict';

module.exports =  class Pokemon{
    constructor( name, skill ){
        this.name = name;
        this.skill = +skill;
    }
    show(){
        console.log( `Покемон: ${this.name} уровень: ${this.skill}`);
    }
    valueOf(){
        return +this.skill;
    }
}
