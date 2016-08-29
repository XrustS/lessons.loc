const fs = require('fs');
const path = require('path');

let pathDir = process.argv[2],
    filter = '.'+process.argv[3];

fs.readdir(pathDir, (err, list) => {
    if (err) throw new Error('Ошибка чтения содержимого '+path);
    list.forEach( (item) =>{
        if ( path.extname(item) === filter ) console.log(item);
    });
});