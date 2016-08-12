const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('myEvent', (data) => {
  console.log(`Произошло событие myEvent, сообщение: ${data.message}`);
});

myEmitter.prependListener('myEvent', () => {
  console.log(`Последним добавлен — первым вызван`);
});

myEmitter.emit('myEvent', {message: 'Привет, Мир!'});

