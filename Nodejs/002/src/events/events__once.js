const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.once('myEvent', (data) => {
  console.log(`Произошло событие myEvent, сообщение: ${data.message}`);
});

myEmitter.emit('myEvent', {message: 'Привет, Мир!'});

// Не будет выведено
myEmitter.emit('myEvent', {message: 'Еще раз, Привет, Мир!'});

