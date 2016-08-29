//Асинхронное чтение файла
const fs = require('fs');


fs.readFile(process.argv[2], 'utf-8', (err, data) => {
    if (err) throw new Error('Ошибка чтения файла');
    console.log(data.split('\n').length - 1);
});

