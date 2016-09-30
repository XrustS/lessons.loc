'use strict';
var Users = require('./models/tasks').users,
    Tasks = require('./models/tasks').tasks;

module.exports = (app) => {
    app.get('/api/v1.0/users', (req, resp) => {
        Users.find({})
            .then( (err, docs) => {
            if(err)
                return resp.send(err);
            resp.json(docs);
        });
    });

    app.get('/api/v1.0/tasks', (req, resp) => {
        Tasks.find({})
            .then( (err, docs) => {
            if(err)
                return resp.send(err);
            resp.json(docs);
        });
    });
    // Создание пользователя
    app.post('/api/v1.0/users', (req, resp) => {
        let name = req.body.name;      

        Users.create({ userName: name }, err => {
            if(err)
                return resp.status(500).send('Create new user is failed.');
            resp.status(200).send('New user is create!')
        });
    });
    // Создание задачи
    app.post('/api/v1.0/tasks', (req, resp) => {
        let data = req.body;    
        if(Object.keys(data).length === 0)
            return resp.status(500).send('Data is empty!');
        Tasks.create(data, err => {
            if(err)
                return resp.status(500).send('Create new task is failed.');
            resp.status(200).send('New task is create!')
        });
    });
    // Изменение данных пользователя
    app.put('/api/v1.0/users/:id', (req, resp) => {
        let query = { _id: req.params.id },
            data = { $set: { userName: req.body.name } };
        Users.update(query, data).find(query, (err, results) => {
            resp.json(results) 
        });
        resp.status(500);
    });
    //  Изменение данных задачи
    app.put('/api/v1.0/tasks/:id', (req, resp) => {
        let query = { _id: req.params.id },            
            data = req.body.usersId ? { $push: { usersId: req.body.usersId }} : { $set: req.body };

        Tasks.update(query, data, {}, (err, result) => {
            if(err)
                return resp.status(500).send(err);
            resp.json(result);
        })    
    });
    // Удаление пользователя
    app.delete('/api/v1.0/users/:id', (req, resp) => {
        let query = { _id: req.params.id }; 
        Users.remove(query, (err, result) => {
            if(err)
                return resp.status(500).send('Error remove user: '+req.params.id);
            resp.json(result);
        })
    });
    // Удаление задачи
    app.delete('/api/v1.0/tasks/:id', (req, resp) => {
        let query = { _id: req.params.id }; 
        Tasks.remove(query, (err, result) => {
            if(err)
                return resp.status(500).send('Error remove task: '+req.params.id);
            resp.json(result);
        })
    });   
    

// Статистика по выполненым задачам
    app.get('/api/v1.0/aggregate', (req, resp) => {
        Users.aggregate(// Pipeline
            [
                {
                    $lookup: {
                        "from" : "tasks",
                        "localField" : "_id",
                        "foreignField" : "usersId",
                        "as" : "task"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        name: '$userName',  
                        isClose: '$task.isClose'
                    }
                },
                {
                    $unwind: {
                        path:'$isClose'
                    }
                },
                {
                    $match: {
                        isClose: true
                    }
                },
                {
                    $group: {
                        _id: '$name',
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: {
                        count: -1
                    }
                },
            ])
            .exec((err, result) => {
            if(err)
                return resp.send(err);
            resp.json(result);
        });
    });
    // Подключаем angular-route
    app.get(/angular-route.js/, function(req, resp) {        
        resp.sendfile('./node_modules/angular-route/angular-route.js');
    });
    // Подключаем angular
    app.get(/angular.js/, function(req, resp) {        
        resp.sendfile('./node_modules/angular/angular.js');
    });
    // ------- Загрузка изначальной страницы
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
}
