const EventEmitter = require('events');
const mesFunc = require('./messageFuncLib');
const ChatApp = require('./ChatAppClass');

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');


vkChat.setMaxListeners(2);

webinarChat.on('message', mesFunc.chatOnMessage);
facebookChat.on('message', mesFunc.chatOnMessage);
vkChat.on('message', mesFunc.chatOnMessage);
vkChat.on('close', mesFunc.chatOnMessage);          //подписка и обработчик метода close
webinarChat.on('close',  mesFunc.chatOnMessage );


// Закрыть вконтакте
/*setTimeout( ()=> {                                            Раз метод  vkChat.close() срабатывает через 6 сек, данный код не нужен
  console.log('Закрываю вконтакте...');
  vkChat.removeListener('message', mesFunc.chatOnMessage);
}, 10000 );
*/

// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
  facebookChat.removeListener('message', mesFunc.chatOnMessage);
}, 15000 );


setTimeout( ()=> {    
        mesFunc.sendMessage(webinarChat, ' Готовлюсь к ответу!');                            
}, 2000 );

setTimeout( () =>{ 
    mesFunc.sendMessage(vkChat, ' Готовлюсь к ответу!');
                 }, 5000 );

setTimeout( () => {         //Отработка метода close() у vkChat черз 6 сек
    vkChat.close();
}, 6000);

setTimeout( () => {        //Отработка метода close() у webinarChat черз 30 сек
    webinarChat.close();
}, 30000);
