// Хорошее видео, как называть переменные https://www.youtube.com/watch?v=z5WkDQVeYU4  -
// видео просмотрел, изменил взгляды на жизнь :)
const chatOnMessage = require('./chatOnMessage');
const ChatApp = require('./ChatAppClass');

/**
 * Вызывает событие `message` на объекте `obj`
 *
 * @param {Object} obj Объект
 * @param {Function} obj.emit Метод для подписки `obj` на событие
 * @param {String} obj.title
 * @param message
 */
function sendOnMessage(obj, message) {

    if (typeof obj.emit === 'function') {
        obj.emit('message', console.log(`${obj.title}: ${message}`));
    }
}

let webinarChat = new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat = new ChatApp('---------vk');

/**
 * Отписывает webinarChat от события 'message'
 *
 * @param {String} message
 */
let chatOnCloseWebinarChat = (message) => {
    console.log(message);
    webinarChat.removeListener('message', chatOnMessage);
};

vkChat.setMaxListeners(2);

webinarChat.on('message', chatOnMessage);
facebookChat.on('message', chatOnMessage);
vkChat.on('message', chatOnMessage);

vkChat.on('close', chatOnMessage);
webinarChat.on('close', chatOnMessage);

webinarChat.on('chatOnClose', chatOnCloseWebinarChat);

// Закрыть вконтакте
setTimeout(()=> {
    console.log('Закрываю вконтакте...');
    vkChat.removeListener('message', chatOnMessage);
}, 10000);


// Закрыть фейсбук
setTimeout(()=> {
    console.log('Закрываю фейсбук, все внимание — вебинару!');
    facebookChat.removeListener('message', chatOnMessage);
}, 15000);

setTimeout(()=> {
    sendOnMessage(webinarChat, ' Готовлюсь к ответу!');
}, 2000);

setTimeout(() => {
    sendOnMessage(vkChat, ' Готовлюсь к ответу!');
}, 5000);

setTimeout(() => {
    vkChat.close();
}, 11000);

setTimeout(() => {
    console.log('Закрываю вебинар...');
    webinarChat.emit('chatOnClose', 'Вебинар закрылся');
}, 30000);
