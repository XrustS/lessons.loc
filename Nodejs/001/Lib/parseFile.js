/**
*
*/
class parseFile extends Promise {
  constructor()
}

const promise = new Promise ((resolve, reject,) => {
  setTimeout(() =>{
    arr.push(random(200,300));
    resolve('Ok');
  },1000);
  setTimeout(() =>{
    reject(new Error("Ups!!!"))
  },5000);

});
promise.then(
  result => console.log(arr + result),
  error => console.log('Error'+ error)
);
