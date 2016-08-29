//синхронное чтение файла
const fs = require('fs');

let buff = fs.readFileSync(process.argv[2]);

console.log(buff.toString().split('\n').length - 1);