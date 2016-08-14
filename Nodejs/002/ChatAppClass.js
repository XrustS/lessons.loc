const EventEmitter = require('events');

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
        this.emit('close', `Чат ${this.title} закрылся :( `);
    }
}; // code_style: тут нужна точка с запятой

/*
* refactor_es2015: Можно использовать export в стиле ES2015
*
* export default class ... Александр попробывал, 
*                        но видимо моя версия Nodejs v0.10.24
*                        не поддерживает export/import =(
*
* */