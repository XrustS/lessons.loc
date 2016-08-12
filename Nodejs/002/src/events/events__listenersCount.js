const EventEmitter = require('events');
const myEmitter = new EventEmitter();

console.log('EventEmitter: ', EventEmitter.defaultMaxListeners);
// 10

myEmitter.setMaxListeners(3);

myEmitter.on('myEvent_1', () => {});
myEmitter.on('myEvent_1', () => {});
myEmitter.on('myEvent_1', () => {});
myEmitter.on('myEvent_1', () => {});

console.log('EventEmitter: ', EventEmitter.getMaxListeners);

