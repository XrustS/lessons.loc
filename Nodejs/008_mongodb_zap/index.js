'use strict';
const express = require('express'),
      bodyParser = require('body-parser'),
      multer = require('multer'),
      mClient = require('./mongoconn')('mongodb://localhost:27017/users', 'users');

const app = express();
let upload = multer(),
    path = __dirname+'/Public/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, resp) => {
    resp.sendFile(path+'index.html');
});

app.get('/getAllData', (req, resp) => {
    let buff = [];
    mClient.find({})
        .toArray()
        .then( res => console.log(res)); 
    resp.json({});
    
});

app.get(/\.css/, (req, resp) => {
    resp.sendFile(path+'styles.css');
});

app.post('/add', upload.array(), (req, resp) => {
    let data = req.body;
    
    resp.json(data);
});

app.use((err, req, resp, next) => {
    console.log(err.message);
    resp.status(500).send('ALARM! Somsing error!!!');
});

app.listen(3333);
console.log('Server up on 3333 port');