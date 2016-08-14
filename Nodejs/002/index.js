// Хорошее видео, как называть переменные https://www.youtube.com/watch?v=z5WkDQVeYU4  - видео просмотрел, изменил взгляды на жизнь :)
const chatOnMessage = require('./chatOnMessage');
const ChatApp = require('./ChatAppClass');

function sendOnMessage(obj, message) { 

    if( typeof obj.emit === 'function' ){
        obj.emit('message', console.log(`${obj.title}:${message}`));
    } 
};

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');

vkChat.setMaxListeners(2);

webinarChat.on('message', chatOnMessage);
facebookChat.on('message', chatOnMessage);
vkChat.on('message', chatOnMessage);
vkChat.on('close', chatOnMessage);          //подписка и обработчик метода close
webinarChat.on('close',  chatOnMessage);
webinarChat.on('chatOnClose', (message) => {  // событие 'chatOnClose', отписывает webinarChat от события 'message'
    console.log(message);
    webinarChat.removeListener('message', chatOnMessage);    
});

// Закрыть вконтакте
setTimeout( ()=> {                                           
    console.log('Закрываю вконтакте...');
    vkChat.removeListener('message', chatOnMessage);
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
    console.log('Закрываю фейсбук, все внимание — вебинару!');
    facebookChat.removeListener('message', chatOnMessage);
}, 15000 );

setTimeout( ()=> {    
    sendOnMessage(webinarChat, ' Готовлюсь к ответу!');                            
}, 2000 );

setTimeout( () => { 
    sendOnMessage(vkChat, ' Готовлюсь к ответу!');
}, 5000 );

setTimeout( () => {         //Отработка метода close() у vkChat черз 11 сек
    vkChat.close();
}, 11000);

setTimeout( () => {        //webinarChat черз 30 сек выбрасывается событие 'chatOnClose'
    console.log('Закрываю вебинар...');
    webinarChat.emit('chatOnClose', 'Вебинар закрылся');
}, 30000);
