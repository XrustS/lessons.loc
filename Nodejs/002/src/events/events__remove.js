const EventEmitter = require('events');
const myEmitter = new EventEmitter();

const myListener = (message) => { console.log(message); };

// Добавить обработчик события `myEvent`
myEmitter.on('myEvent', myListener);

// Вызвать событие `myEvent`
myEmitter.emit('myEvent', 'myEvent emitted');

// log: myEvent emitted


// Удалить обработчик события `myEvent`
myEmitter.removeListener('myEvent', myListener);

// Вызвать событие `myEvent` еще раз
myEmitter.emit('myEvent', 'myEvent emitted again');

// Ничего не произошло
