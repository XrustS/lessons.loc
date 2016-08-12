const EventEmitter = require('events');
module.exports = {
    chatOnMessage: (message) =>{
        console.log(message);
    },
    sendMessage: (obj, message, event = 'message') =>{                     
        if( obj instanceof EventEmitter ){
            obj.emit(event, console.log(`${obj.title}:${message}`));
        };
    }
};