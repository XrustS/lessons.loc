'use scrict';

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
let upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3333;

const middleware = (req, resp, next) => {
    const key = 'ESe323dsfs';
    if(req.get('api-key') !== key){
        let err = new Error('Authorization failed!');
        err.name = '401';
        return next(err);
    }         
    next();
};

app.get('/', (req, resp) => {
    resp.status(200).send('Hello Express.js');
});
app.get('/hello', (req, resp) => {
    resp.status(200).send('Hello stranger !');
});
app.get('/hello/*/', (req, resp) => {
    console.log(req.params);
    resp.status(200).send(`Hello ${req.params['0']}`);
});
app.all(/sub\/.*?/, (req, resp) => {
    resp.status(200).send(`You requested URI: ${req.originalUrl}`);
});
app.post('/post', middleware,  (req, resp) => {
    if(Object.keys(req.body).length === 0)
        return resp.status(404).send('Not Found');
    resp.json(req.body);
});

app.use((err, req, resp, next) => {
   if(err.name === '401')
       return resp.status(401).send(err.message);
   resp.status(500).send('Application is broke!'); 
});

app.listen(port, () => {
    console.log('Start application on port %d', port);
});
