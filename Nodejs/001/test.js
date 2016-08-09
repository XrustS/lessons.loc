/**
* Script test promise
**/
'use strict';

const random = require('./random');

var arr = [],
    count = 5;
for (let i=0; i<= count; i++ ){
    arr.push(random(10,100));

};
/*
const promise = new Promise ((resolve, reject) => {
    setTimeout(() =>{
        arr.push(random(200,300));
        resolve('Ok');
    },1000); 
    setTimeout(() =>{
        reject(new Error("Ups!!!"))
    },5000);
    
});
promise.then(
    result => console.log(arr+result),
    error => console.log('Error'+error)
);
*/
class Pok{
    constructor(name, skil){
        this.name = name;
        this.skil = skil;
    }
    show(){
        console.log(`Покемон ${this.name} уровень ${this.skil}`);
    }
}
class PokClassList extends Array{
    
    show(){
        this.forEach( (item) =>{
           item.show(); 
        });
    }
}
let d1 = new Pok('Бульбозавр',2),
    d2 = new Pok('Чермандер', 4),
    dlist = new PokClassList(d1, d2);
console.log(dlist);
dlist.show();

/**
function getPokList(file, re){
    
          
          
          
          
    fs.readFile(file, 'utf-8', (err, content) => {
                                if(err) throw err;        
                                    re = /\/(\W+)\/\W+$/gm
                                    let m;  ;
                                while ((m = re.exec(content)) !== null){
                                    if (m.index === re.lastIndex) {
                                        re.lastIndex++;
                                    };
                                    result.push(m[1]); 
                                };        
    });    
}*/

