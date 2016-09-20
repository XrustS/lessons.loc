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
app.get(/\.css/, (req, resp) => {
    resp.sendFile(path+'styles.css');
});
app.get(/\.js/, (req, resp) => {
    resp.sendFile(path+'sitescript.js');
});

app.post('/getData', (req, resp) => {
    let query = req.body;
    
    mClient.find(query, res =>res.toArray()
                 .then(response => resp.json(response)));
});
app.post('/search', upload.array(), (req, resp) => {
    let data = req.body;
    
    mClient.find({name: new RegExp(data.name, 'i')}, res =>res.toArray()
                 .then(response => resp.json(response)));
});

app.post('/add', upload.array(), (req, resp) => {
    let data = req.body;
    
    mClient.insert(data,  (err, res) => {
        if(err)
            return resp.status(500).send(err);
        resp.json(data);
    });    
}); 

app.post('/update', upload.array(), (req, resp) => {
    let data = req.body,
        id = data._id;
    
    delete data._id;
    mClient.update( {_id: id}, data, {}, (err, res) => {
        if(err)
            return resp.status(500).send(err);
        resp.json(data);
    });
});



app.use((err, req, resp, next) => {
    console.log(err.message);
    resp.status(500).send('ALARM! Somsing error!!!');
});

app.listen(3333);
console.log('Server up on 3333 port');