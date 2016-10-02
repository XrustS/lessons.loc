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
    app.get('/api/v1.0/users/:id', (req, resp) => {
        Users.find({_id: req.params.id})
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
    app.get('/api/v1.0/tasks/:id', (req, resp) => {
        Tasks.find({_id: req.params.id})
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
                return resp.status(500).send('Возникла ошибка создания нового пользователя.');
            resp.status(200).send('Новый пользователь успешно создан!')
        });
    });
    // Создание задачи
    app.post('/api/v1.0/tasks', (req, resp) => {
        let data = req.body;    
        if(Object.keys(data).length === 0)
            return resp.status(500).send('Данные отсутсвуют.');
        Tasks.create(data, err => {
            if(err)
                return resp.status(500).send('Create new task is failed.');
            resp.status(200).send('Новая задача успешно создана!')
        });
    });
    // Изменение данных пользователя
    app.put('/api/v1.0/users/:id', (req, resp) => {
        let query = { _id: req.params.id },
            data = req.body;
        
        Users.findOne(query, (err, doc) => {
           if(err)
                return resp.status(500).send(err);
            doc.userName = data.userName;            
            doc.save();
            resp.send(`Пользователь ${doc._id} успешно обновлен!`);
        })
    });
    //  Изменение данных задачи
    app.put('/api/v1.0/tasks/:id', (req, resp) => {
        let query = { _id: req.params.id },            
            data = req.body; 
        
        Tasks.findOne(query, (err, doc) => {
           if(err)
                return resp.status(500).send(err);
            doc.taskName = data.taskName;
            doc.isClose = data.isClose;
            doc.usersId[0] = data.usersId[0];
            doc.markModified('array');
            doc.save();
            resp.send(`Задача ${doc._id} успешно обновлен!`);
        })        
    });
    // Удаление пользователя
    app.delete('/api/v1.0/users/:id', (req, resp) => {
        let query = { _id: req.params.id }; 
        Users.remove(query, (err, result) => {
            if(err)
                return resp.status(500).send('Ошибка удаления пользователя: '+req.params.id);
            resp.json(result);
        })
    });
    // Удаление задачи
    app.delete('/api/v1.0/tasks/:id', (req, resp) => {
        let query = { _id: req.params.id }; 
        Tasks.remove(query, (err, result) => {
            if(err)
                return resp.status(500).send('Ошибка удаления задачи: '+req.params.id);
            resp.send(`Задача ${req.params.id} успешно удалена !`);
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
    
    // ------- Загрузка изначальной страницы
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
}
