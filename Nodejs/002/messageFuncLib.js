const EventEmitter = require('events');
/* code_style: Лучше отбивать пробелом подключение модулей
 *
 * код модуля
 *
 * и экспорт модуля
 *
 * Это улучшит читаемость программы
  * */

module.exports = {
    chatOnMessage: (message) => {
        console.log(message);
    },

    /* docs: К методу с несколькими параметрами можно добавить jsdoc для читаемости
    * http://usejsdoc.org
    * см. тег `@param`
    *
    * */
    sendMessage: (obj, message, event = 'message') =>{
        // api: Может ли быть в методе `sendMessage` событие, отличное от 'message'?
        // Возможно, параметр `event` — лишний

        // refactor_check_method: Возможно, лучше проверять не цепочку наследования, а
        // наличие метода `emit` у объекта `obj`
        // например так: if (typeof obj.emit === 'function') { }
        if( obj instanceof EventEmitter ){
            obj.emit(event, console.log(`${obj.title}:${message}`));
        }; // code_style: точка с запятой не нужна здесь
    }
};