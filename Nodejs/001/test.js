/**
* Script test promise
**/
'use strict';
const random = require('./random');

let arr = [];
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
console.log(arr);


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

