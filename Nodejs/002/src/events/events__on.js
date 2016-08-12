const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('myEvent', (data) => {
  console.log(`Произошло событие myEvent, сообщение: ${data.message}`);
});

myEmitter.on('myEvent', () => {
  console.log(`Последним добавлен — последним вызван`);
});

myEmitter.emit('myEvent', {message: 'Привет, Мир!'});

