const EventEmitter = require('events');
const mesFunc = require('./messageFuncLib');
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
        this.removeListener('message', mesFunc.chatOnMessage);
        this.emit('close', `Чат ${this.title} закрылся :( `);
    }
}