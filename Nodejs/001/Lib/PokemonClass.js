'use strict';

module.exports =  class Pokemon{
    constructor( name, skil ){
        this.name = name;
        this.skil = +skil;
    }
    show(){
        console.log( `Покемон: ${this.name} уровень: ${this.skil}`);
    }
    valueOf(){
        return +this.skil;
    }
}
