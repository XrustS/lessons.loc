// code_style: EventEmitter не используется в коде
// если модуль не используется, лучше удалить его подключение
const EventEmitter = require('events');

// code_style: mesFunc — неочевидное название переменной
// Хорошее видео, как называть переменные https://www.youtube.com/watch?v=z5WkDQVeYU4
const mesFunc = require('./messageFuncLib');

// Предлагаю обработчики событий перенести в файл, где они используются
// (`index.js`), так будет легче читать программу.
// Обрабтчики событий редко используются совместно разными модулями.

const ChatApp = require('./ChatAppClass');

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');


vkChat.setMaxListeners(2);

webinarChat.on('message', mesFunc.chatOnMessage);
facebookChat.on('message', mesFunc.chatOnMessage);

vkChat.on('message', mesFunc.chatOnMessage);

// refactor_handlers: возможно, тут стоит сделать отдельный обработчик,
// `chatOnClose` например
vkChat.on('close', mesFunc.chatOnMessage);          //подписка и обработчик метода close

webinarChat.on('close',  mesFunc.chatOnMessage );

// code_style: Код, который не используется в программе лучше удалять совсем
// островки "мертвого" когда затрудняют чтение

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

// code_style: отступы и выравнивание в коде сделаны по-разному (начало)
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
// code_style: отступы и выравнивание в коде сделаны по-разному (конец)