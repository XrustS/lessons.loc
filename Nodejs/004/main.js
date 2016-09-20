const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const Datastore = require('nedb');
const Users = require('./usersrpc');

const app = express();
var upload = multer();



// Инициализируем баду данных;
const db = new Datastore({ filename: './users.db', autoload: true });
let lastIndex = 0;
const users = new Users({ db: db});

// 
db.find({}).sort({ _id: -1 }).limit(1).exec( (err, docs) =>{
    if(err)
        return console.log(err);
    lastIndex = (docs.length === 0) ? 0: Number(docs[0]._id);            
})

// Настройка приложения app для использования bodyParser()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const port = process.env.PORT || 3333;

let routeAPIRast = express.Router(),
    routeAPIRPC = express.Router();

// Обработка RAST роутов 

// Роут для отображения всех пользователй
routeAPIRast.get(/\/|\d+/,  (req, resp) => {

    let data = {},
        id = +req.path.split('/')[1];

    if (id) 
        data._id = id;

    users.show(data, db, (err, res) => {
        if(err)
            return resp.status(500).send(err.message);
        resp.json(res);
    })      
});
// Создание нового пользователя
routeAPIRast.post('/', upload.array(), (req, resp) => {
    let data = req.body;
    console.log(data)        ;
    if (!Object.keys(data).length) 
        return resp.status(401).json({error: 'Bad request!'});

    users.insert(data, db, (err, res) => {
        if(err)
            return resp.status(500).json({error: err.message});
        resp.json(res);
    })
});
// Роут для обновления данных пользователя 
routeAPIRast.put(/\d+/, upload.array(), (req, resp) => {
    let id = +req.path.split('/')[1],
        data = req.body;

    if(!id || !Object.keys(data).length) 
        return resp.status(401).json({error: 'Bad request!'});
    data._id = id;

    users.update(data, db, (err, res) => {
        if(err)
            return resp.status(500).json({error: err.message});
        resp.json(res);
    })     
});
// Роут для удаления пользователя по id
routeAPIRast.delete(/\d+/, (req, resp) => {
    let id = +req.path.split('/')[1];

    if(!id)
        return resp.status(401).json({error: 'Bad request!'});    
    users.delete(id, db, (err, res) => {
        if(err)
            return resp.status(500).json({error: err.message});
        resp.json(res);
    })
});

// --------------  RPC

routeAPIRPC.post('/', function(req, res) {
    res.header('Content-Type', 'application/json');
    const method = users[req.body.method];
    const data = req.body;

    if (!err && data.jsonrpc !== '2.0') {
        onError({
            code: -32600,
            message: 'Bad Request. JSON RPC version is invalid or missing',
            data: null
        }, 400);
        return;
    }
    if (!err && !(rpcMethod = rpcMethods[data.method])) {
        onError({
            code: -32601,
            message: 'Method not found : ' + data.method
        }, 404);
        return;
    }

    method(data.params, db, (err, result) => {
        if(err)
            return onError({
                code: -32603,
                message: 'Failed',
                data: err
            }, 500);

        res.send(JSON.stringify({
            jsonrpc: '2.0',
            result: result,
            error : null,
            id: data.id
        }), 200);


    });

    function onError(err, statusCode) {
        res.send(JSON.stringify({
            jsonrpc: '2.0',
            error: err,
            id: data.id
        }), statusCode);
    }
});


//Назначение пути для группы роутов
app.use('/api/v1/users/', routeAPIRast);
app.use('/rpc', routeAPIRPC);

app.use(function(req, resp, next){
    res.status(404);
    console.log('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });    
});

// Обработчик ошибок 500
app.use((err, req, resp, next) => {
    colsole.error(err);
    resp.status(500).send({error: 'Something went wrong'});    
});

app.listen(port);
console.log('Start application on port %d', port);

