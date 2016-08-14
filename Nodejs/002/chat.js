const EventEmitter = require('events');

class ChatApp extends EventEmitter {
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
        this.removeListener('message', chatOnMessage);
        this.emit('close', `Чат ${this.title} закрылся :( `);
    }
}

function sendMessage(obj, message){                     // Функция запускающая триггер входящего объекта на событие 'message'

    // refactor_check_method: Возможно, лучше проверять не цепочку наследования, а
    // наличие метода `emit` у объекта `obj`
    // например так: if (typeof obj.emit === 'function') { }+
    if( typeof obj.emit === 'function' ){
      obj.emit('message', chatOnMessage(`${obj.title}:${message}`));
    }; // code_style: точка с запятой не нужна здесь
}; // code_style: точка с запятой не нужна здесь


let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');

vkChat.setMaxListeners(2);                             // Ограничиваем кол-во обработчиков

let chatOnMessage = (message) => {
  console.log(message);
};

webinarChat.on('message', chatOnMessage);
facebookChat.on('message', chatOnMessage);
vkChat.on('message', chatOnMessage);
vkChat.on('close', chatOnMessage);//подписка и обработчик метода close
webinarChat.on('close',  chatOnMessage );

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
        sendMessage(webinarChat, ' Готовлюсь к ответу!');                            
}, 2000 );

setTimeout( () =>{ 
    sendMessage(vkChat, ' Готовлюсь к ответу!');
                 }, 5000 );

setTimeout( () => {
    vkChat.close();
}, 6000);

setTimeout( () => {    
    webinarChat.close();
}, 30000);

/*
/*
* Задания:
*
* 1)
*  1.1 Добавить обработчик события `message` для Чата Вебинара (`webinarChat`),
*      который выводит в консоль сообщение 'Готовлюсь к ответу'.
*      Обработчик создать в отдельной функции.+
*
*  1.2 Для вконтакте (`vkChat`) установить максимальное количество обработчиков событий, равное 2.+
*
*  1.3 Добавить обработчик 'Готовлюсь к ответу' из пп. 1.1 к чату вконтакте.
*
*
* 2)
*
*  2.1 В классе чата `ChatApp` добавить метод `close`, который будет вызывать событие `close`
*      (событие вызывается один раз, `setInterval` как в констукторе, не нужен).
*
*  2.2 Для чата вконтакте (`vkChat`) добавить обработчик `close`,
*      выводящий в консоль текст  "Чат вконтакте закрылся :(".
*
*  2.3 Вызывать у чата вконтакте метод `close()`.
*
* 3)
*   Добавить код, который через 30 секунд отписывает `chatOnMessage` от вебинара `webinarChat`. +
*
*   Задание со звездочкой (дополнительное) —
*   разбить существующий код на модули, запускаемый файл должен быть `index.js`
*
*
*
* Спасибо!
*
* */
