// ==--- Server app
'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3333;
const dbConfig = require('./config/database');
// модули для работы app
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); // поддержка методов PUT, DELETE
const morgan = require('morgan'); // Логирование запросов в консоль (express)
// Конфигурирование app
mongoose.connect(dbConfig.url);

app.use(express.static(__dirname + '/public')); 				
//app.use(morgan('dev')); 										
app.use(bodyParser.urlencoded({'extended':'true'})); 			
app.use(bodyParser.json()); 								
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());

// Роуты
require('./app/route')(app);
// Запуск сервера
app.listen(port);
console.log('Сервер запущен на %d порту', port);
