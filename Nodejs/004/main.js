const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const Datastore = require('nedb');
const Users = require('./users');

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
routeAPIRast.get('/', (req, resp) => {
    users.show(req, resp);
});
// Роут для отображения конкретного пользователя по id
routeAPIRast.get(/\d+/, (req, resp) => {
    let id = req.path.split('/')[1];

    users.show(req, resp, id);      
});
// Создание нового пользователя
routeAPIRast.post('/', upload.array(), (req, resp) => {
    users.insert(req, resp);  
});
// Роут для обновления данных пользователя 
routeAPIRast.put(/\d+/, upload.array(), (req, resp) => {
    users.update(req, resp);    
});
// Роут для удаления пользователя по id
routeAPIRast.delete(/\d+/, (req, resp) => {
    users.delete(req, resp);
});

// --------------  RPC

routeAPIRPC.post('/', (req, resp) => {
   const method = RPC[req.body.method];
    
    method(req.body.params, (err, result) => {
        resp.json(result);
    })
});


//Назначение пути для группы роутов
app.use('/api/v1/users/', routeAPIRast);
app.use('/rpc', routeAPIRPC);

// Обработчик ошибок 500
app.use((err, req, resp, next) => {
    colsole.error(err);
    resp.status(500).send('Something went wrong');    
});

app.listen(port);
console.log('Start application on port %d', port);