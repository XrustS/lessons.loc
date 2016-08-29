const http = require('http');

let url = process.argv[2];

http.get(url, (response) => {
    response.setEncoding('utf-8');
    response.on('data', console.log);
    response.on('error', console.error);
    //response.on('end', () => console.log('передача данных окончена.'));
}).on('error', console.log);