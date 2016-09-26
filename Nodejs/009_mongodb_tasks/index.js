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

app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// Роуты
require('./app/route')(app);
// Запуск сервера
app.listen(port);
console.log('Сервер запущен на %d порту', port);
