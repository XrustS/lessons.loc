'use strict';
const http = require('http');
const urlObj = require('url');

let arrayResults = {},   
    countResults = 0;

let showResult = () => {

    countResults++;
     if(countResults == 3){
        for (let i = 2; i <= 4 ; i++ ){
            let key = urlToKey(process.argv[i]);

            console.log(arrayResults[key]);            
        }
    }
};

function getWebData(url){
    http.get(url, (response) => {
        response.setEncoding('utf-8');
        response
            .on('data', (chunk) => {
            let key = urlToKey(url);

            if(key in arrayResults ) {
                arrayResults[key] += chunk; 
            }else{
                arrayResults[key] = chunk;
            }                       
        })
            .on('end', showResult)
            .on('error', console.error);
    }).on('error', console.log);
};

for (let i = 2; i <= 4 ; i++ ){
    getWebData(process.argv[i]);
};

function urlToKey(url){
    return urlObj.parse(url).host.replace(':','_');
};