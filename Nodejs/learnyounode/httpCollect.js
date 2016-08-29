const http = require('http');

let url = process.argv[2],
    buff='',
    showResult = () => {
        console.log(buff.length);
        console.log(buff);
    }

http.get(url, (response) => {
    response.setEncoding('utf-8');
    response.on('data', (chunk) => {
        buff +=chunk;        
    });    
    response.on('end', showResult);
    response.on('error', console.error);
}).on('error', console.log);