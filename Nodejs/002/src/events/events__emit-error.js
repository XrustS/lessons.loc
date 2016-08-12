const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('someEvent', () => console.log('some event happened'));

let emitType = 'error';

setTimeout(() => {
  myEmitter.emit('someEvent');
}, 2000);


switch (emitType) {

  case 'error':
    myEmitter.emit('error', 'ошибка в событии');
    break;

  case 'errorCustom':
    myEmitter.emit('error', new Error('ошибка своего типа в событии'));
    break;

  case 'errorHandled':
    myEmitter.on('error', (err) => {
      console.log('err: ', err);
    });
    myEmitter.emit('error', new Error('обработанная ошибка в событии'));
    break;
}
