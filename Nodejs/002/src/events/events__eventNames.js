const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('myEvent_1', () => {});

// Внимание — считаются только разные имена, `myEvent_1` второй раз не будет добавлено
myEmitter.on('myEvent_1', () => {});

myEmitter.on('myEvent_2', () => {});

console.log('myEE.eventNames: ', myEmitter.eventNames());
// log:  myEE.eventNames:  [ 'myEvent_1', 'myEvent_2' ]


