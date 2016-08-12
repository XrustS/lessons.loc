const EventEmitter = require('events');

// code_style: mesFunc — неочевидное название переменной
// что оно значает? mess Functions или message Functor?
// Хорошее видео, как называть переменные https://www.youtube.com/watch?v=z5WkDQVeYU4
const mesFunc = require('./messageFuncLib');
/* code_style: Лучше отбивать пробелом подключение модулей
 *
 * код модуля
 *
 * и экспорт модуля
 *
 * Это улучшит читаемость программы
 * */

module.exports = class ChatApp extends EventEmitter {
    /**
   * @param {String} title
   */
    constructor(title) {
        super();

        this.title = title;

        // Посылать каждую секунду сообщение
        setInterval(() => {
            this.emit('message', `${this.title}: ping-pong`);
        }, 1000);
    }
    close(){
        // error: Не нужно удалять обработчик события `message`
        this.removeListener('message', mesFunc.chatOnMessage);

        this.emit('close', `Чат ${this.title} закрылся :( `);
    }
} // code_style: тут нужна точка с запятой

/*
* refactor_es2015: Можно использовать export в стиле ES2015
*
* export default class ...
*
* */